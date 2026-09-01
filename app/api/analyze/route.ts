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
      const modelsToTry = ['gemini-1.5-flash', 'gemini-1.5-pro'];
      for (const modelName of modelsToTry) {
        try {
          const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${encodeURIComponent(
            apiKey
          )}`;
          const resp = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
          });

          if (!resp.ok) {
            lastErrorText = await resp.text().catch(() => resp.statusText || '');
            // try next model
            continue;
          }

          const aiJson = await resp.json().catch(() => null);
          if (!aiJson) {
            lastErrorText = 'Invalid JSON response from model';
            continue;
          }

          // parse expected shape: candidates[0].content[0].parts[0].text
          outputText = aiJson?.candidates?.[0]?.content?.[0]?.parts?.[0]?.text || '';
          if (!outputText) {
            // try other shapes
            outputText = aiJson?.candidates?.[0]?.output || aiJson?.response || '';
          }

          if (outputText) break;
        } catch (innerErr) {
          lastErrorText = String(innerErr);
          continue;
        }
      }
    } catch (e) {
      return NextResponse.json({ error: 'AI request failed', details: String(e) }, { status: 502 });
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
