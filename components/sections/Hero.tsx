"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Eyebrow, Btn } from "../ui/Atoms";
import { Typewriter } from "../ui/Typewriter";
import { useCountUp } from "@/hooks/useCountUp";
import { staggerFast, fadeUp } from "@/lib/motion";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

/** Individual stat with number scramble counter */
function AnimatedStat({
  target,
  prefix = "",
  suffix = "",
  label,
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  label: string;
}) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const display = useCountUp(target, { start: inView, prefix, suffix });

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      className="flex flex-col items-center gap-1.5 shrink-0 scale-[0.8] md:scale-100 origin-center"
    >
      <div className="flex items-baseline gap-1 md:gap-2">
        <span className="font-pixel text-[24px] md:text-[28px] leading-none text-white tabular-nums">
          {display}
        </span>
      </div>
      <span className="font-pixel text-[7.5px] md:text-[9px] tracking-[0.1em] md:tracking-[0.15em] text-muted uppercase text-center whitespace-nowrap">
        {label}
      </span>
    </motion.div>
  );
}

export function Hero() {
  const t = useTranslations("Hero");
  const words = t.raw("words") as string[];

  return (
    <section
      id="top"
      className="relative overflow-hidden px-page-x pt-[80px] pb-[100px] min-h-screen flex flex-col justify-center"
    >
      {/* Background layers */}
      <div className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(60%_50%_at_12%_18%,var(--c-accent-glow)_0%,transparent_60%),radial-gradient(45%_40%_at_92%_80%,rgba(235,69,159,0.15)_0%,transparent_65%),linear-gradient(180deg,#0c0e1a_0%,#08090d_70%)]" />

      {/* Grid overlay, fades out after 1.5s */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-10 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(70%_70%_at_50%_30%,#000_30%,transparent_80%)]"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0.35 }}
        transition={{ delay: 1.6, duration: 1.2, ease: "easeOut" }}
      />

      {/* Content stagger container */}
      <motion.div
        className="relative z-20 max-w-[1100px] mx-auto w-full flex flex-col items-center text-center"
        variants={staggerFast}
        initial="hidden"
        animate="visible"
      >
        {/* Eyebrow */}
        <motion.div variants={fadeUp}>
          <Eyebrow>
            {t("eyebrow")} <span className="hidden md:block">· v.3.1.0</span>
          </Eyebrow>
        </motion.div>

        {/* H1 */}
        <motion.h1
          variants={fadeUp}
          className="font-display font-normal text-[clamp(44px,5.8vw,80px)] leading-[1.1] md:leading-none tracking-normal text-white my-[26px] text-balance max-w-[20ch] uppercase"
        >
          {t("title_main")}{" "}
          <span className="text-accent">{t("title_accent")}</span>
          <br />
          <span className="inline-block bg-[linear-gradient(180deg,#fff_0%,#fff_55%,#babbbe_100%)] bg-clip-text text-transparent">
            <Typewriter words={words} />
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={fadeUp}
          className="max-w-[58ch] text-soft text-[17px] leading-[1.55] mb-8 mx-0"
        >
          {t("description")}
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          className="flex gap-3 flex-wrap justify-center"
        >
          <Btn
            variant="primary"
            onClick={() => {
              window.location.hash = "engage?tab=diagnostic";
              scrollTo("engage");
            }}
          >
            {t("cta_diagnostic")}{" "}
            <span className="text-[12px] opacity-80">→</span>
          </Btn>
          <Btn
            variant="ghost"
            onClick={() => {
              window.location.hash = "engage?tab=meet";
              scrollTo("engage");
            }}
          >
            {t("cta_meet")}
          </Btn>
        </motion.div>

        {/* Stats row */}
        <motion.div
          variants={staggerFast}
          className="mt-[60px] flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 w-full max-w-[90vw] md:max-w-none"
        >
          {/* Build Rate ≥60% */}
          <div className="order-1 md:order-3">
            <AnimatedStat
              target={60}
              prefix="≥ "
              suffix="%"
              label={t("stat_diagnostic")}
            />
          </div>

          {/* Deliverables & Production */}
          <div className="order-2 flex flex-row items-center justify-center gap-8 md:gap-16 w-full md:w-auto">
            <AnimatedStat
              target={2}
              suffix={` ${t("weeks")}`}
              label={t("stat_deliverable")}
            />
            <AnimatedStat
              target={8}
              suffix={` ${t("weeks")}`}
              label={t("stat_production")}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
