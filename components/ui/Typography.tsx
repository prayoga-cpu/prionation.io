'use client';

import React from 'react';

export function Dot({ className = '' }: { className?: string }) {
  return <span className={`inline-block w-[6px] h-[6px] rounded-full bg-accent shrink-0 ${className}`} />;
}

export function Eyebrow({ children, glow = true }: { children: React.ReactNode; glow?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 font-pixel text-[10px] tracking-[0.12em] text-soft uppercase">
      <Dot className={glow ? 'shadow-[0_0_10px_var(--c-accent)]' : ''} />
      {children}
    </span>
  );
}
