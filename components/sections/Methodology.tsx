"use client";

import { useTranslations } from "next-intl";
import { Icon } from "../icons";
import { SectionHead } from "../ui/Atoms";

type PrincipleData = {
  title: string;
  body: string;
};

const ICONS = ["check-circle", "activity", "key", "clock"];

function Principle({
  n, title, body, icon,
}: {
  n: string; title: string; body: string; icon: string;
}) {
  return (
    <div className="bg-card p-5 md:p-[32px_28px] flex flex-col gap-2 md:gap-3 min-h-[240px] md:min-h-[320px] relative transition-colors duration-fast hover:bg-card-soft">
      <div className="flex items-center justify-between">
        <span className="text-accent font-pixel text-[9px] md:text-[10px] tracking-[0.14em]">/{n}</span>
      </div>
      <div className="mt-1 w-8 h-8 md:w-9 md:h-9 rounded-lg bg-accent-10 text-accent inline-flex items-center justify-center border border-accent-30">
        <Icon name={icon} size={18} className="w-4 h-4 md:w-[18px] md:h-[18px]" />
      </div>
      <h3 className="font-sans font-extrabold text-[16px] md:text-[24px] tracking-[-0.02em] leading-tight text-white mt-2 md:mt-3 mb-0">{title}</h3>
      <p className="text-muted text-[12px] md:text-sm leading-[1.5] md:leading-[1.6] mt-1 mb-0">{body}</p>
    </div>
  );
}

export function Methodology() {
  const t = useTranslations("Methodology");
  const principles = t.raw("principles") as PrincipleData[];

  return (
    <section id="methodology" className="relative overflow-hidden px-page-x py-[140px] border-y border-line">
      <div className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(60%_60%_at_20%_10%,var(--c-accent-glow),transparent_60%),radial-gradient(50%_40%_at_90%_90%,rgba(235,69,159,0.18),transparent_65%)]" />
      <div className="absolute inset-0 pointer-events-none z-10 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(80%_80%_at_50%_50%,#000_30%,transparent_90%)]" />
      <div className="relative z-20 max-w-max-w mx-auto">
        <SectionHead
          n="02"
          label={t("label")}
          title={t("title")}
          link={t("link")}
          linkHref="/methodology"
        />
        <div className="mt-10 md:mt-14 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[1px] bg-line rounded-[16px] md:rounded-[24px] overflow-hidden pn-ring-wrap border border-line">
          {principles.map((p, i) => (
            <Principle
              key={i}
              n={String(i + 1).padStart(2, "0")}
              icon={ICONS[i]}
              title={p.title}
              body={p.body}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
