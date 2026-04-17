// VoiceMap — Revenue Risk KPI Card
import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Palette, Radii, Shadows } from '@/constants/theme';
import { formatRupees } from '@/utils/scoring';

interface KPICardProps {
  title: string;
  value: string;
  sub?: string;
  icon: string;
  color: string;
  dimColor: string;
}

export function KPICard({ title, value, sub, icon, color, dimColor }: KPICardProps) {
  return (
    <View style={[styles.card, Shadows.card]}>
      <View style={[styles.iconBox, { backgroundColor: dimColor }]}>
        <Text style={styles.iconText}>{icon}</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={[styles.value, { color }]}>{value}</Text>
      {sub ? <Text style={styles.sub}>{sub}</Text> : null}
    </View>
  );
}

interface RevenueRiskCardProps {
  revenueRisk: number;
  totalReviews: number;
  criticalAlerts: number;
  dangerScore: number;
}

export function RevenueRiskCards({ revenueRisk, totalReviews, criticalAlerts, dangerScore }: RevenueRiskCardProps) {
  return (
    <View style={styles.row}>
      <KPICard
        title="Revenue at Risk"
        value={formatRupees(revenueRisk)}
        sub="today"
        icon="💸"
        color={Palette.dangerLight}
        dimColor={Palette.dangerDim}
      />
      <KPICard
        title="Reviews Analyzed"
        value={totalReviews.toString()}
        sub="all time"
        icon="📊"
        color={Palette.violetLight}
        dimColor={Palette.violetDim}
      />
      <KPICard
        title="Critical Alerts"
        value={criticalAlerts.toString()}
        sub="unresolved"
        icon="🔴"
        color={Palette.dangerLight}
        dimColor={Palette.dangerDim}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 8,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  card: {
    flex: 1,
    backgroundColor: Palette.navyCard,
    borderRadius: Radii.md,
    padding: 12,
    borderWidth: 1,
    borderColor: Palette.navyBorder,
    alignItems: 'center',
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  iconText: {
    fontSize: 18,
  },
  title: {
    fontSize: 9,
    color: Palette.grey400,
    textAlign: 'center',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    fontWeight: '600',
    marginBottom: 4,
  },
  value: {
    fontSize: 18,
    fontWeight: '900',
    textAlign: 'center',
  },
  sub: {
    fontSize: 10,
    color: Palette.grey500,
    textAlign: 'center',
    marginTop: 2,
  },
});
