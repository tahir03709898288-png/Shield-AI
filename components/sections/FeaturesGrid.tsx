'use client';

import { motion } from 'framer-motion';
import {
  ScanSearch,
  Fish,
  Link2,
  Mail,
  MessageSquare,
  Gauge,
  BrainCircuit,
  ShieldCheck,
  Lock,
} from 'lucide-react';
import SectionHeading from '../SectionHeading';

const features = [
  {
    icon: ScanSearch,
    title: 'AI Scam Detection',
    description:
      'Advanced AI models identify scam patterns across messages, emails, and links in real time.',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: Fish,
    title: 'Phishing Detection',
    description:
      'Detect phishing attempts by analyzing language patterns, sender behavior, and deceptive tactics.',
    color: 'from-cyan-500 to-cyan-600',
  },
  {
    icon: Link2,
    title: 'URL Safety Analysis',
    description:
      'Check any URL for known phishing patterns, suspicious redirects, and unsafe destinations.',
    color: 'from-sky-500 to-sky-600',
  },
  {
    icon: Mail,
    title: 'Email Analysis',
    description:
      'Analyze suspicious emails for impersonation, urgency tactics, and fraudulent requests.',
    color: 'from-indigo-500 to-indigo-600',
  },
  {
    icon: MessageSquare,
    title: 'SMS & WhatsApp Analysis',
    description:
      'Paste suspicious SMS or WhatsApp messages to detect scams, fraud, and social engineering.',
    color: 'from-teal-500 to-teal-600',
  },
  {
    icon: Gauge,
    title: 'Risk Score Generation',
    description:
      'Get a clear risk percentage and threat level so you know exactly how dangerous content is.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: BrainCircuit,
    title: 'AI Security Explanation',
    description:
      'Understand why content is risky with plain-language explanations powered by AI.',
    color: 'from-violet-500 to-violet-600',
  },
  {
    icon: ShieldCheck,
    title: 'Safety Recommendations',
    description:
      'Receive actionable steps to protect yourself and respond to detected threats.',
    color: 'from-emerald-500 to-emerald-600',
  },
  {
    icon: Lock,
    title: 'Privacy Protection',
    description:
      'Your content is analyzed securely. We do not store or share your submitted data.',
    color: 'from-slate-500 to-slate-600',
  },
];

export default function FeaturesGrid() {
  return (
    <section className="section-padding" id="features">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Features"
          title="Everything you need to stay safe online"
          subtitle="ShieldAI combines AI detection, clear explanations, and actionable recommendations into one powerful safety tool."
        />

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
              className="feature-card group"
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg mb-5 group-hover:scale-110 transition-transform`}
              >
                <feature.icon className="w-6 h-6 text-white" strokeWidth={2} />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
