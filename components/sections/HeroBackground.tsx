'use client';

import { motion } from 'framer-motion';

/**
 * Lightweight live animated background scoped to the hero section.
 * Premium, Apple Vision Pro / Linear inspired — subtle and continuous.
 */
export default function HeroBackground() {
  const particles = [
    { left: '12%', top: '20%', delay: '0s', dur: '16s', size: '3px' },
    { left: '85%', top: '15%', delay: '3s', dur: '20s', size: '4px' },
    { left: '45%', top: '70%', delay: '6s', dur: '18s', size: '2px' },
    { left: '70%', top: '80%', delay: '2s', dur: '22s', size: '3px' },
    { left: '25%', top: '85%', delay: '8s', dur: '17s', size: '3px' },
    { left: '60%', top: '30%', delay: '5s', dur: '19s', size: '2px' },
    { left: '30%', top: '40%', delay: '10s', dur: '21s', size: '3px' },
    { left: '90%', top: '60%', delay: '1s', dur: '16s', size: '2px' },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Base gradient wash */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 100% 70% at 30% 0%, rgba(219,234,254,0.7) 0%, transparent 55%), radial-gradient(ellipse 80% 60% at 80% 30%, rgba(207,250,254,0.4) 0%, transparent 50%)',
        }}
      />

      {/* Slowly moving blue blob */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full blur-[100px]"
        style={{
          background:
            'radial-gradient(circle, rgba(59,130,246,0.18) 0%, rgba(14,165,233,0.08) 50%, transparent 70%)',
          top: '-10%',
          left: '5%',
        }}
        animate={{ x: [0, 40, -20, 0], y: [0, 20, -15, 0], scale: [1, 1.08, 0.96, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Slowly moving cyan blob */}
      <motion.div
        className="absolute w-[460px] h-[460px] rounded-full blur-[100px]"
        style={{
          background:
            'radial-gradient(circle, rgba(6,182,212,0.16) 0%, rgba(56,189,248,0.06) 50%, transparent 70%)',
          top: '20%',
          right: '0%',
        }}
        animate={{ x: [0, -30, 20, 0], y: [0, 25, -10, 0], scale: [1, 0.94, 1.06, 1] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      {/* Smaller accent blob */}
      <motion.div
        className="absolute w-[320px] h-[320px] rounded-full blur-[80px]"
        style={{
          background:
            'radial-gradient(circle, rgba(99,102,241,0.10) 0%, transparent 65%)',
          bottom: '5%',
          left: '35%',
        }}
        animate={{ x: [0, 20, -25, 0], y: [0, -15, 10, 0], scale: [1, 1.05, 0.97, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      />

      {/* Animated glowing circles */}
      <motion.div
        className="absolute rounded-full border border-blue-200/40"
        style={{ width: '600px', height: '600px', top: '50%', left: '50%', x: '-50%', y: '-50%' }}
        animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute rounded-full border border-cyan-200/30"
        style={{ width: '400px', height: '400px', top: '50%', left: '50%', x: '-50%', y: '-50%' }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      {/* Subtle moving grid */}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: [0.03, 0.06, 0.03] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          backgroundImage:
            'linear-gradient(rgba(14,165,233,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.5) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage:
            'radial-gradient(ellipse 70% 50% at 50% 40%, black 30%, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 70% 50% at 50% 40%, black 30%, transparent 75%)',
        }}
      />

      {/* Floating particles */}
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            background: 'rgba(14,165,233,0.5)',
            boxShadow: '0 0 8px rgba(14,165,233,0.4)',
            animation: `particle-float ${p.dur} linear infinite`,
            animationDelay: p.delay,
          }}
        />
      ))}

      {/* Bottom fade into page */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white/80 to-transparent" />
    </div>
  );
}
