// VoiceMap — useTranslation hook (reads from Groq translation store)
import { useTranslationStore } from '@/store/useTranslationStore';
import { TStrings } from '@/constants/i18n';

export function useTranslation(): TStrings {
  return useTranslationStore((s) => s.strings);
}

export function useIsTranslating(): boolean {
  return useTranslationStore((s) => s.isTranslating);
}
