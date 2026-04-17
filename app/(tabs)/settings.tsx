// VoiceMap — Settings Tab Screen
import { Palette, Radii, Spacing } from '@/constants/theme';
import { useAppStore } from '@/store/useAppStore';
import { useTranslation, useIsTranslating } from '@/hooks/useTranslation';
import { useTranslationStore } from '@/store/useTranslationStore';
import { useProfileStore } from '@/store/useProfileStore';
import { Language } from '@/types';
import React, { useState } from 'react';
import {
  Alert, ActivityIndicator, Platform, Modal,
  ScrollView, StyleSheet, Text, TextInput,
  TouchableOpacity, View, KeyboardAvoidingView,
} from 'react-native';

const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'hi', label: 'Hindi',   flag: '🇮🇳' },
  { code: 'kn', label: 'Kannada', flag: '🇮🇳' },
];

const SEX_OPTIONS = ['Male', 'Female', 'Other'] as const;

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

function Field({ label, value, onChangeText, placeholder, keyboardType, multiline }: {
  label: string; value: string; onChangeText: (v: string) => void;
  placeholder?: string; keyboardType?: any; multiline?: boolean;
}) {
  return (
    <View style={styles.fieldWrap}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        style={[styles.fieldInput, multiline && { height: 72, textAlignVertical: 'top' }]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder ?? label}
        placeholderTextColor={Palette.grey600}
        keyboardType={keyboardType ?? 'default'}
        multiline={multiline}
      />
    </View>
  );
}

export default function SettingsScreen() {
  const { config, updateConfig } = useAppStore();
  const t             = useTranslation();
  const isTranslating = useIsTranslating();
  const setLanguage   = useTranslationStore((s) => s.setLanguage);
  const currentLang   = useTranslationStore((s) => s.language);
  const { profile, updateProfile } = useProfileStore();

  const [editOpen, setEditOpen] = useState(false);
  const [draft, setDraft] = useState({ ...profile });

  const initials = profile.name
    .split(' ')
    .map((w) => w[0] ?? '')
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'BM';

  const handleLanguageChange = async (code: Language) => {
    updateConfig({ language: code });
    await setLanguage(code);
  };

  const openEdit = () => {
    setDraft({ ...profile });
    setEditOpen(true);
  };

  const saveEdit = () => {
    updateProfile(draft);
    setEditOpen(false);
  };

  const exportReport = () => {
    Alert.alert(
      '📄 Export Full Report',
      'PDF report generation is simulated in this demo.\nIn production, jsPDF + html2canvas generates a full analytics PDF.',
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

        {/* ── User Profile Card ── */}
        <View style={styles.profileCard}>
          {/* Avatar */}
          <View style={styles.avatarRing}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{initials}</Text>
            </View>
          </View>

          {/* Info */}
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{profile.name}</Text>
            <Text style={styles.profileMeta}>
              {[profile.sex, profile.age ? `Age ${profile.age}` : ''].filter(Boolean).join(' · ') || 'Brand Manager'}
            </Text>
            {!!profile.email && <Text style={styles.profileDetail}>✉️  {profile.email}</Text>}
            {!!profile.phone && <Text style={styles.profileDetail}>📞  {profile.phone}</Text>}
            {!!profile.address && <Text style={styles.profileDetail} numberOfLines={1}>📍  {profile.address}</Text>}
          </View>

          {/* Edit button */}
          <TouchableOpacity style={styles.editBtn} onPress={openEdit}>
            <Text style={styles.editBtnText}>✏️</Text>
          </TouchableOpacity>
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

        {/* ── Alert Settings ── */}
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
            label={t.settings_sms}
            sub={t.settings_sms_sub}
            right={
              <View style={[styles.statusPill, { backgroundColor: Palette.successDim }]}>
                <Text style={[styles.statusText, { color: Palette.successLight }]}>{t.settings_active}</Text>
              </View>
            }
          />
        </View>

        {/* ── Export ── */}
        <SectionHeader title={t.settings_export_sec} />
        <View style={styles.section}>
          <TouchableOpacity style={styles.exportBtn} onPress={exportReport}>
            <Text style={styles.exportEmoji}>📄</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.exportText}>{t.settings_export}</Text>
              <Text style={styles.exportSub}>{t.settings_export_sub}</Text>
            </View>
            <Text style={styles.exportArrow}>›</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* ── Edit Profile Modal ── */}
      <Modal visible={editOpen} animationType="slide" transparent>
        <KeyboardAvoidingView
          style={styles.modalOverlay}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <View style={styles.modalSheet}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{t.settings_edit_profile}</Text>
              <TouchableOpacity onPress={() => setEditOpen(false)}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: 4, paddingBottom: 24 }}>

              <Field label={t.settings_name} value={draft.name}
                onChangeText={(v) => setDraft((d) => ({ ...d, name: v }))}
                placeholder="e.g. Abhishek Shrivastav" />

              <Field label={t.settings_email} value={draft.email}
                onChangeText={(v) => setDraft((d) => ({ ...d, email: v }))}
                placeholder="you@example.com" keyboardType="email-address" />

              <Field label={t.settings_phone} value={draft.phone}
                onChangeText={(v) => setDraft((d) => ({ ...d, phone: v }))}
                placeholder="+91 XXXXX XXXXX" keyboardType="phone-pad" />

              <Field label={t.settings_age} value={draft.age}
                onChangeText={(v) => setDraft((d) => ({ ...d, age: v }))}
                placeholder="e.g. 24" keyboardType="numeric" />

              {/* Sex Selector */}
              <View style={styles.fieldWrap}>
                <Text style={styles.fieldLabel}>{t.settings_sex}</Text>
                <View style={styles.sexRow}>
                  {SEX_OPTIONS.map((opt) => (
                    <TouchableOpacity
                      key={opt}
                      style={[styles.sexChip, draft.sex === opt && styles.sexChipActive]}
                      onPress={() => setDraft((d) => ({ ...d, sex: opt }))}
                    >
                      <Text style={[styles.sexChipText, draft.sex === opt && styles.sexChipTextActive]}>
                        {opt}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <Field label={t.settings_address} value={draft.address}
                onChangeText={(v) => setDraft((d) => ({ ...d, address: v }))}
                placeholder="Street, City, State" multiline />

            </ScrollView>

            <TouchableOpacity style={styles.saveBtn} onPress={saveEdit}>
              <Text style={styles.saveBtnText}>{t.settings_save}</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
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
  content: { paddingHorizontal: Spacing.md, paddingBottom: 60 },

  // ── Profile Card ──
  profileCard: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    backgroundColor: Palette.navyCard, borderRadius: Radii.lg,
    padding: 16, borderWidth: 1, borderColor: Palette.navyBorder,
    marginTop: 8,
  },
  avatarRing: {
    width: 60, height: 60, borderRadius: 30,
    borderWidth: 2, borderColor: Palette.violet,
    alignItems: 'center', justifyContent: 'center',
  },
  avatar: {
    width: 52, height: 52, borderRadius: 26,
    backgroundColor: Palette.violetDim,
    alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { color: Palette.violetLight, fontSize: 20, fontWeight: '900' },
  profileInfo: { flex: 1 },
  profileName: { color: '#fff', fontSize: 16, fontWeight: '800' },
  profileMeta: { color: Palette.grey500, fontSize: 12, marginTop: 2 },
  profileDetail: { color: Palette.grey400, fontSize: 11, marginTop: 3 },
  editBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: Palette.navySurface, borderWidth: 1, borderColor: Palette.navyBorder,
    alignItems: 'center', justifyContent: 'center',
  },
  editBtnText: { fontSize: 16 },

  // ── Section ──
  sectionHeader: {
    fontSize: 12, color: Palette.grey400, fontWeight: '800',
    letterSpacing: 1.5, textTransform: 'uppercase', marginTop: 24, marginBottom: 10,
  },
  section: {
    backgroundColor: Palette.navyCard, borderRadius: Radii.lg,
    padding: 16, borderWidth: 1, borderColor: Palette.navyBorder,
  },
  divider: { height: 1, backgroundColor: Palette.navyBorder, marginVertical: 2 },
  settingRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, gap: 12 },
  settingInfo: { flex: 1 },
  settingLabel: { color: '#fff', fontSize: 14, fontWeight: '700' },
  settingSub: { color: Palette.grey500, fontSize: 11, marginTop: 2 },
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
    flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10, paddingVertical: 6,
  },
  translatingText: { color: Palette.violetLight, fontSize: 12, fontWeight: '700' },
  exportBtn: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 14 },
  exportEmoji: { fontSize: 24 },
  exportText: { color: '#fff', fontSize: 14, fontWeight: '700' },
  exportSub: { color: Palette.grey500, fontSize: 11, marginTop: 2 },
  exportArrow: { color: Palette.grey500, fontSize: 22, fontWeight: '300' },

  // ── Modal ──
  modalOverlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: Palette.navyCard, borderTopLeftRadius: 24, borderTopRightRadius: 24,
    padding: 24, maxHeight: '90%',
    borderTopWidth: 1, borderColor: Palette.navyBorder,
  },
  modalHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20,
  },
  modalTitle: { color: '#fff', fontSize: 18, fontWeight: '900' },
  modalClose: { color: Palette.grey400, fontSize: 20, fontWeight: '300' },
  fieldWrap: { marginBottom: 14 },
  fieldLabel: { color: Palette.grey400, fontSize: 11, fontWeight: '700', marginBottom: 6, letterSpacing: 0.5 },
  fieldInput: {
    backgroundColor: Palette.navySurface, color: '#fff', borderRadius: Radii.md,
    paddingHorizontal: 14, paddingVertical: 12, fontSize: 15,
    borderWidth: 1, borderColor: Palette.navyBorder,
  },
  sexRow: { flexDirection: 'row', gap: 10 },
  sexChip: {
    flex: 1, paddingVertical: 10, borderRadius: Radii.md,
    backgroundColor: Palette.navySurface, borderWidth: 1, borderColor: Palette.navyBorder,
    alignItems: 'center',
  },
  sexChipActive: { backgroundColor: Palette.violetDim, borderColor: Palette.violet },
  sexChipText: { color: Palette.grey400, fontSize: 13, fontWeight: '700' },
  sexChipTextActive: { color: Palette.violetLight },
  saveBtn: {
    backgroundColor: Palette.violet, borderRadius: Radii.md,
    paddingVertical: 14, alignItems: 'center', marginTop: 8,
  },
  saveBtnText: { color: '#fff', fontSize: 16, fontWeight: '800' },
});
