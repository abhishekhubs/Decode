// VoiceMap — Spam & Duplicate Detection Utility
// Flags bot-generated or near-duplicate reviews before they pollute analysis

import { Review } from '@/types';

/** Jaccard similarity between two strings (word-set overlap) */
function jaccardSimilarity(a: string, b: string): number {
  const setA = new Set(a.toLowerCase().split(/\s+/).filter(w => w.length > 2));
  const setB = new Set(b.toLowerCase().split(/\s+/).filter(w => w.length > 2));
  if (setA.size === 0 || setB.size === 0) return 0;
  const intersection = [...setA].filter(w => setB.has(w)).length;
  const union = new Set([...setA, ...setB]).size;
  return intersection / union;
}

/** Detect if a review text looks like it was bot-generated */
function isBotLike(text: string): boolean {
  const t = text.trim().toLowerCase();
  // Very short reviews with only generic words
  const words = t.split(/\s+/);
  if (words.length <= 3 && /^(good|nice|ok|great|bad|worst|best|poor|love|hate|amazing)[\s!.]*$/.test(t)) return true;
  // Excessive repeated characters (e.g., "gooooood", "!!!!!!!")
  if (/(.)(\1){4,}/.test(t)) return true;
  // All same word repeated
  const unique = new Set(words);
  if (words.length >= 4 && unique.size === 1) return true;
  return false;
}

export interface SpamReport {
  /** IDs of reviews that are near-duplicates of another */
  duplicateIds: Set<string>;
  /** IDs of reviews flagged as bot-generated */
  botIds: Set<string>;
  /** Human-readable summary */
  summary: string;
}

/**
 * Analyse a list of reviews and return spam/duplicate flags.
 * Uses Jaccard similarity threshold of 0.75 for near-duplicates.
 */
export function detectSpamAndDuplicates(reviews: Review[]): SpamReport {
  const duplicateIds = new Set<string>();
  const botIds = new Set<string>();

  // 1. Bot detection (fast, O(n))
  reviews.forEach(r => {
    if (isBotLike(r.text)) botIds.add(r.id);
  });

  // 2. Near-duplicate clustering (O(n²) — fine for 200–500 reviews)
  for (let i = 0; i < reviews.length; i++) {
    for (let j = i + 1; j < reviews.length; j++) {
      if (duplicateIds.has(reviews[i].id) && duplicateIds.has(reviews[j].id)) continue;
      const sim = jaccardSimilarity(reviews[i].text, reviews[j].text);
      if (sim >= 0.75) {
        // Mark the later one as duplicate (keep earliest occurrence)
        duplicateIds.add(reviews[j].id);
      }
    }
  }

  const totalFlagged = duplicateIds.size + botIds.size;
  const summary = totalFlagged === 0
    ? 'No spam or duplicate reviews detected.'
    : `⚠️ ${duplicateIds.size} near-duplicate${duplicateIds.size !== 1 ? 's' : ''} and ${botIds.size} bot-like review${botIds.size !== 1 ? 's' : ''} flagged — excluded from analysis.`;

  return { duplicateIds, botIds, summary };
}

/** Returns true if this review should be excluded from analysis */
export function isSpam(review: Review, report: SpamReport): boolean {
  return report.duplicateIds.has(review.id) || report.botIds.has(review.id);
}
