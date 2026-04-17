// VoiceMap — Alerts Tab Screen
import React from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity,
  RefreshControl, Platform,
} from 'react-native';
import { useAlertStore } from '@/store/useAlertStore';
import { AlertCard } from '@/components/alerts/AlertCard';
import { Palette, Radii, Spacing } from '@/constants/theme';
import { Alert } from '@/types';
import { useTranslation } from '@/hooks/useTranslation';

export default function AlertsScreen() {
  const { alerts, markAllRead, unreadCount } = useAlertStore();
  const [refreshing, setRefreshing] = React.useState(false);
  const t = useTranslation();

  const unread = unreadCount();
  const critical = alerts.filter((a) => a.severity === 'critical');
  const medium = alerts.filter((a) => a.severity === 'medium');
  const low = alerts.filter((a) => a.severity === 'low');

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1200);
  };

  const renderSection = (title: string, data: Alert[], color: string) => (
    data.length > 0 ? (
      <>
        <View style={[styles.sectionHeader, { borderLeftColor: color }]}>
          <Text style={[styles.sectionTitle, { color }]}>{title}</Text>
          <View style={[styles.sectionBadge, { backgroundColor: color + '33' }]}>
            <Text style={[styles.sectionCount, { color }]}>{data.length}</Text>
          </View>
        </View>
        {data.map((alert) => <AlertCard key={alert.id} alert={alert} />)}
      </>
    ) : null
  );

  return (
    <View style={styles.root}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.screenLabel}>{t.alerts_label}</Text>
          <Text style={styles.screenTitle}>{t.alerts_title}</Text>
        </View>
        {unread > 0 && (
          <TouchableOpacity style={styles.markAllBtn} onPress={markAllRead}>
            <Text style={styles.markAllIcon}>✓✓</Text>
            <Text style={styles.markAllText}>{t.alerts_mark_read}</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Summary strip */}
      <View style={styles.summaryStrip}>
        <View style={[styles.summaryCard, { borderColor: Palette.danger }]}>
          <Text style={styles.summaryNumber}>{critical.length}</Text>
          <Text style={[styles.summaryLabel, { color: Palette.dangerLight }]}>{t.alerts_critical}</Text>
        </View>
        <View style={[styles.summaryCard, { borderColor: Palette.warning }]}>
          <Text style={styles.summaryNumber}>{medium.length}</Text>
          <Text style={[styles.summaryLabel, { color: Palette.warningLight }]}>{t.alerts_medium}</Text>
        </View>
        <View style={[styles.summaryCard, { borderColor: Palette.success }]}>
          <Text style={styles.summaryNumber}>{low.length}</Text>
          <Text style={[styles.summaryLabel, { color: Palette.successLight }]}>{t.alerts_low}</Text>
        </View>
        <View style={[styles.summaryCard, { borderColor: Palette.violet }]}>
          <Text style={[styles.summaryNumber, { color: Palette.violetLight }]}>{unread}</Text>
          <Text style={[styles.summaryLabel, { color: Palette.violetLight }]}>{t.alerts_unread}</Text>
        </View>
      </View>

      {/* WhatsApp mock banner */}
      <View style={styles.whatsappBanner}>
        <Text style={styles.whatsappText}>{t.alerts_whatsapp}</Text>
        <View style={styles.whatsappDot} />
      </View>

      <FlatList
        data={[]}
        keyExtractor={() => 'dummy'}
        renderItem={null}
        ListHeaderComponent={
          <>
            {renderSection(t.alerts_sec_critical, critical, Palette.danger)}
            {renderSection(t.alerts_sec_medium, medium, Palette.warning)}
            {renderSection(t.alerts_sec_low, low, Palette.success)}
          </>
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Palette.violetLight}
          />
        }
        ListEmptyComponent={null}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Palette.deepNavy,
    paddingTop: Platform.select({ web: 20, ios: 54, android: 32, default: 32 }),
  },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: Spacing.md, marginBottom: 14,
  },
  screenLabel: { fontSize: 10, color: Palette.violetLight, fontWeight: '800', letterSpacing: 3 },
  screenTitle: { fontSize: 22, color: '#fff', fontWeight: '900' },
  markAllBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: Palette.navyCard, paddingHorizontal: 12, paddingVertical: 8,
    borderRadius: Radii.md, borderWidth: 1, borderColor: Palette.navyBorder,
  },
  markAllIcon: { color: Palette.violetLight, fontSize: 13, fontWeight: '800' },
  markAllText: { color: Palette.violetLight, fontSize: 12, fontWeight: '700' },
  summaryStrip: {
    flexDirection: 'row', gap: 8, paddingHorizontal: Spacing.md, marginBottom: 12,
  },
  summaryCard: {
    flex: 1, backgroundColor: Palette.navyCard, borderRadius: Radii.md,
    padding: 10, alignItems: 'center', borderWidth: 1,
  },
  summaryNumber: { color: '#fff', fontSize: 20, fontWeight: '900' },
  summaryLabel: { fontSize: 10, fontWeight: '700', marginTop: 2 },
  whatsappBanner: {
    marginHorizontal: Spacing.md, marginBottom: 14,
    backgroundColor: '#064E3B', borderRadius: Radii.md, padding: 10,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    borderWidth: 1, borderColor: Palette.success,
  },
  whatsappText: { color: Palette.successLight, fontSize: 12, fontWeight: '600' },
  whatsappDot: {
    width: 8, height: 8, borderRadius: 4, backgroundColor: Palette.success,
  },
  sectionHeader: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    marginHorizontal: Spacing.md, marginTop: 16, marginBottom: 8,
    borderLeftWidth: 3, paddingLeft: 10,
  },
  sectionTitle: { fontSize: 13, fontWeight: '800', flex: 1 },
  sectionBadge: {
    paddingHorizontal: 8, paddingVertical: 3, borderRadius: 999,
  },
  sectionCount: { fontSize: 12, fontWeight: '800' },
  listContent: { paddingBottom: 32 },
});
