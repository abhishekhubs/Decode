// VoiceMap — Google Translate API Wrapper for Data
// Used to translate dynamic store data (reviews, alerts, playbook) on the fly.

const MAX_CHUNK_LENGTH = 3500;
const DELIMITER = '\n_X_\n';

export async function bulkTranslate(texts: string[], targetLang: string): Promise<string[]> {
  if (targetLang === 'en' || texts.length === 0) return texts;

  const translatedTexts: string[] = [];
  let currentChunk: string[] = [];
  let currentLen = 0;

  // Split into manageable chunks to avoid URL length limits
  const chunks: string[][] = [];
  for (const t of texts) {
    if (currentLen + t.length > MAX_CHUNK_LENGTH && currentChunk.length > 0) {
      chunks.push(currentChunk);
      currentChunk = [];
      currentLen = 0;
    }
    currentChunk.push(t);
    currentLen += t.length + DELIMITER.length;
  }
  if (currentChunk.length > 0) chunks.push(currentChunk);

  for (const chunk of chunks) {
    const q = chunk.join(DELIMITER);
    try {
      const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(q)}`);
      const data = await res.json();
      
      // data[0] contains array of segments: [ [ "translated_1", "original_1" ], [ "translated_2", ... ] ]
      const translatedStr = data[0].map((x: any) => x[0]).join('');
      
      // Split back by delimiter
      const splits = translatedStr
        .split(/_X_|_ X _|_X _|_ X_/i)
        .map((s) => s.trim().replace(/^_+|_+$/g, '').trim());
      
      // Ensure we match the exact length of input chunk
      if (splits.length === chunk.length) {
        translatedTexts.push(...splits);
      } else {
        console.warn(`[Translator] Chunk size mismatch: expected ${chunk.length}, got ${splits.length}. Falling back to original for this chunk.`);
        translatedTexts.push(...chunk);
      }
    } catch (e) {
      console.warn('[Translator] Failed to translate chunk:', e);
      translatedTexts.push(...chunk); // fallback
    }
  }

  return translatedTexts;
}

export async function translateStoreData(targetLang: string) {
  // Dynamic import to avoid circular dependencies if any
  const { useReviewStore } = require('@/store/useReviewStore');
  const { useAlertStore } = require('@/store/useAlertStore');
  const { usePlaybookStore } = require('@/store/usePlaybookStore');

  const reviewStore = useReviewStore.getState();
  const alertStore = useAlertStore.getState();
  const playbookStore = usePlaybookStore.getState();

  if (targetLang === 'en') {
    reviewStore.setTranslatedReviews(reviewStore.originalReviews);
    alertStore.setTranslatedAlerts(alertStore.originalAlerts);
    playbookStore.setTranslatedActions(playbookStore.originalActions);
    return;
  }

  // 1. Gather all strings to translate
  const strings: string[] = [];
  
  // Reviews
  reviewStore.originalReviews.forEach(r => {
    strings.push(r.text);
    r.features.forEach(f => strings.push(f.name));
    r.highlights.forEach(h => strings.push(h.word));
    strings.push(r.productCategory);
    strings.push(r.brandName);
  });

  // Alerts
  alertStore.originalAlerts.forEach(a => {
    strings.push(a.message);
    strings.push(a.feature);
  });

  // Playbook
  playbookStore.originalActions.forEach(p => {
    strings.push(p.title);
    strings.push(p.description);
    strings.push(p.feature);
    strings.push(p.owner);
  });

  console.log(`[Translator] Translating ${strings.length} data fields to ${targetLang}...`);
  const translated = await bulkTranslate(strings, targetLang);

  if (translated.length < strings.length) {
    console.error('[Translator] Translation failed or incomplete.');
    return;
  }

  // 2. Re-apply translated strings
  let i = 0;

  const newReviews = reviewStore.originalReviews.map(r => {
    const text = translated[i++];
    const features = r.features.map(f => ({ ...f, name: translated[i++] }));
    const highlights = r.highlights.map(h => ({ ...h, word: translated[i++] }));
    const productCategory = translated[i++];
    const brandName = translated[i++];
    return { ...r, text, features, highlights, productCategory, brandName };
  });

  const newAlerts = alertStore.originalAlerts.map(a => {
    const message = translated[i++];
    const feature = translated[i++];
    return { ...a, message, feature };
  });

  const newActions = playbookStore.originalActions.map(p => {
    const title = translated[i++];
    const description = translated[i++];
    const feature = translated[i++];
    const owner = translated[i++];
    return { ...p, title, description, feature, owner };
  });

  reviewStore.setTranslatedReviews(newReviews);
  alertStore.setTranslatedAlerts(newAlerts);
  playbookStore.setTranslatedActions(newActions);
  console.log('[Translator] ✅ Store data translated successfully!');
}
