'use client';

import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  showText?: boolean;
  textClassName?: string;
}

export default function Logo({
  className,
  showText = true,
  textClassName,
}: LogoProps) {
  return (
    <Link href="/" className={cn('flex items-center gap-2.5 group', className)}>
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl blur-md opacity-60 group-hover:opacity-80 transition-opacity" />
        <div className="relative w-9 h-9 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
          <ShieldCheck className="w-5 h-5 text-white" strokeWidth={2.5} />
        </div>
      </div>
      {showText && (
        <div className={cn('flex flex-col leading-none', textClassName)}>
          <span className="font-bold text-lg text-slate-900 tracking-tight">
            ShieldAI
          </span>
          <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase">
            by Tahir Labs
          </span>
        </div>
      )}
    </Link>
  );
}
