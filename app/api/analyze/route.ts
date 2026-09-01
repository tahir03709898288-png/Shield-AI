import { NextResponse } from 'next/server';
import { GEMINI_SYSTEM_PROMPT } from '@/lib/gemini';

export async function OPTIONS() {
  return new NextResponse(null, { status: 204 });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (
      !body ||
      !['url', 'email', 'sms', 'whatsapp'].includes(body.type) ||
      typeof body.content !== 'string'
    ) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 });
    }

    // sanitize input
    const rawContent: string = String(body.content || '');
    const sanitizedContent = rawContent.replace(/\s+/g, ' ').trim().slice(0, 20000);
    const prompt = `${GEMINI_SYSTEM_PROMPT}\n\nContent Type: ${body.type}\nContent:\n${sanitizedContent}\n\nRespond with a JSON object ONLY.`;

    let outputText = '';
    let lastErrorText = '';

    try {
      const endpoints = [
        {
          url: `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateText?key=${encodeURIComponent(
            apiKey
          )}`,
          body: { prompt: { text: prompt }, temperature: 0.2, maxOutputTokens: 800 },
          isGenerateText: true,
        },
        {
          url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${encodeURIComponent(
            apiKey
          )}`,
          body: { contents: [{ parts: [{ text: prompt }] }] },
          isGenerateText: false,
        },
      ];

      for (const ep of endpoints) {
        try {
          const resp = await fetch(ep.url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(ep.body),
          });

          if (!resp.ok) {
            lastErrorText = await resp.text().catch(() => resp.statusText || '');
            continue;
          }

          const aiJson = await resp.json().catch(() => null);
          if (!aiJson) {
            lastErrorText = 'Invalid JSON response';
            continue;
          }

          if (ep.isGenerateText) {
            outputText = aiJson?.candidates?.[0]?.output || aiJson?.candidates?.[0]?.content?.[0]?.text || '';
          } else {
            outputText = aiJson?.candidates?.[0]?.content?.[0]?.parts?.[0]?.text || '';
          }

          if (!outputText) {
            outputText = aiJson?.candidates?.[0]?.output || aiJson?.response || '';
          }

          if (outputText) break;
        } catch (e) {
          lastErrorText = String(e);
          continue;
        }
      }
    } catch (e) {
      return NextResponse.json({ error: 'AI request failed', details: String(e) }, { status: 502 });
    }

    if (!outputText) {
      return NextResponse.json({ error: 'Upstream AI error', details: lastErrorText || 'No usable AI output' }, { status: 502 });
    }

    let parsed = null;
    try {
      parsed = JSON.parse(outputText);
    } catch (e) {
      const match = outputText.match(/\{[\s\S]*\}/);
      if (match) {
        try {
          parsed = JSON.parse(match[0]);
        } catch (e2) {
          parsed = null;
        }
      }
    }

    const valid =
      parsed &&
      typeof parsed.riskScore === 'number' &&
      ['Low', 'Medium', 'High'].includes(parsed.threatLevel) &&
      Array.isArray(parsed.detectedIssues) &&
      typeof parsed.explanation === 'string' &&
      Array.isArray(parsed.recommendations);

    if (!valid) {
      return NextResponse.json({ error: 'Malformed AI response', debug: parsed || outputText }, { status: 502 });
    }

    return NextResponse.json(parsed, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error', details: String(err) }, { status: 500 });
  }
}
