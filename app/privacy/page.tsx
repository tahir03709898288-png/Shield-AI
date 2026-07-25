import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedBackground from '@/components/AnimatedBackground';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Read the ShieldAI privacy policy. Learn how we handle your data, what we collect, and how we protect your privacy when using our AI scam detection tool.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <>
      <AnimatedBackground />
      <Navbar />
      <main className="pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-slate-400">Last updated: July 2026</p>

          <div className="mt-10 prose prose-slate max-w-none space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">
                1. Overview
              </h2>
              <p className="text-slate-600 leading-relaxed">
                ShieldAI is built by Tahir Labs. We take your privacy seriously.
                This policy explains what data we collect, how we use it, and
                the choices you have. ShieldAI is designed with a privacy-first
                principle: the content you submit for analysis is used only to
                generate your risk assessment and is not stored long-term or
                shared with third parties.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">
                2. Data We Process
              </h2>
              <p className="text-slate-600 leading-relaxed mb-3">
                When you use the ShieldAI scanner, you may submit:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-1.5">
                <li>Website URLs you want checked</li>
                <li>Email text you want analyzed</li>
                <li>SMS or WhatsApp messages you want analyzed</li>
              </ul>
              <p className="text-slate-600 leading-relaxed mt-3">
                This content is sent to our analysis service to generate your
                result. It is processed in transit and in memory to produce
                your assessment, and is not persisted in a database tied to your
                identity.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">
                3. Data We Do Not Collect
              </h2>
              <ul className="list-disc list-inside text-slate-600 space-y-1.5">
                <li>We do not require an account to use the scanner.</li>
                <li>We do not sell your data to third parties.</li>
                <li>We do not use your submitted content for advertising.</li>
                <li>We do not build profiles of individuals from submitted content.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">
                4. Analytics
              </h2>
              <p className="text-slate-600 leading-relaxed">
                We may use privacy-respecting analytics to understand aggregate
                usage (such as total number of scans performed). These
                analytics do not include the content you submit.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">
                5. AI Processing
              </h2>
              <p className="text-slate-600 leading-relaxed">
                ShieldAI uses AI models to analyze submitted content. When the
                Gemini API integration is enabled, your submitted content is
                sent to the AI provider solely for the purpose of generating
                your analysis. The provider&apos;s data handling is governed by
                their respective privacy policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">
                6. Cookies
              </h2>
              <p className="text-slate-600 leading-relaxed">
                ShieldAI does not use tracking cookies. Essential cookies, if
                any, are used solely for site functionality.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">
                7. Your Rights
              </h2>
              <p className="text-slate-600 leading-relaxed">
                You have the right to know how your data is handled. Since we do
                not persist submitted content tied to your identity, there is no
                personal data store to delete. For any privacy questions, contact
                us at hello@tahirlabs.com.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">
                8. Changes to This Policy
              </h2>
              <p className="text-slate-600 leading-relaxed">
                We may update this policy from time to time. Changes will be
                posted on this page with an updated date.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">
                9. Contact
              </h2>
              <p className="text-slate-600 leading-relaxed">
                For privacy questions, email{' '}
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
