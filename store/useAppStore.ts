// VoiceMap — Global App Config Store (Zustand)
import { create } from 'zustand';
import { AppConfig } from '@/types';

interface AppStore {
  config: AppConfig;
  updateConfig: (partial: Partial<AppConfig>) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  config: {
    brandName: 'NovaTech',
    productCategory: 'Smartphone',
    language: 'en',
    alertThreshold: 70,
    avgOrderValue: 35000,
    monthlyOrders: 1200,
    darkMode: true,
  },
  updateConfig: (partial) =>
    set((state) => ({ config: { ...state.config, ...partial } })),
}));
