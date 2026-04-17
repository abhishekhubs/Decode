// VoiceMap — Competitor Benchmark Screen
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Dimensions, Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { BarChart } from 'react-native-chart-kit';
import { Palette, Radii, Spacing } from '@/constants/theme';
import { MOCK_COMPETITORS } from '@/data/mockData';

const SCREEN_WIDTH = Dimensions.get('window').width;
const FEATURES = ['Battery', 'Packaging', 'Sound', 'Support', 'Display', 'Value'];

// Advocate score bar
function AdvocateBar({ name, score, color }: { name: string; score: number; color: string }) {
  return (
    <View style={styles.advocateRow}>
      <Text style={styles.advocateName} numberOfLines={1}>{name}</Text>
      <View style={styles.advocateTrack}>
        <View style={[styles.advocateFill, { width: `${score}%`, backgroundColor: color }]} />
      </View>
      <Text style={[styles.advocateScore, { color }]}>{score}</Text>
    </View>
  );
}

export default function CompetitorScreen() {
  const router = useRouter();
  const [selectedFeature, setSelectedFeature] = useState('Battery');

  const featureData = {
    labels: MOCK_COMPETITORS.map((c) => c.name.split(' ')[0]),
    datasets: [{
      data: MOCK_COMPETITORS.map((c) => c.featureScores[selectedFeature] ?? 0),
    }],
  };

  const overallData = {
    labels: MOCK_COMPETITORS.map((c) => c.name.split(' ')[0]),
    datasets: [{ data: MOCK_COMPETITORS.map((c) => c.dangerScore) }],
  };

  const barColors = [Palette.danger, Palette.success, Palette.warning];

  return (
    <View style={styles.root}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={{fontSize:22,color:Palette.grey300}}>?</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.screenLabel}>COMPETITIVE INTELLIGENCE</Text>
          <Text style={styles.screenTitle}>Benchmark</Text>
        </View>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>

        {/* Overall DangerScore comparison */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>⚔️ Overall Danger Score Comparison</Text>
          <Text style={styles.cardSub}>Lower is better — you vs competitors</Text>
          <BarChart
            data={overallData}
            width={SCREEN_WIDTH - 64}
            height={180}
            fromZero
            yAxisLabel=""
            yAxisSuffix=""
            chartConfig={{
              backgroundGradientFrom: Palette.navyCard,
              backgroundGradientTo: Palette.navyCard,
              decimalPlaces: 0,
              color: (opacity, index) => {
                const colors = [Palette.danger, Palette.success, Palette.warning];
                return colors[(index ?? 0) % colors.length] || Palette.violet;
              },
              labelColor: () => Palette.grey400,
              barPercentage: 0.6,
              propsForBackgroundLines: {
                stroke: Palette.navyBorder,
                strokeDasharray: '4',
              },
            }}
            style={styles.chart}
            showValuesOnTopOfBars
          />
          {/* Colour legend */}
          <View style={styles.legend}>
            {MOCK_COMPETITORS.map((c, i) => (
              <View key={c.id} style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: barColors[i % barColors.length] }]} />
                <Text style={styles.legendText}>{c.name.split(' ')[0]}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Feature-level comparison */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🎯 Feature Danger Score Drill-Down</Text>
          {/* Feature selector */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.featureScroll}>
            {FEATURES.map((f) => (
              <TouchableOpacity
                key={f}
                style={[styles.featureChip, selectedFeature === f && styles.featureChipActive]}
                onPress={() => setSelectedFeature(f)}
              >
                <Text style={[styles.featureChipText, selectedFeature === f && styles.featureChipTextActive]}>
                  {f}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <BarChart
            data={featureData}
            width={SCREEN_WIDTH - 64}
            height={160}
            fromZero
            yAxisLabel=""
            yAxisSuffix=""
            chartConfig={{
              backgroundGradientFrom: Palette.navyCard,
              backgroundGradientTo: Palette.navyCard,
              decimalPlaces: 0,
              color: (opacity, index) => barColors[(index ?? 0) % barColors.length] || Palette.violet,
              labelColor: () => Palette.grey400,
              barPercentage: 0.5,
              propsForBackgroundLines: { stroke: Palette.navyBorder, strokeDasharray: '4' },
            }}
            style={styles.chart}
            showValuesOnTopOfBars
          />
        </View>

        {/* Brand Advocate Score */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🌟 Brand Advocate Score</Text>
          <Text style={styles.cardSub}>Influencer + positive reviewer index (higher = better)</Text>
          {MOCK_COMPETITORS.map((c, i) => (
            <AdvocateBar
              key={c.id}
              name={c.name}
              score={c.advocateScore}
              color={barColors[i % barColors.length]}
            />
          ))}
        </View>

        {/* Competitor Table */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>📊 Competitor Details</Text>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>Brand</Text>
            <Text style={styles.tableHeaderText}>DangerScore</Text>
            <Text style={styles.tableHeaderText}>Avg Rating</Text>
            <Text style={styles.tableHeaderText}>Reviews</Text>
          </View>
          {MOCK_COMPETITORS.map((c, i) => (
            <View key={c.id} style={[styles.tableRow, i % 2 === 0 && styles.tableRowAlt]}>
              <Text style={styles.tableBrand} numberOfLines={1}>{c.name.split(' ')[0]}</Text>
              <Text style={[styles.tableScore, {
                color: c.dangerScore >= 70 ? Palette.dangerLight : c.dangerScore >= 40 ? Palette.warningLight : Palette.successLight,
              }]}>
                {c.dangerScore}
              </Text>
              <Text style={styles.tableRating}>{c.avgRating}⭐</Text>
              <Text style={styles.tableReviews}>{c.reviewCount}</Text>
            </View>
          ))}
        </View>

        {/* Insight box */}
        <View style={styles.insightBox}>
          <Text style={styles.insightTitle}>💡 Key Insight</Text>
          <Text style={styles.insightText}>
            Your brand (NovaTech X1) has the highest DangerScore ({MOCK_COMPETITORS[0].dangerScore}) in the battery category. 
            AlphaPhone Pro leads with a score of only {MOCK_COMPETITORS[1].featureScores['Battery']} on battery — 
            customers are actively comparing brands on this metric.
          </Text>
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
  screenLabel: { fontSize: 10, color: Palette.violetLight, fontWeight: '800', letterSpacing: 3 },
  screenTitle: { fontSize: 22, color: '#fff', fontWeight: '900' },
  content: { padding: Spacing.md, gap: 14, paddingBottom: 48 },
  card: {
    backgroundColor: Palette.navyCard, borderRadius: Radii.lg, padding: 16,
    borderWidth: 1, borderColor: Palette.navyBorder, gap: 12,
  },
  cardTitle: { color: '#fff', fontSize: 15, fontWeight: '800' },
  cardSub: { color: Palette.grey500, fontSize: 12, lineHeight: 17, marginTop: -8 },
  chart: { borderRadius: Radii.md, marginLeft: -16 },
  legend: { flexDirection: 'row', gap: 16, justifyContent: 'center' },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
  legendText: { color: Palette.grey400, fontSize: 11, fontWeight: '600' },
  featureScroll: { marginBottom: 4 },
  featureChip: {
    paddingHorizontal: 14, paddingVertical: 7, borderRadius: Radii.md, marginRight: 8,
    backgroundColor: Palette.navySurface, borderWidth: 1, borderColor: Palette.navyBorder,
  },
  featureChipActive: { backgroundColor: Palette.violetDim, borderColor: Palette.violet },
  featureChipText: { color: Palette.grey400, fontSize: 13, fontWeight: '600' },
  featureChipTextActive: { color: Palette.violetLight },
  advocateRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  advocateName: { color: Palette.grey300, fontSize: 12, fontWeight: '600', width: 90 },
  advocateTrack: { flex: 1, height: 8, backgroundColor: Palette.navyBorder, borderRadius: 999, overflow: 'hidden' },
  advocateFill: { height: 8, borderRadius: 999 },
  advocateScore: { width: 28, textAlign: 'right', fontWeight: '800', fontSize: 13 },
  tableHeader: {
    flexDirection: 'row', paddingBottom: 8, borderBottomWidth: 1, borderBottomColor: Palette.navyBorder,
  },
  tableHeaderText: { flex: 1, color: Palette.grey500, fontSize: 11, fontWeight: '700', textTransform: 'uppercase' },
  tableRow: { flexDirection: 'row', paddingVertical: 10, alignItems: 'center' },
  tableRowAlt: { backgroundColor: Palette.navySurface + '66' },
  tableBrand: { flex: 1, color: '#fff', fontSize: 13, fontWeight: '700' },
  tableScore: { flex: 1, textAlign: 'center', fontSize: 14, fontWeight: '900' },
  tableRating: { flex: 1, textAlign: 'center', color: Palette.grey300, fontSize: 12 },
  tableReviews: { flex: 1, textAlign: 'right', color: Palette.grey400, fontSize: 12 },
  insightBox: {
    backgroundColor: Palette.violetDim, borderRadius: Radii.md, padding: 16,
    borderWidth: 1, borderColor: Palette.violet, gap: 8,
  },
  insightTitle: { color: Palette.violetLight, fontSize: 14, fontWeight: '800' },
  insightText: { color: Palette.grey300, fontSize: 13, lineHeight: 19 },
});
