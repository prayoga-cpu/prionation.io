"use client";

import { useState } from "react";

type Props = {
  inboxLabel: string;
  busy: boolean;
  error: string | null;
  onSubmit: (code: string) => void;
  onResend: () => void;
  onBack: () => void;
};

export function OtpForm({ inboxLabel, busy, error, onSubmit, onResend, onBack }: Props) {
  const [code, setCode] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (code.length === 6) onSubmit(code);
      }}
      className="bg-card border border-line rounded-2xl px-6 py-8"
    >
      <p className="font-pixel text-[9px] tracking-[0.15em] text-muted uppercase mb-2">
        Access code sent
      </p>
      <p className="font-sans text-sm text-soft mb-6">
        Check <span className="text-white">{inboxLabel}</span> — the code expires in 10 minutes.
      </p>

      <input
        type="text"
        inputMode="numeric"
        autoComplete="one-time-code"
        maxLength={6}
        value={code}
        onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
        placeholder="000000"
        autoFocus
        className="w-full bg-bg border border-line rounded-xl px-4 py-3 text-center font-pixel text-2xl tracking-[0.4em] text-white placeholder:text-line-soft focus:outline-none focus:border-accent-30"
      />

      {error && (
        <p className="mt-3 text-[13px] text-red-400" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={busy || code.length !== 6}
        className="mt-5 w-full bg-accent text-white font-sans font-semibold text-sm rounded-full py-3 transition-opacity hover:opacity-90 disabled:opacity-40 disabled:pointer-events-none"
      >
        {busy ? "Verifying…" : "Verify"}
      </button>

      <div className="mt-5 flex items-center justify-between text-[12px] font-sans">
        <button
          type="button"
          onClick={onBack}
          className="text-muted hover:text-white transition-colors"
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={onResend}
          disabled={busy}
          className="text-accent hover:text-white transition-colors disabled:opacity-40"
        >
          Resend code
        </button>
      </div>
    </form>
  );
}
