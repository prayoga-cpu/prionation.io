import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import StartPage from "@/components/start/StartPage";
import { SITE_URL, SITE_NAME } from "@/lib/seo/site";

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
  const t = await getTranslations({ locale, namespace: "Meta" });
  const canonical = `${SITE_URL}/${locale}/start`;
  const title = t("startTitle");
  const description = t("startDescription");

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical,
      languages: {
        en: `${SITE_URL}/en/start`,
        fr: `${SITE_URL}/fr/start`,
        id: `${SITE_URL}/id/start`,
        "x-default": `${SITE_URL}/en/start`,
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
  return <StartPage />;
}
