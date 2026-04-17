// VoiceMap — 200-review mock dataset + alerts + competitors
// Pre-scored: battery complaints trending +30% WoW → triggers alerts

import { Review, Alert, PlaybookAction, CompetitorBrand, TrendPoint } from '@/types';

// ─── Helper ───────────────────────────────────────────────────────────────────
function daysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString();
}

// ─── 200 Reviews ─────────────────────────────────────────────────────────────
export const MOCK_REVIEWS: Review[] = [
  // === BATTERY CRITICAL CLUSTER (trending) ===
  {
    id: 'r001', platform: 'amazon', rating: 1, language: 'en', sentiment: 'negative',
    isSarcastic: false, sarcasticConfidence: 0.08,
    text: 'Battery drains in 4 hours flat. Paid ₹35,000 for this premium device and it dies before lunch. Absolute disaster.',
    features: [{ name: 'Battery', sentiment: 'negative', confidence: 0.97 }, { name: 'Value', sentiment: 'negative', confidence: 0.82 }],
    dangerScore: 94, revenueRisk: 320000, productCategory: 'Smartphone', brandName: 'NovaTech X1',
    highlights: [{ word: 'drains', sentiment: 'negative' }, { word: '4 hours', sentiment: 'negative' }, { word: 'disaster', sentiment: 'negative' }],
    author: 'Rahul M.', likes: 247, createdAt: daysAgo(1),
  },
  {
    id: 'r002', platform: 'flipkart', rating: 1, language: 'hi', sentiment: 'negative',
    isSarcastic: true, sarcasticConfidence: 0.89,
    text: 'Wah wah NovaTech, battery toh 3 ghante mein khatam. Ekdum superb product hai bhai — sirf charger ke saath ghar rehna padega.',
    features: [{ name: 'Battery', sentiment: 'negative', confidence: 0.91 }],
    dangerScore: 88, revenueRisk: 280000, productCategory: 'Smartphone', brandName: 'NovaTech X1',
    highlights: [{ word: '3 ghante', sentiment: 'negative' }, { word: 'Wah wah', sentiment: 'negative' }, { word: 'superb', sentiment: 'negative' }],
    author: 'Priya S.', likes: 183, createdAt: daysAgo(1),
  },
  {
    id: 'r003', platform: 'youtube', rating: 2, language: 'en', sentiment: 'negative',
    isSarcastic: false, sarcasticConfidence: 0.12,
    text: 'Battery life is genuinely terrible. I charged it twice today. Screen is great but 4 hours SOT is unacceptable in 2025.',
    features: [{ name: 'Battery', sentiment: 'negative', confidence: 0.95 }, { name: 'Display', sentiment: 'positive', confidence: 0.78 }],
    dangerScore: 85, revenueRisk: 260000, productCategory: 'Smartphone', brandName: 'NovaTech X1',
    highlights: [{ word: 'terrible', sentiment: 'negative' }, { word: 'twice', sentiment: 'negative' }, { word: 'great', sentiment: 'positive' }],
    author: 'TechReview_IN', likes: 892, createdAt: daysAgo(2),
  },
  {
    id: 'r004', platform: 'amazon', rating: 2, language: 'en', sentiment: 'negative',
    isSarcastic: false, sarcasticConfidence: 0.05,
    text: 'Cannot believe the battery performance. Loses 20% just from standby overnight. This is broken software or broken hardware.',
    features: [{ name: 'Battery', sentiment: 'negative', confidence: 0.93 }, { name: 'Software', sentiment: 'negative', confidence: 0.71 }],
    dangerScore: 82, revenueRisk: 245000, productCategory: 'Smartphone', brandName: 'NovaTech X1',
    highlights: [{ word: 'broken', sentiment: 'negative' }, { word: 'standby', sentiment: 'negative' }],
    author: 'Anjali K.', likes: 134, createdAt: daysAgo(2),
  },
  {
    id: 'r005', platform: 'twitter', rating: 1, language: 'en', sentiment: 'negative',
    isSarcastic: true, sarcasticConfidence: 0.92,
    text: 'Love how NovaTech advertises "all-day battery" and then the phone dies at 2pm. Peak innovation 👏👏',
    features: [{ name: 'Battery', sentiment: 'negative', confidence: 0.96 }, { name: 'Marketing', sentiment: 'negative', confidence: 0.84 }],
    dangerScore: 91, revenueRisk: 310000, productCategory: 'Smartphone', brandName: 'NovaTech X1',
    highlights: [{ word: 'all-day battery', sentiment: 'negative' }, { word: 'dies at 2pm', sentiment: 'negative' }, { word: '👏', sentiment: 'negative' }],
    author: '@techrant_india', likes: 1204, createdAt: daysAgo(1),
  },
  ...Array.from({ length: 35 }, (_, i) => ({
    id: `r00${6 + i}`, platform: ['amazon', 'flipkart', 'youtube'][i % 3] as any,
    rating: Math.random() > 0.7 ? 2 : 1, language: ['en', 'hi', 'kn'][i % 3] as any,
    sentiment: 'negative' as const, isSarcastic: i % 7 === 0, sarcasticConfidence: i % 7 === 0 ? 0.82 : 0.12,
    text: [
      'Battery is pathetic. Dies before end of day.',
      'Horrible battery life. Not worth the price.',
      'Screen is ok but battery is a joke.',
      'Had to return it because battery lasted only 4 hours.',
      'My old phone had better battery life than ₹35k phone.',
    ][i % 5],
    features: [{ name: 'Battery', sentiment: 'negative' as const, confidence: 0.85 + (i % 10) * 0.01 }],
    dangerScore: 70 + (i % 25), revenueRisk: 150000 + i * 5000,
    productCategory: 'Smartphone', brandName: 'NovaTech X1',
    highlights: [{ word: 'battery', sentiment: 'negative' as const }],
    author: `User${200 + i}`, likes: Math.floor(Math.random() * 300),
    createdAt: daysAgo(Math.floor(i / 5)),
  })),

  // === PACKAGING ISSUE CLUSTER ===
  {
    id: 'r050', platform: 'amazon', rating: 2, language: 'en', sentiment: 'negative',
    isSarcastic: false, sarcasticConfidence: 0.04,
    text: 'Packaging was completely damaged. Phone came with scratches. Flipkart delivered it like a football.',
    features: [{ name: 'Packaging', sentiment: 'negative', confidence: 0.88 }, { name: 'Delivery', sentiment: 'negative', confidence: 0.79 }],
    dangerScore: 62, revenueRisk: 85000, productCategory: 'Smartphone', brandName: 'NovaTech X1',
    highlights: [{ word: 'damaged', sentiment: 'negative' }, { word: 'scratches', sentiment: 'negative' }],
    author: 'Kiran B.', likes: 67, createdAt: daysAgo(3),
  },
  ...Array.from({ length: 30 }, (_, i) => ({
    id: `r05${1 + i}`, platform: ['amazon', 'flipkart'][i % 2] as any,
    rating: i % 3 === 0 ? 1 : 2, language: 'en' as const,
    sentiment: 'negative' as const, isSarcastic: false, sarcasticConfidence: 0.06,
    text: ['Box was crushed on arrival.', 'Packaging is flimsy. Product arrived damaged.', 'Terrible packaging for a premium phone.'][i % 3],
    features: [{ name: 'Packaging', sentiment: 'negative' as const, confidence: 0.80 + (i % 15) * 0.01 }],
    dangerScore: 55 + (i % 15), revenueRisk: 60000 + i * 2000,
    productCategory: 'Smartphone', brandName: 'NovaTech X1',
    highlights: [{ word: 'packaging', sentiment: 'negative' as const }],
    author: `User${300 + i}`, likes: Math.floor(Math.random() * 80),
    createdAt: daysAgo(Math.floor(3 + i / 6)),
  })),

  // === SOUND / AUDIO POSITIVE CLUSTER ===
  {
    id: 'r090', platform: 'amazon', rating: 5, language: 'en', sentiment: 'positive',
    isSarcastic: false, sarcasticConfidence: 0.02,
    text: 'Sound quality is absolutely phenomenal. ANC works perfectly in Mumbai metro. Best earphones under ₹5000.',
    features: [{ name: 'Sound', sentiment: 'positive', confidence: 0.98 }, { name: 'ANC', sentiment: 'positive', confidence: 0.94 }],
    dangerScore: 8, revenueRisk: 0, productCategory: 'Earphones', brandName: 'NovaTech Buds Pro',
    highlights: [{ word: 'phenomenal', sentiment: 'positive' }, { word: 'perfectly', sentiment: 'positive' }, { word: 'Best', sentiment: 'positive' }],
    author: 'Suresh P.', likes: 523, createdAt: daysAgo(4),
  },
  ...Array.from({ length: 40 }, (_, i) => ({
    id: `r09${1 + i}`, platform: ['amazon', 'flipkart', 'youtube'][i % 3] as any,
    rating: i % 8 === 0 ? 4 : 5, language: ['en', 'hi'][i % 2] as any,
    sentiment: 'positive' as const, isSarcastic: false, sarcasticConfidence: 0.03,
    text: ['Amazing bass response!', 'Crystal clear sound. Worth every rupee.', 'Best TWS under 5k.', 'ANC is superb for this price.', 'Wearing these all day.'][i % 5],
    features: [{ name: 'Sound', sentiment: 'positive' as const, confidence: 0.88 + (i % 10) * 0.01 }],
    dangerScore: 5 + (i % 15), revenueRisk: 0,
    productCategory: 'Earphones', brandName: 'NovaTech Buds Pro',
    highlights: [{ word: 'sound', sentiment: 'positive' as const }],
    author: `User${400 + i}`, likes: Math.floor(Math.random() * 600),
    createdAt: daysAgo(Math.floor(i / 8)),
  })),

  // === FOOD / PACKAGING POSITIVE ===
  ...Array.from({ length: 50 }, (_, i) => ({
    id: `r14${0 + i}`, platform: ['amazon', 'flipkart'][i % 2] as any,
    rating: i % 6 === 0 ? 3 : 4 + (i % 2) as any,
    language: ['en', 'hi', 'kn'][i % 3] as any,
    sentiment: (i % 5 === 0 ? 'neutral' : i % 7 === 0 ? 'negative' : 'positive') as any,
    isSarcastic: false, sarcasticConfidence: 0.04,
    text: ['Great taste and fresh packaging.', 'Delivered on time. Taste is authentic.', 'Slightly less spicy than expected.', 'Will buy again. Excellent quality.', 'Packaging could be better but taste is amazing.'][i % 5],
    features: [{ name: 'Taste', sentiment: (i % 7 === 0 ? 'negative' : 'positive') as any, confidence: 0.80 + (i % 15) * 0.01 },
               { name: 'Packaging', sentiment: (i % 5 === 0 ? 'neutral' : 'positive') as any, confidence: 0.70 }],
    dangerScore: i % 7 === 0 ? 45 + i % 20 : 10 + i % 20, revenueRisk: i % 7 === 0 ? 30000 : 0,
    productCategory: 'Packaged Food', brandName: 'SpiceBox Premium',
    highlights: [{ word: i % 7 === 0 ? 'less spicy' : 'great', sentiment: (i % 7 === 0 ? 'negative' : 'positive') as any }],
    author: `FoodieFan${i}`, likes: Math.floor(Math.random() * 200),
    createdAt: daysAgo(Math.floor(i / 10)),
  })),
];

// ─── Alerts ──────────────────────────────────────────────────────────────────
export const MOCK_ALERTS: Alert[] = [
  {
    id: 'a001', feature: 'Battery', dangerScore: 92, revenueRisk: 3200000,
    message: '⚠️ Battery issues spiking +30% this week. 40 negative reviews in 48 h. Potential customer attrition rising.',
    reviewCount: 40, trend: 'rising', trendPercent: 30, isRead: false, severity: 'critical',
    createdAt: daysAgo(0),
  },
  {
    id: 'a002', feature: 'Packaging', dangerScore: 68, revenueRisk: 850000,
    message: 'Packaging complaints increased +12% — 30 customers received damaged units this week.',
    reviewCount: 30, trend: 'rising', trendPercent: 12, isRead: false, severity: 'medium',
    createdAt: daysAgo(1),
  },
  {
    id: 'a003', feature: 'Customer Support', dangerScore: 74, revenueRisk: 1100000,
    message: 'Support response time complaints up +18%. Customers citing 5-day resolution wait.',
    reviewCount: 22, trend: 'rising', trendPercent: 18, isRead: false, severity: 'critical',
    createdAt: daysAgo(1),
  },
  {
    id: 'a004', feature: 'Sound Quality', dangerScore: 12, revenueRisk: 0,
    message: '✅ Sound quality sentiment is 94% positive — brand advocate momentum increasing.',
    reviewCount: 89, trend: 'stable', trendPercent: 2, isRead: true, severity: 'low',
    createdAt: daysAgo(2),
  },
  {
    id: 'a005', feature: 'Delivery', dangerScore: 55, revenueRisk: 420000,
    message: 'Delivery delay complaints rising in Tier-2 cities. 15 negative reviews in Maharashtra.',
    reviewCount: 15, trend: 'rising', trendPercent: 8, isRead: true, severity: 'medium',
    createdAt: daysAgo(3),
  },
];

// ─── Playbook Actions ─────────────────────────────────────────────────────────
export const MOCK_PLAYBOOK: PlaybookAction[] = [
  {
    id: 'p001', title: 'Escalate battery firmware patch to dev team',
    description: 'Share battery drain report with R&D. Request hotfix within 48h.',
    feature: 'Battery', priority: 'high', owner: 'Product Manager', status: 'inprogress',
    dueDate: daysAgo(-2), linkedAlertId: 'a001', createdAt: daysAgo(1),
  },
  {
    id: 'p002', title: 'Replace packaging supplier for NovaTech X1',
    description: 'Current foam padding insufficient. Source double-wall corrugated alternative.',
    feature: 'Packaging', priority: 'high', owner: 'Operations Lead', status: 'todo',
    dueDate: daysAgo(-5), linkedAlertId: 'a002', createdAt: daysAgo(1),
  },
  {
    id: 'p003', title: 'Post empathetic response to top battery complaints',
    description: 'Use AI-generated template to reply to top 10 Amazon reviews.',
    feature: 'Battery', priority: 'medium', owner: 'Brand Manager', status: 'todo',
    dueDate: daysAgo(-1), linkedAlertId: 'a001', createdAt: daysAgo(0),
  },
  {
    id: 'p004', title: 'Offer free charger upgrade to affected customers',
    description: 'Identify customers who complained about battery → send Myntra gift code.',
    feature: 'Battery', priority: 'medium', owner: 'CX Team', status: 'done',
    dueDate: daysAgo(0), linkedAlertId: 'a001', createdAt: daysAgo(2),
  },
  {
    id: 'p005', title: 'Hire 5 additional support agents for Diwali season',
    description: 'Current team overwhelmed. Upwork shortlist ready.',
    feature: 'Customer Support', priority: 'high', owner: 'HR', status: 'todo',
    dueDate: daysAgo(-3), linkedAlertId: 'a003', createdAt: daysAgo(1),
  },
];

// ─── Competitors ──────────────────────────────────────────────────────────────
export const MOCK_COMPETITORS: CompetitorBrand[] = [
  {
    id: 'c001', name: 'NovaTech X1 (You)', dangerScore: 88, advocateScore: 62, reviewCount: 200, avgRating: 2.8,
    featureScores: { Battery: 92, Packaging: 68, Sound: 15, Support: 74, Display: 25, Value: 55 },
  },
  {
    id: 'c002', name: 'AlphaPhone Pro', dangerScore: 45, advocateScore: 78, reviewCount: 380, avgRating: 4.1,
    featureScores: { Battery: 30, Packaging: 25, Sound: 40, Support: 38, Display: 20, Value: 42 },
  },
  {
    id: 'c003', name: 'ZenMobile S3', dangerScore: 62, advocateScore: 55, reviewCount: 150, avgRating: 3.5,
    featureScores: { Battery: 55, Packaging: 72, Sound: 28, Support: 80, Display: 15, Value: 60 },
  },
];

// ─── 7-Day Trend Data ─────────────────────────────────────────────────────────
export const MOCK_TREND: TrendPoint[] = [
  { date: daysAgo(6).slice(0, 10), dangerScore: 42, reviewCount: 18 },
  { date: daysAgo(5).slice(0, 10), dangerScore: 51, reviewCount: 24 },
  { date: daysAgo(4).slice(0, 10), dangerScore: 58, reviewCount: 31 },
  { date: daysAgo(3).slice(0, 10), dangerScore: 67, reviewCount: 38 },
  { date: daysAgo(2).slice(0, 10), dangerScore: 75, reviewCount: 52 },
  { date: daysAgo(1).slice(0, 10), dangerScore: 84, reviewCount: 67 },
  { date: daysAgo(0).slice(0, 10), dangerScore: 92, reviewCount: 40 },
];

// ─── Feature Sentiment Rollup ──────────────────────────────────────────────────
export const MOCK_FEATURE_SCORES = [
  { feature: 'Battery',         positive: 8,  negative: 92 },
  { feature: 'Packaging',       positive: 32, negative: 68 },
  { feature: 'Customer Support',positive: 26, negative: 74 },
  { feature: 'Value for Money', positive: 45, negative: 55 },
  { feature: 'Display',         positive: 75, negative: 25 },
  { feature: 'Sound Quality',   positive: 94, negative: 6  },
];
