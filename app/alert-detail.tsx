// VoiceMap — Alert Detail Screen (modal)
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Platform, ActivityIndicator, Alert as RNAlert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAlertStore } from '@/store/useAlertStore';
import { Palette, Radii, Spacing } from '@/constants/theme';
import { formatRupees } from '@/utils/scoring';
import { generateAutoReply, ReplyTone } from '@/utils/groqClient';

const TONES: ReplyTone[] = ['Professional', 'Apologetic', 'Empathetic', 'Humorous'];

export default function AlertDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const alerts = useAlertStore((s) => s.alerts);
  const alert = alerts.find((a) => a.id === id);

  const [reply, setReply] = useState('');
  const [tone, setTone] = useState<ReplyTone>('Professional');
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!alert) {
    return (
      <View style={styles.root}>
        <Text style={{ color: '#fff', textAlign: 'center', marginTop: 100 }}>Alert not found</Text>
      </View>
    );
  }

  const severityConfig = {
    critical: { color: Palette.danger, bg: Palette.dangerDim, icon: '🔴' },
    medium:   { color: Palette.warning, bg: Palette.warningDim, icon: '🟡' },
    low:      { color: Palette.success, bg: Palette.successDim, icon: '🟢' },
  }[alert.severity];

  const handleGenerateReply = async () => {
    setGenerating(true);
    const text = `Customer complaint about ${alert.feature}: ${alert.message}`;
    const generated = await generateAutoReply(text, alert.feature, 'en', tone);
    setReply(generated);
    setGenerating(false);
  };

  const handleCopy = () => {
    // In production: use expo-clipboard
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    RNAlert.alert('✅ Copied!', 'Reply copied to clipboard.');
  };

  const handleWhatsApp = () => {
    RNAlert.alert(
      '📱 WhatsApp Alert Sent',
      `Message sent to brand manager:\n\n⚠️ ${alert.feature} issue (Score: ${alert.dangerScore}) – Potential loss: ${formatRupees(alert.revenueRisk)} today.\n\nTake action now: https://voicemap.app/alert/${alert.id}`,
      [{ text: 'OK' }]
    );
  };

  return (
    <View style={styles.root}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Alert Detail</Text>
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
            <Text style={styles.scoreLabel}>Danger Score</Text>
          </View>
          <View style={styles.scoreCard}>
            <Text style={[styles.scoreValue, { color: Palette.dangerLight }]}>
              {formatRupees(alert.revenueRisk)}
            </Text>
            <Text style={styles.scoreLabel}>Revenue at Risk</Text>
          </View>
          <View style={styles.scoreCard}>
            <Text style={[styles.scoreValue, { color: Palette.warning }]}>
              +{alert.trendPercent}%
            </Text>
            <Text style={styles.scoreLabel}>WoW Trend</Text>
          </View>
        </View>

        {/* Message */}
        <View style={styles.messageCard}>
          <Text style={styles.cardTitle}>📋 Alert Description</Text>
          <Text style={styles.messageText}>{alert.message}</Text>
          <View style={styles.reviewsMeta}>
            <Text style={{ fontSize: 14 }}>📝</Text>
            <Text style={styles.reviewsMetaText}>{alert.reviewCount} reviews analyzed</Text>
          </View>
        </View>

        {/* Action buttons */}
        <View style={styles.actionsRow}>
          <TouchableOpacity style={[styles.actionBtn, { borderColor: Palette.success }]} onPress={handleWhatsApp}>
            <Text style={styles.actionBtnText}>📱 Send WhatsApp</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionBtn, { borderColor: Palette.violet }]}
            onPress={() => router.push('/(tabs)/playbook' as any)}
          >
            <Text style={styles.actionBtnText}>🔧 Add to Playbook</Text>
          </TouchableOpacity>
        </View>

        {/* Auto-Reply Generator */}
        <View style={styles.replySection}>
          <Text style={styles.cardTitle}>🤖 AI Auto-Reply Generator</Text>
          <Text style={styles.cardSub}>
            Generate an empathetic, brand-appropriate reply using Groq LLM
          </Text>

          {/* Tone Selector */}
          <Text style={styles.toneLabel}>Select Tone:</Text>
          <View style={styles.toneSelector}>
            {TONES.map(t => (
              <TouchableOpacity 
                key={t}
                style={[styles.toneBtn, tone === t && styles.toneBtnActive]}
                onPress={() => setTone(t)}
              >
                <Text style={[styles.toneBtnText, tone === t && styles.toneBtnTextActive]}>
                  {t}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={[styles.generateBtn, generating && { opacity: 0.6 }]}
            onPress={handleGenerateReply}
            disabled={generating}
          >
            {generating ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.generateBtnText}>✨ Generate Reply</Text>
            )}
          </TouchableOpacity>

          {reply ? (
            <View style={styles.replyCard}>
              <Text style={styles.replyText}>{reply}</Text>
              <TouchableOpacity style={styles.copyBtn} onPress={handleCopy}>
                <Text style={{ fontSize: 16 }}>{copied ? '✅' : '📋'}</Text>
                <Text style={[styles.copyBtnText, copied && { color: Palette.successLight }]}>
                  {copied ? 'Copied!' : 'Copy Reply'}
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}
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
