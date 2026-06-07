import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getPublishedPages } from "@/lib/content/pages";
import { ContentHeader } from "@/components/content/ContentHeader";
import { SectionIndex } from "@/components/content/SectionIndex";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { SITE_URL } from "@/lib/seo/site";

const SECTION = "guides" as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: { absolute: "Guides · PRIONATION.io" },
    alternates: {
      canonical: `${SITE_URL}/${locale}/guides`,
      languages: {
        en: `${SITE_URL}/en/guides`,
        fr: `${SITE_URL}/fr/guides`,
        id: `${SITE_URL}/id/guides`,
        "x-default": `${SITE_URL}/en/guides`,
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
