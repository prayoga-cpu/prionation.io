"use client";

import { useTranslations } from "next-intl";
import { Icon } from "../icons";
import { SectionHead } from "../ui/Atoms";

type PrincipleData = {
  title: string;
  body: string;
  cta?: string;
};

const ICONS = ["check-circle", "activity", "key", "sparkles"];

function Principle({
  n, title, body, icon, comingSoon, cta, onNotify,
}: {
  n: string; title: string; body: string; icon: string;
  comingSoon?: boolean; cta?: string; onNotify?: () => void;
}) {
  return (
    <div className={`bg-card p-[32px_28px] flex flex-col gap-3 min-h-[320px] relative transition-colors duration-fast hover:bg-card-soft ${comingSoon ? "!bg-transparent border border-dashed border-line-soft -m-[1px] opacity-85" : ""}`}>
      <div className="flex items-center justify-between">
        <span className="text-accent font-pixel text-[10px] tracking-[0.14em]">/{n}</span>
      </div>
      <div className="mt-1 w-9 h-9 rounded-lg bg-accent-10 text-accent inline-flex items-center justify-center border border-accent-30">
        <Icon name={icon} size={18} />
      </div>
      <h3 className="font-sans font-extrabold text-[24px] tracking-[-0.02em] text-white mt-3 mb-0">{title}</h3>
      <p className="text-muted text-sm leading-[1.6] mt-1 mb-0">{body}</p>
      {comingSoon && (
        <button
          onClick={onNotify}
          className="mt-auto self-start bg-transparent border-0 p-0 text-accent font-sans font-semibold text-[13px] inline-flex items-center gap-2 cursor-pointer"
        >
          {cta} <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
        </button>
      )}
      {comingSoon && (
        <span className="absolute top-[18px] right-[18px] font-pixel text-[8px] tracking-[0.14em] text-accent bg-accent-10 border border-accent-30 px-2 py-1.5 rounded-md uppercase">
          Coming Soon
        </span>
      )}
    </div>
  );
}

export function Methodology({ onNotify }: { onNotify: () => void }) {
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
        />
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[1px] bg-line rounded-[24px] overflow-hidden pn-ring-wrap border border-line">
          {principles.map((p, i) => (
            <Principle
              key={i}
              n={String(i + 1).padStart(2, "0")}
              icon={ICONS[i]}
              title={p.title}
              body={p.body}
              comingSoon={i === 3}
              cta={p.cta}
              onNotify={i === 3 ? onNotify : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
