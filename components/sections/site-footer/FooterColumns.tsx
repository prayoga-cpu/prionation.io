"use client";

import { useTranslations } from "next-intl";
import { Dot } from "../../ui/Atoms";

export function FooterColumns() {
  const t = useTranslations("Footer");

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-y-12 gap-x-8">
      {/* Row 1 */}
      <div>
        <h4 className="m-[0_0_16px] font-sans font-bold text-[12px] text-white tracking-[0.06em] uppercase flex items-center gap-2.5">
          <Dot className="shadow-[0_0_10px_var(--c-accent)]" />
          {t("labels.product")}
        </h4>
        <ul className="list-none p-0 m-0 flex flex-col gap-2">
          <li>
            <a href="#how-we-work" className="text-[13px] text-muted hover:text-white transition-colors">
              SKU 01 · Diagnostic
            </a>
          </li>
          <li>
            <a href="#how-we-work" className="text-[13px] text-muted hover:text-white transition-colors">
              SKU 02 · Build
            </a>
          </li>
          <li>
            <a href="#how-we-work" className="text-[13px] text-muted hover:text-white transition-colors">
              SKU 03 · Retainer
            </a>
          </li>
          <li className="flex items-center gap-1.5">
            <span className="text-[13px] text-muted">Express Site</span>
            <span className="font-pixel text-[8px] tracking-[0.12em] text-line-soft uppercase"> soon</span>
          </li>
          <li className="flex items-center gap-1.5">
            <span className="text-[13px] text-muted">AI Consultation</span>
            <span className="font-pixel text-[8px] tracking-[0.12em] text-line-soft uppercase"> soon</span>
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
            <a href="#how-we-work" className="text-[13px] text-muted hover:text-white transition-colors">
              {t("nav.how_we_work")}
            </a>
          </li>
          <li>
            <a href="#methodology" className="text-[13px] text-muted hover:text-white transition-colors">
              {t("nav.methodology")}
            </a>
          </li>
          <li>
            <a href="#selected-work" className="text-[13px] text-muted hover:text-white transition-colors">
              {t("nav.selected_work")}
            </a>
          </li>
          <li>
            <a href="#pricing" className="text-[13px] text-muted hover:text-white transition-colors">
              {t("nav.pricing")}
            </a>
          </li>
          <li>
            <a href="#foundation" className="text-[13px] text-muted hover:text-white transition-colors">
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
                document.getElementById("engage")?.scrollIntoView({ behavior: "smooth" });
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
                document.getElementById("engage")?.scrollIntoView({ behavior: "smooth" });
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
                document.getElementById("engage")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-[13px] text-muted hover:text-white transition-colors"
            >
              {t("nav.careers")}
            </a>
          </li>
          <li>
            <a href="mailto:consult@prionation.io" className="text-[13px] text-muted hover:text-white transition-colors">
              consult@prionation.io
            </a>
          </li>
          <li>
            <a href="https://maps.app.goo.gl/Dyu3N2rVPCw8UdGx9" className="text-[13px] text-muted hover:text-white transition-colors">
              {t("nav.location")}
            </a>
            <span className="font-pixel text-[8px] tracking-[0.12em] text-line-soft uppercase"> map</span>
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
            <span className="font-pixel text-[8px] tracking-[0.12em] text-line-soft uppercase"> soon</span>
          </li>
          <li className="flex items-center gap-1.5">
            <span className="text-[13px] text-muted">Intelligence Briefings</span>
            <span className="font-pixel text-[8px] tracking-[0.12em] text-line-soft uppercase"> soon</span>
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
            <a href="#selected-work" className="text-[13px] text-muted hover:text-white transition-colors">
              Epidom
            </a>
          </li>
          <li>
            <a href="#selected-work" className="text-[13px] text-muted hover:text-white transition-colors">
              Expeditoo
            </a>
          </li>
          <li>
            <a href="#selected-work" className="text-[13px] text-muted hover:text-white transition-colors">
              The Lead Agent
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
