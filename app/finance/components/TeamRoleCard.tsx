import Image from "next/image";
import type { FinanceRole } from "@/lib/finance/auth/otp";

export type TeamMember = {
  role: FinanceRole;
  pixel: string;
  name: string;
  jobTitle: string;
  bio: string;
  photo: string;
};

// Real Foundation section data (components/sections/Foundation.tsx /
// messages/en.json's Foundation.team) — same people, same photos, same
// bios, adapted into a compact login-picker card.
export const FINANCE_TEAM: TeamMember[] = [
  {
    role: "ceo",
    pixel: "ROLE · FOUNDER / CEO",
    name: "Darwin Prayoga",
    jobTitle: "Founder & CEO",
    bio: "Indonesian technologist and product architect. Orchestrates the PRIONATION transformation, owning vision and product strategy.",
    photo: "/images/team/darwin.jpeg",
  },
  {
    role: "cro",
    pixel: "ROLE · CRO",
    name: "Evan Cao",
    jobTitle: "Chief Revenue Officer",
    bio: "Paris-based operator and founder of Epidom. Bridging the gap between Asian delivery and European demand.",
    photo: "/images/team/evan.jpeg",
  },
];

export function TeamRoleCard({ member }: { member: TeamMember }) {
  return (
    <div className="w-full h-full bg-card border border-line rounded-[24px] overflow-hidden flex flex-col shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
      <div className="relative h-[62%] shrink-0 bg-card-soft overflow-hidden">
        <Image
          src={member.photo}
          alt={member.name}
          fill
          sizes="280px"
          className="object-cover"
          draggable={false}
        />
        <div className="absolute top-3 right-3">
          <span className="font-pixel text-[7px] tracking-[0.14em] text-white/60 uppercase bg-black/40 backdrop-blur-md px-2 py-1 rounded-full border border-white/10">
            {member.pixel}
          </span>
        </div>
      </div>
      <div className="p-4 flex flex-col flex-1 min-h-0">
        <h3 className="font-sans font-extrabold text-[17px] tracking-[-0.01em] text-white leading-tight mb-0.5">
          {member.name}
        </h3>
        <div className="font-pixel text-[8px] tracking-[0.14em] text-accent uppercase mb-2">
          {member.jobTitle}
        </div>
        <p className="text-soft text-[11.5px] leading-[1.5] line-clamp-3">{member.bio}</p>
      </div>
    </div>
  );
}
