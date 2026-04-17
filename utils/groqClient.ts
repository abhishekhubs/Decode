// VoiceMap — Groq AI Client with mock fallback
// Real API key can be set in app.json extra.GROQ_API_KEY
// Without a key, returns realistic mock replies for demo

const MOCK_REPLIES: Record<string, any> = {
  Battery: [
    "Dear Customer,\n\nThank you for sharing your experience with us. We sincerely apologize for the battery performance not meeting your expectations with the NovaTech X1.\n\nWe've identified this as a software optimization issue and a patch (v2.1.4) is being rolled out this week — it will significantly improve battery life. We'd love to make this right for you.\n\nPlease reach out to our support team at support@novatech.in and mention code BATT-PRIORITY for expedited assistance, including a free battery health diagnostic.\n\nWarm regards,\nNovaTech Customer Experience Team",
    "नमस्ते,\n\nआपकी प्रतिक्रिया के लिए धन्यवाद। हमें खेद है कि NovaTech X1 की बैटरी लाइफ आपकी अपेक्षाओं पर खरी नहीं उतरी।\n\nहम इस समस्या पर गंभीरता से काम कर रहे हैं और अगले अपडेट में बैटरी परफॉरमेंस में काफी सुधार होगा। कृपया हमसे support@novatech.in पर संपर्क करें।\n\nधन्यवाद,\nNovaTech टीम",
  ],
  Packaging: [
    "Dear Customer,\n\nWe're truly sorry your order arrived in damaged condition — this is not the standard we hold ourselves to. We take packaging quality very seriously.\n\nWe're investigating this shipment and upgrading our packaging material starting next month. Please contact us at support@novatech.in with your order ID for an immediate replacement or full refund.\n\nYour satisfaction is our priority.\n\nBest,\nNovaTech Team",
  ],
  default: {
    Professional: "Dear Customer,\n\nThank you for sharing your feedback. We genuinely value your review. We're sorry to hear about your experience and are committed to making it right. Please reach out to our support team at support@novatech.in so we can resolve this for you.\n\nWarm regards,\nNovaTech Customer Experience Team",
    Apologetic: "Dear Customer,\n\nWe are so incredibly sorry that this happened. This completely falls short of our standards, and we sincerely apologize for the frustration caused. We want to do whatever it takes to fix this for you. Please email us directly at support@novatech.in so we can make this right immediately.\n\nDeeply sorry,\nNovaTech Support",
    Empathetic: "Hi there,\n\nWe hear you completely, and we understand why you'd be disappointed. That sounds like a really frustrating experience, and we would feel the same way in your shoes. Let's work together to get this sorted out. Could you please drop us a message at support@novatech.in? We're here to help.\n\nBest,\nNovaTech Team",
    Humorous: "Hey there,\n\nWell, that didn't go as planned! 🤦‍♂️ Our bad! Clearly, our product decided to take a coffee break when you needed it most. We're on it though! Shoot us an email at support@novatech.in so we can send you a replacement and grovel appropriately. 😉\n\nCheers,\nNovaTech Team"
  }
};

export type ReplyTone = 'Professional' | 'Apologetic' | 'Empathetic' | 'Humorous';

export async function generateAutoReply(
  reviewText: string,
  feature: string,
  language: string = 'en',
  tone: ReplyTone = 'Professional',
  apiKey?: string
): Promise<string> {
  // If real API key provided, use actual Groq API
  if (apiKey && apiKey.startsWith('gsk_')) {
    try {
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama3-8b-8192',
          messages: [
            {
              role: 'system',
              content: `You are a brand manager for NovaTech. Write a short, empathetic reply to the following review about ${feature} in ${language === 'hi' ? 'Hindi' : 'English'}. Your tone must be strictly ${tone}. Keep it under 150 words.`,
            },
            { role: 'user', content: reviewText },
          ],
          max_tokens: 200,
        }),
      });
      const data = await res.json();
      return data.choices?.[0]?.message?.content ?? getMockReply(feature, language, tone);
    } catch {
      return getMockReply(feature, language, tone);
    }
  }

  // Mock fallback (simulates slight delay for realism)
  await new Promise((r) => setTimeout(r, 1200));
  return getMockReply(feature, language, tone);
}

function getMockReply(feature: string, language: string, tone: ReplyTone): string {
  // If we have a tone mapping in default, use that if we are requesting a non-standard tone
  if (feature !== 'Battery' && feature !== 'Packaging') {
    return MOCK_REPLIES.default[tone as any] as string;
  }
  
  const replies = MOCK_REPLIES[feature] ?? [MOCK_REPLIES.default['Professional']];
  // Pick Hindi version if language is hi and available
  if (language === 'hi' && replies.length > 1) {
    return replies[1] as string;
  }
  
  // Return the customized tone if not battery/packaging specific
  if (tone !== 'Professional') {
     return MOCK_REPLIES.default[tone as any] as string;
  }
  return replies[0] as string;
}

// ─── Batch Review Analyser ────────────────────────────────────────────────────

export interface GroqReviewAnalysis {
  sentiment: 'positive' | 'negative' | 'neutral';
  isSarcastic: boolean;
  sarcasticConfidence: number;
  dangerScore: number;          // 0-100
  revenueRisk: number;          // ₹ estimate
  features: { name: string; sentiment: 'positive' | 'negative' | 'neutral'; confidence: number }[];
  highlights: { word: string; sentiment: 'positive' | 'negative' | 'neutral' }[];
  language: 'en' | 'hi' | 'kn' | 'ta' | 'mixed';
  productCategory: string;
  brandName: string;
}

const GROQ_API_KEY =
  process.env.EXPO_PUBLIC_GROQ_API_KEY ?? '';
const GROQ_MODEL = 'llama-3.1-8b-instant';
const BATCH_SIZE = 8; // reviews per API call

/**
 * Analyse an array of raw review strings using Groq LLM.
 * Returns one GroqReviewAnalysis per input text.
 * Falls back to local keyword heuristics on API failure.
 */
export async function analyzeReviewsWithGroq(
  texts: string[],
): Promise<GroqReviewAnalysis[]> {
  const results: GroqReviewAnalysis[] = [];

  // Process in batches to stay within token limits
  for (let i = 0; i < texts.length; i += BATCH_SIZE) {
    const batch = texts.slice(i, i + BATCH_SIZE);
    try {
      const batchResults = await analyseBatch(batch);
      results.push(...batchResults);
    } catch {
      // Fallback: use local heuristics for this batch
      batch.forEach(t => results.push(localFallback(t)));
    }
  }
  return results;
}

async function analyseBatch(texts: string[]): Promise<GroqReviewAnalysis[]> {
  if (!GROQ_API_KEY.startsWith('gsk_')) {
    // No real key — use local fallback
    return texts.map(localFallback);
  }

  const numbered = texts.map((t, idx) => `${idx + 1}. ${t}`).join('\n\n');

  const systemPrompt = `You are an expert product review analyst for an e-commerce intelligence platform.
Analyse each review below and return a JSON array (one object per review, in the same order).
Each object MUST have exactly these fields:
{
  "sentiment": "positive"|"negative"|"neutral",
  "isSarcastic": boolean,
  "sarcasticConfidence": number (0-1),
  "dangerScore": number (0-100, how damaging is this review for the brand),
  "revenueRisk": number (estimated ₹ revenue at risk, 0 if positive),
  "features": [{"name": string, "sentiment": "positive"|"negative"|"neutral", "confidence": number}],
  "highlights": [{"word": string, "sentiment": "positive"|"negative"|"neutral"}],
  "language": "en"|"hi"|"kn"|"ta"|"mixed",
  "productCategory": string (best guess, e.g. "Smartphone","Earphones","Packaged Food"),
  "brandName": string (extract from text or use "Unknown Brand")
}
Return ONLY the raw JSON array. No markdown, no explanation.`;

  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${GROQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: numbered },
      ],
      max_tokens: 2048,
      temperature: 0.2,
    }),
  });

  const data = await res.json();
  if (data.error) throw new Error(data.error.message);

  const raw: string = data.choices?.[0]?.message?.content ?? '[]';

  // Strip any accidental markdown fences
  const cleaned = raw.replace(/```json|```/gi, '').trim();
  const parsed: GroqReviewAnalysis[] = JSON.parse(cleaned);

  // Guard: must return same count
  if (!Array.isArray(parsed) || parsed.length !== texts.length) {
    throw new Error('Groq returned unexpected response length');
  }
  return parsed;
}

/** Pure keyword-based fallback (no API needed) */
function localFallback(text: string): GroqReviewAnalysis {
  const lower = text.toLowerCase();
  const negWords = ['bad','terrible','worst','horrible','disappointed','awful','drain',
    'broken','poor','useless','hate','refund','return','fail','not good','waste','pathetic'];
  const posWords = ['great','excellent','amazing','fantastic','love','perfect','best',
    'superb','awesome','brilliant','happy','satisfied','recommend','worth'];
  const negHits = negWords.filter(w => lower.includes(w)).length;
  const posHits = posWords.filter(w => lower.includes(w)).length;
  const sentiment = negHits > posHits ? 'negative' : posHits > negHits ? 'positive' : 'neutral';
  const isSarcastic = (lower.includes('!') && (lower.includes('great') || lower.includes('wow')));
  const dangerScore = sentiment === 'negative'
    ? (isSarcastic ? 78 : 55) + Math.floor(Math.random() * 20)
    : sentiment === 'neutral' ? 25 + Math.floor(Math.random() * 15) : 5 + Math.floor(Math.random() * 15);
  return {
    sentiment,
    isSarcastic,
    sarcasticConfidence: isSarcastic ? 0.75 : 0.08,
    dangerScore,
    revenueRisk: sentiment === 'negative' ? dangerScore * 2500 : 0,
    features: [{ name: 'General', sentiment, confidence: 0.72 }],
    highlights: [],
    language: 'en',
    productCategory: 'Imported',
    brandName: 'Unknown Brand',
  };
}
