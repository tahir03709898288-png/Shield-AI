'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { motion } from 'framer-motion';
import SectionHeading from '../SectionHeading';

const faqs = [
  {
    q: 'What is ShieldAI?',
    a: 'ShieldAI is an AI-powered digital safety advisor built by Tahir Labs. It helps you detect phishing attempts, scam messages, suspicious emails, fake job offers, and unsafe online content by analyzing the text or URLs you provide and generating a clear risk assessment.',
  },
  {
    q: 'How does AI scam detection work?',
    a: 'ShieldAI uses advanced AI models to evaluate content for known scam patterns, urgency tactics, impersonation cues, deceptive language, and suspicious link structures. It then produces a risk score, a threat level, a plain-language explanation, and recommended safety actions.',
  },
  {
    q: 'Can ShieldAI analyze suspicious links?',
    a: 'Yes. You can paste a URL into the scanner and ShieldAI will assess it for phishing indicators, suspicious redirects, and unsafe destination patterns. Note that ShieldAI evaluates the URL and available context — it does not crawl arbitrary sites.',
  },
  {
    q: 'Is my data private?',
    a: 'Privacy is a core principle of ShieldAI. Submitted content is used only to generate your analysis and is not stored long-term or shared with third parties. You can review our full Privacy Policy for details.',
  },
  {
    q: 'Who can use ShieldAI?',
    a: 'ShieldAI is designed for anyone who wants to stay safe online — individuals checking a suspicious message, professionals evaluating emails, or anyone unsure whether a link or offer is legitimate. No technical expertise is required.',
  },
];

export default function FAQ() {
  return (
    <section className="section-padding">
      <div className="max-w-3xl mx-auto">
        <SectionHeading
          eyebrow="FAQ"
          title="Frequently asked questions"
          subtitle="Everything you need to know about ShieldAI and how it keeps you safe."
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12"
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="bg-white rounded-xl border border-slate-100 shadow-sm px-5"
              >
                <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-slate-500 leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
