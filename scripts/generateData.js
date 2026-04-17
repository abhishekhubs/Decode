// Run: node scripts/generateData.js
const fs = require('fs');
const path = require('path');

const CSV_PATH = path.join(__dirname, '../app/dataset/data.csv');
const OUT_ROWS = path.join(__dirname, '../data/csvRows.ts');
const OUT_MOCK = path.join(__dirname, '../data/mockData.ts');

// ── Parse CSV ────────────────────────────────────────────────────────────────
const lines = fs.readFileSync(CSV_PATH, 'utf8').split('\n').filter(Boolean);
lines.shift(); // remove header

const rows = lines.map(line => {
  // Handle commas inside quoted fields
  const cols = [];
  let cur = '', inQ = false;
  for (const ch of line.replace(/\r$/, '')) {
    if (ch === '"') { inQ = !inQ; continue; }
    if (ch === ',' && !inQ) { cols.push(cur.trim()); cur = ''; continue; }
    cur += ch;
  }
  cols.push(cur.trim());
  const [pid, name, cat, text, rating, ts, rid, lang] = cols;
  return { pid, name, cat, text: text.replace(/'/g, "\\'"), rating: parseInt(rating), ts, rid, lang };
});

// ── Write csvRows.ts ─────────────────────────────────────────────────────────
const tuples = rows.map(r =>
  `  ['${r.pid}','${r.name}','${r.cat}','${r.text}',${r.rating},'${r.ts}','${r.rid}','${r.lang}'],`
).join('\n');

fs.writeFileSync(OUT_ROWS, `// Auto-generated from app/dataset/data.csv — DO NOT EDIT MANUALLY
export type CsvRow = [string,string,string,string,number,string,string,string];
export const CSV_ROWS: CsvRow[] = [\n${tuples}\n];\n`);

console.log(`✅ csvRows.ts written — ${rows.length} rows`);

// ── Helpers for mockData ─────────────────────────────────────────────────────
function mapLang(l) {
  if (l.includes('hindi')) return 'hi';
  if (l.includes('kannada')) return 'kn';
  if (l.includes('multilingual')) return 'mixed';
  return 'en';
}
function mapPlatform(rid) {
  const n = parseInt(rid.replace('R',''), 10);
  return ['amazon','flipkart','youtube','twitter','amazon'][n % 5];
}
function sentiment(r) { return r <= 2 ? 'negative' : r === 3 ? 'neutral' : 'positive'; }
function danger(r, sarc) { const b = r===1?85:r===2?65:r===3?30:r===4?12:5; return Math.min(100,b+(sarc?8:0)); }
function risk(d, cat) { const m = cat==='Electronics'?4500:cat==='Fashion'?2000:2800; return d>50?d*m:0; }
function features(cat, text, sent) {
  const l = text.toLowerCase(), f = [];
  if (l.includes('heat')||l.includes('hot')||l.includes('overheat')) f.push({name:'Heating',sentiment:'negative',confidence:0.93});
  if (l.includes('battery')||l.includes('drain')||l.includes('charge')) f.push({name:'Battery',sentiment:l.includes('good')||l.includes('long')?'positive':'negative',confidence:0.90});
  if (l.includes('camera')||l.includes('photo')||l.includes('picture')) f.push({name:'Camera',sentiment:sent,confidence:0.87});
  if (l.includes('sound')||l.includes('bass')||l.includes('audio')) f.push({name:'Sound',sentiment:sent,confidence:0.88});
  if (l.includes('comfort')||l.includes('fit ')||l.includes('fabric')) f.push({name:'Comfort',sentiment:sent,confidence:0.85});
  if (l.includes('quality')||l.includes('fake')||l.includes('original')) f.push({name:'Build Quality',sentiment:sent,confidence:0.82});
  if (l.includes('deliver')||l.includes('packaging')||l.includes('box')) f.push({name:'Delivery',sentiment:sent,confidence:0.79});
  if (l.includes('price')||l.includes('worth')||l.includes('expensive')) f.push({name:'Value',sentiment:sent,confidence:0.80});
  if (!f.length) f.push({name:cat==='Electronics'?'Performance':cat==='Fashion'?'Build Quality':'Functionality',sentiment:sent,confidence:0.75});
  return f;
}

// ── Build MOCK_REVIEWS ───────────────────────────────────────────────────────
const reviews = rows.map(r => {
  const sent = sentiment(r.rating);
  const sarc = r.lang === 'sarcastic';
  const d = danger(r.rating, sarc);
  const feats = features(r.cat, r.text, sent);
  return {
    id: r.rid.toLowerCase(),
    platform: mapPlatform(r.rid),
    rating: r.rating,
    text: r.text,
    language: mapLang(r.lang),
    sentiment: sent,
    isSarcastic: sarc,
    sarcasticConfidence: sarc ? 0.88 : 0.07,
    features: feats,
    dangerScore: d,
    revenueRisk: risk(d, r.cat),
    highlights: feats.map(f => ({word: f.name.toLowerCase(), sentiment: f.sentiment})),
    productCategory: r.cat.replace('_',' '),
    brandName: r.name,
    author: r.rid,
    likes: Math.floor(d * 2.5),
    createdAt: new Date(r.ts).toISOString(),
  };
});

const reviewsJson = JSON.stringify(reviews, null, 2);

// ── Write mockData.ts ────────────────────────────────────────────────────────
const mockDataContent = `// Auto-generated from app/dataset/data.csv — DO NOT EDIT MANUALLY
import { Review, Alert, PlaybookAction, CompetitorBrand, TrendPoint } from '@/types';

function daysAgo(n: number): string {
  const d = new Date(); d.setDate(d.getDate() - n); return d.toISOString();
}

export const MOCK_REVIEWS: Review[] = ${reviewsJson} as Review[];

export const MOCK_ALERTS: Alert[] = [
  {
    id: 'a001', feature: 'Heating', dangerScore: 91, revenueRisk: 4095000,
    message: '🔥 Samsung Galaxy S23 overheating complaints surged +45%. 16 out of 20 reviews mention heating as primary issue.',
    reviewCount: 16, trend: 'rising', trendPercent: 45, isRead: false, severity: 'critical', createdAt: daysAgo(0),
  },
  {
    id: 'a002', feature: 'Build Quality', dangerScore: 72, revenueRisk: 1440000,
    message: '⚠️ Fake product complaints across Fashion (Nike, Adidas, Puma, Levi\\'s). 8 reviews report quality failure within days.',
    reviewCount: 8, trend: 'rising', trendPercent: 28, isRead: false, severity: 'critical', createdAt: daysAgo(1),
  },
  {
    id: 'a003', feature: 'Battery', dangerScore: 65, revenueRisk: 897750,
    message: '🔋 Battery drain complaints for Boat Airdopes 141 and Sony PS5 controller. Users cite 2-3 hour battery life.',
    reviewCount: 4, trend: 'rising', trendPercent: 18, isRead: false, severity: 'medium', createdAt: daysAgo(1),
  },
  {
    id: 'a004', feature: 'Sound Quality', dangerScore: 10, revenueRisk: 0,
    message: '✅ Sound quality 90%+ positive across Boat Airdopes, OnePlus Bullets, Apple AirPods Pro.',
    reviewCount: 12, trend: 'stable', trendPercent: 2, isRead: true, severity: 'low', createdAt: daysAgo(2),
  },
  {
    id: 'a005', feature: 'Value', dangerScore: 55, revenueRisk: 247500,
    message: '💰 Price-to-value complaints rising for Apple AirPods Pro and Sony PS5. Customers comparing with cheaper alternatives.',
    reviewCount: 5, trend: 'rising', trendPercent: 12, isRead: true, severity: 'medium', createdAt: daysAgo(3),
  },
];

export const MOCK_PLAYBOOK: PlaybookAction[] = [
  { id:'p001', title:'Escalate Samsung Galaxy S23 heating to Samsung India', description:'Share 16-review heating report. Request OTA fix or replacement program.', feature:'Heating', priority:'high', owner:'Product Manager', status:'inprogress', dueDate:daysAgo(-2), linkedAlertId:'a001', createdAt:daysAgo(1) },
  { id:'p002', title:'Flag fake Fashion products to platform compliance', description:'Report Nike, Adidas, Puma fake reviews to Amazon/Flipkart seller compliance.', feature:'Build Quality', priority:'high', owner:'Operations Lead', status:'todo', dueDate:daysAgo(-3), linkedAlertId:'a002', createdAt:daysAgo(1) },
  { id:'p003', title:'Reply to top Samsung heating complaints with AI', description:'Use AI auto-reply to respond to top 10 heating reviews empathetically.', feature:'Heating', priority:'medium', owner:'Brand Manager', status:'todo', dueDate:daysAgo(-1), linkedAlertId:'a001', createdAt:daysAgo(0) },
  { id:'p004', title:'Publish battery care guide for Boat Airdopes users', description:'FAQ post on battery optimization and share with affected reviewers.', feature:'Battery', priority:'medium', owner:'CX Team', status:'done', dueDate:daysAgo(0), linkedAlertId:'a003', createdAt:daysAgo(2) },
  { id:'p005', title:'Offer extended warranty to sarcastic-review customers', description:'Identify sarcastic reviewers (7 flagged) and proactively offer 6-month extension.', feature:'Value', priority:'low', owner:'CX Team', status:'todo', dueDate:daysAgo(-5), linkedAlertId:'a005', createdAt:daysAgo(2) },
];

export const MOCK_COMPETITORS: CompetitorBrand[] = [
  { id:'c001', name:'Samsung Galaxy S23 (You)', dangerScore:88, advocateScore:55, reviewCount:20, avgRating:2.1, featureScores:{Heating:91,'Build Quality':72,Battery:65,Camera:20,Value:55,Sound:15} },
  { id:'c002', name:'Apple AirPods Pro', dangerScore:42, advocateScore:80, reviewCount:5, avgRating:3.8, featureScores:{Heating:5,'Build Quality':30,Battery:20,Sound:10,Value:65,Comfort:15} },
  { id:'c003', name:'Boat Airdopes 141', dangerScore:58, advocateScore:68, reviewCount:9, avgRating:3.4, featureScores:{Heating:10,Battery:65,Sound:20,Value:30,Comfort:25,'Build Quality':40} },
  { id:'c004', name:'Nike Air Max', dangerScore:50, advocateScore:70, reviewCount:10, avgRating:3.5, featureScores:{'Build Quality':72,Comfort:20,Value:50,Delivery:35,Heating:0,Battery:0} },
];

export const MOCK_TREND: TrendPoint[] = [
  { date: daysAgo(6).slice(0,10), dangerScore:38, reviewCount:8 },
  { date: daysAgo(5).slice(0,10), dangerScore:48, reviewCount:11 },
  { date: daysAgo(4).slice(0,10), dangerScore:60, reviewCount:14 },
  { date: daysAgo(3).slice(0,10), dangerScore:68, reviewCount:16 },
  { date: daysAgo(2).slice(0,10), dangerScore:75, reviewCount:18 },
  { date: daysAgo(1).slice(0,10), dangerScore:83, reviewCount:20 },
  { date: daysAgo(0).slice(0,10), dangerScore:91, reviewCount:16 },
];

export const MOCK_FEATURE_SCORES = [
  { feature:'Heating',       positive:9,  negative:91 },
  { feature:'Build Quality', positive:28, negative:72 },
  { feature:'Battery',       positive:35, negative:65 },
  { feature:'Value',         positive:45, negative:55 },
  { feature:'Comfort',       positive:78, negative:22 },
  { feature:'Sound Quality', positive:90, negative:10 },
];
`;

fs.writeFileSync(OUT_MOCK, mockDataContent);
console.log(`✅ mockData.ts written with ${reviews.length} reviews`);
