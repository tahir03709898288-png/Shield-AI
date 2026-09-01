// @ts-nocheck
import { serve } from 'std/server';
import { GEMINI_SYSTEM_PROMPT } from '../../../lib/gemini';

serve(async (req: Request) => {
  const CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }

  try {
    const body = await req.json();
    if (
      !body ||
      !['url', 'email', 'sms', 'whatsapp'].includes(body.type) ||
      typeof body.content !== 'string'
    ) {
      return new Response(JSON.stringify({ error: 'Invalid request' }), {
        status: 400,
        headers: CORS_HEADERS,
      });
    }

    const apiKey = Deno.env.get('GEMINI_API_KEY');
    const apiUrl =
      Deno.env.get('GEMINI_API_URL') ||
      'https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText';

    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'Server misconfigured' }), {
        status: 500,
        headers: CORS_HEADERS,
      });
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
      return new Response(JSON.stringify({ error: 'Upstream AI error', details: text }), {
        status: 502,
        headers: CORS_HEADERS,
      });
    }

    const aiJson = await aiResp.json();
    let outputText = '';

    // Support several possible response shapes
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
      return new Response(JSON.stringify({ error: 'Malformed AI response', debug: parsed || outputText }), {
        status: 502,
        headers: CORS_HEADERS,
      });
    }

    return new Response(JSON.stringify(parsed), {
      status: 200,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Internal server error', details: String(err) }), {
      status: 500,
      headers: CORS_HEADERS,
    });
  }
});
