import type { PageSection } from "@/lib/content/pages";

// Child sitemaps: id 0 = core/standalone pages; 1..N = one content section each.
// Shared by app/sitemap.ts (which generates /sitemap/<id>.xml) and the index at
// app/sitemap.xml/route.ts so the two never drift.
export const SITEMAP_SECTIONS: PageSection[] = [
  "methodology",
  "showcases",
  "frameworks",
  "guides",
  "intelligence",
];

export const SITEMAP_IDS: number[] = [
  0,
  ...SITEMAP_SECTIONS.map((_, i) => i + 1),
];
