// VoiceMap — Trend Line Chart (DangerScore over 7 days)
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Palette, Radii } from '@/constants/theme';
import { TrendPoint } from '@/types';

interface Props {
  data: TrendPoint[];
}

const SCREEN_WIDTH = Dimensions.get('window').width;

export function TrendLineChart({ data }: Props) {
  const labels = data.map((d) => {
    const date = new Date(d.date);
    return `${date.getDate()}/${date.getMonth() + 1}`;
  });
  const values = data.map((d) => d.dangerScore);
  const lastVal = values[values.length - 1];
  const prevVal = values[values.length - 2];
  const change = lastVal - prevVal;

  // Tiny Prophet simulation: Simple linear forecast with momentum
  const momentum = change * 1.5;
  const rawForecast = lastVal + momentum;
  const forecast = Math.max(10, Math.min(100, Math.round(rawForecast)));
  
  const chartLabels = [...labels, 'Proj.'];
  const chartValues = [...values, forecast];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>📈 Danger Score Trend</Text>
          <Text style={styles.subtitle}>Contains next-period projection</Text>
        </View>
        <View style={styles.changePill}>
          <Text style={[styles.changeText, { color: change > 0 ? Palette.dangerLight : Palette.successLight }]}>
            {change > 0 ? '▲' : '▼'} {Math.abs(change)} pts
          </Text>
        </View>
      </View>
      <LineChart
        data={{
          labels: chartLabels,
          datasets: [
            {
              data: chartValues,
              color: (opacity) => `rgba(239, 68, 68, ${opacity})`,
              strokeWidth: 3,
            },
          ],
        }}
        width={SCREEN_WIDTH - 32}
        height={160}
        chartConfig={{
          backgroundGradientFrom: Palette.navyCard,
          backgroundGradientTo: Palette.navySurface,
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(239, 68, 68, ${opacity})`,
          labelColor: () => Palette.grey400,
          style: { borderRadius: Radii.md },
          propsForDots: {
            r: '5',
            strokeWidth: '2',
            stroke: Palette.danger,
            fill: Palette.navyCard,
          },
          propsForBackgroundLines: {
            stroke: Palette.navyBorder,
            strokeDasharray: '4',
          },
        }}
        bezier
        style={styles.chart}
        withInnerLines
        withOuterLines={false}
        fromZero
      />
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
  subtitle: {
    color: Palette.violetLight,
    fontSize: 11,
    marginTop: 2,
    fontWeight: '600',
  },
  changePill: {
    backgroundColor: Palette.dangerDim,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  changeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  chart: {
    borderRadius: Radii.md,
    marginLeft: -16,
  },
});
