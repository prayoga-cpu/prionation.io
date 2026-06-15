"use client";

import { useTranslations } from "next-intl";
import { m } from "framer-motion";
import { Dot } from "../ui/Atoms";
import { staggerNormal, slideInLeft, fadeUp } from "@/lib/motion";

export function HowWeWork() {
  const t = useTranslations("HowWeWork");
  const rows = t.raw("rows") as { label: string; them: string; us: string }[];
  const highlights = [true, false, true, false, true, false];

  return (
    <section
      id="how-we-work"
      className="px-page-x py-[120px] border-y border-line bg-[radial-gradient(circle_at_50%_50%,rgba(88,101,242,0.05)_0%,transparent_70%)]"
    >
      <div className="max-w-[1100px] mx-auto">
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="flex flex-col items-center text-center mb-16"
        >
          <div className="text-muted font-pixel text-[10px] tracking-[0.15em] mb-4 flex items-center gap-2.5 uppercase">
            <Dot className="shadow-[0_0_10px_var(--c-accent)]" />
            {t("eyebrow")}
          </div>
          <h2 className="font-sans font-extrabold text-[clamp(32px,4.2vw,54px)] leading-[1.02] tracking-[-0.03em] m-0 text-white uppercase">
            {t("title")}
          </h2>
        </m.div>

        <m.div
          variants={staggerNormal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="bg-card border border-line-soft rounded-[28px] overflow-hidden shadow-2xl"
        >
          {/* Header row */}
          <m.div
            variants={fadeUp}
            className="grid grid-cols-[1.1fr_1fr_1fr] bg-card-soft border-b border-line-soft"
          >
            <div className="p-3 md:p-6 lg:px-8 flex items-center justify-center md:justify-start">
              <span className="md:hidden font-pixel text-[7px] text-muted tracking-widest">{t("col_metric")}</span>
            </div>
            <div className="p-3 md:p-6 lg:px-8 border-l border-line-soft font-pixel text-[8px] md:text-[10px] tracking-[0.12em] text-muted uppercase text-center md:text-left">
              {t("col_inhouse")}
            </div>
            <div className="p-3 md:p-6 lg:px-8 border-l border-line-soft font-pixel text-[8px] md:text-[10px] tracking-[0.12em] text-accent uppercase text-center md:text-left">
              {t("col_pod")}
            </div>
          </m.div>

          {rows.map((r, i) => (
            <m.div
              key={i}
              variants={slideInLeft}
              transition={{ delay: i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className={`grid grid-cols-[1.1fr_1fr_1fr] border-b border-line-soft last:border-0 ${highlights[i] ? "bg-white/[0.02]" : ""}`}
            >
              <div className="p-3 md:p-6 lg:px-8 text-[10px] md:text-[14px] font-sans font-medium text-soft flex items-center leading-tight">
                {r.label}
              </div>
              <div className="p-3 md:p-6 lg:px-8 border-l border-line-soft text-[10px] md:text-[14px] text-red-400/80 flex items-center leading-tight">
                {r.them}
              </div>
              <div className={`p-3 md:p-6 lg:px-8 border-l border-line-soft text-[10px] md:text-[14px] flex items-center leading-tight ${highlights[i] ? "text-accent font-bold" : "text-green-400/90 font-semibold"}`}>
                {r.us}
              </div>
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
}
