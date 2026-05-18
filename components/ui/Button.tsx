'use client';

import React from 'react';

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
