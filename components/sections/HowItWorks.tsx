'use client';

import { motion } from 'framer-motion';
import { ClipboardPaste, BrainCircuit, ShieldCheck, ArrowRight } from 'lucide-react';
import SectionHeading from '../SectionHeading';

const steps = [
  {
    icon: ClipboardPaste,
    number: '01',
    title: 'Paste suspicious content',
    description:
      'Copy any suspicious message, email, SMS, WhatsApp message, or URL into the ShieldAI scanner.',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: BrainCircuit,
    number: '02',
    title: 'AI analyzes the threat',
    description:
      'Our AI models evaluate the content for scam patterns, phishing indicators, and deceptive tactics.',
    color: 'from-cyan-500 to-cyan-600',
  },
  {
    icon: ShieldCheck,
    number: '03',
    title: 'Receive safety recommendations',
    description:
      'Get a risk score, threat level, clear explanation, and recommended actions to stay protected.',
    color: 'from-sky-500 to-sky-600',
  },
];

export default function HowItWorks() {
  return (
    <section className="section-padding bg-gradient-to-b from-transparent via-blue-50/40 to-transparent">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="How It Works"
          title="Three simple steps to stay protected"
          subtitle="ShieldAI makes it easy to check any suspicious content in seconds."
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-16 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-blue-200 via-cyan-200 to-sky-200" />

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative text-center"
            >
              <div className="relative inline-flex items-center justify-center mb-6">
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg shadow-blue-500/20 relative z-10`}
                >
                  <step.icon className="w-7 h-7 text-white" strokeWidth={2} />
                </div>
                <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-400 shadow-sm z-20">
                  {step.number}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                {step.title}
              </h3>
              <p className="text-slate-500 leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
              {i < steps.length - 1 && (
                <div className="hidden md:flex items-center justify-center mt-6">
                  <ArrowRight className="w-5 h-5 text-cyan-400" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
