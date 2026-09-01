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
      // Call ModelService.ListModels to find a supported model instead of hardcoding
      const listUrl = `https://generativelanguage.googleapis.com/v1/models?key=${encodeURIComponent(apiKey)}`;
      const listResp = await fetch(listUrl, { method: 'GET' });
      if (!listResp.ok) {
        lastErrorText = await listResp.text().catch(() => listResp.statusText || '');
        return NextResponse.json({ error: 'Failed to list models', details: lastErrorText }, { status: 502 });
      }

      const listJson = await listResp.json().catch(() => null);
      const models: any[] = listJson?.models || [];

      // Select a model that supports generateContent, prefer gemini models
      let chosen: { name: string; method: 'generateContent' | 'generateText' } | null = null;

      for (const m of models) {
        const name: string = m?.name || '';
        const methods: string[] = m?.supportedGenerationMethods || m?.supportedMethods || [];
        if (name.toLowerCase().includes('gemini') && methods.includes('generateContent')) {
          chosen = { name, method: 'generateContent' };
          break;
        }
      }

      if (!chosen) {
        for (const m of models) {
          const name: string = m?.name || '';
          const methods: string[] = m?.supportedGenerationMethods || m?.supportedMethods || [];
          if (name.toLowerCase().includes('gemini') && methods.includes('generateText')) {
            chosen = { name, method: 'generateText' };
            break;
          }
        }
      }

      if (!chosen) {
        for (const m of models) {
          const name: string = m?.name || '';
          const methods: string[] = m?.supportedGenerationMethods || m?.supportedMethods || [];
          if (methods.includes('generateContent')) {
            chosen = { name, method: 'generateContent' };
            break;
          }
        }
      }

      if (!chosen) {
        for (const m of models) {
          const name: string = m?.name || '';
          const methods: string[] = m?.supportedGenerationMethods || m?.supportedMethods || [];
          if (methods.includes('generateText')) {
            chosen = { name, method: 'generateText' };
            break;
          }
        }
      }

      if (!chosen) {
        return NextResponse.json({ error: 'No suitable model found' }, { status: 502 });
      }

      const method = chosen.method;
      const modelPath = chosen.name; // e.g., 'models/gemini-1.5-flash'
      const url = `https://generativelanguage.googleapis.com/v1/${modelPath}:${method}?key=${encodeURIComponent(apiKey)}`;

      const bodyPayload =
        method === 'generateContent'
          ? { contents: [{ parts: [{ text: prompt }] }] }
          : { prompt: { text: prompt }, temperature: 0.2, maxOutputTokens: 800 };

      const resp = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyPayload),
      });

      if (!resp.ok) {
        lastErrorText = await resp.text().catch(() => resp.statusText || '');
        return NextResponse.json({ error: 'Upstream AI error', details: lastErrorText }, { status: 502 });
      }

      const aiJson = await resp.json().catch(() => null);
      if (!aiJson) {
        return NextResponse.json({ error: 'Invalid AI response' }, { status: 502 });
      }

      if (method === 'generateContent') {
        outputText = aiJson?.candidates?.[0]?.content?.[0]?.parts?.[0]?.text || '';
      } else {
        outputText = aiJson?.candidates?.[0]?.output || aiJson?.candidates?.[0]?.content?.[0]?.text || '';
      }

      if (!outputText) {
        outputText = aiJson?.response || JSON.stringify(aiJson);
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
