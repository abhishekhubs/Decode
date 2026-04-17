// VoiceMap — Review Card Component
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Review } from '@/types';
import { Palette, Radii } from '@/constants/theme';
import { SentimentBadge } from '@/components/common/SentimentBadge';

interface Props {
  review: Review;
}

const PLATFORM_META: Record<string, { icon: string; label: string; color: string }> = {
  amazon:   { icon: '🛒', label: 'Amazon',   color: '#FF9900' },
  flipkart: { icon: '🏪', label: 'Flipkart', color: '#2874F0' },
  youtube:  { icon: '▶️', label: 'YouTube',  color: '#FF0000' },
  twitter:  { icon: '🐦', label: 'Twitter',  color: '#1DA1F2' },
  manual:   { icon: '✏️', label: 'Other',    color: '#8B5CF6' },
};

import { useTranslation } from '@/hooks/useTranslation';

export function ReviewCard({ review }: Props) {
  const router = useRouter();
  const t = useTranslation();
  const dangerColor =
    review.dangerScore >= 70 ? Palette.danger :
    review.dangerScore >= 40 ? Palette.warning :
    Palette.success;

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => router.push({ pathname: '/review-detail' as any, params: { id: review.id } })}
    >
      {/* Left danger stripe */}
      <View style={[styles.stripe, { backgroundColor: dangerColor }]} />

      <View style={styles.content}>
        {/* Top row */}
        <View style={styles.topRow}>
          {(() => {
            const pm = PLATFORM_META[review.platform] ?? PLATFORM_META.manual;
            return (
              <View style={[styles.platformPill, { borderColor: pm.color + '55', backgroundColor: pm.color + '18' }]}>
                <Text style={styles.platformIcon}>{pm.icon}</Text>
                <Text style={[styles.platform, { color: pm.color }]}>{pm.label}</Text>
              </View>
            );
          })()}
          <View style={styles.stars}>
            {Array.from({ length: 5 }, (_, i) => (
              <Text
                key={i}
                style={[
                  styles.star,
                  { color: i < review.rating ? Palette.warning : Palette.grey700 },
                ]}
              >
                {i < review.rating ? '★' : '☆'}
              </Text>
            ))}
          </View>
          <View style={[styles.scorePill, { backgroundColor: dangerColor + '22', borderColor: dangerColor }]}>
            <Text style={[styles.scoreText, { color: dangerColor }]}>{review.dangerScore}</Text>
          </View>
        </View>

        {/* Review text */}
        <Text style={styles.text} numberOfLines={2}>{review.text}</Text>

        {/* Feature chips */}
        <View style={styles.chips}>
          {review.isSarcastic && (
            <View style={[styles.chip, { backgroundColor: Palette.warningDim }]}>
              <Text style={[styles.chipText, { color: Palette.warningLight }]}>🎭 {t.reviews_filter_sarcastic}</Text>
            </View>
          )}
          {review.features.slice(0, 2).map((f) => (
            <View
              key={f.name}
              style={[styles.chip, {
                backgroundColor: f.sentiment === 'positive' ? Palette.successDim : Palette.dangerDim,
              }]}
            >
              <Text style={[styles.chipText, {
                color: f.sentiment === 'positive' ? Palette.successLight : Palette.dangerLight,
              }]}>
                {f.name}
              </Text>
            </View>
          ))}
          <SentimentBadge sentiment={review.sentiment} small />
        </View>

        {/* Bottom row */}
        <View style={styles.bottomRow}>
          <Text style={styles.author}>{review.author ?? 'Anonymous'}</Text>
          <Text style={styles.date}>{new Date(review.createdAt).toLocaleDateString('en-IN')}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: Palette.navyCard,
    borderRadius: Radii.md,
    marginHorizontal: 16,
    marginBottom: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Palette.navyBorder,
  },
  stripe: {
    width: 4,
  },
  content: {
    flex: 1,
    padding: 12,
    gap: 8,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  platform: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  platformPill: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    paddingHorizontal: 8, paddingVertical: 3,
    borderRadius: 999, borderWidth: 1,
    flex: 1,
    alignSelf: 'flex-start',
  },
  platformIcon: { fontSize: 12 },
  stars: {
    flexDirection: 'row',
    gap: 1,
    alignItems: 'center',
  },
  star: {
    fontSize: 12,
    lineHeight: 14,
  },
  scorePill: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
    borderWidth: 1,
  },
  scoreText: {
    fontSize: 11,
    fontWeight: '800',
  },
  text: {
    color: Palette.grey300,
    fontSize: 13,
    lineHeight: 18,
  },
  chips: {
    flexDirection: 'row',
    gap: 6,
    flexWrap: 'wrap',
  },
  chip: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
  },
  chipText: {
    fontSize: 10,
    fontWeight: '700',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  author: {
    color: Palette.grey500,
    fontSize: 11,
  },
  date: {
    color: Palette.grey600,
    fontSize: 11,
  },
});
