// VoiceMap — Scoring Utilities (pure functions, no external deps)

import { Review } from '@/types';

/**
 * Calculate DangerScore (0–100) from a list of reviews.
 * Base = weighted negative sentiment count
 * TrendBoost = week-over-week growth
 * ViralityBoost = high-engagement reviews
 */
export function calcDangerScore(reviews: Review[]): number {
  if (!reviews.length) return 0;

  // Base: ratio of negative reviews, weighted by confidence
  const negativeWeighted = reviews.reduce((acc, r) => {
    if (r.sentiment === 'negative') {
      const weight = r.isSarcastic ? 1.3 : 1.0; // sarcasm amplifies
      return acc + weight;
    }
    return acc;
  }, 0);

  const base = (negativeWeighted / reviews.length) * 100;

  // TrendBoost: growth in negative reviews this week vs last week
  const now = Date.now();
  const oneWeekMs = 7 * 24 * 60 * 60 * 1000;
  const thisWeek = reviews.filter(
    (r) => r.sentiment === 'negative' && now - new Date(r.createdAt).getTime() < oneWeekMs
  ).length;
  const lastWeek = reviews.filter(
    (r) => r.sentiment === 'negative' &&
      new Date(r.createdAt).getTime() > now - 2 * oneWeekMs &&
      new Date(r.createdAt).getTime() <= now - oneWeekMs
  ).length;
  const growthRate = lastWeek > 0 ? (thisWeek - lastWeek) / lastWeek : 0;
  const trendBoost = Math.min(growthRate * 30, 20); // cap at 20 points

  // ViralityBoost: high-likes reviews (>500)
  const viralNegatives = reviews.filter((r) => r.sentiment === 'negative' && (r.likes || 0) > 500).length;
  const viralityBoost = Math.min(viralNegatives * 5, 15); // cap at 15 points

  const score = base + trendBoost + viralityBoost;
  return Math.min(Math.max(Math.round(score), 0), 100);
}

/**
 * Calculate Revenue-at-Risk in ₹
 * RevenueRisk = DangerScore% × avgOrderValue × monthlyOrders × impactFactor
 */
export function calcRevenueRisk(
  dangerScore: number,
  avgOrderValue: number,
  monthlyOrders: number,
  feature?: string
): number {
  // Impact factors by feature category
  const impactFactors: Record<string, number> = {
    Battery: 1.4,
    'Customer Support': 1.2,
    Sound: 1.1,
    Display: 1.3,
    Packaging: 0.9,
    Delivery: 0.8,
    Value: 1.1,
    Taste: 1.0,
    default: 1.0,
  };
  const factor = feature ? (impactFactors[feature] ?? impactFactors.default) : impactFactors.default;
  return Math.round((dangerScore / 100) * avgOrderValue * monthlyOrders * factor);
}

/**
 * Format revenue risk as a readable ₹ string (e.g. ₹32 Lakh)
 */
export function formatRupees(amount: number): string {
  if (amount >= 10_000_000) return `₹${(amount / 10_000_000).toFixed(1)} Cr`;
  if (amount >= 100_000) return `₹${(amount / 100_000).toFixed(1)} Lakh`;
  if (amount >= 1_000) return `₹${(amount / 1_000).toFixed(0)}K`;
  return `₹${amount}`;
}

/**
 * Get danger level label and colour key based on score
 */
export function getDangerLevel(score: number): {
  label: string;
  color: 'danger' | 'warning' | 'success';
  emoji: string;
} {
  if (score >= 70) return { label: 'Critical', color: 'danger', emoji: '🔴' };
  if (score >= 40) return { label: 'Warning', color: 'warning', emoji: '🟡' };
  return { label: 'Safe', color: 'success', emoji: '🟢' };
}
