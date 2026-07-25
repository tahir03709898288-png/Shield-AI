'use client';

import Link from 'next/link';
import { ShieldCheck, Twitter, Linkedin, Github, Mail } from 'lucide-react';
import Logo from './Logo';

const footerNav = [
  { href: '/', label: 'Home' },
  { href: '/scanner', label: 'AI Scanner' },
  { href: '/features', label: 'Features' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' },
];

const socials = [
  { icon: Twitter, href: 'https://twitter.com/tahirlabs', label: 'Twitter' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Mail, href: 'mailto:hello@tahirlabs.com', label: 'Email' },
];

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-slate-200/80 bg-white/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-slate-500 max-w-xs leading-relaxed">
              Your AI-powered protection against online scams and digital
              threats. Built by Tahir Labs.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-blue-500" />
              <span>AI-Powered Digital Safety</span>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-slate-900">Navigation</h4>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-2">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-500 hover:text-blue-600 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-slate-900">Connect</h4>
            <p className="text-sm text-slate-500">
              Have questions? Reach out at{' '}
              <a
                href="mailto:hello@tahirlabs.com"
                className="text-blue-600 hover:underline"
              >
                hello@tahirlabs.com
              </a>
            </p>
            <div className="flex items-center gap-3">
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

        <div className="mt-12 pt-8 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-400">
            &copy; {new Date().getFullYear()} ShieldAI by Tahir Labs. All rights
            reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-slate-400">
            <Link href="/privacy" className="hover:text-blue-600 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-blue-600 transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
