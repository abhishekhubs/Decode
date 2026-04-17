// VoiceMap — Settings Tab Screen
import { Palette, Radii, Spacing } from '@/constants/theme';
import { MOCK_REVIEWS } from '@/data/mockData';
import { useAppStore } from '@/store/useAppStore';
import { useReviewStore } from '@/store/useReviewStore';
import { useTranslation, useIsTranslating } from '@/hooks/useTranslation';
import { useTranslationStore } from '@/store/useTranslationStore';
import { Language } from '@/types';
import React from 'react';
import {
  Alert, ActivityIndicator, Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'hi', label: 'Hindi', flag: '🇮🇳' },
  { code: 'kn', label: 'Kannada', flag: '🇮🇳' },
];

function SectionHeader({ title }: { title: string }) {
  return <Text style={styles.sectionHeader}>{title}</Text>;
}

function SettingRow({ label, sub, right }: { label: string; sub?: string; right: React.ReactNode }) {
  return (
    <View style={styles.settingRow}>
      <View style={styles.settingInfo}>
        <Text style={styles.settingLabel}>{label}</Text>
        {sub ? <Text style={styles.settingSub}>{sub}</Text> : null}
      </View>
      {right}
    </View>
  );
}

export default function SettingsScreen() {
  const { config, updateConfig } = useAppStore();
  const setReviews = useReviewStore((s) => s.setReviews);
  const t = useTranslation();
  const isTranslating = useIsTranslating();
  const setLanguage = useTranslationStore((s) => s.setLanguage);
  const currentLang = useTranslationStore((s) => s.language);

  const handleLanguageChange = async (code: Language) => {
    updateConfig({ language: code });   // keep app config in sync
    await setLanguage(code);           // trigger Groq translation
  };

  const generateDemo = () => {
    setReviews(MOCK_REVIEWS);
    Alert.alert('✅ Demo Data', '200 reviews reloaded with fresh demo data!');
  };

  const exportReport = () => {
    Alert.alert(
      '📄 Export Report',
      'PDF report generation is simulated in this demo.\nIn production, jsPDF + html2canvas generates a full PDF.',
      [{ text: 'OK' }]
    );
  };

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.screenLabel}>{t.settings_label}</Text>
        <Text style={styles.screenTitle}>{t.settings_title}</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>

        {/* ── Brand ── */}
        <SectionHeader title={t.settings_brand_sec} />
        <View style={styles.section}>
          <Text style={styles.inputLabel}>{t.settings_brand_name}</Text>
          <TextInput
            style={styles.input}
            value={config.brandName}
            onChangeText={(t2) => updateConfig({ brandName: t2 })}
            placeholder="Your brand name"
            placeholderTextColor={Palette.grey600}
          />
          <Text style={styles.inputLabel}>{t.settings_brand_cat}</Text>
          <TextInput
            style={styles.input}
            value={config.productCategory}
            onChangeText={(t2) => updateConfig({ productCategory: t2 })}
            placeholder="e.g. Smartphone, FMCG"
            placeholderTextColor={Palette.grey600}
          />
        </View>

        {/* ── Economics ── */}
        <SectionHeader title={t.settings_rev_sec} />
        <View style={styles.section}>
          <Text style={styles.inputLabel}>{t.settings_avg_order}</Text>
          <TextInput
            style={styles.input}
            value={config.avgOrderValue.toString()}
            onChangeText={(t2) => updateConfig({ avgOrderValue: Number(t2) || 0 })}
            keyboardType="numeric"
            placeholder="35000"
            placeholderTextColor={Palette.grey600}
          />
          <Text style={styles.inputLabel}>{t.settings_monthly}</Text>
          <TextInput
            style={styles.input}
            value={config.monthlyOrders.toString()}
            onChangeText={(t2) => updateConfig({ monthlyOrders: Number(t2) || 0 })}
            keyboardType="numeric"
            placeholder="1200"
            placeholderTextColor={Palette.grey600}
          />
          <View style={styles.infoBox}>
            <Text style={styles.infoEmoji}>ℹ️</Text>
            <Text style={styles.infoText}>{t.settings_rev_info}</Text>
          </View>
        </View>

        {/* ── Alerts ── */}
        <SectionHeader title={t.settings_alert_sec} />
        <View style={styles.section}>
          <SettingRow
            label={t.settings_threshold}
            sub={t.settings_threshold_sub.replace('{val}', String(config.alertThreshold))}
            right={
              <View style={styles.thresholdBtns}>
                <TouchableOpacity
                  style={styles.thresholdBtn}
                  onPress={() => updateConfig({ alertThreshold: Math.max(10, config.alertThreshold - 5) })}
                >
                  <Text style={styles.thresholdBtnText}>−</Text>
                </TouchableOpacity>
                <Text style={styles.thresholdVal}>{config.alertThreshold}</Text>
                <TouchableOpacity
                  style={styles.thresholdBtn}
                  onPress={() => updateConfig({ alertThreshold: Math.min(100, config.alertThreshold + 5) })}
                >
                  <Text style={styles.thresholdBtnText}>+</Text>
                </TouchableOpacity>
              </View>
            }
          />
          <View style={styles.divider} />
          <SettingRow
            label={t.settings_whatsapp}
            sub={t.settings_whatsapp_sub}
            right={
              <View style={[styles.statusPill, { backgroundColor: Palette.successDim }]}>
                <Text style={[styles.statusText, { color: Palette.successLight }]}>{t.settings_active}</Text>
              </View>
            }
          />
          <View style={styles.divider} />
          <SettingRow
            label={t.settings_fcm}
            sub={t.settings_fcm_sub}
            right={
              <View style={[styles.statusPill, { backgroundColor: Palette.successDim }]}>
                <Text style={[styles.statusText, { color: Palette.successLight }]}>{t.settings_active}</Text>
              </View>
            }
          />
        </View>

        {/* ── Language ── */}
        <SectionHeader title={t.settings_lang_sec} />
        <View style={styles.section}>
          {isTranslating && (
            <View style={styles.translatingRow}>
              <ActivityIndicator size="small" color={Palette.violetLight} />
              <Text style={styles.translatingText}>Applying changes…</Text>
            </View>
          )}
          <View style={styles.langRow}>
            {LANGUAGES.map((lang) => (
              <TouchableOpacity
                key={lang.code}
                style={[styles.langChip, currentLang === lang.code && styles.langChipActive]}
                onPress={() => handleLanguageChange(lang.code)}
                disabled={isTranslating}
              >
                <Text style={styles.langFlag}>{lang.flag}</Text>
                <Text style={[styles.langText, currentLang === lang.code && styles.langTextActive]}>
                  {lang.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ── Developer Tools ── */}
        <SectionHeader title={t.settings_dev_sec} />
        <View style={styles.section}>
          <TouchableOpacity style={styles.actionBtn} onPress={generateDemo}>
            <Text style={styles.actionBtnEmoji}>🔄</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.actionBtnText}>{t.settings_demo}</Text>
              <Text style={styles.actionBtnSub}>{t.settings_demo_sub}</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.actionBtn} onPress={exportReport}>
            <Text style={styles.actionBtnEmoji}>📄</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.actionBtnText}>{t.settings_export}</Text>
              <Text style={styles.actionBtnSub}>{t.settings_export_sub}</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* ── About ── */}
        <View style={styles.about}>
          <Text style={styles.aboutLogo}>{t.settings_team}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Palette.deepNavy,
    paddingTop: Platform.select({ web: 20, ios: 54, android: 32, default: 32 }),
  },
  header: { paddingHorizontal: Spacing.md, marginBottom: 12 },
  screenLabel: { fontSize: 10, color: Palette.violetLight, fontWeight: '800', letterSpacing: 3 },
  screenTitle: { fontSize: 22, color: '#fff', fontWeight: '900' },
  content: { paddingHorizontal: Spacing.md, paddingBottom: 48 },
  sectionHeader: {
    fontSize: 12, color: Palette.grey400, fontWeight: '800',
    letterSpacing: 1.5, textTransform: 'uppercase', marginTop: 20, marginBottom: 10,
  },
  section: {
    backgroundColor: Palette.navyCard, borderRadius: Radii.lg,
    padding: 16, borderWidth: 1, borderColor: Palette.navyBorder,
  },
  inputLabel: { color: Palette.grey500, fontSize: 11, fontWeight: '700', marginBottom: 5, marginTop: 8 },
  input: {
    backgroundColor: Palette.navySurface, color: '#fff', borderRadius: Radii.md,
    paddingHorizontal: 12, paddingVertical: 10, fontSize: 15,
    borderWidth: 1, borderColor: Palette.navyBorder, marginBottom: 4,
  },
  infoBox: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 8,
    backgroundColor: Palette.violetDim, borderRadius: Radii.sm, padding: 10, marginTop: 6,
  },
  infoEmoji: { fontSize: 14, lineHeight: 20 },
  infoText: { color: Palette.violetLight, fontSize: 12, flex: 1, lineHeight: 17 },
  settingRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, gap: 12 },
  settingInfo: { flex: 1 },
  settingLabel: { color: '#fff', fontSize: 14, fontWeight: '700' },
  settingSub: { color: Palette.grey500, fontSize: 11, marginTop: 2 },
  divider: { height: 1, backgroundColor: Palette.navyBorder, marginVertical: 2 },
  thresholdBtns: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  thresholdBtn: {
    width: 32, height: 32, borderRadius: 16, backgroundColor: Palette.navyBorder,
    alignItems: 'center', justifyContent: 'center',
  },
  thresholdBtnText: { color: '#fff', fontSize: 18, fontWeight: '700', lineHeight: 22 },
  thresholdVal: { color: '#fff', fontWeight: '900', fontSize: 18, minWidth: 28, textAlign: 'center' },
  statusPill: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 999 },
  statusText: { fontSize: 12, fontWeight: '700' },
  langRow: { flexDirection: 'row', gap: 10 },
  langChip: {
    flex: 1, paddingVertical: 12, borderRadius: Radii.md,
    backgroundColor: Palette.navySurface, borderWidth: 1, borderColor: Palette.navyBorder,
    alignItems: 'center', gap: 4,
  },
  langChipActive: { backgroundColor: Palette.violetDim, borderColor: Palette.violet },
  langFlag: { fontSize: 22 },
  langText: { color: Palette.grey400, fontSize: 12, fontWeight: '700' },
  langTextActive: { color: Palette.violetLight },
  translatingRow: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    marginBottom: 10, paddingVertical: 6,
  },
  translatingText: { color: Palette.violetLight, fontSize: 12, fontWeight: '700' },
  actionBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 14,
  },
  actionBtnEmoji: { fontSize: 22 },
  actionBtnText: { color: '#fff', fontSize: 14, fontWeight: '700' },
  actionBtnSub: { color: Palette.grey500, fontSize: 11, marginTop: 2 },
  about: { alignItems: 'center', paddingTop: 32, gap: 6 },
  aboutLogo: { fontSize: 24, fontWeight: '900', color: Palette.violetLight },
  aboutVersion: { color: Palette.grey500, fontSize: 12 },
  aboutStack: { color: Palette.grey700 ?? '#374151', fontSize: 11 },
});
