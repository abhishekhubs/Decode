// VoiceMap — Alerts Store (Zustand)
import { create } from 'zustand';
import { Alert } from '@/types';
import { MOCK_ALERTS } from '@/data/mockData';

interface AlertStore {
  alerts: Alert[];
  addAlert: (alert: Alert) => void;
  markRead: (id: string) => void;
  markAllRead: () => void;
  unreadCount: () => number;
}

export const useAlertStore = create<AlertStore>((set, get) => ({
  alerts: MOCK_ALERTS,
  addAlert: (alert) => set((s) => ({ alerts: [alert, ...s.alerts] })),
  markRead: (id) =>
    set((s) => ({
      alerts: s.alerts.map((a) => (a.id === id ? { ...a, isRead: true } : a)),
    })),
  markAllRead: () =>
    set((s) => ({ alerts: s.alerts.map((a) => ({ ...a, isRead: true })) })),
  unreadCount: () => get().alerts.filter((a) => !a.isRead).length,
}));
