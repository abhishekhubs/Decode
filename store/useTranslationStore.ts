// VoiceMap — Groq-powered Translation Store
import { BASE_STRINGS, TStrings } from '@/constants/i18n';
import { translateStoreData } from '@/utils/translator';
import { create } from 'zustand';

// Key is read lazily inside the action so hot-reload / env changes are picked up
const getGroqKey = () => process.env.EXPO_PUBLIC_GROQ_API_KEY ?? '';

const LANG_NAMES: Record<string, string> = {
  hi: 'Hindi',
  kn: 'Kannada',
};

const KEYS = Object.keys(BASE_STRINGS) as Array<keyof TStrings>;
const VALUES = Object.values(BASE_STRINGS) as string[];

// ── Per-session cache — avoids re-calling Groq for already-translated languages ──
const translationCache = new Map<string, TStrings>();

// ── Single in-flight AbortController — cancelled when a new language is picked ──
let currentController: AbortController | null = null;

interface TranslationStore {
  language: string;
  strings: TStrings;
  isTranslating: boolean;
  error: string | null;
  setLanguage: (lang: string) => Promise<void>;
}

// ── Parse Groq response into an ordered string array ────────────────────────
// Strategy 1: numbered lines "1. text" / "1) text" (ASCII digits only)
// Strategy 2: sequential line-by-line fallback when coverage < 60 %
function parseResponse(raw: string, total: number): string[] {
  const results: (string | null)[] = new Array(total).fill(null);

  const lines = raw.split('\n').map((l) => l.trim()).filter(Boolean);
  let matched = 0;

  for (const line of lines) {
    const m = line.match(/^([0-9]+)[.)]\s+(.+)$/);
    if (!m) continue;
    const idx = parseInt(m[1], 10) - 1;
    if (idx >= 0 && idx < total) {
      results[idx] = m[2].trim();
      matched++;
    }
  }

  if (matched < total * 0.6) {
    console.log(`[Translation] Numbered parse gave ${matched}/${total}, switching to sequential`);
    const seqLines = raw
      .split('\n')
      .map((l) => l.replace(/^[^\w\u0C00-\u0C7F\u0900-\u097F]+/, '').trim())
      .filter((l) => l.length > 0);

    for (let i = 0; i < Math.min(seqLines.length, total); i++) {
      results[i] = seqLines[i];
    }
  }

  return results.map((v, i) => v ?? VALUES[i]);
}

// ── Groq fetch with AbortController + 429 retry ──────────────────────────────
async function fetchTranslation(
  prompt: string,
  signal: AbortSignal,
): Promise<string> {
  const apiKey = getGroqKey();
  if (!apiKey.startsWith('gsk_')) {
    throw new Error('Groq API key missing. Add EXPO_PUBLIC_GROQ_API_KEY to .env');
  }

  const body = JSON.stringify({
    model: 'llama-3.3-70b-versatile',  // 70b handles Indic scripts reliably
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 4096,
    temperature: 0.1,
  });

  const doFetch = () =>
    fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body,
      signal,
    });

  let res = await doFetch();

  // ── Auto-retry on rate-limit (429) ────────────────────────────
  if (res.status === 429) {
    const retryAfter = parseInt(res.headers.get('retry-after') ?? '5', 10);
    console.warn(`[Translation] Rate-limited. Retrying after ${retryAfter}s…`);
    await new Promise((r) => setTimeout(r, retryAfter * 1000));
    if (signal.aborted) throw new DOMException('Aborted', 'AbortError');
    res = await doFetch();
  }

  const data = await res.json();

  if (data?.error) {
    throw new Error(`Groq error: ${data.error.message ?? JSON.stringify(data.error)}`);
  }

  const raw: string = data?.choices?.[0]?.message?.content ?? '';
  if (!raw.trim()) throw new Error('Empty response from Groq');

  return raw;
}

export const useTranslationStore = create<TranslationStore>((set, get) => ({
  language: 'en',
  strings: BASE_STRINGS as TStrings,
  isTranslating: false,
  error: null,

  setLanguage: async (lang: string) => {
    // ── Already on this language ──────────────────────────────────
    if (lang === get().language && !get().isTranslating) return;

    // ── Cancel any in-flight request ──────────────────────────────
    if (currentController) {
      currentController.abort();
      currentController = null;
    }

    // ── Switch back to English — always instant ───────────────────
    if (lang === 'en') {
      set({
        language: 'en', strings: BASE_STRINGS as TStrings,
        isTranslating: false, error: null
      });
      return;
    }

    // ── Serve from cache if available ─────────────────────────────
    if (translationCache.has(lang)) {
      console.log(`[Translation] ✅ ${lang} served from cache`);
      set({
        language: lang, strings: translationCache.get(lang)!,
        isTranslating: false, error: null
      });
      translateStoreData(lang);
      return;
    }

    // ── Start fresh API call ──────────────────────────────────────
    const controller = new AbortController();
    currentController = controller;
    const langName = LANG_NAMES[lang] ?? lang;

    set({ isTranslating: true, language: lang, error: null });

    try {
      const numberedList = VALUES.map((v, i) => `${i + 1}. ${v}`).join('\n');
      const prompt =
        `Translate the following numbered UI strings from English to ${langName}.\n` +
        `CRITICAL RULES — follow exactly:\n` +
        `- NUMBER each line with Western Arabic digits only: 1. 2. 3. (NOT ೧ ೨ ೩ or १ २ ३)\n` +
        `- Keep emoji exactly as-is (e.g. 💡 🔴 📱)\n` +
        `- Keep {val} placeholder exactly as-is\n` +
        `- Keep literal \\n exactly as-is\n` +
        `- Output ONLY the numbered translations, nothing else\n\n` +
        numberedList;

      const raw = await fetchTranslation(prompt, controller.signal);

      // If aborted while waiting, bail silently — a newer call is in charge
      if (controller.signal.aborted) return;

      const translated = parseResponse(raw, KEYS.length);
      const merged: TStrings = { ...(BASE_STRINGS as TStrings) };
      KEYS.forEach((key, i) => { if (translated[i]) merged[key] = translated[i]; });

      const covered = KEYS.filter((k, i) => merged[k] !== VALUES[i]).length;
      console.log(`[Translation] ✅ ${langName}: ${covered}/${KEYS.length} strings translated`);

      // Save to cache so repeat switches are instant
      translationCache.set(lang, merged);
      currentController = null;
      set({ strings: merged, isTranslating: false, error: null });

      // Fire off data translation in background
      translateStoreData(lang);

    } catch (e: any) {
      if (e?.name === 'AbortError') {
        // Request was cancelled by a newer selection — do nothing
        console.log('[Translation] Request cancelled (new language selected)');
        return;
      }
      console.warn('[Translation] Failed:', e?.message);
      currentController = null;
      set({
        strings: BASE_STRINGS as TStrings,
        isTranslating: false,
        error: e?.message ?? 'Translation failed',
        language: 'en',
      });
    }
  },
}));
