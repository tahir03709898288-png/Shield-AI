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
    const apiUrl =
      process.env.GEMINI_API_URL ||
      'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateText';

    if (!apiKey) {
      return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 });
    }

    // sanitize input: collapse whitespace, trim, and limit length
    const rawContent: string = String(body.content || '');
    const sanitizedContent = rawContent.replace(/\s+/g, ' ').trim().slice(0, 20000);

    const prompt = `${GEMINI_SYSTEM_PROMPT}\n\nContent Type: ${body.type}\nContent:\n${sanitizedContent}\n\nRespond with a JSON object ONLY.`;

    let outputText = '';
    try {
      // Try using the official Google client if available
      const gaiclient = await import('@google/generative-ai').catch(() => null);
      if (gaiclient && gaiclient.GoogleGenerativeAI) {
        const { GoogleGenerativeAI } = gaiclient as any;
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        // Use generateContent as newer SDK surface; pass prompt string
        const result = await model.generateContent(prompt);
        // Prefer the response.text() if available
        if (result?.response && typeof result.response.text === 'function') {
          try {
            outputText = await result.response.text();
          } catch (e) {
            outputText = String(result.response);
          }
        } else if (result?.output?.[0]?.content) {
          const contentItem = result.output[0].content.find((c: any) => c?.text);
          outputText = contentItem?.text || '';
        } else if (result?.candidates && result.candidates[0]) {
          outputText = result.candidates[0].output || result.candidates[0].content || '';
        } else if (result?.response) {
          outputText = String(result.response);
        } else if (typeof result === 'string') {
          outputText = result;
        } else {
          outputText = JSON.stringify(result);
        }
      } else {
        // Fallback: use direct REST call to the Generative Language API
        const restResp = await fetch(`${apiUrl}?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: { text: prompt },
            temperature: 0.2,
            maxOutputTokens: 800,
          }),
        });

        if (!restResp.ok) {
          const t = await restResp.text();
          return NextResponse.json({ error: 'Upstream AI error', details: t }, { status: 502 });
        }

        const aiJson = await restResp.json();
        if (aiJson?.candidates && aiJson.candidates[0]?.output) outputText = aiJson.candidates[0].output;
        else if (aiJson?.candidates && aiJson.candidates[0]?.content) outputText = aiJson.candidates[0].content[0]?.text || '';
        else if (aiJson?.choices && aiJson.choices[0]?.message?.content) outputText = aiJson.choices[0].message.content;
        else if (aiJson?.response) outputText = aiJson.response;
        else outputText = JSON.stringify(aiJson);
      }
    } catch (e) {
      return NextResponse.json({ error: 'AI provider error', details: String(e) }, { status: 502 });
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
