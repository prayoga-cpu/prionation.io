import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getPublishedPages } from "@/lib/content/pages";
import { ContentHeader } from "@/components/content/ContentHeader";
import { SectionIndex } from "@/components/content/SectionIndex";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { SITE_URL } from "@/lib/seo/site";

const SECTION = "intelligence" as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: { absolute: "Intelligence · PRIONATION.io" },
    alternates: {
      canonical: `${SITE_URL}/${locale}/intelligence`,
      languages: {
        en: `${SITE_URL}/en/intelligence`,
        fr: `${SITE_URL}/fr/intelligence`,
        id: `${SITE_URL}/id/intelligence`,
        "x-default": `${SITE_URL}/en/intelligence`,
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
