// VoiceMap — Review Card Component (Premium Edition)
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Review } from '@/types';
import { Palette, Radii } from '@/constants/theme';
import { SentimentBadge } from '@/components/common/SentimentBadge';
import { useTranslation } from '@/hooks/useTranslation';
import { Feather } from '@expo/vector-icons';

interface Props { review: Review; }

const PLATFORM_META: Record<string, { icon: string; label: string; color: string }> = {
  amazon:   { icon: '🛒', label: 'Amazon',   color: '#FF9900' },
  flipkart: { icon: '🏪', label: 'Flipkart', color: '#2874F0' },
  youtube:  { icon: '▶️', label: 'YouTube',  color: '#FF0000' },
  twitter:  { icon: '🐦', label: 'Twitter',  color: '#1DA1F2' },
  manual:   { icon: '✏️', label: 'Other',    color: '#8B5CF6' },
};

function DangerMeter({ score }: { score: number }) {
  const color = score >= 70 ? Palette.danger : score >= 40 ? Palette.warning : Palette.success;
  const pct = Math.min(score / 100, 1);
  return (
    <View style={meter.wrap}>
      <View style={meter.track}>
        <View style={[meter.fill, { width: `${pct * 100}%` as any, backgroundColor: color }]} />
      </View>
      <Text style={[meter.label, { color }]}>{score}</Text>
    </View>
  );
}

const meter = StyleSheet.create({
  wrap: { flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 },
  track: {
    flex: 1, height: 4, borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.08)', overflow: 'hidden',
  },
  fill: { height: 4, borderRadius: 2 },
  label: { fontWeight: '800', fontSize: 12, minWidth: 24, textAlign: 'right' },
});

export function ReviewCard({ review }: Props) {
  const router = useRouter();
  const t = useTranslation();
  const pm = PLATFORM_META[review.platform] ?? PLATFORM_META.manual;
  const dangerColor =
    review.dangerScore >= 70 ? Palette.danger :
    review.dangerScore >= 40 ? Palette.warning :
    Palette.success;
  const [pressed, setPressed] = useState(false);

  const sentimentIcon = review.sentiment === 'positive' ? '😊' : review.sentiment === 'negative' ? '😠' : '😐';

  return (
    <TouchableOpacity
      style={[styles.card, pressed && styles.cardPressed]}
      activeOpacity={1}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      onPress={() => router.push({ pathname: '/review-detail' as any, params: { id: review.id } })}
    >
      {/* Left accent bar */}
      <View style={[styles.accentBar, { backgroundColor: dangerColor }]} />

      <View style={styles.body}>
        {/* ── Row 1: Platform + Stars + Sentiment ── */}
        <View style={styles.topRow}>
          <View style={[styles.platformPill, { borderColor: pm.color + '60', backgroundColor: pm.color + '18' }]}>
            <Text style={styles.platformIcon}>{pm.icon}</Text>
            <Text style={[styles.platformLabel, { color: pm.color }]}>{pm.label}</Text>
          </View>

          <View style={styles.stars}>
            {Array.from({ length: 5 }, (_, i) => (
              <Text key={i} style={{ color: i < review.rating ? '#FBBF24' : 'rgba(255,255,255,0.12)', fontSize: 11 }}>
                {'★'}
              </Text>
            ))}
          </View>

          <View style={[styles.sentimentIcon, { backgroundColor: dangerColor + '18' }]}>
            <Text style={{ fontSize: 14 }}>{sentimentIcon}</Text>
          </View>
        </View>

        {/* ── Row 2: Review text ── */}
        <Text style={styles.reviewText}>{review.text}</Text>

        {/* ── Row 3: Danger meter ── */}
        <View style={styles.meterRow}>
          <Text style={styles.meterLabel}>Risk</Text>
          <DangerMeter score={review.dangerScore} />
        </View>

        {/* ── Row 4: Feature chips ── */}
        <View style={styles.chips}>
          {review.isSarcastic && (
            <View style={[styles.chip, { backgroundColor: '#78350F33', borderColor: '#FCD34D44' }]}>
              <Text style={[styles.chipText, { color: '#FCD34D' }]}>🎭 Sarcastic</Text>
            </View>
          )}
          {review.features.slice(0, 2).map((f) => (
            <View key={f.name} style={[styles.chip, {
              backgroundColor: f.sentiment === 'positive' ? '#06452933' : '#7F1D1D33',
              borderColor: f.sentiment === 'positive' ? Palette.success + '55' : Palette.danger + '55',
            }]}>
              <Text style={[styles.chipText, {
                color: f.sentiment === 'positive' ? Palette.successLight : Palette.dangerLight,
              }]}>
                {f.sentiment === 'positive' ? '✓' : '✗'} {f.name}
              </Text>
            </View>
          ))}
          <SentimentBadge sentiment={review.sentiment} small />
        </View>

        {/* ── Row 5: Author + Date ── */}
        <View style={styles.footer}>
          <View style={styles.authorRow}>
            <View style={styles.avatarDot}>
              <Text style={{ color: '#fff', fontSize: 9, fontWeight: '800' }}>
                {(review.author ?? 'A')[0].toUpperCase()}
              </Text>
            </View>
            <Text style={styles.authorText}>{review.author ?? 'Anonymous'}</Text>
          </View>
          <View style={styles.footerRight}>
            <Text style={styles.dateText}>
              {new Date(review.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
            </Text>
            <Feather name="chevron-right" size={14} color={Palette.grey600} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: Palette.navyCard,
    borderRadius: 18,
    marginHorizontal: 16,
    marginBottom: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  cardPressed: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderColor: Palette.violet + '60',
  },
  accentBar: { width: 4 },
  body: { flex: 1, padding: 14, gap: 10 },

  topRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  platformPill: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    paddingHorizontal: 9, paddingVertical: 4,
    borderRadius: 999, borderWidth: 1, flex: 1, alignSelf: 'flex-start',
  },
  platformIcon: { fontSize: 12 },
  platformLabel: { fontSize: 11, fontWeight: '800', letterSpacing: 0.3 },
  stars: { flexDirection: 'row', gap: 1 },
  sentimentIcon: {
    width: 28, height: 28, borderRadius: 14,
    alignItems: 'center', justifyContent: 'center',
  },

  reviewText: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 13.5,
    lineHeight: 20,
    letterSpacing: 0.1,
  },

  meterRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  meterLabel: { color: Palette.grey500, fontSize: 10, fontWeight: '700', width: 24 },

  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  chip: {
    paddingHorizontal: 8, paddingVertical: 3,
    borderRadius: 999, borderWidth: 1,
  },
  chipText: { fontSize: 10, fontWeight: '700' },

  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  authorRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  avatarDot: {
    width: 20, height: 20, borderRadius: 10,
    backgroundColor: Palette.violet,
    alignItems: 'center', justifyContent: 'center',
  },
  authorText: { color: Palette.grey400, fontSize: 11, fontWeight: '600' },
  footerRight: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  dateText: { color: Palette.grey600, fontSize: 11 },
});
