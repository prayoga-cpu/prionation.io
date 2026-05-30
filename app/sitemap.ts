import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/seo/site";

// The site is a single page per locale (sections are in-page hash anchors, which
// are not separate URLs). The sitemap therefore lists the three localized home
// URLs with hreflang alternates. Add real cluster/showcase routes here only once
// they ship and return 200 — never list URLs that 404.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, `${SITE_URL}/${l}`]),
  );

  return routing.locales.map((locale) => ({
    url: `${SITE_URL}/${locale}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 1.0,
    alternates: {
      languages: { ...languages, "x-default": `${SITE_URL}/${routing.defaultLocale}` },
    },
  }));
}
