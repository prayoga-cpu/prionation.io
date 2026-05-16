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

export function SectionHead({
  n,
  label,
  title,
  link,
}: {
  n: string;
  label: string;
  title: React.ReactNode;
  link?: string;
}) {
  return (
    <div className="flex justify-between items-end gap-8 mb-14 flex-wrap">
      <div className="max-w-3xl">
        <div className="text-muted font-pixel text-[10px] tracking-[0.15em] mb-4 flex items-center gap-2.5 uppercase">
          <Dot className="shadow-[0_0_10px_var(--c-accent)]" />
          {n} · {label}
        </div>
        <h2 className="font-sans font-extrabold text-[clamp(32px,4.2vw,54px)] leading-[1.02] tracking-[-0.03em] m-0 max-w-[22ch] text-balance text-white">{title}</h2>
      </div>
      {link && (
        <span className="text-[13px] text-soft inline-flex items-center gap-2 border-b border-line-soft pb-1 transition-colors duration-fast hover:text-white hover:border-white">
          {link} <span aria-hidden="true">→</span>
        </span>
      )}
    </div>
  );
}

export function Btn({
  children,
  variant = 'primary',
  onClick,
  className = '',
  type = 'button',
  disabled = false,
}: {
  children: React.ReactNode;
  variant?: 'primary' | 'ghost' | 'text';
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
}) {
  const baseClasses = `inline-flex items-center gap-2.5 rounded-full font-sans font-semibold text-sm transition-all duration-fast whitespace-nowrap ${
    disabled 
      ? 'opacity-50 cursor-not-allowed pointer-events-none' 
      : 'cursor-pointer hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.99]'
  }`;
  
  const variants = {
    primary: 'px-[22px] py-[13px] bg-white text-[#08090d] hover:bg-[#e6e6f0]',
    ghost: 'px-[22px] py-[13px] bg-white/5 text-white border border-white/10 hover:bg-white/10',
    text: 'bg-transparent text-muted px-[18px] py-[12px] hover:text-white'
  };

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${baseClasses} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}
