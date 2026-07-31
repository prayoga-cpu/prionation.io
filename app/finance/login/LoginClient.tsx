"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import { OtpForm } from "../components/OtpForm";
import { PillLogo } from "../components/PillLogo";
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

const EASE = [0.4, 0, 0.2, 1] as const; // slow, deliberate easeInOut
const SLOW = { duration: 0.7, ease: EASE };

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d={direction === "left" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function LoginClient() {
  const [step, setStep] = useState<Step>("picking");
  const [deckIndex, setDeckIndex] = useState(0);
  const [role, setRole] = useState<FinanceRole | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selected: TeamMember | null = FINANCE_TEAM.find((m) => m.role === role) ?? null;

  // Guards against the drag gesture also registering as a tap — without
  // this, a swipe attempt that falls short of the 70px cycle threshold
  // could still fire onTap and select the card the user was only browsing.
  const dragOffsetRef = useRef(0);

  function cycle(dir: 1 | -1) {
    setDeckIndex((prev) => (prev + dir + FINANCE_TEAM.length) % FINANCE_TEAM.length);
  }

  function handleDrag(_e: unknown, info: PanInfo) {
    dragOffsetRef.current = info.offset.x;
  }

  function handleDragEnd(_e: unknown, info: PanInfo) {
    if (Math.abs(info.offset.x) > 70) cycle(info.offset.x > 0 ? -1 : 1);
    // Tap fires right after drag-end; clear on a short delay so it can
    // still see a non-zero offset and reject a stray tap.
    setTimeout(() => {
      dragOffsetRef.current = 0;
    }, 100);
  }

  function pick(m: TeamMember, isFront: boolean) {
    if (!isFront || Math.abs(dragOffsetRef.current) > 4) return;
    setRole(m.role);
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
        <AnimatePresence mode="wait">
          {step === "picking" && (
            <motion.div
              key="header"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={SLOW}
              className="mb-10 text-center"
            >
              <p className="font-pixel text-[9px] tracking-[0.15em] text-accent uppercase mb-3">
                Internal · Finance
              </p>
              <div className="flex justify-center">
                <PillLogo />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {step === "picking" && (
            <motion.div
              key="deck"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={SLOW}
              className="flex items-center gap-5"
            >
              <button
                type="button"
                onClick={() => cycle(-1)}
                aria-label="Previous"
                className="text-muted hover:text-white transition-colors shrink-0 p-2"
              >
                <ChevronIcon direction="left" />
              </button>

              <div className="relative w-[260px] h-[340px] shrink-0">
                {FINANCE_TEAM.map((m, i) => {
                  const isFront = i === deckIndex;
                  return (
                    <motion.div
                      key={m.role}
                      drag={isFront ? "x" : false}
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.7}
                      onDrag={handleDrag}
                      onDragEnd={handleDragEnd}
                      onTap={() => pick(m, isFront)}
                      animate={
                        isFront
                          ? { x: 0, y: 0, rotate: 0, scale: 1, zIndex: 2 }
                          : { x: 16, y: 14, rotate: 7, scale: 0.94, zIndex: 1 }
                      }
                      transition={{ ...SLOW, duration: 0.6 }}
                      className="absolute inset-0"
                      style={{ cursor: isFront ? "grab" : "default", touchAction: "pan-y" }}
                      whileTap={isFront ? { cursor: "grabbing" } : undefined}
                    >
                      <TeamRoleCard member={m} />
                    </motion.div>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => cycle(1)}
                aria-label="Next"
                className="text-muted hover:text-white transition-colors shrink-0 p-2"
              >
                <ChevronIcon direction="right" />
              </button>
            </motion.div>
          )}

          {step === "focused" && selected && (
            <motion.div
              key="focused"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={SLOW}
              className="w-full flex flex-col items-center gap-4"
            >
              <div className="w-full h-[520px]">
                <TeamRoleCard member={selected} large />
              </div>
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
            <motion.div
              key="otp"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={SLOW}
              className="w-full"
            >
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
