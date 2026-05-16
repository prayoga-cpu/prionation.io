import type { Metadata } from "next";
import { Bitter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const rubik = localFont({
  src: [
    {
      path: "../public/fonts/rubik/rubik-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/rubik/rubik-latin-500-normal.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/rubik/rubik-latin-600-normal.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/rubik/rubik-latin-700-normal.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/rubik/rubik-latin-800-normal.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-rubik",
  display: "swap",
});

const pressStart2P = localFont({
  src: "../public/fonts/press-start-2p/press-start-2p-latin-400-normal.woff2",
  variable: "--font-press-start-2p",
  display: "swap",
});

const blackHanSans = localFont({
  src: "../public/fonts/black-han-sans/black-han-sans-latin-400-normal.woff2",
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
  title: "PRIONATION.io — AI products that break operational bottlenecks.",
  description:
    "PRIONATION.io builds production AI infrastructure for European and US-Based mid-market companies. 8 weeks, fixed scope, lean pods.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${rubik.variable} ${pressStart2P.variable} ${blackHanSans.variable} ${bitter.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
