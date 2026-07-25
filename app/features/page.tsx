import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedBackground from '@/components/AnimatedBackground';
import FeaturesGrid from '@/components/sections/FeaturesGrid';
import HowItWorks from '@/components/sections/HowItWorks';
import CTA from '@/components/sections/CTA';
import SectionHeading from '@/components/SectionHeading';
import { ShieldCheck, Lock, Zap, Eye } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Features — AI Scam Detection, Phishing Analysis & More',
  description:
    'Explore ShieldAI features: AI scam detection, phishing detection, URL safety analysis, email analysis, SMS and WhatsApp analysis, risk scores, AI explanations, and privacy protection.',
  alternates: { canonical: '/features' },
};

const pillars = [
  {
    icon: Eye,
    title: 'See Through the Scam',
    description:
      'ShieldAI surfaces the hidden signals scammers use — urgency, impersonation, deceptive links — so you can see what they do not want you to see.',
  },
  {
    icon: Zap,
    title: 'Instant Analysis',
    description:
      'Get results in seconds. No waiting, no complex setup. Paste your content and receive a complete assessment immediately.',
  },
  {
    icon: Lock,
    title: 'Privacy by Design',
    description:
      'Your submitted content is used only to generate your analysis. We do not store it long-term or share it with third parties.',
  },
  {
    icon: ShieldCheck,
    title: 'Actionable Protection',
    description:
      'Beyond a score, ShieldAI gives you clear, practical steps to protect yourself and respond to threats.',
  },
];

export default function FeaturesPage() {
  return (
    <>
      <AnimatedBackground />
      <Navbar />
      <main className="pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Features"
            title="AI-powered protection, built for everyone"
            subtitle="ShieldAI brings together detection, explanation, and recommendations into one clear, easy-to-use safety tool."
          />

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((p) => (
              <div
                key={p.title}
                className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm card-hover"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg mb-4">
                  <p.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{p.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <FeaturesGrid />
        </div>
        <HowItWorks />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
