'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function AnimatedBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      containerRef.current.style.setProperty('--mouse-x', `${x}%`);
      containerRef.current.style.setProperty('--mouse-y', `${y}%`);
    };

    let ticking = false;
    const throttled = (e: MouseEvent) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleMouseMove(e);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('mousemove', throttled, { passive: true });
    return () => window.removeEventListener('mousemove', throttled);
  }, []);

  const orbs = [
    {
      className: 'top-[-8%] left-[-5%] w-[560px] h-[560px]',
      gradient: 'radial-gradient(circle, rgba(59,130,246,0.22) 0%, rgba(14,165,233,0.12) 50%, transparent 70%)',
      animation: 'float-orb-1',
      duration: '18s',
    },
    {
      className: 'top-[25%] right-[-8%] w-[520px] h-[520px]',
      gradient: 'radial-gradient(circle, rgba(6,182,212,0.18) 0%, rgba(14,165,233,0.10) 50%, transparent 70%)',
      animation: 'float-orb-2',
      duration: '22s',
    },
    {
      className: 'bottom-[5%] left-[30%] w-[480px] h-[480px]',
      gradient: 'radial-gradient(circle, rgba(56,189,248,0.16) 0%, rgba(99,102,241,0.06) 50%, transparent 70%)',
      animation: 'float-orb-3',
      duration: '26s',
    },
    {
      className: 'top-[55%] left-[-4%] w-[360px] h-[360px]',
      gradient: 'radial-gradient(circle, rgba(34,211,238,0.14) 0%, transparent 65%)',
      animation: 'float-orb-2',
      duration: '20s',
    },
    {
      className: 'top-[10%] right-[25%] w-[300px] h-[300px]',
      gradient: 'radial-gradient(circle, rgba(147,197,253,0.20) 0%, transparent 65%)',
      animation: 'float-orb-1',
      duration: '15s',
    },
  ];

  const particles = [
    { left: '8%', top: '18%', delay: '0s', dur: '20s', size: '3px', opacity: 0.6 },
    { left: '82%', top: '12%', delay: '4s', dur: '24s', size: '5px', opacity: 0.4 },
    { left: '43%', top: '65%', delay: '7s', dur: '22s', size: '3px', opacity: 0.5 },
    { left: '68%', top: '78%', delay: '2s', dur: '26s', size: '4px', opacity: 0.4 },
    { left: '22%', top: '82%', delay: '9s', dur: '19s', size: '3px', opacity: 0.6 },
    { left: '58%', top: '30%', delay: '5s', dur: '23s', size: '2px', opacity: 0.5 },
    { left: '15%', top: '45%', delay: '12s', dur: '21s', size: '4px', opacity: 0.35 },
    { left: '90%', top: '55%', delay: '1s', dur: '18s', size: '3px', opacity: 0.45 },
    { left: '35%', top: '10%', delay: '6s', dur: '25s', size: '2px', opacity: 0.5 },
    { left: '75%', top: '40%', delay: '11s', dur: '20s', size: '5px', opacity: 0.3 },
    { left: '50%', top: '90%', delay: '3s', dur: '22s', size: '3px', opacity: 0.4 },
    { left: '5%', top: '70%', delay: '8s', dur: '28s', size: '4px', opacity: 0.35 },
  ];

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      style={{ '--mouse-x': '50%', '--mouse-y': '50%' } as React.CSSProperties}
    >
      {/* Base */}
      <div className="absolute inset-0 bg-[#fafcff]" />

      {/* Mesh gradient base layer */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 120% 80% at 50% -10%, rgba(219,234,254,0.6) 0%, transparent 60%), radial-gradient(ellipse 80% 60% at 90% 50%, rgba(207,250,254,0.3) 0%, transparent 50%), radial-gradient(ellipse 60% 50% at 0% 80%, rgba(219,234,254,0.25) 0%, transparent 50%)',
        }}
      />

      {/* Animated grid */}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: [0.035, 0.07, 0.035] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          backgroundImage:
            'linear-gradient(rgba(14,165,233,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.5) 1px, transparent 1px)',
          backgroundSize: '52px 52px',
          maskImage:
            'radial-gradient(ellipse 90% 70% at 50% 0%, black 20%, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 90% 70% at 50% 0%, black 20%, transparent 75%)',
        }}
      />

      {/* Diagonal accent lines */}
      <motion.div
        className="absolute inset-0 opacity-[0.025]"
        animate={{ opacity: [0.02, 0.04, 0.02] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, rgba(14,165,233,1) 0px, rgba(14,165,233,1) 1px, transparent 0, transparent 50%)',
          backgroundSize: '60px 60px',
          maskImage:
            'radial-gradient(ellipse 60% 40% at 80% 30%, black, transparent)',
          WebkitMaskImage:
            'radial-gradient(ellipse 60% 40% at 80% 30%, black, transparent)',
        }}
      />

      {/* Floating gradient orbs */}
      {orbs.map((orb, i) => (
        <div
          key={i}
          className={`absolute ${orb.className} rounded-full blur-[80px]`}
          style={{
            background: orb.gradient,
            animation: `${orb.animation} ${orb.duration} ease-in-out infinite`,
            animationDelay: `${i * 2}s`,
          }}
        />
      ))}

      {/* Mouse-follow premium spotlight */}
      <div
        className="absolute inset-0 transition-all duration-700 ease-out"
        style={{
          background:
            'radial-gradient(700px circle at var(--mouse-x) var(--mouse-y), rgba(59,130,246,0.07), rgba(6,182,212,0.03) 40%, transparent 60%)',
        }}
      />

      {/* Secondary spotlight ring */}
      <div
        className="absolute inset-0 transition-all duration-1200 ease-out"
        style={{
          background:
            'radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(14,165,233,0.04), transparent 50%)',
        }}
      />

      {/* Top gradient wash */}
      <div className="absolute inset-x-0 top-0 h-[700px] bg-gradient-to-b from-blue-50/70 via-sky-50/30 to-transparent" />

      {/* Bottom gradient wash */}
      <div className="absolute inset-x-0 bottom-0 h-[400px] bg-gradient-to-t from-white/80 to-transparent" />

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
            background: `radial-gradient(circle, rgba(14,165,233,${p.opacity}), rgba(59,130,246,${p.opacity * 0.6}))`,
            boxShadow: `0 0 ${parseInt(p.size) * 3}px rgba(14,165,233,${p.opacity * 0.8})`,
            animation: `particle-float ${p.dur} linear infinite`,
            animationDelay: p.delay,
          }}
        />
      ))}

      {/* Shimmer sweep */}
      <motion.div
        className="absolute inset-0"
        initial={{ x: '-100%', opacity: 0 }}
        animate={{ x: '200%', opacity: [0, 0.04, 0] }}
        transition={{ duration: 8, repeat: Infinity, repeatDelay: 12, ease: 'linear' }}
        style={{
          background:
            'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.6) 50%, transparent 70%)',
          width: '60%',
        }}
      />
    </div>
  );
}
