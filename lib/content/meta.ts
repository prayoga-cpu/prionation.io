import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { SITE_URL, SITE_NAME } from "@/lib/seo/site";
import {
  ANCHOR_PATH,
  getPageBySlug,
  getPublishedPages,
  type PageSection,
} from "./pages";

const OG_LOCALE: Record<string, string> = {
  en: "en_US",
  fr: "fr_FR",
  id: "id_ID",
};

// Per-locale metadata for a cluster page, sourced from the manifest path and the
// page's content namespace (Pages.<section>.<slug>).
export async function buildContentMetadata({
  section,
  slug,
  locale,
}: {
  section: PageSection;
  slug: string;
  locale: string;
}): Promise<Metadata> {
  const t = await getTranslations({
    locale,
    namespace: `Pages.${section}.${slug}`,
  });
  const path = `/${section}/${slug}`;
  const canonical = `${SITE_URL}/${locale}${path}`;
  const title = t("seoTitle");
  const description = t("metaDescription");

  return {
    // seoTitle already carries the brand; bypass the root layout title template.
    title: { absolute: title },
    description,
    alternates: {
      canonical,
      languages: {
        en: `${SITE_URL}/en${path}`,
        fr: `${SITE_URL}/fr${path}`,
        id: `${SITE_URL}/id${path}`,
        "x-default": `${SITE_URL}/en${path}`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale: OG_LOCALE[locale] ?? "en_US",
      type: "article",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export type RelatedLink = { href: string; label: string };

// Resolve a page's interlinks to only those that are live (published cluster
// pages + the always-live anchor), with localized short labels. Interlinking
// rule: never link drafts (they 404).
export async function getRelatedLinks({
  section,
  slug,
  locale,
}: {
  section: PageSection;
  slug: string;
  locale: string;
}): Promise<RelatedLink[]> {
  const page = getPageBySlug(section, slug);
  if (!page) return [];

  const livePaths = new Set(
    getPublishedPages().map((p) => `/${p.section}/${p.slug}`),
  );
  livePaths.add(ANCHOR_PATH);

  const common = await getTranslations({ locale, namespace: "Pages.common" });
  const out: RelatedLink[] = [];

  for (const target of page.interlinkTo) {
    if (!livePaths.has(target)) continue;
    if (target === ANCHOR_PATH) {
      out.push({ href: target, label: common("anchorLabel") });
      continue;
    }
    const [, tSection, tSlug] = target.split("/");
    const t = await getTranslations({
      locale,
      namespace: `Pages.${tSection}.${tSlug}`,
    });
    out.push({ href: target, label: t("navLabel") });
  }

  // Surface the AI engineering glossary as a definitional reference on every
  // cluster page — broad, semantic internal links into the new term hub.
  const glossary = await getTranslations({ locale, namespace: "Glossary" });
  out.push({ href: "/ai-product-engineering-for-mid-market-companies/glossary", label: glossary("h1") });

  return out;
}
