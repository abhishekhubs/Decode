// VoiceMap — Feature Sentiment Bar Chart (Fixed alignment)
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Palette, Radii } from '@/constants/theme';

interface FeatureRow {
  feature: string;
  positive: number; // % 0-100
  negative: number; // % 0-100
}

interface Props {
  data: FeatureRow[];
}

function Bar({ toValue, color, delay }: { toValue: number; color: string; delay: number }) {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue,
      duration: 900,
      delay,
      useNativeDriver: false,
    }).start();
  }, [toValue]);

  return (
    <View style={styles.barTrack}>
      <Animated.View
        style={[
          styles.barFill,
          {
            width: anim.interpolate({
              inputRange: [0, 100],
              outputRange: ['0%', '100%'],
            }),
            backgroundColor: color,
          },
        ]}
      />
    </View>
  );
}

export function FeatureSentimentBars({ data }: Props) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.title}>🎯 Feature Sentiment Breakdown</Text>

      {/* Legend */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: Palette.danger }]} />
          <Text style={styles.legendText}>Negative</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: Palette.success }]} />
          <Text style={styles.legendText}>Positive</Text>
        </View>
      </View>

      {/* Rows */}
      {data.map((row, idx) => (
        <View key={row.feature} style={styles.row}>
          {/* Feature name + percentages on same line */}
          <View style={styles.rowHeader}>
            <Text style={styles.featureName}>{row.feature}</Text>
            <View style={styles.pctRow}>
              <Text style={[styles.pct, { color: Palette.dangerLight }]}>{row.negative}%</Text>
              <Text style={styles.pctSep}> · </Text>
              <Text style={[styles.pct, { color: Palette.successLight }]}>{row.positive}%</Text>
            </View>
          </View>

          {/* Stacked bars */}
          <View style={styles.barsRow}>
            {/* Negative bar (left half) */}
            <View style={styles.halfTrack}>
              <Bar toValue={row.negative} color={Palette.danger} delay={idx * 80} />
            </View>
            {/* Divider */}
            <View style={styles.divider} />
            {/* Positive bar (right half) */}
            <View style={styles.halfTrack}>
              <Bar toValue={row.positive} color={Palette.success} delay={idx * 80 + 40} />
            </View>
          </View>
        </View>
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
  title: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 8,
  },
  legend: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    color: Palette.grey400,
    fontSize: 11,
    fontWeight: '600',
  },
  row: {
    marginBottom: 14,
  },
  rowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  featureName: {
    color: '#E5E7EB',
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
  },
  pctRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pct: {
    fontSize: 12,
    fontWeight: '800',
  },
  pctSep: {
    color: Palette.grey600,
    fontSize: 12,
  },
  barsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  halfTrack: {
    flex: 1,
  },
  barTrack: {
    height: 8,
    backgroundColor: Palette.navyBorder,
    borderRadius: 999,
    overflow: 'hidden',
  },
  barFill: {
    height: 8,
    borderRadius: 999,
  },
  divider: {
    width: 1,
    height: 16,
    backgroundColor: Palette.grey600,
    borderRadius: 1,
  },
});
