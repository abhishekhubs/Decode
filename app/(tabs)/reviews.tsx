// VoiceMap — Reviews Tab Screen (Premium Edition)
import { ImportReviewsModal } from '@/components/reviews/ImportReviewsModal';
import { ReviewCard } from '@/components/reviews/ReviewCard';
import { Palette, Spacing } from '@/constants/theme';
import { useTranslation } from '@/hooks/useTranslation';
import { useReviewStore } from '@/store/useReviewStore';
import { Platform as PlatformType, Review } from '@/types';
import { detectSpamAndDuplicates, isSpam } from '@/utils/spamDetection';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useMemo, useState } from 'react';
import {
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const { width } = Dimensions.get('window');

type Filter = 'all' | 'negative' | 'positive' | 'sarcastic';

const PASTE_PLATFORM_META: { key: PlatformType; icon: string; label: string; color: string }[] = [
  { key: 'amazon', icon: '🛒', label: 'Amazon', color: '#FF9900' },
  { key: 'flipkart', icon: '🏪', label: 'Flipkart', color: '#2874F0' },
  { key: 'youtube', icon: '▶️', label: 'YouTube', color: '#FF0000' },
  { key: 'twitter', icon: '🐦', label: 'Twitter', color: '#1DA1F2' },
  { key: 'manual', icon: '✏️', label: 'Other', color: '#8B5CF6' },
];

const FILTERS: { key: Filter; label: string; icon: string; color: string }[] = [
  { key: 'all', label: 'All', icon: '📋', color: Palette.violetLight },
  { key: 'negative', label: 'Critical', icon: '🔴', color: '#F87171' },
  { key: 'positive', label: 'Positive', icon: '✅', color: '#34D399' },
  { key: 'sarcastic', label: 'Sarcastic', icon: '🎭', color: '#FBBF24' },
];


// -- Noisy input normalizer: cleans typos, repeated chars, leet-speak --
function normalizeInput(text: string) {
  let t = text.trim();
  t = t.replace(/(.)\1{3,}/g, "$1$1");
  t = t.replace(/\b4re\b/gi, "are").replace(/\bu\b/gi, "you").replace(/\br\b/gi, "are")
    .replace(/\bw\b/gi, "with").replace(/\bn\b/gi, "and").replace(/\bda\b/gi, "the")
    .replace(/\bgr8\b/gi, "great").replace(/\blol\b/gi, "").replace(/\bomg\b/gi, "");
  const fixes: [RegExp, string][] = [
    [/\bbatery|batry|battrey\b/gi, "battery"],
    [/\bcamra|camara|camrera\b/gi, "camera"],
    [/\bdelievry|delvery|dilievery\b/gi, "delivery"],
    [/\bscren|sceen|screne\b/gi, "screen"],
    [/\bchareg|charg|chager\b/gi, "charging"],
    [/\bperfomance|preformance|performence\b/gi, "performance"],
    [/\bawsome|awsum\b/gi, "awesome"],
    [/\bterrible|terribel|teriable\b/gi, "terrible"],
    [/\bexcelent|exellent|excellant\b/gi, "excellent"],
    [/\brecomend|recomend|reccomend\b/gi, "recommend"],
  ];
  for (const [p, r] of fixes) t = t.replace(p, r);
  return t.replace(/\s{2,}/g, " ").trim();
}
export default function ReviewsScreen() {
  const { reviews, addReview } = useReviewStore();
  const [filter, setFilter] = useState<Filter>('all');
  const [pasteText, setPasteText] = useState('');
  const [showAnalyze, setShowAnalyze] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [manualPlatform, setManualPlatform] = useState<PlatformType>('amazon');
  const [visibleCount, setVisibleCount] = useState(10);
  const [aiResult, setAiResult] = useState<{
    sentiment: 'positive' | 'negative' | 'neutral';
    isSarcastic: boolean;
    sarcasticConfidence: number;
    dangerScore: number;
    feature: string;
    featureSentiment: 'positive' | 'negative' | 'neutral';
  } | null>(null);
  const [aiReply, setAiReply] = useState<string | null>(null);
  const [isGeneratingReply, setIsGeneratingReply] = useState(false);
  const [showSpam, setShowSpam] = useState(false);
  const [showSpamModal, setShowSpamModal] = useState(false);
  const t = useTranslation();

  const spamReport = useMemo(() => detectSpamAndDuplicates(reviews), [reviews]);
  const spamCount = spamReport.duplicateIds.size + spamReport.botIds.size;

  const filtered = reviews
    .filter((r) => !isSpam(r, spamReport) || showSpam) // exclude spam unless "show spam" toggled
    .filter((r) => {
      if (filter === 'all') return true;
      if (filter === 'sarcastic') return r.isSarcastic;
      return r.sentiment === filter;
    });

  const visibleReviews = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const handleFilterChange = (f: Filter) => {
    setFilter(f);
    setVisibleCount(10);
    setAiReply(null);
  };

  const handleAnalyze = useCallback(async () => {
    if (!pasteText.trim()) return;
    setIsAnalyzing(true);
    setAiResult(null);
    const pm = PASTE_PLATFORM_META.find((p) => p.key === manualPlatform) ?? PASTE_PLATFORM_META[0];

    let sentiment: 'positive' | 'negative' | 'neutral' = 'negative';
    let isSarcastic = false;
    let sarcasticConfidence = 0;
    let dangerScore = 50;
    let featureName = 'General';
    let featureSentiment: 'positive' | 'negative' | 'neutral' = 'negative';

    try {
      const apiKey = process.env.EXPO_PUBLIC_GROQ_API_KEY ?? '';
      if (apiKey.startsWith('gsk_')) {
        // Pre-process: normalize noisy input before AI analysis
        const cleanedText = normalizeInput(pasteText);
        const prompt =
          `You are an expert customer review analyst with deep understanding of linguistic patterns.\n\n` +
          `IMPORTANT INPUT NOTE: The review text below may contain typos, informal abbreviations,\n` +
          `slang, repeated characters (e.g. "soooo", "!!!"), or mixed case. Please interpret the\n` +
          `INTENDED meaning intelligently, not just the literal text.\n\n` +
          `SARCASM DEFINITION (critical for accuracy):\n` +
          `Sarcasm is verbal irony — the speaker means the OPPOSITE of what they literally say.\n` +
          `It is "hostility disguised as humor." Key signals:\n` +
          `- Praising something that is clearly broken or bad (e.g. "So nice that the battery dies in 2 days!")\n` +
          `- Using positive words in a context that implies a negative experience\n` +
          `- Exaggerated enthusiasm about a problem (e.g. "Love how it breaks after a week!")\n` +
          `- Ironic compliments paired with factual failures (e.g. "Great product, only exploded twice")\n` +
          `- Phrases like "totally", "absolutely", "so helpful", "wonderful" when context is negative\n\n` +
          `IMPORTANT: A review is NOT sarcastic just because it is negative.\n` +
          `A blunt complaint like "battery life is terrible" is negative but NOT sarcastic.\n` +
          `Sarcasm requires the TONE to say one thing while the MEANING implies the opposite.\n\n` +
          `TASK: Analyze the following customer review.\n` +
          `Original (raw, may have typos): "${pasteText}"\n` +
          `Auto-cleaned version: "${cleanedText}"\n\n` +
          `Use both versions to determine the actual sentiment and intent.\n` +
          `Respond ONLY with a valid JSON object (no markdown, no explanation):\n` +
          `{\n` +
          `  "sentiment": "positive" | "negative" | "neutral",\n` +
          `  "isSarcastic": true | false,\n` +
          `  "sarcasticConfidence": 0.0 to 1.0,\n` +
          `  "dangerScore": 0 to 100,\n` +
          `  "feature": "one short product feature like Battery, Camera, Delivery, Build Quality, Price, Support etc",\n` +
          `  "featureSentiment": "positive" | "negative" | "neutral"\n` +
          `}`;
        const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
          body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 256,
            temperature: 0.1,
          }),
        });
        const data = await res.json();
        const raw: string = data?.choices?.[0]?.message?.content ?? '{}';
        const cleaned = raw.replace(/```json|```/g, '').trim();
        const parsed = JSON.parse(cleaned);
        sentiment = parsed.sentiment ?? sentiment;
        isSarcastic = parsed.isSarcastic ?? isSarcastic;
        sarcasticConfidence = parsed.sarcasticConfidence ?? sarcasticConfidence;
        dangerScore = parsed.dangerScore ?? dangerScore;
        featureName = parsed.feature ?? featureName;
        featureSentiment = parsed.featureSentiment ?? featureSentiment;
      }
    } catch (e) {
      console.warn('[Analyze] Groq failed, using defaults:', e);
    }

    setAiResult({ sentiment, isSarcastic, sarcasticConfidence, dangerScore, feature: featureName, featureSentiment });
    setAiReply(null);
    setIsAnalyzing(false);
  }, [pasteText, manualPlatform]);

  // Generate a tone-appropriate reply after analysis
  const handleGenerateReply = useCallback(async () => {
    if (!aiResult || !pasteText.trim()) return;
    setIsGeneratingReply(true);
    setAiReply(null);
    try {
      const apiKey = process.env.EXPO_PUBLIC_GROQ_API_KEY ?? '';
      if (apiKey.startsWith('gsk_')) {
        const toneGuide = aiResult.sentiment === 'positive'
          ? 'warm, grateful, encouraging'
          : aiResult.isSarcastic
            ? 'empathetic, de-escalating, calm — acknowledge their frustration without being defensive'
            : 'apologetic, professional, solution-focused';
        const prompt =
          `You are a professional brand manager writing a reply to a customer review.\n` +
          `Review: "${pasteText}"\n` +
          `Sentiment: ${aiResult.sentiment}${aiResult.isSarcastic ? ' (sarcastic)' : ''}\n` +
          `Key Feature Mentioned: ${aiResult.feature}\n` +
          `Tone Required: ${toneGuide}\n\n` +
          `Write a concise, human, brand-appropriate reply (2-4 sentences max).\n` +
          `Do NOT use markdown. Do NOT use asterisks. Output ONLY the reply text.`;
        const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
          body: JSON.stringify({
            model: 'llama-3.1-8b-instant',
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 200,
            temperature: 0.6,
          }),
        });
        const data = await res.json();
        const reply = data?.choices?.[0]?.message?.content?.trim() ?? '';
        setAiReply(reply);
      }
    } catch (e) {
      console.warn('[GenerateReply] Failed:', e);
    }
    setIsGeneratingReply(false);
  }, [aiResult, pasteText]);

  const handleConfirmAdd = useCallback(() => {
    if (!aiResult || !pasteText.trim()) return;
    const pm = PASTE_PLATFORM_META.find((p) => p.key === manualPlatform) ?? PASTE_PLATFORM_META[0];
    const newReview: Review = {
      id: `r_manual_${Date.now()}`, platform: manualPlatform,
      rating: aiResult.sentiment === 'positive' ? 4 : 2,
      language: 'en', sentiment: aiResult.sentiment,
      isSarcastic: aiResult.isSarcastic, sarcasticConfidence: aiResult.sarcasticConfidence,
      text: pasteText,
      features: [{ name: aiResult.feature, sentiment: aiResult.featureSentiment, confidence: aiResult.sarcasticConfidence || 0.72 }],
      dangerScore: aiResult.dangerScore, revenueRisk: Math.round(aiResult.dangerScore * 2000),
      productCategory: 'General', brandName: 'VoiceMap',
      highlights: [{ word: aiResult.feature.toLowerCase(), sentiment: aiResult.featureSentiment }],
      author: `${pm.label} Review`, likes: 0, createdAt: new Date().toISOString(),
    };
    addReview(newReview);
    setPasteText('');
    setAiResult(null);
    setAiReply(null);
    setShowAnalyze(false);
  }, [aiResult, pasteText, manualPlatform, addReview]);

  // Stats
  const totalNeg = reviews.filter((r) => r.sentiment === 'negative').length;
  const totalPos = reviews.filter((r) => r.sentiment === 'positive').length;
  const totalSarc = reviews.filter((r) => r.isSarcastic).length;
  const activeFilter = FILTERS.find((f) => f.key === filter)!;

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ImportReviewsModal visible={showImport} onClose={() => setShowImport(false)} />

      {/* ── Premium Header ── */}
      <LinearGradient colors={[Palette.deepNavy, Palette.navyCard]} style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.headerLabel}>{t.reviews_label}</Text>
            <Text style={styles.headerTitle}>{t.reviews_title}</Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.importBtn} onPress={() => setShowImport(true)}>
              <Feather name="upload" size={14} color="#fff" />
              <Text style={styles.importBtnText}>{t.reviews_import}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ── Mini Stats Row ── */}
        <View style={styles.statsRow}>
          <View style={styles.statChip}>
            <Text style={[styles.statVal, { color: '#fff' }]}>{reviews.length}</Text>
            <Text style={styles.statLab}>Total</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statChip}>
            <Text style={[styles.statVal, { color: Palette.danger }]}>{totalNeg}</Text>
            <Text style={styles.statLab}>Critical</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statChip}>
            <Text style={[styles.statVal, { color: Palette.success }]}>{totalPos}</Text>
            <Text style={styles.statLab}>Positive</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statChip}>
            <Text style={[styles.statVal, { color: '#FBBF24' }]}>{totalSarc}</Text>
            <Text style={styles.statLab}>Sarcastic</Text>
          </View>
        </View>

        {/* ── Filter Tabs ── */}
        <View style={styles.filterRow}>
          {FILTERS.map((tab) => {
            const isActive = filter === tab.key;
            const count = tab.key === 'all' ? reviews.length
              : tab.key === 'sarcastic' ? totalSarc
                : tab.key === 'negative' ? totalNeg : totalPos;
            return (
              <TouchableOpacity
                key={tab.key}
                style={[styles.filterTab, isActive && { backgroundColor: tab.color + '22', borderColor: tab.color + '80' }]}
                onPress={() => handleFilterChange(tab.key)}
                activeOpacity={0.75}
              >
                <Text style={styles.filterIcon}>{tab.icon}</Text>
                <Text style={[styles.filterLabel, isActive && { color: tab.color }]}>{tab.label}</Text>
                <View style={[styles.filterBadge, isActive && { backgroundColor: tab.color + '33' }]}>
                  <Text style={[styles.filterBadgeText, isActive && { color: tab.color }]}>{count}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </LinearGradient>

      {/* ── AI Smart Analyze Panel ── */}
      {showAnalyze && (
        <View style={styles.analyzePanel}>
          <View style={styles.analyzePanelHeader}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Feather name="cpu" size={16} color={Palette.violetLight} />
              <Text style={styles.analyzePanelTitle}>AI Smart Classify</Text>
            </View>
            <TouchableOpacity onPress={() => { setShowAnalyze(false); setAiResult(null); setPasteText(''); }}>
              <Feather name="x" size={18} color={Palette.grey400} />
            </TouchableOpacity>
          </View>
          <Text style={styles.analyzePanelSub}>Paste any customer review — Groq will instantly classify it for you.</Text>

          {/* Platform selector */}
          <View style={styles.platformRow}>
            {PASTE_PLATFORM_META.map((p) => (
              <TouchableOpacity
                key={p.key}
                style={[styles.platformBtn, manualPlatform === p.key && { borderColor: p.color, backgroundColor: p.color + '22' }]}
                onPress={() => setManualPlatform(p.key)}
              >
                <Text style={{ fontSize: 14 }}>{p.icon}</Text>
                <Text style={[styles.platformBtnText, manualPlatform === p.key && { color: p.color }]}>{p.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Text input */}
          <TextInput
            style={styles.analyzeInput}
            value={pasteText}
            onChangeText={(v) => { setPasteText(v); setAiResult(null); }}
            placeholder="Paste a review here..."
            placeholderTextColor={Palette.grey600}
            multiline
            numberOfLines={3}
          />

          {/* Analyze button */}
          <TouchableOpacity
            style={[styles.analyzeRunBtn, (isAnalyzing || !pasteText.trim()) && { opacity: 0.5 }]}
            onPress={handleAnalyze}
            disabled={isAnalyzing || !pasteText.trim()}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={[Palette.violet, Palette.violetLight]}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
              style={styles.analyzeRunBtnGrad}
            >
              <Feather name={isAnalyzing ? 'loader' : 'zap'} size={15} color="#fff" />
              <Text style={styles.analyzeRunBtnText}>{isAnalyzing ? 'Analyzing...' : 'Run AI Analysis'}</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* AI Result Preview */}
          {aiResult && (
            <View style={styles.aiResultCard}>
              <Text style={styles.aiResultTitle}>🤖 AI Classification Result</Text>
              <View style={styles.aiResultGrid}>
                <View style={styles.aiResultItem}>
                  <Text style={styles.aiResultLabel}>Sentiment</Text>
                  <Text style={[
                    styles.aiResultVal,
                    { color: aiResult.sentiment === 'positive' ? Palette.success : aiResult.sentiment === 'negative' ? Palette.danger : Palette.warning }
                  ]}>
                    {aiResult.sentiment === 'positive' ? '😊 Positive' : aiResult.sentiment === 'negative' ? '😠 Negative' : '😐 Neutral'}
                  </Text>
                </View>
                <View style={styles.aiResultItem}>
                  <Text style={styles.aiResultLabel}>Sarcastic?</Text>
                  <Text style={[styles.aiResultVal, { color: aiResult.isSarcastic ? '#FBBF24' : Palette.grey400 }]}>
                    {aiResult.isSarcastic ? `🎭 Yes (${Math.round(aiResult.sarcasticConfidence * 100)}%)` : '❌ No'}
                  </Text>
                </View>
                <View style={styles.aiResultItem}>
                  <Text style={styles.aiResultLabel}>Risk Score</Text>
                  <Text style={[styles.aiResultVal, { color: aiResult.dangerScore >= 70 ? Palette.danger : aiResult.dangerScore >= 40 ? Palette.warning : Palette.success }]}>
                    {aiResult.dangerScore}/100
                  </Text>
                </View>
                <View style={styles.aiResultItem}>
                  <Text style={styles.aiResultLabel}>Feature</Text>
                  <Text style={styles.aiResultVal}>📦 {aiResult.feature}</Text>
                </View>
              </View>

              {/* Step 2: Generate Reply */}
              {!aiReply && (
                <TouchableOpacity
                  style={[styles.generateReplyBtn, isGeneratingReply && { opacity: 0.6 }]}
                  onPress={handleGenerateReply}
                  disabled={isGeneratingReply}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={['#0EA5E9', '#38bdf8']}
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                    style={styles.generateReplyBtnGrad}
                  >
                    <Feather name={isGeneratingReply ? 'loader' : 'message-square'} size={15} color="#fff" />
                    <Text style={styles.generateReplyBtnText}>
                      {isGeneratingReply ? 'Generating Reply...' : '✨ Generate AI Reply'}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              )}

              {/* Step 3: Show reply + Submit */}
              {aiReply && (
                <View style={styles.replyBox}>
                  <View style={styles.replyBoxHeader}>
                    <Feather name="message-square" size={14} color="#38bdf8" />
                    <Text style={styles.replyBoxTitle}>AI Generated Reply</Text>
                    <TouchableOpacity onPress={() => setAiReply(null)} style={{ marginLeft: 'auto' }}>
                      <Feather name="refresh-cw" size={13} color={Palette.grey400} />
                    </TouchableOpacity>
                  </View>
                  <TextInput
                    style={styles.replyInput}
                    value={aiReply}
                    onChangeText={setAiReply}
                    multiline
                    scrollEnabled={false}
                    placeholderTextColor={Palette.grey500}
                  />
                  <TouchableOpacity
                    style={styles.submitReplyBtn}
                    onPress={handleConfirmAdd}
                    activeOpacity={0.85}
                  >
                    <LinearGradient
                      colors={[Palette.success, '#059669']}
                      start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                      style={styles.submitReplyBtnGrad}
                    >
                      <Feather name="send" size={15} color="#fff" />
                      <Text style={styles.submitReplyBtnText}>Submit Reply & Add Review</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
        </View>
      )}

      {/* ── Spam Detection Banner ── */}
      {spamCount > 0 && (
        <TouchableOpacity
          style={styles.spamBanner}
          onPress={() => setShowSpamModal(true)}
          activeOpacity={0.85}
        >
          <View style={styles.spamBannerLeft}>
            <Text style={styles.spamBannerIcon}>🤖</Text>
            <View>
              <Text style={styles.spamBannerTitle}>
                {spamCount} Spam / Duplicate Review{spamCount !== 1 ? 's' : ''} Flagged
              </Text>
              <Text style={styles.spamBannerSub}>
                {spamReport.botIds.size} bot-like · {spamReport.duplicateIds.size} near-duplicates · Tap to inspect
              </Text>
            </View>
          </View>
          <Feather name="chevron-right" size={16} color="#FBBF24" />
        </TouchableOpacity>
      )}

      {/* ── Spam Reviews Modal ── */}
      <Modal
        visible={showSpamModal}
        animationType="slide"
        transparent
        onRequestClose={() => setShowSpamModal(false)}
      >
        <View style={styles.spamModalOverlay}>
          <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={() => setShowSpamModal(false)} />
          <View style={styles.spamModalSheet}>
            {/* Header */}
            <View style={styles.spamModalHeader}>
              <View style={{ flex: 1 }}>
                <Text style={styles.spamModalTitle}>🤖 Flagged Reviews</Text>
                <Text style={styles.spamModalSub}>
                  {spamReport.botIds.size} bot-like · {spamReport.duplicateIds.size} near-duplicates · excluded from analysis
                </Text>
              </View>
              <TouchableOpacity
                style={styles.spamModalClose}
                onPress={() => setShowSpamModal(false)}
              >
                <Feather name="x" size={18} color="#fff" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 520 }}>
              {/* Bot-like section */}
              {spamReport.botIds.size > 0 && (
                <View style={styles.spamSection}>
                  <View style={styles.spamSectionHeader}>
                    <Text style={styles.spamSectionTitle}>🤖 Bot-like Reviews</Text>
                    <View style={styles.spamSectionBadge}>
                      <Text style={styles.spamSectionCount}>{spamReport.botIds.size}</Text>
                    </View>
                  </View>
                  <Text style={styles.spamSectionDesc}>Short, generic, or suspiciously repetitive text — likely auto-generated.</Text>
                  {reviews.filter(r => spamReport.botIds.has(r.id)).map(r => (
                    <View key={r.id} style={[styles.spamCard, styles.spamCardBot]}>
                      <View style={styles.spamCardHeader}>
                        <Text style={styles.spamCardPlatform}>{r.platform}</Text>
                        <View style={styles.spamTypeTag}>
                          <Text style={styles.spamTypeTagText}>BOT</Text>
                        </View>
                      </View>
                      <Text style={styles.spamCardText} numberOfLines={3}>{r.text}</Text>
                      <Text style={styles.spamCardDate}>
                        {new Date(r.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </Text>
                    </View>
                  ))}
                </View>
              )}

              {/* Near-duplicate section */}
              {spamReport.duplicateIds.size > 0 && (
                <View style={styles.spamSection}>
                  <View style={styles.spamSectionHeader}>
                    <Text style={styles.spamSectionTitle}>📄 Near-Duplicates</Text>
                    <View style={[styles.spamSectionBadge, { backgroundColor: 'rgba(139,92,246,0.3)' }]}>
                      <Text style={[styles.spamSectionCount, { color: '#A78BFA' }]}>{spamReport.duplicateIds.size}</Text>
                    </View>
                  </View>
                  <Text style={styles.spamSectionDesc}>75%+ word overlap with another review — same reviewer or coordinated posting.</Text>
                  {reviews.filter(r => spamReport.duplicateIds.has(r.id)).map(r => (
                    <View key={r.id} style={[styles.spamCard, styles.spamCardDupe]}>
                      <View style={styles.spamCardHeader}>
                        <Text style={styles.spamCardPlatform}>{r.platform}</Text>
                        <View style={[styles.spamTypeTag, { backgroundColor: 'rgba(139,92,246,0.3)', borderColor: '#A78BFA' }]}>
                          <Text style={[styles.spamTypeTagText, { color: '#A78BFA' }]}>DUPLICATE</Text>
                        </View>
                      </View>
                      <Text style={styles.spamCardText} numberOfLines={3}>{r.text}</Text>
                      <Text style={styles.spamCardDate}>
                        {new Date(r.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </Text>
                    </View>
                  ))}
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* ── Active filter context ── */}
      <View style={styles.contextRow}>
        <Text style={styles.contextText}>
          Showing{' '}
          <Text style={{ color: activeFilter.color, fontWeight: '800' }}>
            {Math.min(visibleCount, filtered.length)}
          </Text>
          {' '}of{' '}
          <Text style={{ color: '#fff', fontWeight: '800' }}>{filtered.length}</Text>
          {' '}{activeFilter.label} reviews
        </Text>
      </View>

      {/* ── Review list ── */}
      <FlatList
        data={visibleReviews}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ReviewCard review={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={{ fontSize: 42, marginBottom: 12 }}>🔍</Text>
            <Text style={styles.emptyTitle}>No reviews found</Text>
            <Text style={styles.emptyText}>Try a different filter or import some reviews.</Text>
          </View>
        }
        ListFooterComponent={
          hasMore ? (
            <TouchableOpacity
              style={styles.viewMoreBtn}
              onPress={() => setVisibleCount((c) => c + 10)}
              activeOpacity={0.8}
            >
              <Feather name="chevrons-down" size={16} color={Palette.violetLight} />
              <Text style={styles.viewMoreText}>View More</Text>
              <View style={styles.viewMoreBadge}>
                <Text style={styles.viewMoreBadgeText}>{filtered.length - visibleCount} remaining</Text>
              </View>
            </TouchableOpacity>
          ) : filtered.length > 0 ? (
            <View style={styles.allLoadedBadge}>
              <Text style={styles.allLoadedText}>✅ All {filtered.length} reviews loaded</Text>
            </View>
          ) : null
        }
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Palette.deepNavy,
    paddingTop: Platform.select({ ios: 54, android: 32, default: 32 }),
  },

  // ── Header ──
  header: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: 20,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  headerTop: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 20,
  },
  headerLabel: { color: Palette.violetLight, fontSize: 10, fontWeight: '800', letterSpacing: 3, marginBottom: 3 },
  headerTitle: { color: '#fff', fontSize: 28, fontWeight: '900' },
  headerActions: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  iconBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: Palette.navySurface, borderWidth: 1, borderColor: Palette.navyBorder,
    alignItems: 'center', justifyContent: 'center',
  },
  importBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 7,
    backgroundColor: Palette.violet, paddingHorizontal: 14, paddingVertical: 9,
    borderRadius: 14,
  },
  importBtnText: { color: '#fff', fontWeight: '800', fontSize: 13 },

  // ── Stats Row ──
  statsRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 14, padding: 14, marginBottom: 16,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)',
  },
  statChip: { flex: 1, alignItems: 'center' },
  statVal: { fontSize: 20, fontWeight: '900' },
  statLab: { color: Palette.grey500, fontSize: 10, fontWeight: '600', marginTop: 1 },
  statDivider: { width: 1, height: 28, backgroundColor: 'rgba(255,255,255,0.08)' },

  // ── Filter Tabs ──
  filterRow: { flexDirection: 'row', gap: 8 },
  filterTab: {
    flex: 1, flexDirection: 'column', alignItems: 'center', gap: 3,
    paddingVertical: 8, borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)',
  },
  filterIcon: { fontSize: 14 },
  filterLabel: { color: Palette.grey400, fontSize: 10, fontWeight: '700' },
  filterBadge: {
    paddingHorizontal: 6, paddingVertical: 1, borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  filterBadgeText: { color: Palette.grey500, fontSize: 9, fontWeight: '800' },

  // ── Analyze Header Button ──
  analyzeHeaderBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: 12, paddingVertical: 9,
    borderRadius: 14, borderWidth: 1,
    borderColor: Palette.violet + '80',
    backgroundColor: Palette.violet + '18',
  },
  analyzeHeaderBtnText: { color: Palette.violetLight, fontWeight: '800', fontSize: 13 },

  // ── AI Analyze Panel ──
  analyzePanel: {
    marginHorizontal: 16, marginTop: 14,
    backgroundColor: Palette.navyCard, borderRadius: 18,
    padding: 16, borderWidth: 1, borderColor: Palette.violet + '40', gap: 12,
    shadowColor: Palette.violet, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 12, elevation: 6,
  },
  analyzePanelHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  analyzePanelTitle: { color: '#fff', fontWeight: '800', fontSize: 15 },
  analyzePanelSub: { color: Palette.grey400, fontSize: 12, lineHeight: 17 },
  platformRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  platformBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    paddingHorizontal: 10, paddingVertical: 6,
    borderRadius: 10, borderWidth: 1.5, borderColor: Palette.navyBorder,
    backgroundColor: Palette.deepNavy,
  },
  platformBtnText: { color: Palette.grey400, fontSize: 11, fontWeight: '700' },
  analyzeInput: {
    color: '#fff', fontSize: 13, minHeight: 80, textAlignVertical: 'top',
    lineHeight: 20, backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 12, padding: 12,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)',
  },
  analyzeRunBtn: { borderRadius: 14, overflow: 'hidden' },
  analyzeRunBtnGrad: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, paddingVertical: 13,
  },
  analyzeRunBtnText: { color: '#fff', fontWeight: '800', fontSize: 14 },

  // ── AI Result Card ──
  aiResultCard: {
    backgroundColor: 'rgba(108,92,231,0.08)', borderRadius: 14,
    borderWidth: 1, borderColor: Palette.violet + '50', padding: 14, gap: 12,
  },
  aiResultTitle: { color: Palette.violetLight, fontWeight: '800', fontSize: 13, letterSpacing: 0.3 },
  aiResultGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  aiResultItem: { width: '47%', backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: 10 },
  aiResultLabel: { color: Palette.grey500, fontSize: 10, fontWeight: '700', marginBottom: 4 },
  aiResultVal: { color: '#fff', fontSize: 13, fontWeight: '800' },
  confirmBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    backgroundColor: Palette.violet, borderRadius: 12, paddingVertical: 12,
  },
  confirmBtnText: { color: '#fff', fontWeight: '800', fontSize: 14 },

  generateReplyBtn: { borderRadius: 12, overflow: 'hidden', marginTop: 4 },
  generateReplyBtnGrad: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, paddingVertical: 12, paddingHorizontal: 16,
  },
  generateReplyBtnText: { color: '#fff', fontWeight: '800', fontSize: 14 },

  replyBox: {
    backgroundColor: 'rgba(56,189,248,0.08)', borderRadius: 12,
    borderWidth: 1, borderColor: 'rgba(56,189,248,0.3)', padding: 12, gap: 10,
  },
  replyBoxHeader: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  replyBoxTitle: { color: '#38bdf8', fontWeight: '800', fontSize: 13 },
  replyInput: {
    color: '#fff', fontSize: 13, lineHeight: 20,
    backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 8, padding: 10,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)',
  },
  submitReplyBtn: { borderRadius: 12, overflow: 'hidden' },
  submitReplyBtnGrad: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, paddingVertical: 13, paddingHorizontal: 16,
  },
  submitReplyBtnText: { color: '#fff', fontWeight: '900', fontSize: 14 },

  // ── Spam Banner ──
  spamBanner: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    marginHorizontal: 16, marginBottom: 8,
    backgroundColor: 'rgba(251,191,36,0.08)',
    borderRadius: 12, padding: 12,
    borderWidth: 1, borderColor: 'rgba(251,191,36,0.3)',
  },
  spamBannerActive: {
    backgroundColor: 'rgba(251,191,36,0.14)',
    borderColor: 'rgba(251,191,36,0.6)',
  },
  spamBannerLeft: { flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 },
  spamBannerIcon: { fontSize: 22 },
  spamBannerTitle: { color: '#FBBF24', fontWeight: '800', fontSize: 13 },
  spamBannerSub: { color: Palette.grey400, fontSize: 11, marginTop: 2 },

  // ── Spam Modal ──
  spamModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'flex-end',
  },
  spamModalSheet: {
    backgroundColor: Palette.navyCard,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    paddingBottom: 36,
    maxHeight: '88%',
    gap: 14,
    borderTopWidth: 1,
    borderColor: 'rgba(251,191,36,0.3)',
  },
  spamModalHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  spamModalTitle: {
    color: '#FBBF24',
    fontWeight: '900',
    fontSize: 17,
    letterSpacing: 0.2,
  },
  spamModalSub: {
    color: Palette.grey400,
    fontSize: 12,
    marginTop: 3,
  },
  spamModalClose: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spamSection: {
    gap: 8,
    marginBottom: 16,
  },
  spamSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  spamSectionTitle: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 13,
  },
  spamSectionBadge: {
    backgroundColor: 'rgba(251,191,36,0.25)',
    borderRadius: 999,
    paddingHorizontal: 9,
    paddingVertical: 3,
  },
  spamSectionCount: {
    color: '#FBBF24',
    fontWeight: '900',
    fontSize: 12,
  },
  spamSectionDesc: {
    color: Palette.grey500,
    fontSize: 11,
    lineHeight: 15,
    marginTop: -4,
  },
  spamCard: {
    borderRadius: 12,
    padding: 12,
    gap: 6,
    borderWidth: 1,
    marginBottom: 6,
  },
  spamCardBot: {
    backgroundColor: 'rgba(251,191,36,0.06)',
    borderColor: 'rgba(251,191,36,0.25)',
  },
  spamCardDupe: {
    backgroundColor: 'rgba(139,92,246,0.06)',
    borderColor: 'rgba(139,92,246,0.25)',
  },
  spamCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  spamCardPlatform: {
    color: Palette.grey400,
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  spamTypeTag: {
    backgroundColor: 'rgba(251,191,36,0.2)',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: '#FBBF24',
  },
  spamTypeTagText: {
    color: '#FBBF24',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1,
  },
  spamCardText: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 12,
    lineHeight: 18,
  },
  spamCardDate: {
    color: Palette.grey600,
    fontSize: 10,
    marginTop: 2,
  },

  // ── Context Row ──
  contextRow: {
    paddingHorizontal: 20, paddingTop: 14, paddingBottom: 6,
  },
  contextText: { color: Palette.grey500, fontSize: 12 },

  // ── List ──
  listContent: { paddingTop: 8, paddingBottom: 36 },
  empty: { alignItems: 'center', paddingTop: 60, paddingHorizontal: 32 },
  emptyTitle: { color: '#fff', fontWeight: '800', fontSize: 18, marginBottom: 6 },
  emptyText: { color: Palette.grey500, fontSize: 14, textAlign: 'center', lineHeight: 20 },

  viewMoreBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    marginHorizontal: 16, marginTop: 4, marginBottom: 8,
    paddingVertical: 14, borderRadius: 16,
    backgroundColor: Palette.navyCard,
    borderWidth: 1, borderColor: Palette.violet + '80',
  },
  viewMoreText: { color: Palette.violetLight, fontWeight: '800', fontSize: 14 },
  viewMoreBadge: {
    backgroundColor: Palette.violet + '30', borderRadius: 999,
    paddingHorizontal: 8, paddingVertical: 2,
  },
  viewMoreBadgeText: { color: Palette.violetLight, fontSize: 10, fontWeight: '700' },
  allLoadedBadge: {
    marginHorizontal: 16, marginTop: 4, marginBottom: 8, paddingVertical: 10,
    borderRadius: 14, alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.08)',
    borderWidth: 1, borderColor: 'rgba(16, 185, 129, 0.25)',
  },
  allLoadedText: { color: Palette.success, fontWeight: '700', fontSize: 13 },
});

