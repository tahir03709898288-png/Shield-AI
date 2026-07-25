'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Twitter, Linkedin, Github, Mail, Target, Sparkles } from 'lucide-react';
import SectionHeading from '../SectionHeading';

const socials = [
  { icon: Twitter, href: 'https://twitter.com/tahirlabs', label: 'Twitter' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Mail, href: 'mailto:hello@tahirlabs.com', label: 'Email' },
];

export default function Founder() {
  return (
    <section className="section-padding bg-gradient-to-b from-transparent via-blue-50/40 to-transparent">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          eyebrow="Built by Tahir Labs"
          title="Meet the founder"
          subtitle="ShieldAI is built by Tahir Labs with a mission to make digital safety accessible to everyone."
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 relative bg-white rounded-3xl p-8 sm:p-12 border border-slate-100 shadow-xl shadow-blue-500/5 overflow-hidden"
        >
          {/* Decorative gradients */}
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-gradient-to-br from-blue-100/60 to-cyan-100/40 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-gradient-to-br from-cyan-100/40 to-sky-100/30 blur-3xl" />

          <div className="relative grid sm:grid-cols-[auto_1fr] gap-8 sm:gap-12 items-center">
            {/* Founder photo */}
            <div className="flex justify-center sm:justify-start">
              <div className="relative">
                {/* Outer rotating ring */}
                <div className="absolute -inset-4 rounded-full border-2 border-dashed border-blue-200/60 animate-[rotate-shield_22s_linear_infinite]" />
                {/* Inner solid ring */}
                <div className="absolute -inset-1.5 rounded-full border border-cyan-200/60" />
                {/* Glow */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{ opacity: [0.4, 0.75, 0.4], scale: [1, 1.06, 1] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                  style={{
                    background:
                      'radial-gradient(circle, rgba(59,130,246,0.25) 0%, rgba(6,182,212,0.12) 60%, transparent 80%)',
                    filter: 'blur(16px)',
                  }}
                />
                {/* Photo */}
                <div className="relative w-36 h-36 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <Image
                    src="/images/Untitled_-_June_28,_2026_at_13.23.01.png"
                    alt="Tahir — Founder & Creator of ShieldAI"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 640px) 144px, 192px"
                  />
                </div>
                {/* Badge */}
                <div className="absolute -bottom-1 -right-1 w-11 h-11 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg border-[3px] border-white">
                  <Target className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>

            {/* Founder content */}
            <div className="text-center sm:text-left">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold text-blue-700 bg-blue-50 rounded-full mb-3 tracking-wide uppercase">
                <Sparkles className="w-3 h-3" />
                Founder &amp; Creator
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">Tahir</h3>
              <p className="text-sm text-blue-600 font-medium mt-1">
                Founder &amp; Creator, Tahir Labs
              </p>
              <p className="mt-4 text-slate-500 leading-relaxed">
                Building AI-powered solutions to make the digital world safer
                and smarter.
              </p>

              <div className="mt-5 p-4 bg-blue-50/60 rounded-xl border border-blue-100">
                <p className="text-sm text-slate-600 italic">
                  &ldquo;Our mission is to make digital safety accessible to
                  everyone — not just security experts. If we can help one
                  person avoid a scam, ShieldAI has done its job.&rdquo;
                </p>
              </div>

              <div className="mt-6 flex items-center gap-3 justify-center sm:justify-start">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-9 h-9 rounded-lg bg-slate-100 hover:bg-blue-50 flex items-center justify-center text-slate-600 hover:text-blue-600 transition-colors"
                  >
                    <s.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
