import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getPublishedPages } from "@/lib/content/pages";
import { ContentHeader } from "@/components/content/ContentHeader";
import { SectionIndex } from "@/components/content/SectionIndex";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { SITE_URL } from "@/lib/seo/site";

const SECTION = "frameworks" as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: { absolute: "uframeworks · PRIONATION.io" },
    alternates: {
      canonical: `${SITE_URL}/${locale}/frameworks`,
      languages: {
        en: `${SITE_URL}/en/frameworks`,
        fr: `${SITE_URL}/fr/frameworks`,
        id: `${SITE_URL}/id/frameworks`,
        "x-default": `${SITE_URL}/en/frameworks`,
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
