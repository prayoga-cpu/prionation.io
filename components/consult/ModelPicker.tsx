"use client";

// Model selector for the AI Consultation chat. Opus 4.8 is the live model;
// "Claude Fable 5" is a locked premium option — clicking it never switches
// models or calls the API, it hands off to the waitlist capture (NotifyModal
// variant="fable5") via onFable5Click.

import { useEffect, useRef, useState } from "react";

type Props = {
  opusLabel: string; // e.g. "Claude Opus 4.8"
  fableLabel: string; // e.g. "Claude Fable 5"
  lockedNote: string; // e.g. "Premium — join the waitlist"
  onFable5Click: () => void;
};

export function ModelPicker({ opusLabel, fableLabel, lockedNote, onFable5Click }: Props) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // Click-outside via a document listener rather than a viewport-covering
  // `fixed` overlay — a `fixed` element is contained (and thus shrunk) by any
  // ancestor with backdrop-filter/filter/transform (Hero's `.pio-card` has
  // backdrop-filter), which silently breaks the overlay's coverage.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-[7px] bg-transparent border-0 text-soft font-sans text-[13px] font-medium cursor-pointer px-2 py-[5px] rounded-lg whitespace-nowrap hover:text-fg transition-colors duration-fast"
      >
        <span
          className="w-[6px] h-[6px] rounded-full bg-accent flex-none"
          style={{ boxShadow: "0 0 6px var(--c-accent)" }}
        />
        {opusLabel}
        <span className="text-muted text-[9px]">▾</span>
      </button>

      {open && (
        <>
          <div
            role="listbox"
            className="absolute bottom-full left-0 mb-2 z-[61] min-w-[230px] bg-card border border-line-soft rounded-xl p-1.5 shadow-xl"
          >
            <div
              role="option"
              aria-selected="true"
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5"
            >
              <span
                className="w-[6px] h-[6px] rounded-full bg-accent flex-none"
                style={{ boxShadow: "0 0 6px var(--c-accent)" }}
              />
              <span className="text-fg font-sans text-[13px] font-medium">{opusLabel}</span>
            </div>
            <button
              type="button"
              role="option"
              aria-selected="false"
              onClick={() => {
                setOpen(false);
                onFable5Click();
              }}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-transparent border-0 cursor-pointer text-left hover:bg-white/5 transition-colors duration-fast"
            >
              <svg
                viewBox="0 0 24 24"
                width="11"
                height="11"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-muted flex-none"
              >
                <rect x="4" y="10" width="16" height="11" rx="2" />
                <path d="M8 10V7a4 4 0 0 1 8 0v3" />
              </svg>
              <span className="text-soft font-sans text-[13px] font-medium">{fableLabel}</span>
              <span className="ml-auto font-pixel text-[7px] uppercase tracking-[0.12em] text-accent">
                {lockedNote}
              </span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
