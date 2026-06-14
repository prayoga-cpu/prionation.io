import type { Metadata, Viewport } from "next";
import { Bitter } from "next/font/google";
import localFont from "next/font/local";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Analytics } from "@vercel/analytics/react";
import { Suspense } from "react";
import MetaPixel from "@/components/MetaPixel";
import { SITE_URL, SITE_NAME } from "@/lib/seo/site";
import { OrganizationSchema, ServiceSchema, WebSiteSchema } from "@/components/JsonLd";
import "../globals.css";

// Open Graph locale codes per supported language.
const OG_LOCALE: Record<string, string> = {
  en: "en_US",
  fr: "fr_FR",
  id: "id_ID",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const rubik = localFont({
  src: [
    {
      path: "../../public/fonts/rubik/rubik-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/rubik/rubik-latin-500-normal.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/rubik/rubik-latin-600-normal.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/rubik/rubik-latin-700-normal.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/rubik/rubik-latin-800-normal.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-rubik",
  display: "swap",
});

// Decorative pixel font (small labels, never the LCP element) — don't preload it
// so it can't compete with the hero/body fonts for bandwidth on first paint.
const pressStart2P = localFont({
  src: "../../public/fonts/press-start-2p/press-start-2p-latin-400-normal.woff2",
  variable: "--font-press-start-2p",
  display: "swap",
  preload: false,
});

// Hero <h1> display font = the mobile LCP element — keep it preloaded (default).
const blackHanSans = localFont({
  src: "../../public/fonts/black-han-sans/black-han-sans-latin-400-normal.woff2",
  variable: "--font-black-han-sans",
  display: "swap",
});

// Serif is only used on /start; don't preload it on every page.
const bitter = Bitter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-bitter",
  display: "swap",
  preload: false,
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  const canonical = `${SITE_URL}/${locale}`;
  const title = t("homeTitle");
  const description = t("homeDescription");

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: title, template: "%s · PRIONATION.io" },
    description,
    alternates: {
      canonical,
      languages: {
        en: `${SITE_URL}/en`,
        fr: `${SITE_URL}/fr`,
        id: `${SITE_URL}/id`,
        "x-default": `${SITE_URL}/en`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale: OG_LOCALE[locale] ?? "en_US",
      type: "website",
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og.png"],
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-64x64.png", sizes: "64x64", type: "image/png" },
      ],
      shortcut: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // No maximumScale / userScalable:false — blocking pinch-zoom fails the
  // Lighthouse a11y `meta-viewport` audit and hurts low-vision users.
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  // Enable static rendering for this locale (faster TTFB — served from the edge).
  setRequestLocale(locale);

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      className={`${rubik.variable} ${pressStart2P.variable} ${blackHanSans.variable} ${bitter.variable}`}
    >
      <body suppressHydrationWarning>
        <OrganizationSchema />
        <ServiceSchema />
        <WebSiteSchema />
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <Analytics />
        <Suspense fallback={null}>
          <MetaPixel />
        </Suspense>
      </body>
    </html>
  );
}
