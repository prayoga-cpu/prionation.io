import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { SITE_URL, SITE_NAME } from "@/lib/seo/site";
import { ContentHeader } from "@/components/content/ContentHeader";
import { ManifestoPage } from "@/components/content/ManifestoPage";
import { SiteFooter } from "@/components/sections/SiteFooter";

const PATH = "/ai-product-engineering-for-mid-market-companies/manifesto";

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
  const canonical = `${SITE_URL}/${locale}${PATH}`;
  const title = "The AI Product Engineering Manifesto · PRIONATION.io";
  const description = "The firms that sold you digital transformation are now selling you AI. Most AI projects fail in production. Here is why, and how to fix it.";

  return {
    title: { absolute: title },
    description,
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
      type: "article",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <ContentHeader />
      <ManifestoPage />
      <SiteFooter />
    </>
  );
}
