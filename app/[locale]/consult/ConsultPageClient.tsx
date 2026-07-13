"use client";

import { useTranslations } from "next-intl";
import { m } from "framer-motion";
import { Link } from "@/i18n/routing";
import { Eyebrow } from "@/components/ui/Atoms";
import { staggerFast, fadeUp } from "@/lib/motion";
import { ConsultChatPanel } from "@/components/consult/ConsultChatPanel";

export function ConsultPageClient() {
  const t = useTranslations("Consult");

  return (
    <main className="min-h-screen bg-bg px-page-x py-14 sm:py-20">
      <m.div
        variants={staggerFast}
        initial="hidden"
        animate="visible"
        className="max-w-[760px] mx-auto flex flex-col gap-7"
      >
        <m.div variants={fadeUp} className="text-center">
          <Eyebrow>{t("badge")}</Eyebrow>
          <h1 className="font-sans font-extrabold text-[28px] sm:text-[36px] tracking-[-0.02em] text-white mt-4 mb-3">
            {t("title")}
          </h1>
          <p className="text-soft text-[15px] leading-relaxed max-w-[560px] mx-auto m-0">
            {t("subhead")}
          </p>
        </m.div>

        <m.div variants={fadeUp}>
          <ConsultChatPanel />
        </m.div>

        <m.div variants={fadeUp} className="text-center">
          <Link
            href="/"
            className="text-muted text-[13px] no-underline hover:text-soft transition-colors duration-fast"
          >
            ← PRIONATION.io
          </Link>
        </m.div>
      </m.div>
    </main>
  );
}
