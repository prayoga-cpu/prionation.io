"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { Link } from "@/i18n/routing";
import { adRef, beaconTap } from "@/lib/analytics/beacon";
import { CONTACT_EMAIL, PHONE_DISPLAY_FR, PHONE_TEL, WHATSAPP_DISPLAY } from "@/lib/seo/site";
import { CONTACT_SHEET_EVENT, TelLink } from "./ContactLinks";

const isDev = process.env.NODE_ENV !== "production";
const securityEnabled = process.env.NEXT_PUBLIC_SECURITY_ENABLED !== "false";
const needsTurnstile = securityEnabled && !isDev;

const SLOTS = ["asap", "tomorrow_morning", "tomorrow_afternoon"] as const;

type Status = "idle" | "sending" | "sent" | "error" | "invalid";

// "Joindre Evan autrement": phone, copy number, e-mail and a call-back request.
// For visitors who won't or can't use WhatsApp (desktop, no app, prefer a call).
// One instance per page; any CallbackButton opens it via CONTACT_SHEET_EVENT.
// The call-back form posts to /api/forms/callback (Notion + team e-mail).
export function ContactSheet({ locale }: { locale: string }) {
  const t = useTranslations("Sales.contact");
  const slotLabels = t.raw("slots") as string[];
  const phoneDisplay = locale === "fr" ? PHONE_DISPLAY_FR : WHATSAPP_DISPLAY;

  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("sheet");
  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ firstName: "", phone: "", company: "", slot: "asap" as (typeof SLOTS)[number], honeypot: "" });
  const [turnstileToken, setTurnstileToken] = useState(needsTurnstile ? "" : "dev-bypass");
  const turnstileRef = useRef<TurnstileInstance>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    setOpen(false);
    returnFocus.current?.focus?.();
  }, []);

  useEffect(() => {
    const onOpen = (e: Event) => {
      returnFocus.current = document.activeElement as HTMLElement | null;
      setPlacement((e as CustomEvent<{ placement?: string }>).detail?.placement ?? "sheet");
      setStatus((s) => (s === "sent" ? s : "idle"));
      setOpen(true);
    };
    window.addEventListener(CONTACT_SHEET_EVENT, onOpen);
    return () => window.removeEventListener(CONTACT_SHEET_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    panelRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close]);

  const copyNumber = async () => {
    try {
      await navigator.clipboard.writeText(PHONE_TEL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      /* clipboard refused: the number is visible on the call button */
    }
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.firstName.trim() || form.phone.replace(/\D/g, "").length < 6) {
      setStatus("invalid");
      return;
    }
    setStatus("sending");
    const params = new URLSearchParams(window.location.search);
    const ref = adRef();
    try {
      const res = await fetch("/api/forms/callback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "callback",
          firstName: form.firstName.trim(),
          phone: form.phone.trim(),
          company: form.company.trim(),
          slot: form.slot,
          locale,
          placement,
          ref: ref === "O" ? undefined : ref,
          utmCampaign: params.get("utm_campaign") ?? undefined,
          utmContent: params.get("utm_content") ?? undefined,
          turnstileToken: turnstileToken || "missing",
          honeypot: form.honeypot,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
    } catch {
      setStatus("error");
      turnstileRef.current?.reset();
      setTurnstileToken(needsTurnstile ? "" : "dev-bypass");
    }
  };

  if (!open) return null;

  const field =
    "w-full min-h-[46px] rounded-xl bg-bg border border-line-soft px-3.5 text-[16px] text-white placeholder:text-muted focus:outline-none focus:border-accent";
  const action =
    "flex items-center justify-center gap-2 w-full min-h-[48px] rounded-full border border-line-soft bg-white/5 text-white text-[15px] font-semibold hover:bg-white/10 transition-colors";

  return (
    <div className="fixed inset-0 z-[350] flex items-end md:items-center justify-center">
      <button type="button" aria-label={t("close")} onClick={close} className="absolute inset-0 bg-black/70 cursor-default" />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-sheet-title"
        tabIndex={-1}
        className="relative w-full md:max-w-[460px] max-h-[92vh] overflow-y-auto bg-card border border-line-soft rounded-t-[24px] md:rounded-[24px] px-5 pt-5 pb-[calc(20px+env(safe-area-inset-bottom,0px))] flex flex-col gap-4 focus:outline-none"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h2 id="contact-sheet-title" className="m-0 text-[20px] font-extrabold">
              {t("title")}
            </h2>
            <p className="m-0 text-soft text-[14px]">{t("intro")}</p>
          </div>
          <button type="button" onClick={close} aria-label={t("close")} className="shrink-0 w-10 h-10 rounded-full border border-line-soft text-soft hover:text-white">
            ✕
          </button>
        </div>

        <div className="flex flex-col gap-2.5">
          <TelLink placement="sheet" locale={locale} className={action}>
            {t("call", { phone: phoneDisplay })}
          </TelLink>
          <button type="button" onClick={copyNumber} className={action}>
            {copied ? t("copied") : t("copy")}
          </button>
          <a href={`mailto:${CONTACT_EMAIL}`} onClick={() => beaconTap("mail", "sheet", locale)} className={action}>
            {t("email", { email: CONTACT_EMAIL })}
          </a>
        </div>

        <div className="h-px bg-line-soft" />

        {status === "sent" ? (
          <p role="status" className="m-0 rounded-xl bg-[rgba(88,242,135,0.08)] border border-[rgba(88,242,135,0.3)] p-4 text-[15px] text-white">
            {t("success")}
          </p>
        ) : (
          <form onSubmit={submit} className="flex flex-col gap-3" noValidate>
            <h3 className="m-0 text-[16px] font-bold">{t("callbackTitle")}</h3>
            <label className="flex flex-col gap-1.5 text-[13px] text-soft">
              {t("firstName")}
              <input
                id="cb-first-name"
                className={field}
                autoComplete="given-name"
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                required
              />
            </label>
            <label className="flex flex-col gap-1.5 text-[13px] text-soft">
              {t("phone")}
              <input
                id="cb-phone"
                className={field}
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
              />
            </label>
            <label className="flex flex-col gap-1.5 text-[13px] text-soft">
              {t("company")}
              <input
                id="cb-company"
                className={field}
                autoComplete="organization"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
              />
            </label>
            <label className="flex flex-col gap-1.5 text-[13px] text-soft">
              {t("slot")}
              <select
                id="cb-slot"
                className={field}
                value={form.slot}
                onChange={(e) => setForm({ ...form, slot: e.target.value as (typeof SLOTS)[number] })}
              >
                {SLOTS.map((s, i) => (
                  <option key={s} value={s}>
                    {slotLabels[i]}
                  </option>
                ))}
              </select>
            </label>
            {/* Honeypot: hidden from people, filled by naive bots. */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
              value={form.honeypot}
              onChange={(e) => setForm({ ...form, honeypot: e.target.value })}
            />
            {needsTurnstile && (
              <Turnstile
                ref={turnstileRef}
                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                options={{ size: "invisible" }}
                onSuccess={(token) => setTurnstileToken(token)}
              />
            )}
            {status === "invalid" && <p className="m-0 text-[14px] text-[#ff8379]">{t("invalid")}</p>}
            {status === "error" && <p className="m-0 text-[14px] text-[#ff8379]">{t("error", { phone: phoneDisplay })}</p>}
            <button
              type="submit"
              disabled={status === "sending" || (needsTurnstile && !turnstileToken)}
              className="w-full min-h-[52px] rounded-full bg-accent text-white text-[16px] font-bold disabled:opacity-60"
            >
              {status === "sending" ? t("sending") : t("submit")}
            </button>
            <p className="m-0 text-[12.5px] text-muted leading-[1.5]">
              {t("notice")}{" "}
              <Link href="/privacy" className="underline underline-offset-2 text-soft">
                {t("privacy")}
              </Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
