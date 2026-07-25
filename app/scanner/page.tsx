import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedBackground from '@/components/AnimatedBackground';
import Scanner from '@/components/Scanner';
import SectionHeading from '@/components/SectionHeading';
import { ScanSearch } from 'lucide-react';

export const metadata: Metadata = {
  title: 'AI Scanner — Analyze Suspicious Messages & Links',
  description:
    'Paste any suspicious URL, email, SMS, or WhatsApp message into the ShieldAI scanner to get an instant AI-powered risk score, threat level, and safety recommendations.',
  alternates: { canonical: '/scanner' },
};

export default function ScannerPage() {
  return (
    <>
      <AnimatedBackground />
      <Navbar />
      <main className="pt-28 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 shadow-lg shadow-blue-500/20 mb-5">
              <ScanSearch className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
              AI Threat Scanner
            </h1>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
              Paste any suspicious content below. ShieldAI will analyze it for
              scams, phishing, and fraud — and give you a clear risk score and
              safety recommendations.
            </p>
          </div>
        </div>

        <Scanner />

        <div className="mt-16">
          <SectionHeading
            eyebrow="How to use"
            title="Getting the most accurate results"
            subtitle="For best results, paste the full content including links, sender details, and any unusual formatting."
          />
          <div className="mt-10 max-w-3xl mx-auto grid sm:grid-cols-3 gap-4">
            {[
              { n: '1', t: 'Include full context', d: 'Paste the complete message, not just a snippet.' },
              { n: '2', t: 'Keep links intact', d: 'Don\'t modify URLs — ShieldAI checks them as-is.' },
              { n: '3', t: 'Review recommendations', d: 'Always follow the suggested safety actions.' },
            ].map((s) => (
              <div key={s.n} className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-sm mb-3">
                  {s.n}
                </div>
                <h3 className="font-semibold text-slate-900 text-sm mb-1">{s.t}</h3>
                <p className="text-xs text-slate-500">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
