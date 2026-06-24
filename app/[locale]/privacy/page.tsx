import type { Metadata } from "next";
import type { ReactNode } from "react";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { SITE_URL, SITE_NAME, LEGAL_NAME, CONTACT_EMAIL } from "@/lib/seo/site";
import { PRIVACY, type PrivacyBlock, type PrivacyLocale } from "@/lib/content/privacy";

const LAST_UPDATED = "2026-06-25";

const OG_LOCALE: Record<string, string> = {
  en: "en_US",
  fr: "fr_FR",
  id: "id_ID",
};

function pickLocale(locale: string): PrivacyLocale {
  return locale === "fr" || locale === "id" ? locale : "en";
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const doc = PRIVACY[pickLocale(locale)];
  const canonical = `${SITE_URL}/${locale}/privacy`;
  const title = `${doc.title} · ${SITE_NAME}`;

  return {
    title: { absolute: title },
    description: doc.metaDescription,
    alternates: {
      canonical,
      languages: {
        en: `${SITE_URL}/en/privacy`,
        fr: `${SITE_URL}/fr/privacy`,
        id: `${SITE_URL}/id/privacy`,
        "x-default": `${SITE_URL}/en/privacy`,
      },
    },
    openGraph: {
      title,
      description: doc.metaDescription,
      url: canonical,
      siteName: SITE_NAME,
      locale: OG_LOCALE[locale] ?? "en_US",
      type: "website",
      images: [{ url: "/og.png", width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title, description: doc.metaDescription, images: ["/og.png"] },
  };
}

// Substitute {site}/{legal} (plain) and {email} (mailto link) tokens.
function renderText(text: string): ReactNode {
  const replaced = text.replace(/\{site\}/g, SITE_NAME).replace(/\{legal\}/g, LEGAL_NAME);
  const parts = replaced.split("{email}");
  if (parts.length === 1) return replaced;
  const out: ReactNode[] = [];
  parts.forEach((part, i) => {
    out.push(part);
    if (i < parts.length - 1) {
      out.push(
        <a
          key={`mail-${i}`}
          href={`mailto:${CONTACT_EMAIL}`}
          className="text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent"
        >
          {CONTACT_EMAIL}
        </a>,
      );
    }
  });
  return out;
}

function Block({ block }: { block: PrivacyBlock }) {
  if ("list" in block) {
    return (
      <ul className="list-disc pl-5 flex flex-col gap-2 mb-4">
        {block.list.map((item, i) => (
          <li key={i} className="text-soft text-[15px] leading-[1.7]">
            {renderText(item)}
          </li>
        ))}
      </ul>
    );
  }
  return <p className="text-soft text-[15px] leading-[1.75] mb-4">{renderText(block.p)}</p>;
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const doc = PRIVACY[pickLocale(locale)];

  return (
    <div className="px-page-x pt-[130px] pb-[120px]">
      <div className="max-w-[820px] mx-auto">
        <nav
          className="flex items-center flex-wrap gap-1.5 text-[12px] text-muted mb-10 font-sans"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span className="opacity-40">/</span>
          <span className="text-soft">{doc.title}</span>
        </nav>

        <div className="font-pixel text-[10px] tracking-[0.15em] text-accent uppercase mb-4">
          {doc.badge}
        </div>
        <h1 className="font-sans font-extrabold text-[clamp(28px,3.8vw,46px)] leading-[1.07] tracking-[-0.03em] text-white mb-4">
          {doc.title}
        </h1>
        <p className="text-muted text-[13px] font-sans mb-12">
          {doc.updatedLabel}: {LAST_UPDATED}
        </p>

        {doc.intro.map((block, i) => (
          <Block key={`intro-${i}`} block={block} />
        ))}

        {doc.sections.map((section, si) => (
          <section key={si}>
            <h2 className="font-sans font-bold text-white text-[clamp(18px,2.2vw,24px)] tracking-[-0.01em] mt-12 mb-3">
              {section.h}
            </h2>
            {section.blocks.map((block, bi) => (
              <Block key={`${si}-${bi}`} block={block} />
            ))}
          </section>
        ))}

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
