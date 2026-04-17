// VoiceMap — Emerging Issues Table (Top 5 ranked)
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Palette, Radii } from '@/constants/theme';
import { Alert } from '@/types';

interface Props {
  alerts: Alert[];
}

function severityColor(score: number) {
  if (score >= 70) return Palette.danger;
  if (score >= 40) return Palette.warning;
  return Palette.success;
}

export function EmergingIssuesTable({ alerts }: Props) {
  const router = useRouter();
  const sorted = [...alerts].sort((a, b) => b.dangerScore - a.dangerScore).slice(0, 5);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🚨 Emerging Issues</Text>
        <TouchableOpacity onPress={() => router.push('/(tabs)/alerts' as any)}>
          <Text style={styles.viewAll}>View All →</Text>
        </TouchableOpacity>
      </View>
      {sorted.map((alert, idx) => (
        <TouchableOpacity
          key={alert.id}
          style={styles.row}
          onPress={() => router.push({ pathname: '/alert-detail' as any, params: { id: alert.id } })}
          activeOpacity={0.7}
        >
          <View style={[styles.rank, { borderColor: severityColor(alert.dangerScore) }]}>
            <Text style={[styles.rankText, { color: severityColor(alert.dangerScore) }]}>
              #{idx + 1}
            </Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.feature}>{alert.feature}</Text>
            <Text style={styles.meta}>
              {alert.reviewCount} reviews · {alert.trendPercent > 0 ? '+' : ''}{alert.trendPercent}% WoW
            </Text>
          </View>
          <View style={[styles.scoreBadge, { backgroundColor: severityColor(alert.dangerScore) + '22' }]}>
            <Text style={[styles.scoreText, { color: severityColor(alert.dangerScore) }]}>
              {alert.dangerScore}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: Palette.navyCard,
    borderRadius: Radii.lg,
    padding: 16,
    borderWidth: 1,
    borderColor: Palette.navyBorder,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
  viewAll: {
    color: Palette.violetLight,
    fontSize: 13,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Palette.navyBorder,
    gap: 12,
  },
  rank: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rankText: {
    fontSize: 11,
    fontWeight: '800',
  },
  info: {
    flex: 1,
  },
  feature: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  meta: {
    color: Palette.grey400,
    fontSize: 11,
    marginTop: 2,
  },
  scoreBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Radii.sm,
    minWidth: 44,
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 16,
    fontWeight: '900',
  },
});
