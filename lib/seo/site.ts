// Central SEO/site constants. Single source of truth for the production origin,
// brand identity, social profiles, and the pricing offers used in JSON-LD.
// Change SITE_URL here if the canonical origin ever changes (www vs apex).

export const SITE_URL = "https://www.prionation.io";
export const SITE_NAME = "PRIONATION.io";
export const LEGAL_NAME = "PRIORITY FOUNDATION";
export const CONTACT_EMAIL = "consult@prionation.io";
export const FOUNDING_DATE = "2026";

export const SOCIAL_LINKS = [
  "https://www.linkedin.com/company/prionation-io",
  "https://www.instagram.com/prionation.io",
  "https://github.com/prayoga-cpu",
];

// Pricing offers (EUR, locale-independent) — mirrors the Pricing section + llms.txt.
export const OFFERS = [
  {
    name: "Diagnostic",
    price: "5000",
    minPrice: "5000",
    maxPrice: "7000",
    description:
      "2-week bottleneck mapping. Identifies the single highest-ROI AI surface.",
  },
  {
    name: "Build",
    price: "25000",
    minPrice: "25000",
    maxPrice: "55000",
    description:
      "8-week production AI build. Fixed scope, fixed price, lean pod.",
  },
  {
    name: "Retainer",
    price: "4000",
    minPrice: "4000",
    maxPrice: "9000",
    description: "Monthly ongoing pod access. Minimum 6-month commitment.",
  },
  {
    name: "Express Site",
    price: "1500",
    description: "3-page Next.js site. 5 business days. Base price.",
  },
] as const;
