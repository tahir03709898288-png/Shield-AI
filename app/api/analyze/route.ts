import { NextResponse } from 'next/server';
import { GEMINI_SYSTEM_PROMPT } from '@/lib/gemini';

export async function OPTIONS() {
  return new NextResponse(null, { status: 204 });
}
export async function POST(req: Request) {
  try {
    // Helper: remove code fences and inline backticks, and extract first JSON object
    function cleanAIAssistantOutput(text: string | undefined): string {
      if (!text) return '';
      let t = String(text);
      // unwrap triple-backtick blocks with optional language (```json ... ```)
      t = t.replace(/```(?:\w*\n)?([\s\S]*?)```/g, '$1');
      // unwrap inline backticks
      t = t.replace(/`([^`]*)`/g, '$1');
      t = t.trim();
      // try to extract the first {...} JSON object from the text
      const first = t.indexOf('{');
      const last = t.lastIndexOf('}');
      if (first !== -1 && last !== -1 && last >= first) {
        return t.slice(first, last + 1);
      }
      return t;
    }

    // Helper: best-effort fallback extraction of required fields
    function fallbackExtract(text: string | undefined) {
      const t = String(text || '');
      const out: any = {
        riskScore: 0,
        threatLevel: 'Low',
        detectedIssues: [] as string[],
        explanation: '',
        recommendations: [] as string[],
      };

      // riskScore: look for a number 0-100
      const riskMatch = t.match(/(risk score|riskScore|risk):?\s*(\d{1,3})/i);
      if (riskMatch) out.riskScore = Math.min(100, Math.max(0, Number(riskMatch[2])));
      else {
        const percent = t.match(/(\d{1,3})\s*%/);
        if (percent) out.riskScore = Math.min(100, Math.max(0, Number(percent[1])));
      }

      // threatLevel: Low|Medium|High
      const level = t.match(/\b(Low|Medium|High)\b/i);
      if (level) out.threatLevel = level[1][0].toUpperCase() + level[1].slice(1).toLowerCase();

      // detectedIssues: bullets or numbered lists
      const bullets = Array.from(t.matchAll(/^\s*[-*]\s*(.+)$/gim)).map(m => m[1].trim());
      if (bullets.length) out.detectedIssues = bullets;
      else {
        // try to find a section starting with Detected Issues: or Issues:
        const issuesSection = t.match(/(?:Detected Issues|Issues)[:\-]?\s*([\s\S]*?)(?:\n\s*\n|$)/i);
        if (issuesSection) {
          const lines = issuesSection[1].split(/\n/).map(l => l.replace(/^\s*[-\d\.\)\s]*/, '').trim()).filter(Boolean);
          out.detectedIssues = lines.slice(0, 20);
        }
      }

      // explanation: look for Explanation: heading
      const expl = t.match(/Explanation:?\s*([\s\S]*?)(?:\n\s*\n|(?:Recommendations|Recommended|Recommendations:)[:\-]?|$)/i);
      if (expl) out.explanation = expl[1].trim();

      // recommendations: bullets under Recommendations:
      const recSection = t.match(/Recommendations?:?\s*([\s\S]*?)(?:\n\s*\n|$)/i);
      if (recSection) {
        const recBullets = Array.from(recSection[1].matchAll(/^\s*[-*]\s*(.+)$/gim)).map(m => m[1].trim());
        if (recBullets.length) out.recommendations = recBullets;
        else {
          out.recommendations = recSection[1].split(/\n/).map(l => l.trim()).filter(Boolean).slice(0, 10);
        }
      }

      // ensure types
      out.riskScore = Number(out.riskScore) || 0;
      out.detectedIssues = Array.isArray(out.detectedIssues) ? out.detectedIssues : [];
      out.recommendations = Array.isArray(out.recommendations) ? out.recommendations : [];

      return out;
    }

    function computeThreatLevelFromScore(score: number) {
      if (isNaN(score)) return 'Low';
      if (score < 30) return 'Low';
      if (score < 70) return 'Medium';
      return 'High';
    }

    const body = await req.json();
    if (
      !body ||
      !['url', 'email', 'sms', 'whatsapp'].includes(body.type) ||
      typeof body.content !== 'string'
    ) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    const groqKeyEnv = process.env.GROQ_API_KEY;
    const gemKeyEnv = process.env.GEMINI_API_KEY;
    if (!groqKeyEnv && !gemKeyEnv) {
      return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 });
    }

    // sanitize input
    const rawContent: string = String(body.content || '');
    const sanitizedContent = rawContent.replace(/\s+/g, ' ').trim().slice(0, 20000);
    const prompt = `${GEMINI_SYSTEM_PROMPT}

Content Type: ${body.type}
Content:
${sanitizedContent}

IMPORTANT: Respond with ONLY a single, syntactically valid JSON object and nothing else. The JSON MUST have exactly these fields with these types:
{
  "riskScore": number, // 0-100
  "threatLevel": "Low" | "Medium" | "High",
  "detectedIssues": string[],
  "explanation": string,
  "recommendations": string[]
}

Do NOT wrap the JSON in markdown/code fences, do NOT include explanatory text, and do NOT return multiple JSON objects. If you must include any additional notes, place them in a top-level field named "notes" (but prefer not to). Example JSON:
{
  "riskScore": 42,
  "threatLevel": "Medium",
  "detectedIssues": ["suspicious link"],
  "explanation": "Why...",
  "recommendations": ["remove link", "verify sender"]
}
`; 

    let outputText = '';
    let lastErrorText = '';

    try {
      const groqKey = process.env.GROQ_API_KEY;
      const fallbackKey = process.env.GEMINI_API_KEY;
      const useGroq = Boolean(groqKey);

      if (useGroq) {
        // Use Groq API with Bearer auth. Do NOT hardcode API keys in source.
        const groqApiKey = groqKey as string;
        const url = 'https://api.groq.ai/v1/models/llama-3.1-8b-instant/generate';
        try {
          const resp = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${groqApiKey}`,
            },
            body: JSON.stringify({
              // Request a JSON object response when supported
              input: prompt,
              max_output_tokens: 1200,
              response_format: { type: 'json_object' },
            }),
          });

          if (!resp.ok) {
            lastErrorText = await resp.text().catch(() => resp.statusText || '');
          } else {
            const aiJson = await resp.json().catch(() => null);
            if (aiJson) {
              // Try multiple plausible response shapes for Groq
              outputText = aiJson?.output?.[0]?.content?.[0]?.text || aiJson?.output_text || aiJson?.result || '';
              // Some Groq responses nest under `choices` or `generations`
              if (!outputText) {
                outputText = aiJson?.choices?.[0]?.message?.content?.[0]?.text || aiJson?.generations?.[0]?.text || '';
              }
            } else {
              lastErrorText = 'Invalid JSON response from Groq';
            }
          }
        } catch (innerErr) {
          lastErrorText = String(innerErr);
        }
      }

      // If Groq was not used or returned nothing, fallback to Gemini (if configured)
      if (!outputText) {
        const modelsToTry = ['gemini-1.5-flash', 'gemini-1.5-pro'];
        const gemKey = fallbackKey as string | undefined;
        if (!gemKey) {
          // no Gemini key configured; if Groq failed, return the error collected
          return NextResponse.json({ error: 'AI request failed', details: lastErrorText || 'No AI provider configured' }, { status: 502 });
        }

        for (const modelName of modelsToTry) {
          try {
            const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${encodeURIComponent(
              gemKey
            )}`;
            const resp = await fetch(url, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                // request structured JSON output when possible
                response_format: { type: 'json_object' },
              }),
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
      }
    } catch (e) {
      return NextResponse.json({ error: 'AI request failed', details: String(e) }, { status: 502 });
    }

    let parsed: any = null;
    // Clean common markdown/code-fence wrappers before parsing
    const cleaned = cleanAIAssistantOutput(outputText);

    // Always attempt to extract the JSON substring between first '{' and last '}'
    const rawToInspect = String(cleaned || outputText || '');
    const jsonMatch = rawToInspect.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        parsed = JSON.parse(jsonMatch[0]);
      } catch (e) {
        parsed = null;
      }
    } else {
      // If no obvious JSON substring, try parsing the whole cleaned text
      try {
        parsed = cleaned ? JSON.parse(cleaned) : JSON.parse(outputText);
      } catch (e) {
        parsed = null;
      }
    }

    // Coerce and sanitize parsed fields so we return real scores when available
    const out: any = {};
    out.riskScore = typeof parsed.riskScore === 'number' ? parsed.riskScore : Number(parsed.riskScore) || 0;
    // ensure within 0-100
    out.riskScore = Math.max(0, Math.min(100, Math.round(out.riskScore)));
    // threatLevel: prefer provided normalized value; otherwise derive from score
    const providedLevel = typeof parsed.threatLevel === 'string' ? parsed.threatLevel : '';
    const normalizedLevel = (providedLevel || '').charAt(0).toUpperCase() + (providedLevel || '').slice(1).toLowerCase();
    out.threatLevel = ['Low', 'Medium', 'High'].includes(normalizedLevel) ? normalizedLevel : computeThreatLevelFromScore(out.riskScore);
    out.detectedIssues = Array.isArray(parsed.detectedIssues) ? parsed.detectedIssues : (parsed.issues && Array.isArray(parsed.issues) ? parsed.issues : []);
    out.explanation = typeof parsed.explanation === 'string' && parsed.explanation.trim() ? parsed.explanation : (parsed.summary && typeof parsed.summary === 'string' ? parsed.summary : 'Analysis complete');
    out.recommendations = Array.isArray(parsed.recommendations) ? parsed.recommendations : (parsed.actions && Array.isArray(parsed.actions) ? parsed.actions : []);

    return NextResponse.json(out, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error', details: String(err) }, { status: 500 });
  }
}
