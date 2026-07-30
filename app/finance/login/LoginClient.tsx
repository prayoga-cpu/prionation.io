"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { OtpForm } from "../components/OtpForm";
import { TeamRoleCard, FINANCE_TEAM, type TeamMember } from "../components/TeamRoleCard";
import type { FinanceRole } from "@/lib/finance/auth/otp";

type Step = "picking" | "focused" | "otp";

const ERROR_COPY: Record<string, string> = {
  rate_limited: "Too many requests for this role. Try again in a few minutes.",
  email_failed: "Couldn't send the email. Try again shortly.",
  invalid_code: "Invalid or expired code.",
  locked_out: "Too many failed attempts. Request a new code.",
  generic: "Something went wrong. Try again.",
};

export function LoginClient() {
  const [step, setStep] = useState<Step>("picking");
  const [role, setRole] = useState<FinanceRole | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selected: TeamMember | null = FINANCE_TEAM.find((m) => m.role === role) ?? null;

  function pick(r: FinanceRole) {
    if (step !== "picking") return;
    setRole(r);
    setStep("focused");
  }

  function backToPicking() {
    setStep("picking");
    setRole(null);
    setError(null);
  }

  async function requestOtp(r: FinanceRole) {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/finance/auth/request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: r }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(ERROR_COPY[data.error] ?? ERROR_COPY.generic);
        setBusy(false);
        return;
      }
      setStep("otp");
    } catch {
      setError(ERROR_COPY.generic);
    } finally {
      setBusy(false);
    }
  }

  async function verifyOtp(code: string) {
    if (!role) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/finance/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, code }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(ERROR_COPY[data.error] ?? ERROR_COPY.generic);
        setBusy(false);
        return;
      }
      window.location.href = "/finance";
    } catch {
      setError(ERROR_COPY.generic);
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-16 overflow-hidden">
      <div className="w-full max-w-[420px] flex flex-col items-center">
        <div className="mb-10 text-center">
          <p className="font-pixel text-[9px] tracking-[0.15em] text-accent uppercase mb-3">
            Internal · Finance
          </p>
          <h1 className="font-sans text-2xl font-bold text-white">
            PRIONATION<span className="text-accent">.</span>io
          </h1>
        </div>

        {step !== "otp" && (
          <div className="relative w-[260px] h-[340px] mb-8" style={{ perspective: 1000 }}>
            {FINANCE_TEAM.map((m, i) => {
              const isSelected = role === m.role;
              const isFocused = step === "focused";
              const stacked = { x: i === 0 ? -16 : 16, y: i === 0 ? 0 : 14, rotate: i === 0 ? -7 : 7, scale: i === 0 ? 1 : 0.94, opacity: 1, zIndex: i === 0 ? 2 : 1 };
              const focusedSelf = { x: 0, y: 0, rotate: 0, scale: 1.06, opacity: 1, zIndex: 10 };
              const focusedOther = { x: 0, y: 36, rotate: 0, scale: 0.86, opacity: 0, zIndex: 1 };

              return (
                <motion.button
                  key={m.role}
                  type="button"
                  onClick={() => pick(m.role)}
                  animate={isFocused ? (isSelected ? focusedSelf : focusedOther) : stacked}
                  transition={{ type: "spring", stiffness: 260, damping: 24 }}
                  whileHover={step === "picking" ? { y: (i === 0 ? 0 : 14) - 6 } : undefined}
                  className="absolute inset-0"
                  style={{
                    transformOrigin: "center",
                    pointerEvents: isFocused && !isSelected ? "none" : "auto",
                    cursor: step === "picking" ? "pointer" : "default",
                  }}
                  aria-label={`Sign in as ${m.jobTitle}`}
                >
                  <TeamRoleCard member={m} />
                </motion.button>
              );
            })}
          </div>
        )}

        {step === "focused" && selected && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.25 }}
            className="w-full flex flex-col items-center gap-3"
          >
            <button
              type="button"
              onClick={() => requestOtp(selected.role)}
              disabled={busy}
              className="w-full bg-accent text-white font-sans font-semibold text-sm rounded-full py-3 transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {busy ? "Sending code…" : `Continue as ${selected.jobTitle}`}
            </button>
            <button
              type="button"
              onClick={backToPicking}
              disabled={busy}
              className="font-sans text-[12px] text-muted hover:text-white transition-colors disabled:opacity-40"
            >
              ← Choose someone else
            </button>
            {error && (
              <p className="text-[13px] text-red-400 text-center" role="alert">
                {error}
              </p>
            )}
          </motion.div>
        )}

        {step === "otp" && selected && (
          <OtpForm
            inboxLabel={`the ${selected.jobTitle} inbox`}
            busy={busy}
            error={error}
            onSubmit={verifyOtp}
            onResend={() => requestOtp(selected.role)}
            onBack={() => {
              setStep("focused");
              setError(null);
            }}
          />
        )}
      </div>
    </div>
  );
}
