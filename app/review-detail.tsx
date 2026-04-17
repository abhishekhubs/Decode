// VoiceMap — Review Detail Modal (XAI word highlights)
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Platform, ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useReviewStore } from '@/store/useReviewStore';
import { SentimentBadge } from '@/components/common/SentimentBadge';
import { Palette, Radii, Spacing } from '@/constants/theme';
import { generateAutoReply, ReplyTone } from '@/utils/groqClient';

const TONES: ReplyTone[] = ['Professional', 'Apologetic', 'Empathetic', 'Humorous'];

const PLATFORM_ICON: Record<string, string> = {
  amazon: '🛒', flipkart: '🏪', youtube: '▶️', twitter: '🐦', manual: '✏️',
};

// XAI: render review text with highlighted key words
function XAIHighlight({ text, highlights }: {
  text: string;
  highlights: { word: string; sentiment: string }[];
}) {
  if (!highlights?.length) {
    return <Text style={styles.reviewText}>{text}</Text>;
  }

  const parts: { chunk: string; sentiment?: string }[] = [];
  let remaining = text;

  highlights.forEach(({ word, sentiment }) => {
    const idx = remaining.toLowerCase().indexOf(word.toLowerCase());
    if (idx !== -1) {
      if (idx > 0) parts.push({ chunk: remaining.slice(0, idx) });
      parts.push({ chunk: remaining.slice(idx, idx + word.length), sentiment });
      remaining = remaining.slice(idx + word.length);
    }
  });
  if (remaining) parts.push({ chunk: remaining });

  return (
    <Text style={styles.reviewText}>
      {parts.map((part, i) => (
        <Text
          key={i}
          style={
            part.sentiment === 'positive'
              ? styles.posHighlight
              : part.sentiment === 'negative'
              ? styles.negHighlight
              : undefined
          }
        >
          {part.chunk}
        </Text>
      ))}
    </Text>
  );
}

export default function ReviewDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const reviews = useReviewStore((s) => s.reviews);
  const review = reviews.find((r) => r.id === id);
  const [reply, setReply] = useState('');
  const [tone, setTone] = useState<ReplyTone>('Professional');
  const [generating, setGenerating] = useState(false);

  if (!review) {
    return (
      <View style={styles.root}>
        <Text style={{ color: '#fff', textAlign: 'center', marginTop: 100 }}>Review not found</Text>
      </View>
    );
  }

  const dangerColor =
    review.dangerScore >= 70 ? Palette.danger :
    review.dangerScore >= 40 ? Palette.warning :
    Palette.success;

  const handleGenerateReply = async () => {
    setGenerating(true);
    const feature = review.features[0]?.name ?? 'General';
    const generated = await generateAutoReply(review.text, feature, review.language, tone);
    setReply(generated);
    setGenerating(false);
  };

  return (
    <View style={styles.root}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Review Detail</Text>
        <View style={[styles.scorePill, { backgroundColor: dangerColor + '33' }]}>
          <Text style={[styles.scoreText, { color: dangerColor }]}>{review.dangerScore}</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>

        {/* Meta card */}
        <View style={styles.metaCard}>
          <View style={styles.metaRow}>
            <Text style={styles.platform}>{PLATFORM_ICON[review.platform]} {review.platform}</Text>
            <Text style={styles.author}>{review.author}</Text>
            <Text style={styles.date}>{new Date(review.createdAt).toLocaleDateString('en-IN')}</Text>
          </View>
          <View style={styles.starsRow}>
            {Array.from({ length: 5 }, (_, i) => (
              <Text
                key={i}
                style={[styles.starText, { color: i < review.rating ? Palette.warning : Palette.grey700 }]}
              >
                {i < review.rating ? '★' : '☆'}
              </Text>
            ))}
            <Text style={styles.ratingText}>{review.rating}/5</Text>
          </View>
          <View style={styles.badgeRow}>
            <SentimentBadge sentiment={review.sentiment} />
            {review.isSarcastic && <SentimentBadge sentiment="sarcastic" />}
          </View>
        </View>

        {/* XAI Review Text */}
        <View style={styles.textCard}>
          <Text style={styles.cardTitle}>💬 Review Text</Text>
          <Text style={styles.xaiLegend}>
            <Text style={styles.posHighlight}>■ Positive</Text>
            {'  '}
            <Text style={styles.negHighlight}>■ Negative</Text>
            {'  '}highlights = XAI attribution
          </Text>
          <XAIHighlight text={review.text} highlights={review.highlights} />
        </View>

        {/* Sarcasm detector */}
        {review.isSarcastic && (
          <View style={styles.sarcasticCard}>
            <Text style={styles.cardTitle}>🎭 Sarcasm Detected</Text>
            <View style={styles.sarcasticBar}>
              <View style={[styles.sarcasticFill, { width: `${review.sarcasticConfidence * 100}%` }]} />
            </View>
            <Text style={styles.sarcasticConf}>
              Confidence: {Math.round(review.sarcasticConfidence * 100)}%
            </Text>
            <Text style={styles.sarcasticNote}>
              Our BERT sarcasm detector flagged this review. Actual sentiment may differ from surface text.
            </Text>
          </View>
        )}

        {/* Feature breakdown */}
        <View style={styles.featuresCard}>
          <Text style={styles.cardTitle}>🎯 Feature Analysis</Text>
          {review.features.map((f) => (
            <View key={f.name} style={styles.featureRow}>
              <Text style={styles.featureName}>{f.name}</Text>
              <View style={styles.confBar}>
                <View
                  style={[
                    styles.confFill,
                    {
                      width: `${f.confidence * 100}%`,
                      backgroundColor: f.sentiment === 'positive' ? Palette.success : Palette.danger,
                    },
                  ]}
                />
              </View>
              <Text style={[
                styles.featureSent,
                { color: f.sentiment === 'positive' ? Palette.successLight : Palette.dangerLight },
              ]}>
                {f.sentiment} ({Math.round(f.confidence * 100)}%)
              </Text>
            </View>
          ))}
        </View>

        {/* Language info */}
        <View style={styles.langCard}>
          <Text style={{ fontSize: 16 }}>🌐</Text>
          <Text style={styles.langText}>
            Language: <Text style={{ color: Palette.violetLight, fontWeight: '700' }}>{review.language.toUpperCase()}</Text>
            {'  ·  '}
            {review.likes} reactions
          </Text>
        </View>

        {/* Auto-Reply */}
        <View style={styles.replySection}>
          <Text style={styles.cardTitle}>🤖 AI Auto-Reply</Text>
          
          <Text style={styles.toneLabel}>Select Tone:</Text>
          <View style={styles.toneSelector}>
            {TONES.map(t => (
              <TouchableOpacity 
                key={t}
                style={[styles.toneBtn, tone === t && styles.toneBtnActive]}
                onPress={() => setTone(t)}
              >
                <Text style={[styles.toneBtnText, tone === t && styles.toneBtnTextActive]}>
                  {t}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity
            style={[styles.generateBtn, generating && { opacity: 0.6 }]}
            onPress={handleGenerateReply}
            disabled={generating}
          >
            {generating ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.generateBtnText}>✨ Generate Reply with Groq</Text>
            )}
          </TouchableOpacity>
          {reply ? (
            <View style={styles.replyCard}>
              <Text style={styles.replyText}>{reply}</Text>
            </View>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Palette.deepNavy, paddingTop: Platform.OS === 'android' ? 28 : 50 },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: Spacing.md, paddingBottom: 14,
    borderBottomWidth: 1, borderBottomColor: Palette.navyBorder,
  },
  backBtn: {
    width: 36, height: 36, borderRadius: 18, backgroundColor: Palette.navyCard,
    alignItems: 'center', justifyContent: 'center',
  },
  backArrow: { fontSize: 22, color: Palette.grey300, lineHeight: 26 },
  starText: { fontSize: 18, lineHeight: 22 },
  headerTitle: { color: '#fff', fontSize: 17, fontWeight: '800' },
  scorePill: { paddingHorizontal: 12, paddingVertical: 5, borderRadius: 999 },
  scoreText: { fontWeight: '900', fontSize: 15 },
  content: { padding: Spacing.md, gap: 12, paddingBottom: 48 },
  metaCard: {
    backgroundColor: Palette.navyCard, borderRadius: Radii.md, padding: 16,
    borderWidth: 1, borderColor: Palette.navyBorder, gap: 10,
  },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 10, flexWrap: 'wrap' },
  platform: { color: Palette.grey400, fontSize: 13, fontWeight: '600', textTransform: 'capitalize', flex: 1 },
  author: { color: Palette.grey300, fontSize: 13, fontWeight: '600' },
  date: { color: Palette.grey600, fontSize: 12 },
  starsRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  ratingText: { color: Palette.grey400, fontSize: 13, marginLeft: 4 },
  badgeRow: { flexDirection: 'row', gap: 8 },
  textCard: {
    backgroundColor: Palette.navyCard, borderRadius: Radii.md, padding: 16,
    borderWidth: 1, borderColor: Palette.navyBorder, gap: 10,
  },
  cardTitle: { color: '#fff', fontSize: 15, fontWeight: '800' },
  xaiLegend: { fontSize: 11, color: Palette.grey500, lineHeight: 17 },
  reviewText: { color: Palette.grey300, fontSize: 14, lineHeight: 22 },
  posHighlight: { backgroundColor: Palette.successDim + 'AA', color: Palette.successLight, borderRadius: 3 },
  negHighlight: { backgroundColor: Palette.dangerDim + 'AA', color: Palette.dangerLight, borderRadius: 3 },
  sarcasticCard: {
    backgroundColor: Palette.warningDim, borderRadius: Radii.md, padding: 16,
    borderWidth: 1, borderColor: Palette.warning, gap: 8,
  },
  sarcasticBar: { height: 8, backgroundColor: Palette.navyBorder, borderRadius: 999, overflow: 'hidden' },
  sarcasticFill: { height: 8, backgroundColor: Palette.warning, borderRadius: 999 },
  sarcasticConf: { color: Palette.warningLight, fontWeight: '700', fontSize: 13 },
  sarcasticNote: { color: Palette.warningLight, fontSize: 12, lineHeight: 17, opacity: 0.8 },
  featuresCard: {
    backgroundColor: Palette.navyCard, borderRadius: Radii.md, padding: 16,
    borderWidth: 1, borderColor: Palette.navyBorder, gap: 12,
  },
  featureRow: { gap: 6 },
  featureName: { color: '#fff', fontSize: 13, fontWeight: '700' },
  confBar: { height: 6, backgroundColor: Palette.navyBorder, borderRadius: 999, overflow: 'hidden' },
  confFill: { height: 6, borderRadius: 999 },
  featureSent: { fontSize: 12, fontWeight: '600' },
  langCard: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: Palette.violetDim, borderRadius: Radii.md, padding: 12,
    borderWidth: 1, borderColor: Palette.violet,
  },
  langText: { color: Palette.grey300, fontSize: 13 },
  replySection: {
    backgroundColor: Palette.navyCard, borderRadius: Radii.lg, padding: 16,
    borderWidth: 1, borderColor: Palette.navyBorder, gap: 10,
  },
  generateBtn: {
    backgroundColor: Palette.violet, borderRadius: Radii.md, paddingVertical: 12, alignItems: 'center',
  },
  generateBtnText: { color: '#fff', fontWeight: '800', fontSize: 15 },
  replyCard: {
    backgroundColor: Palette.navySurface, borderRadius: Radii.md, padding: 14,
    borderWidth: 1, borderColor: Palette.navyBorder,
  },
  replyText: { color: Palette.grey300, fontSize: 13, lineHeight: 20 },
  toneLabel: { color: Palette.grey400, fontSize: 12, fontWeight: '600', marginTop: 4 },
  toneSelector: { flexDirection: 'row', gap: 6, flexWrap: 'wrap', marginBottom: 4 },
  toneBtn: {
    paddingHorizontal: 12, paddingVertical: 6, borderRadius: Radii.sm,
    backgroundColor: Palette.navySurface, borderWidth: 1, borderColor: Palette.navyBorder,
  },
  toneBtnActive: { backgroundColor: Palette.violetDim, borderColor: Palette.violet },
  toneBtnText: { color: Palette.grey400, fontSize: 12, fontWeight: '600' },
  toneBtnTextActive: { color: Palette.violetLight },
});
