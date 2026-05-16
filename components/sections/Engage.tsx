"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Icon } from "../icons";
import { SectionHead, Btn } from "../ui/Atoms";
import { MeetUsTab } from "./engage/MeetUsTab";
import { CareersTab } from "./engage/CareersTab";

type Tab = "Meet Us" | "Diagnostic" | "Careers";

type FormState = {
  company: string;
  yourName: string;
  email: string;
  basedIn: string;
  stage: string;
  bottleneck: string;
  triedSoFar: string;
  whyNow: string;
  budget: string;
  startWindow: string;
  source: string;
};

const EMPTY_FORM: FormState = {
  company: "",
  yourName: "",
  email: "",
  basedIn: "",
  stage: "",
  bottleneck: "",
  triedSoFar: "",
  whyNow: "",
  budget: "",
  startWindow: "",
  source: "",
};

const STAGE = ["<€1M revenue", "€1–5M", "€5–50M", "€50M+", "Not disclosed"];
const BUDGET = ["Yes", "Need to confirm with team", "Not yet"];
const WINDOW = ["Within 30 days", "30–90 days", "Exploring"];
const REQUIRED: (keyof FormState)[] = [
  "company",
  "yourName",
  "email",
  "basedIn",
  "stage",
  "bottleneck",
  "whyNow",
  "budget",
  "startWindow",
];


function FLabel({
  n,
  children,
  optional,
}: {
  n: string;
  children: React.ReactNode;
  optional?: boolean;
}) {
  return (
    <label className="flex items-baseline justify-between font-pixel text-[10px] tracking-[0.14em] text-soft mb-2.5 uppercase relative z-20">
      <span>
        <span className="text-accent mr-2">/{n}</span> {children}
      </span>
      {optional && (
        <span className="text-muted tracking-[0.1em] lowercase">optional</span>
      )}
    </label>
  );
}

function FInput({
  value,
  onChange,
  placeholder,
  error,
  type = "text",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  error?: boolean;
  type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full bg-transparent text-white font-sans text-[15px] py-3 border-0 border-b rounded-none outline-none transition-colors duration-fast placeholder:text-muted focus:border-accent relative z-20 ${error ? "border-accent" : "border-line-soft"}`}
    />
  );
}

function FArea({
  value,
  onChange,
  placeholder,
  error,
  minRows = 3,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  error?: boolean;
  minRows?: number;
}) {
  return (
    <textarea
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      rows={minRows}
      className={`w-full bg-transparent text-white font-sans text-[15px] py-3 border-0 border-b rounded-none outline-none transition-colors duration-fast placeholder:text-muted focus:border-accent resize-y leading-[1.5] min-h-[80px] relative z-20 ${error ? "border-accent" : "border-line-soft"}`}
    />
  );
}

function FSelect({
  value,
  onChange,
  options,
  error,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  error?: boolean;
  placeholder: string;
}) {
  return (
    <div className="relative z-20">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full bg-transparent font-sans text-[15px] py-3 border-0 border-b rounded-none outline-none transition-colors duration-fast focus:border-accent appearance-none pr-[30px] cursor-pointer ${error ? "border-accent" : "border-line-soft"} ${!value ? "text-muted" : "text-white"}`}
      >
        <option value="" disabled className="bg-card text-white">
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o} value={o} className="bg-card text-white">
            {o}
          </option>
        ))}
      </select>
      <span className="absolute right-0 top-1/2 -translate-y-1/2 text-muted pointer-events-none">
        <Icon name="chevron-down" size={14} />
      </span>
    </div>
  );
}

function FRadio({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div className="flex flex-wrap gap-2 mt-1.5 relative z-20">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => onChange(o)}
          className={`px-4 py-2.5 font-sans font-medium text-[13px] border rounded-full cursor-pointer transition-all duration-fast hover:border-soft hover:text-white ${value === o ? "bg-accent border-accent text-white" : "bg-transparent border-line-soft text-soft"}`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

export function Engage() {
  const [activeTab, setActiveTab] = useState<Tab>("Diagnostic");
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, boolean>>
  >({});
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash.includes("tab=meet")) setActiveTab("Meet Us");
      else if (hash.includes("tab=careers")) setActiveTab("Careers");
      else if (hash.includes("tab=diagnostic")) setActiveTab("Diagnostic");
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

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

    if (fields.includes("email") && form.email && !emailRegex.test(form.email)) {
      errs.email = true;
    }

    if (
      fields.includes("bottleneck") &&
      form.bottleneck &&
      form.bottleneck.length < 100
    ) {
      errs.bottleneck = true;
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const submit = async () => {
    if (!validate(REQUIRED)) return;
    setLoading(true);
    try {
      await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <section
        id="engage"
        className="relative px-page-x pt-[110px] pb-[140px] max-w-max-w mx-auto"
      >
        <div className="max-w-[720px] mx-auto bg-card rounded-[28px] p-[64px_48px] text-center bg-[radial-gradient(hsla(0,0%,100%,0.04)_1.2px,transparent_0)] bg-[size:22px_22px] pn-ring-wrap">
          <span className="inline-flex items-center justify-center w-[56px] h-[56px] rounded-full bg-accent text-white mb-6 shadow-[0_0_0_6px_var(--c-accent-10)] relative z-20">
            <Icon name="check-circle" size={20} />
          </span>
          <h2 className="font-sans font-extrabold text-[clamp(28px,3.4vw,40px)] tracking-[-0.024em] leading-[1.08] text-white m-0 relative z-20">
            Thanks. We respond within 24 hours.
          </h2>
          <p className="m-[18px_auto_32px] max-w-[52ch] text-soft text-[15px] leading-[1.6] relative z-20">
            We&apos;ve logged your intake. Expect a short note with two or three
            sharper questions, then a 30-minute conversation to confirm whether
            a Diagnostic is the right next step.
          </p>
          <div className="flex justify-center gap-6 flex-wrap font-pixel text-[10px] tracking-[0.15em] text-muted relative z-20">
            <span>
              RESPONSE · <b className="text-white font-normal">WITHIN 24H</b>
            </span>
            <span>
              NEXT · <b className="text-white font-normal">30-MIN CALL</b>
            </span>
            <span>
              OUTCOME ·{" "}
              <b className="text-white font-normal">DIAGNOSTIC FIT?</b>
            </span>
          </div>
          <button
            className="mt-8 bg-transparent border-0 p-0 cursor-pointer text-soft font-sans font-semibold text-[13px] inline-flex items-center gap-2 hover:text-white relative z-20"
            onClick={() => {
              setSubmitted(false);
              setForm(EMPTY_FORM);
              setStep(1);
            }}
          >
            Submit another intake{" "}
            <span aria-hidden="true" className="text-[12px] opacity-80">
              →
            </span>
          </button>
        </div>
      </section>
    );
  }

  return (
    <section
      id="engage"
      className="relative px-page-x pt-[110px] pb-[140px] max-w-max-w mx-auto"
    >
      <SectionHead
        n="06"
        label="CONNECT US"
        title="SOLVE YOUR BOTTLENECK TODAY."
      />
      <div className="bg-card rounded-[28px] p-[56px_clamp(24px,4vw,56px)] overflow-hidden bg-[radial-gradient(hsla(0,0%,100%,0.04)_1.2px,transparent_0)] bg-[size:22px_22px] bg-[-11px_-11px] pn-ring-wrap">
        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center gap-4 mb-10 relative z-20">
          {/* Group 1: Engagement */}
          <div className="flex bg-card-soft border border-line-soft rounded-full p-1">
            {["Meet Us", "Diagnostic"].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => {
                  setActiveTab(tab as Tab);
                  window.location.hash = `engage?tab=${tab === "Meet Us" ? "meet" : tab.toLowerCase()}`;
                }}
                className={`px-6 py-2 font-sans font-semibold text-[13px] rounded-full transition-all duration-fast ${
                  activeTab === tab
                    ? "bg-accent text-white shadow-sm"
                    : "text-soft hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Group 2: Careers */}
          <button
            type="button"
            onClick={() => {
              setActiveTab("Careers");
              window.location.hash = "engage?tab=careers";
            }}
            className={`px-6 py-2 font-sans font-semibold text-[13px] rounded-full border transition-all duration-fast ${
              activeTab === "Careers"
                ? "bg-white text-card border-white shadow-sm"
                : "bg-transparent border-line-soft text-soft hover:text-white hover:border-soft"
            }`}
          >
            Careers
          </button>
        </div>

        {/* Tab Content */}
        <div className="hidden lg:block">
          {activeTab === "Meet Us" && <MeetUsTab />}
          {activeTab === "Diagnostic" && <DiagnosticContent step={step} setStep={setStep} form={form} u={u} errors={errors} validate={validate} loading={loading} submit={submit} STAGE={STAGE} BUDGET={BUDGET} WINDOW={WINDOW} />}
          {activeTab === "Careers" && <CareersTab />}
        </div>

        {/* Mobile View: CTA to Open Modal */}
        <div className="block lg:hidden">
          <div className="bg-card-soft border border-line-soft rounded-2xl p-8 text-center relative z-20">
            <h3 className="font-sans font-bold text-white text-[20px] mb-3">
              {activeTab === "Careers" ? "Join the Pod" : activeTab === "Meet Us" ? "Schedule a Call" : "Start a Diagnostic"}
            </h3>
            <p className="text-soft text-[14px] leading-[1.6] mb-8 max-w-[32ch] mx-auto">
              {activeTab === "Careers" 
                ? "We're always looking for AI-native operators to join our global network."
                : activeTab === "Meet Us"
                  ? "Book a 30-minute conversation to discuss your operational bottlenecks."
                  : "Scope your first AI transformation project with a 2-week Diagnostic."
              }
            </p>
            <Btn variant="primary" className="w-full justify-center" onClick={() => setIsModalOpen(true)}>
              {activeTab === "Careers" ? "Apply Now" : activeTab === "Meet Us" ? "Open Calendar" : "Start Intake"} <span className="text-[12px] opacity-80">→</span>
            </Btn>
          </div>
        </div>

        {/* Mobile Form Modal */}
        {mounted && isModalOpen && createPortal(
          <div className="fixed inset-0 z-[200] bg-black flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-center justify-between p-6 border-b border-line sticky top-0 bg-black z-20">
              <span className="font-pixel text-[10px] tracking-[0.2em] text-accent uppercase">{activeTab} FORM</span>
              <button onClick={() => setIsModalOpen(false)} className="text-white bg-white/5 w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-white/10">
                <Icon name="x" size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 pb-20">
              {activeTab === "Meet Us" && <MeetUsTab />}
              {activeTab === "Diagnostic" && <DiagnosticContent step={step} setStep={setStep} form={form} u={u} errors={errors} validate={validate} loading={loading} submit={submit} STAGE={STAGE} BUDGET={BUDGET} WINDOW={WINDOW} />}
              {activeTab === "Careers" && <CareersTab />}
            </div>
          </div>,
          document.body
        )}
      </div>
    </section>
  );
}

function DiagnosticContent({ 
  step, 
  setStep, 
  form, 
  u, 
  errors, 
  validate, 
  loading, 
  submit,
  STAGE,
  BUDGET,
  WINDOW
}: {
  step: number;
  setStep: (s: number) => void;
  form: FormState;
  u: (k: keyof FormState, v: string) => void;
  errors: Partial<Record<keyof FormState, boolean>>;
  validate: (fields: (keyof FormState)[]) => boolean;
  loading: boolean;
  submit: () => void;
  STAGE: string[];
  BUDGET: string[];
  WINDOW: string[];
}) {
  const Step1Fields = (
    <>
      <div>
        <FLabel n="01">Company name + website</FLabel>
        <FInput value={form.company} onChange={(v) => u("company", v)} placeholder="e.g. Acme Logistics — acme.fr" error={errors.company} />
      </div>
      <div>
        <FLabel n="02">Your name + role</FLabel>
        <FInput value={form.yourName} onChange={(v) => u("yourName", v)} placeholder="e.g. Marie Dupont — COO" error={errors.yourName} />
      </div>
      <div>
        <FLabel n="03">Email</FLabel>
        <FInput value={form.email} onChange={(v) => u("email", v)} placeholder="marie@acme.fr" error={errors.email} type="email" />
      </div>
      <div>
        <FLabel n="04">Where are you based?</FLabel>
        <FInput value={form.basedIn} onChange={(v) => u("basedIn", v)} placeholder="City, country" error={errors.basedIn} />
      </div>
      <div>
        <FLabel n="05">Company stage</FLabel>
        <FSelect value={form.stage} onChange={(v) => u("stage", v)} options={STAGE} placeholder="Select revenue band" error={errors.stage} />
      </div>
    </>
  );

  const Step2Fields = (
    <>
      <div>
        <FLabel n="05">The operational bottleneck — describe in 2–3 sentences</FLabel>
        <FArea value={form.bottleneck} onChange={(v) => u("bottleneck", v)} placeholder="What manual ops process scales linearly with revenue, where knowledge is trapped, or where volume breaks the seams. (min. 100 characters)" error={errors.bottleneck} minRows={4} />
        {errors.bottleneck && (
          <div className="mt-2 font-pixel text-[9px] tracking-[0.14em] text-accent uppercase relative z-20">
            {form.bottleneck.length < 100 && form.bottleneck.length > 0
              ? `A bit more context, please — ${form.bottleneck.length}/100 characters.`
              : "Please describe the bottleneck."}
          </div>
        )}
      </div>
      <div>
        <FLabel n="06" optional>What have you tried so far?</FLabel>
        <FArea value={form.triedSoFar} onChange={(v) => u("triedSoFar", v)} placeholder="Internal tooling, off-the-shelf SaaS, consultants — what's been tried and where it fell short." />
      </div>
      <div>
        <FLabel n="07">Why does this matter now?</FLabel>
        <FArea value={form.whyNow} onChange={(v) => u("whyNow", v)} placeholder="Growth target, margin pressure, key-person risk, upcoming integration — what makes this the right window." error={errors.whyNow} />
      </div>
      <div>
        <FLabel n="08">Are you budgeted for a 2-week paid Diagnostic in the €5–7K range?</FLabel>
        <FRadio value={form.budget} onChange={(v) => u("budget", v)} options={BUDGET} />
      </div>
      <div>
        <FLabel n="09">Ideal start window</FLabel>
        <FRadio value={form.startWindow} onChange={(v) => u("startWindow", v)} options={WINDOW} />
      </div>
      <div>
        <FLabel n="10" optional>How did you hear about us?</FLabel>
        <FInput value={form.source} onChange={(v) => u("source", v)} placeholder="Referral, search, social — anything counts." />
      </div>
    </>
  );

  return (
    <>
      <div className="flex gap-7 flex-wrap font-pixel text-[10px] tracking-[0.15em] text-muted mb-8 relative z-20">
        <span>FIELDS · <b className="text-white font-normal">10</b></span>
        <span>RESPONSE · <b className="text-white font-normal">WITHIN 24H</b></span>
        <span>EMAIL · <b className="text-white font-normal">consult@prionation.io</b></span>
      </div>

      <div className="flex items-center gap-4 mb-8 relative z-20">
        <div className={`flex items-center gap-2.5 transition-opacity duration-normal ${step >= 1 ? "opacity-100" : "opacity-50"}`}>
          <span className={`w-6 h-6 rounded-full inline-flex items-center justify-center font-sans font-bold text-[11px] border ${step >= 1 ? "bg-accent text-white border-accent" : "bg-card-soft text-muted border-line-soft"}`}>1</span>
          <span className={`font-pixel text-[9px] tracking-[0.16em] uppercase ${step >= 1 ? "text-white" : "text-muted"}`}>COMPANY BASICS</span>
        </div>
        <div className="flex-1 h-[1px] bg-line-soft" />
        <div className={`flex items-center gap-2.5 transition-opacity duration-normal ${step >= 2 ? "opacity-100" : "opacity-50"}`}>
          <span className={`w-6 h-6 rounded-full inline-flex items-center justify-center font-sans font-bold text-[11px] border ${step >= 2 ? "bg-accent text-white border-accent" : "bg-card-soft text-muted border-line-soft"}`}>2</span>
          <span className={`font-pixel text-[9px] tracking-[0.16em] uppercase ${step >= 2 ? "text-white" : "text-muted"}`}>BOTTLENECK CONTEXT</span>
        </div>
      </div>

      <div className="grid gap-7 mb-10 relative z-20">
        {step === 1 ? Step1Fields : Step2Fields}
      </div>

      <div className="flex items-center gap-4 flex-wrap relative z-20">
        {step === 2 && (
          <Btn variant="ghost" onClick={() => setStep(1)}>
            <span className="text-[12px] opacity-80 inline-block rotate-180">→</span> Back
          </Btn>
        )}
        {step === 1 ? (
          <Btn
            variant="primary"
            onClick={() => {
              if (validate(["company", "yourName", "email", "basedIn", "stage"]))
                setStep(2);
            }}
          >
            Continue <span className="text-[12px] opacity-80">→</span>
          </Btn>
        ) : (
          <Btn variant="primary" onClick={submit}>
            {loading ? "Sending…" : <>Open a conversation <span className="text-[12px] opacity-80">→</span></>}
          </Btn>
        )}
      </div>

      <div className="mt-14 pt-8 border-t border-line grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-20">
        <div>
          <div className="font-pixel text-[9px] tracking-[0.16em] text-muted uppercase mb-1.5">PREFER TO TALK TO AI FIRST?</div>
          <div className="text-white text-[14px]">AI Consultation launching August 2026.</div>
        </div>
        <div className="text-left sm:text-right">
          <div className="font-pixel text-[9px] tracking-[0.16em] text-muted uppercase mb-1.5">OR EMAIL US</div>
          <a href="mailto:consult@prionation.io" className="text-accent hover:opacity-85 text-[14px] transition-opacity">consult@prionation.io</a>
        </div>
      </div>
    </>
  );
}


