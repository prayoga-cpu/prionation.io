import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SITE_URL, SITE_NAME } from "@/lib/seo/site";
import { SalesPage } from "@/components/sales/SalesPage";

// Sales page for paid/outbound traffic (CTA = WhatsApp chat with sales).
// Deliberately noindex and absent from the sitemap: its offer copy overlaps
// the homepage, which stays the page that ranks.
const PATH = "/start";

const OG_LOCALE: Record<string, string> = {
  en: "en_US",
  fr: "fr_FR",
  id: "id_ID",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Sales" });
  const canonical = `${SITE_URL}/${locale}${PATH}`;
  const title = t("metaTitle");
  const description = t("metaDescription");

  return {
    // absolute: metaTitle already includes the brand; bypass the layout template.
    title: { absolute: title },
    description,
    robots: { index: false, follow: true },
    alternates: {
      canonical,
      languages: {
        en: `${SITE_URL}/en${PATH}`,
        fr: `${SITE_URL}/fr${PATH}`,
        id: `${SITE_URL}/id${PATH}`,
        "x-default": `${SITE_URL}/en${PATH}`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale: OG_LOCALE[locale] ?? "en_US",
      type: "website",
      images: [{ url: "/og.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og.png"],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <SalesPage />;
}
