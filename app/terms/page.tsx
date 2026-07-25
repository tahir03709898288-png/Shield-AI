import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedBackground from '@/components/AnimatedBackground';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Read the ShieldAI terms of service. Understand the terms and conditions for using our AI scam detection and digital safety tool.',
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return (
    <>
      <AnimatedBackground />
      <Navbar />
      <main className="pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Terms of Service
          </h1>
          <p className="mt-3 text-sm text-slate-400">Last updated: July 2026</p>

          <div className="mt-10 prose prose-slate max-w-none space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">
                1. Acceptance of Terms
              </h2>
              <p className="text-slate-600 leading-relaxed">
                By using ShieldAI, you agree to these Terms of Service. If you do
                not agree, please do not use the service. ShieldAI is provided by
                Tahir Labs.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">
                2. Service Description
              </h2>
              <p className="text-slate-600 leading-relaxed">
                ShieldAI is an AI-powered digital safety advisor that analyzes
                content you submit — such as URLs, emails, and messages — and
                provides a risk assessment, explanation, and recommendations.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">
                3. Not Professional Security Advice
              </h2>
              <p className="text-slate-600 leading-relaxed">
                ShieldAI provides informational analysis only. It is not a
                substitute for professional security, legal, or financial
                advice. You are responsible for your own decisions and actions.
                Always exercise caution with suspicious content.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">
                4. Acceptable Use
              </h2>
              <ul className="list-disc list-inside text-slate-600 space-y-1.5">
                <li>Do not use ShieldAI to harm, harass, or deceive others.</li>
                <li>Do not attempt to reverse-engineer or disrupt the service.</li>
                <li>Do not submit content you do not have the right to share.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">
                5. Limitation of Liability
              </h2>
              <p className="text-slate-600 leading-relaxed">
                ShieldAI is provided &ldquo;as is&rdquo; without warranties of
                any kind. Tahir Labs is not liable for any damages arising from
                your use of or reliance on ShieldAI, including any action taken
                or not taken based on its analysis.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">
                6. AI Accuracy
              </h2>
              <p className="text-slate-600 leading-relaxed">
                AI analysis may not always be accurate. False positives and
                false negatives are possible. Always use your own judgment and
                verify through official channels when in doubt.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">
                7. Changes to the Service
              </h2>
              <p className="text-slate-600 leading-relaxed">
                We may update, modify, or discontinue features at any time. We
                will strive to communicate significant changes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">
                8. Changes to These Terms
              </h2>
              <p className="text-slate-600 leading-relaxed">
                We may update these terms from time to time. Continued use of
                ShieldAI after changes constitutes acceptance of the updated
                terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">
                9. Contact
              </h2>
              <p className="text-slate-600 leading-relaxed">
                For questions about these terms, email{' '}
                <a
                  href="mailto:hello@tahirlabs.com"
                  className="text-blue-600 hover:underline"
                >
                  hello@tahirlabs.com
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
