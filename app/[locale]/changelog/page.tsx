import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { SITE_URL, SITE_NAME } from "@/lib/seo/site";
import { V3_ENTRIES, ARCHIVED_VERSIONS, CURRENT_VERSION } from "@/lib/content/changelog";

const OG_LOCALE: Record<string, string> = {
  en: "en_US",
  fr: "fr_FR",
  id: "id_ID",
};

const TITLE = "Changelog · PRIONATION.io";
const DESCRIPTION =
  "What shipped, when — a real, dated history of this site's development, plus the archived v1 and v2 iterations that came before it.";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const canonical = `${SITE_URL}/${locale}/changelog`;

  return {
    title: { absolute: TITLE },
    description: DESCRIPTION,
    alternates: {
      canonical,
      languages: {
        en: `${SITE_URL}/en/changelog`,
        fr: `${SITE_URL}/fr/changelog`,
        id: `${SITE_URL}/id/changelog`,
        "x-default": `${SITE_URL}/en/changelog`,
      },
    },
    openGraph: {
      title: TITLE,
      description: DESCRIPTION,
      url: canonical,
      siteName: SITE_NAME,
      locale: OG_LOCALE[locale] ?? "en_US",
      type: "website",
    },
    twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
  };
}

function formatDate(iso: string): string {
  // Ranges (e.g. "2026-06-26 to 2026-07-04") aren't valid Date input — pass through as-is.
  if (iso.includes(" to ")) {
    return iso
      .split(" to ")
      .map((d) => new Date(d + "T00:00:00Z").toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }))
      .join(" – ");
  }
  return new Date(iso + "T00:00:00Z").toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export default async function ChangelogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="px-page-x pt-[130px] pb-[120px]">
      <div className="max-w-[820px] mx-auto">
        <nav
          className="flex items-center flex-wrap gap-1.5 text-[12px] text-muted mb-10 font-sans"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span className="opacity-40">/</span>
          <span className="text-soft">Changelog</span>
        </nav>

        <div className="font-pixel text-[10px] tracking-[0.15em] text-accent uppercase mb-4">
          Dev log
        </div>
        <h1 className="font-sans font-extrabold text-[clamp(28px,3.8vw,46px)] leading-[1.07] tracking-[-0.03em] text-white mb-4">
          Changelog
        </h1>
        <p className="text-soft text-[15px] leading-[1.7] mb-6 max-w-[62ch]">
          {DESCRIPTION} Dates are the actual commit dates from this repository&apos;s history — nothing here is invented.
        </p>
        <p className="text-muted text-[13px] leading-[1.7] mb-14 max-w-[62ch]">
          Version numbers follow semver: <span className="text-soft">minor</span> bumps ship a new page or capability, <span className="text-soft">patch</span> bumps are fixes, performance, or tooling. Major stays 3 for the life of this codebase.
        </p>

        {/* v3 — this codebase */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <h2 className="font-sans font-bold text-white text-[clamp(18px,2.2vw,24px)] tracking-[-0.01em] m-0">
              v{CURRENT_VERSION} — current
            </h2>
            <span className="font-pixel text-[8px] tracking-[0.12em] text-accent uppercase bg-accent-10 border border-accent-30 rounded-full px-2.5 py-1">
              You are here
            </span>
          </div>

          <ol className="flex flex-col gap-10 border-l border-line-soft pl-6 ml-1">
            {V3_ENTRIES.map((entry) => (
              <li key={entry.date + entry.title} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -left-[29px] top-[6px] w-2.5 h-2.5 rounded-full bg-accent shadow-[0_0_8px_var(--c-accent)]"
                />
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="font-pixel text-[9px] tracking-[0.1em] text-accent uppercase">v{entry.version}</span>
                  <span
                    className={`font-pixel text-[7px] tracking-[0.1em] uppercase px-2 py-0.5 rounded-full border ${
                      entry.bump === "minor"
                        ? "text-accent bg-accent-10 border-accent-30"
                        : "text-muted bg-white/5 border-line-soft"
                    }`}
                  >
                    {entry.bump}
                  </span>
                  <span className="font-pixel text-[9px] tracking-[0.12em] text-muted uppercase">
                    {formatDate(entry.date)}
                  </span>
                </div>
                <h3 className="font-sans font-bold text-white text-[16px] mb-2.5">{entry.title}</h3>
                <ul className="list-disc pl-5 flex flex-col gap-1.5">
                  {entry.items.map((item, i) => (
                    <li key={i} className="text-soft text-[14px] leading-[1.65]">
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </section>

        {/* v1 / v2 — archived, separate deployments */}
        <section className="mt-20 pt-14 border-t border-line-soft">
          <h2 className="font-sans font-bold text-white text-[clamp(18px,2.2vw,24px)] tracking-[-0.01em] mb-3">
            Earlier iterations
          </h2>
          <p className="text-soft text-[14px] leading-[1.7] mb-8 max-w-[62ch]">
            v1 and v2 are separate, archived deployments — not part of this codebase or its git history. Still live at their own subdomains.
          </p>
          <div className="flex flex-col gap-4">
            {ARCHIVED_VERSIONS.map((v) => (
              <a
                key={v.version}
                href={v.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-1.5 bg-card border border-line-soft rounded-2xl p-5 hover:bg-card-soft hover:border-soft transition-all"
              >
                <div className="flex items-center gap-2">
                  <span className="font-pixel text-[9px] tracking-[0.1em] text-accent uppercase">{v.version}</span>
                  <span className="text-muted text-[12px] group-hover:text-white transition-colors truncate">{v.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}</span>
                </div>
                <p className="text-soft text-[13px] leading-[1.6] m-0">{v.summary}</p>
              </a>
            ))}
          </div>
        </section>

        <div className="mt-14 pt-8 border-t border-line-soft">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-accent font-sans font-semibold text-[14px] hover:opacity-85 transition-opacity"
          >
            <span aria-hidden="true">←</span> Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
