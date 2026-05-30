import { setRequestLocale } from "next-intl/server";
import AppShell from "@/components/AppShell";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Enable static rendering for this locale (faster TTFB).
  setRequestLocale(locale);
  return <AppShell />;
}
