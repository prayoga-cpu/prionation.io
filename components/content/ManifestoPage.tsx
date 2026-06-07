"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export function ManifestoPage() {
  const t = useTranslations("Manifesto");

  return (
    <div className="px-page-x pt-[130px] pb-[120px]">
      <div className="max-w-[760px] mx-auto">
        <nav className="flex items-center gap-1.5 text-[12px] text-muted font-sans flex-wrap mb-10" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-white transition-colors">{t("breadcrumbHome")}</Link>
          <span className="opacity-40">/</span>
          <Link href="/ai-product-engineering-for-mid-market-companies" className="hover:text-white transition-colors">{t("breadcrumbAnchor")}</Link>
          <span className="opacity-40">/</span>
          <span className="text-soft">{t("breadcrumbManifesto")}</span>
        </nav>

        <div className="font-pixel text-[10px] tracking-[0.15em] text-accent uppercase mb-6">
          {t("badge")}
        </div>
        
        <h1 className="font-sans font-extrabold text-[clamp(32px,4vw,56px)] leading-[1.05] tracking-[-0.03em] text-white mb-10">
          {t("h1")}
        </h1>

        <div className="prose-like text-soft text-[17px] md:text-[19px] leading-[1.7] space-y-6">
          <p>
            {t("p1")}
          </p>
          <p>
            {t("p2")}
          </p>
          <p>
            {t("p3")}
          </p>
          <p>
            {t("p4")}
          </p>
          <p className="font-medium text-white p-6 border-l-2 border-accent bg-accent/5 my-8 rounded-r-lg">
            {t("dirtySecret")}
          </p>
        </div>

        <div className="my-16 flex justify-center opacity-40">
          <svg width="40" height="4" viewBox="0 0 40 4" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="4" height="4" fill="currentColor"/>
            <rect x="18" width="4" height="4" fill="currentColor"/>
            <rect x="36" width="4" height="4" fill="currentColor"/>
          </svg>
        </div>

        <h2 className="font-sans font-bold text-[clamp(24px,3vw,32px)] text-white tracking-[-0.02em] mb-10">
          {t("askThree")}
        </h2>

        <div className="space-y-8">
          <div className="bg-card border border-line-soft rounded-[20px] p-6 md:p-8 hover:border-accent/40 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-start gap-4 md:gap-6">
              <div className="w-10 h-10 rounded-full bg-accent-10 border border-accent-30 flex items-center justify-center shrink-0 font-pixel text-[14px] text-accent mt-0.5">1</div>
              <div>
                <h3 className="text-white font-bold text-[20px] mb-3">{t("q1Title")}</h3>
                <p className="text-soft text-[16px] leading-[1.7] mb-5">
                  {t("q1Body")}
                </p>
                <div className="text-[12px] font-pixel tracking-[0.05em] text-accent uppercase">{t("q1Footer")}</div>
              </div>
            </div>
          </div>

          <div className="bg-card border border-line-soft rounded-[20px] p-6 md:p-8 hover:border-blue-500/40 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-start gap-4 md:gap-6">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 font-pixel text-[14px] text-blue-400 mt-0.5">2</div>
              <div>
                <h3 className="text-white font-bold text-[20px] mb-3">{t("q2Title")}</h3>
                <p className="text-soft text-[16px] leading-[1.7] mb-5">
                  {t("q2Body")}
                </p>
                <div className="text-[12px] font-pixel tracking-[0.05em] text-blue-400 uppercase">{t("q2Footer")}</div>
              </div>
            </div>
          </div>

          <div className="bg-card border border-line-soft rounded-[20px] p-6 md:p-8 hover:border-green-500/40 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-start gap-4 md:gap-6">
              <div className="w-10 h-10 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center shrink-0 font-pixel text-[14px] text-green-400 mt-0.5">3</div>
              <div>
                <h3 className="text-white font-bold text-[20px] mb-3">{t("q3Title")}</h3>
                <p className="text-soft text-[16px] leading-[1.7] mb-5">
                  {t("q3Body")}
                </p>
                <div className="text-[12px] font-pixel tracking-[0.05em] text-green-400 uppercase">{t("q3Footer")}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="my-16 flex justify-center opacity-40">
          <svg width="40" height="4" viewBox="0 0 40 4" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="4" height="4" fill="currentColor"/>
            <rect x="18" width="4" height="4" fill="currentColor"/>
            <rect x="36" width="4" height="4" fill="currentColor"/>
          </svg>
        </div>

        <div className="prose-like text-soft text-[17px] md:text-[19px] leading-[1.7] space-y-6">
          <p>
            {t("p5")}
          </p>
          <p className="font-bold text-white text-[22px] leading-snug pt-4">
            {t("p6Lead")}<br/>
            <span className="text-accent">{t("p6Accent")}</span>
          </p>
        </div>

        <div className="my-16 border-t border-line-soft pt-16">
          <h2 className="font-sans font-extrabold text-[clamp(28px,3.5vw,40px)] text-white tracking-[-0.02em] mb-8">
            {t("gapTitle")}
          </h2>
          <div className="space-y-4 text-soft text-[17px] leading-[1.7] mb-10">
            <p><strong className="text-white">{t("gap1Bold")}</strong>{t("gap1Normal")}</p>
            <p><strong className="text-white">{t("gap2Bold")}</strong>{t("gap2Normal")}</p>
            <p><strong className="text-white">{t("gap3Bold")}</strong>{t("gap3Normal")}</p>
          </div>

          <div className="p-6 md:p-8 bg-card border border-line-soft rounded-[20px]">
            <div className="font-pixel text-[10px] tracking-[0.15em] text-accent uppercase mb-6">{t("accTitle")}</div>
            <ul className="space-y-4 font-sans text-soft text-[15px] md:text-[16px]">
              {(t.raw("accList") as string[]).map((item, idx) => {
                let boldPart = "";
                let normalPart = "";
                if (item.includes(".")) {
                  const dotIdx = item.indexOf(".");
                  boldPart = item.slice(0, dotIdx + 1);
                  normalPart = item.slice(dotIdx + 1);
                } else if (item.includes("—")) {
                  const dashIdx = item.indexOf("—");
                  boldPart = item.slice(0, dashIdx);
                  normalPart = item.slice(dashIdx);
                } else {
                  normalPart = item;
                }
                return (
                  <li key={idx} className="flex items-start gap-4">
                    <svg className="w-5 h-5 text-accent shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                    <span>
                      {boldPart && <strong className="text-white">{boldPart}</strong>}
                      {normalPart}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="my-16 flex justify-center opacity-40">
          <svg width="40" height="4" viewBox="0 0 40 4" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="4" height="4" fill="currentColor"/>
            <rect x="18" width="4" height="4" fill="currentColor"/>
            <rect x="36" width="4" height="4" fill="currentColor"/>
          </svg>
        </div>

        <div className="prose-like text-soft text-[17px] md:text-[19px] leading-[1.7] space-y-6 text-center">
          <p>{t("p7")}</p>
          <p>{t("p8")}</p>
          <p>
            {t("p9Lead")}<br/>
            <span className="text-white font-medium">{t("p9Accent")}</span>
          </p>
          <p>{t("p10")}</p>
          
          <div className="pt-8 pb-4">
            <p className="font-bold text-white text-[20px] md:text-[26px] max-w-[28ch] mx-auto leading-snug">
              {t("qualification")}
            </p>
          </div>
        </div>

        <div className="mt-12 pt-12 border-t border-line-soft flex justify-center">
          <div className="bg-card border border-accent/30 rounded-[32px] p-8 md:p-12 text-center shadow-[0_0_50px_rgba(88,101,242,0.1)] relative overflow-hidden group w-full max-w-[500px]">
             <div className="absolute inset-0 bg-gradient-to-t from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative z-10">
              <h3 className="font-sans font-extrabold text-[28px] text-white mb-3">{t("ctaTitle")}</h3>
              <p className="text-muted text-[15px] mb-8">{t("ctaBody")}</p>
              <Link
                href="/#engage"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent text-white font-sans font-bold text-[15px] hover:bg-accent/90 transition-transform hover:scale-105"
              >
                {t("ctaButton")} <span className="opacity-80">→</span>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
