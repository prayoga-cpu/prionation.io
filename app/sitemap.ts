import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/seo/site";
import { getPublishedPages } from "@/lib/content/pages";

// Build a localized sitemap entry (one per locale) with hreflang alternates.
function localize(path: string) {
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, `${SITE_URL}/${l}${path}`]),
  );
  return routing.locales.map((locale) => ({
    url: `${SITE_URL}/${locale}${path}`,
    alternates: {
      languages: {
        ...languages,
        "x-default": `${SITE_URL}/${routing.defaultLocale}${path}`,
      },
    },
  }));
}

// The homepage is live in all three locales. Cluster pages
// (/<section>/<slug>) are pulled from the content manifest and only appear once
// their status flips to "published" — drafts never reach the sitemap, so no
// 404s are submitted. Hash anchors are in-page, not separate URLs.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const homepage = localize("").map((entry) => ({
    ...entry,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 1.0,
  }));

  // Topical cluster anchor — a live standalone page.
  const anchor = localize(
    "/ai-product-engineering-for-mid-market-companies",
  ).map((entry) => ({
    ...entry,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.95,
  }));

  // AI engineering glossary — a live standalone reference page.
  const glossary = localize("/ai-engineering-glossary").map((entry) => ({
    ...entry,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // VSL landing — "watch how we work" video sales letter.
  const start = localize("/start").map((entry) => ({
    ...entry,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const clusterPages = getPublishedPages().flatMap((page) =>
    localize(`/${page.section}/${page.slug}`).map((entry) => ({
      ...entry,
      lastModified: page.updatedAt ? new Date(page.updatedAt) : lastModified,
      changeFrequency: page.changeFreq,
      priority: page.sitemapPriority,
    })),
  );

  return [...homepage, ...anchor, ...glossary, ...start, ...clusterPages];
}
