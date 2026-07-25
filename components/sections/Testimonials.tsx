'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import SectionHeading from '../SectionHeading';

const testimonials = [
  {
    quote:
      'ShieldAI helped me spot a phishing email I almost clicked on. The risk score and explanation made it obvious something was wrong.',
    name: 'Sample Reviewer',
    role: 'Example testimonial — replace with real feedback',
    initials: 'SR',
  },
  {
    quote:
      'I pasted a suspicious WhatsApp message and ShieldAI immediately flagged it as a scam. The safety recommendations were clear and helpful.',
    name: 'Demo User',
    role: 'Example testimonial — replace with real feedback',
    initials: 'DU',
  },
  {
    quote:
      'The AI explanation feature is fantastic. It does not just say something is dangerous — it tells you exactly why, in plain language.',
    name: 'Placeholder Reviewer',
    role: 'Example testimonial — replace with real feedback',
    initials: 'PR',
  },
];

export default function Testimonials() {
  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Testimonials"
          title="What early users are saying"
          subtitle="These are placeholder testimonials for demonstration. They will be replaced with real user reviews as ShieldAI grows."
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative bg-white rounded-2xl p-6 border border-slate-100 shadow-sm card-hover"
            >
              <Quote className="w-8 h-8 text-blue-200 mb-4" />
              <p className="text-slate-700 leading-relaxed mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-sm font-semibold">
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {t.name}
                  </p>
                  <p className="text-xs text-slate-400">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-xs text-slate-400 mt-8">
          The testimonials above are placeholders and will be replaced with
          verified user feedback.
        </p>
      </div>
    </section>
  );
}
