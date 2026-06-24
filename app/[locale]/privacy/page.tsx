import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { SITE_URL, SITE_NAME, LEGAL_NAME, CONTACT_EMAIL } from "@/lib/seo/site";

const LAST_UPDATED = "2026-06-25";

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
  const canonical = `${SITE_URL}/${locale}/privacy`;
  const title = `Privacy Policy · ${SITE_NAME}`;
  const description =
    "How PRIONATION.io collects, uses, and protects your data — analytics, cookies, consent, the inquiry forms, and your rights.";

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical,
      languages: {
        en: `${SITE_URL}/en/privacy`,
        fr: `${SITE_URL}/fr/privacy`,
        id: `${SITE_URL}/id/privacy`,
        "x-default": `${SITE_URL}/en/privacy`,
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
    twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
  };
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-sans font-bold text-white text-[clamp(18px,2.2vw,24px)] tracking-[-0.01em] mt-12 mb-3">
      {children}
    </h2>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-soft text-[15px] leading-[1.75] mb-4">{children}</p>;
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const li = "text-soft text-[15px] leading-[1.7]";

  return (
    <div className="px-page-x pt-[130px] pb-[120px]">
      <div className="max-w-[820px] mx-auto">
        {/* Breadcrumb */}
        <nav
          className="flex items-center flex-wrap gap-1.5 text-[12px] text-muted mb-10 font-sans"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span className="opacity-40">/</span>
          <span className="text-soft">Privacy</span>
        </nav>

        <div className="font-pixel text-[10px] tracking-[0.15em] text-accent uppercase mb-4">
          Legal
        </div>
        <h1 className="font-sans font-extrabold text-[clamp(28px,3.8vw,46px)] leading-[1.07] tracking-[-0.03em] text-white mb-4">
          Privacy Policy
        </h1>
        <p className="text-muted text-[13px] font-sans mb-12">
          Last updated: {LAST_UPDATED}
        </p>

        <P>
          This policy explains what {SITE_NAME} ({LEGAL_NAME}) collects when you
          visit this site or contact us, why, and the choices you have. Questions:{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent"
          >
            {CONTACT_EMAIL}
          </a>
          .
        </P>

        <H2>Analytics &amp; cookies</H2>
        <P>
          We use Google Analytics 4 and the Meta Pixel to understand how the site
          is used, and Vercel Analytics (which is cookieless). Google Analytics
          and the Meta Pixel set cookies.
        </P>
        <P>
          If you visit from the EEA, the UK, or Switzerland, these are{" "}
          <strong className="text-white font-semibold">off by default</strong> —
          Google Analytics runs in cookieless Consent Mode and the Meta Pixel does
          not load until you accept via the banner. Elsewhere they are enabled by
          default. You can change your choice at any time by clearing this site&apos;s
          cookies/site data, which brings the banner back where applicable.
        </P>
        <P>Cookies and local storage we use:</P>
        <ul className="list-disc pl-5 flex flex-col gap-2 mb-4">
          <li className={li}>
            <code className="text-white">pn_consent</code> — remembers your cookie
            choice (functional).
          </li>
          <li className={li}>
            <code className="text-white">pn_eu</code> — your broad region, used only
            to decide whether the consent banner is required (functional).
          </li>
          <li className={li}>
            Google Analytics / Meta cookies — set only after consent (where
            required), for measurement.
          </li>
          <li className={li}>
            Marketing attribution (UTM parameters, referrer, landing page) is held
            in your browser&apos;s session storage so we can understand which channel
            an inquiry came from. It is not a cookie and is cleared when you close
            the tab.
          </li>
        </ul>

        <H2>Information you give us</H2>
        <P>
          When you submit the diagnostic, meeting, careers, or waitlist forms, we
          collect what you enter — such as your name, email, company, location,
          role, and the details you describe (and, for careers, your CV). We use
          this only to respond to you and manage the resulting conversation.
        </P>

        <H2>How your data is processed</H2>
        <P>We rely on a small set of established service providers (processors):</P>
        <ul className="list-disc pl-5 flex flex-col gap-2 mb-4">
          <li className={li}>
            <strong className="text-white font-semibold">Notion</strong> — stores
            form submissions and our sales pipeline.
          </li>
          <li className={li}>
            <strong className="text-white font-semibold">Resend</strong> — sends
            confirmation and notification emails.
          </li>
          <li className={li}>
            <strong className="text-white font-semibold">Supabase</strong> — stores
            CV files uploaded with career applications.
          </li>
          <li className={li}>
            <strong className="text-white font-semibold">Cloudflare Turnstile</strong>{" "}
            and <strong className="text-white font-semibold">Upstash</strong> —
            anti-bot protection and rate limiting (may process your IP address).
          </li>
          <li className={li}>
            <strong className="text-white font-semibold">Vercel</strong> — hosts the
            site and provides cookieless analytics.
          </li>
          <li className={li}>
            <strong className="text-white font-semibold">Google</strong> and{" "}
            <strong className="text-white font-semibold">Meta</strong> — analytics
            and measurement, as described above.
          </li>
        </ul>
        <P>
          Some of these providers are based outside your country, including in the
          United States; they handle data under their own standard safeguards. We
          do not sell your personal data.
        </P>

        <H2>Legal bases &amp; retention</H2>
        <P>
          Where the GDPR applies, we process inquiry data to take steps at your
          request and on the basis of our legitimate interest in responding to
          prospective clients and candidates; analytics and marketing cookies are
          processed on the basis of your consent. We keep inquiry data for as long
          as needed to handle your request and any resulting engagement, then
          delete or anonymize it.
        </P>

        <H2>Your rights</H2>
        <P>
          Depending on where you live (e.g. under the GDPR or CCPA), you may have
          the right to access, correct, delete, or port your data, to object to or
          restrict processing, and to withdraw consent. To exercise any of these,
          email{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent"
          >
            {CONTACT_EMAIL}
          </a>
          .
        </P>

        <H2>Changes</H2>
        <P>
          We may update this policy as the site and our tools evolve. Material
          changes will be reflected by the &ldquo;last updated&rdquo; date above.
        </P>

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
