'use client';

import React from 'react';
import { Dot } from './Typography';

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
