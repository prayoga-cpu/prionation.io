import {
  SITE_URL,
  SITE_NAME,
  LEGAL_NAME,
  CONTACT_EMAIL,
  FOUNDING_DATE,
  SOCIAL_LINKS,
  OFFERS,
  TEAM,
  ORGANIZATION_ID,
  WEBSITE_ID,
} from "@/lib/seo/site";

// Real people behind the brand → Person nodes for the Organization graph. Helps
// search/AI engines tie "PRIONATION", "PRIORITY FOUNDATION", and the founders
// into one entity. Sourced from lib/seo/site.ts (no fabricated data).
const PEOPLE = TEAM.map((p) => ({
  "@type": "Person",
  name: p.name,
  jobTitle: p.jobTitle,
  url: p.linkedin,
  sameAs: [p.linkedin],
}));

// Server components that emit site-wide JSON-LD structured data for search + AI
// engines. Rendered once in the root layout. Page-level schemas (Article,
// FAQPage, BreadcrumbList) live with their own sections/components.

function JsonLdScript({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationSchema() {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": ORGANIZATION_ID,
        name: SITE_NAME,
        legalName: LEGAL_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/icon-512.png`,
        description:
          "Production AI infrastructure for European and US-based mid-market companies. Fixed scope. Fixed price. Lean pods.",
        email: CONTACT_EMAIL,
        foundingDate: FOUNDING_DATE,
        founder: PEOPLE.filter((_, i) => TEAM[i].isFounder),
        employee: PEOPLE,
        sameAs: SOCIAL_LINKS,
      }}
    />
  );
}

export function ServiceSchema() {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        // Service (not LocalBusiness/ProfessionalService): the firm is remote-
        // first with no physical storefront, so the local-business address /
        // telephone fields don't apply. Contact + brand identity live on the
        // Organization schema above.
        "@type": "Service",
        serviceType: "AI product engineering",
        name: "AI Product Engineering",
        url: SITE_URL,
        image: `${SITE_URL}/og.png`,
        provider: { "@id": ORGANIZATION_ID },
        areaServed: ["European Union", "United States"],
        description:
          "We build production AI products that break operational bottlenecks in 8 weeks with lean pods.",
        offers: OFFERS.map((o) => ({
          "@type": "Offer",
          name: o.name,
          price: o.price,
          priceCurrency: "EUR",
          description: o.description,
          ...("minPrice" in o
            ? {
                priceSpecification: {
                  "@type": "PriceSpecification",
                  minPrice: o.minPrice,
                  maxPrice: o.maxPrice,
                  priceCurrency: "EUR",
                },
              }
            : {}),
        })),
      }}
    />
  );
}

export function WebSiteSchema() {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        name: SITE_NAME,
        url: SITE_URL,
        inLanguage: ["en", "fr", "id"],
        publisher: { "@id": ORGANIZATION_ID },
        isAccessibleForFree: true,
      }}
    />
  );
}
