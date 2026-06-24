"use client";

import { useTranslations } from "next-intl";
import { m } from "framer-motion";
import { trackEvent } from "@/lib/analytics/events";
import { Dot, Btn } from "../ui/Atoms";
import { Icon } from "../icons";
import { staggerSlow, fadeUp, staggerNormal } from "@/lib/motion";

type PlanData = {
  name: string; label: string; price: string; period: string;
  desc: string; cta: string; features: string[];
};

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function Pricing() {
  const t = useTranslations("Pricing");
  const plans = t.raw("plans") as (PlanData & { featured?: boolean })[];
  // Mark the middle plan as featured
  const plansWithFeatured = plans.map((p, i) => ({ ...p, featured: i === 1 }));

  return (
    <section id="pricing" className="px-page-x py-[140px] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_20%_80%,rgba(88,101,242,0.03)_0%,transparent_60%)]" />
      <div className="max-w-max-w mx-auto relative z-20">

        {/* Section header */}
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="flex flex-col mb-16"
        >
          <div className="text-muted font-pixel text-[10px] tracking-[0.15em] mb-4 flex items-center gap-2.5 uppercase">
            <Dot className="shadow-[0_0_10px_var(--c-accent)]" />
            {t("eyebrow")}
          </div>
          <h2 className="font-sans font-extrabold text-[clamp(32px,4.2vw,54px)] leading-[1.02] tracking-[-0.03em] m-0 text-white uppercase max-w-[15ch]">
            {t("title")}
          </h2>
        </m.div>

        {/* Pricing cards */}
        <m.div
          variants={staggerSlow}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {plansWithFeatured.map((p) => (
            <m.div
              key={p.name}
              variants={fadeUp}
              whileHover={
                p.featured
                  ? { y: -6, boxShadow: "0 0 60px rgba(88,101,242,0.2), 0 24px 50px rgba(0,0,0,0.4)", transition: { type: "spring", stiffness: 320, damping: 22 } }
                  : { y: -4, transition: { type: "spring", stiffness: 320, damping: 22 } }
              }
              className={`relative group rounded-[28px] p-8 flex flex-col transition-colors duration-300 ${
                p.featured
                  ? "bg-white/[0.04] border border-accent/40 shadow-[0_0_40px_rgba(88,101,242,0.1)] pn-shimmer-border"
                  : "bg-card border border-line-soft hover:border-soft"
              }`}
            >
              {p.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-white font-pixel text-[8px] tracking-[0.1em] px-3 py-1 rounded-full uppercase shadow-lg z-30">
                  {t("most_popular")}
                </div>
              )}

              <div className="mb-8">
                <span className="font-pixel text-[9px] tracking-[0.12em] text-muted uppercase">{p.label} · {p.name}</span>
                <h3 className="font-sans font-bold text-[28px] text-white mt-3 mb-1">{p.name}</h3>
                <div className="flex items-baseline gap-2 mt-4">
                  <span className="text-white font-sans font-extrabold text-[36px]">€{p.price}</span>
                  <span className="text-muted font-sans text-[14px]">{p.period}</span>
                </div>
                <p className="text-soft text-[14px] leading-[1.6] mt-4 min-h-[48px]">{p.desc}</p>
              </div>

              <div className="flex-grow">
                <m.ul
                  variants={staggerNormal}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="list-none p-0 m-0 flex flex-col gap-4"
                >
                  {p.features.map((f) => (
                    <m.li key={f} variants={fadeUp} className="flex items-start gap-3 text-[14px] text-soft">
                      <Icon name="check-circle" size={16} className="text-accent shrink-0 mt-0.5" />
                      {f}
                    </m.li>
                  ))}
                </m.ul>
              </div>

              <div className="mt-10">
                <Btn
                  variant={p.featured ? "primary" : "ghost"}
                  className="w-full justify-center"
                  onClick={() => { trackEvent("pricing_cta_click", { plan: p.name }); window.location.hash = "engage?tab=diagnostic"; scrollTo("engage"); }}
                >
                  {p.cta} <span className="text-[12px] opacity-80 ml-1">→</span>
                </Btn>
              </div>
            </m.div>
          ))}
        </m.div>

        {/* Express Site floater */}
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-20 flex justify-center"
        >
          <m.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
            className="bg-[#0c0d12] border border-line-soft rounded-[24px] p-6 md:p-8 flex flex-col items-center text-center gap-6 relative overflow-hidden group max-w-[540px] shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          >
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(88,242,135,0.08)_0%,transparent_70%)]" />
            <div className="relative z-10 flex flex-col items-center">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-sans font-bold text-[22px] text-white">{t("express_title")}</h3>
                <span className="bg-green-500/10 text-green-400 font-pixel text-[8px] tracking-[0.1em] px-2.5 py-1 rounded-full uppercase border border-green-500/20">
                  {t("express_badge")}
                </span>
              </div>
              <p className="text-soft text-[14px] leading-[1.5] max-w-[34ch] mb-6">
                {t("express_desc", { days: t("express_days") })}
              </p>
              <div className="flex flex-col items-center gap-4">
                <div className="font-sans font-extrabold text-[28px] text-green-400">
                  €1,500{" "}
                  <span className="text-[12px] text-muted font-normal uppercase tracking-wider ml-1">{t("express_base")}</span>
                </div>
                <Btn
                  variant="ghost"
                  className="px-8 border-green-500/20 hover:border-green-500/50 hover:text-green-400 bg-green-500/[0.02]"
                  onClick={() => { trackEvent("pricing_cta_click", { plan: "Express Site" }); window.location.hash = "engage?tab=diagnostic"; scrollTo("engage"); }}
                >
                  {t("express_cta")} <span className="text-[12px] opacity-80 ml-1">→</span>
                </Btn>
              </div>
            </div>
          </m.div>
        </m.div>
      </div>
    </section>
  );
}
