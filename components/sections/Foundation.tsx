"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { SectionHead } from "../ui/Atoms";
import { Icon } from "../icons";

type TeamMember = { pixel: string; name: string; role: string; bio: string };

function PersonCard({ member, poweredBy }: { member: TeamMember; poweredBy: string }) {
  return (
    <div className="bg-card border border-line rounded-[28px] overflow-hidden flex flex-col transition-all duration-fast hover:border-line-soft group">
      <div className="aspect-[4/5] relative overflow-hidden bg-card-soft">
        <Image
          src={`/images/team/${member.name.split(" ")[0].toLowerCase()}.jpeg`}
          alt={member.name}
          fill
          className="object-cover transition-transform duration-slow group-hover:scale-105"
        />
        <div className="absolute top-4 right-4 z-10">
          <span className="font-pixel text-[8px] tracking-[0.16em] text-white/50 uppercase bg-black/40 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-white/10">
            {member.pixel}
          </span>
        </div>
      </div>
      <div className="p-7 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-sans font-extrabold text-[24px] tracking-[-0.018em] text-white mb-0.5 leading-tight">{member.name}</h3>
            <div className="font-pixel text-[9px] tracking-[0.16em] text-accent uppercase">{member.role}</div>
          </div>
          <a
            href={member.name === "Darwin Prayoga"
              ? "https://www.linkedin.com/in/darwinprayoga/"
              : "https://www.linkedin.com/in/evan-cao-52282bb6/"}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 transition-all hover:bg-white/10 hover:text-white"
            aria-label={`${member.name}'s LinkedIn`}
          >
            <Icon name="linkedin" size={18} />
          </a>
        </div>
        <p className="mb-8 text-soft text-[14px] leading-[1.6]">{member.bio}</p>
        <div className="mt-auto flex items-center gap-2 text-[10px] text-muted font-sans font-medium uppercase tracking-wider opacity-60">
          <Icon name="linkedin" size={12} className="text-muted" />
          {poweredBy}
        </div>
      </div>
    </div>
  );
}

export function Foundation() {
  const t = useTranslations("Foundation");
  const team = t.raw("team") as TeamMember[];

  return (
    <section id="foundation" className="relative px-page-x py-[110px] max-w-max-w mx-auto">
      <SectionHead n="05" label={t("label")} title={t("title")} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {team.map((m, i) => (
          <PersonCard key={i} member={m} poweredBy={t("powered_by")} />
        ))}

        {/* Pod card */}
        <div className="bg-card border border-line rounded-[28px] p-7 flex flex-col justify-center border-dashed bg-transparent">
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
        </div>
      </div>
    </section>
  );
}
