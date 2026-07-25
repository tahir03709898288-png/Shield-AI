'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShieldCheck,
  ScanSearch,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  Link2,
} from 'lucide-react';
import HeroBackground from './HeroBackground';

const floatingCards = [
  {
    icon: ScanSearch,
    label: 'AI Scanning',
    sublabel: 'Active analysis',
    color: 'text-blue-500',
    bg: 'bg-blue-50/80',
    delay: 0.6,
    position: 'top-[4%] -left-2 sm:-left-10',
    float: [-4, 4],
  },
  {
    icon: ShieldAlert,
    label: 'Risk Score 95%',
    sublabel: 'High threat level',
    color: 'text-red-500',
    bg: 'bg-red-50/80',
    delay: 0.9,
    position: 'top-[44%] -right-2 sm:-right-12',
    float: [5, -5],
  },
  {
    icon: ShieldCheck,
    label: 'Threat Detected',
    sublabel: 'Phishing pattern',
    color: 'text-amber-500',
    bg: 'bg-amber-50/80',
    delay: 1.2,
    position: 'bottom-[8%] -left-2 sm:-left-8',
    float: [-3, 5],
  },
];

export default function Hero() {
  return (
    <section className="relative pt-28 pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <HeroBackground />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">

          {/* LEFT: Copy */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/80 backdrop-blur border border-blue-100 rounded-full text-xs font-medium text-blue-700 shadow-sm mb-6"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              AI-Powered Digital Safety Advisor
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-[3.75rem] font-semibold text-slate-900 tracking-tight leading-[1.08]"
            >
              Stay Safe Online with{' '}
              <span className="gradient-text-blue">
                AI-Powered<br className="hidden sm:block" /> Threat Detection
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-lg text-slate-500 leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              ShieldAI analyzes suspicious messages, emails, and links to help
              you identify online scams before they become a problem.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
            >
              <Link href="/scanner" className="btn-primary w-full sm:w-auto text-base px-7 py-3.5">
                Analyze Now
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/features" className="btn-secondary w-full sm:w-auto text-base px-7 py-3.5">
                Learn More
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-10 flex flex-wrap items-center gap-5 justify-center lg:justify-start text-sm text-slate-400"
            >
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-500" />
                <span>Privacy-First</span>
              </div>
              <div className="w-px h-4 bg-slate-200" />
              <div className="flex items-center gap-1.5">
                <Link2 className="w-4 h-4 text-cyan-500" />
                <span>Real-Time Analysis</span>
              </div>
              <div className="w-px h-4 bg-slate-200" />
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-blue-500" />
                <span>AI Explanations</span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Founder photo with 3 premium floating cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative flex items-center justify-center order-1 lg:order-2"
          >
            <div className="relative w-[320px] sm:w-[360px] lg:w-[420px] aspect-square">

              {/* Outer rotating ring */}
              <div className="absolute inset-0 rounded-full border border-blue-200/40 animate-[rotate-shield_35s_linear_infinite]" />

              {/* Middle dashed ring */}
              <div className="absolute inset-8 rounded-full border border-dashed border-cyan-200/40 animate-[rotate-shield_25s_linear_infinite_reverse]" />

              {/* Soft glow */}
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{ scale: [1, 1.04, 1], opacity: [0.3, 0.55, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  background:
                    'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 65%)',
                  filter: 'blur(30px)',
                }}
              />

              {/* Photo container */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative"
                >
                  <div
                    className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-white/60"
                    style={{
                      background: 'rgba(255,255,255,0.12)',
                      backdropFilter: 'blur(4px)',
                      boxShadow:
                        '0 0 0 2px rgba(59,130,246,0.12), 0 30px 80px rgba(59,130,246,0.2), 0 10px 40px rgba(6,182,212,0.12)',
                    }}
                  >
                    <div className="relative w-44 h-56 sm:w-52 sm:h-64 lg:w-56 lg:h-72">
                      <Image
                        src="/images/Untitled_-_June_28,_2026_at_13.23.01.png"
                        alt="Tahir — Founder & Creator of ShieldAI"
                        fill
                        className="object-cover object-top"
                        priority
                        sizes="(max-width: 768px) 176px, 224px"
                      />
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* 3 premium floating cards — positioned to not overlap the face */}
              {floatingCards.map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8, x: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: card.delay, type: 'spring', stiffness: 80 }}
                  className={`absolute ${card.position}`}
                >
                  <motion.div
                    animate={{ y: card.float }}
                    transition={{ duration: 4 + i * 0.5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                    className="flex items-center gap-2.5 glass rounded-2xl px-3.5 py-2.5 border border-white/80 backdrop-blur-xl whitespace-nowrap"
                    style={{
                      boxShadow: '0 4px 24px rgba(59,130,246,0.10), 0 1px 3px rgba(0,0,0,0.04)',
                    }}
                  >
                    <div className={`w-8 h-8 rounded-lg ${card.bg} flex items-center justify-center`}>
                      <card.icon className={`w-4 h-4 ${card.color}`} />
                    </div>
                    <div className="flex flex-col leading-tight">
                      <span className="text-xs font-semibold text-slate-800">{card.label}</span>
                      <span className="text-[10px] text-slate-400">{card.sublabel}</span>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
