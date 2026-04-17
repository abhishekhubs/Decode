// VoiceMap — Alert Card Component
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Alert } from '@/types';
import { Palette, Radii } from '@/constants/theme';
import { formatRupees } from '@/utils/scoring';
import { useAlertStore } from '@/store/useAlertStore';

interface Props {
  alert: Alert;
}

const SEVERITY_STYLES = {
  critical: { bg: Palette.dangerDim, border: Palette.danger, text: Palette.dangerLight, icon: '🔴' },
  medium:   { bg: Palette.warningDim, border: Palette.warning, text: Palette.warningLight, icon: '🟡' },
  low:      { bg: Palette.successDim, border: Palette.success, text: Palette.successLight, icon: '🟢' },
};

export function AlertCard({ alert }: Props) {
  const router = useRouter();
  const markRead = useAlertStore((s) => s.markRead);
  const cfg = SEVERITY_STYLES[alert.severity];

  return (
    <TouchableOpacity
      style={[
        styles.card,
        { borderColor: cfg.border, backgroundColor: cfg.bg + 'AA' },
        !alert.isRead && styles.unread,
      ]}
      onPress={() => {
        markRead(alert.id);
        router.push({ pathname: '/alert-detail' as any, params: { id: alert.id } });
      }}
      activeOpacity={0.8}
    >
      <View style={styles.topRow}>
        <Text style={styles.severityIcon}>{cfg.icon}</Text>
        <Text style={[styles.feature, { color: cfg.text }]}>{alert.feature}</Text>
        <View style={[styles.scoreBadge, { backgroundColor: cfg.border + '33' }]}>
          <Text style={[styles.scoreText, { color: cfg.text }]}>{alert.dangerScore}</Text>
        </View>
        {!alert.isRead && <View style={styles.unreadDot} />}
      </View>

      <Text style={styles.message} numberOfLines={2}>{alert.message}</Text>

      <View style={styles.meta}>
        <View style={styles.metaItem}>
          <Text style={styles.metaEmoji}>📈</Text>
          <Text style={styles.metaText}>+{alert.trendPercent}% WoW</Text>
        </View>
        <View style={styles.metaItem}>
          <Text style={styles.metaEmoji}>📝</Text>
          <Text style={styles.metaText}>{alert.reviewCount} reviews</Text>
        </View>
        <View style={styles.metaItem}>
          <Text style={[styles.risk, { color: cfg.text }]}>{formatRupees(alert.revenueRisk)} at risk</Text>
        </View>
      </View>

      <Text style={styles.time}>{new Date(alert.createdAt).toLocaleDateString('en-IN')}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginBottom: 10,
    borderRadius: Radii.md,
    padding: 14,
    borderWidth: 1.5,
    gap: 8,
  },
  unread: {
    shadowColor: Palette.danger,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  severityIcon: {
    fontSize: 16,
  },
  feature: {
    fontSize: 16,
    fontWeight: '800',
    flex: 1,
  },
  scoreBadge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: Radii.sm,
  },
  scoreText: {
    fontSize: 16,
    fontWeight: '900',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Palette.danger,
  },
  message: {
    color: Palette.grey300,
    fontSize: 13,
    lineHeight: 19,
  },
  meta: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaEmoji: {
    fontSize: 12,
    lineHeight: 16,
  },
  metaText: {
    color: Palette.grey400,
    fontSize: 12,
    fontWeight: '600',
  },
  risk: {
    fontSize: 12,
    fontWeight: '800',
  },
  time: {
    color: Palette.grey600,
    fontSize: 11,
  },
});
