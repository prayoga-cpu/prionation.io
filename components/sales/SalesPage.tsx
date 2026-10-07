import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { PillLogo } from "@/app/finance/components/PillLogo";
import { Dot } from "@/components/ui/Typography";
import { LocaleSwitcher } from "@/components/ui/LocaleSwitcher";
import { CONTACT_EMAIL, WHATSAPP_DISPLAY } from "@/lib/seo/site";
import { WhatsAppCta } from "./WhatsAppCta";
import { Reveal } from "./Reveal";

/**
 * /start — long-form sales page for paid/outbound traffic. Every CTA opens a
 * WhatsApp chat with Evan (sales). Server-rendered; the only client JS is the
 * CTA click tracking, the EN/FR/ID switcher and the below-the-fold reveals.
 *
 * Layout and copy follow the Claude Design prototype ("Page de vente
 * Prionation", EN + FR), mapped onto the site's design tokens: pill CTAs,
 * pixel-font labels, PillLogo wordmark, bg/card/accent colours.
 */

type Item = { title: string; body: string };
type Step = { duration: string; title: string; body: string; items: string[] };
type Row = { label: string; them: string; us: string };
type Case = { tag: string; name: string; body: string; alt: string; src: string };
type Faq = { q: string; a: string };

// Same client quotes as the homepage (components/sections/Testimonials.tsx),
// kept in the client's own words (English) in every locale; roles translate.
const QUOTES = [
  {
    quote:
      "Our logistics ran on spreadsheets and guesswork. They turned it into a production AI system in weeks — and handed us the keys.",
    name: "Nicolas Rémy",
    initials: "NR",
  },
  {
    quote:
      "They built lead-gen that works the way our agents actually sell, and had it live before most teams finish scoping.",
    name: "Luke",
    initials: "L",
  },
];

const CLIENT_LOGOS = [
  { name: "Epidom", src: "/logos/epidom.svg", h: "h-[26px]" },
  { name: "Expeditoo", src: "/logos/expeditoo.svg", h: "h-[26px]" },
  { name: "The Lead Agent", src: "/logos/the-lead-agent.svg", h: "h-6" },
];
const STACK_LOGOS = [
  { name: "Claude", src: "/logos/claude.svg", h: "h-6" },
  { name: "Vercel", src: "/logos/vercel.svg", h: "h-[22px]" },
  { name: "Stripe", src: "/logos/stripe.svg", h: "h-[26px]" },
];

const CASE_IMAGES = ["/work/epidom.png", "/work/expeditoo.png", "/work/lead-agent.png"];

// ─── Shared class strings ──────────────────────────────────────────────────

const CONTAINER = "max-w-max-w mx-auto px-page-x";
const CTA =
  "inline-flex items-center justify-center gap-3 rounded-full bg-accent text-white font-sans font-bold text-center transition-all duration-fast hover:-translate-y-0.5 hover:bg-[#6773ff] hover:shadow-[0_0_0_6px_rgba(88,101,242,0.18),0_18px_48px_rgba(88,101,242,0.45)]";
const CARD =
  "bg-card border transition-colors duration-normal hover:border-[rgba(88,101,242,0.55)]";
const PIXEL_LABEL = "font-pixel text-[8px] sm:text-[9px] tracking-[0.15em] uppercase leading-relaxed";
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

// Stroke icons from the prototype (shapes the shared components/icons.tsx set lacks).
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
  quote: <path d="M7 7h4v4H7c0 2 1 3 3 3v2c-3 0-5-2-5-5V7zM14 7h4v4h-4c0 2 1 3 3 3v2c-3 0-5-2-5-5V7z" />,
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

// Section label + headline, styled like components/ui/SectionHead.tsx.
function Head({ eyebrow, title, children }: { eyebrow: string; title: React.ReactNode; children?: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4 max-w-[760px]">
      <div className="text-muted font-pixel text-[10px] tracking-[0.15em] flex items-center gap-2.5 uppercase">
        <Dot className="shadow-[0_0_10px_var(--c-accent)]" />
        {eyebrow}
      </div>
      <h2 className="font-sans font-extrabold text-[clamp(30px,4vw,48px)] leading-[1.08] tracking-[-0.03em] m-0 text-balance">
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

  const strong = (chunks: React.ReactNode) => <strong className="text-white font-semibold">{chunks}</strong>;
  const msg = t("whatsappMessage");

  const stats = t.raw("hero.stats") as { value: string; label: string }[];
  const problems = t.raw("problem.items") as Item[];
  const steps = t.raw("method.steps") as Step[];
  const rows = t.raw("method.rows") as Row[];
  const cases = (t.raw("work.cases") as Omit<Case, "src">[]).map((c, i) => ({ ...c, src: CASE_IMAGES[i] }));
  const roles = t.raw("work.quoteRoles") as string[];
  const guarantees = t.raw("guarantees") as Item[];
  const faqs = t.raw("faq.items") as Faq[];

  const PROBLEM_ICONS = ["grid", "clock", "person", "wrench"];
  const GUARANTEE_ICONS = ["lock", "shield", "lines", "exit"];

  return (
    <div className="min-h-screen bg-bg text-white font-sans overflow-x-clip">
      {/* ============ NAV ============ */}
      <header className="relative z-10 border-b border-line">
        <div className={`${CONTAINER} py-4 flex items-center justify-between gap-4`}>
          <a href="#top" aria-label={t("nav.home")} className="flex items-center gap-3 shrink-0">
            <BrandMark className="h-[30px]" />
            <span className="hidden md:inline-flex">
              <PillLogo />
            </span>
          </a>
          <nav aria-label={t("nav.label")} className="hidden lg:flex items-center gap-7 text-[15px]">
            <a href="#method" className="text-soft transition-colors duration-fast hover:text-white">{t("nav.method")}</a>
            <a href="#work" className="text-soft transition-colors duration-fast hover:text-white">{t("nav.work")}</a>
            <a href="#faq" className="text-soft transition-colors duration-fast hover:text-white">{t("nav.faq")}</a>
          </nav>
          <div className="flex items-center gap-3 sm:gap-4">
            <LocaleSwitcher />
            {/* Icon-only on phones (the hero CTA sits right below); the label stays for screen readers. */}
            <WhatsAppCta
              message={msg}
              placement="nav"
              className={`${CTA} w-11 sm:w-auto px-0 sm:px-5 text-[15px] min-h-[44px]`}
            >
              <WhatsAppGlyph size={18} />
              <span className="sr-only sm:not-sr-only">{t("nav.cta")}</span>
            </WhatsAppCta>
          </div>
        </div>
      </header>

      <main>
        {/* ============ HERO ============ */}
        <section id="top" className={`relative pt-12 pb-20 md:pt-[88px] md:pb-24 ${GRID_BG}`}>
          <div
            aria-hidden="true"
            className="absolute left-1/2 -top-[260px] w-[1100px] h-[760px] -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(88,101,242,0.30),rgba(88,101,242,0))] pointer-events-none"
          />
          <div className={`relative ${CONTAINER} flex flex-wrap items-center gap-14`}>
            <div className="flex-[1_1_480px] min-w-0 flex flex-col gap-7">
              <span className="self-start inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl sm:rounded-full bg-[rgba(8,9,13,0.6)] border border-white/15 font-pixel text-[8px] sm:text-[10px] tracking-[0.12em] leading-[1.7] text-soft uppercase">
                <Dot className="shadow-[0_0_10px_var(--c-accent)]" />
                {t("hero.eyebrow")}
              </span>
              <h1 className="m-0 font-extrabold text-[clamp(34px,5.2vw,66px)] leading-[1.04] tracking-[-0.035em] text-balance">
                {t("hero.title")}
              </h1>
              <p className="m-0 text-[18px] md:text-[20px] leading-[1.55] text-soft max-w-[560px]">
                {t.rich("hero.sub", { strong })}
              </p>
              <div className="flex flex-wrap items-center gap-3.5">
                <WhatsAppCta
                  message={msg}
                  placement="hero"
                  className={`${CTA} w-full sm:w-auto text-[17px] md:text-[18px] px-7 py-4 min-h-[56px] shadow-[0_14px_40px_rgba(88,101,242,0.38)]`}
                >
                  <WhatsAppGlyph size={22} />
                  {t("hero.cta")}
                </WhatsAppCta>
                <a
                  href="#work"
                  className="inline-flex items-center justify-center gap-2 w-full sm:w-auto rounded-full bg-white/5 border border-white/10 text-white font-semibold text-[16px] px-6 min-h-[56px] transition-colors duration-fast hover:bg-white/10"
                >
                  {t("hero.secondary")} <span aria-hidden="true">↓</span>
                </a>
              </div>
              <p className="m-0 text-[14px] text-soft flex items-center gap-2.5">
                <span aria-hidden="true" className="w-2 h-2 rounded-full bg-[#58f287] shrink-0" />
                {t("hero.reassurance")}
              </p>
              <dl className="m-0 grid grid-cols-3 gap-px bg-white/[0.08] border border-white/[0.08] rounded-2xl overflow-hidden max-w-[560px]">
                {stats.map((s) => (
                  <div key={s.value} className="bg-card px-4 py-4 sm:px-5 sm:py-[18px] flex flex-col-reverse gap-1.5">
                    <dt className="text-[12px] sm:text-[13px] text-soft leading-[1.35]">{s.label}</dt>
                    <dd className="m-0 font-display text-[24px] sm:text-[30px] leading-none text-[#b7c0ff]">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="flex-[1_1_520px] min-w-0 relative pt-6 pb-10">
              <div
                aria-hidden="true"
                className="absolute inset-[10%_6%_0_6%] bg-[radial-gradient(closest-side,rgba(88,101,242,0.45),rgba(88,101,242,0))] blur-[10px]"
              />
              <figure className="relative m-0 rounded-[18px] border border-white/15 bg-card overflow-hidden shadow-[0_40px_90px_rgba(0,0,0,0.6)] lg:[transform:perspective(1600px)_rotateY(-6deg)_rotateX(2deg)]">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.08] bg-card-soft">
                  <span aria-hidden="true" className="w-[11px] h-[11px] rounded-full bg-line-soft shrink-0" />
                  <span aria-hidden="true" className="w-[11px] h-[11px] rounded-full bg-line-soft shrink-0" />
                  <span aria-hidden="true" className="w-[11px] h-[11px] rounded-full bg-line-soft shrink-0" />
                  <span className="ml-3 flex-1 min-w-0 truncate bg-bg rounded-lg px-3 py-1.5 text-muted font-pixel text-[8px] sm:text-[9px] tracking-[0.08em] leading-relaxed">
                    {t("hero.browserBar")}
                  </span>
                </div>
                <Image
                  src="/work/epidom-home.jpg"
                  alt={t("hero.imageAlt")}
                  width={2880}
                  height={1800}
                  priority
                  sizes="(min-width: 1024px) 600px, 100vw"
                  className="block w-full h-auto"
                />
              </figure>
              <div className="absolute left-2 sm:-left-[18px] bottom-1.5 flex items-center gap-3 bg-[rgba(12,13,18,0.92)] border border-white/15 rounded-2xl px-4 py-3.5 shadow-[0_20px_50px_rgba(0,0,0,0.55)]">
                <span className="w-[34px] h-[34px] rounded-[10px] bg-accent flex items-center justify-center shrink-0 text-white">
                  <Glyph name="check" size={18} strokeWidth={2.5} />
                </span>
                <span className="flex flex-col gap-0.5">
                  <span className="font-bold text-[14px] sm:text-[15px]">{t("hero.liveTitle")}</span>
                  <span className="text-[12px] text-soft">{t("hero.liveSub")}</span>
                </span>
              </div>
              <div className={`absolute right-2 sm:-right-1.5 top-0 flex items-center gap-2.5 bg-[rgba(12,13,18,0.92)] border border-white/15 rounded-full px-4 py-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.55)] text-white/90 ${PIXEL_LABEL}`}>
                <span aria-hidden="true" className="w-2 h-2 rounded-full bg-[#58f287] shrink-0" />
                {t("hero.pill")}
              </div>
            </div>
          </div>
        </section>

        {/* ============ LOGOS ============ */}
        {/* Clients and stack are labelled separately so the tech logos never
            read as client endorsements. */}
        <section className="border-y border-line bg-[#0a0b10]">
          <div className={`${CONTAINER} py-7 flex flex-col lg:flex-row lg:items-end gap-7 lg:gap-12`}>
            {[
              { label: t("logos.clients"), logos: CLIENT_LOGOS },
              { label: t("logos.stack"), logos: STACK_LOGOS },
            ].map((group, gi) => (
              <div key={gi} className={`flex flex-col gap-4 ${gi ? "lg:border-l lg:border-white/15 lg:pl-12" : ""}`}>
                <h2 className={`m-0 text-muted ${PIXEL_LABEL}`}>{group.label}</h2>
                <ul className="m-0 p-0 list-none flex flex-wrap items-center gap-x-10 gap-y-4">
                  {group.logos.map((logo) => (
                    <li key={logo.name}>
                      {/* Plain <img>: variable-aspect SVG logos at a fixed height (as in LogoMarquee). */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={logo.src}
                        alt={logo.name}
                        loading="lazy"
                        decoding="async"
                        style={{ filter: "brightness(0) invert(1)" }}
                        className={`${logo.h} w-auto opacity-60`}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ============ PROBLEM ============ */}
        <section className="py-20 md:pt-28 md:pb-24">
          <Reveal>
            <div className={`${CONTAINER} flex flex-col gap-12`}>
              <Head eyebrow={t("problem.eyebrow")} title={t("problem.title")}>
                <p className="m-0 text-[17px] md:text-[18px] leading-[1.6] text-soft">{t("problem.intro")}</p>
              </Head>
              <div className="grid gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
                {problems.map((p, i) => (
                  <div key={p.title} className={`${CARD} border-white/10 rounded-[20px] p-7 flex flex-col gap-3.5`}>
                    <span className="w-11 h-11 rounded-xl bg-accent-10 border border-accent-30 flex items-center justify-center text-[#b7c0ff]">
                      <Glyph name={PROBLEM_ICONS[i]} />
                    </span>
                    <h3 className="m-0 text-[20px] font-bold leading-[1.25]">{p.title}</h3>
                    <p className="m-0 text-[15px] leading-[1.6] text-soft">{p.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        {/* ============ STORY ============ */}
        <section className="pt-4 pb-20 md:pt-8 md:pb-28">
          <Reveal>
            <div className={CONTAINER}>
              <div className="bg-card border border-white/10 rounded-[28px] overflow-hidden flex flex-wrap">
                <div className="flex-[1_1_360px] min-w-0 relative min-h-[380px] md:min-h-[420px]">
                  <Image
                    src="/images/team/evan-studio.jpg"
                    alt={t("story.imageAlt")}
                    fill
                    sizes="(min-width: 1024px) 500px, 100vw"
                    className="object-cover object-[center_20%]"
                  />
                  <div className={`absolute left-5 bottom-5 max-w-[calc(100%-40px)] inline-flex items-center gap-2.5 bg-[rgba(8,9,13,0.82)] border border-white/15 rounded-full px-4 py-2.5 text-white ${PIXEL_LABEL}`}>
                    <Dot />
                    {t("story.badge")}
                  </div>
                </div>
                <div className="flex-[1.3_1_460px] min-w-0 p-7 sm:p-10 lg:p-14 flex flex-col gap-[22px]">
                  <div className="text-muted font-pixel text-[10px] tracking-[0.15em] flex items-center gap-2.5 uppercase">
                    <Dot className="shadow-[0_0_10px_var(--c-accent)]" />
                    {t("story.eyebrow")}
                  </div>
                  <h2 className="m-0 font-extrabold text-[clamp(28px,3.4vw,42px)] leading-[1.1] tracking-[-0.03em] text-balance">
                    {t("story.quote")}
                  </h2>
                  <p className="m-0 text-[16px] md:text-[17px] leading-[1.7] text-soft">{t("story.p1")}</p>
                  <p className="m-0 text-[16px] md:text-[17px] leading-[1.7] text-soft">{t.rich("story.p2", { strong })}</p>
                  <p className="m-0 text-[16px] md:text-[17px] leading-[1.7] text-soft">{t.rich("story.p3", { strong })}</p>
                  <WhatsAppCta
                    message={t("whatsappMessageStory")}
                    placement="story"
                    className={`${CTA} self-stretch sm:self-start text-[16px] px-6 py-3.5 min-h-[48px]`}
                  >
                    {t("story.cta")} <span aria-hidden="true">→</span>
                  </WhatsAppCta>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ============ METHOD ============ */}
        <section id="method" className={`py-20 md:py-28 border-y border-line bg-[#0a0b10] ${GRID_BG}`}>
          <div className={`${CONTAINER} flex flex-col gap-14`}>
            <Reveal>
              <Head eyebrow={t("method.eyebrow")} title={t("method.title")} />
            </Reveal>
            <Reveal>
              <div className="grid gap-5 md:grid-cols-3">
                {steps.map((s, i) => {
                  const featured = i === 1;
                  return (
                    <div
                      key={s.title}
                      className={`${CARD} rounded-[22px] p-7 md:p-8 flex flex-col gap-[18px] ${featured ? "border-[rgba(88,101,242,0.5)] shadow-[0_0_0_6px_rgba(88,101,242,0.08)]" : "border-white/10"}`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-pixel text-[14px] text-[#b7c0ff]">/0{i + 1}</span>
                        <span
                          className={`${PIXEL_LABEL} rounded-full px-3 py-1.5 ${featured ? "bg-accent text-white" : "border border-white/15 text-white/90"}`}
                        >
                          {s.duration}
                        </span>
                      </div>
                      <h3 className="m-0 text-[26px] font-extrabold tracking-[-0.02em]">{s.title}</h3>
                      <p className="m-0 text-[15px] leading-[1.6] text-soft">{s.body}</p>
                      <ul className="m-0 p-0 list-none flex flex-col gap-2.5 text-[15px] text-white/90">
                        {s.items.map((it) => (
                          <li key={it} className="flex gap-2.5">
                            <span aria-hidden="true" className="text-accent font-bold">✓</span>
                            {it}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </Reveal>

            {/* comparison */}
            <Reveal>
              <div className="flex flex-col gap-5">
                <h3 id="sales-compare" className="m-0 text-[22px] md:text-[26px] font-extrabold tracking-[-0.02em]">
                  {t("method.compareTitle")}
                </h3>

                {/* ≥ sm: a real table */}
                <div className="hidden sm:block border border-white/10 rounded-[20px] bg-card overflow-hidden">
                  <table aria-labelledby="sales-compare" className="w-full border-collapse text-[15px]">
                    <thead>
                      <tr>
                        <th scope="col" className={`text-left px-6 py-[18px] font-normal text-muted ${PIXEL_LABEL}`}>
                          {t("method.colCriteria")}
                        </th>
                        <th scope="col" className={`text-left px-6 py-[18px] font-normal text-muted ${PIXEL_LABEL}`}>
                          {t("method.colInhouse")}
                        </th>
                        <th scope="col" className={`text-left px-6 py-[18px] font-normal text-[#b7c0ff] bg-[rgba(88,101,242,0.08)] ${PIXEL_LABEL}`}>
                          {t("method.colPod")}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((r) => (
                        <tr key={r.label} className="border-t border-white/[0.06]">
                          <th scope="row" className="text-left px-6 py-[18px] font-semibold">{r.label}</th>
                          <td className="px-6 py-[18px] text-soft">{r.them}</td>
                          <td className="px-6 py-[18px] text-white bg-[rgba(88,101,242,0.08)]">{r.us}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* < sm: one card per criterion (no sideways-scrolling table on phones) */}
                <dl className="sm:hidden m-0 flex flex-col gap-3">
                  {rows.map((r) => (
                    <div key={r.label} className="bg-card border border-white/10 rounded-2xl p-5 flex flex-col gap-3">
                      <dt className="font-semibold text-[16px]">{r.label}</dt>
                      <dd className="m-0 flex flex-col gap-1">
                        <span className={`text-muted ${PIXEL_LABEL}`}>{t("method.colInhouse")}</span>
                        <span className="text-[15px] text-soft">{r.them}</span>
                      </dd>
                      <dd className="m-0 flex flex-col gap-1 rounded-xl bg-[rgba(88,101,242,0.08)] -mx-2 px-2 py-2">
                        <span className={`text-[#b7c0ff] ${PIXEL_LABEL}`}>{t("method.colPod")}</span>
                        <span className="text-[15px] text-white">{r.us}</span>
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============ WORK ============ */}
        <section id="work" className="py-20 md:py-28">
          <div className={`${CONTAINER} flex flex-col gap-12`}>
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-6">
                <Head eyebrow={t("work.eyebrow")} title={t("work.title")} />
                <p className="m-0 text-[16px] leading-[1.6] text-soft max-w-[380px]">{t("work.intro")}</p>
              </div>
            </Reveal>
            <Reveal>
              <div className="grid gap-[22px] md:grid-cols-2 lg:grid-cols-3">
                {cases.map((c) => (
                  <article key={c.name} className={`${CARD} border-white/10 rounded-[22px] overflow-hidden flex flex-col`}>
                    <div className="relative aspect-[16/10] border-b border-white/[0.08]">
                      <Image
                        src={c.src}
                        alt={c.alt}
                        fill
                        sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
                        className="object-cover object-top"
                      />
                    </div>
                    <div className="p-[26px] flex flex-col gap-3">
                      <span className={`text-muted ${PIXEL_LABEL}`}>{c.tag}</span>
                      <h3 className="m-0 text-[24px] font-extrabold">{c.name}</h3>
                      <p className="m-0 text-[15px] leading-[1.6] text-soft">{c.body}</p>
                    </div>
                  </article>
                ))}
              </div>
            </Reveal>
            <Reveal>
              <div className="grid gap-[22px] md:grid-cols-2">
                {QUOTES.map((q, i) => (
                  <figure key={q.name} className="m-0 bg-card border border-white/10 rounded-[22px] p-7 md:p-8 flex flex-col gap-[22px]">
                    <span className="text-accent">
                      <Glyph name="quote" size={32} />
                    </span>
                    <blockquote className="m-0 text-[17px] md:text-[19px] leading-[1.55] text-white/90">
                      &ldquo;{q.quote}&rdquo;
                    </blockquote>
                    <figcaption className="flex items-center gap-3">
                      <span
                        aria-hidden="true"
                        className="w-10 h-10 rounded-full bg-line border border-white/15 flex items-center justify-center font-bold text-[14px] shrink-0"
                      >
                        {q.initials}
                      </span>
                      <span className="flex flex-col">
                        <span className="font-bold">{q.name}</span>
                        <span className="text-[13px] text-soft">{roles[i]}</span>
                      </span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============ GUARANTEES ============ */}
        <section className="pb-16 md:py-24" aria-label={t("guaranteesLabel")}>
          <Reveal>
            <div className={`${CONTAINER} grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-[18px]`}>
              {guarantees.map((g, i) => (
                <div key={g.title} className="flex flex-col gap-3 px-1 py-2">
                  <span className="text-[#b7c0ff]">
                    <Glyph name={GUARANTEE_ICONS[i]} size={28} />
                  </span>
                  <h3 className="m-0 text-[18px] font-bold">{g.title}</h3>
                  <p className="m-0 text-[15px] leading-[1.6] text-soft">{g.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ============ FAQ ============ */}
        <section id="faq" className="pt-8 pb-20 md:pb-28">
          <Reveal>
            <div className="max-w-[880px] mx-auto px-page-x flex flex-col gap-9">
              <Head eyebrow={t("faq.eyebrow")} title={t("faq.title")} />
              <div className="flex flex-col border-t border-white/10">
                {faqs.map((f) => (
                  <details key={f.q} className="group border-b border-white/10">
                    <summary className="flex items-center justify-between gap-5 py-6 min-h-[44px] cursor-pointer list-none [&::-webkit-details-marker]:hidden text-[17px] md:text-[19px] font-semibold">
                      {f.q}
                      <span
                        aria-hidden="true"
                        className="text-[26px] leading-none font-normal text-[#b7c0ff] transition-transform duration-normal group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <p className="m-0 mb-6 text-[16px] leading-[1.7] text-soft">{f.a}</p>
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
                className={`relative overflow-hidden rounded-[32px] border border-[rgba(88,101,242,0.45)] bg-[#0c0e1a] px-6 py-16 md:px-8 md:py-[88px] flex flex-col items-center gap-[26px] text-center ${GRID_BG}`}
              >
                <div
                  aria-hidden="true"
                  className="absolute left-1/2 -top-[200px] w-[900px] h-[560px] -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(88,101,242,0.38),rgba(88,101,242,0))] pointer-events-none"
                />
                <BrandMark className="relative h-16" />
                <h2 className="relative m-0 font-extrabold text-[clamp(32px,4.6vw,58px)] leading-[1.05] tracking-[-0.035em] max-w-[820px] text-balance">
                  {t("final.title")}
                </h2>
                <p className="relative m-0 text-[17px] md:text-[19px] leading-[1.6] text-soft max-w-[600px]">
                  {t("final.body")}
                </p>
                <WhatsAppCta
                  message={msg}
                  placement="final"
                  className={`${CTA} relative w-full sm:w-auto text-[18px] md:text-[19px] px-8 py-5 min-h-[60px] shadow-[0_18px_50px_rgba(88,101,242,0.45)]`}
                >
                  <WhatsAppGlyph size={24} />
                  {t("final.cta")}
                </WhatsAppCta>
                <p className={`relative m-0 text-soft ${PIXEL_LABEL}`}>
                  {WHATSAPP_DISPLAY} · {t("final.note")}
                </p>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      {/* ============ FOOTER ============ */}
      <footer className="border-t border-line">
        <div className={`${CONTAINER} py-8 flex flex-wrap items-center justify-between gap-[18px] text-[14px] text-muted`}>
          <PillLogo compact />
          <span>
            {t("footer.location")} ·{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#b7c0ff] transition-colors duration-fast hover:text-white">
              {CONTACT_EMAIL}
            </a>
          </span>
          <span className="flex items-center gap-4">
            <Link href="/privacy" className="transition-colors duration-fast hover:text-white">
              {t("footer.privacy")}
            </Link>
            <span>{tf("copyright")}</span>
          </span>
        </div>
      </footer>
    </div>
  );
}
