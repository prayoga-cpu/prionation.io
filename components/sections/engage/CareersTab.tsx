"use client";

import { useState, useRef } from "react";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { Icon } from "../../icons";
import { Btn } from "../../ui/Atoms";

const isDev = process.env.NODE_ENV !== "production";
const securityEnabled = process.env.NEXT_PUBLIC_SECURITY_ENABLED !== "false";

type CareerForm = {
  fullName: string;
  email: string;
  linkedin: string;
  position: string;
  portfolio: string;
  basedIn: string;
  cv: File | null;
};

const EMPTY: CareerForm = {
  fullName: "",
  email: "",
  linkedin: "",
  position: "",
  portfolio: "",
  basedIn: "",
  cv: null,
};

const POSITIONS = [
  { traditional: "Fullstack Engineer", role: "AI Product Engineer", open: true },
  { traditional: "Digital Marketing", role: "AI Growth Operator", open: true },
  { traditional: "UI/UX Designer", role: "AI Experience Designer", open: true },
  { traditional: "Project Manager", role: "AI Delivery Lead", open: true },
  { traditional: "Data Analyst", role: "Intelligence Architect", open: false },
];

const REQUIRED: (keyof CareerForm)[] = [
  "fullName", "email", "linkedin", "position", "basedIn", "cv"
];

function FLabel({ n, children, optional }: { n: string; children: React.ReactNode; optional?: boolean }) {
  return (
    <label className="flex items-baseline justify-between font-pixel text-[10px] tracking-[0.14em] text-soft mb-2.5 uppercase relative z-20">
      <span><span className="text-accent mr-2">/{n}</span> {children}</span>
      {optional && <span className="text-muted tracking-[0.1em] lowercase">optional</span>}
    </label>
  );
}

function FInput({ value, onChange, placeholder, error, type = "text" }: {
  value: string; onChange: (v: string) => void; placeholder: string; error?: boolean; type?: string;
}) {
  return (
    <input type={type} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)}
      className={`w-full bg-transparent text-white font-sans text-[15px] py-3 border-0 border-b rounded-none outline-none transition-colors duration-fast placeholder:text-muted focus:border-accent relative z-20 ${error ? "border-accent" : "border-line-soft"}`}
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
        {options.map((o) => (<option key={o} value={o} className="bg-card text-white">{o}</option>))}
      </select>
      <span className="absolute right-0 top-1/2 -translate-y-1/2 text-muted pointer-events-none">
        <Icon name="chevron-down" size={14} />
      </span>
    </div>
  );
}

function FFile({ onChange, error }: { onChange: (f: File | null) => void; error?: boolean }) {
  return (
    <input type="file" accept="application/pdf" onChange={(e) => onChange(e.target.files?.[0] || null)}
      className={`w-full bg-transparent text-muted font-sans text-[13px] py-3 border-0 border-b rounded-none outline-none transition-colors duration-fast focus:border-accent relative z-20 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[11px] file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20 cursor-pointer ${error ? "border-accent" : "border-line-soft"}`}
    />
  );
}

export function CareersTab() {
  const [form, setForm] = useState<CareerForm>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof CareerForm, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [turnstileToken, setTurnstileToken] = useState(!securityEnabled || isDev ? "dev-bypass" : "");
  const turnstileRef = useRef<TurnstileInstance>(null);

  const u = (k: keyof CareerForm, v: CareerForm[keyof CareerForm]) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: false }));
  };

  const validate = () => {
    const errs: Partial<Record<keyof CareerForm, boolean>> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const urlRegex = /^https?:\/\/.+/;

    for (const k of REQUIRED) {
      const val = form[k];
      if (!val || (typeof val === "string" && val.trim() === "")) {
        errs[k] = true;
      }
    }

    if (form.email && !emailRegex.test(form.email)) errs.email = true;
    if (form.linkedin && !urlRegex.test(form.linkedin)) errs.linkedin = true;
    if (form.portfolio && !urlRegex.test(form.portfolio)) errs.portfolio = true;

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const submit = async () => {
    if (!validate()) return;
    if (!form.cv) return;
    setApiError("");
    setLoading(true);
    try {
      // 1. Get signed upload URL from our server
      const uploadRes = await fetch("/api/upload/cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName: form.cv.name,
          contentType: form.cv.type || "application/pdf",
          fileSize: form.cv.size,
        }),
      });

      if (!uploadRes.ok) {
        const data = await uploadRes.json().catch(() => ({}));
        setApiError(data.error ?? "CV upload failed. Please try again.");
        return;
      }

      const { uploadUrl, accessUrl } = await uploadRes.json();

      if (!accessUrl) {
        setApiError("Failed to prepare CV storage. Please try again.");
        return;
      }

      // 2. PUT the file directly to Supabase
      const putRes = await fetch(uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": form.cv.type || "application/pdf" },
        body: form.cv,
      });

      if (!putRes.ok) {
        setApiError("CV upload to storage failed. Please try again.");
        return;
      }

      // 3. Submit career form with the access URL
      const careerRes = await fetch("/api/forms/career", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "career",
          fullName: form.fullName,
          email: form.email,
          linkedin: form.linkedin,
          position: form.position,
          portfolio: form.portfolio || undefined,
          basedIn: form.basedIn,
          cvUrl: accessUrl,
          turnstileToken,
          honeypot,
        }),
      });

      if (!careerRes.ok) {
        const data = await careerRes.json().catch(() => ({}));
        console.error("[career] submit error", data.error, data.issues);
        setApiError(data.error ?? "Submission failed. Please try again.");
        turnstileRef.current?.reset();
        setTurnstileToken(isDev ? "dev-bypass" : "");
        return;
      }

      setSubmitted(true);
    } catch {
      setApiError("Network error. Please try again.");
      turnstileRef.current?.reset();
      setTurnstileToken(isDev ? "dev-bypass" : "");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-[720px] mx-auto text-center py-8">
        <span className="inline-flex items-center justify-center w-[56px] h-[56px] rounded-full bg-accent text-white mb-6 shadow-[0_0_0_6px_var(--c-accent-10)] relative z-20">
          <Icon name="check-circle" size={20} />
        </span>
        <h2 className="font-sans font-extrabold text-[clamp(28px,3.4vw,40px)] tracking-[-0.024em] leading-[1.08] text-white m-0 relative z-20">
          Application received.
        </h2>
        <p className="m-[18px_auto_32px] max-w-[52ch] text-soft text-[15px] leading-[1.6] relative z-20">
          We review every application personally. Expect a response within 48
          hours with next steps.
        </p>
        <div className="flex justify-center gap-6 flex-wrap font-pixel text-[10px] tracking-[0.15em] text-muted relative z-20">
          <span>REVIEW · <b className="text-white font-normal">WITHIN 48H</b></span>
          <span>PROCESS · <b className="text-white font-normal">2 ROUNDS</b></span>
          <span>LOCATION · <b className="text-white font-normal">REMOTE-FIRST</b></span>
        </div>
        <button className="mt-8 bg-transparent border-0 p-0 cursor-pointer text-soft font-sans font-semibold text-[13px] inline-flex items-center gap-2 hover:text-white relative z-20"
          onClick={() => { setSubmitted(false); setForm(EMPTY); setApiError(""); }}>
          Submit another application <span aria-hidden="true" className="text-[12px] opacity-80">→</span>
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-20">
      {/* Left Column: Description & Table */}
      <div className="relative z-20 w-full">
        <h3 className="font-sans font-extrabold text-[20px] md:text-[clamp(22px,2.8vw,32px)] tracking-[-0.02em] leading-[1.1] text-white mb-2 md:mb-4">
          AI Transformation Roles
        </h3>
        <p className="text-soft text-[13px] md:text-[15px] leading-[1.6] max-w-[48ch] mb-6 md:mb-10">
          In this foundation we do AI transformation on the talent role and wider position. We don&apos;t hire for traditional roles. We convert domain experts into AI-native operators.
        </p>

        {/* Table View of Positions */}
        <div className="border border-line-soft rounded-xl overflow-hidden bg-card-soft w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-line-soft text-[8px] md:text-[9px] font-pixel tracking-[0.1em] text-muted uppercase">
                <th className="p-2 md:p-4 font-normal">Traditional Role</th>
                <th className="p-2 md:p-4 font-normal">AI Role</th>
                <th className="p-2 md:p-4 font-normal text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {POSITIONS.map((pos) => (
                <tr key={pos.role} className={`border-b border-line-soft/30 last:border-0 ${!pos.open ? "opacity-50" : ""}`}>
                  <td className="p-2 md:p-4 text-[10px] md:text-[13px] text-soft line-through">{pos.traditional}</td>
                  <td className="p-2 md:p-4 text-[11px] md:text-[14px] text-white font-medium">{pos.role}</td>
                  <td className="p-2 md:p-4 text-[7px] md:text-[8px] font-pixel tracking-[0.1em] uppercase whitespace-nowrap text-right">
                    {pos.open ? (
                      <span className="text-accent">● OPEN</span>
                    ) : (
                      <span className="text-line-soft">● SOON</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right Column: Form */}
      <div className="relative z-20 w-full">
        <div className="bg-card-soft border border-line-soft rounded-2xl p-5 md:p-8 w-full">
          <h4 className="font-sans font-bold text-white text-[16px] md:text-[18px] mb-6 md:mb-8">Submit Application</h4>

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

          <div className="grid gap-5 md:gap-7 mb-8 md:mb-10">
            <div>
              <FLabel n="01">Full name</FLabel>
              <FInput value={form.fullName} onChange={(v) => u("fullName", v)} placeholder="e.g. Darwin Prayoga" error={errors.fullName} />
            </div>
            <div>
              <FLabel n="02">Email</FLabel>
              <FInput value={form.email} onChange={(v) => u("email", v)} placeholder="your@email.com" error={errors.email} type="email" />
            </div>
            <div>
              <FLabel n="03">LinkedIn profile</FLabel>
              <FInput value={form.linkedin} onChange={(v) => u("linkedin", v)} placeholder="https://linkedin.com/in/yourprofile" error={errors.linkedin} type="url" />
            </div>
            <div>
              <FLabel n="04">Position of interest</FLabel>
              <FSelect value={form.position} onChange={(v) => u("position", v)}
                options={[
                  ...POSITIONS.filter((p) => p.open).map((p) => p.role),
                  "Open Application",
                ]}
                placeholder="Select a position" error={errors.position} />
            </div>
            <div>
              <FLabel n="05" optional>Portfolio / GitHub</FLabel>
              <FInput value={form.portfolio} onChange={(v) => u("portfolio", v)} placeholder="Link to your work, GitHub, Dribbble, etc." type="url" />
            </div>
            <div>
              <FLabel n="06">Where are you based?</FLabel>
              <FInput value={form.basedIn} onChange={(v) => u("basedIn", v)} placeholder="City, country" error={errors.basedIn} />
            </div>
            <div>
              <FLabel n="07">Upload CV (PDF, max 5 MB)</FLabel>
              <FFile onChange={(f) => u("cv", f)} error={errors.cv} />
            </div>
          </div>

          {apiError && (
            <div className="mb-5 font-pixel text-[9px] tracking-[0.14em] text-accent uppercase relative z-20">
              {apiError}
            </div>
          )}

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

          <Btn
            variant="primary"
            onClick={submit}
            disabled={loading || (securityEnabled && !isDev && !turnstileToken)}
            className="w-full justify-center"
          >
            {loading ? "Sending…" : <>Submit application <span className="text-[12px] opacity-80">→</span></>}
          </Btn>
        </div>
      </div>
    </div>
  );
}
