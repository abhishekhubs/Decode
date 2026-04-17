// VoiceMap — Groq-powered Translation Store
import { create } from 'zustand';
import { BASE_STRINGS, TStrings } from '@/constants/i18n';

const GROQ_API_KEY = process.env.EXPO_PUBLIC_GROQ_API_KEY ?? '';

const LANG_NAMES: Record<string, string> = {
  hi: 'Hindi',
  kn: 'Kannada',
};

const KEYS   = Object.keys(BASE_STRINGS) as Array<keyof TStrings>;
const VALUES = Object.values(BASE_STRINGS) as string[];

interface TranslationStore {
  language: string;
  strings: TStrings;
  isTranslating: boolean;
  error: string | null;
  setLanguage: (lang: string) => Promise<void>;
}

// ── Parse Groq response into an ordered string array ────────────────────────
// Strategy 1: match lines like "1. text" or "1) text" using ASCII digits only
// Strategy 2: if numbered parsing gives < 60% coverage, fall back to
//             reading non-empty lines sequentially (one per string)
function parseResponse(raw: string, total: number): string[] {
  const results: (string | null)[] = new Array(total).fill(null);

  // ── Strategy 1: numbered lines (1. ... or 1) ...) ─────────────
  const lines = raw.split('\n').map((l) => l.trim()).filter(Boolean);
  let matched = 0;

  for (const line of lines) {
    // Only match ASCII digits to avoid native-numeral confusion
    const m = line.match(/^([0-9]+)[.)]\s+(.+)$/);
    if (!m) continue;
    const idx = parseInt(m[1], 10) - 1;
    if (idx >= 0 && idx < total) {
      results[idx] = m[2].trim();
      matched++;
    }
  }

  // ── Strategy 2: sequential fallback ───────────────────────────
  if (matched < total * 0.6) {
    console.log(`[Translation] Numbered parse gave ${matched}/${total}, switching to sequential`);
    const seqLines = raw
      .split('\n')
      .map((l) => l.replace(/^[^\w\u0C00-\u0C7F\u0900-\u097F]+/, '').trim()) // strip leading non-word/non-script chars
      .filter((l) => l.length > 0);

    for (let i = 0; i < Math.min(seqLines.length, total); i++) {
      results[i] = seqLines[i];
    }
  }

  return results.map((v, i) => v ?? VALUES[i]); // fallback to English for any null
}

export const useTranslationStore = create<TranslationStore>((set) => ({
  language: 'en',
  strings: BASE_STRINGS as TStrings,
  isTranslating: false,
  error: null,

  setLanguage: async (lang: string) => {
    if (lang === 'en') {
      set({ language: 'en', strings: BASE_STRINGS as TStrings, error: null });
      return;
    }

    const langName = LANG_NAMES[lang] ?? lang;
    set({ isTranslating: true, language: lang, error: null });

    try {
      const numberedList = VALUES.map((v, i) => `${i + 1}. ${v}`).join('\n');

      const prompt =
        `Translate the following numbered UI strings from English to ${langName}.\n` +
        `CRITICAL RULES - follow exactly:\n` +
        `- NUMBER each line using Western Arabic digits only: 1. 2. 3. (NOT ೧ ೨ ೩ or १ २ ३)\n` +
        `- Keep emoji exactly as-is (e.g. 💡 🔴 📱)\n` +
        `- Keep {val} placeholder exactly as-is\n` +
        `- Keep literal \\n exactly as-is\n` +
        `- Output ONLY the numbered translations, nothing else\n\n` +
        numberedList;

      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 4096,
          temperature: 0.1, // lower = more reliable format adherence
        }),
      });

      const data = await res.json();
      const raw: string = data?.choices?.[0]?.message?.content ?? '';

      if (!raw.trim()) throw new Error('Empty response from Groq');

      const translated = parseResponse(raw, KEYS.length);

      const merged: TStrings = { ...(BASE_STRINGS as TStrings) };
      KEYS.forEach((key, i) => {
        if (translated[i]) merged[key] = translated[i];
      });

      const covered = KEYS.filter((k, i) => merged[k] !== VALUES[i]).length;
      console.log(`[Translation] ✅ ${langName}: ${covered}/${KEYS.length} strings translated`);
      set({ strings: merged, isTranslating: false, error: null });
    } catch (e: any) {
      console.warn('[Translation] Failed:', e?.message);
      set({ strings: BASE_STRINGS as TStrings, isTranslating: false, error: e?.message, language: 'en' });
    }
  },
}));
