// VoiceMap — Import Reviews Modal (CSV / JSON / Text) · Groq-powered analysis
import React, { useState, useCallback } from 'react';
import {
  View, Text, StyleSheet, Modal, TouchableOpacity,
  TextInput, ScrollView, KeyboardAvoidingView, Platform, Alert as RNAlert,
  ActivityIndicator,
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { File } from 'expo-file-system';
import { useReviewStore } from '@/store/useReviewStore';
import { Palette, Radii, Spacing } from '@/constants/theme';
import { Review, Platform as PlatformType } from '@/types';
import { analyzeReviewsWithGroq } from '@/utils/groqClient';

type ImportMode = 'csv' | 'json' | 'text';

type SourcePlatform = 'amazon' | 'flipkart' | 'youtube' | 'twitter' | 'manual';

const PLATFORM_META: { key: SourcePlatform; icon: string; label: string; color: string }[] = [
  { key: 'amazon',   icon: '🛒', label: 'Amazon',   color: '#FF9900' },
  { key: 'flipkart', icon: '🏪', label: 'Flipkart', color: '#2874F0' },
  { key: 'youtube',  icon: '▶️', label: 'YouTube',  color: '#FF0000' },
  { key: 'twitter',  icon: '🐦', label: 'Twitter',  color: '#1DA1F2' },
  { key: 'manual',   icon: '✏️', label: 'Other',    color: '#8B5CF6' },
];

interface Props {
  visible: boolean;
  onClose: () => void;
}

// ─── Raw-row type ─────────────────────────────────────────────────────────────
interface ReviewRow {
  text: string;
  platform?: string; // raw string from the file, e.g. "Amazon", "flipkart"
}

// ─── Normalise a freeform platform string to a PlatformType key ───────────────
function normalizePlatform(raw: string): SourcePlatform | undefined {
  const s = raw.trim().toLowerCase();
  if (s.includes('amazon'))   return 'amazon';
  if (s.includes('flipkart')) return 'flipkart';
  if (s.includes('youtube') || s.includes('yt')) return 'youtube';
  if (s.includes('twitter') || s.includes('tweet') || s.includes('x.com')) return 'twitter';
  if (s.includes('manual') || s.includes('other')) return 'manual';
  return undefined; // unknown — caller will fall back to UI picker
}

// ─── Raw-row extractors (no AI, just structural parsing) ──────────────────────

/** CSV → array of ReviewRow (text + optional platform per row) */
function extractRowsFromCSV(content: string): ReviewRow[] {
  const lines = content.split(/\r?\n/).filter(l => l.trim());
  if (!lines.length) return [];

  // Parse a single CSV line into unquoted columns
  const parseCols = (line: string): string[] =>
    (line.match(/("[^"]*"|[^",\r\n]+)(?=\s*,|\s*$)/g) ?? [])
      .map(c => c.replace(/^"|"$/g, '').trim());

  const header = parseCols(lines[0]);
  const hasHeader = /text|review|comment|feedback|platform|source|site|store/i.test(lines[0] ?? '');

  // Identify column indices from header
  const textIdx   = header.findIndex(h => /text|review|comment|feedback/i.test(h));
  const platIdx   = header.findIndex(h => /platform|source|site|store|channel/i.test(h));

  const rows: ReviewRow[] = [];
  const dataLines = hasHeader ? lines.slice(1) : lines;

  dataLines.forEach(line => {
    const cols = parseCols(line);
    // Resolve the review text column
    let text = '';
    if (textIdx >= 0 && cols[textIdx]) {
      text = cols[textIdx];
    } else {
      // Fallback: pick the longest column with >2 words
      text = cols
        .filter(c => c.split(' ').length > 2)
        .sort((a, b) => b.length - a.length)[0] ?? line.trim();
    }
    if (!text || text.length <= 5) return;

    // Resolve platform column
    const rawPlatform = platIdx >= 0 ? (cols[platIdx] ?? '') : '';
    const row: ReviewRow = { text };
    if (rawPlatform) row.platform = rawPlatform;
    rows.push(row);
  });
  return rows;
}

/** JSON → array of ReviewRow (text + optional platform per item) */
function extractRowsFromJSON(content: string): ReviewRow[] {
  const data = JSON.parse(content);
  const arr: any[] = Array.isArray(data) ? data : [data];
  const rows: ReviewRow[] = [];
  arr.forEach(item => {
    const text: string =
      typeof item === 'string'
        ? item
        : item.text ?? item.review ?? item.comment ?? item.feedback ?? JSON.stringify(item);
    if (typeof text !== 'string' || text.trim().length <= 5) return;
    const rawPlatform: string =
      typeof item === 'object'
        ? (item.platform ?? item.source ?? item.site ?? item.store ?? item.channel ?? '')
        : '';
    const row: ReviewRow = { text: text.trim() };
    if (rawPlatform) row.platform = String(rawPlatform);
    rows.push(row);
  });
  return rows;
}

/** Plain text → each line/paragraph is one ReviewRow (no platform metadata) */
function extractRowsFromPlainText(content: string): ReviewRow[] {
  return content.split(/\n{2,}|\n/)
    .filter(p => p.trim().length > 5)
    .map(p => ({ text: p.trim() }));
}

/** Map a Groq analysis result back to the Review shape */
function buildReview(
  text: string,
  analysis: Awaited<ReturnType<typeof analyzeReviewsWithGroq>>[number],
  index: number,
  platform: PlatformType,
): Review {
  return {
    id: `import_${Date.now()}_${index}`,
    platform,
    rating: analysis.sentiment === 'positive' ? 4 : analysis.sentiment === 'negative' ? 2 : 3,
    language: analysis.language,
    sentiment: analysis.sentiment,
    isSarcastic: analysis.isSarcastic,
    sarcasticConfidence: analysis.sarcasticConfidence,
    text: text.trim(),
    features: analysis.features,
    dangerScore: analysis.dangerScore,
    revenueRisk: analysis.revenueRisk,
    productCategory: analysis.productCategory,
    brandName: analysis.brandName,
    highlights: analysis.highlights,
    author: `Imported #${index + 1}`,
    likes: 0,
    createdAt: new Date().toISOString(),
  };
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ImportReviewsModal({ visible, onClose }: Props) {
  const { addReviews } = useReviewStore();
  const [mode, setMode] = useState<ImportMode>('csv');
  const [textInput, setTextInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState('');
  const [preview, setPreview] = useState<Review[]>([]);
  const [fileTexts, setFileTexts] = useState<ReviewRow[]>([]); // tracking only
  const [step, setStep] = useState<'select' | 'preview'>('select');

  const reset = useCallback(() => {
    setTextInput('');
    setPreview([]);
    setFileTexts([]);
    setStep('select');
    setLoading(false);
    setLoadingMsg('');
  }, []);

  const handleClose = useCallback(() => {
    reset();
    onClose();
  }, [reset, onClose]);

  // ── Shared: run Groq analysis on extracted rows (used by plain-text mode) ────
  const runGroqAnalysis = useCallback(async (rows: ReviewRow[]) => {
    if (!rows.length) {
      RNAlert.alert('No reviews found', 'Could not find any review text to analyse.');
      return;
    }
    const texts = rows.map(r => r.text);
    setLoadingMsg(`🧠 Analysing ${texts.length} review${texts.length !== 1 ? 's' : ''} with Groq…`);
    setLoading(true);
    try {
      const analyses = await analyzeReviewsWithGroq(texts);
      const reviews = rows.map((row, i) => {
        const resolvedPlatform: PlatformType =
          (row.platform ? normalizePlatform(row.platform) : undefined) ?? 'manual';
        return buildReview(row.text, analyses[i], i, resolvedPlatform);
      });
      setPreview(reviews);
      setStep('preview');
    } catch (err: any) {
      RNAlert.alert('Analysis Error', err.message ?? 'Groq analysis failed. Please try again.');
    } finally {
      setLoading(false);
      setLoadingMsg('');
    }
  }, []);

  // ── Pick file, parse, AND immediately analyse in one shot ───────────────
  // (avoids the stale-state bug where fileTexts wasn't committed yet)
  const pickAndAnalyzeFile = useCallback(async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: mode === 'csv'
          ? ['text/csv', 'text/comma-separated-values', 'application/csv', '*/*']
          : ['application/json', 'text/plain', '*/*'],
        copyToCacheDirectory: true,
      });
      if (result.canceled || !result.assets?.length) return;
      const asset = result.assets[0];

      // ── Step 1: read file ──
      setLoadingMsg('📂 Reading file…');
      setLoading(true);
      const file = new File(asset.uri);
      const content = await file.text();
      const rows = mode === 'csv' ? extractRowsFromCSV(content) : extractRowsFromJSON(content);
      setFileTexts(rows); // tracking only

      if (!rows.length) {
        setLoading(false);
        RNAlert.alert('No reviews found', 'Could not find any review text in this file.');
        return;
      }

      // ── Step 2: detect platform from filename as fallback ──
      const filenamePlatform = normalizePlatform(asset.name ?? '');

      // ── Step 3: analyse ──
      const texts = rows.map(r => r.text);
      setLoadingMsg(`🧠 Analysing ${texts.length} review${texts.length !== 1 ? 's' : ''} with Groq…`);
      const analyses = await analyzeReviewsWithGroq(texts);
      const reviews = rows.map((row, i) => {
        // Priority: CSV/JSON column → filename → 'manual'
        const resolvedPlatform: PlatformType =
          (row.platform ? normalizePlatform(row.platform) : undefined)
          ?? filenamePlatform
          ?? 'manual';
        return buildReview(row.text, analyses[i], i, resolvedPlatform);
      });
      setPreview(reviews);
      setStep('preview');
    } catch (err: any) {
      RNAlert.alert('Error', err.message ?? 'Could not read or analyse file.');
    } finally {
      setLoading(false);
      setLoadingMsg('');
    }
  }, [mode]);


  // ── Analyze plain text ────────────────────────────────────────────────────
  const analyzeText = useCallback(async () => {
    if (!textInput.trim()) return;
    const rows = extractRowsFromPlainText(textInput);
    await runGroqAnalysis(rows);
  }, [textInput, runGroqAnalysis]);

  // ── Confirm import ────────────────────────────────────────────────────────
  const confirmImport = useCallback(() => {
    addReviews(preview);
    RNAlert.alert(
      '✅ Import Complete',
      `${preview.length} review${preview.length !== 1 ? 's' : ''} analysed by Groq and added!`,
    );
    handleClose();
  }, [preview, addReviews, handleClose]);

  const sentimentColor = (s: string) =>
    s === 'positive' ? '#22c55e' : s === 'negative' ? '#ef4444' : '#f59e0b';

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={handleClose}>
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 24}
      >
        <TouchableOpacity style={styles.overlayDismiss} activeOpacity={1} onPress={handleClose} />
        <View style={styles.sheet}>

          {/* Header */}
          <View style={styles.sheetHeader}>
            <Text style={styles.sheetTitle}>📥 Import Reviews</Text>
            <TouchableOpacity onPress={handleClose} style={styles.closeBtn}>
              <Text style={styles.closeBtnText}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* ── Loading overlay ─────────────────────────────────────────── */}
          {loading && (
            <View style={styles.loadingBox}>
              <ActivityIndicator color={Palette.violet} size="large" />
              <Text style={styles.loadingText}>{loadingMsg || 'Please wait…'}</Text>
            </View>
          )}

          {!loading && step === 'select' && (
            <>

              {/* Mode selector */}
              <Text style={styles.sectionLabel}>CHOOSE FORMAT</Text>
              <View style={styles.modeRow}>
                {(['csv', 'json', 'text'] as ImportMode[]).map((m) => (
                  <TouchableOpacity
                    key={m}
                    style={[styles.modeCard, mode === m && styles.modeCardActive]}
                    onPress={() => { setMode(m); setTextInput(''); setFileTexts([]); }}
                  >
                    <Text style={styles.modeIcon}>
                      {m === 'csv' ? '📊' : m === 'json' ? '🗂️' : '📝'}
                    </Text>
                    <Text style={[styles.modeLabel, mode === m && styles.modeLabelActive]}>
                      {m === 'csv' ? 'CSV File' : m === 'json' ? 'JSON File' : 'Plain Text'}
                    </Text>
                    <Text style={styles.modeDesc}>
                      {m === 'csv' ? '.csv export' : m === 'json' ? '.json array' : 'Paste text'}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Groq badge */}
              <View style={styles.groqBadge}>
                <Text style={styles.groqBadgeText}>
                  ⚡ Groq LLaMA — real AI sentiment, sarcasm &amp; feature analysis
                </Text>
              </View>

              {/* ── CSV / JSON: hint box + single Analyse button ── */}
              {(mode === 'csv' || mode === 'json') && (
                <View style={styles.uploadSection}>
                  <View style={styles.uploadHintBox}>
                    <Text style={styles.uploadHintIcon}>
                      {mode === 'csv' ? '📊' : '🗂️'}
                    </Text>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.uploadHintTitle}>
                        {mode === 'csv' ? 'CSV File' : 'JSON File'}
                      </Text>
                      <Text style={styles.uploadHintSub}>
                        {mode === 'csv'
                          ? 'Columns: text/review + optional platform/source'
                          : 'Array of objects with text + optional platform field'}
                      </Text>
                    </View>
                  </View>


                  {/* Single CTA — picks file AND analyses in one tap */}
                  <TouchableOpacity
                    style={styles.primaryBtn}
                    onPress={pickAndAnalyzeFile}
                  >
                    <Text style={styles.primaryBtnText}>⚡ Pick File & Analyse with Groq</Text>
                  </TouchableOpacity>
                </View>
              )}


              {/* ── Plain text: textarea + analyse button ── */}
              {mode === 'text' && (
                <>
                  <Text style={styles.sectionLabel}>PASTE YOUR REVIEWS</Text>
                  <Text style={styles.sectionHint}>Each line or paragraph = one review</Text>
                  <TextInput
                    style={styles.textArea}
                    value={textInput}
                    onChangeText={setTextInput}
                    placeholder={`Battery drains in 4 hours. Absolute waste.\n\nGreat sound quality! Worth every rupee.`}
                    placeholderTextColor={Palette.grey600}
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                    scrollEnabled
                    returnKeyType="default"
                  />
                  <TouchableOpacity
                    style={[styles.primaryBtn, !textInput.trim() && { opacity: 0.4 }]}
                    onPress={analyzeText}
                    disabled={!textInput.trim()}
                  >
                    <Text style={styles.primaryBtnText}>⚡ Analyse with Groq</Text>
                  </TouchableOpacity>
                </>
              )}
            </>
          )}

          {/* ── Preview step ─────────────────────────────────────────────── */}
          {!loading && step === 'preview' && (
            <>
              <View style={styles.previewHeader}>
                <Text style={styles.previewTitle}>
                  ✅ {preview.length} review{preview.length !== 1 ? 's' : ''} analysed
                </Text>
                <TouchableOpacity onPress={() => setStep('select')}>
                  <Text style={styles.backBtn}>← Back</Text>
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.previewList} showsVerticalScrollIndicator={false}>
                {preview.slice(0, 12).map((r, i) => {
                  const pm = PLATFORM_META.find((p) => p.key === r.platform) ?? PLATFORM_META[4];
                  return (
                  <View key={r.id} style={styles.previewCard}>
                    {/* ── Company / Platform banner ── */}
                    <View style={[styles.platformBanner, { borderColor: pm.color + '55', backgroundColor: pm.color + '18' }]}>
                      <Text style={styles.platformBannerIcon}>{pm.icon}</Text>
                      <Text style={[styles.platformBannerLabel, { color: pm.color }]}>{pm.label}</Text>
                      <View style={styles.previewCardRow}>
                        <Text style={styles.previewIdx}>#{i + 1}</Text>
                        <View style={[styles.sentimentBadge, { backgroundColor: sentimentColor(r.sentiment) + '22' }]}>
                          <Text style={[styles.sentimentBadgeText, { color: sentimentColor(r.sentiment) }]}>
                            {r.sentiment}
                          </Text>
                        </View>
                        {r.isSarcastic && (
                          <View style={styles.sarcasticBadge}>
                            <Text style={styles.sarcasticBadgeText}>🎭 sarcastic</Text>
                          </View>
                        )}
                        <Text style={styles.dangerChip}>⚠️ {r.dangerScore}</Text>
                      </View>
                    </View>
                    {/* Feature chips */}
                    {r.features.length > 0 && (
                      <View style={styles.featureRow}>
                        {r.features.slice(0, 3).map((f, fi) => (
                          <View key={fi} style={[styles.featureChip, { borderColor: sentimentColor(f.sentiment) + '88' }]}>
                            <Text style={[styles.featureChipText, { color: sentimentColor(f.sentiment) }]}>
                              {f.name}
                            </Text>
                          </View>
                        ))}
                      </View>
                    )}
                    <Text style={styles.previewText} numberOfLines={2}>{r.text}</Text>
                    <Text style={styles.brandText}>📦 {r.productCategory} · {r.brandName}</Text>
                  </View>
                  );
                })}
                {preview.length > 12 && (
                  <Text style={styles.moreHint}>+{preview.length - 12} more reviews will also be imported</Text>
                )}
              </ScrollView>

              <TouchableOpacity style={styles.primaryBtn} onPress={confirmImport}>
                <Text style={styles.primaryBtnText}>
                  ✅ Import {preview.length} Review{preview.length !== 1 ? 's' : ''}
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  overlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.72)',
    justifyContent: 'flex-end',
  },
  overlayDismiss: { flex: 1 },
  sheet: {
    backgroundColor: Palette.navyCard,
    borderTopLeftRadius: 24, borderTopRightRadius: 24,
    padding: Spacing.md,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
    maxHeight: '85%',
  },
  sheetHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: 20,
  },
  sheetTitle: { color: '#fff', fontSize: 18, fontWeight: '900' },
  closeBtn: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: Palette.navyBorder, alignItems: 'center', justifyContent: 'center',
  },
  closeBtnText: { color: '#fff', fontSize: 14, fontWeight: '700' },

  // Loading
  loadingBox: {
    alignItems: 'center', justifyContent: 'center',
    paddingVertical: 48, gap: 16,
  },
  loadingText: { color: Palette.grey400, fontSize: 13, textAlign: 'center' },

  sectionLabel: {
    color: Palette.violetLight, fontSize: 10, fontWeight: '800', letterSpacing: 2,
    marginBottom: 8,
  },
  sectionHint: { color: Palette.grey500, fontSize: 11, marginTop: -4, marginBottom: 8 },



  modeRow: { flexDirection: 'row', gap: 10, marginBottom: 14 },
  modeCard: {
    flex: 1, backgroundColor: Palette.deepNavy, borderRadius: Radii.md,
    borderWidth: 1.5, borderColor: Palette.navyBorder,
    padding: 12, alignItems: 'center', gap: 4,
  },
  modeCardActive: { borderColor: Palette.violet, backgroundColor: Palette.violetDim },
  modeIcon: { fontSize: 24, marginBottom: 2 },
  modeLabel: { color: Palette.grey400, fontSize: 12, fontWeight: '700' },
  modeLabelActive: { color: Palette.violetLight },
  modeDesc: { color: Palette.grey600, fontSize: 10, textAlign: 'center' },

  groqBadge: {
    backgroundColor: Palette.violetDim, borderRadius: Radii.md,
    borderWidth: 1, borderColor: Palette.violet,
    paddingHorizontal: 12, paddingVertical: 8, marginBottom: 14,
  },
  groqBadgeText: { color: Palette.violetLight, fontSize: 11, fontWeight: '600', textAlign: 'center' },

  uploadSection: {
    gap: 12, marginBottom: 8,
  },


  uploadHintBox: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 12,
    backgroundColor: Palette.deepNavy, borderRadius: Radii.md,
    borderWidth: 1, borderColor: Palette.navyBorder,
    padding: 14,
  },
  uploadHintIcon: { fontSize: 28, marginTop: 2 },
  uploadHintTitle: { color: '#fff', fontSize: 13, fontWeight: '800', marginBottom: 3 },
  uploadHintSub: { color: Palette.grey500, fontSize: 11, lineHeight: 16, maxWidth: 240 },



  textArea: {
    backgroundColor: Palette.deepNavy, borderRadius: Radii.md,
    borderWidth: 1, borderColor: Palette.navyBorder,
    color: '#fff', fontSize: 13, padding: 12,
    minHeight: 110, marginBottom: 12,
  },

  primaryBtn: {
    backgroundColor: Palette.violet, borderRadius: Radii.md,
    paddingVertical: 14, alignItems: 'center', marginTop: 4,
  },
  primaryBtnText: { color: '#fff', fontWeight: '800', fontSize: 15 },

  // Preview
  previewHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 12,
  },
  previewTitle: { color: '#fff', fontWeight: '800', fontSize: 14 },
  backBtn: { color: Palette.violetLight, fontWeight: '700', fontSize: 13 },
  previewList: { maxHeight: 320, marginBottom: 12 },
  previewCard: {
    backgroundColor: Palette.deepNavy, borderRadius: Radii.md,
    borderWidth: 1, borderColor: Palette.navyBorder,
    overflow: 'hidden', marginBottom: 8, gap: 6,
  },
  platformBanner: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: 10, paddingVertical: 7,
    borderBottomWidth: 1,
    flexWrap: 'wrap',
  },
  platformBannerIcon: { fontSize: 15 },
  platformBannerLabel: { fontSize: 11, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 1, marginRight: 6 },
  previewCardRow: { flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap', flex: 1 },
  previewIdx: { color: Palette.grey500, fontSize: 11, fontWeight: '700', minWidth: 24 },
  sentimentBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 999 },
  sentimentBadgeText: { fontSize: 10, fontWeight: '800', textTransform: 'uppercase' },
  sarcasticBadge: {
    backgroundColor: '#7c3aed22', borderRadius: 999,
    paddingHorizontal: 8, paddingVertical: 2,
  },
  sarcasticBadgeText: { color: '#a78bfa', fontSize: 10, fontWeight: '700' },
  dangerChip: { color: '#f97316', fontSize: 11, fontWeight: '700', marginLeft: 'auto' },
  featureRow: { flexDirection: 'row', gap: 6, flexWrap: 'wrap', paddingHorizontal: 10 },
  featureChip: {
    borderWidth: 1, borderRadius: 999,
    paddingHorizontal: 7, paddingVertical: 2,
  },
  featureChipText: { fontSize: 10, fontWeight: '700' },
  previewText: { color: Palette.grey400, fontSize: 12, lineHeight: 17, paddingHorizontal: 10 },
  brandText: { color: Palette.grey600, fontSize: 10, paddingHorizontal: 10, paddingBottom: 8 },
  moreHint: { color: Palette.grey500, fontSize: 11, textAlign: 'center', paddingVertical: 8 },
});
