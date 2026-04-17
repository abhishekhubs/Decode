// VoiceMap — Alerts Store (Zustand)
import { create } from 'zustand';
import { Alert } from '@/types';
import { MOCK_ALERTS } from '@/data/mockData';

interface AlertStore {
  alerts: Alert[];
  originalAlerts: Alert[];
  setTranslatedAlerts: (alerts: Alert[]) => void;
  addAlert: (alert: Alert) => void;
  markRead: (id: string) => void;
  markAllRead: () => void;
  unreadCount: () => number;
}

export const useAlertStore = create<AlertStore>((set, get) => ({
  alerts: MOCK_ALERTS,
  originalAlerts: MOCK_ALERTS,
  setTranslatedAlerts: (alerts) => set({ alerts }),
  addAlert: (alert) => set((s) => ({ alerts: [alert, ...s.alerts], originalAlerts: [alert, ...s.originalAlerts] })),
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
}));
