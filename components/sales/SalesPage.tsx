import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { PillLogo } from "@/app/finance/components/PillLogo";
import { Dot } from "@/components/ui/Typography";
import { LocaleSwitcher } from "@/components/ui/LocaleSwitcher";
import { ConsentSettingsLink } from "@/components/ConsentSettingsLink";
import { CONTACT_EMAIL, PHONE_DISPLAY_FR, WHATSAPP_DISPLAY } from "@/lib/seo/site";
import { ShowcaseSlideshow } from "@/components/ui/ShowcaseSlideshow";
import { WhatsAppCta } from "./WhatsAppCta";
import { TelLink } from "./ContactLinks";
import { StickyCta } from "./StickyCta";
import { Reveal } from "./Reveal";

/**
 * /start — sales page for paid traffic (Meta ads → /fr/start). Rebuilt in
 * v3.10.0 after the first campaign (83 landing-page views, 0 chats) and the
 * audit that followed:
 * - the first phone screen answers what the ad click asks: what you get, for
 *   whom, how long it takes and who replies — with the button above a compact
 *   consent banner. Prices are not shown (team decision 2026-10-14: the ads
 *   target small-business owners); Evan quotes in the conversation;
 * - WhatsApp stays the main way in, with a phone link next to it and a
 *   sticky bar on phones;
 * - only verifiable proof (Epidom disclosed as our own product; no unapproved
 *   quotes; no uncited cost figures);
 * - every view and tap is counted without cookies (lib/analytics/counter.ts).
 * Copy: messages/*.json → "Sales".
 */

type Item = { title: string; body: string };
type Price = { label: string; value: string };
type Step = { title: string; meta: string; body: string };
type Case = { tag: string; name: string; body: string; alt: string; slug: string };
type Faq = { q: string; a: string };

// Clients and our own product are labelled separately: Epidom is built and run
// by our team, so it is never presented as a client.
const CLIENT_LOGOS = [
  { name: "Serrurier Paris Express", src: "/logos/serrurier-paris-express.svg", h: "h-[30px]" },
  { name: "GLVitr'Clean", src: "/logos/glvitr-clean.svg", h: "h-[30px]" },
  { name: "Expedion", src: "/logos/expedion.svg", h: "h-6" },
  { name: "Expeditoo", src: "/logos/expeditoo.svg", h: "h-[26px]" },
  { name: "The Lead Agent", src: "/logos/the-lead-agent.svg", h: "h-6" },
];
const OWN_LOGOS = [{ name: "Epidom", src: "/logos/epidom.svg", h: "h-[26px]" }];

// Index-aligned with messages/*.json → Sales.work.cases ("expeditoo" = Expedion × Expeditoo).
const CASE_SLUGS = ["epidom", "serrurier-paris-express", "glvitr-clean", "expeditoo", "acte", "the-lead-agent"];

// ─── Shared class strings ──────────────────────────────────────────────────

const CONTAINER = "max-w-max-w mx-auto px-page-x";
const CTA =
  "inline-flex items-center justify-center gap-3 rounded-full bg-accent text-white font-sans font-bold text-center transition-all duration-fast hover:-translate-y-0.5 hover:bg-[#6773ff] hover:shadow-[0_0_0_6px_rgba(88,101,242,0.18),0_18px_48px_rgba(88,101,242,0.45)]";
const CARD = "bg-card border border-white/10";
const LABEL = "font-sans text-[12px] font-semibold tracking-[0.08em] uppercase";
const LINK = "text-white underline underline-offset-4 decoration-white/30 hover:decoration-white";
const GRID_BG =
  "bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px]";

// ─── Glyphs ────────────────────────────────────────────────────────────────

function WhatsAppGlyph({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="shrink-0">
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35zM12.04 21.5h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.57.94.95-3.48-.22-.36a9.38 9.38 0 0 1-1.44-5.02c0-5.2 4.23-9.42 9.43-9.42 2.52 0 4.88.98 6.66 2.76a9.36 9.36 0 0 1 2.76 6.67c0 5.2-4.23 9.42-9.42 9.42zm8.02-17.44A11.27 11.27 0 0 0 12.04.75C5.8.75.72 5.83.72 12.07c0 2 .52 3.94 1.51 5.65L.62 23.25l5.67-1.49a11.3 11.3 0 0 0 5.75 1.47h.01c6.24 0 11.32-5.08 11.32-11.32 0-3.02-1.18-5.87-3.31-8z" />
    </svg>
  );
}

// The "P." brand mark — same paths as the mobile wordmark in components/Header.tsx.
function BrandMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="11 10 151 299"
      fill="white"
      aria-hidden="true"
      className={`w-auto drop-shadow-[0_1px_6px_rgba(255,255,255,0.35)] ${className}`}
    >
      <path d="M161.594 178.315C161.594 191.264 157.049 202.282 147.958 211.373C139.143 220.189 128.399 224.596 115.727 224.596H58.2888C45.6167 224.596 34.7351 220.189 25.6442 211.373C16.5533 202.282 12.0078 191.264 12.0078 178.315V56.8281C12.0078 48.2883 14.0739 40.5746 18.2062 33.6877C22.6139 26.5251 28.2613 20.8779 35.1483 16.7457C42.0352 12.6135 49.7489 10.5474 58.2888 10.5474H115.727C124.267 10.5474 131.98 12.6135 138.867 16.7457C145.754 20.8779 151.264 26.5251 155.396 33.6877C159.528 40.5746 161.594 48.2883 161.594 56.8281V178.315ZM112.834 170.464V65.5058C112.834 63.8529 112.146 62.4754 110.768 61.3736C109.666 60.2717 108.427 59.7207 107.049 59.7207H66.9664C65.5889 59.7207 64.2117 60.2717 62.8342 61.3736C61.7324 62.4754 61.1813 63.8529 61.1813 65.5058V170.464C61.1813 171.842 61.7324 173.082 62.8342 174.183C64.2117 175.284 65.5889 175.836 66.9664 175.836H107.049C108.427 175.836 109.666 175.284 110.768 174.183C112.146 173.082 112.834 171.842 112.834 170.464Z" />
      <path d="M73.9911 277.541C73.9911 286.079 70.8232 293.382 64.487 299.441C58.4265 305.501 51.126 308.532 42.5862 308.532C34.3217 308.532 27.0215 305.501 20.6854 299.441C14.6248 293.382 11.5945 286.079 11.5945 277.541C11.5945 269.002 14.6248 261.699 20.6854 255.64C27.0215 249.58 34.3217 246.549 42.5862 246.549C51.126 246.549 58.4265 249.58 64.487 255.64C70.8232 261.699 73.9911 269.002 73.9911 277.541Z" />
    </svg>
  );
}

const GLYPHS: Record<string, React.ReactNode> = {
  grid: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
    </>
  ),
  clock: (
    <>
      <path d="M12 8v4l3 2" />
      <circle cx="12" cy="12" r="9" />
    </>
  ),
  person: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
    </>
  ),
  wrench: (
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  ),
  lock: (
    <>
      <rect x="3" y="11" width="18" height="10" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </>
  ),
  shield: (
    <>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  lines: <path d="M4 7h16M4 12h16M4 17h10" />,
  exit: <path d="M9 18l6-6-6-6" />,
  check: <path d="M20 6 9 17l-5-5" />,
};

function Glyph({ name, size = 22, strokeWidth = 1.8 }: { name: string; size?: number; strokeWidth?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      {GLYPHS[name]}
    </svg>
  );
}

// Section label + headline.
function Head({ eyebrow, title, children }: { eyebrow: string; title: React.ReactNode; children?: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4 max-w-[760px]">
      <div className={`text-soft ${LABEL} flex items-center gap-2.5`}>
        <Dot className="shadow-[0_0_10px_var(--c-accent)]" />
        {eyebrow}
      </div>
      <h2 className="font-sans font-extrabold text-[clamp(28px,4vw,46px)] leading-[1.08] tracking-[-0.03em] m-0 text-balance">
        {title}
      </h2>
      {children}
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────

export async function SalesPage() {
  const t = await getTranslations("Sales");
  const tf = await getTranslations("Footer");
  const locale = await getLocale();
  const phone = locale === "fr" ? PHONE_DISPLAY_FR : WHATSAPP_DISPLAY;

  const strong = (chunks: React.ReactNode) => <strong className="text-white font-semibold">{chunks}</strong>;
  const msg = t("whatsappMessage");
  const refLabel = t("refLabel");

  const prices = t.raw("hero.prices") as Price[];
  const problems = t.raw("problem.items") as Item[];
  const steps = t.raw("prix.steps") as Step[];
  const guarantees = t.raw("prix.guarantees") as Item[];
  const cases = (t.raw("work.cases") as Omit<Case, "slug">[]).map((c, i) => ({ ...c, slug: CASE_SLUGS[i] }));
  const faqs = t.raw("faq.items") as Faq[];

  const PROBLEM_ICONS = ["grid", "clock", "person", "wrench"];
  const GUARANTEE_ICONS = ["lock", "shield", "lines", "exit"];

  // The second way in, shown under every main button: phone.
  const altLine = (placement: string, size = "text-[14px]") => (
    <p className={`m-0 ${size} text-soft leading-[1.6]`}>
      {t("hero.altLabel")}{" "}
      <TelLink placement={placement} locale={locale} className={LINK}>
        {t("hero.call", { phone })}
      </TelLink>
    </p>
  );

  return (
    <div className="min-h-screen bg-bg text-white font-sans overflow-x-clip">
      {/* Consent-free page-view counter (no cookie, no identifier): lib/analytics/counter.ts */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/api/m/v?l=${locale}`} alt="" width={1} height={1} aria-hidden="true" className="absolute w-px h-px opacity-0 pointer-events-none" />

      {/* ============ NAV ============ */}
      <header className="relative z-10 border-b border-line">
        <div className={`${CONTAINER} py-3 sm:py-4 flex items-center justify-between gap-2 sm:gap-4`}>
          <a href="#top" aria-label={t("nav.home")} className="flex items-center shrink-0">
            <span className="sm:hidden">
              <PillLogo compact />
            </span>
            <span className="hidden sm:inline-flex">
              <PillLogo />
            </span>
          </a>
          <nav aria-label={t("nav.label")} className="hidden lg:flex items-center gap-7 text-[15px]">
            <a href="#process" className="text-soft transition-colors duration-fast hover:text-white">{t("nav.prix")}</a>
            <a href="#work" className="text-soft transition-colors duration-fast hover:text-white">{t("nav.work")}</a>
            <a href="#faq" className="text-soft transition-colors duration-fast hover:text-white">{t("nav.faq")}</a>
          </nav>
          <div className="flex items-center gap-2 sm:gap-4">
            <span className="hidden sm:inline-flex">
              <LocaleSwitcher compact />
            </span>
            <WhatsAppCta
              message={msg}
              refLabel={refLabel}
              placement="nav"
              locale={locale}
              className={`${CTA} px-4 sm:px-5 text-[15px] min-h-[44px]`}
            >
              <WhatsAppGlyph size={18} />
              <span className="sm:hidden">{t("nav.ctaShort")}</span>
              <span className="hidden sm:inline">{t("nav.cta")}</span>
            </WhatsAppCta>
          </div>
        </div>
      </header>

      <main>
        {/* ============ HERO ============ */}
        <section id="top" className={`relative pt-5 pb-14 sm:pt-12 md:pt-[72px] md:pb-24 ${GRID_BG}`}>
          <div
            aria-hidden="true"
            className="absolute left-1/2 -top-[260px] w-[1100px] h-[760px] -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(88,101,242,0.30),rgba(88,101,242,0))] pointer-events-none"
          />
          <div className={`relative ${CONTAINER} flex flex-wrap items-start gap-12 lg:gap-14`}>
            <div className="flex-[1_1_480px] min-w-0 flex flex-col gap-4 sm:gap-5">
              {/* Hidden on very short screens so the button stays above the consent banner. */}
              <p className="m-0 text-[13px] sm:text-[14px] font-semibold text-[#b7c0ff] [@media(max-height:600px)]:hidden">{t("hero.eyebrow")}</p>
              <h1 className="m-0 font-extrabold text-[clamp(30px,8.6vw,52px)] leading-[1.06] tracking-[-0.03em] text-balance">
                {t("hero.title")}
              </h1>
              <p className="m-0 text-[16px] sm:text-[18px] md:text-[19px] leading-[1.55] text-soft max-w-[580px]">{t("hero.sub")}</p>

              <WhatsAppCta
                id="hero-cta"
                message={msg}
                refLabel={refLabel}
                placement="hero"
                locale={locale}
                className={`${CTA} w-full sm:w-auto sm:self-start text-[17px] md:text-[18px] px-6 sm:px-7 min-h-[56px] shadow-[0_14px_40px_rgba(88,101,242,0.38)]`}
              >
                <WhatsAppGlyph size={22} />
                {t("hero.cta")}
              </WhatsAppCta>

              <div className="flex items-center gap-3">
                <Image
                  src="/images/team/evan-studio.jpg"
                  alt={t("hero.evanAlt")}
                  width={44}
                  height={44}
                  className="w-11 h-11 rounded-full object-cover object-[center_20%] border border-white/15 shrink-0"
                />
                <p className="m-0 flex flex-col leading-[1.4]">
                  <span className="text-[14px] font-semibold text-white">{t("hero.evanName")}</span>
                  <span className="text-[13.5px] text-soft">{t("hero.evanLine")}</span>
                </p>
              </div>

              <dl className="m-0 grid grid-cols-3 gap-px bg-white/[0.08] border border-white/[0.08] rounded-2xl overflow-hidden max-w-[580px]">
                {prices.map((p) => (
                  <div key={p.label} className="bg-card px-3 py-3 sm:px-4 sm:py-4 flex flex-col gap-1">
                    <dt className="text-[12px] sm:text-[13px] text-soft leading-[1.3]">{p.label}</dt>
                    <dd className="m-0 text-[15px] sm:text-[17px] font-bold leading-tight text-white whitespace-nowrap">{p.value}</dd>
                  </div>
                ))}
              </dl>

              {altLine("hero")}

              <a href="#work" className="self-start text-[14px] text-[#b7c0ff] hover:text-white">
                {t("hero.secondary")} <span aria-hidden="true">↓</span>
              </a>
            </div>

            <figure className="flex-[1_1_480px] min-w-0 m-0 flex flex-col gap-3">
              <div className="relative rounded-[18px] border border-white/15 bg-card overflow-hidden shadow-[0_40px_90px_rgba(0,0,0,0.6)]">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.08] bg-card-soft">
                  <span aria-hidden="true" className="w-[11px] h-[11px] rounded-full bg-line-soft shrink-0" />
                  <span aria-hidden="true" className="w-[11px] h-[11px] rounded-full bg-line-soft shrink-0" />
                  <span aria-hidden="true" className="w-[11px] h-[11px] rounded-full bg-line-soft shrink-0" />
                  <span className="ml-3 flex-1 min-w-0 truncate bg-bg rounded-lg px-3 py-1.5 text-soft text-[12px]">
                    {t("hero.browserBar")}
                  </span>
                </div>
                <div className="relative aspect-[1280/850]">
                  <ShowcaseSlideshow slug="epidom" alt={t("hero.imageAlt")} sizes="(min-width: 1024px) 600px, 100vw" />
                </div>
                <div className="absolute left-3 bottom-3 flex items-center gap-3 bg-[rgba(12,13,18,0.92)] border border-white/15 rounded-2xl px-3.5 py-2.5">
                  <span className="w-[30px] h-[30px] rounded-[9px] bg-accent flex items-center justify-center shrink-0 text-white">
                    <Glyph name="check" size={16} strokeWidth={2.5} />
                  </span>
                  <span className="flex flex-col gap-0.5">
                    <span className="font-bold text-[14px]">{t("hero.liveTitle")}</span>
                    <span className="text-[12px] text-soft">{t("hero.liveSub")}</span>
                  </span>
                </div>
              </div>
              <figcaption className="text-[13px] text-soft">{t("hero.caption")}</figcaption>
            </figure>
          </div>
        </section>

        {/* ============ LOGOS ============ */}
        <section className="border-y border-line bg-[#0a0b10]">
          <div className={`${CONTAINER} py-7 flex flex-col sm:flex-row sm:items-end gap-7 sm:gap-12`}>
            {[
              { label: t("logos.clients"), logos: CLIENT_LOGOS },
              { label: t("logos.own"), logos: OWN_LOGOS },
            ].map((group, gi) => (
              <div key={gi} className={`flex flex-col gap-4 ${gi ? "sm:border-l sm:border-white/15 sm:pl-12" : ""}`}>
                <h2 className={`m-0 text-soft ${LABEL}`}>{group.label}</h2>
                <ul className="m-0 p-0 list-none flex flex-wrap items-center gap-x-10 gap-y-4">
                  {group.logos.map((logo) => (
                    <li key={logo.name}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={logo.src}
                        alt={logo.name}
                        loading="lazy"
                        decoding="async"
                        style={{ filter: "brightness(0) invert(1)" }}
                        className={`${logo.h} w-auto opacity-70`}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ============ PROBLEM ============ */}
        <section className="py-16 md:pt-24 md:pb-20">
          <Reveal>
            <div className={`${CONTAINER} flex flex-col gap-9`}>
              <Head eyebrow={t("problem.eyebrow")} title={t("problem.title")}>
                <p className="m-0 text-[17px] md:text-[18px] leading-[1.6] text-soft">{t("problem.intro")}</p>
              </Head>
              <ul className="m-0 p-0 list-none grid gap-3 sm:grid-cols-2">
                {problems.map((p, i) => (
                  <li key={p.title} className={`${CARD} rounded-2xl p-5 flex gap-4`}>
                    <span className="w-10 h-10 rounded-xl bg-accent-10 border border-accent-30 flex items-center justify-center text-[#b7c0ff] shrink-0">
                      <Glyph name={PROBLEM_ICONS[i]} size={20} />
                    </span>
                    <span className="flex flex-col gap-1">
                      <span className="text-[17px] font-bold leading-[1.3]">{p.title}</span>
                      <span className="text-[15px] leading-[1.55] text-soft">{p.body}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </section>

        {/* ============ PROCESS (no prices shown) ============ */}
        <section id="process" className={`py-16 md:py-24 border-y border-line bg-[#0a0b10] ${GRID_BG}`}>
          <div className={`${CONTAINER} flex flex-col gap-10`}>
            <Reveal>
              <Head eyebrow={t("prix.eyebrow")} title={t("prix.title")} />
            </Reveal>
            <Reveal>
              <ol className="m-0 p-0 list-none grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {steps.map((s, i) => (
                  <li
                    key={s.title}
                    className={`${CARD} rounded-[20px] p-6 flex flex-col gap-3 ${i === 2 ? "border-[rgba(88,101,242,0.5)] shadow-[0_0_0_6px_rgba(88,101,242,0.08)]" : ""}`}
                  >
                    <span className="text-[13px] font-semibold text-[#b7c0ff]">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="m-0 text-[22px] font-extrabold tracking-[-0.02em]">{s.title}</h3>
                    <p className="m-0 text-[15px] font-semibold text-white">{s.meta}</p>
                    <p className="m-0 text-[15px] leading-[1.6] text-soft">{s.body}</p>
                  </li>
                ))}
              </ol>
            </Reveal>
            <Reveal>
              <div className="flex flex-col gap-5">
                <h3 className="m-0 text-[20px] md:text-[22px] font-extrabold">{t("prix.guaranteesTitle")}</h3>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {guarantees.map((g, i) => (
                    <div key={g.title} className="flex flex-col gap-2.5">
                      <span className="text-[#b7c0ff]">
                        <Glyph name={GUARANTEE_ICONS[i]} size={26} />
                      </span>
                      <h4 className="m-0 text-[17px] font-bold">{g.title}</h4>
                      <p className="m-0 text-[15px] leading-[1.6] text-soft">{g.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
            <div className="flex flex-col gap-3">
              <WhatsAppCta
                message={t("whatsappMessagePrix")}
                refLabel={refLabel}
                placement="prix"
                locale={locale}
                className={`${CTA} w-full sm:w-auto sm:self-start text-[16px] px-6 min-h-[52px]`}
              >
                <WhatsAppGlyph size={20} />
                {t("prix.cta")}
              </WhatsAppCta>
              {altLine("prix")}
            </div>
          </div>
        </section>

        {/* ============ STORY ============ */}
        <section className="py-16 md:py-24">
          <Reveal>
            <div className={CONTAINER}>
              <div className="bg-card border border-white/10 rounded-[28px] overflow-hidden flex flex-wrap">
                <div className="flex-[1_1_320px] min-w-0 relative min-h-[340px] md:min-h-[420px]">
                  <Image
                    src="/images/team/evan-studio.jpg"
                    alt={t("story.imageAlt")}
                    fill
                    sizes="(min-width: 1024px) 500px, 100vw"
                    className="object-cover object-[center_20%]"
                  />
                  <div className="absolute left-5 bottom-5 max-w-[calc(100%-40px)] inline-flex items-center gap-2.5 bg-[rgba(8,9,13,0.85)] border border-white/15 rounded-full px-4 py-2.5 text-white text-[13px] font-semibold">
                    <Dot />
                    {t("story.badge")}
                  </div>
                </div>
                <div className="flex-[1.3_1_420px] min-w-0 p-7 sm:p-10 lg:p-14 flex flex-col gap-5">
                  <div className={`text-soft ${LABEL} flex items-center gap-2.5`}>
                    <Dot className="shadow-[0_0_10px_var(--c-accent)]" />
                    {t("story.eyebrow")}
                  </div>
                  <h2 className="m-0 font-extrabold text-[clamp(26px,3.4vw,40px)] leading-[1.12] tracking-[-0.03em] text-balance">
                    {t("story.quote")}
                  </h2>
                  <p className="m-0 text-[16px] md:text-[17px] leading-[1.7] text-soft">{t("story.p1")}</p>
                  <p className="m-0 text-[16px] md:text-[17px] leading-[1.7] text-soft">{t.rich("story.p2", { strong })}</p>
                  <WhatsAppCta
                    message={t("whatsappMessageStory")}
                    refLabel={refLabel}
                    placement="story"
                    locale={locale}
                    className={`${CTA} self-stretch sm:self-start text-[16px] px-6 py-3.5 min-h-[48px]`}
                  >
                    {t("story.cta")} <span aria-hidden="true">→</span>
                  </WhatsAppCta>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ============ WORK ============ */}
        <section id="work" className="pb-16 md:pb-24">
          <div className={`${CONTAINER} flex flex-col gap-10`}>
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-6">
                <Head eyebrow={t("work.eyebrow")} title={t("work.title")} />
                <p className="m-0 text-[16px] leading-[1.6] text-soft max-w-[380px]">{t("work.intro")}</p>
              </div>
            </Reveal>
            <Reveal>
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {cases.map((c) => (
                  <article key={c.name} className={`${CARD} rounded-[22px] overflow-hidden flex flex-col`}>
                    <div className="relative aspect-[16/10] border-b border-white/[0.08]">
                      <ShowcaseSlideshow slug={c.slug} alt={c.alt} sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw" />
                    </div>
                    <div className="p-6 flex flex-col gap-2.5">
                      <span className={`text-soft ${LABEL}`}>{c.tag}</span>
                      <h3 className="m-0 text-[22px] font-extrabold">{c.name}</h3>
                      <p className="m-0 text-[15px] leading-[1.6] text-soft">{c.body}</p>
                    </div>
                  </article>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============ FAQ ============ */}
        <section id="faq" className="pb-16 md:pb-24">
          <Reveal>
            <div className="max-w-[880px] mx-auto px-page-x flex flex-col gap-8">
              <Head eyebrow={t("faq.eyebrow")} title={t("faq.title")} />
              <div className="flex flex-col border-t border-white/10">
                {faqs.map((f) => (
                  <details key={f.q} className="group border-b border-white/10">
                    <summary className="flex items-center justify-between gap-5 py-5 min-h-[44px] cursor-pointer list-none [&::-webkit-details-marker]:hidden text-[17px] md:text-[19px] font-semibold">
                      {f.q}
                      <span
                        aria-hidden="true"
                        className="text-[26px] leading-none font-normal text-[#b7c0ff] transition-transform duration-normal group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <p className="m-0 mb-5 text-[16px] leading-[1.7] text-soft">{f.a.replace("{phone}", phone)}</p>
                  </details>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        {/* ============ FINAL CTA ============ */}
        <section className="pb-20 md:pb-28">
          <Reveal>
            <div className={CONTAINER}>
              <div
                className={`relative overflow-hidden rounded-[32px] border border-[rgba(88,101,242,0.45)] bg-[#0c0e1a] px-6 py-14 md:px-8 md:py-[80px] flex flex-col items-center gap-6 text-center ${GRID_BG}`}
              >
                <div
                  aria-hidden="true"
                  className="absolute left-1/2 -top-[200px] w-[900px] h-[560px] -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(88,101,242,0.38),rgba(88,101,242,0))] pointer-events-none"
                />
                <BrandMark className="relative h-14" />
                <h2 className="relative m-0 font-extrabold text-[clamp(30px,4.6vw,54px)] leading-[1.06] tracking-[-0.035em] max-w-[820px] text-balance">
                  {t("final.title")}
                </h2>
                <p className="relative m-0 text-[17px] md:text-[19px] leading-[1.6] text-soft max-w-[600px]">{t("final.body")}</p>
                <WhatsAppCta
                  id="final-cta"
                  message={msg}
                  refLabel={refLabel}
                  placement="final"
                  locale={locale}
                  className={`${CTA} relative w-full sm:w-auto text-[18px] md:text-[19px] px-8 min-h-[60px] shadow-[0_18px_50px_rgba(88,101,242,0.45)]`}
                >
                  <WhatsAppGlyph size={24} />
                  {t("final.cta")}
                </WhatsAppCta>
                <div className="relative flex flex-col items-center gap-2">
                  {altLine("final", "text-[16px]")}
                  <p className="m-0 text-[14px] text-soft">{t("final.note")}</p>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      {/* ============ FOOTER ============ */}
      <footer className="border-t border-line pb-24 md:pb-0">
        <div className={`${CONTAINER} py-8 flex flex-col gap-4 text-[14px] text-soft`}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <PillLogo compact />
            <span>{t("footer.location")}</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#b7c0ff] hover:text-white">
              {CONTACT_EMAIL}
            </a>
            <span>{phone}</span>
            <Link href="/mentions-legales" className="hover:text-white">
              {t("footer.legal")}
            </Link>
            <Link href="/privacy" className="hover:text-white">
              {t("footer.privacy")}
            </Link>
            <ConsentSettingsLink className="text-soft text-[14px] font-sans hover:text-white" />
            <span className="text-muted">{tf("copyright")}</span>
          </div>
        </div>
      </footer>

      <StickyCta message={msg} refLabel={refLabel} locale={locale} waLabel={t("sticky.wa")} />
    </div>
  );
}
