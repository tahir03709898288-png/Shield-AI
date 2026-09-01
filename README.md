# 🛡️ ShieldAI by Tahir Labs

> Your AI-powered protection against online scams and digital threats.

 🌐 Live Demo

🔗shield-ai-azure-nine.vercel.app

---

 📌 About The Project

ShieldAI is an AI-powered Digital Safety Advisor that helps users detect phishing attempts, scam messages, suspicious emails, unsafe links, and other online threats.

The purpose of ShieldAI is to solve a real-world problem: many people receive suspicious digital content but cannot identify whether it is safe or dangerous.

ShieldAI uses AI to analyze potential threats and provide users with risk insights and safety recommendations.

---

 🎯 Problem It Solves

Online scams and phishing attacks are increasing rapidly. Users often struggle to identify:

- Fake messages
- Phishing emails
- Suspicious links
- Scam offers
- Digital fraud attempts

ShieldAI helps users make safer decisions before interacting with risky content.

---

 ✨ Features

- 🤖 AI Scam Detection
- 🎣 Phishing Detection
- 🔗 URL Safety Analysis
- 📧 Email Analysis
- 💬 Message Analysis
- 📊 Risk Score Generation
- 🛡️ Threat Explanation
- 💡 Safety Recommendations
- 🔐 Privacy-focused Security Insights

---

 🧠 AI Feature

"ShieldAI uses the Google Gemini API (@google/genai) directly to analyze user-provided content for scam and phishing indicators."

 AI System Prompt

```
You are ShieldAI, an AI cybersecurity assistant.

Analyze user-provided messages, emails, or URLs.

Identify possible scams, phishing attempts, fraud patterns, and security risks.

Generate:
- Risk score
- Threat level
- Security explanation
- Safety recommendations

Always provide clear and accurate security guidance.
```

---

 🛠️ Technology Stack

 Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- Framer Motion

 AI
- Google Gemini API integration architecture
- Supabase Edge Functions
- Local heuristic analyzer as fallback

 Deployment
- Vercel

 Tools
- GitHub
- VS Code

---

 📸 Screenshots

 ## Home Page

![Home Screenshot](screenshots/home.png)

## AI Scanner

![Scanner Screenshot](screenshots/scanner.png)

 ## Threat Analysis Result

![Result Screenshot](screenshots/result.png)

---

 🚀 How To Run Locally

Clone the repository:

```bash
git https://github.com/tahir03709898288-png/Shield-AI.git
```

Install dependencies:

```bash
npm install
```

Create environment variables (local development):

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_public_key
```

Do NOT set your Gemini API key as a client-side env var (for example,
`NEXT_PUBLIC_GEMINI_API_KEY`). The Gemini key must remain server-side
and stored as a Supabase secret (see "Gemini integration & deployment" below).

Run the project:

```bash
npm run dev
```

Open:

```
http://localhost:3000
```

---

## Gemini integration & deployment

This project uses a Supabase Edge Function that performs the Gemini
API call server-side so your Gemini API key is never exposed to browsers.

Supabase function file: `supabase/functions/analyze/index.ts`

1) Add the Gemini secret to your Supabase project (server-side only):

```bash
supabase secrets set GEMINI_API_KEY="ya29_your_gemini_key_here"
# optionally override endpoint:
supabase secrets set GEMINI_API_URL="https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText"
```

2) Deploy the edge function (requires supabase CLI):

```bash
supabase login
supabase link --project-ref YOUR_PROJECT_REF
supabase functions deploy analyze --project-ref YOUR_PROJECT_REF
```

3) Frontend environment variables (Vercel / Netlify / local):

- `NEXT_PUBLIC_SUPABASE_URL` — your Supabase URL (example: https://xyz.supabase.co)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — your Supabase anon/public key

Do NOT add `GEMINI_API_KEY` to Vercel public envs. Keep Gemini keys only in
Supabase secrets so they remain server-side.

4) Quick smoke test (replace placeholders):

```bash
curl -X POST "${NEXT_PUBLIC_SUPABASE_URL}/functions/v1/analyze" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${NEXT_PUBLIC_SUPABASE_ANON_KEY}" \
  -d '{"type":"email","content":"Please click this link to claim your prize"}'
```

Expected response: a JSON object with the exact shape:

```json
{
  "riskScore": 0,
  "threatLevel": "Low|Medium|High",
  "detectedIssues": ["..."],
  "explanation": "...",
  "recommendations": ["..."]
}
```

5) Verify end-to-end behavior:

- Trigger an analysis in the web UI and inspect the Network tab — the
  client should POST to `${NEXT_PUBLIC_SUPABASE_URL}/functions/v1/analyze`.
- Confirm the function logs in Supabase show an outbound request to the
  Gemini/Generative API and that the function returned validated JSON.

6) Vercel deployment notes:

- Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in
  Vercel project settings (Environment Variables).
- Do NOT add `GEMINI_API_KEY` in Vercel or any client-facing envs.
- Deploy your frontend on Vercel as usual; the frontend will call the
  Supabase Edge Function which performs the Gemini request server-side.

7) Security reminder

- Remove any exposed Gemini key from `.env.local` (for example,
  `NEXT_PUBLIC_GEMINI_API_KEY`) immediately. Client-exposed keys can be
  leaked in build artifacts and are not safe for secrets.


---
  🔮 Future Improvements

- Browser security extension
- Mobile application
- Real-time threat intelligence
- Advanced AI security models

---

 👨‍💻 Developer

Tahir Labs

Building AI-powered solutions for a safer digital future.

**Project:** ShieldAI

---

⭐ Built as a Final AI App Project