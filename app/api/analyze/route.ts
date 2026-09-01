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
      'https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText';

    if (!apiKey) {
      return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 });
    }

    const prompt = `${GEMINI_SYSTEM_PROMPT}\n\nContent Type: ${body.type}\nContent:\n${body.content}\n\nRespond with a JSON object ONLY.`;

    const aiResp = await fetch(`${apiUrl}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: { text: prompt },
        temperature: 0.2,
        maxOutputTokens: 800,
      }),
    });

    if (!aiResp.ok) {
      const text = await aiResp.text();
      return NextResponse.json({ error: 'Upstream AI error', details: text }, { status: 502 });
    }

    const aiJson = await aiResp.json();
    let outputText = '';

    if (aiJson?.candidates && aiJson.candidates[0]?.output) outputText = aiJson.candidates[0].output;
    else if (aiJson?.candidates && aiJson.candidates[0]?.content) outputText = aiJson.candidates[0].content[0]?.text || '';
    else if (aiJson?.choices && aiJson.choices[0]?.message?.content) outputText = aiJson.choices[0].message.content;
    else if (aiJson?.response) outputText = aiJson.response;
    else outputText = JSON.stringify(aiJson);

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
