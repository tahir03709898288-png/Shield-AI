/**
 * Gemini API integration architecture for ShieldAI.
 *
 * This module defines the types and the client function used to send
 * content to the Gemini API for scam/phishing analysis. The actual API
 * call should be made from a Supabase Edge Function (server-side) so the
 * API key is never exposed to the browser.
 *
 * SETUP:
 *   1. Set GEMINI_API_KEY in your Supabase project secrets.
 *   2. Deploy the edge function at supabase/functions/analyze/index.ts
 *      (see that file for the server-side implementation).
 *   3. The browser calls the edge function, which calls Gemini and
 *      returns a structured AnalysisResult.
 *
 * The scanner calls a Supabase Edge Function which proxies to Gemini.
 * Deploy the edge function at `supabase/functions/analyze/index.ts`.
 */

export interface AnalysisRequest {
  type: 'url' | 'email' | 'sms' | 'whatsapp';
  content: string;
}

export interface AnalysisResult {
  riskScore: number;
  threatLevel: 'Low' | 'Medium' | 'High';
  detectedIssues: string[];
  explanation: string;
  recommendations: string[];
}

export const GEMINI_SYSTEM_PROMPT = `You are ShieldAI, an expert digital safety advisor.
Analyze the provided content for scam, phishing, and fraud indicators.
Return a JSON object with:
- riskScore: integer 0-100 (0 = safe, 100 = very dangerous)
- threatLevel: "Low" | "Medium" | "High"
- detectedIssues: array of specific issues found
- explanation: plain-language summary of why content is risky
- recommendations: array of actionable safety steps
Be precise, conservative, and never fabricate indicators.`;

/**
 * Calls the ShieldAI analyze edge function (which proxies to Gemini).
 * Replace the URL with your deployed edge function URL.
 */
export async function analyzeContent(
  req: AnalysisRequest
): Promise<AnalysisResult> {
  const response = await fetch(`/api/analyze`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req),
  });

  if (!response.ok) {
    let text = '';
    try {
      text = await response.text();
    } catch (e) {
      /* noop */
    }
    throw new Error(`Analysis failed: ${response.status} ${text}`);
  }

  return (await response.json()) as AnalysisResult;
}
