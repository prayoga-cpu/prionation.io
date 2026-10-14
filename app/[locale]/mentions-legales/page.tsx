import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import {
  SITE_URL,
  SITE_NAME,
  CONTACT_EMAIL,
  WHATSAPP_DISPLAY,
  PHONE_TEL,
  LEGAL_ENTITY,
  HOSTING_PROVIDER,
} from "@/lib/seo/site";
import { LEGAL, type LegalLocale } from "@/lib/content/legal";

// Legal notice (LCEN art. 1-1). Facts come from lib/seo/site.ts; entity fields
// that are not confirmed yet (null there) are left out rather than guessed.
const PATH = "/mentions-legales";

const OG_LOCALE: Record<string, string> = { en: "en_US", fr: "fr_FR", id: "id_ID" };

function pickLocale(locale: string): LegalLocale {
  return locale === "fr" || locale === "id" ? locale : "en";
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const doc = LEGAL[pickLocale(locale)];
  const canonical = `${SITE_URL}/${locale}${PATH}`;
  const title = `${doc.title} · ${SITE_NAME}`;
  return {
    title: { absolute: title },
    description: doc.metaDescription,
    alternates: {
      canonical,
      languages: {
        en: `${SITE_URL}/en${PATH}`,
        fr: `${SITE_URL}/fr${PATH}`,
        id: `${SITE_URL}/id${PATH}`,
        "x-default": `${SITE_URL}/en${PATH}`,
      },
    },
    openGraph: {
      title,
      description: doc.metaDescription,
      url: canonical,
      siteName: SITE_NAME,
      locale: OG_LOCALE[locale] ?? "en_US",
      type: "website",
    },
  };
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[220px_1fr] gap-1 sm:gap-6 py-3 border-t border-line-soft">
      <dt className="text-muted text-[13px] font-sans">{label}</dt>
      <dd className="m-0 text-soft text-[15px] leading-[1.7]">{children}</dd>
    </div>
  );
}

export default async function LegalNoticePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const doc = LEGAL[pickLocale(locale)];
  const l = doc.labels;
  const linkCls = "text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent";

  return (
    <div className="px-page-x pt-[130px] pb-[120px]">
      <div className="max-w-[820px] mx-auto">
        <nav className="flex items-center flex-wrap gap-1.5 text-[12px] text-muted mb-10 font-sans" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span className="opacity-40">/</span>
          <span className="text-soft">{doc.title}</span>
        </nav>

        <div className="font-sans text-[12px] font-semibold tracking-[0.12em] text-accent uppercase mb-4">{doc.badge}</div>
        <h1 className="font-sans font-extrabold text-[clamp(28px,3.8vw,46px)] leading-[1.07] tracking-[-0.03em] text-white mb-12">
          {doc.title}
        </h1>

        <section>
          <h2 className="font-sans font-bold text-white text-[clamp(18px,2.2vw,24px)] tracking-[-0.01em] mb-3">{l.publisher}</h2>
          <dl className="m-0 mb-10">
            <Row label={l.name}>{LEGAL_ENTITY.name} ({SITE_NAME})</Row>
            {LEGAL_ENTITY.legalForm && <Row label={l.legalForm}>{LEGAL_ENTITY.legalForm}</Row>}
            {LEGAL_ENTITY.registration && <Row label={l.registration}>{LEGAL_ENTITY.registration}</Row>}
            {LEGAL_ENTITY.address && <Row label={l.address}>{LEGAL_ENTITY.address}</Row>}
            <Row label={l.director}>{LEGAL_ENTITY.publicationDirector}</Row>
          </dl>
        </section>

        <section>
          <h2 className="font-sans font-bold text-white text-[clamp(18px,2.2vw,24px)] tracking-[-0.01em] mb-3">{l.contact}</h2>
          <dl className="m-0 mb-10">
            <Row label={l.email}>
              <a href={`mailto:${CONTACT_EMAIL}`} className={linkCls}>
                {CONTACT_EMAIL}
              </a>
            </Row>
            <Row label={l.phone}>
              <a href={`tel:${PHONE_TEL}`} className={linkCls}>
                {WHATSAPP_DISPLAY}
              </a>
            </Row>
            <Row label={l.team}>{doc.teamText}</Row>
          </dl>
        </section>

        <section>
          <h2 className="font-sans font-bold text-white text-[clamp(18px,2.2vw,24px)] tracking-[-0.01em] mb-3">{l.host}</h2>
          <dl className="m-0 mb-10">
            <Row label={l.name}>
              {HOSTING_PROVIDER.name}, {HOSTING_PROVIDER.address} ·{" "}
              <a href={HOSTING_PROVIDER.website} className={linkCls} rel="noopener noreferrer" target="_blank">
                vercel.com
              </a>
            </Row>
          </dl>
        </section>

        <section>
          <h2 className="font-sans font-bold text-white text-[clamp(18px,2.2vw,24px)] tracking-[-0.01em] mb-3">{l.privacy}</h2>
          <p className="text-soft text-[15px] leading-[1.75] mb-4">
            {doc.privacyText}{" "}
            <Link href="/privacy" className={linkCls}>
              {doc.privacyLink}
            </Link>
            .
          </p>
        </section>

        <div className="mt-14 pt-8 border-t border-line-soft">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-accent font-sans font-semibold text-[14px] hover:opacity-85 transition-opacity"
          >
            <span aria-hidden="true">←</span> {doc.back}
          </Link>
        </div>
      </div>
    </div>
  );
}
