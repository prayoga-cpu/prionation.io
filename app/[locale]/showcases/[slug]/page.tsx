import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getPublishedPages, getPageBySlug } from "@/lib/content/pages";
import { pagesContent } from "@/lib/content/text";
import { buildContentMetadata, getRelatedLinks } from "@/lib/content/meta";
import { ContentHeader } from "@/components/content/ContentHeader";
import { ContentArticle } from "@/components/content/ContentArticle";
import { SiteFooter } from "@/components/sections/SiteFooter";

const SECTION = "showcases" as const;
export const dynamicParams = false;

export function generateStaticParams() {
  return getPublishedPages(SECTION).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  return buildContentMetadata({ section: SECTION, slug, locale });
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const page = getPageBySlug(SECTION, slug);
  if (!page || page.status !== "published") notFound();
  const content = pagesContent[locale]?.[SECTION]?.[slug];
  if (!content) notFound();
  const related = await getRelatedLinks({ section: SECTION, slug, locale });
  return (
    <>
      <ContentHeader />
      <ContentArticle section={SECTION} slug={slug} schemaType={page.schema} datePublished={page.publishedAt} dateModified={page.updatedAt || page.publishedAt} related={related} intro={content.intro} sections={content.sections} faq={content.faq} />
      <SiteFooter />
    </>
  );
}
