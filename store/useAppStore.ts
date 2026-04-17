// VoiceMap — Global App Config Store (Zustand)
import { create } from 'zustand';
import { AppConfig } from '@/types';

interface AppStore {
  config: AppConfig;
  updateConfig: (partial: Partial<AppConfig>) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  config: {
    brandName: 'Aura Vision Pro',
    productCategory: 'Spatial Computer',
    language: 'en',
    thresholds: {
      product: 70,
      marketing: 70,
      support: 70,
      trend: 20,
    },
    avgOrderValue: 350000,
    monthlyOrders: 1200,
    darkMode: true,
  },
  updateConfig: (partial) =>
    set((state) => ({ config: { ...state.config, ...partial } })),
}));
