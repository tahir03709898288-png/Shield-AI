import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedBackground from '@/components/AnimatedBackground';
import Founder from '@/components/sections/Founder';
import CTA from '@/components/sections/CTA';
import SectionHeading from '@/components/SectionHeading';
import { Target, Eye, Heart, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About — Tahir Labs & the ShieldAI Mission',
  description:
    'ShieldAI is built by Tahir Labs with a mission to make digital safety accessible to everyone. Learn about our mission, values, and the team behind the product.',
  alternates: { canonical: '/about' },
};

const values = [
  {
    icon: Target,
    title: 'Our Mission',
    description:
      'To make digital safety accessible to everyone — not just security experts. ShieldAI translates complex threat signals into clear, actionable guidance anyone can understand.',
  },
  {
    icon: Eye,
    title: 'Transparency',
    description:
      'We believe safety tools should explain their reasoning. ShieldAI does not just flag content — it tells you why, in plain language.',
  },
  {
    icon: Heart,
    title: 'People First',
    description:
      'ShieldAI is built for real people facing real threats. Every feature is designed around the question: does this help someone stay safer?',
  },
  {
    icon: ShieldCheck,
    title: 'Privacy First',
    description:
      'Your trust is the foundation of everything. We do not store your submitted content or share it with third parties.',
  },
];

export default function AboutPage() {
  return (
    <>
      <AnimatedBackground />
      <Navbar />
      <main className="pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="About"
            title="Digital safety, built for everyone"
            subtitle="ShieldAI was created by Tahir Labs to solve a simple problem: too many people fall victim to online scams because the warning signs are hard to spot. We use AI to make those signs clear."
          />

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div
                key={v.title}
                className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm card-hover"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg mb-4">
                  <v.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{v.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <Founder />
        </div>
        <CTA />
      </main>
      <Footer />
    </>
  );
}
