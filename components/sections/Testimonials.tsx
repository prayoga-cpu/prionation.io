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

// Empty until a client approves their own words in writing. The previous
// entries were unapproved drafts plus a self-review from our own CRO with
// placeholder ratings, which broke the no-fabricated-data rule (removed
// 2026-10-14). Each new entry needs: the client's written sign-off on the exact
// quote, their real rating (or none), and permission for name/photo/company.
const TESTIMONIALS: Testimonial[] = [];

function initials(name: string) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]?.toUpperCase()).join("");
}

function TestimonialCard({ t }: { t: Testimonial }) {
  const [imgOk, setImgOk] = useState(Boolean(t.avatar));
  return (
    <figure className="bg-card border border-line rounded-[24px] p-6 md:p-8 flex flex-col gap-5 h-full">
      <div className="flex items-center gap-2.5">
        <Stars rating={t.rating} />
        <span className="font-sans text-[13px] font-semibold leading-none text-[#f6c453]">
          {Number.isInteger(t.rating) ? String(t.rating) : t.rating.toFixed(1)}
          <span className="text-muted font-normal"> / 5</span>
        </span>
      </div>
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
  if (TESTIMONIALS.length === 0) return null;

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
