// Render-time contextual internal links for cluster-article bodies. Each entry
// maps a canonical phrase (per locale) to a destination page; ContentArticle
// wraps the FIRST occurrence of each phrase (document order, once per article)
// in a localized <Link>, skipping self-links.
//
// Why render-time instead of marking up the copy: the bodies are plain string[]
// (no markdown/JSX), and this keeps them that way. The failure mode is safe — a
// phrase that does not appear simply yields no link, so imperfect phrasing can
// never break a page. Phrases were chosen from high-frequency, unambiguous terms
// that actually occur in each locale's content.

export type Interlink = { href: string; phrases: Record<string, string[]> };

export const INTERLINKS: Interlink[] = [
  {
    href: "/methodology/evals-before-features",
    phrases: { en: ["eval suite"], fr: ["suite d'evals"], id: ["suite eval"] },
  },
  {
    href: "/methodology/telemetry-from-day-one",
    phrases: { en: ["telemetry"], fr: ["télémétrie"], id: ["telemetri"] },
  },
  {
    href: "/methodology/owned-infrastructure",
    phrases: {
      en: ["owned infrastructure"],
      fr: ["infrastructure possédée"],
      id: ["infrastruktur yang dimiliki"],
    },
  },
  {
    href: "/methodology/lean-pods-fixed-clocks",
    phrases: { en: ["fixed clock"], fr: ["horloge fixe"], id: ["jam tetap"] },
  },
  {
    href: "/ai-engineering-glossary",
    phrases: {
      en: ["golden dataset"],
      fr: ["jeu de données de référence"],
      id: ["dataset acuan"],
    },
  },
];
