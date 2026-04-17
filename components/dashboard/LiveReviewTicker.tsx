// VoiceMap — Live Review Ticker (auto-scrolling incoming reviews)
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Palette, Radii } from '@/constants/theme';
import { Review } from '@/types';

interface Props {
  reviews: Review[];
}

const PLATFORM_ICON: Record<string, string> = {
  amazon: '🛒',
  flipkart: '🏪',
  youtube: '▶️',
  twitter: '🐦',
  manual: '✏️',
};

export function LiveReviewTicker({ reviews }: Props) {
  const [idx, setIdx] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const recent = reviews.slice(0, 20); // show latest 20

  useEffect(() => {
    const interval = setInterval(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setIdx((prev) => (prev + 1) % recent.length);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      });
    }, 3500);
    return () => clearInterval(interval);
  }, [recent.length]);

  const review = recent[idx];
  if (!review) return null;

  const sentColor =
    review.sentiment === 'positive' ? Palette.success :
    review.sentiment === 'negative' ? Palette.danger :
    Palette.warning;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.liveDot} />
        <Text style={styles.liveText}>LIVE FEED</Text>
      </View>
      <Animated.View style={[styles.card, { opacity: fadeAnim, borderLeftColor: sentColor }]}>
        <View style={styles.meta}>
          <Text style={styles.platform}>{PLATFORM_ICON[review.platform]} {review.platform}</Text>
          <Text style={styles.rating}>{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</Text>
          {review.isSarcastic && (
            <View style={styles.sarBadge}>
              <Text style={styles.sarText}>🎭 Sarcastic</Text>
            </View>
          )}
        </View>
        <Text style={styles.reviewText} numberOfLines={2}>{review.text}</Text>
        <View style={styles.features}>
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
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 24,
    backgroundColor: Palette.navyCard,
    borderRadius: Radii.lg,
    padding: 16,
    borderWidth: 1,
    borderColor: Palette.navyBorder,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Palette.danger,
    // Simulated pulse (would need Animated for real pulse)
    shadowColor: Palette.danger,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 6,
    elevation: 4,
  },
  liveText: {
    color: Palette.danger,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 2,
  },
  card: {
    borderLeftWidth: 3,
    paddingLeft: 12,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 6,
    flexWrap: 'wrap',
  },
  platform: {
    color: Palette.grey400,
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  rating: {
    color: Palette.warning,
    fontSize: 12,
  },
  sarBadge: {
    backgroundColor: Palette.warningDim,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 999,
  },
  sarText: {
    color: Palette.warningLight,
    fontSize: 10,
    fontWeight: '700',
  },
  reviewText: {
    color: Palette.grey300,
    fontSize: 13,
    lineHeight: 19,
    fontStyle: 'italic',
    marginBottom: 8,
  },
  features: {
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
});
