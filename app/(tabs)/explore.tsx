// VoiceMap — Legacy Explore tab (redirects to Competitor Benchmark)
// This screen is hidden from the tab bar via href: null in _layout.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Palette } from '@/constants/theme';

export default function ExplorePlaceholder() {
  return (
    <View style={styles.root}>
      <Text style={styles.text}>Navigate to Competitor tab for benchmarks</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Palette.deepNavy, alignItems: 'center', justifyContent: 'center' },
  text: { color: Palette.grey400, fontSize: 14 },
});
