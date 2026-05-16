"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { SectionHead } from "../ui/Atoms";
import Image from "next/image";
import { staggerSlow, fadeUp } from "@/lib/motion";

type CaseData = {
  name: string;
  geo: string;
  tag: string;
  year: string;
  body: string;
};

const CASE_LINKS = [
  "https://epidom-eight.vercel.app/",
  "https://expeditoo-rho.vercel.app/",
  "https://lead-agent-lac.vercel.app/",
];
const CASE_IMGS = ["/work/epidom.png", "/work/expeditoo.png", "/work/lead-agent.png"];

function CaseTile({
  c, link, img, viewLabel,
}: {
  c: CaseData; link: string; img: string; viewLabel: string;
}) {
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      variants={fadeUp}
      whileHover={{ y: -8, transition: { type: "spring", stiffness: 320, damping: 22 } }}
      className="bg-card rounded-[24px] p-6 flex flex-col gap-4 min-h-[380px] relative overflow-hidden isolate border border-line transition-colors duration-300 hover:bg-card-soft hover:border-soft hover:shadow-[0_24px_50px_rgba(0,0,0,0.5)] group lg:col-span-3"
    >
      <div className="flex justify-between items-center">
        <span className="font-pixel text-[9px] tracking-[0.15em] text-accent uppercase">{c.tag}</span>
        <span className="text-muted font-pixel text-[9px] tracking-[0.15em]">{c.year}</span>
      </div>
      <div className="rounded-xl flex-1 min-h-[160px] relative overflow-hidden bg-card-soft border border-line-soft">
        <Image src={img} alt={c.name} fill className="object-cover object-top transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 z-10" />
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="font-sans font-extrabold text-[20px] text-white tracking-tight uppercase">{c.name}</div>
        <div className="font-pixel text-[9px] tracking-[0.16em] text-muted uppercase">{c.geo}</div>
      </div>
      <p className="text-soft text-[14px] leading-[1.6] line-clamp-3">{c.body}</p>
      <div className="mt-auto pt-4 flex items-center gap-2 text-[12px] font-bold text-accent">
        {viewLabel}{" "}
        <motion.span aria-hidden="true" className="inline-block" whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}>→</motion.span>
      </div>
    </motion.a>
  );
}

export function SelectedWork() {
  const t = useTranslations("SelectedWork");
  const cases = t.raw("cases") as CaseData[];

  return (
    <section id="selected-work" className="relative px-page-x py-[140px] max-w-max-w mx-auto">
      <SectionHead n="03" label={t("label")} title={t("title")} link={t("link")} />
      <motion.div
        variants={staggerSlow}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="grid grid-cols-1 lg:grid-cols-[repeat(9,1fr)] gap-5"
      >
        {cases.map((c, i) => (
          <CaseTile key={i} c={c} link={CASE_LINKS[i]} img={CASE_IMGS[i]} viewLabel={t("view_project")} />
        ))}
      </motion.div>
    </section>
  );
}
