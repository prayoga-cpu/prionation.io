import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "../globals.css";

// /finance is a sibling of app/[locale], not nested inside it — it needs its
// own root layout (<html>/<body>). Internal tool, English-only, no next-intl.

const rubik = localFont({
  src: [
    { path: "../../public/fonts/rubik/rubik-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/rubik/rubik-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/rubik/rubik-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../../public/fonts/rubik/rubik-latin-700-normal.woff2", weight: "700", style: "normal" },
    { path: "../../public/fonts/rubik/rubik-latin-800-normal.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-rubik",
  display: "swap",
});

const pressStart2P = localFont({
  src: "../../public/fonts/press-start-2p/press-start-2p-latin-400-normal.woff2",
  variable: "--font-press-start-2p",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "Finance · PRIONATION.io",
  description: "Internal finance dashboard.",
  robots: { index: false, follow: false, nocache: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function FinanceRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${rubik.variable} ${pressStart2P.variable}`}>
      <body
        suppressHydrationWarning
        className="bg-bg text-white font-sans antialiased min-h-screen"
      >
        {children}
      </body>
    </html>
  );
}
