import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Palette, Radii, Spacing } from '@/constants/theme';

const REGIONS = [
  { name: 'Maharashtra', score: 82, trend: '+12%', color: Palette.danger },
  { name: 'Karnataka', score: 76, trend: '+8%', color: Palette.danger },
  { name: 'Delhi NCR', score: 45, trend: '-2%', color: Palette.warning },
  { name: 'Gujarat', score: 32, trend: '-5%', color: Palette.success },
  { name: 'Tamil Nadu', score: 28, trend: '-1%', color: Palette.success },
  { name: 'Telangana', score: 41, trend: '+1%', color: Palette.warning },
];

export function GeoSentimentMap() {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>🗺 Geo-Sentiment Hotspots</Text>
          <Text style={styles.subtitle}>Danger Score by Region</Text>
        </View>
        <Text style={{ fontSize: 20 }}>🇮🇳</Text>
      </View>
      
      <View style={styles.grid}>
        {REGIONS.map((region) => (
          <View key={region.name} style={styles.regionCard}>
            <View style={styles.regionHeader}>
              <Text style={styles.regionName} numberOfLines={1}>{region.name}</Text>
              <View style={[styles.scorePill, { backgroundColor: region.color + '22' }]}>
                <Text style={[styles.scoreText, { color: region.color }]}>{region.score}</Text>
              </View>
            </View>
            <View style={styles.barTrack}>
              <View style={[styles.barFill, { backgroundColor: region.color, width: `${region.score}%` }]} />
            </View>
            <Text style={styles.trendText}>
              Trend: <Text style={{ color: region.trend.startsWith('+') && region.score > 50 ? Palette.dangerLight : Palette.successLight }}>
                {region.trend}
              </Text>
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Palette.navyCard,
    borderRadius: Radii.lg,
    padding: 16,
    borderWidth: 1,
    borderColor: Palette.navyBorder,
    marginBottom: Spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: { color: '#fff', fontSize: 15, fontWeight: '800' },
  subtitle: { color: Palette.grey400, fontSize: 12, marginTop: 2 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  regionCard: {
    width: '48%',
    backgroundColor: Palette.navySurface,
    borderRadius: Radii.md,
    padding: 12,
    borderWidth: 1,
    borderColor: Palette.navyBorder,
  },
  regionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  regionName: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
    flex: 1,
  },
  scorePill: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  scoreText: {
    fontSize: 12,
    fontWeight: '800',
  },
  barTrack: {
    height: 4,
    backgroundColor: Palette.navyBorder,
    borderRadius: 2,
    marginBottom: 8,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 2,
  },
  trendText: {
    color: Palette.grey500,
    fontSize: 11,
  },
});
