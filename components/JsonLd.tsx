import {
  SITE_URL,
  SITE_NAME,
  LEGAL_NAME,
  CONTACT_EMAIL,
  FOUNDING_DATE,
  SOCIAL_LINKS,
  OFFERS,
} from "@/lib/seo/site";

// Server components that emit JSON-LD structured data for search + AI engines.
// Rendered once in the root layout. Page-level schemas (FAQPage, etc.) live with
// their own sections.

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
        name: SITE_NAME,
        legalName: LEGAL_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/icon-512.png`,
        description:
          "Production AI infrastructure for European and US-based mid-market companies. Fixed scope. Fixed price. Lean pods.",
        email: CONTACT_EMAIL,
        foundingDate: FOUNDING_DATE,
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
        "@type": "ProfessionalService",
        name: "AI Product Engineering",
        provider: { "@type": "Organization", name: SITE_NAME },
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
