// VoiceMap — Shared TypeScript Types

export type Platform = 'amazon' | 'flipkart' | 'youtube' | 'twitter' | 'manual';
export type Sentiment = 'positive' | 'negative' | 'neutral';
export type Priority = 'high' | 'medium' | 'low';
export type ActionStatus = 'todo' | 'inprogress' | 'done';
export type Language = 'en' | 'hi' | 'kn' | 'ta' | 'mixed';

export interface FeatureScore {
  name: string;
  sentiment: Sentiment;
  confidence: number; // 0–1
}

export interface Review {
  id: string;
  platform: Platform;
  rating: number; // 1–5
  text: string;
  language: Language;
  sentiment: Sentiment;
  isSarcastic: boolean;
  sarcasticConfidence: number; // 0–1
  features: FeatureScore[];
  dangerScore: number; // 0–100
  revenueRisk: number; // ₹
  highlights: { word: string; sentiment: Sentiment }[]; // XAI tokens
  productCategory: string;
  brandName: string;
  author?: string;
  likes?: number;
  createdAt: string; // ISO
}

export interface Alert {
  id: string;
  feature: string;
  dangerScore: number;
  revenueRisk: number;
  message: string;
  reviewCount: number;
  trend: 'rising' | 'stable' | 'falling';
  trendPercent: number; // week-over-week %
  isRead: boolean;
  severity: 'critical' | 'medium' | 'low';
  createdAt: string;
}

export interface PlaybookAction {
  id: string;
  title: string;
  description: string;
  feature: string;
  priority: Priority;
  owner: string;
  status: ActionStatus;
  dueDate: string;
  linkedAlertId?: string;
  createdAt: string;
}

export interface CompetitorBrand {
  id: string;
  name: string;
  dangerScore: number;
  featureScores: Record<string, number>; // feature → 0-100 danger
  advocateScore: number; // 0–100
  reviewCount: number;
  avgRating: number;
}

export interface TrendPoint {
  date: string; // YYYY-MM-DD
  dangerScore: number;
  reviewCount: number;
}

export interface AppConfig {
  brandName: string;
  productCategory: string;
  language: Language;
  thresholds: {
    product: number;
    marketing: number;
    support: number;
    trend: number;
  };
  avgOrderValue: number; // ₹
  monthlyOrders: number;
  darkMode: boolean;
}
