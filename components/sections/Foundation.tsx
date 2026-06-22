import { useRef } from "react";
import { m } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { SectionHead } from "../ui/Atoms";
import { Icon } from "../icons";

type TeamMember = { pixel: string; name: string; role: string; bio: string };

function PersonCard({
  member,
  poweredBy,
}: {
  member: TeamMember;
  poweredBy: string;
}) {
  return (
    <div className="bg-card border border-line rounded-[24px] md:rounded-[28px] overflow-hidden flex flex-col transition-all duration-fast hover:border-line-soft group h-full">
      <div className="aspect-[4/3] md:aspect-[4/5] relative overflow-hidden bg-card-soft shrink-0">
        <Image
          src={`/images/team/${member.name.split(" ")[0].toLowerCase()}.jpeg`}
          alt={member.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-slow group-hover:scale-105"
        />
        <div className="absolute top-3 right-3 md:top-4 md:right-4 z-10">
          <span className="font-pixel text-[7px] md:text-[8px] tracking-[0.16em] text-white/50 uppercase bg-black/40 backdrop-blur-md px-2 py-1 md:px-2.5 md:py-1.5 rounded-full border border-white/10">
            {member.pixel}
          </span>
        </div>
      </div>
      <div className="p-5 md:p-7 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-3 md:mb-4">
          <div>
            <h3 className="font-sans font-extrabold text-[20px] md:text-[24px] tracking-[-0.018em] text-white mb-0.5 leading-tight">
              {member.name}
            </h3>
            <div className="font-pixel text-[8px] md:text-[9px] tracking-[0.16em] text-accent uppercase">
              {member.role}
            </div>
          </div>
          <a
            href={
              member.name === "Darwin Prayoga"
                ? "https://www.linkedin.com/in/darwinprayoga/"
                : "https://www.linkedin.com/in/evan-cao-52282bb6/"
            }
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 transition-all hover:bg-white/10 hover:text-white shrink-0 ml-3"
            aria-label={`${member.name}'s LinkedIn`}
          >
            <Icon
              name="linkedin"
              size={16}
              className="md:w-[18px] md:h-[18px]"
            />
          </a>
        </div>
        <p className="mb-4 md:mb-8 text-soft text-[13px] md:text-[14px] leading-[1.5] md:leading-[1.6] line-clamp-3 md:line-clamp-none">
          {member.bio}
        </p>
        <div className="mt-auto flex items-center gap-2 text-[9px] md:text-[10px] text-muted font-sans font-medium uppercase tracking-wider opacity-60">
          <Icon name="linkedin" size={12} className="text-muted" />
          {poweredBy}
        </div>
      </div>
    </div>
  );
}

function MobileCarousel({ children }: { children: React.ReactNode[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // One crawlable copy only — a snap-scroll carousel of the real cards. (Was
  // cloning the set 15× = 45 duplicate DOM nodes, which bloated crawl budget.)
  return (
    <div
      ref={scrollRef}
      className="relative w-[100vw] -ml-[var(--page-x)] flex overflow-x-auto snap-x snap-mandatory md:hidden mt-8 py-4 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      style={{ scrollPaddingLeft: "var(--page-x)" }}
    >
      <div className="flex gap-4 px-[var(--page-x)] w-max">
        {children.map((child, i) => (
          <m.div
            key={i}
            className="snap-start shrink-0 w-[280px] h-[480px] origin-left"
            initial={{ scale: 0.85, opacity: 0.35 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ root: scrollRef, amount: 0.75 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
          >
            {child}
          </m.div>
        ))}
        {/* Spacer to allow the final item to snap properly */}
        <div className="w-[var(--page-x)] shrink-0" />
      </div>
    </div>
  );
}

export function Foundation() {
  const t = useTranslations("Foundation");
  const team = t.raw("team") as TeamMember[];

  const cards = [
    ...team.map((person, i) => (
      <PersonCard key={`person-${i}`} member={person} poweredBy={t("powered_by")} />
    )),
    <div
      key="pod-card"
      className="bg-transparent border border-line rounded-[24px] md:rounded-[28px] p-5 md:p-7 flex flex-col justify-center border-dashed h-full md:min-h-0"
    >
      <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-6">
        <Icon name="users" size={24} />
      </div>
      <h3 className="font-sans font-extrabold text-[22px] tracking-[-0.018em] text-white mb-2 leading-tight">
        {t("pod_title")}
      </h3>
      <div className="font-pixel text-[9px] tracking-[0.16em] text-muted uppercase mb-4">
        {t("pod_role")}
      </div>
      <p className="text-muted text-[14px] leading-[1.6] mb-0">
        {t("pod_desc")}
      </p>
    </div>,
  ];

  return (
    <section
      id="foundation"
      className="relative px-page-x py-[110px] max-w-max-w mx-auto"
    >
      <SectionHead n="05" label={t("label")} title={t("title")} />

      {/* Desktop Grid */}
      <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {cards}
      </div>

      {/* Mobile Carousel */}
      <MobileCarousel>{cards}</MobileCarousel>
    </section>
  );
}
