"use client";

import { useTranslations } from "next-intl";

/**
 * Trust/▸specialization marquee under the hero. Infinite horizontal scroll with
 * masked edges and pause-on-hover.
 *
 * ── Adding real logos ──────────────────────────────────────────────────────
 * Replace the placeholder slots below with entries that have a `src`:
 *   { name: "Acme", src: "/logos/acme.svg" }
 * Drop the asset in `public/logos/`. ONLY use marks you have the right to show
 * (your own clients/partners, or tech you actually use) — no borrowed logos.
 */
type Logo = { name: string; src?: string; sizeClass?: string };

const LOGOS: Logo[] = [
  { name: "Epidom", src: "/logos/epidom.svg" },
  { name: "Claude", src: "/logos/claude.svg" },
  { name: "Vercel", src: "/logos/vercel.svg", sizeClass: "h-6" },
  { name: "The Lead Agent", src: "/logos/the-lead-agent.svg" },
  { name: "Expeditoo", src: "/logos/expeditoo.svg" },
  { name: "Stripe", src: "/logos/stripe.svg" },
];

function LogoItem({ logo }: { logo: Logo }) {
  return (
    <div className="flex-shrink-0 px-3 md:px-4">
      <div className="flex h-11 items-center justify-center">
        {logo.src ? (
          // Plain <img>: variable-aspect SVG logos render at a uniform height
          // (h-7) with natural width; next/image would force one aspect ratio.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={logo.src}
            alt={logo.name}
            loading="lazy"
            decoding="async"
            style={{ filter: "brightness(0) invert(1)" }}
            className={`${logo.sizeClass ?? "h-7"} w-auto max-w-[200px] object-contain opacity-75 hover:opacity-100 transition-opacity duration-300`}
          />
        ) : (
          <span className="flex h-7 w-[120px] items-center justify-center rounded-md border border-dashed border-white/10 bg-white/[0.02] px-3 font-sans text-[11px] font-semibold uppercase tracking-wider text-white/25">
            {logo.name}
          </span>
        )}
      </div>
    </div>
  );
}

export function LogoMarquee() {
  const t = useTranslations("Marquee");
  const maskImage =
    "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)";

  return (
    <section className="border-t border-white/10 py-8" aria-label={t("heading")}>
      <div className="max-w-max-w mx-auto px-page-x mb-5">
        <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.1em] text-white/30">
          {t("heading")}
        </h2>
      </div>

      <div
        className="relative w-full overflow-hidden"
        style={{ maskImage, WebkitMaskImage: maskImage }}
      >
        <div
          className="flex w-max animate-scroll-logos hover:[animation-play-state:paused]"
          style={{ animationDuration: "120s" }}
        >
          {/* One real set + a duplicate for the seamless loop. The duplicate is
              hidden from assistive tech and crawlers (single crawlable copy). */}
          <div className="flex">
            {LOGOS.map((logo, i) => (
              <LogoItem key={`a-${i}`} logo={logo} />
            ))}
          </div>
          <div className="flex" aria-hidden="true">
            {LOGOS.map((logo, i) => (
              <LogoItem key={`b-${i}`} logo={logo} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
