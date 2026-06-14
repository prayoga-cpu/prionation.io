import { SITE_URL } from "@/lib/seo/site";
import { SITEMAP_IDS } from "@/lib/seo/sitemap-sections";

// Sitemap INDEX served at /sitemap.xml (the URL robots.txt and Search Console
// reference). It references the per-section child sitemaps that Next generates
// at /sitemap/<id>.xml from app/sitemap.ts. Next 16's generateSitemaps emits the
// children but not the index route, so we provide it explicitly here.
export const dynamic = "force-static";

export function GET() {
  const lastmod = new Date().toISOString();
  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    SITEMAP_IDS.map(
      (id) =>
        `  <sitemap><loc>${SITE_URL}/sitemap/${id}.xml</loc><lastmod>${lastmod}</lastmod></sitemap>`,
    ).join("\n") +
    `\n</sitemapindex>\n`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
