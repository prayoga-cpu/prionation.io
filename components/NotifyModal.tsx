"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { m } from "framer-motion";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { Icon } from "./icons";
import { Btn, Eyebrow } from "./ui/Atoms";
import { scaleIn, backdrop } from "@/lib/motion";
import { formatEmail } from "@/lib/forms/format";
import { trackEvent } from "@/lib/analytics/events";
import { getAttribution } from "@/lib/analytics/attribution";

const isDev = process.env.NODE_ENV !== "production";
const securityEnabled = process.env.NEXT_PUBLIC_SECURITY_ENABLED !== "false";

// "launch" is the original AI-Consultation launch waitlist (default, unchanged).
// "fable5" captures premium-model interest: the consultation runs on Opus 4.8,
// and the locked Claude Fable 5 option routes here instead of calling any API.
type NotifyVariant = "launch" | "fable5";

const COPY: Record<
  NotifyVariant,
  { eyebrow: string; heading: string; body: string; doneNote: string; sourceFeature: string }
> = {
  launch: {
    eyebrow: "COMING AUGUST 2026",
    heading: "AI Consultation",
    body:
      "AI Consultation goes live in August 2026. What you just ran is an early prototype — a preview of how the real diagnostic will work. Leave your email and we'll ping you the moment it's ready.",
    doneNote: "the moment AI Consultation is live.",
    sourceFeature: "AI Consultation",
  },
  fable5: {
    eyebrow: "PREMIUM ACCESS",
    heading: "Claude Fable 5",
    body:
      "The consultation currently runs on Claude Opus 4.8. Claude Fable 5 — Anthropic's most capable model — is planned as a premium option. Leave your email and we'll notify you when Fable 5 access opens.",
    doneNote: "when Claude Fable 5 access opens.",
    sourceFeature: "AI Consultation — Claude Fable 5",
  },
};

export function NotifyModal({
  onClose,
  variant = "launch",
}: {
  onClose: () => void;
  variant?: NotifyVariant;
}) {
  const copy = COPY[variant];
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [apiError, setApiError] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [turnstileToken, setTurnstileToken] = useState(!securityEnabled || isDev ? "dev-bypass" : "");
  const turnstileRef = useRef<TurnstileInstance>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const validateEmail = (e: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const submit = async () => {
    if (!validateEmail(email)) { setError(true); return; }
    setError(false);
    setApiError("");
    setLoading(true);
    try {
      const res = await fetch("/api/forms/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "waitlist",
          email,
          sourceFeature: copy.sourceFeature,
          turnstileToken,
          honeypot,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setApiError(data.error ?? "Submission failed. Please try again.");
        turnstileRef.current?.reset();
        setTurnstileToken(isDev ? "dev-bypass" : "");
        return;
      }
      trackEvent("waitlist_submit", { sourceFeature: copy.sourceFeature, channel: getAttribution().channel ?? "unknown" });
      setDone(true);
    } catch {
      setApiError("Network error. Please try again.");
      turnstileRef.current?.reset();
      setTurnstileToken(isDev ? "dev-bypass" : "");
    } finally {
      setLoading(false);
    }
  };

  // Portalled to <body> (mirrors DiagShell in Hero.tsx) so this fixed-position
  // modal escapes any ancestor stacking context (e.g. Hero's `relative z-[4]`
  // wrapper) instead of being capped beneath it.
  if (typeof document === "undefined") return null;
  return createPortal(
    <>
      {/* Backdrop */}
      <m.div
        key="notify-backdrop"
        variants={backdrop}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed inset-0 z-[120] bg-[rgba(8,9,13,0.75)] backdrop-blur-[6px]"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Card */}
      <div className="fixed inset-0 z-[121] flex items-center justify-center p-6 pointer-events-none">
        <m.div
          key="notify-card"
          variants={scaleIn}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="w-full max-w-[480px] bg-card rounded-[20px] p-[32px_28px] border border-line pn-ring-wrap pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start justify-between gap-4 mb-5 relative z-20">
            <div>
              <Eyebrow className="whitespace-nowrap !text-[8px] sm:!text-[10px]">{copy.eyebrow}</Eyebrow>
              <h3 className="font-sans font-extrabold text-[22px] tracking-[-0.018em] text-white mt-3 mb-0">
                {copy.heading}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="bg-transparent border-0 text-muted p-1.5 cursor-pointer transition-colors duration-fast hover:text-white"
              aria-label="Close"
            >
              <Icon name="x" size={18} />
            </button>
          </div>

          {/* Honeypot */}
          <input
            type="text"
            name="_hp"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{ display: "none" }}
          />

          {!done ? (
            <>
              <p className="text-soft text-[14px] leading-[1.6] mb-5 mx-0 mt-0 relative z-20">
                {copy.body}
              </p>
              <input
                type="email"
                aria-label="Email address"
                value={email}
                onChange={(e) => { setEmail(formatEmail(e.target.value)); if (error) setError(false); if (apiError) setApiError(""); }}
                placeholder="you@company.com"
                className={`w-full bg-transparent text-white font-sans text-[15px] py-3 border-0 border-b rounded-none outline-none transition-colors duration-fast placeholder:text-muted focus:border-accent relative z-20 ${error ? "border-accent" : "border-line-soft"}`}
                onKeyDown={(e) => e.key === "Enter" && submit()}
              />
              {error && (
                <div className="mt-2 font-pixel text-[9px] tracking-[0.14em] text-accent uppercase relative z-20">
                  Please enter a valid email address.
                </div>
              )}
              {apiError && (
                <div className="mt-2 font-pixel text-[9px] tracking-[0.14em] text-accent uppercase relative z-20">
                  {apiError}
                </div>
              )}

              {securityEnabled && !isDev && (
                <Turnstile
                  ref={turnstileRef}
                  siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                  options={{ size: "invisible" }}
                  onSuccess={(token) => setTurnstileToken(token)}
                />
              )}

              <div className="mt-6 flex justify-end gap-3 relative z-20">
                <Btn variant="text" onClick={onClose}>Cancel</Btn>
                <Btn variant="primary" onClick={submit} disabled={loading || (securityEnabled && !isDev && !turnstileToken)}>
                  {loading ? "Sending…" : <>Notify me <span className="text-[12px] opacity-80">→</span></>}
                </Btn>
              </div>
            </>
          ) : (
            <m.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-soft text-[14px] leading-[1.6] mb-5 mx-0 mt-0 relative z-20"
            >
              Done — we&apos;ll email{" "}
              <span className="text-accent">{email}</span> {copy.doneNote}
            </m.p>
          )}
        </m.div>
      </div>
    </>,
    document.body,
  );
}
