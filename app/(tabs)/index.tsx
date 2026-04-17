// VoiceMap — Dashboard Screen — Role-Aware (Product / Marketing / Support)
import React, { useMemo } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Platform, RefreshControl,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useReviewStore } from '@/store/useReviewStore';
import { useAlertStore } from '@/store/useAlertStore';
import { useAppStore } from '@/store/useAppStore';
import { useTranslation } from '@/hooks/useTranslation';
import { DangerScoreGauge } from '@/components/dashboard/DangerScoreGauge';
import { TrendLineChart } from '@/components/dashboard/TrendLineChart';
import { FeatureSentimentBars } from '@/components/dashboard/FeatureSentimentBar';
import { GeoSentimentMap } from '@/components/dashboard/GeoSentimentMap';
import { EmergingIssuesTable } from '@/components/dashboard/EmergingIssuesTable';
import { LiveReviewTicker } from '@/components/dashboard/LiveReviewTicker';
import { calcDangerScore, calcRevenueRisk, formatRupees } from '@/utils/scoring';
import { Palette, Radii, Spacing } from '@/constants/theme';
import { MOCK_TREND, MOCK_FEATURE_SCORES } from '@/data/mockData';

const TOP_PADDING = Platform.select({ web: 20, ios: 54, android: 32, default: 32 });

export type DashboardRole = 'Product Manager' | 'Marketing Lead' | 'Support Head';

// ── Role-specific static data ─────────────────────────────────────────────────

const MARKETING_TREND = [
  { date: '2024-04-01', dangerScore: 42, reviewCount: 88 },
  { date: '2024-04-02', dangerScore: 39, reviewCount: 76 },
  { date: '2024-04-03', dangerScore: 44, reviewCount: 95 },
  { date: '2024-04-04', dangerScore: 38, reviewCount: 82 },
  { date: '2024-04-05', dangerScore: 35, reviewCount: 91 },
  { date: '2024-04-06', dangerScore: 32, reviewCount: 67 },
  { date: '2024-04-07', dangerScore: 29, reviewCount: 73 },
];

const SUPPORT_TREND = [
  { date: '2024-04-01', dangerScore: 88, reviewCount: 34 },
  { date: '2024-04-02', dangerScore: 84, reviewCount: 29 },
  { date: '2024-04-03', dangerScore: 91, reviewCount: 41 },
  { date: '2024-04-04', dangerScore: 78, reviewCount: 37 },
  { date: '2024-04-05', dangerScore: 83, reviewCount: 45 },
  { date: '2024-04-06', dangerScore: 75, reviewCount: 32 },
  { date: '2024-04-07', dangerScore: 70, reviewCount: 28 },
];

const MARKETING_FEATURES = [
  { feature: 'Brand Recall', positive: 72, negative: 14 },
  { feature: 'Ad Sentiment', positive: 65, negative: 22 },
  { feature: 'Social Buzz', positive: 81, negative: 8 },
  { feature: 'Influencer Reach', positive: 58, negative: 30 },
  { feature: 'Campaign ROI', positive: 47, negative: 40 },
];

const SUPPORT_FEATURES = [
  { feature: 'Ticket Backlog', positive: 22, negative: 68 },
  { feature: 'Avg Response Time', positive: 35, negative: 55 },
  { feature: 'Resolution Rate', positive: 61, negative: 28 },
  { feature: 'Repeat Complaints', positive: 18, negative: 73 },
  { feature: 'CSAT Score', positive: 54, negative: 33 },
];

// ── Mini-KPI card component ───────────────────────────────────────────────────

function KpiCard({
  emoji, label, value, sub, color,
}: { emoji: string; label: string; value: string; sub: string; color: string }) {
  return (
    <View style={[kpiStyles.card, { borderColor: color + '44' }]}>
      <Text style={kpiStyles.emoji}>{emoji}</Text>
      <Text style={kpiStyles.label}>{label}</Text>
      <Text style={[kpiStyles.value, { color }]}>{value}</Text>
      <Text style={kpiStyles.sub}>{sub}</Text>
    </View>
  );
}

const kpiStyles = StyleSheet.create({
  card: {
    flex: 1, backgroundColor: Palette.navyCard, borderRadius: Radii.md,
    padding: 14, alignItems: 'center', gap: 4,
    borderWidth: 1, borderColor: Palette.navyBorder,
  },
  emoji: { fontSize: 22 },
  label: { color: Palette.grey500, fontSize: 10, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.8, textAlign: 'center' },
  value: { fontSize: 20, fontWeight: '900' },
  sub: { color: Palette.grey600, fontSize: 10, textAlign: 'center' },
});

// ── Insight card component ────────────────────────────────────────────────────

function InsightCard({ emoji, title, desc, accent }: { emoji: string; title: string; desc: string; accent: string }) {
  return (
    <View style={[insightStyles.card, { borderLeftColor: accent }]}>
      <Text style={insightStyles.emoji}>{emoji}</Text>
      <View style={{ flex: 1 }}>
        <Text style={insightStyles.title}>{title}</Text>
        <Text style={insightStyles.desc}>{desc}</Text>
      </View>
    </View>
  );
}

const insightStyles = StyleSheet.create({
  card: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 12,
    backgroundColor: Palette.navyCard, borderRadius: Radii.md,
    padding: 14, marginBottom: 10, borderWidth: 1,
    borderColor: Palette.navyBorder, borderLeftWidth: 3,
  },
  emoji: { fontSize: 22, lineHeight: 28 },
  title: { color: '#fff', fontWeight: '800', fontSize: 13, marginBottom: 3 },
  desc: { color: Palette.grey400, fontSize: 12, lineHeight: 17 },
});

// ── Main Component ────────────────────────────────────────────────────────────

export default function DashboardScreen() {
  const router = useRouter();
  const reviews = useReviewStore((s) => s.reviews);
  const alerts = useAlertStore((s) => s.alerts);
  const config = useAppStore((s) => s.config);
  const [refreshing, setRefreshing] = React.useState(false);
  const [role, setRole] = React.useState<DashboardRole>('Product Manager');

  const dangerScore = useMemo(() => calcDangerScore(reviews), [reviews]);
  const revenueRisk = useMemo(
    () => calcRevenueRisk(dangerScore, config.avgOrderValue, config.monthlyOrders, 'Battery'),
    [dangerScore, config]
  );
  const criticalCount = alerts.filter((a) => a.severity === 'critical' && !a.isRead).length;
  const unreadCount = alerts.filter((a) => !a.isRead).length;
  const t = useTranslation();

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  // ── Role-specific config ──────────────────────────────────────────────────
  const roleConfig = {
    'Product Manager': {
      icon: '🛠',
      gaugeTitle: '⚠️ Danger Score',
      gaugeSub: 'DangerScore™ · Real-time AI Analysis',
      gaugeScore: dangerScore,
      gaugePillLabel: dangerScore >= 70 ? '🔴 Critical' : dangerScore >= 40 ? '🟡 Warning' : '🟢 Safe',
      gaugeFooter: `Based on ${reviews.length} reviews · ${config.productCategory} · ${config.brandName}`,
      trend: MOCK_TREND,
      features: MOCK_FEATURE_SCORES,
      kpis: [
        { emoji: '💸', label: t.dash_kpi_revenue, value: formatRupees(revenueRisk), sub: t.dash_today, color: Palette.dangerLight },
        { emoji: '📊', label: t.dash_kpi_reviews, value: `${reviews.length}`, sub: t.dash_alltime, color: Palette.violetLight },
        { emoji: '🚨', label: t.dash_kpi_critical, value: `${criticalCount}`, sub: t.dash_unresolved, color: Palette.danger },
      ],
      insights: [
        { emoji: '🔋', title: 'Battery Issues Spiking', desc: 'Battery complaints rose +18% this week across Bangalore & Pune — patch deployment needed urgently.', accent: Palette.danger },
        { emoji: '📦', title: 'Packaging Risk: Medium', desc: '3 features flagged for packaging defects. Q2 supplier review recommended.', accent: Palette.warning },
        { emoji: '✅', title: 'Camera Feature Stable', desc: 'Camera-related sentiment held positive (82%) — no action required.', accent: Palette.success },
      ],
      showGeo: false,
      showAlertBanner: dangerScore >= 70,
      alertBannerTitle: `${unreadCount} Product Alerts`,
      alertBannerSub: `Revenue at risk: ${formatRupees(revenueRisk)}`,
    },
    'Marketing Lead': {
      icon: '📢',
      gaugeTitle: '📣 Brand Sentiment Score',
      gaugeSub: 'Positive sentiment index across all channels',
      gaugeScore: 63,
      gaugePillLabel: '🟡 Moderate',
      gaugeFooter: 'Based on Amazon, Flipkart, Twitter, YouTube · Last 7 days',
      trend: MARKETING_TREND,
      features: MARKETING_FEATURES,
      kpis: [
        { emoji: '💬', label: 'Positive Mentions', value: '1,248', sub: 'this week', color: Palette.successLight },
        { emoji: '📉', label: 'Negative Buzz', value: '312', sub: 'this week', color: Palette.dangerLight },
        { emoji: '🎯', label: 'Brand Recall', value: '72%', sub: 'vs 68% last wk', color: Palette.violetLight },
      ],
      insights: [
        { emoji: '🚀', title: 'Campaign "X1 Pro" Performing', desc: '"Affordable flagship" narrative gaining traction — 18% more positive YouTube reviews this week.', accent: Palette.success },
        { emoji: '⚠️', title: 'Competitor Gaining Ground', desc: 'Rival brand mention share grew +9% in the "best budget phone" space this week.', accent: Palette.warning },
        { emoji: '📸', title: 'Camera USP Resonating', desc: 'Positive social snippets about camera quality — ready for ad copy extraction.', accent: Palette.violetLight },
      ],
      showGeo: true,
      showAlertBanner: true,
      alertBannerTitle: '3 Campaign Opportunities Detected',
      alertBannerSub: 'Tap to generate ad copy from top reviews →',
    },
    'Support Head': {
      icon: '🎧',
      gaugeTitle: '🎧 SLA Breach Risk',
      gaugeSub: 'Ticket backlog & response time forecast',
      gaugeScore: 81,
      gaugePillLabel: '🔴 High Risk',
      gaugeFooter: 'Based on 94 open tickets · Category: Smartphone · L2 support',
      trend: SUPPORT_TREND,
      features: SUPPORT_FEATURES,
      kpis: [
        { emoji: '🎫', label: 'Open Tickets', value: '94', sub: '12 breaching SLA', color: Palette.dangerLight },
        { emoji: '⏱', label: 'Avg Response', value: '6.2h', sub: 'SLA target: 4h', color: Palette.warningLight },
        { emoji: '😊', label: 'CSAT Score', value: '3.4/5', sub: 'target: 4.2', color: Palette.warning },
      ],
      insights: [
        { emoji: '🔥', title: 'Battery Tickets Surging', desc: '34 new battery-related support tickets in 48h — likely linked to batch BT-221 shipments.', accent: Palette.danger },
        { emoji: '⏰', title: 'Repeat Contact Rate High', desc: '28% of users contacted support twice — first-call resolution needs improvement.', accent: Palette.warning },
        { emoji: '🤖', title: 'Auto-Escalation Saved 40 Tickets', desc: 'AI auto-reply resolved 40 low-severity issues overnight without human intervention.', accent: Palette.success },
      ],
      showGeo: false,
      showAlertBanner: true,
      alertBannerTitle: '12 SLA Breaches Imminent',
      alertBannerSub: 'Tap to view high-priority ticket queue →',
    },
  };

  const rc = roleConfig[role];

  return (
    <View style={[styles.root, { paddingTop: TOP_PADDING }]}>
      {/* ── Header ── */}
      <View style={styles.header}>
        <View>
          <Text style={styles.brandLabel}>VOICEMAP</Text>
          <Text style={styles.brandName}>{config.brandName}</Text>
        </View>
        <View style={styles.headerRight}>
          <View style={styles.shieldBadge}>
            <Text style={styles.shieldDot}>●</Text>
            <Text style={styles.shieldText}>{t.dash_shield_active}</Text>
          </View>
          <TouchableOpacity
            style={styles.notifBtn}
            onPress={() => router.push('/(tabs)/alerts' as any)}
          >
            <Text style={styles.notifIcon}>🔔</Text>
            {criticalCount > 0 && (
              <View style={styles.notifBadge}>
                <Text style={styles.notifBadgeText}>{criticalCount > 9 ? '9+' : criticalCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Palette.violetLight}
          />
        }
      >
        {/* ── Role Selector ── */}
        <View style={styles.roleSelector}>
          {(['Product Manager', 'Marketing Lead', 'Support Head'] as DashboardRole[]).map(r => (
            <TouchableOpacity
              key={r}
              style={[styles.roleBtn, role === r && styles.roleBtnActive]}
              onPress={() => setRole(r)}
            >
              <Text style={[styles.roleBtnText, role === r && styles.roleBtnTextActive]}>
                {roleConfig[r].icon} {r.split(' ')[0]}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── Gauge Card ── */}
        <View style={styles.gaugeCard}>
          <View style={styles.gaugeTitle}>
            <View style={{ flex: 1 }}>
              <Text style={styles.sectionTitle}>{rc.gaugeTitle}</Text>
              <Text style={styles.gaugeSubtitle}>{rc.gaugeSub}</Text>
            </View>
            <View style={[
              styles.dangerPill,
              { backgroundColor: rc.gaugeScore >= 70 ? Palette.dangerDim : rc.gaugeScore >= 40 ? Palette.warningDim : Palette.successDim }
            ]}>
              <Text style={[
                styles.dangerPillText,
                { color: rc.gaugeScore >= 70 ? Palette.dangerLight : rc.gaugeScore >= 40 ? Palette.warningLight : Palette.successLight }
              ]}>
                {rc.gaugePillLabel}
              </Text>
            </View>
          </View>

          <View style={styles.gaugeCenter}>
            <DangerScoreGauge score={rc.gaugeScore} size={260} />
          </View>

          <Text style={styles.gaugeFooter}>{rc.gaugeFooter}</Text>
        </View>

        {/* ── KPI Row ── */}
        <View style={styles.kpiRow}>
          {rc.kpis.map((k) => (
            <KpiCard key={k.label} {...k} />
          ))}
        </View>

        {/* ── Alert Banner ── */}
        {rc.showAlertBanner && (
          <TouchableOpacity
            style={styles.alertBanner}
            onPress={() => router.push('/(tabs)/alerts' as any)}
            activeOpacity={0.85}
          >
            <View style={styles.alertBannerLeft}>
              <Text style={styles.alertBannerIcon}>🔴</Text>
              <View>
                <Text style={styles.alertBannerTitle}>{rc.alertBannerTitle}</Text>
                <Text style={styles.alertBannerSub}>{rc.alertBannerSub}</Text>
              </View>
            </View>
            <Text style={styles.alertBannerChevron}>›</Text>
          </TouchableOpacity>
        )}

        {/* ── Role Insights ── */}
        <View style={styles.insightsSection}>
          <Text style={styles.sectionHeader}>{t.dash_key_insights}</Text>
          {rc.insights.map((ins) => (
            <InsightCard key={ins.title} {...ins} />
          ))}
        </View>

        {/* ── Trend Chart ── */}
        <TrendLineChart data={rc.trend} />

        {/* ── Feature / Channel Breakdown ── */}
        <FeatureSentimentBars data={rc.features} />

        {/* ── Geo Sentiment (Marketing only) ── */}
        {rc.showGeo && <GeoSentimentMap />}

        {/* ── Emerging Issues (Product only) ── */}
        {role === 'Product Manager' && <EmergingIssuesTable alerts={alerts} />}

        {/* ── Action Buttons ── */}
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={[styles.actionBtn, { backgroundColor: Palette.violetDim, borderColor: Palette.violet }]}
            onPress={() => router.push('/competitor' as any)}
            activeOpacity={0.8}
          >
            <Text style={styles.actionBtnEmoji}>🏆</Text>
            <Text style={styles.actionBtnText}>{t.dash_competitor}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionBtn, { backgroundColor: Palette.dangerDim, borderColor: Palette.danger }]}
            onPress={() => router.push('/(tabs)/playbook' as any)}
            activeOpacity={0.8}
          >
            <Text style={styles.actionBtnEmoji}>🔧</Text>
            <Text style={styles.actionBtnText}>{t.dash_playbook}</Text>
          </TouchableOpacity>
        </View>

        {/* ── Live Feed ── */}
        <View style={styles.sectionLabelRow}>
          <View style={styles.liveDot} />
          <Text style={styles.sectionLabel}>{t.dash_live_feed}</Text>
        </View>
        <LiveReviewTicker reviews={reviews} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Palette.deepNavy },

  // ── Header ──
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: Spacing.md, paddingBottom: 14,
    borderBottomWidth: 1, borderBottomColor: Palette.navyBorder, marginBottom: 4,
  },
  brandLabel: { fontSize: 10, color: Palette.violetLight, fontWeight: '800', letterSpacing: 4 },
  brandName: { fontSize: 24, color: '#FFFFFF', fontWeight: '900', letterSpacing: -0.5, marginTop: 1 },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  shieldBadge: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: Palette.successDim,
    paddingHorizontal: 10, paddingVertical: 5, borderRadius: 999, gap: 5,
    borderWidth: 1, borderColor: Palette.success + '44',
  },
  shieldDot: { color: Palette.success, fontSize: 8 },
  shieldText: { color: Palette.successLight, fontSize: 11, fontWeight: '700' },
  notifBtn: {
    width: 38, height: 38, borderRadius: 19, backgroundColor: Palette.navyCard,
    alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: Palette.navyBorder,
  },
  notifIcon: { fontSize: 18 },
  notifBadge: {
    position: 'absolute', top: -2, right: -2, minWidth: 17, height: 17,
    borderRadius: 9, backgroundColor: Palette.danger,
    alignItems: 'center', justifyContent: 'center', paddingHorizontal: 3,
    borderWidth: 1.5, borderColor: Palette.deepNavy,
  },
  notifBadgeText: { color: '#fff', fontSize: 9, fontWeight: '900' },

  // ── Scroll ──
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 32, paddingTop: 12 },

  // ── Role Selector ──
  roleSelector: { flexDirection: 'row', gap: 8, paddingHorizontal: Spacing.md, marginBottom: 14 },
  roleBtn: {
    flex: 1, paddingVertical: 9, alignItems: 'center', borderRadius: Radii.sm,
    backgroundColor: Palette.navySurface, borderWidth: 1, borderColor: Palette.navyBorder,
  },
  roleBtnActive: { backgroundColor: Palette.violetDim, borderColor: Palette.violet },
  roleBtnText: { color: Palette.grey400, fontSize: 13, fontWeight: '700' },
  roleBtnTextActive: { color: Palette.violetLight },

  // ── Gauge Card ──
  gaugeCard: {
    marginHorizontal: Spacing.md, marginBottom: 12, backgroundColor: Palette.navyCard,
    borderRadius: Radii.xl, paddingTop: 18, paddingHorizontal: 20, paddingBottom: 18,
    borderWidth: 1, borderColor: Palette.navyBorder,
    shadowColor: Palette.danger, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25, shadowRadius: 20, elevation: 16,
  },
  gaugeTitle: {
    flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8,
  },
  sectionTitle: { color: '#FFFFFF', fontSize: 16, fontWeight: '800', letterSpacing: 0.3 },
  gaugeSubtitle: { color: Palette.grey500, fontSize: 11, marginTop: 3, letterSpacing: 0.3 },
  dangerPill: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999, alignSelf: 'flex-start' },
  dangerPillText: { fontSize: 11, fontWeight: '800' },
  gaugeCenter: { alignItems: 'center', justifyContent: 'center', alignSelf: 'center' },
  gaugeFooter: { textAlign: 'center', color: Palette.grey600, fontSize: 11, marginTop: 6, letterSpacing: 0.2 },

  // ── KPI Row ──
  kpiRow: {
    flexDirection: 'row', gap: 10, marginHorizontal: Spacing.md, marginBottom: 12,
  },

  // ── Alert Banner ──
  alertBanner: {
    marginHorizontal: Spacing.md, marginBottom: 12, backgroundColor: Palette.dangerDim,
    borderRadius: Radii.md, padding: 14, flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', borderWidth: 1, borderColor: Palette.danger + '88',
  },
  alertBannerLeft: { flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 },
  alertBannerIcon: { fontSize: 20 },
  alertBannerTitle: { color: Palette.dangerLight, fontSize: 13, fontWeight: '800' },
  alertBannerSub: { color: Palette.dangerLight + 'AA', fontSize: 12, marginTop: 2 },
  alertBannerChevron: { color: Palette.dangerLight, fontSize: 24, fontWeight: '300' },

  // ── Insights ──
  insightsSection: { marginHorizontal: Spacing.md, marginBottom: 4 },
  sectionHeader: {
    color: Palette.grey400, fontSize: 12, fontWeight: '800',
    letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 10,
  },

  // ── Action Buttons ──
  actionRow: { flexDirection: 'row', gap: 12, marginHorizontal: Spacing.md, marginBottom: 20 },
  actionBtn: {
    flex: 1, paddingVertical: 14, paddingHorizontal: 12,
    borderRadius: Radii.lg, alignItems: 'center', borderWidth: 1, gap: 6,
  },
  actionBtnEmoji: { fontSize: 24 },
  actionBtnText: { color: '#fff', fontWeight: '700', fontSize: 13, textAlign: 'center', lineHeight: 18 },

  // ── Live Feed label ──
  sectionLabelRow: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    marginHorizontal: Spacing.md, marginBottom: 10,
  },
  liveDot: {
    width: 8, height: 8, borderRadius: 4, backgroundColor: Palette.danger,
    shadowColor: Palette.danger, shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9, shadowRadius: 4, elevation: 4,
  },
  sectionLabel: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },
});
