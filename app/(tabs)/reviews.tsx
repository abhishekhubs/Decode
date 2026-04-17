// VoiceMap — Reviews Tab Screen
import React, { useState, useCallback } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity,
  TextInput, Alert, Platform, KeyboardAvoidingView,
} from 'react-native';
import { useReviewStore } from '@/store/useReviewStore';
import { ReviewCard } from '@/components/reviews/ReviewCard';
import { ImportReviewsModal } from '@/components/reviews/ImportReviewsModal';
import { Palette, Radii, Spacing } from '@/constants/theme';
import { Review, Platform as PlatformType } from '@/types';
import { useTranslation } from '@/hooks/useTranslation';

type Filter = 'all' | 'negative' | 'positive' | 'sarcastic';

const PASTE_PLATFORM_META: { key: PlatformType; icon: string; label: string; color: string }[] = [
  { key: 'amazon',   icon: '🛒', label: 'Amazon',   color: '#FF9900' },
  { key: 'flipkart', icon: '🏪', label: 'Flipkart', color: '#2874F0' },
  { key: 'youtube',  icon: '▶️', label: 'YouTube',  color: '#FF0000' },
  { key: 'twitter',  icon: '🐦', label: 'Twitter',  color: '#1DA1F2' },
  { key: 'manual',   icon: '✏️', label: 'Other',    color: '#8B5CF6' },
];

export default function ReviewsScreen() {
  const { reviews, addReview } = useReviewStore();
  const [filter, setFilter] = useState<Filter>('all');
  const [pasteText, setPasteText] = useState('');
  const [showPaste, setShowPaste] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [manualPlatform, setManualPlatform] = useState<PlatformType>('amazon');
  const t = useTranslation();

  // Filter logic
  const filtered = reviews.filter((r) => {
    if (filter === 'all') return true;
    if (filter === 'sarcastic') return r.isSarcastic;
    return r.sentiment === filter;
  });



  // Analyze manually pasted text
  const handleAnalyze = useCallback(async () => {
    if (!pasteText.trim()) return;
    setIsAnalyzing(true);
    await new Promise((r) => setTimeout(r, 1500)); // simulate AI analysis
    const pm = PASTE_PLATFORM_META.find((p) => p.key === manualPlatform) ?? PASTE_PLATFORM_META[0];
    const newReview: Review = {
      id: `r_manual_${Date.now()}`, platform: manualPlatform, rating: 2,
      language: 'en', sentiment: 'negative', isSarcastic: pasteText.includes('!') && pasteText.includes('great'),
      sarcasticConfidence: 0.76,
      text: pasteText,
      features: [{ name: 'General', sentiment: 'negative', confidence: 0.72 }],
      dangerScore: 65, revenueRisk: 120000,
      productCategory: 'Smartphone', brandName: 'NovaTech X1',
      highlights: [{ word: 'general', sentiment: 'negative' }],
      author: `${pm.label} Review`, likes: 0, createdAt: new Date().toISOString(),
    };
    addReview(newReview);
    setPasteText('');
    setShowPaste(false);
    setIsAnalyzing(false);
    Alert.alert('✅ Analyzed', `Review from ${pm.label} added!`);
  }, [pasteText, addReview, manualPlatform]);

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Import Modal */}
      <ImportReviewsModal visible={showImport} onClose={() => setShowImport(false)} />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.screenLabel}>{t.reviews_label}</Text>
          <Text style={styles.screenTitle}>{t.reviews_title}</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => setShowPaste(!showPaste)}
          >
            <Text style={styles.iconBtnText}>✏️</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.uploadBtn} onPress={() => setShowImport(true)}>
            <Text style={styles.uploadBtnText}>{t.reviews_import}</Text>
          </TouchableOpacity>
        </View>
      </View>



      {/* Manual paste area */}
      {showPaste && (
        <View style={styles.pasteContainer}>
          {/* Platform picker */}
          <Text style={styles.pastePlatformLabel}>{t.reviews_select_platform}</Text>
          <View style={styles.pastePlatformRow}>
            {PASTE_PLATFORM_META.map((p) => (
              <TouchableOpacity
                key={p.key}
                style={[
                  styles.pastePlatformBtn,
                  manualPlatform === p.key && { borderColor: p.color, backgroundColor: p.color + '22' },
                ]}
                onPress={() => setManualPlatform(p.key)}
              >
                <Text style={styles.pastePlatformIcon}>{p.icon}</Text>
                <Text style={[
                  styles.pastePlatformText,
                  manualPlatform === p.key && { color: p.color },
                ]}>{p.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TextInput
            style={styles.pasteInput}
            value={pasteText}
            onChangeText={setPasteText}
            placeholder={t.reviews_paste_ph}
            placeholderTextColor={Palette.grey600}
            multiline
            numberOfLines={3}
          />
          <TouchableOpacity
            style={[styles.analyzeBtn, isAnalyzing && { opacity: 0.6 }]}
            onPress={handleAnalyze}
            disabled={isAnalyzing}
          >
            <Text style={styles.analyzeBtnText}>
              {isAnalyzing ? t.reviews_analyzing : t.reviews_analyze}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Stats row */}
      <View style={styles.statsRow}>
        <Text style={styles.reviewCount}>{filtered.length} {t.reviews_count}</Text>
        <Text style={styles.statsDetail}>
          {reviews.filter((r) => r.sentiment === 'negative').length} {t.reviews_negative} ·{' '}
          {reviews.filter((r) => r.isSarcastic).length} {t.reviews_sarcastic}
        </Text>
      </View>

      {/* Filter tabs */}
      <View style={styles.filterRow}>
        {(
          [
            { key: 'all',       label: t.reviews_filter_all },
            { key: 'negative',  label: t.reviews_filter_critical },
            { key: 'positive',  label: t.reviews_filter_positive },
            { key: 'sarcastic', label: t.reviews_filter_sarcastic },
          ] as { key: Filter; label: string }[]
        ).map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.filterTab, filter === tab.key && styles.filterTabActive]}
            onPress={() => setFilter(tab.key)}
          >
            <Text style={[styles.filterTabText, filter === tab.key && styles.filterTabTextActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Review list */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ReviewCard review={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>{t.reviews_empty}</Text>
          </View>
        }
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Palette.deepNavy,
    paddingTop: Platform.select({ web: 20, ios: 54, android: 32, default: 32 }),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    marginBottom: 12,
  },
  screenLabel: {
    fontSize: 10, color: Palette.violetLight, fontWeight: '800', letterSpacing: 3,
  },
  screenTitle: {
    fontSize: 22, color: '#fff', fontWeight: '900',
  },
  headerActions: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
  },
  iconBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: Palette.navyCard, borderWidth: 1, borderColor: Palette.navyBorder,
    alignItems: 'center', justifyContent: 'center',
  },
  iconBtnText: { fontSize: 18 },
  uploadBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: Palette.violet, paddingHorizontal: 14, paddingVertical: 8,
    borderRadius: Radii.md,
  },
  uploadBtnText: {
    color: '#fff', fontWeight: '700', fontSize: 13,
  },
  progressTrack: {
    height: 3, backgroundColor: Palette.navyBorder, marginHorizontal: 16, marginBottom: 8, borderRadius: 999,
  },
  progressBar: {
    height: 3, backgroundColor: Palette.violet, borderRadius: 999,
  },
  pasteContainer: {
    marginHorizontal: 16, marginBottom: 12,
    backgroundColor: Palette.navyCard, borderRadius: Radii.md,
    padding: 12, borderWidth: 1, borderColor: Palette.navyBorder, gap: 10,
  },
  pasteInput: {
    color: '#fff', fontSize: 13, minHeight: 72,
    textAlignVertical: 'top', lineHeight: 20,
  },
  analyzeBtn: {
    backgroundColor: Palette.violet, borderRadius: Radii.md,
    paddingVertical: 10, alignItems: 'center',
  },
  analyzeBtnText: { color: '#fff', fontWeight: '700', fontSize: 14 },
  pastePlatformLabel: {
    color: '#a78bfa', fontSize: 9, fontWeight: '800', letterSpacing: 2, marginBottom: 2,
  },
  pastePlatformRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  pastePlatformBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    paddingHorizontal: 10, paddingVertical: 5,
    borderRadius: 999, borderWidth: 1.5,
    borderColor: Palette.navyBorder, backgroundColor: Palette.deepNavy,
  },
  pastePlatformIcon: { fontSize: 13 },
  pastePlatformText: { color: Palette.grey400, fontSize: 11, fontWeight: '700' },
  statsRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: Spacing.md, marginBottom: 10,
  },
  reviewCount: { color: '#fff', fontWeight: '900', fontSize: 15 },
  statsDetail: { color: Palette.grey500, fontSize: 12 },
  filterRow: {
    flexDirection: 'row', gap: 6,
    paddingHorizontal: Spacing.md, marginBottom: 12,
  },
  filterTab: {
    flex: 1, paddingVertical: 7, borderRadius: Radii.md,
    backgroundColor: Palette.navyCard, alignItems: 'center',
    borderWidth: 1, borderColor: Palette.navyBorder,
  },
  filterTabActive: {
    backgroundColor: Palette.violetDim, borderColor: Palette.violet,
  },
  filterTabText: {
    color: Palette.grey400, fontSize: 11, fontWeight: '700',
  },
  filterTabTextActive: { color: Palette.violetLight },
  listContent: { paddingBottom: 24, paddingTop: 4 },
  empty: { alignItems: 'center', paddingTop: 60 },
  emptyText: { color: Palette.grey500, fontSize: 15 },
});
