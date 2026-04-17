// VoiceMap — Twilio WhatsApp Client + Groq Alert Message Generator
// Sends WhatsApp alerts via Twilio REST API (no SDK, pure fetch)

// ── Twilio credentials (new account — confirmed working) ──────────────────────
const TWILIO_ACCOUNT_SID = process.env.EXPO_PUBLIC_TWILIO_ACCOUNT_SID ?? '';
const TWILIO_AUTH_TOKEN  = process.env.EXPO_PUBLIC_TWILIO_AUTH_TOKEN ?? '';
const TWILIO_FROM     = 'whatsapp:+14155238886'; // Twilio WhatsApp sandbox
const TWILIO_SMS_FROM = '+12182504306';           // Confirmed working SMS number
const TWILIO_TO       = 'whatsapp:+917892208908'; // brand manager WhatsApp
const TWILIO_SMS_TO   = '+917892208908';           // brand manager SMS number

const GROQ_API_KEY = process.env.EXPO_PUBLIC_GROQ_API_KEY ?? '';
const GROQ_MODEL = 'llama-3.1-8b-instant';

// ─── Category-aware Groq message generator ────────────────────────────────────

export async function generateAlertWhatsAppMessage(alert: {
  feature: string;
  severity: string;
  dangerScore: number;
  revenueRisk: number;
  message: string;
  trendPercent: number;
  reviewCount: number;
}): Promise<string> {
  const systemPrompt = `You are a business intelligence alert system for VoiceMap, a review analytics SaaS.
Generate a concise, professional WhatsApp alert message for a brand manager.
The message MUST:
- Start with an appropriate emoji for the severity/category
- Include the feature name, severity, danger score, revenue at risk
- Give 1 short actionable recommendation based on the feature category
- Be under 200 characters total (WhatsApp best practice)
- NOT use markdown formatting (no **, no #)
Output only the message text, nothing else.`;

  const userContent = `Alert Details:
Feature: ${alert.feature}
Severity: ${alert.severity.toUpperCase()}
Danger Score: ${alert.dangerScore}/100
Revenue at Risk: ₹${alert.revenueRisk.toLocaleString('en-IN')}
Week-over-Week Trend: +${alert.trendPercent}%
Reviews Analyzed: ${alert.reviewCount}
Alert Description: ${alert.message}`;

  if (GROQ_API_KEY.startsWith('gsk_')) {
    try {
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
            { role: 'user', content: userContent },
          ],
          max_tokens: 120,
          temperature: 0.4,
        }),
      });
      const data = await res.json();
      const generated = data?.choices?.[0]?.message?.content?.trim();
      if (generated) return generated;
    } catch {
      // Fall through to static fallback
    }
  }

  // Static fallback — category-specific templates
  return buildFallbackMessage(alert);
}

function buildFallbackMessage(alert: {
  feature: string;
  severity: string;
  dangerScore: number;
  revenueRisk: number;
  trendPercent: number;
}): string {
  const categoryEmojis: Record<string, string> = {
    Battery: '🔋',
    Packaging: '📦',
    Display: '📱',
    Camera: '📷',
    Performance: '⚡',
    Sound: '🔊',
    Build: '🔩',
    Delivery: '🚚',
    Support: '🎧',
    Price: '💰',
  };

  const categoryActions: Record<string, string> = {
    Battery: 'Push firmware update urgently.',
    Packaging: 'Review packaging with logistics team.',
    Display: 'Escalate to QA team for screen defects.',
    Camera: 'Release camera patch via OTA update.',
    Performance: 'Optimize app & thermal management.',
    Sound: 'Check speaker assembly QC process.',
    Build: 'Inspect manufacturing batch quality.',
    Delivery: 'Coordinate with fulfillment partner.',
    Support: 'Increase support team capacity.',
    Price: 'Review pricing strategy immediately.',
  };

  const emoji = categoryEmojis[alert.feature] ?? '⚠️';
  const action = categoryActions[alert.feature] ?? 'Review and take immediate action.';
  const risk = `₹${(alert.revenueRisk / 1000).toFixed(0)}K`;

  return `${emoji} VOICEMAP ALERT [${alert.severity.toUpperCase()}]\n${alert.feature} issue | Score: ${alert.dangerScore}/100 | Risk: ${risk} | +${alert.trendPercent}% trend\n${action}`;
}

// ─── Twilio WhatsApp Sender ────────────────────────────────────────────────────

export interface WhatsAppSendResult {
  success: boolean;
  sid?: string;
  error?: string;
}

export async function sendWhatsAppAlert(messageBody: string): Promise<WhatsAppSendResult> {
  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN) {
    return { success: false, error: 'Twilio credentials not configured.' };
  }

  const url = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`;

  // Encode body as application/x-www-form-urlencoded (Twilio requirement)
  const params = new URLSearchParams();
  params.append('To', TWILIO_TO);
  params.append('From', TWILIO_FROM);
  params.append('Body', messageBody);

  const credentials = btoa(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`);

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    const data = await res.json();

    if (res.status === 201 && data.sid) {
      return { success: true, sid: data.sid };
    }

    return {
      success: false,
      error: data?.message ?? `HTTP ${res.status}: ${data?.code ?? 'Unknown error'}`,
    };
  } catch (err: any) {
    return { success: false, error: err?.message ?? 'Network error. Check your connection.' };
  }
}

// ─── Twilio SMS Sender ────────────────────────────────────────────────────────

export async function sendSmsAlert(messageBody: string): Promise<WhatsAppSendResult> {
  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN) {
    return { success: false, error: 'Twilio credentials not configured.' };
  }

  const url = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`;

  const params = new URLSearchParams();
  params.append('To', TWILIO_SMS_TO);
  params.append('From', TWILIO_SMS_FROM);
  params.append('Body', messageBody);

  const credentials = btoa(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`);

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    const data = await res.json();

    // Log full response for debugging
    console.log('[SMS] Status:', res.status, '| Response:', JSON.stringify(data));

    if (res.status === 201 && data.sid) {
      return { success: true, sid: data.sid };
    }

    // Build a detailed error string from Twilio response
    const twilioCode = data?.code ? `Code ${data.code}: ` : '';
    const twilioMsg = data?.message ?? `HTTP ${res.status}`;
    const moreInfo = data?.more_info ? `\nDetails: ${data.more_info}` : '';
    return {
      success: false,
      error: `${twilioCode}${twilioMsg}${moreInfo}`,
    };
  } catch (err: any) {
    return { success: false, error: err?.message ?? 'Network error. Check your connection.' };
  }
}

