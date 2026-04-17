// VoiceMap — Playbook Store (Zustand)
import { create } from 'zustand';
import { PlaybookAction } from '@/types';
import { MOCK_PLAYBOOK } from '@/data/mockData';

interface PlaybookStore {
  actions: PlaybookAction[];
  originalActions: PlaybookAction[];
  setTranslatedActions: (actions: PlaybookAction[]) => void;
  addAction: (action: PlaybookAction) => void;
  updateActionStatus: (id: string, status: PlaybookAction['status']) => void;
}

export const usePlaybookStore = create<PlaybookStore>((set) => ({
  actions: MOCK_PLAYBOOK,
  originalActions: MOCK_PLAYBOOK,
  setTranslatedActions: (actions) => set({ actions }),
  addAction: (action) => set((s) => ({
    actions: [action, ...s.actions],
    originalActions: [action, ...s.originalActions],
  })),
  updateActionStatus: (id, status) => set((s) => ({
    actions: s.actions.map(a => a.id === id ? { ...a, status } : a),
    originalActions: s.originalActions.map(a => a.id === id ? { ...a, status } : a),
  })),
}));
