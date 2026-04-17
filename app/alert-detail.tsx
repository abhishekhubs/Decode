// VoiceMap — Alert Detail Screen (modal)
import { Palette, Radii, Spacing } from '@/constants/theme';
import { useTranslation } from '@/hooks/useTranslation';
import { useAlertStore } from '@/store/useAlertStore';
import { formatRupees } from '@/utils/scoring';
import { generateAlertWhatsAppMessage, sendWhatsAppAlert } from '@/utils/twilioClient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Platform,
  Alert as RNAlert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function AlertDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const alerts = useAlertStore((s) => s.alerts);
  const alert = alerts.find((a) => a.id === id);
  const t = useTranslation();

  const [whatsappLoading, setWhatsappLoading] = useState(false);
  const [smsLoading, setSmsLoading] = useState(false);

  if (!alert) {
    return (
      <View style={styles.root}>
        <Text style={{ color: '#fff', textAlign: 'center', marginTop: 100 }}>Alert not found</Text>
      </View>
    );
  }

  const severityConfig = {
    critical: { color: Palette.danger, bg: Palette.dangerDim, icon: '🔴' },
    medium: { color: Palette.warning, bg: Palette.warningDim, icon: '🟡' },
    low: { color: Palette.success, bg: Palette.successDim, icon: '🟢' },
  }[alert.severity];

  const handleWhatsApp = async () => {
    setWhatsappLoading(true);
    try {
      // Step 1: Generate a smart Groq-powered alert message
      const messageBody = await generateAlertWhatsAppMessage({
        feature: alert.feature,
        severity: alert.severity,
        dangerScore: alert.dangerScore,
        revenueRisk: alert.revenueRisk,
        message: alert.message,
        trendPercent: alert.trendPercent,
        reviewCount: alert.reviewCount,
      });

      // Step 2: Send via Twilio WhatsApp
      const result = await sendWhatsAppAlert(messageBody);

      if (result.success) {
        RNAlert.alert(
          '✅ WhatsApp Sent!',
          `Alert delivered to brand manager.\n\n📩 Message:\n${messageBody}\n\nSID: ${result.sid?.slice(0, 20)}…`,
          [{ text: 'Great!' }]
        );
      } else {
        RNAlert.alert(
          '❌ Send Failed',
          `Could not send WhatsApp alert:\n${result.error}`,
          [{ text: 'OK' }]
        );
      }
    } catch (err: any) {
      RNAlert.alert('❌ Error', err?.message ?? 'Something went wrong.');
    } finally {
      setWhatsappLoading(false);
    }
  };

  const handleSms = async () => {
    setSmsLoading(true);
    try {
      // Keep under 160 chars and no special chars to reduce carrier filtering
      const smsBody =
        `VoiceMap Alert: ${alert.severity.toUpperCase()} - ${alert.feature}. ` +
        `Score ${alert.dangerScore}/100. Risk Rs.${(alert.revenueRisk / 100000).toFixed(1)}L. ` +
        `Trend +${alert.trendPercent}%. Take action now.`;

      const accountSid = process.env.EXPO_PUBLIC_TWILIO_ACCOUNT_SID ?? '';
      const authToken = process.env.EXPO_PUBLIC_TWILIO_AUTH_TOKEN ?? '';
      const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;

      const params = new URLSearchParams();
      params.append('To', '+917892208908');
      params.append('From', '+12182504306');
      params.append('Body', smsBody);

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${btoa(`${accountSid}:${authToken}`)}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      });

      const data = await res.json();
      console.log('[SMS Twilio] Status:', res.status, JSON.stringify(data));

      if (res.status === 201 && data.sid) {
        RNAlert.alert(
          '✅ SMS Sent via Twilio!',
          `Message queued to +91 7892208908\nSID: ${data.sid.slice(-10)}\n\n"${smsBody}"`,
          [{ text: 'OK' }]
        );
      } else {
        const errMsg = data?.message ?? `HTTP ${res.status}`;
        RNAlert.alert('❌ SMS Failed', `Twilio: ${errMsg}`, [{ text: 'OK' }]);
      }
    } catch (err: any) {
      RNAlert.alert('❌ Error', err?.message ?? 'Network error.');
    } finally {
      setSmsLoading(false);
    }
  };




  return (
    <View style={styles.root}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t.alert_detail_title}</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>

        {/* Severity Banner */}
        <View style={[styles.severityBanner, { backgroundColor: severityConfig.bg, borderColor: severityConfig.color }]}>
          <Text style={styles.severityIcon}>{severityConfig.icon}</Text>
          <View style={{ flex: 1 }}>
            <Text style={[styles.severityTitle, { color: severityConfig.color }]}>
              {alert.severity.toUpperCase()} — {alert.feature}
            </Text>
            <Text style={styles.severityDate}>
              {new Date(alert.createdAt).toLocaleString('en-IN')}
            </Text>
          </View>
        </View>

        {/* Score + Risk Row */}
        <View style={styles.scoreRow}>
          <View style={styles.scoreCard}>
            <Text style={[styles.scoreValue, { color: severityConfig.color }]}>{alert.dangerScore}</Text>
            <Text style={styles.scoreLabel}>{t.alert_detail_danger}</Text>
          </View>
          <View style={styles.scoreCard}>
            <Text style={[styles.scoreValue, { color: Palette.danger }]}>
              {formatRupees(alert.revenueRisk)}
            </Text>
            <Text style={styles.scoreLabel}>{t.alert_detail_revenue}</Text>
          </View>
          <View style={styles.scoreCard}>
            <Text style={[styles.scoreValue, { color: Palette.warning }]}>
              +{alert.trendPercent}%
            </Text>
            <Text style={styles.scoreLabel}>{t.alert_detail_trend}</Text>
          </View>
        </View>

        {/* Message */}
        <View style={styles.messageCard}>
          <Text style={styles.cardTitle}>{t.alert_detail_desc}</Text>
          <Text style={styles.messageText}>{alert.message}</Text>
          <View style={styles.reviewsMeta}>
            <Text style={{ fontSize: 14 }}>📝</Text>
            <Text style={styles.reviewsMetaText}>{alert.reviewCount} {t.alert_detail_analyzed}</Text>
          </View>
        </View>

        {/* Action buttons */}
        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={[styles.actionBtn, { borderColor: Palette.success }, whatsappLoading && { opacity: 0.65 }]}
            onPress={handleWhatsApp}
            disabled={whatsappLoading}
          >
            {whatsappLoading ? (
              <ActivityIndicator size="small" color={Palette.success} />
            ) : (
              <Text style={styles.actionBtnText}>{t.alert_detail_whatsapp}</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionBtn, { borderColor: Palette.warning }, smsLoading && { opacity: 0.65 }]}
            onPress={handleSms}
            disabled={smsLoading}
          >
            {smsLoading ? (
              <ActivityIndicator size="small" color={Palette.warning} />
            ) : (
              <Text style={styles.actionBtnText}>{t.alert_detail_sms}</Text>
            )}
          </TouchableOpacity>
        </View>
        <View style={[styles.actionsRow, { marginTop: 0 }]}>
          <TouchableOpacity
            style={[styles.actionBtn, { borderColor: Palette.violet }]}
            onPress={() => router.push('/(tabs)/playbook' as any)}
          >
            <Text style={styles.actionBtnText}>{t.alert_detail_playbook}</Text>
          </TouchableOpacity>
        </View>


      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Palette.deepNavy, paddingTop: Platform.OS === 'android' ? 28 : 50 },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: Spacing.md, paddingBottom: 14, borderBottomWidth: 1, borderBottomColor: Palette.navyBorder,
  },
  backBtn: {
    width: 36, height: 36, borderRadius: 18, backgroundColor: Palette.navyCard,
    alignItems: 'center', justifyContent: 'center',
  },
  backArrow: { fontSize: 22, color: Palette.grey300, lineHeight: 26 },
  headerTitle: { color: '#fff', fontSize: 17, fontWeight: '800' },
  content: { padding: Spacing.md, gap: 12, paddingBottom: 48 },
  severityBanner: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    borderRadius: Radii.md, padding: 14, borderWidth: 1.5,
  },
  severityIcon: { fontSize: 28 },
  severityTitle: { fontSize: 16, fontWeight: '800' },
  severityDate: { color: Palette.grey500, fontSize: 11, marginTop: 2 },
  scoreRow: { flexDirection: 'row', gap: 8 },
  scoreCard: {
    flex: 1, backgroundColor: Palette.navyCard, borderRadius: Radii.md,
    padding: 14, alignItems: 'center', borderWidth: 1, borderColor: Palette.navyBorder,
  },
  scoreValue: { fontSize: 22, fontWeight: '900' },
  scoreLabel: { color: Palette.grey500, fontSize: 11, marginTop: 2, textAlign: 'center' },
  messageCard: {
    backgroundColor: Palette.navyCard, borderRadius: Radii.md, padding: 16,
    borderWidth: 1, borderColor: Palette.navyBorder, gap: 8,
  },
  cardTitle: { color: '#fff', fontSize: 15, fontWeight: '800' },
  cardSub: { color: Palette.grey500, fontSize: 12, lineHeight: 17 },
  messageText: { color: Palette.grey300, fontSize: 13, lineHeight: 20 },
  reviewsMeta: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  reviewsMetaText: { color: Palette.grey400, fontSize: 12 },
  actionsRow: { flexDirection: 'row', gap: 10 },
  actionBtn: {
    flex: 1, borderRadius: Radii.md, paddingVertical: 12, alignItems: 'center',
    borderWidth: 1.5, backgroundColor: Palette.navyCard,
  },
  actionBtnText: { color: '#fff', fontWeight: '700', fontSize: 13 },
  replySection: {
    backgroundColor: Palette.navyCard, borderRadius: Radii.lg, padding: 16,
    borderWidth: 1, borderColor: Palette.navyBorder, gap: 10,
  },
  generateBtn: {
    backgroundColor: Palette.violet, borderRadius: Radii.md, paddingVertical: 12, alignItems: 'center',
  },
  generateBtnText: { color: '#fff', fontWeight: '800', fontSize: 15 },
  replyCard: {
    backgroundColor: Palette.navySurface, borderRadius: Radii.md, padding: 14,
    borderWidth: 1, borderColor: Palette.navyBorder, gap: 10,
  },
  replyText: { color: Palette.grey300, fontSize: 13, lineHeight: 20 },
  copyBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, alignSelf: 'flex-end' },
  copyBtnText: { color: Palette.violetLight, fontSize: 13, fontWeight: '700' },
  toneLabel: { color: Palette.grey400, fontSize: 12, fontWeight: '600', marginTop: 4 },
  toneSelector: { flexDirection: 'row', gap: 6, flexWrap: 'wrap', marginBottom: 4 },
  toneBtn: {
    paddingHorizontal: 12, paddingVertical: 6, borderRadius: Radii.sm,
    backgroundColor: Palette.navySurface, borderWidth: 1, borderColor: Palette.navyBorder,
  },
  toneBtnActive: { backgroundColor: Palette.violetDim, borderColor: Palette.violet },
  toneBtnText: { color: Palette.grey400, fontSize: 12, fontWeight: '600' },
  toneBtnTextActive: { color: Palette.violetLight },
});
