import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface UserProfile {
  name: string;
  age: string;
  sex: 'Male' | 'Female' | 'Other' | '';
  email: string;
  phone: string;
  address: string;
}

interface ProfileStore {
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
}

export const useProfileStore = create<ProfileStore>()(
  persist(
    (set) => ({
      profile: {
        name: 'Brand Manager',
        age: '',
        sex: '',
        email: '',
        phone: '+91 7892208908',
        address: '',
      },
      updateProfile: (updates) =>
        set((state) => ({ profile: { ...state.profile, ...updates } })),
    }),
    {
      name: 'voicemap-profile',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
