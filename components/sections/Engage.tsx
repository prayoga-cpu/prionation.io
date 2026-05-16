"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { Icon } from "../icons";
import { SectionHead, Btn } from "../ui/Atoms";
import { MeetUsTab } from "./engage/MeetUsTab";
import { CareersTab } from "./engage/CareersTab";
import { slideUp, backdrop, fadeUp, fadeIn } from "@/lib/motion";

const isDev = process.env.NODE_ENV !== "production";

type Tab = "Meet Us" | "Diagnostic" | "Careers";

type FormState = {
  company: string; yourName: string; email: string; basedIn: string;
  stage: string; bottleneck: string; triedSoFar: string; whyNow: string;
  budget: string; startWindow: string; source: string;
};

const EMPTY_FORM: FormState = {
  company: "", yourName: "", email: "", basedIn: "",
  stage: "", bottleneck: "", triedSoFar: "", whyNow: "",
  budget: "", startWindow: "", source: "",
};

const REQUIRED: (keyof FormState)[] = [
  "company", "yourName", "email", "basedIn", "stage",
  "bottleneck", "whyNow", "budget", "startWindow",
];

// ─── Primitives ───────────────────────────────────────────────────────────────

function FLabel({ n, children, optional, optionalLabel }: {
  n: string; children: React.ReactNode; optional?: boolean; optionalLabel?: string;
}) {
  return (
    <label className="flex items-baseline justify-between font-pixel text-[10px] tracking-[0.14em] text-soft mb-2.5 uppercase relative z-20">
      <span><span className="text-accent mr-2">/{n}</span> {children}</span>
      {optional && <span className="text-muted tracking-[0.1em] lowercase">{optionalLabel}</span>}
    </label>
  );
}

function FInput({ value, onChange, placeholder, error, type = "text" }: {
  value: string; onChange: (v: string) => void; placeholder: string; error?: boolean; type?: string;
}) {
  return (
    <input type={type} value={value} placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full bg-transparent text-white font-sans text-[15px] py-3 border-0 border-b rounded-none outline-none transition-colors duration-fast placeholder:text-muted focus:border-accent relative z-20 ${error ? "border-accent" : "border-line-soft"}`}
    />
  );
}

function FArea({ value, onChange, placeholder, error, minRows = 3 }: {
  value: string; onChange: (v: string) => void; placeholder: string; error?: boolean; minRows?: number;
}) {
  return (
    <textarea value={value} placeholder={placeholder} rows={minRows}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full bg-transparent text-white font-sans text-[15px] py-3 border-0 border-b rounded-none outline-none transition-colors duration-fast placeholder:text-muted focus:border-accent resize-y leading-[1.5] min-h-[80px] relative z-20 ${error ? "border-accent" : "border-line-soft"}`}
    />
  );
}

function FSelect({ value, onChange, options, error, placeholder }: {
  value: string; onChange: (v: string) => void; options: string[]; error?: boolean; placeholder: string;
}) {
  return (
    <div className="relative z-20">
      <select value={value} onChange={(e) => onChange(e.target.value)}
        className={`w-full bg-transparent font-sans text-[15px] py-3 border-0 border-b rounded-none outline-none transition-colors duration-fast focus:border-accent appearance-none pr-[30px] cursor-pointer ${error ? "border-accent" : "border-line-soft"} ${!value ? "text-muted" : "text-white"}`}
      >
        <option value="" disabled className="bg-card text-white">{placeholder}</option>
        {options.map((o) => <option key={o} value={o} className="bg-card text-white">{o}</option>)}
      </select>
      <span className="absolute right-0 top-1/2 -translate-y-1/2 text-muted pointer-events-none">
        <Icon name="chevron-down" size={14} />
      </span>
    </div>
  );
}

function FRadio({ value, onChange, options }: {
  value: string; onChange: (v: string) => void; options: string[];
}) {
  return (
    <div className="flex flex-wrap gap-2 mt-1.5 relative z-20">
      {options.map((o) => (
        <motion.button key={o} type="button" onClick={() => onChange(o)}
          whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          className={`px-4 py-2.5 font-sans font-medium text-[13px] border rounded-full cursor-pointer transition-all duration-fast hover:border-soft hover:text-white ${value === o ? "bg-accent border-accent text-white" : "bg-transparent border-line-soft text-soft"}`}
        >
          {o}
        </motion.button>
      ))}
    </div>
  );
}

function TabPanel({ tabKey, children }: { tabKey: string; children: React.ReactNode }) {
  return (
    <motion.div key={tabKey} variants={fadeIn} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.25 }}>
      {children}
    </motion.div>
  );
}

// ─── Main Engage component ────────────────────────────────────────────────────

export function Engage() {
  const t = useTranslations("Engage");

  const [activeTab, setActiveTab] = useState<Tab>("Diagnostic");
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [turnstileToken, setTurnstileToken] = useState(isDev ? "dev-bypass" : "");
  const turnstileRef = useRef<TurnstileInstance>(null);

  // Locale-specific option lists (kept in English for form value consistency)
  const STAGE  = ["<€1M revenue", "€1–5M", "€5–50M", "€50M+", "Not disclosed"];
  const BUDGET = ["Yes", "Need to confirm with team", "Not yet"];
  const WINDOW = ["Within 30 days", "30–90 days", "Exploring"];

  useEffect(() => {
    setMounted(true);
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash.includes("tab=meet"))           setActiveTab("Meet Us");
      else if (hash.includes("tab=careers"))   setActiveTab("Careers");
      else if (hash.includes("tab=diagnostic")) setActiveTab("Diagnostic");
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isModalOpen]);

  const u = (k: keyof FormState, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: false }));
  };

  const validate = (fields: (keyof FormState)[]) => {
    const errs: Partial<Record<keyof FormState, boolean>> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    for (const k of fields) {
      if (!form[k] || form[k].trim() === "") errs[k] = true;
    }
    if (fields.includes("email") && form.email && !emailRegex.test(form.email)) errs.email = true;
    if (fields.includes("bottleneck") && form.bottleneck && form.bottleneck.length < 100) errs.bottleneck = true;
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const submit = async () => {
    if (!validate(REQUIRED)) return;
    setLoading(true);
    try {
      const res = await fetch("/api/forms/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "intake", ...form, turnstileToken, honeypot }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrors((e) => ({ ...e, _api: true } as typeof e));
        console.error("[intake] submit error", data.error);
        turnstileRef.current?.reset();
        setTurnstileToken(isDev ? "dev-bypass" : "");
        return;
      }
      setSubmitted(true);
    } catch (err) {
      console.error("[intake] network error", err);
      turnstileRef.current?.reset();
      setTurnstileToken(isDev ? "dev-bypass" : "");
    } finally {
      setLoading(false);
    }
  };

  const ts = useTranslations("Engage.success");
  const diagnosticProps = {
    step, setStep, form, u, errors, validate, loading, submit, STAGE, BUDGET, WINDOW,
    honeypot, setHoneypot, turnstileToken, setTurnstileToken, turnstileRef,
  };

  if (submitted) {
    return (
      <section id="engage" className="relative px-page-x pt-[110px] pb-[140px] max-w-max-w mx-auto">
        <motion.div variants={fadeUp} initial="hidden" animate="visible"
          className="max-w-[720px] mx-auto bg-card rounded-[28px] p-[64px_48px] text-center bg-[radial-gradient(hsla(0,0%,100%,0.04)_1.2px,transparent_0)] bg-[size:22px_22px] pn-ring-wrap"
        >
          <motion.span
            initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.1 }}
            className="inline-flex items-center justify-center w-[56px] h-[56px] rounded-full bg-accent text-white mb-6 shadow-[0_0_0_6px_var(--c-accent-10)] relative z-20"
          >
            <Icon name="check-circle" size={20} />
          </motion.span>
          <h2 className="font-sans font-extrabold text-[clamp(28px,3.4vw,40px)] tracking-[-0.024em] leading-[1.08] text-white m-0 relative z-20">
            {ts("title")}
          </h2>
          <p className="m-[18px_auto_32px] max-w-[52ch] text-soft text-[15px] leading-[1.6] relative z-20">
            {ts("desc")}
          </p>
          <div className="flex justify-center gap-6 flex-wrap font-pixel text-[10px] tracking-[0.15em] text-muted relative z-20">
            <span>{ts("stat1_label")} · <b className="text-white font-normal">{ts("stat1_value")}</b></span>
            <span>{ts("stat2_label")} · <b className="text-white font-normal">{ts("stat2_value")}</b></span>
            <span>{ts("stat3_label")} · <b className="text-white font-normal">{ts("stat3_value")}</b></span>
          </div>
          <button
            className="mt-8 bg-transparent border-0 p-0 cursor-pointer text-soft font-sans font-semibold text-[13px] inline-flex items-center gap-2 hover:text-white relative z-20"
            onClick={() => { setSubmitted(false); setForm(EMPTY_FORM); setStep(1); }}
          >
            {ts("reset")} <span aria-hidden="true" className="text-[12px] opacity-80">→</span>
          </button>
        </motion.div>
      </section>
    );
  }

  const tabLabel = (tab: Tab) => {
    if (tab === "Meet Us") return t("tab_meet");
    if (tab === "Diagnostic") return t("tab_diagnostic");
    return t("tab_careers");
  };

  const mobileTitle = activeTab === "Careers" ? t("mobile_titles.careers") : activeTab === "Meet Us" ? t("mobile_titles.meet") : t("mobile_titles.diagnostic");
  const mobileDesc  = activeTab === "Careers" ? t("mobile_descs.careers")  : activeTab === "Meet Us" ? t("mobile_descs.meet")  : t("mobile_descs.diagnostic");
  const mobileCta   = activeTab === "Careers" ? t("mobile_ctas.careers")   : activeTab === "Meet Us" ? t("mobile_ctas.meet")   : t("mobile_ctas.diagnostic");

  return (
    <section id="engage" className="relative px-page-x pt-[110px] pb-[140px] max-w-max-w mx-auto">
      <SectionHead n="06" label={t("label")} title={t("title")} />

      <div className="bg-card rounded-[28px] p-[56px_clamp(24px,4vw,56px)] overflow-hidden bg-[radial-gradient(hsla(0,0%,100%,0.04)_1.2px,transparent_0)] bg-[size:22px_22px] bg-[-11px_-11px] pn-ring-wrap">

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center gap-4 mb-10 relative z-20">
          <div className="flex bg-card-soft border border-line-soft rounded-full p-1">
            {(["Meet Us", "Diagnostic"] as Tab[]).map((tab) => (
              <motion.button key={tab} type="button"
                onClick={() => { setActiveTab(tab); window.location.hash = `engage?tab=${tab === "Meet Us" ? "meet" : tab.toLowerCase()}`; }}
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                className={`px-6 py-2 font-sans font-semibold text-[13px] rounded-full transition-all duration-fast ${activeTab === tab ? "bg-accent text-white shadow-sm" : "text-soft hover:text-white"}`}
              >
                {tabLabel(tab)}
              </motion.button>
            ))}
          </div>

          <motion.button type="button"
            onClick={() => { setActiveTab("Careers"); window.location.hash = "engage?tab=careers"; }}
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            className={`px-6 py-2 font-sans font-semibold text-[13px] rounded-full border transition-all duration-fast ${activeTab === "Careers" ? "bg-white text-card border-white shadow-sm" : "bg-transparent border-line-soft text-soft hover:text-white hover:border-soft"}`}
          >
            {t("tab_careers")}
          </motion.button>
        </div>

        {/* Desktop tab content */}
        <div className="hidden lg:block relative z-20">
          <AnimatePresence mode="wait">
            {activeTab === "Meet Us"    && <TabPanel key="meet"       tabKey="meet"><MeetUsTab /></TabPanel>}
            {activeTab === "Diagnostic" && <TabPanel key="diagnostic" tabKey="diagnostic"><DiagnosticContent {...diagnosticProps} /></TabPanel>}
            {activeTab === "Careers"    && <TabPanel key="careers"    tabKey="careers"><CareersTab /></TabPanel>}
          </AnimatePresence>
        </div>

        {/* Mobile CTA */}
        <div className="block lg:hidden relative z-20">
          <div className="bg-card-soft border border-line-soft rounded-2xl p-8 text-center">
            <h3 className="font-sans font-bold text-white text-[20px] mb-3">{mobileTitle}</h3>
            <p className="text-soft text-[14px] leading-[1.6] mb-8 max-w-[32ch] mx-auto">{mobileDesc}</p>
            <Btn variant="primary" className="w-full justify-center" onClick={() => setIsModalOpen(true)}>
              {mobileCta} <span className="text-[12px] opacity-80">→</span>
            </Btn>
          </div>
        </div>
      </div>

      {/* Mobile modal */}
      {mounted && createPortal(
        <AnimatePresence>
          {isModalOpen && (
            <>
              <motion.div key="engage-backdrop" variants={backdrop} initial="hidden" animate="visible" exit="exit"
                className="fixed inset-0 z-[190] bg-black/60" onClick={() => setIsModalOpen(false)} />
              <motion.div key="engage-sheet" variants={slideUp} initial="hidden" animate="visible" exit="exit"
                className="fixed inset-x-0 bottom-0 top-0 z-[200] bg-bg flex flex-col"
              >
                <div className="flex items-center justify-between p-6 border-b border-line sticky top-0 bg-bg z-20">
                  <span className="font-pixel text-[10px] tracking-[0.2em] text-accent uppercase">
                    {tabLabel(activeTab)} {t("modal_form")}
                  </span>
                  <motion.button onClick={() => setIsModalOpen(false)}
                    whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                    className="text-white bg-white/5 w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-white/10"
                  >
                    <Icon name="x" size={20} />
                  </motion.button>
                </div>
                <div className="flex-1 overflow-y-auto py-6 px-4 pb-20">
                  <AnimatePresence mode="wait">
                    {activeTab === "Meet Us"    && <TabPanel key="modal-meet"       tabKey="modal-meet"><MeetUsTab /></TabPanel>}
                    {activeTab === "Diagnostic" && <TabPanel key="modal-diagnostic" tabKey="modal-diagnostic"><DiagnosticContent {...diagnosticProps} /></TabPanel>}
                    {activeTab === "Careers"    && <TabPanel key="modal-careers"    tabKey="modal-careers"><CareersTab /></TabPanel>}
                  </AnimatePresence>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </section>
  );
}

// ─── Diagnostic Form ──────────────────────────────────────────────────────────

function DiagnosticContent({
  step, setStep, form, u, errors, validate, loading, submit, STAGE, BUDGET, WINDOW,
  honeypot, setHoneypot, turnstileToken, setTurnstileToken, turnstileRef,
}: {
  step: number; setStep: (s: number) => void; form: FormState;
  u: (k: keyof FormState, v: string) => void;
  errors: Partial<Record<keyof FormState, boolean>>;
  validate: (fields: (keyof FormState)[]) => boolean;
  loading: boolean; submit: () => void;
  STAGE: string[]; BUDGET: string[]; WINDOW: string[];
  honeypot: string; setHoneypot: (v: string) => void;
  turnstileToken: string; setTurnstileToken: (v: string) => void;
  turnstileRef: React.RefObject<import("@marsidev/react-turnstile").TurnstileInstance | null>;
}) {
  const td = useTranslations("Engage.diagnostic");
  const optLabel = td("optional");

  const Step1Fields = (
    <>
      <div>
        <FLabel n="01" optionalLabel={optLabel}>{td("fields.company")}</FLabel>
        <FInput value={form.company} onChange={(v) => u("company", v)} placeholder={td("placeholders.company")} error={errors.company} />
      </div>
      <div>
        <FLabel n="02" optionalLabel={optLabel}>{td("fields.yourName")}</FLabel>
        <FInput value={form.yourName} onChange={(v) => u("yourName", v)} placeholder={td("placeholders.yourName")} error={errors.yourName} />
      </div>
      <div>
        <FLabel n="03" optionalLabel={optLabel}>{td("fields.email")}</FLabel>
        <FInput value={form.email} onChange={(v) => u("email", v)} placeholder={td("placeholders.email")} error={errors.email} type="email" />
      </div>
      <div>
        <FLabel n="04" optionalLabel={optLabel}>{td("fields.basedIn")}</FLabel>
        <FInput value={form.basedIn} onChange={(v) => u("basedIn", v)} placeholder={td("placeholders.basedIn")} error={errors.basedIn} />
      </div>
      <div>
        <FLabel n="05" optionalLabel={optLabel}>{td("fields.stage")}</FLabel>
        <FSelect value={form.stage} onChange={(v) => u("stage", v)} options={STAGE} placeholder={td("placeholders.stage")} error={errors.stage} />
      </div>
    </>
  );

  const Step2Fields = (
    <>
      <div>
        <FLabel n="05" optionalLabel={optLabel}>{td("fields.bottleneck")}</FLabel>
        <FArea value={form.bottleneck} onChange={(v) => u("bottleneck", v)} placeholder={td("placeholders.bottleneck")} error={errors.bottleneck} minRows={4} />
        {errors.bottleneck && (
          <div className="mt-2 font-pixel text-[9px] tracking-[0.14em] text-accent uppercase relative z-20">
            {form.bottleneck.length < 100 && form.bottleneck.length > 0
              ? td("error_bottleneck_short", { count: form.bottleneck.length })
              : td("error_bottleneck_empty")}
          </div>
        )}
      </div>
      <div>
        <FLabel n="06" optional optionalLabel={optLabel}>{td("fields.triedSoFar")}</FLabel>
        <FArea value={form.triedSoFar} onChange={(v) => u("triedSoFar", v)} placeholder={td("placeholders.triedSoFar")} />
      </div>
      <div>
        <FLabel n="07" optionalLabel={optLabel}>{td("fields.whyNow")}</FLabel>
        <FArea value={form.whyNow} onChange={(v) => u("whyNow", v)} placeholder={td("placeholders.whyNow")} error={errors.whyNow} />
      </div>
      <div>
        <FLabel n="08" optionalLabel={optLabel}>{td("fields.budget")}</FLabel>
        <FRadio value={form.budget} onChange={(v) => u("budget", v)} options={BUDGET} />
      </div>
      <div>
        <FLabel n="09" optionalLabel={optLabel}>{td("fields.startWindow")}</FLabel>
        <FRadio value={form.startWindow} onChange={(v) => u("startWindow", v)} options={WINDOW} />
      </div>
      <div>
        <FLabel n="10" optional optionalLabel={optLabel}>{td("fields.source")}</FLabel>
        <FInput value={form.source} onChange={(v) => u("source", v)} placeholder={td("placeholders.source")} />
      </div>
    </>
  );

  return (
    <>
      {/* Meta strip */}
      <div className="flex gap-7 flex-wrap font-pixel text-[10px] tracking-[0.15em] text-muted mb-8 relative z-20">
        <span>FIELDS · <b className="text-white font-normal">{td("fields_count")}</b></span>
        <span>RESPONSE · <b className="text-white font-normal">{td("response")}</b></span>
        <span>{td("email_label")} · <b className="text-white font-normal">consult@prionation.io</b></span>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-4 mb-8 relative z-20">
        {[1, 2].map((n, i) => (
          <div key={n} className={`flex items-center gap-2.5 transition-opacity duration-normal ${step >= n ? "opacity-100" : "opacity-50"}`}>
            {i > 0 && <div className="flex-1 h-[1px] bg-line-soft w-12" />}
            <span className={`w-6 h-6 rounded-full inline-flex items-center justify-center font-sans font-bold text-[11px] border ${step >= n ? "bg-accent text-white border-accent" : "bg-card-soft text-muted border-line-soft"}`}>{n}</span>
            <span className={`font-pixel text-[9px] tracking-[0.16em] uppercase ${step >= n ? "text-white" : "text-muted"}`}>
              {n === 1 ? td("step1_label") : td("step2_label")}
            </span>
          </div>
        ))}
      </div>

      {/* Step fields crossfade */}
      <AnimatePresence mode="wait">
        <motion.div key={`step-${step}`} variants={fadeIn} initial="hidden" animate="visible" exit="exit"
          transition={{ duration: 0.2 }} className="grid gap-7 mb-10 relative z-20"
        >
          {step === 1 ? Step1Fields : Step2Fields}
        </motion.div>
      </AnimatePresence>

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

      {/* Navigation */}
      <div className="flex items-center gap-4 flex-wrap relative z-20">
        {step === 2 && (
          <Btn variant="ghost" onClick={() => setStep(1)}>
            <span className="text-[12px] opacity-80 inline-block rotate-180">→</span>{" "}{td("back")}
          </Btn>
        )}
        {step === 1 ? (
          <Btn variant="primary" onClick={() => { if (validate(["company", "yourName", "email", "basedIn", "stage"])) setStep(2); }}>
            {td("continue")} <span className="text-[12px] opacity-80">→</span>
          </Btn>
        ) : (
          <>
            {!isDev && (
              <Turnstile
                ref={turnstileRef}
                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                options={{ size: "invisible" }}
                onSuccess={(token) => setTurnstileToken(token)}
              />
            )}
            <Btn variant="primary" onClick={submit} disabled={loading || (!isDev && !turnstileToken)}>
              {loading ? td("sending") : <>{td("submit")} <span className="text-[12px] opacity-80">→</span></>}
            </Btn>
          </>
        )}
      </div>

      {/* Footer */}
      <div className="mt-14 pt-8 border-t border-line grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-20">
        <div>
          <div className="font-pixel text-[9px] tracking-[0.16em] text-muted uppercase mb-1.5">{td("ai_label")}</div>
          <div className="text-white text-[14px]">{td("ai_desc")}</div>
        </div>
        <div className="text-left sm:text-right">
          <div className="font-pixel text-[9px] tracking-[0.16em] text-muted uppercase mb-1.5">{td("email_us")}</div>
          <a href="mailto:consult@prionation.io" className="text-accent hover:opacity-85 text-[14px] transition-opacity">
            consult@prionation.io
          </a>
        </div>
      </div>
    </>
  );
}
