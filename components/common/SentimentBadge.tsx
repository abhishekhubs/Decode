// VoiceMap — Sentiment Badge Chip
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Palette } from '@/constants/theme';
import { Sentiment } from '@/types';

interface Props {
  sentiment: Sentiment | 'sarcastic';
  small?: boolean;
}

const BADGE_CONFIG = {
  positive: { label: '✅ Positive', bg: Palette.successDim,  text: Palette.successLight },
  negative: { label: '❌ Negative', bg: Palette.dangerDim,   text: Palette.dangerLight  },
  neutral:  { label: '⬜ Neutral',  bg: Palette.grey700,     text: Palette.grey300      },
  sarcastic:{ label: '🎭 Sarcastic',bg: Palette.warningDim,  text: Palette.warningLight },
} as const;

export function SentimentBadge({ sentiment, small = false }: Props) {
  const cfg = BADGE_CONFIG[sentiment] ?? BADGE_CONFIG.neutral;
  return (
    <View style={[styles.badge, { backgroundColor: cfg.bg }, small && styles.small]}>
      <Text style={[styles.label, { color: cfg.text }, small && styles.smallLabel]}>
        {small ? cfg.label.split(' ')[0] : cfg.label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    alignSelf: 'flex-start',
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  small: { paddingHorizontal: 6, paddingVertical: 2 },
  smallLabel: { fontSize: 10 },
});
