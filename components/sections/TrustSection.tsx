'use client';

import { motion } from 'framer-motion';
import { Lock, Zap, Shield, Globe } from 'lucide-react';
import SectionHeading from '../SectionHeading';

const features = [
  {
    icon: Lock,
    title: 'Privacy First',
    description: 'Your data stays secure with privacy-focused AI protection.',
    gradient: 'from-blue-500 to-blue-600',
    glow: 'group-hover:shadow-blue-500/20',
  },
  {
    icon: Zap,
    title: 'Instant AI Analysis',
    description: 'Get fast security insights powered by artificial intelligence.',
    gradient: 'from-cyan-500 to-cyan-600',
    glow: 'group-hover:shadow-cyan-500/20',
  },
  {
    icon: Shield,
    title: 'Smart Threat Detection',
    description: 'Detect suspicious activity and online threats instantly.',
    gradient: 'from-sky-500 to-sky-600',
    glow: 'group-hover:shadow-sky-500/20',
  },
  {
    icon: Globe,
    title: 'Online Protection',
    description: 'Stay protected across your digital activities.',
    gradient: 'from-indigo-500 to-indigo-600',
    glow: 'group-hover:shadow-indigo-500/20',
  },
];

export default function TrustSection() {
  return (
    <section className="relative section-padding">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Trust"
          title="Trusted Digital Safety Features"
          subtitle="ShieldAI is built on four core principles that keep you protected without compromising your privacy."
        />

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className={`group relative bg-white rounded-2xl p-7 border border-slate-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${feature.glow}`}
            >
              {/* Top accent bar */}
              <div className={`absolute top-0 left-6 right-6 h-1 rounded-full bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg mb-5 group-hover:scale-110 transition-transform duration-300`}
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
