import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/seo/site";
import { getPublishedPages } from "@/lib/content/pages";
import { SITEMAP_SECTIONS, SITEMAP_IDS } from "@/lib/seo/sitemap-sections";

// Child sitemaps served at /sitemap/<id>.xml (referenced by the index at
// /sitemap.xml). id 0 = core/standalone pages; 1..N = one content section each.
// Rendered by hand so each <url> keeps its hreflang alternates — the same shape
// the previous metadata sitemap emitted.
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return SITEMAP_IDS.map((id) => ({ id: `${id}.xml` }));
}

type Entry = {
  path: string;
  changefreq: "weekly" | "monthly";
  priority: number;
  lastmod?: string;
};

function coreEntries(): Entry[] {
  return [
    { path: "", changefreq: "weekly", priority: 1.0 },
    {
      path: "/ai-product-engineering-for-mid-market-companies",
      changefreq: "monthly",
      priority: 0.95,
    },
    { path: "/ai-product-engineering-for-mid-market-companies/glossary", changefreq: "monthly", priority: 0.7 },
  ];
}

function sectionEntries(index: number): Entry[] {
  const section = SITEMAP_SECTIONS[index];
  if (!section) return [];
  return getPublishedPages(section).map((p) => ({
    path: `/${p.section}/${p.slug}`,
    changefreq: p.changeFreq,
    priority: p.sitemapPriority,
    lastmod: p.updatedAt || undefined,
  }));
}

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// One <url> per locale, each carrying the full hreflang alternate set.
function renderEntry(entry: Entry): string {
  const alternates = [
    ...routing.locales.map(
      (l) =>
        `      <xhtml:link rel="alternate" hreflang="${l}" href="${esc(`${SITE_URL}/${l}${entry.path}`)}"/>`,
    ),
    `      <xhtml:link rel="alternate" hreflang="x-default" href="${esc(`${SITE_URL}/${routing.defaultLocale}${entry.path}`)}"/>`,
  ].join("\n");

  return routing.locales
    .map((locale) => {
      const loc = esc(`${SITE_URL}/${locale}${entry.path}`);
      const lastmod = entry.lastmod ? `\n      <lastmod>${entry.lastmod}</lastmod>` : "";
      return (
        `  <url>\n` +
        `      <loc>${loc}</loc>${lastmod}\n` +
        `      <changefreq>${entry.changefreq}</changefreq>\n` +
        `      <priority>${entry.priority}</priority>\n` +
        `${alternates}\n` +
        `  </url>`
      );
    })
    .join("\n");
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const sid = parseInt(id, 10);
  const entries = sid === 0 ? coreEntries() : sectionEntries(sid - 1);

  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n` +
    entries.map(renderEntry).join("\n") +
    `\n</urlset>\n`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
