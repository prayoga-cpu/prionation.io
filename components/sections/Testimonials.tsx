"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Stars } from "../ui/Stars";

/**
 * "Our Clients Say" — client testimonials with a star rating.
 *
 * ── Adding real testimonials ───────────────────────────────────────────────
 * Replace the placeholder entries with REAL client quotes only — never
 * fabricated reviews or borrowed quotes. Add an avatar at `public/testimonials/`:
 *   { quote: "…", name: "Jane Doe", role: "CTO, Acme", rating: 5, avatar: "/testimonials/jane.jpg" }
 */
type Testimonial = {
  quote: string;
  name: string;
  role: string;
  rating: number;
  avatar?: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote: "We were drowning in operational complexity, then this model turned it into production, in weeks.",
    name: "Evan Cao",
    role: "CEO at Epidom",
    rating: 4.5,
    avatar: "/testimonials/evan-cao.jpg",
  },
  // DRAFTS — suggested copy. Get each person's written sign-off (and their real
  // rating) before publishing; do not present these as their words until approved.
  {
    quote: "Our logistics ran on spreadsheets and guesswork. They turned it into a production AI system in weeks — and handed us the keys.",
    name: "Nicolas Rémy",
    role: "Business owner of Expeditoo",
    rating: 5,
    avatar: "/testimonials/nicolas-remy.jpg",
  },
  {
    quote: "They built lead-gen that works the way our agents actually sell, and had it live before most teams finish scoping.",
    name: "Luke",
    role: "Founder of The Lead Agent",
    rating: 5,
    avatar: "/testimonials/luke.jpg",
  },
];

function initials(name: string) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]?.toUpperCase()).join("");
}

function TestimonialCard({ t }: { t: Testimonial }) {
  const [imgOk, setImgOk] = useState(Boolean(t.avatar));
  return (
    <figure className="bg-card border border-line rounded-[24px] p-6 md:p-8 flex flex-col gap-5 h-full">
      <Stars rating={t.rating} />
      <blockquote className="text-soft text-[15px] md:text-[17px] leading-[1.6] m-0 flex-1">
        &ldquo;{t.quote}&rdquo;
      </blockquote>
      <figcaption className="flex items-center gap-3">
        {t.avatar && imgOk ? (
          <Image
            src={t.avatar}
            alt={t.name}
            width={44}
            height={44}
            onError={() => setImgOk(false)}
            className="h-11 w-11 rounded-full object-cover border border-white/10"
          />
        ) : (
          <span
            aria-hidden="true"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/40 font-sans text-[13px] font-semibold"
          >
            {initials(t.name)}
          </span>
        )}
        <span className="flex flex-col">
          <span className="text-white font-sans font-semibold text-[14px] leading-tight">{t.name}</span>
          <span className="text-muted text-[12px] leading-tight mt-0.5">{t.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  const t = useTranslations("Testimonials");

  return (
    <section className="max-w-max-w mx-auto px-page-x pb-[100px]" aria-label={t("heading")}>
      <h2 className="text-center font-pixel text-[10px] tracking-[0.2em] text-muted uppercase mb-10">
        {t("heading")}
      </h2>
      <div className={`grid gap-5 mx-auto ${TESTIMONIALS.length === 1 ? "max-w-[620px]" : "md:grid-cols-2 lg:grid-cols-3 max-w-[1100px]"}`}>
        {TESTIMONIALS.map((item, i) => (
          <TestimonialCard key={i} t={item} />
        ))}
      </div>
    </section>
  );
}
