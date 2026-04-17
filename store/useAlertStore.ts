// VoiceMap — Alerts Store (Zustand)
import { create } from 'zustand';
import { Alert } from '@/types';
import { MOCK_ALERTS } from '@/data/mockData';
import { useAppStore } from './useAppStore';
import { generateAlertWhatsAppMessage, sendWhatsAppAlert } from '@/utils/twilioClient';

interface AlertStore {
  alerts: Alert[];
  originalAlerts: Alert[];
  setTranslatedAlerts: (alerts: Alert[]) => void;
  addAlert: (alert: Alert) => void;
  markRead: (id: string) => void;
  markAllRead: () => void;
  unreadCount: () => number;
  checkThresholdsAndNotify: (newThresholds: { product: number; marketing: number; support: number; trend: number }) => Promise<void>;
}

export const useAlertStore = create<AlertStore>((set, get) => ({
  alerts: MOCK_ALERTS,
  originalAlerts: MOCK_ALERTS,
  setTranslatedAlerts: (alerts) => set({ alerts }),
  addAlert: async (alert) => {
    // 1. Add to local state immediately
    set((s) => ({ alerts: [alert, ...s.alerts], originalAlerts: [alert, ...s.originalAlerts] }));
    
    // 2. Check Automated Limits
    const { thresholds } = useAppStore.getState().config;
    
    let category: 'product' | 'marketing' | 'support' = 'product';
    const featureL = alert.feature.toLowerCase();
    if (featureL.includes('support') || featureL.includes('service') || featureL.includes('delivery')) category = 'support';
    else if (featureL.includes('price') || featureL.includes('offer') || featureL.includes('packaging')) category = 'marketing';
    
    const limit = thresholds[category];
    const trendLimit = thresholds.trend;
    
    if (alert.dangerScore >= limit || alert.trendPercent >= trendLimit) {
      console.log(`[Auto-Alert] Limit breached! Generating Twilio WhatsApp for ${alert.feature}...`);
      try {
        const messageBody = await generateAlertWhatsAppMessage(alert);
        const result = await sendWhatsAppAlert(messageBody);
        if (result.success) {
          console.log(`[Auto-Alert] ✅ Twilio WhatsApp sent! SID: ${result.sid}`);
        } else {
          console.error(`[Auto-Alert] ❌ Twilio WhatsApp failed: ${result.error}`);
        }
      } catch (err) {
        console.error('[Auto-Alert] Automation crashed:', err);
      }
    }
  },
  markRead: (id) =>
    set((s) => ({
      alerts: s.alerts.map((a) => (a.id === id ? { ...a, isRead: true } : a)),
      originalAlerts: s.originalAlerts.map((a) => (a.id === id ? { ...a, isRead: true } : a)),
    })),
  markAllRead: () =>
    set((s) => ({
      alerts: s.alerts.map((a) => ({ ...a, isRead: true })),
      originalAlerts: s.originalAlerts.map((a) => ({ ...a, isRead: true })),
    })),
  unreadCount: () => get().alerts.filter((a) => !a.isRead).length,
  checkThresholdsAndNotify: async (newThresholds) => {
    console.log('[Auto-Alert] Checking existing alerts against newly submitted thresholds...');
    const alerts = get().alerts;
    
    // Find ALL unread alerts that breach the new thresholds
    const breachedAlerts = alerts.filter(alert => {
      if (alert.isRead) return false;
      
      let category: 'product' | 'marketing' | 'support' = 'product';
      const featureL = alert.feature.toLowerCase();
      if (featureL.includes('support') || featureL.includes('service') || featureL.includes('delivery')) category = 'support';
      else if (featureL.includes('price') || featureL.includes('offer') || featureL.includes('packaging')) category = 'marketing';
      
      return alert.dangerScore >= newThresholds[category];
    });

    if (breachedAlerts.length > 0) {
      console.log(`[Auto-Alert] Found ${breachedAlerts.length} existing alerts breaching the new limits! Generating WhatsApp messages...`);
      
      // Process sequentially to avoid API rate limits
      for (const breachedAlert of breachedAlerts) {
        try {
          const messageBody = await generateAlertWhatsAppMessage(breachedAlert);
          const result = await sendWhatsAppAlert(messageBody);
          if (result.success) {
            console.log(`[Auto-Alert] ✅ Twilio WhatsApp sent for ${breachedAlert.feature}! SID: ${result.sid}`);
          } else {
            console.error(`[Auto-Alert] ❌ Twilio WhatsApp failed for ${breachedAlert.feature}: ${result.error}`);
          }
        } catch (err) {
          console.error(`[Auto-Alert] Automation crashed for ${breachedAlert.feature}:`, err);
        }
      }
    } else {
      console.log('[Auto-Alert] No unread alerts currently breach the new thresholds.');
    }
  },
}));
