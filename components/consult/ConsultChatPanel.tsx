"use client";

// Full-page AI Consultation chat for /[locale]/consult. Shares the chat brain
// (useConsultChat) with the Hero terminal; the markup here is written fresh
// with theme tokens for a taller, page-level layout.

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence } from "framer-motion";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { Link } from "@/i18n/routing";
import { useConsultChat, consultErrorKey } from "@/hooks/useConsultChat";
import { ModelPicker } from "@/components/consult/ModelPicker";
import { NotifyModal } from "@/components/NotifyModal";
import { trackEvent } from "@/lib/analytics/events";

// Same security gating as NotifyModal / DiagnosticForm.
const isDev = process.env.NODE_ENV !== "production";
const securityEnabled = process.env.NEXT_PUBLIC_SECURITY_ENABLED !== "false";

export function ConsultChatPanel() {
  const t = useTranslations("Consult");
  const locale = useLocale();
  const consult = useConsultChat({ locale, surface: "page" });
  const [draft, setDraft] = useState("");
  const [turnstileToken, setTurnstileToken] = useState(!securityEnabled || isDev ? "dev-bypass" : "");
  const turnstileRef = useRef<TurnstileInstance>(null);
  const [fableOpen, setFableOpen] = useState(false);
  const transcriptRef = useRef<HTMLDivElement>(null);

  const lastMsg = consult.messages[consult.messages.length - 1];
  const thinking =
    consult.status === "streaming" &&
    (!lastMsg || lastMsg.role !== "ai" || lastMsg.text === "");
  const displayMsgs = [
    { role: "ai" as const, text: t("greeting") },
    ...consult.messages.filter((mm) => !(mm.role === "ai" && mm.text === "")),
  ];

  useEffect(() => {
    const el = transcriptRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [consult.messages, thinking]);

  const { lastFailedText } = consult;

  // A failed turn is rolled back by the hook — restore the text into the input.
  useEffect(() => {
    if (lastFailedText) setDraft((d) => d || lastFailedText);
  }, [lastFailedText]);

  // Turnstile is required on every turn (tokens are single-use — see doSend).
  const awaitingToken = securityEnabled && !isDev && !turnstileToken;
  const canSend =
    !!draft.trim() && consult.status !== "streaming" && !consult.limitReached && !awaitingToken;

  const doSend = () => {
    const d = draft.trim();
    if (!canSend || !d) return;
    setDraft("");
    const usedToken = turnstileToken;
    // Mint a fresh token for the next turn in parallel with this request —
    // Turnstile tokens are single-use, so re-sending the same one would 403.
    if (securityEnabled && !isDev) {
      setTurnstileToken("");
      turnstileRef.current?.reset();
    }
    void consult.send(d, usedToken);
  };

  const storeHandoff = () => {
    try {
      sessionStorage.setItem("pn_consult_summary", consult.transcriptText());
    } catch {
      /* storage unavailable — handoff still works, summary just isn't carried */
    }
    trackEvent("consult_handoff_click", { surface: "page" });
  };

  const showHandoff =
    (consult.turnsUsed >= 3 || consult.limitReached) && consult.status !== "streaming";

  return (
    <div className="w-full max-w-[760px] mx-auto bg-card border border-line rounded-[20px] overflow-hidden text-left">
      {/* terminal chrome */}
      <div className="flex items-center gap-2.5 px-4 py-3 bg-card-soft border-b border-line">
        <span className="w-[11px] h-[11px] rounded-full bg-[#ed4245]" />
        <span className="w-[11px] h-[11px] rounded-full bg-[#f7de52]" />
        <span className="w-[11px] h-[11px] rounded-full bg-[#58f287]" />
        <span className="font-pixel text-[9px] tracking-[0.06em] text-muted ml-2">
          consultation.log
        </span>
        <span className="ml-auto font-pixel text-[8px] tracking-[0.1em] text-muted uppercase">
          {t("turn_counter", { used: consult.turnsUsed, max: consult.turnsMax })}
        </span>
      </div>

      {/* transcript */}
      <div
        ref={transcriptRef}
        className="flex flex-col gap-3 px-4 sm:px-6 py-5 h-[46vh] min-h-[300px] max-h-[520px] overflow-y-auto"
      >
        {displayMsgs.map((mm, i) => {
          const u = mm.role === "user";
          return (
            <div key={i} className={`flex ${u ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[84%] px-3.5 py-2.5 rounded-[13px] text-[14px] leading-normal whitespace-pre-wrap ${
                  u
                    ? "bg-accent text-white rounded-br-[4px]"
                    : "bg-card-soft text-soft border border-line rounded-bl-[4px]"
                }`}
              >
                {mm.text}
              </div>
            </div>
          );
        })}
        {thinking && (
          <div className="flex items-center gap-2 px-1 text-soft text-[13px]">
            <span className="w-[6px] h-[6px] rounded-full bg-accent animate-pulse" />
            {t("thinking")}
          </div>
        )}
        {(consult.error || consult.notice) && (
          <div className="font-pixel text-[8px] tracking-[0.12em] text-accent uppercase leading-relaxed px-1">
            {consult.error
              ? t(consultErrorKey(consult.error))
              : t(consult.notice === "refusal" ? "error_refusal" : "error_truncated")}
          </div>
        )}
        {showHandoff && (
          <div className="mt-1 bg-accent-10 border border-accent rounded-[14px] p-4">
            <div className="font-sans font-bold text-[15px] text-fg mb-1">{t("handoff_title")}</div>
            <p className="text-soft text-[13px] leading-relaxed m-0 mb-3">{t("handoff_body")}</p>
            <Link
              href="/#engage?tab=diagnostic"
              onClick={storeHandoff}
              className="inline-flex items-center gap-2 bg-accent text-white font-sans font-bold text-[13px] rounded-[10px] px-4 py-2 no-underline"
            >
              {t("handoff_cta")} <span className="text-[11px] opacity-80">→</span>
            </Link>
          </div>
        )}
        {consult.limitReached && (
          <div className="text-muted text-[12px] px-1">{t("limit_reached")}</div>
        )}
      </div>

      {/* composer */}
      <div className="px-4 sm:px-6 pb-4">
        <div className="bg-card-soft border border-line rounded-[14px] px-3.5 pt-3.5 pb-2.5">
          <input
            aria-label={t("input_placeholder")}
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                doSend();
              }
            }}
            placeholder={t("input_placeholder")}
            disabled={consult.limitReached}
            className="w-full bg-transparent border-0 text-fg font-sans text-[14px] h-6 outline-none placeholder:text-muted disabled:opacity-50"
          />
          <div className="flex items-center gap-2.5 mt-2.5">
            <ModelPicker
              opusLabel={t("model_opus")}
              fableLabel={t("model_fable5")}
              lockedNote={t("model_locked_note")}
              onFable5Click={() => {
                trackEvent("consult_fable5_waitlist_click", { surface: "page" });
                setFableOpen(true);
              }}
            />
            <div className="ml-auto flex items-center gap-2">
              {consult.messages.length > 0 && consult.status !== "streaming" && (
                <button
                  type="button"
                  onClick={() => consult.reset()}
                  className="bg-transparent border-0 text-muted font-sans text-[12px] cursor-pointer hover:text-soft transition-colors duration-fast"
                >
                  {t("new_chat")}
                </button>
              )}
              {consult.status === "streaming" ? (
                <button
                  type="button"
                  onClick={() => consult.stop()}
                  title={t("stop")}
                  className="flex items-center justify-center w-[42px] h-[42px] bg-transparent border border-line-soft rounded-[11px] text-soft cursor-pointer"
                >
                  <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
                    <rect x="5" y="5" width="14" height="14" rx="2.5" />
                  </svg>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={doSend}
                  disabled={!canSend}
                  className={`flex items-center gap-2 h-[42px] rounded-[11px] font-sans font-bold text-[14px] transition-all duration-fast ${
                    canSend
                      ? "px-4 bg-accent text-white cursor-pointer"
                      : "w-[42px] justify-center bg-accent-10 text-white/35 cursor-default"
                  }`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  >
                    <path d="M5 3.5 L19.5 12 L5 20.5 Z" />
                  </svg>
                  {canSend && <span>{t("send")}</span>}
                </button>
              )}
            </div>
          </div>
        </div>
        <p className="text-muted text-[11px] leading-relaxed mt-2.5 mb-0 px-1">{t("disclaimer")}</p>
        {securityEnabled && !isDev && (
          <Turnstile
            ref={turnstileRef}
            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
            options={{ size: "invisible" }}
            onSuccess={(token) => setTurnstileToken(token)}
          />
        )}
      </div>

      {/* Fable 5 premium ask → waitlist capture (no API call, no payment yet) */}
      <AnimatePresence>
        {fableOpen && <NotifyModal variant="fable5" onClose={() => setFableOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}
