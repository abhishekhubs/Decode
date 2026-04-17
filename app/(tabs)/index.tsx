// VoiceMap — Dashboard Screen — Role-Aware (Product / Marketing / Support)
import { BatchTrendInsight } from '@/components/dashboard/BatchTrendInsight';
import { DangerScoreGauge } from '@/components/dashboard/DangerScoreGauge';
import { EmergingIssuesTable } from '@/components/dashboard/EmergingIssuesTable';
import { FeatureSentimentBars } from '@/components/dashboard/FeatureSentimentBar';
import { GeoSentimentMap } from '@/components/dashboard/GeoSentimentMap';
import { LiveReviewTicker } from '@/components/dashboard/LiveReviewTicker';
import { TrendLineChart } from '@/components/dashboard/TrendLineChart';
import { Palette, Radii, Spacing } from '@/constants/theme';
import { MOCK_FEATURE_SCORES, MOCK_TREND } from '@/data/mockData';
import { useTranslation } from '@/hooks/useTranslation';
import { useAlertStore } from '@/store/useAlertStore';
import { useAppStore } from '@/store/useAppStore';
import { useReviewStore } from '@/store/useReviewStore';
import { calcDangerScore, calcRevenueRisk, formatRupees } from '@/utils/scoring';
import { detectSpamAndDuplicates } from '@/utils/spamDetection';
import { useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import {
  Platform, RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

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
  { feature: 'Spatial Audio', positive: 88, negative: 12 },
  { feature: 'Brand Prestige', positive: 91, negative: 9 },
  { feature: 'Social Buzz', positive: 81, negative: 19 },
  { feature: 'Influencer Reach', positive: 78, negative: 22 },
  { feature: 'Pre-order Hype', positive: 85, negative: 15 },
];

const SUPPORT_FEATURES = [
  { feature: 'Lens Glare', positive: 22, negative: 78 },
  { feature: 'Weight & Comfort', positive: 35, negative: 65 },
  { feature: 'Battery Pack', positive: 41, negative: 59 },
  { feature: 'Passthrough Latency', positive: 82, negative: 18 },
  { feature: 'Eye Tracking', positive: 88, negative: 12 },
];

// ── Mini-KPI card component ───────────────────────────────────────────────────

function KpiCard({
  emoji, label, value, sub, color,
}: { emoji: string; label: string; value: string; sub: string; color: string }) {
  return (
    <TouchableOpacity activeOpacity={0.8} style={[kpiStyles.card, { borderColor: color + '50', backgroundColor: color + '08' }]}>
      <View style={[kpiStyles.iconWrap, { backgroundColor: color + '15' }]}>
        <Text style={kpiStyles.emoji}>{emoji}</Text>
      </View>
      <Text style={kpiStyles.label}>{label}</Text>
      <Text style={[kpiStyles.value, { color }]}>{value}</Text>
      <Text style={kpiStyles.sub}>{sub}</Text>
    </TouchableOpacity>
  );
}

const kpiStyles = StyleSheet.create({
  card: {
    flex: 1, borderRadius: Radii.lg,
    padding: 16, alignItems: 'center', gap: 6,
    borderWidth: 1,
    shadowColor: Palette.violet, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1, shadowRadius: 10, elevation: 4,
  },
  iconWrap: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center', marginBottom: 4 },
  emoji: { fontSize: 22 },
  label: { color: Palette.grey400, fontSize: 10, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 1, textAlign: 'center' },
  value: { fontSize: 24, fontWeight: '900', letterSpacing: -0.5 },
  sub: { color: Palette.grey500, fontSize: 10, textAlign: 'center', fontWeight: '600' },
});

// ── Insight card component ────────────────────────────────────────────────────

function InsightCard({ emoji, title, desc, accent }: { emoji: string; title: string; desc: string; accent: string }) {
  return (
    <TouchableOpacity activeOpacity={0.8} style={insightStyles.cardWrapper}>
      <LinearGradient colors={['rgba(255,255,255,0.06)', 'rgba(255,255,255,0.01)']} style={[insightStyles.card, { borderLeftColor: accent }]}>
        <View style={[insightStyles.emojiWrap, { backgroundColor: accent + '20' }]}>
          <Text style={insightStyles.emoji}>{emoji}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={insightStyles.title}>{title}</Text>
          <Text style={insightStyles.desc}>{desc}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const insightStyles = StyleSheet.create({
  cardWrapper: { marginBottom: 12, borderRadius: Radii.lg, overflow: 'hidden' },
  card: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    padding: 16, borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)', borderLeftWidth: 4,
  },
  emojiWrap: { width: 46, height: 46, borderRadius: 23, alignItems: 'center', justifyContent: 'center' },
  emoji: { fontSize: 22 },
  title: { color: '#fff', fontWeight: '800', fontSize: 14, marginBottom: 4, letterSpacing: 0.2 },
  desc: { color: Palette.grey400, fontSize: 12, lineHeight: 18 },
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
  const revenueRisk = useMemo(() => 380000, []);
  const spamReport = useMemo(() => detectSpamAndDuplicates(reviews), [reviews]);
  const spamCount = spamReport.duplicateIds.size + spamReport.botIds.size;
  const criticalCount = alerts.filter((a) => a.severity === 'critical').length;
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
        { emoji: '🔋', title: 'Battery Pack Heating', desc: 'Thermal warnings rose +18% this week across NA & EU — firmware patch deployment needed urgently.', accent: Palette.danger },
        { emoji: '⚖️', title: 'Weight Risk: Medium', desc: '14 features flagged for neck fatigue after 2+ hours. Q2 strap redesign recommended.', accent: Palette.warning },
        { emoji: '👁️', title: 'Eye Tracking Stable', desc: 'Biometric tracking sentiment held highly positive (88%) — no action required.', accent: Palette.success },
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
        { emoji: '🚀', title: 'Campaign "New Reality" Performing', desc: '"Next-gen spatial" narrative gaining traction — 18% more positive YouTube reviews this week.', accent: Palette.success },
        { emoji: '⚠️', title: 'Competitor Gaining Ground', desc: 'Meta Quest 3 mention share grew +9% in the "budget VR" space this week.', accent: Palette.warning },
        { emoji: '🎧', title: 'Spatial Audio USP Resonating', desc: 'Positive social snippets about immersive audio — ready for ad copy extraction.', accent: Palette.violetLight },
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
      gaugeFooter: 'Based on 94 open tickets · Category: Spatial Computer · L2 support',
      trend: SUPPORT_TREND,
      features: SUPPORT_FEATURES,
      kpis: [
        { emoji: '🎫', label: 'Open Tickets', value: '94', sub: '12 breaching SLA', color: Palette.dangerLight },
        { emoji: '⏱', label: 'Avg Response', value: '6.2h', sub: 'SLA target: 4h', color: Palette.warningLight },
        { emoji: '😊', label: 'CSAT Score', value: '3.4/5', sub: 'target: 4.2', color: Palette.warning },
      ],
      insights: [
        { emoji: '🔥', title: 'Lens Glare Tickets Surging', desc: '34 new optic-related support tickets in 48h — likely linked to batch NA-221 lens coatings.', accent: Palette.danger },
        { emoji: '⏰', title: 'Setup Assistance Rate High', desc: '28% of users contacted support for initial calibration — onboarding UX needs improvement.', accent: Palette.warning },
        { emoji: '🤖', title: 'Auto-Escalation Saved 40 Tickets', desc: 'AI auto-reply resolved 40 low-severity comfort issues overnight without human intervention.', accent: Palette.success },
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
      {/* ── Premium Gradient Header ── */}
      <LinearGradient colors={[Palette.deepNavy, Palette.navyCard]} style={styles.header}>
        <View style={styles.headerTop}>
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
              activeOpacity={0.7}
              onPress={() => router.push('/(tabs)/alerts' as any)}
            >
              <Feather name="bell" size={18} color="#fff" />
              {criticalCount > 0 && (
                <View style={styles.notifBadge}>
                  <Text style={styles.notifBadgeText}>{criticalCount > 9 ? '9+' : criticalCount}</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* ── Role Selector ── */}
        <View style={styles.roleSelector}>
          {(['Product Manager', 'Marketing Lead', 'Support Head'] as DashboardRole[]).map(r => {
            const isActive = role === r;
            return (
              <TouchableOpacity
                key={r}
                activeOpacity={0.8}
                style={[styles.roleBtn, isActive && styles.roleBtnActive]}
                onPress={() => setRole(r)}
              >
                <Text style={[styles.roleBtnText, isActive && styles.roleBtnTextActive]}>
                  {roleConfig[r].icon} {r.split(' ')[0]}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </LinearGradient>

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
        {/* Role Selector moved to Header */}

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

        {/* ── Batch Trend Intelligence (Layer 3 requirement) ── */}
        {role === 'Product Manager' && <BatchTrendInsight reviews={reviews} />}

        {/* ── Feature / Channel Breakdown ── */}
        <FeatureSentimentBars data={rc.features} />

        {/* ── Geo Sentiment (Marketing only) ── */}
        {rc.showGeo && <GeoSentimentMap />}

        {/* ── Emerging Issues (Product only) ── */}
        {role === 'Product Manager' && <EmergingIssuesTable alerts={alerts} />}

        {/* ── Action Buttons ── */}
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.actionBtnWrapper}
            onPress={() => router.push('/competitor' as any)}
            activeOpacity={0.8}
          >
            <LinearGradient colors={[Palette.violet, Palette.violetLight]} style={styles.actionBtnGrad} start={{x:0, y:0}} end={{x:1, y:1}}>
              <Text style={styles.actionBtnEmoji}>🏆</Text>
              <Text style={styles.actionBtnText}>{t.dash_competitor}</Text>
            </LinearGradient>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.actionBtnWrapper}
            onPress={() => router.push('/(tabs)/playbook' as any)}
            activeOpacity={0.8}
          >
            <LinearGradient colors={[Palette.danger, '#FF8A8A']} style={styles.actionBtnGrad} start={{x:0, y:0}} end={{x:1, y:1}}>
              <Text style={styles.actionBtnEmoji}>🔧</Text>
              <Text style={styles.actionBtnText}>{t.dash_playbook}</Text>
            </LinearGradient>
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
    paddingHorizontal: Spacing.lg,
    paddingBottom: 16,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    marginBottom: 4,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 10, elevation: 8,
  },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  brandLabel: { fontSize: 10, color: Palette.violetLight, fontWeight: '900', letterSpacing: 4 },
  brandName: { fontSize: 26, color: '#FFFFFF', fontWeight: '900', letterSpacing: -0.5, marginTop: 2 },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  shieldBadge: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: Palette.success + '20',
    paddingHorizontal: 10, paddingVertical: 5, borderRadius: 999, gap: 6,
    borderWidth: 1, borderColor: Palette.success + '50',
  },
  shieldDot: { color: Palette.success, fontSize: 8 },
  shieldText: { color: Palette.success, fontSize: 11, fontWeight: '800' },
  notifBtn: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)',
  },
  notifBadge: {
    position: 'absolute', top: -4, right: -4, minWidth: 18, height: 18,
    borderRadius: 9, backgroundColor: Palette.danger,
    alignItems: 'center', justifyContent: 'center', paddingHorizontal: 4,
    borderWidth: 2, borderColor: Palette.deepNavy,
  },
  notifBadgeText: { color: '#fff', fontSize: 9, fontWeight: '900' },

  // ── Scroll ──
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 40, paddingTop: 16 },

  // ── Role Selector ──
  roleSelector: { flexDirection: 'row', gap: 8 },
  roleBtn: {
    flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)',
  },
  roleBtnActive: { backgroundColor: Palette.violet + '25', borderColor: Palette.violet + '80' },
  roleBtnText: { color: Palette.grey400, fontSize: 12, fontWeight: '700' },
  roleBtnTextActive: { color: Palette.violetLight, fontWeight: '800' },

  // ── Gauge Card ──
  gaugeCard: {
    marginHorizontal: Spacing.md, marginBottom: 16, backgroundColor: Palette.navyCard,
    borderRadius: Radii.xl, paddingTop: 20, paddingHorizontal: 20, paddingBottom: 20,
    borderWidth: 1, borderColor: Palette.violet + '30',
    shadowColor: Palette.violet, shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15, shadowRadius: 24, elevation: 12,
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
  actionRow: { flexDirection: 'row', gap: 12, marginHorizontal: Spacing.md, marginBottom: 24 },
  actionBtnWrapper: { flex: 1, borderRadius: Radii.lg, overflow: 'hidden', elevation: 6, shadowColor: '#000', shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.3, shadowRadius: 8 },
  actionBtnGrad: {
    paddingVertical: 16, paddingHorizontal: 12,
    alignItems: 'center', justifyContent: 'center', gap: 6,
  },
  actionBtnEmoji: { fontSize: 26, marginBottom: 2 },
  actionBtnText: { color: '#fff', fontWeight: '800', fontSize: 14, textAlign: 'center', letterSpacing: 0.5 },

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
