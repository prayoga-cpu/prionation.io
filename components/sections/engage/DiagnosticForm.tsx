"use client";

import React, { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { m, AnimatePresence } from "framer-motion";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { Icon } from "../../icons";
import { Btn } from "../../ui/Atoms";
import { fadeIn } from "@/lib/motion";
import { formatEmail, formatUrlForce, formatPhone } from "@/lib/forms/format";

const isDev = process.env.NODE_ENV !== "production";
const securityEnabled = process.env.NEXT_PUBLIC_SECURITY_ENABLED !== "false";

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
  const format = type === "email" ? formatEmail : type === "url" ? formatUrlForce : type === "tel" ? formatPhone : undefined;
  return (
    <input type={type} value={value} placeholder={placeholder} aria-label={placeholder}
      onChange={(e) => onChange(format ? format(e.target.value) : e.target.value)}
      className={`w-full bg-transparent text-white font-sans text-[15px] py-3 border-0 border-b rounded-none outline-none transition-colors duration-fast placeholder:text-muted focus:border-accent relative z-20 ${error ? "border-accent" : "border-line-soft"}`}
    />
  );
}

function FArea({ value, onChange, placeholder, error, minRows = 3 }: {
  value: string; onChange: (v: string) => void; placeholder: string; error?: boolean; minRows?: number;
}) {
  return (
    <textarea value={value} placeholder={placeholder} aria-label={placeholder} rows={minRows}
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
      <select value={value} onChange={(e) => onChange(e.target.value)} aria-label={placeholder}
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
        <m.button key={o} type="button" onClick={() => onChange(o)}
          whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          className={`px-4 py-2.5 font-sans font-medium text-[13px] border rounded-full cursor-pointer transition-all duration-fast hover:border-soft hover:text-white ${value === o ? "bg-accent border-accent text-white" : "bg-transparent border-line-soft text-soft"}`}
        >
          {o}
        </m.button>
      ))}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function DiagnosticTab({ setSubmitted }: { setSubmitted: (b: boolean) => void }) {
  const td = useTranslations("Engage.diagnostic");
  const optLabel = td("optional");

  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [turnstileToken, setTurnstileToken] = useState(!securityEnabled || isDev ? "dev-bypass" : "");
  const turnstileRef = useRef<TurnstileInstance>(null);

  const STAGE  = ["<€1M revenue", "€1–5M", "€5–50M", "€50M+", "Not disclosed"];
  const BUDGET = ["Yes", "Need to confirm with team", "Not yet"];
  const WINDOW = ["Within 30 days", "30–90 days", "Exploring"];

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
    if (fields.includes("whyNow") && form.whyNow && form.whyNow.length < 20) errs.whyNow = true;
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
        console.error("[intake] submit error", data.error, data.issues?.map((i: { path: string[]; message: string }) => `${i.path.join(".")}: ${i.message}`));
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
        {errors.whyNow && (
          <div className="mt-2 font-pixel text-[9px] tracking-[0.14em] text-accent uppercase relative z-20">
            {form.whyNow.length > 0 && form.whyNow.length < 20
              ? td("error_whynow_short", { count: form.whyNow.length })
              : td("error_whynow_empty")}
          </div>
        )}
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
      <div className="flex gap-7 flex-wrap font-pixel text-[10px] tracking-[0.15em] text-muted mb-8 relative z-20">
        <span>FIELDS · <b className="text-white font-normal">{td("fields_count")}</b></span>
        <span>RESPONSE · <b className="text-white font-normal">{td("response")}</b></span>
        <span>{td("email_label")} · <b className="text-white font-normal">consult@prionation.io</b></span>
      </div>

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

      <AnimatePresence mode="wait">
        <m.div key={`step-${step}`} variants={fadeIn} initial="hidden" animate="visible" exit="exit"
          transition={{ duration: 0.2 }} className="grid gap-7 mb-10 relative z-20"
        >
          {step === 1 ? Step1Fields : Step2Fields}
        </m.div>
      </AnimatePresence>

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
            {securityEnabled && !isDev && (
              <Turnstile
                ref={turnstileRef}
                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                options={{ size: "invisible" }}
                onSuccess={(token) => setTurnstileToken(token)}
                onError={() => { console.warn("[turnstile] error"); setTurnstileToken(""); }}
                onExpire={() => { turnstileRef.current?.reset(); setTurnstileToken(""); }}
              />
            )}
            <Btn variant="primary" onClick={submit} disabled={loading || (securityEnabled && !isDev && !turnstileToken)}>
              {loading ? td("sending") : <>{td("submit")} <span className="text-[12px] opacity-80">→</span></>}
            </Btn>
          </>
        )}
      </div>

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
