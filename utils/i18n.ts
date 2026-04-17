// utils/i18n.ts
// The app uses its own Groq-powered translation system (useTranslationStore + constants/i18n.ts).
// This file exists as a compatibility shim — nothing in the codebase should import i18next directly.
export { BASE_STRINGS } from '@/constants/i18n';
export { useTranslationStore } from '@/store/useTranslationStore';
