import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getFinanceSession } from "@/lib/finance/auth/requireSession";
import { fetchLatestAcknowledgments, TERMS_VERSION } from "@/lib/finance/notion/acknowledgments";
import { AcknowledgeButton } from "../components/AcknowledgeButton";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Terms · Finance · PRIONATION.io",
  robots: { index: false, follow: false },
};

function Section({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <section className="py-8 border-b border-line">
      <p className="font-pixel text-[8px] tracking-[0.1em] text-accent uppercase mb-2">
        {String(n).padStart(2, "0")}
      </p>
      <h2 className="font-sans text-lg font-bold text-white mb-3">{title}</h2>
      <div className="font-sans text-[14px] text-soft leading-relaxed space-y-3">{children}</div>
    </section>
  );
}

export default async function FinanceTermsPage() {
  const session = await getFinanceSession();
  if (!session) redirect("/finance/login");

  const acknowledgments = await fetchLatestAcknowledgments();
  const mine = acknowledgments[session.role];
  const alreadyAcknowledged = mine?.termsVersion === TERMS_VERSION;

  return (
    <div className="max-w-[720px] mx-auto px-6 py-16">
      <Link
        href="/finance"
        className="font-sans text-[13px] text-muted hover:text-white transition-colors"
      >
        ← Dashboard
      </Link>
      <h1 className="font-sans text-2xl font-bold text-white mt-6 mb-1">
        Finance terms &amp; conditions
      </h1>
      <p className="font-pixel text-[8px] tracking-[0.1em] text-muted uppercase mb-4">
        Version {TERMS_VERSION}
      </p>

      <Section n={1} title="Parties">
        <p>
          Priority Foundation · Darwin Prayoga, Founder &amp; CEO · Evan Cao, Chief Revenue
          Officer.
        </p>
      </Section>

      <Section n={2} title="Standard revenue split">
        <p>
          The default split on realized income is <span className="text-white">80% Darwin /
          20% Evan</span>. Darwin&apos;s share reflects delivery, engineering, and infrastructure
          ownership; Evan&apos;s share reflects revenue operations and client acquisition.
        </p>
      </Section>

      <Section n={3} title="Exceptions">
        <p>
          <span className="text-white">Epidom</span> is a stated exception: 100% Darwin, 0% Evan.
          Rationale: development cost reimbursement under a separate project arrangement, not a
          standard revenue engagement.
        </p>
      </Section>

      <Section n={4} title="How exceptions get flagged">
        <p>
          The <span className="text-white">&quot;Own Profit Share Deal&quot;</span> checkbox on
          the Transactions record in Notion is the mechanism — when checked, that transaction is
          excluded from the standard split and shown separately on the Profit Split panel. It is
          set manually and can be forgotten; the dashboard&apos;s data-quality panel flags rows
          that look like they should be checked but aren&apos;t.
        </p>
      </Section>

      <Section n={5} title="Currency handling">
        <p>
          The native currency amount on each transaction is authoritative. EUR figures shown on
          this dashboard are converted estimates, not booked FX rates, and are labeled as such
          throughout.
        </p>
      </Section>

      <Section n={6} title="Source of truth">
        <p>
          Notion is the ledger. This dashboard is a read-only view over it — no figure here can
          be edited from the dashboard itself; corrections happen in Notion.
        </p>
      </Section>

      <Section n={7} title="Review cadence">
        <p>Monthly, on the first business day.</p>
      </Section>

      <Section n={8} title="Dispute process">
        <p>
          If either party disputes a figure: flag the specific transaction in writing, both
          review the source record in Notion, and resolve directly. If unresolved within 5
          business days, escalate to a joint call before the next monthly review.
        </p>
      </Section>

      <Section n={9} title="Acknowledgment">
        <p className="mb-4">
          {mine
            ? `You last acknowledged v${mine.termsVersion} on ${new Date(mine.acknowledgedAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}.`
            : "You haven't acknowledged the current terms yet."}
        </p>
        <AcknowledgeButton alreadyAcknowledged={alreadyAcknowledged} />
      </Section>
    </div>
  );
}
