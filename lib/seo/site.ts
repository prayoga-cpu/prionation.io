// Central SEO/site constants. Single source of truth for the production origin,
// brand identity, social profiles, and the pricing offers used in JSON-LD.
// Change SITE_URL here if the canonical origin ever changes (www vs apex).

export const SITE_URL = "https://www.prionation.io";
export const SITE_NAME = "PRIONATION.io";
export const LEGAL_NAME = "PRIORITY FOUNDATION";
export const CONTACT_EMAIL = "consult@prionation.io";
export const FOUNDING_DATE = "2026";

// Sales WhatsApp line (Evan Cao, CRO, Paris). WHATSAPP_NUMBER is the wa.me
// form (country code + number, digits only); WHATSAPP_DISPLAY is for humans.
export const WHATSAPP_NUMBER = "33781732386";
export const WHATSAPP_DISPLAY = "+33 7 81 73 23 86";
// Same number in French national format, for French copy (tel: links use the
// international form).
export const PHONE_DISPLAY_FR = "07 81 73 23 86";
export const PHONE_TEL = "+33781732386";

// Publisher identity for the legal notice (app/[locale]/mentions-legales). Only
// verified facts go here; null fields are not rendered. Fill in the legal form,
// registration number and registered address as soon as they are confirmed —
// French law (LCEN art. 1-1) expects them on a site that targets France.
export const LEGAL_ENTITY: {
  name: string;
  legalForm: string | null;
  registration: string | null;
  address: string | null;
  publicationDirector: string;
} = {
  name: LEGAL_NAME,
  legalForm: null,
  registration: null,
  address: null,
  publicationDirector: "Darwin Prayoga",
};

// Host of the site (LCEN art. 1-1 also requires naming it). Address as published
// in Vercel's privacy policy, checked 2026-10-14.
export const HOSTING_PROVIDER = {
  name: "Vercel Inc.",
  address: "440 N Barranca Avenue #4133, Covina, CA 91723, United States",
  website: "https://vercel.com",
};

// Stable @id anchors so every JSON-LD block — site-wide (components/JsonLd.tsx)
// and per-page (ContentArticle/AnchorPage/Glossary) — references ONE shared
// Organization/WebSite node instead of re-declaring anonymous duplicates. This
// lets Google/AI answer engines merge the brand into a single high-confidence
// entity across all pages. Anchors are fragments on SITE_URL (no new routes).
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const SOCIAL_LINKS = [
  "https://www.linkedin.com/company/prionation-io",
  "https://www.instagram.com/prionation.io",
  "https://github.com/prayoga-cpu",
];

// Leadership — drives Person/founder JSON-LD (helps machines tie the brand to
// real people). Kept in sync with the Foundation section + public LinkedIn URLs.
export const TEAM = [
  {
    name: "Darwin Prayoga",
    jobTitle: "Founder & CEO",
    linkedin: "https://www.linkedin.com/in/darwinprayoga",
    isFounder: true,
  },
  {
    name: "Evan Cao",
    jobTitle: "Chief Revenue Officer",
    linkedin: "https://www.linkedin.com/in/evan-cao-52282bb6",
    isFounder: false,
  },
] as const;

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
