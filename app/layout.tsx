import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://shieldai.tahirlabs.com'),
  title: {
    default: 'ShieldAI — AI-Powered Scam & Phishing Detector | Tahir Labs',
    template: '%s | ShieldAI by Tahir Labs',
  },
  description:
    'ShieldAI is an AI-powered digital safety advisor that helps you detect phishing attempts, scam messages, suspicious emails, fake job offers, and unsafe online content instantly.',
  keywords: [
    'AI scam detector',
    'AI security assistant',
    'phishing detection AI',
    'online safety tool',
    'scam message checker',
    'AI fraud detection',
    'email scam detector',
    'phishing link checker',
    'digital safety AI',
    'ShieldAI',
    'Tahir Labs',
  ],
  authors: [{ name: 'Tahir Labs' }],
  creator: 'Tahir Labs',
  publisher: 'Tahir Labs',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://shieldai.tahirlabs.com',
    siteName: 'ShieldAI by Tahir Labs',
    title: 'ShieldAI — AI-Powered Scam & Phishing Detector',
    description:
      'ShieldAI analyzes suspicious messages, emails, and links to help you identify online scams before they become a problem.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ShieldAI — AI-Powered Digital Safety',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ShieldAI — AI-Powered Scam & Phishing Detector',
    description:
      'ShieldAI analyzes suspicious messages, emails, and links to help you identify online scams before they become a problem.',
    creator: '@tahirlabs',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'ShieldAI',
              applicationCategory: 'SecurityApplication',
              operatingSystem: 'Web',
              description:
                'AI-powered digital safety advisor for detecting phishing, scams, and online threats.',
              url: 'https://shieldai.tahirlabs.com',
              author: {
                '@type': 'Organization',
                name: 'Tahir Labs',
              },
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.className} overflow-x-hidden`}>{children}</body>
    </html>
  );
}
