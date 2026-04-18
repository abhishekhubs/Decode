// VoiceMap — Settings Tab Screen
import { Palette, Radii, Spacing } from '@/constants/theme';
import { useIsTranslating, useTranslation } from '@/hooks/useTranslation';
import { useAlertStore } from '@/store/useAlertStore';
import { useAppStore } from '@/store/useAppStore';
import { usePlaybookStore } from '@/store/usePlaybookStore';
import { useProfileStore } from '@/store/useProfileStore';
import { useReviewStore } from '@/store/useReviewStore';
import { useTranslationStore } from '@/store/useTranslationStore';
import { Language } from '@/types';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView, StyleSheet, Text, TextInput,
  TouchableOpacity, View
} from 'react-native';

const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'hi', label: 'Hindi', flag: '🇮🇳' },
  { code: 'kn', label: 'Kannada', flag: '🇮🇳' },
];

const SEX_OPTIONS = ['Male', 'Female', 'Other'] as const;

function SectionHeader({ title }: { title: string }) {
  return <Text style={styles.sectionHeader}>{title}</Text>;
}

function SettingRow({ icon, label, sub, right }: { icon: keyof typeof Feather.glyphMap; label: string; sub?: string; right: React.ReactNode }) {
  return (
    <View style={styles.settingRow}>
      <View style={styles.iconBox}>
        <Feather name={icon} size={20} color={Palette.violetLight} />
      </View>
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
  const t = useTranslation();
  const isTranslating = useIsTranslating();
  const setLanguage = useTranslationStore((s) => s.setLanguage);
  const currentLang = useTranslationStore((s) => s.language);
  const { profile, updateProfile } = useProfileStore();
  const { reviews } = useReviewStore();
  const { alerts } = useAlertStore();
  const { actions } = usePlaybookStore();

  const [editOpen, setEditOpen] = useState(false);
  const [thresholdOpen, setThresholdOpen] = useState(false);
  const [draftThresholds, setDraftThresholds] = useState({ ...config.thresholds });
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

  const openThresholdModal = () => {
    setDraftThresholds({ ...config.thresholds });
    setThresholdOpen(true);
  };

  const handleThresholdSubmit = async () => {
    updateConfig({ thresholds: draftThresholds });
    setThresholdOpen(false);

    // Check existing alerts against new thresholds and trigger Twilio if needed
    const { checkThresholdsAndNotify } = useAlertStore.getState();
    await checkThresholdsAndNotify(draftThresholds);
  };

  const saveEdit = () => {
    updateProfile(draft);
    setEditOpen(false);
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setDraft((d) => ({ ...d, avatar: result.assets[0].uri }));
    }
  };

  const exportReport = async () => {
    try {
      const html = `
        <html>
          <head>
            <style>
              body { font-family: 'Helvetica', sans-serif; color: #333; padding: 20px; line-height: 1.5; }
              h1 { color: #1E1B4B; border-bottom: 2px solid #7C3AED; padding-bottom: 10px; margin-bottom: 5px; }
              .header-meta { color: #666; font-size: 14px; margin-bottom: 30px; }
              h2 { color: #312E81; margin-top: 30px; padding-bottom: 5px; border-bottom: 1px solid #ddd; }
              .card { background: #f9fafb; border: 1px solid #e5e7eb; padding: 15px; margin-bottom: 15px; border-radius: 8px; }
              .badge { background: #7C3AED; color: white; padding: 4px 10px; border-radius: 12px; font-size: 11px; font-weight: bold; text-transform: uppercase; }
              .title { font-size: 16px; font-weight: bold; margin: 8px 0 4px 0; }
              .desc { margin: 0; color: #444; font-size: 14px; }
              .meta { color: #6b7280; font-size: 12px; margin-top: 8px; }
              .star { color: #F59E0B; }
            </style>
          </head>
          <body>
            <h1>VoiceMap Executive Report</h1>
            <div class="header-meta">
              <strong>Generated for:</strong> ${profile.name} (${profile.email || 'No email provided'})<br/>
              <strong>Date:</strong> ${new Date().toLocaleDateString()}
            </div>
            
            <h2>Active Alerts (${alerts?.length || 0})</h2>
            ${(alerts || []).map(a => `
              <div class="card">
                <span class="badge" style="background: ${a.severity === 'critical' ? '#EF4444' : a.severity === 'medium' ? '#F59E0B' : '#10B981'}">${a.feature}</span>
                <p class="title">${a.message}</p>
                <p class="meta">Severity: <strong>${a.severity}</strong> &bull; Status: ${a.isRead ? 'Read' : 'Unread'}</p>
              </div>
            `).join('')}

            <h2>Customer Reviews (${reviews?.length || 0})</h2>
            ${(reviews || []).map(r => `
              <div class="card">
                <p class="title">${r.author || 'Anonymous'} <span class="star">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</span></p>
                <p class="desc">"${r.text}"</p>
                <p class="meta">Sentiment: <strong>${r.sentiment}</strong> &bull; Date: ${new Date(r.createdAt).toLocaleDateString()}</p>
              </div>
            `).join('')}

            <h2>Playbook Action Items (${actions?.length || 0})</h2>
            ${(actions || []).map(t => `
              <div class="card">
                <span class="badge" style="background: ${t.status === 'done' ? '#10B981' : '#7C3AED'}">${t.status}</span>
                <p class="title">${t.title}</p>
                <p class="desc">${t.description}</p>
              </div>
            `).join('')}
          </body>
        </html>
      `;

      const { uri } = await Print.printToFileAsync({ html, base64: false });

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, {
          mimeType: 'application/pdf',
          dialogTitle: 'Save VoiceMap Report',
          UTI: 'com.adobe.pdf'
        });
      } else {
        Alert.alert('Success', 'Report generated at: ' + uri);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to generate PDF report.');
    }
  };

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.screenLabel}>{t.settings_label}</Text>
        <Text style={styles.screenTitle}>{t.settings_title}</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>

        {/* ── VIP Profile Card ── */}
        <TouchableOpacity activeOpacity={0.9} onPress={openEdit}>
          <LinearGradient
            colors={['#1E1B4B', '#312E81']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.profileCard}
          >
            {/* Avatar */}
            <View style={styles.avatarRing}>
              <View style={styles.avatar}>
                {profile.avatar ? (
                  <Image source={{ uri: profile.avatar }} style={styles.avatarImage} />
                ) : (
                  <Text style={styles.avatarText}>{initials}</Text>
                )}
              </View>
            </View>

            {/* Info */}
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{profile.name}</Text>
              <Text style={styles.profileMeta}>
                {[profile.sex, profile.age ? `Age ${profile.age}` : ''].filter(Boolean).join(' · ') || 'Brand Manager'}
              </Text>
              {!!profile.email && (
                <View style={styles.contactRow}>
                  <Feather name="mail" size={12} color={Palette.violetLight} />
                  <Text style={styles.profileDetail}>{profile.email}</Text>
                </View>
              )}
              {!!profile.phone && (
                <View style={styles.contactRow}>
                  <Feather name="phone" size={12} color={Palette.violetLight} />
                  <Text style={styles.profileDetail}>{profile.phone}</Text>
                </View>
              )}
              {!!profile.address && (
                <View style={styles.contactRow}>
                  <Feather name="map-pin" size={12} color={Palette.violetLight} />
                  <Text style={styles.profileDetail}>{profile.address}</Text>
                </View>
              )}
            </View>

            {/* Edit Chevron */}
            <View style={styles.editBtn}>
              <Feather name="edit-2" size={16} color="#fff" />
            </View>
          </LinearGradient>
        </TouchableOpacity>

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
            icon="message-circle"
            label={t.settings_whatsapp}
            sub={t.settings_whatsapp_sub}
            right={
              <View style={styles.statusGlow}>
                <View style={styles.statusDot} />
              </View>
            }
          />
          <View style={styles.divider} />
          <SettingRow
            icon="message-square"
            label={t.settings_sms}
            sub={t.settings_sms_sub}
            right={
              <View style={styles.statusGlow}>
                <View style={styles.statusDot} />
              </View>
            }
          />
          <TouchableOpacity activeOpacity={0.7} onPress={openThresholdModal}>
            <SettingRow
              icon="target"
              label={t.settings_thresholds_title}
              sub={t.settings_thresholds_desc}
              right={<Feather name="chevron-right" size={20} color={Palette.grey500} />}
            />
          </TouchableOpacity>
        </View>

        {/* ── Export ── */}
        <SectionHeader title={t.settings_export_sec} />
        <TouchableOpacity style={styles.section} activeOpacity={0.7} onPress={exportReport}>
          <SettingRow
            icon="download-cloud"
            label={t.settings_export}
            sub={t.settings_export_sub}
            right={<Feather name="chevron-right" size={20} color={Palette.grey500} />}
          />
        </TouchableOpacity>

        {/* ── Footer ── */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>{t.settings_team}</Text>
          
          <View style={styles.supportContainer}>
            <Text style={styles.supportTitle}>Contact Support</Text>
            
            <View style={styles.supportCard}>
              <View style={styles.supportRow}>
                <Feather name="user" size={16} color={Palette.grey400} />
                <View style={styles.supportInfo}>
                  <Text style={styles.supportName}>Abhishek Shrivastav</Text>
                  <Text style={styles.supportPhone}>+91 9853688251</Text>
                </View>
              </View>
              
              <View style={styles.supportDivider} />
              
              <View style={styles.supportRow}>
                <Feather name="user" size={16} color={Palette.grey400} />
                <View style={styles.supportInfo}>
                  <Text style={styles.supportName}>Muhmmad Nazeem</Text>
                  <Text style={styles.supportPhone}>+91 7895563201</Text>
                </View>
              </View>
              
              <View style={styles.supportDivider} />
              
              <View style={styles.supportRow}>
                <Feather name="user" size={16} color={Palette.grey400} />
                <View style={styles.supportInfo}>
                  <Text style={styles.supportName}>Chithra</Text>
                  <Text style={styles.supportPhone}>+91 9853688252</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

      </ScrollView>

      {/* ── Edit Profile Modal ── */}
      <Modal visible={editOpen} animationType="slide" transparent>
        <KeyboardAvoidingView
          style={styles.modalOverlay}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.modalSheet}>
            <View style={styles.modalHandle} />
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{t.settings_edit_profile}</Text>
              <TouchableOpacity onPress={() => setEditOpen(false)} style={styles.closeBtn}>
                <Feather name="x" size={20} color={Palette.grey400} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: 4, paddingBottom: 24 }}>

              {/* Photo Editor */}
              <View style={styles.modalAvatarContainer}>
                <View style={styles.modalAvatarRing}>
                  <View style={styles.modalAvatar}>
                    {draft.avatar ? (
                      <Image source={{ uri: draft.avatar }} style={styles.avatarImage} />
                    ) : (
                      <Text style={styles.avatarText}>{initials}</Text>
                    )}
                  </View>
                </View>
                <TouchableOpacity style={styles.photoEditBtn} onPress={pickImage} activeOpacity={0.8}>
                  <Feather name="camera" size={14} color={Palette.deepNavy} style={{ marginRight: 6 }} />
                  <Text style={styles.photoEditBtnText}>Change Photo</Text>
                </TouchableOpacity>
              </View>

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

            <TouchableOpacity activeOpacity={0.9} onPress={saveEdit}>
              <LinearGradient
                colors={[Palette.violet, Palette.violetLight]}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                style={styles.saveBtn}
              >
                <Text style={styles.saveBtnText}>{t.settings_save}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* ── Threshold Modal ── */}
      <Modal visible={thresholdOpen} animationType="slide" transparent>
        <KeyboardAvoidingView
          style={styles.modalOverlay}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.modalSheet}>
            <View style={styles.modalHandle} />
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{t.settings_thresh_modal_title}</Text>
              <TouchableOpacity onPress={() => setThresholdOpen(false)} style={styles.closeBtn}>
                <Feather name="x" size={20} color={Palette.grey400} />
              </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: 16, paddingBottom: 24 }}>
              <Text style={{ color: Palette.grey400, fontSize: 13, paddingHorizontal: 20 }}>
                {t.settings_thresh_modal_desc}
              </Text>

              <View style={{ paddingHorizontal: 20, gap: 12 }}>
                {[
                  { key: 'product', label: t.settings_thresh_product, icon: 'alert-circle', max: 100 },
                  { key: 'marketing', label: t.settings_thresh_marketing, icon: 'alert-triangle', max: 100 },
                  { key: 'support', label: t.settings_thresh_support, icon: 'info', max: 100 }
                ].map((item) => (
                  <View key={item.key} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: Palette.navySurface, padding: 16, borderRadius: 12 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                      <Feather name={item.icon as any} size={20} color={Palette.violetLight} />
                      <Text style={{ color: '#fff', fontSize: 15, fontWeight: '600' }}>{item.label}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: Palette.navySurface, borderRadius: 8 }}>
                      <TouchableOpacity
                        onPress={() => setDraftThresholds({ ...draftThresholds, [item.key]: Math.max(0, draftThresholds[item.key as keyof typeof draftThresholds] - 5) })}
                        style={{ padding: 12 }}
                      >
                        <Feather name="minus" size={16} color={Palette.grey300} />
                      </TouchableOpacity>
                      <Text style={{ color: '#fff', fontWeight: '700', width: 36, textAlign: 'center', fontSize: 15 }}>
                        {draftThresholds[item.key as keyof typeof draftThresholds]}
                      </Text>
                      <TouchableOpacity
                        onPress={() => setDraftThresholds({ ...draftThresholds, [item.key]: Math.min(item.max, draftThresholds[item.key as keyof typeof draftThresholds] + 5) })}
                        style={{ padding: 12 }}
                      >
                        <Feather name="plus" size={16} color={Palette.grey300} />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>

              <View style={{ paddingHorizontal: 20, marginTop: 8 }}>
                <TouchableOpacity style={[styles.saveBtn, { backgroundColor: Palette.violetLight }]} onPress={handleThresholdSubmit}>
                  <Text style={[styles.saveBtnText, { color: Palette.deepNavy }]}>{t.settings_thresh_submit}</Text>
                </TouchableOpacity>
              </View>

            </ScrollView>
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
  screenTitle: { fontSize: 24, color: '#fff', fontWeight: '900', marginTop: 4 },
  content: { paddingHorizontal: Spacing.md, paddingBottom: 60 },

  // ── Profile Card ──
  profileCard: {
    flexDirection: 'row', alignItems: 'center', gap: 16,
    borderRadius: Radii.lg, padding: 20,
    borderWidth: 1, borderColor: Palette.violetDim,
    marginTop: 8,
    shadowColor: Palette.violet, shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15, shadowRadius: 12, elevation: 5,
  },
  avatarRing: {
    width: 66, height: 66, borderRadius: 33,
    backgroundColor: Palette.violetDim,
    padding: 3, alignItems: 'center', justifyContent: 'center',
  },
  avatar: {
    width: 60, height: 60, borderRadius: 30,
    backgroundColor: Palette.navySurface, justifyContent: 'center', alignItems: 'center',
    overflow: 'hidden',
  },
  avatarText: { color: Palette.violetLight, fontSize: 22, fontWeight: '900', letterSpacing: 1 },
  avatarImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  profileInfo: { flex: 1 },
  profileName: { color: '#fff', fontSize: 18, fontWeight: '800', marginBottom: 2 },
  profileMeta: { color: Palette.violetLight, fontSize: 12, fontWeight: '600', marginBottom: 8 },
  contactRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 },
  profileDetail: { color: Palette.grey400, fontSize: 12, fontWeight: '500', flexShrink: 1 },
  editBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center', justifyContent: 'center',
  },

  // ── Section ──
  sectionHeader: {
    fontSize: 12, color: Palette.grey400, fontWeight: '800',
    letterSpacing: 1.5, textTransform: 'uppercase', marginTop: 28, marginBottom: 10,
    marginLeft: 4,
  },
  section: {
    backgroundColor: Palette.navyCard, borderRadius: Radii.lg,
    paddingHorizontal: 16, paddingVertical: 4,
    borderWidth: 1, borderColor: Palette.navyBorder,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2, shadowRadius: 8, elevation: 3,
  },
  divider: { height: 1, backgroundColor: Palette.navyBorder, marginVertical: 0 },
  settingRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, gap: 14 },
  iconBox: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: Palette.violetDim,
    alignItems: 'center', justifyContent: 'center',
  },
  settingInfo: { flex: 1 },
  settingLabel: { color: '#fff', fontSize: 15, fontWeight: '700' },
  settingSub: { color: Palette.grey500, fontSize: 12, marginTop: 3 },
  statusGlow: {
    width: 24, height: 24, borderRadius: 12,
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    alignItems: 'center', justifyContent: 'center',
  },
  statusDot: {
    width: 12, height: 12, borderRadius: 6,
    backgroundColor: Palette.success,
    shadowColor: Palette.success, shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8, shadowRadius: 6, elevation: 4,
  },

  // ── Language ──
  langRow: { flexDirection: 'row', gap: 10, paddingVertical: 10 },
  langChip: {
    flex: 1, paddingVertical: 14, borderRadius: Radii.md,
    backgroundColor: Palette.navySurface, borderWidth: 1, borderColor: Palette.navyBorder,
    alignItems: 'center', gap: 6,
  },
  langChipActive: { backgroundColor: Palette.violetDim, borderColor: Palette.violet },
  langFlag: { fontSize: 24 },
  langText: { color: Palette.grey400, fontSize: 12, fontWeight: '800' },
  langTextActive: { color: Palette.violetLight },
  translatingRow: {
    flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4, marginTop: 8,
  },
  translatingText: { color: Palette.violetLight, fontSize: 13, fontWeight: '700' },

  // ── Modal ──
  modalOverlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: Palette.navyCard, borderTopLeftRadius: 28, borderTopRightRadius: 28,
    padding: 24, maxHeight: '90%',
    borderTopWidth: 1, borderColor: Palette.navyBorder,
  },
  modalHandle: {
    width: 40, height: 4, backgroundColor: Palette.navyBorder,
    borderRadius: 2, alignSelf: 'center', marginBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24,
  },
  modalTitle: { color: '#fff', fontSize: 20, fontWeight: '900' },
  closeBtn: {
    width: 32, height: 32, borderRadius: 16, backgroundColor: Palette.navySurface,
    alignItems: 'center', justifyContent: 'center',
  },
  modalAvatarContainer: { alignItems: 'center', marginBottom: 24 },
  modalAvatarRing: {
    padding: 4, borderRadius: 100, backgroundColor: Palette.navyCard,
    borderWidth: 2, borderColor: Palette.violet,
  },
  modalAvatar: {
    width: 86, height: 86, borderRadius: 43,
    backgroundColor: Palette.violetDim, justifyContent: 'center', alignItems: 'center',
    overflow: 'hidden',
  },
  photoEditBtn: {
    flexDirection: 'row', alignItems: 'center',
    marginTop: -16, backgroundColor: Palette.violetLight, paddingHorizontal: 16, paddingVertical: 8,
    borderRadius: 20, borderWidth: 2, borderColor: Palette.navyCard,
  },
  photoEditBtnText: { color: Palette.deepNavy, fontSize: 13, fontWeight: '800' },

  // ── Inputs ──
  fieldWrap: { marginBottom: 16 },
  fieldLabel: { color: Palette.grey400, fontSize: 12, fontWeight: '700', marginBottom: 8, letterSpacing: 0.5 },
  fieldInput: {
    backgroundColor: Palette.navySurface, color: '#fff', borderRadius: Radii.md,
    paddingHorizontal: 16, paddingVertical: 14, fontSize: 15,
    borderWidth: 1, borderColor: Palette.navyBorder,
  },
  sexRow: { flexDirection: 'row', gap: 10 },
  sexChip: {
    flex: 1, paddingVertical: 12, borderRadius: Radii.md,
    backgroundColor: Palette.navySurface, borderWidth: 1, borderColor: Palette.navyBorder,
    alignItems: 'center',
  },
  sexChipActive: { backgroundColor: Palette.violetDim, borderColor: Palette.violet },
  sexChipText: { color: Palette.grey400, fontSize: 14, fontWeight: '700' },
  sexChipTextActive: { color: Palette.violetLight },
  saveBtn: {
    borderRadius: Radii.md, paddingVertical: 16, alignItems: 'center', marginTop: 12,
  },
  saveBtnText: { color: '#fff', fontSize: 16, fontWeight: '800', letterSpacing: 0.5 },

  // ── Footer ──
  footer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 20,
  },
  footerText: {
    color: Palette.grey500,
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 24,
  },
  supportContainer: {
    width: '100%',
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xxl,
  },
  supportTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Palette.grey400,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
    alignSelf: 'center',
  },
  supportCard: {
    backgroundColor: Palette.navyCard,
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: Palette.navyBorder,
    padding: Spacing.md,
  },
  supportRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  supportInfo: {
    marginLeft: 12,
    flex: 1,
  },
  supportName: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  supportPhone: {
    color: Palette.grey400,
    fontSize: 13,
    marginTop: 2,
  },
  supportDivider: {
    height: 1,
    backgroundColor: Palette.navyBorder,
    marginVertical: 4,
    marginHorizontal: 8,
  },
});
