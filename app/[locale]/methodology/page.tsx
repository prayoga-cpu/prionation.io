import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getPublishedPages } from "@/lib/content/pages";
import { ContentHeader } from "@/components/content/ContentHeader";
import { SectionIndex } from "@/components/content/SectionIndex";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { SITE_URL } from "@/lib/seo/site";

const SECTION = "methodology" as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: { absolute: "Methodology · PRIONATION.io" },
    description:
      "The four engineering principles that make fixed-price production AI possible.",
    alternates: {
      canonical: `${SITE_URL}/${locale}/methodology`,
      languages: {
        en: `${SITE_URL}/en/methodology`,
        fr: `${SITE_URL}/fr/methodology`,
        id: `${SITE_URL}/id/methodology`,
        "x-default": `${SITE_URL}/en/methodology`,
      },
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
  const pages = getPublishedPages(SECTION);
  return (
    <>
      <ContentHeader />
      <SectionIndex section={SECTION} pages={pages} />
      <SiteFooter />
    </>
  );
}
