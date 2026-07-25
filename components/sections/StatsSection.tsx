'use client';

import { motion } from 'framer-motion';
import { Link2, Mail, MessageSquare, ShieldAlert } from 'lucide-react';
import SectionHeading from '../SectionHeading';

const categories = [
  {
    icon: Link2,
    label: 'URLs',
    action: 'Analyze',
    gradient: 'from-blue-500 to-blue-600',
    bg: 'bg-blue-50/60',
  },
  {
    icon: Mail,
    label: 'Emails',
    action: 'Analyze',
    gradient: 'from-cyan-500 to-cyan-600',
    bg: 'bg-cyan-50/60',
  },
  {
    icon: MessageSquare,
    label: 'Messages',
    action: 'Analyze',
    gradient: 'from-sky-500 to-sky-600',
    bg: 'bg-sky-50/60',
  },
  {
    icon: ShieldAlert,
    label: 'Digital Threats',
    action: 'Analyze',
    gradient: 'from-indigo-500 to-indigo-600',
    bg: 'bg-indigo-50/60',
  },
];

export default function StatsSection() {
  return (
    <section className="relative section-padding bg-gradient-to-b from-transparent via-blue-50/30 to-transparent">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Capabilities"
          title="AI-Powered Protection"
          subtitle="ShieldAI can analyze multiple types of digital content to help you identify threats across every channel."
        />

        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group relative bg-white rounded-2xl p-6 border border-slate-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10"
            >
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform`}>
                <cat.icon className="w-5 h-5 text-white" strokeWidth={2} />
              </div>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">
                {cat.action}
              </p>
              <p className="text-2xl font-bold text-slate-900 mt-1">
                {cat.label}
              </p>
              <div className={`mt-4 h-1 w-full rounded-full bg-gradient-to-r ${cat.gradient} opacity-20 group-hover:opacity-60 transition-opacity`} />
            </motion.div>
          ))}
        </div>

        <p className="text-center text-xs text-slate-400 mt-8">
          ShieldAI analyzes content categories in real time. No accounts or
          personal data collection required.
        </p>
      </div>
    </section>
  );
}
