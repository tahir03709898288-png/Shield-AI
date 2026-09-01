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
# 🛡️ ShieldAI

![License](https://img.shields.io/badge/license-MIT-green) ![Vercel](https://img.shields.io/badge/deploy-vercel-black) ![Next.js](https://img.shields.io/badge/framework-Next.js-000)

Live demo: https://shield-ai-azure-nine.vercel.app

---

## Description

ShieldAI is an AI-powered Digital Safety Advisor that analyzes user-provided URLs, emails, and messages to detect scams, phishing, and other digital threats. It returns a numeric risk score, a threat level, a breakdown of detected issues, an explanation, and actionable recommendations.

---

## Features

- AI scam & phishing detection
- Risk scoring (0–100)
- Threat level breakdown (Low / Medium / High)
- Detected issues list (bulleted)
- Human-readable explanation and recommendations
- Privacy-first: analysis performed server-side (keys not exposed)

---

## Tech Stack

- Frontend: Next.js, React, TypeScript
- Styling: Tailwind CSS
- Animations: Framer Motion
- AI Providers: Groq (`GROQ_API_KEY`) and Google Gemini (`GEMINI_API_KEY`) (server-side)
- Deployment: Vercel

---

## Quick Start (Local)

1. Clone the repo:

```bash
git clone https://github.com/tahir03709898288-png/Shield-AI.git
cd Shield-AI
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` in the project root and add server-side API keys (do NOT expose these as NEXT_PUBLIC_ variables):

```text
# Preferred: GROQ (llama-3.1-8b-instant)
GROQ_API_KEY=your_groq_api_key_here

# Fallback: Gemini (used when GROQ not present)
GEMINI_API_KEY=your_gemini_api_key_here

# Optional (if you use Supabase edge functions)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_public_key
```

4. Run the development server:

```bash
npm run dev
```

5. Open http://localhost:3000 in your browser.

---

## API & Environment Notes

- The app calls a server-side route (`/api/analyze`) which proxies requests to Groq or Gemini. Set either `GROQ_API_KEY` or `GEMINI_API_KEY` in your environment. Do NOT set `NEXT_PUBLIC_GEMINI_API_KEY` or any public key.
- If deploying to Vercel, add `GROQ_API_KEY` and/or `GEMINI_API_KEY` in the project Environment Variables (Server scope).

---

## Live Demo

- https://shield-ai-azure-nine.vercel.app (live demo)

---

## Contributing

Contributions welcome — open an issue or PR with improvements.

---

## License

MIT
