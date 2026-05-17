import type { Metadata, Viewport } from "next";
import { Bitter } from "next/font/google";
import localFont from "next/font/local";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Analytics } from "@vercel/analytics/react";
import "../globals.css";

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

const pressStart2P = localFont({
  src: "../../public/fonts/press-start-2p/press-start-2p-latin-400-normal.woff2",
  variable: "--font-press-start-2p",
  display: "swap",
});

const blackHanSans = localFont({
  src: "../../public/fonts/black-han-sans/black-han-sans-latin-400-normal.woff2",
  variable: "--font-black-han-sans",
  display: "swap",
});

const bitter = Bitter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-bitter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PRIONATION.io | AI products that break operational bottlenecks.",
  description:
    "PRIONATION.io builds production AI infrastructure for European and US-Based mid-market companies. 8 weeks, fixed scope, lean pods.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
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

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${rubik.variable} ${pressStart2P.variable} ${blackHanSans.variable} ${bitter.variable}`}
    >
      <body suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
