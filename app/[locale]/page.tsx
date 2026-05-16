import AppShell from '@/components/AppShell';

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params; // We don't use it yet but it's good to await it
  return <AppShell />;
}
