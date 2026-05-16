"use client";

import { useState, useTransition } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { Dot, Eyebrow } from "../ui/Atoms";

function ChevSvg() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="transition-transform duration-fast group-hover:rotate-180"
    >
      <path d="M2 4 L6 8 L10 4" />
    </svg>
  );
}

export function SiteFooter() {
  const t = useTranslations("Footer");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const [verOpen, setVerOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const onLocaleChange = (newLocale: string) => {
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  };

  const taglines = t.raw("taglines") as string[];

  return (
    <footer className="mt-6 pt-[80px] px-page-x pb-[28px] bg-card border-t border-line relative bg-[radial-gradient(hsla(0,0%,100%,0.05)_1.2px,transparent_0)] bg-[size:22px_22px] bg-[-11px_-11px]">
      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_3fr] gap-12 lg:gap-16 pb-14 border-b border-line">
        {/* Left: Branding */}
        <div>
          <div className="mb-[18px]">
            <Eyebrow>AI PRODUCT ENGINEERING</Eyebrow>
          </div>
          <h3 className="font-display font-normal text-[clamp(28px,2.6vw,36px)] tracking-[0.01em] leading-[1.05] text-white m-[0_0_18px] uppercase">
            {t("title")}
          </h3>
          <p className="text-muted text-[13px] leading-[1.6] max-w-[42ch] m-[0_0_24px]">
            {t("description")}
          </p>
          <div className="flex gap-2 flex-wrap">
            {/* Version Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setVerOpen(true)}
              onMouseLeave={() => setVerOpen(false)}
            >
              <button
                onClick={() => setVerOpen(!verOpen)}
                className="inline-flex items-center gap-1.5 bg-accent-10 text-accent border border-accent-30 rounded-full px-3 py-1.5 font-pixel text-[9px] tracking-[0.1em] transition-all hover:bg-accent hover:text-white"
              >
                v.3.1.0 <ChevSvg />
              </button>
              {verOpen && (
                <div className="absolute top-full left-0 pt-2 -ml-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="min-w-[110px] bg-card border border-line rounded-xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
                    {[
                      { v: "v.2.0.0", url: "https://v2.prionation.io/" },
                      { v: "v.1.0.0", url: "https://v1.prionation.io/" },
                    ].map((item) => (
                      <a
                        key={item.v}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full text-left px-4 py-2.5 hover:bg-accent/10 hover:text-white text-muted text-[9px] font-pixel transition-colors border-b last:border-0 border-line/50"
                      >
                        {item.v}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Language Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setLangOpen(true)}
              onMouseLeave={() => setLangOpen(false)}
            >
              <button
                onClick={() => setLangOpen(!langOpen)}
                disabled={isPending}
                className="inline-flex items-center gap-1.5 bg-accent-10 text-accent border border-accent-30 rounded-full px-3 py-1.5 font-pixel text-[9px] tracking-[0.1em] transition-all hover:bg-accent hover:text-white"
              >
                {locale.toUpperCase()} <ChevSvg />
              </button>
              {langOpen && (
                <div className="absolute top-full left-0 pt-2 -ml-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="min-w-[110px] bg-card border border-line rounded-xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
                    {[
                      { code: "en", name: "English" },
                      { code: "fr", name: "France" },
                      { code: "id", name: "Indonesia" },
                    ].map((l) => (
                      <button
                        key={l.code}
                        onClick={() => onLocaleChange(l.code)}
                        className={`w-full text-left px-4 py-2.5 hover:bg-accent/10 hover:text-white transition-colors border-b last:border-0 border-line/50 flex justify-between items-center ${locale === l.code ? "text-white bg-accent/5" : "text-muted"}`}
                      >
                        <span className="font-pixel text-[9px]">
                          {l.code.toUpperCase()}
                        </span>
                        <span className="opacity-40 ml-2 text-[7px] font-pixel">
                          {l.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-12 gap-x-8">
          {/* Row 1 */}
          <div>
            <h4 className="m-[0_0_16px] font-sans font-bold text-[12px] text-white tracking-[0.06em] uppercase flex items-center gap-2.5">
              <Dot className="shadow-[0_0_10px_var(--c-accent)]" />
              {t("labels.product")}
            </h4>
            <ul className="list-none p-0 m-0 flex flex-col gap-2">
              <li>
                <a
                  href="#how-we-work"
                  className="text-[13px] text-muted hover:text-white transition-colors"
                >
                  SKU 01 · Diagnostic
                </a>
              </li>
              <li>
                <a
                  href="#how-we-work"
                  className="text-[13px] text-muted hover:text-white transition-colors"
                >
                  SKU 02 · Build
                </a>
              </li>
              <li>
                <a
                  href="#how-we-work"
                  className="text-[13px] text-muted hover:text-white transition-colors"
                >
                  SKU 03 · Retainer
                </a>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-[13px] text-muted">Express Site</span>
                <span className="font-pixel text-[8px] tracking-[0.12em] text-line-soft uppercase">
                  {" "}
                  , soon
                </span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-[13px] text-muted">AI Consultation</span>
                <span className="font-pixel text-[8px] tracking-[0.12em] text-line-soft uppercase">
                  {" "}
                  , soon
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="m-[0_0_16px] font-sans font-bold text-[12px] text-white tracking-[0.06em] uppercase flex items-center gap-2.5">
              <Dot className="shadow-[0_0_10px_var(--c-accent)]" />
              {t("labels.resources")}
            </h4>
            <ul className="list-none p-0 m-0 flex flex-col gap-2">
              <li>
                <a
                  href="#how-we-work"
                  className="text-[13px] text-muted hover:text-white transition-colors"
                >
                  {t("nav.how_we_work")}
                </a>
              </li>
              <li>
                <a
                  href="#methodology"
                  className="text-[13px] text-muted hover:text-white transition-colors"
                >
                  {t("nav.methodology")}
                </a>
              </li>
              <li>
                <a
                  href="#selected-work"
                  className="text-[13px] text-muted hover:text-white transition-colors"
                >
                  {t("nav.selected_work")}
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="text-[13px] text-muted hover:text-white transition-colors"
                >
                  {t("nav.pricing")}
                </a>
              </li>
              <li>
                <a
                  href="#foundation"
                  className="text-[13px] text-muted hover:text-white transition-colors"
                >
                  {t("nav.foundation")}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="m-[0_0_16px] font-sans font-bold text-[12px] text-white tracking-[0.06em] uppercase flex items-center gap-2.5">
              <Dot className="shadow-[0_0_10px_var(--c-accent)]" />
              {t("labels.connect")}
            </h4>
            <ul className="list-none p-0 m-0 flex flex-col gap-2">
              <li>
                <a
                  href="#engage?tab=meet"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.hash = "engage?tab=meet";
                    document
                      .getElementById("engage")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-[13px] text-muted hover:text-white transition-colors"
                >
                  {t("nav.meet_us")}
                </a>
              </li>
              <li>
                <a
                  href="#engage?tab=diagnostic"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.hash = "engage?tab=diagnostic";
                    document
                      .getElementById("engage")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-[13px] text-muted hover:text-white transition-colors"
                >
                  {t("nav.diagnostic_form")}
                </a>
              </li>
              <li>
                <a
                  href="#engage?tab=careers"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.hash = "engage?tab=careers";
                    document
                      .getElementById("engage")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-[13px] text-muted hover:text-white transition-colors"
                >
                  {t("nav.careers")}
                </a>
              </li>
              <li>
                <a
                  href="mailto:consult@prionation.io"
                  className="text-[13px] text-muted hover:text-white transition-colors"
                >
                  consult@prionation.io
                </a>
              </li>
              <li>
                <a
                  href="https://maps.app.goo.gl/Dyu3N2rVPCw8UdGx9"
                  className="text-[13px] text-muted hover:text-white transition-colors"
                >
                  {t("nav.location")}
                </a>
                <span className="font-pixel text-[8px] tracking-[0.12em] text-line-soft uppercase">
                  , map
                </span>
              </li>
              <li className="text-line-soft font-pixel text-[8px] tracking-[0.12em] uppercase mt-3">
                {t("nav.response")}
              </li>
            </ul>
          </div>

          {/* Row 2 */}
          <div>
            <h4 className="m-[0_0_16px] font-sans font-bold text-[12px] text-white tracking-[0.06em] uppercase flex items-center gap-2.5">
              <Dot className="shadow-[0_0_10px_var(--c-accent)]" />
              {t("labels.use_cases")}
            </h4>
            <ul className="list-none p-0 m-0 flex flex-col gap-2">
              <li className="flex items-center gap-1.5">
                <span className="text-[13px] text-muted">Foundation Stats</span>
                <span className="font-pixel text-[8px] tracking-[0.12em] text-line-soft uppercase">
                  {" "}
                  , soon
                </span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-[13px] text-muted">
                  Intelligence Briefings
                </span>
                <span className="font-pixel text-[8px] tracking-[0.12em] text-line-soft uppercase">
                  {" "}
                  , soon
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="m-[0_0_16px] font-sans font-bold text-[12px] text-white tracking-[0.06em] uppercase flex items-center gap-2.5">
              <Dot className="shadow-[0_0_10px_var(--c-accent)]" />
              {t("labels.delivered")}
            </h4>
            <ul className="list-none p-0 m-0 flex flex-col gap-2">
              <li>
                <a
                  href="#selected-work"
                  className="text-[13px] text-muted hover:text-white transition-colors"
                >
                  Epidom
                </a>
              </li>
              <li>
                <a
                  href="#selected-work"
                  className="text-[13px] text-muted hover:text-white transition-colors"
                >
                  Expeditoo
                </a>
              </li>
              <li>
                <a
                  href="#selected-work"
                  className="text-[13px] text-muted hover:text-white transition-colors"
                >
                  The Lead Agent
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="py-6 text-center font-sans italic text-soft text-[13px] flex items-center justify-center gap-3.5 flex-wrap border-b border-line">
        {taglines.map((tag, i) => (
          <div key={tag} className="flex items-center gap-3.5">
            <em>{tag}</em>
            {i < taglines.length - 1 && (
              <span className="w-1 h-1 rounded-full bg-accent" />
            )}
          </div>
        ))}
      </div>

      <div className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-center font-pixel text-[9px] tracking-[0.15em] text-line-soft text-left md:text-center">
        <div className="text-left">{t("copyright")}</div>
        <div className="text-left md:text-center">{t("managed")}</div>
        <div className="flex justify-start md:justify-end gap-4 text-left md:text-right">
          <a
            href="https://www.instagram.com/prionation.io/"
            className="text-muted text-[13px] font-sans tracking-normal normal-case transition-colors duration-fast hover:text-white"
          >
            Instagram
          </a>
          <a
            href="https://www.linkedin.com/company/prionation-io/"
            className="text-muted text-[13px] font-sans tracking-normal normal-case transition-colors duration-fast hover:text-white"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/prayoga-cpu"
            className="text-muted text-[13px] font-sans tracking-normal normal-case transition-colors duration-fast hover:text-white"
          >
            GitHub
          </a>
          <a
            href="https://discord.gg/FYB5HmYtg9"
            className="text-muted text-[13px] font-sans tracking-normal normal-case transition-colors duration-fast hover:text-white"
          >
            Discord
          </a>
        </div>
      </div>
    </footer>
  );
}
