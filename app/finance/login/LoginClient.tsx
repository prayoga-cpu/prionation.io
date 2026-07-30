"use client";

import { useState } from "react";
import { RoleCard } from "../components/RoleCard";
import { OtpForm } from "../components/OtpForm";

type FinanceRole = "ceo" | "cro";

const ROLE_LABEL: Record<FinanceRole, string> = {
  ceo: "Founder & CEO",
  cro: "CRO",
};

const ERROR_COPY: Record<string, string> = {
  rate_limited: "Too many requests for this role. Try again in a few minutes.",
  email_failed: "Couldn't send the email. Try again shortly.",
  invalid_code: "Invalid or expired code.",
  locked_out: "Too many failed attempts. Request a new code.",
  generic: "Something went wrong. Try again.",
};

export function LoginClient() {
  const [role, setRole] = useState<FinanceRole | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      setRole(r);
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
    <div className="min-h-screen flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-[420px]">
        <div className="mb-10 text-center">
          <p className="font-pixel text-[9px] tracking-[0.15em] text-accent uppercase mb-3">
            Internal · Finance
          </p>
          <h1 className="font-sans text-2xl font-bold text-white">
            PRIONATION<span className="text-accent">.</span>io
          </h1>
        </div>

        {!role ? (
          <div className="space-y-3">
            <RoleCard
              label={ROLE_LABEL.ceo}
              sublabel="Sign in as"
              disabled={busy}
              onClick={() => requestOtp("ceo")}
            />
            <RoleCard
              label={ROLE_LABEL.cro}
              sublabel="Sign in as"
              disabled={busy}
              onClick={() => requestOtp("cro")}
            />
            {error && (
              <p className="text-[13px] text-red-400 text-center pt-2" role="alert">
                {error}
              </p>
            )}
          </div>
        ) : (
          <OtpForm
            inboxLabel={`the ${ROLE_LABEL[role]} inbox`}
            busy={busy}
            error={error}
            onSubmit={verifyOtp}
            onResend={() => requestOtp(role)}
            onBack={() => {
              setRole(null);
              setError(null);
            }}
          />
        )}
      </div>
    </div>
  );
}
