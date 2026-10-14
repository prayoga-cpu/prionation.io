import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getFinanceSession } from "@/lib/finance/auth/requireSession";
import { readFunnel, type FunnelRow } from "@/lib/analytics/counter";
import { SectionShell } from "../components/SectionShell";

// Internal read-out of the consent-free /start counters (lib/analytics/counter.ts):
// page views and contact-button taps, last 14 Paris days. Chats themselves are
// counted in Evan's WhatsApp inbox (ref codes), not here. ?qa=1 shows the QA
// bucket (team test traffic tagged with qa=1) instead.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "/start funnel · Finance · PRIONATION.io",
  robots: { index: false, follow: false },
};

type DayTotals = { day: string; views: number; wa: number; tel: number; cbOpen: number; cb: number; mail: number };

function sum(rows: FunnelRow[], pred: (r: FunnelRow) => boolean) {
  return rows.reduce((acc, r) => (pred(r) ? acc + r.count : acc), 0);
}

function pct(n: number, d: number) {
  return d > 0 ? `${((n / d) * 100).toFixed(1)}%` : "—";
}

const TH = "text-left px-3 py-2 font-pixel text-[8px] tracking-[0.12em] uppercase text-muted whitespace-nowrap";
const TD = "px-3 py-2 text-[13px] tabular-nums whitespace-nowrap";

export default async function FunnelPage({ searchParams }: { searchParams: Promise<{ qa?: string }> }) {
  const session = await getFinanceSession();
  if (!session) redirect("/finance/login");
  const { qa } = await searchParams;
  const isQa = qa === "1";

  let rows: FunnelRow[] = [];
  let error = "";
  try {
    rows = await readFunnel(14, isQa);
  } catch (e) {
    error = e instanceof Error ? e.message : "Could not read the counters.";
  }

  const days = Array.from(new Set(rows.map((r) => r.day)));
  const allDays: DayTotals[] = days
    .sort()
    .reverse()
    .map((day) => {
      const d = rows.filter((r) => r.day === day);
      return {
        day,
        views: sum(d, (r) => r.metric === "view"),
        wa: sum(d, (r) => r.metric === "tap" && r.channel === "wa"),
        tel: sum(d, (r) => r.metric === "tap" && r.channel === "tel"),
        cbOpen: sum(d, (r) => r.metric === "tap" && r.channel === "cb_open"),
        cb: sum(d, (r) => r.metric === "tap" && r.channel === "cb"),
        mail: sum(d, (r) => r.metric === "tap" && r.channel === "mail"),
      };
    });

  const total = allDays.reduce(
    (a, d) => ({ views: a.views + d.views, wa: a.wa + d.wa, tel: a.tel + d.tel, cbOpen: a.cbOpen + d.cbOpen, cb: a.cb + d.cb, mail: a.mail + d.mail }),
    { views: 0, wa: 0, tel: 0, cbOpen: 0, cb: 0, mail: 0 },
  );

  const taps = rows.filter((r) => r.metric === "tap");
  const byPlacement = Array.from(new Set(taps.map((r) => r.placement))).map((placement) => ({
    placement,
    wa: sum(taps, (r) => r.placement === placement && r.channel === "wa"),
    tel: sum(taps, (r) => r.placement === placement && r.channel === "tel"),
    cbOpen: sum(taps, (r) => r.placement === placement && r.channel === "cb_open"),
    cb: sum(taps, (r) => r.placement === placement && r.channel === "cb"),
  }));

  const campaignKey = (r: FunnelRow) => `${r.locale} · ${r.campaign} · ${r.content}`;
  const byCampaign = Array.from(new Set(rows.map(campaignKey))).map((key) => {
    const c = rows.filter((r) => campaignKey(r) === key);
    const views = sum(c, (r) => r.metric === "view");
    const wa = sum(c, (r) => r.metric === "tap" && r.channel === "wa");
    const other = sum(c, (r) => r.metric === "tap" && r.channel !== "wa");
    return { key, views, wa, other };
  });

  return (
    <div className="max-w-[1100px] mx-auto px-4 sm:px-6 pb-16">
      <header className="flex flex-wrap items-center justify-between gap-3 py-6 border-b border-line">
        <div className="flex flex-col gap-1">
          <h1 className="m-0 font-sans font-extrabold text-[22px]">/start funnel{isQa ? " · QA bucket" : ""}</h1>
          <p className="m-0 text-muted text-[13px]">
            Consent-free counters, last 14 days (Paris time). WhatsApp chats are counted in Evan&apos;s inbox by ref code.
          </p>
        </div>
        <nav className="flex gap-4 text-[13px]">
          <Link href={isQa ? "/finance/funnel" : "/finance/funnel?qa=1"} className="text-accent hover:underline">
            {isQa ? "Live traffic" : "QA bucket"}
          </Link>
          <Link href="/finance" className="text-soft hover:text-white">
            ← Finance
          </Link>
        </nav>
      </header>

      {error && <p className="mt-6 text-[14px] text-[#ff8379]">Counter read failed: {error}</p>}

      <SectionShell number="01" title="Totals">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-line border border-line rounded-xl overflow-hidden">
          {[
            ["Page views", String(total.views)],
            ["WhatsApp taps", `${total.wa} · ${pct(total.wa, total.views)}`],
            ["Phone taps", `${total.tel} · ${pct(total.tel, total.views)}`],
            ["Call-backs sent", `${total.cb} (form opened ${total.cbOpen})`],
          ].map(([label, value]) => (
            <div key={label} className="bg-card px-4 py-3 flex flex-col gap-1">
              <span className="text-muted text-[12px]">{label}</span>
              <span className="font-sans font-bold text-[18px] tabular-nums">{value}</span>
            </div>
          ))}
        </div>
      </SectionShell>

      <SectionShell number="02" title="By day">
        <div className="overflow-x-auto border border-line rounded-xl">
          <table className="w-full border-collapse min-w-[640px]">
            <thead>
              <tr>
                {["Day", "Views", "WhatsApp", "Tap rate", "Phone", "Call-back opened", "Call-back sent", "E-mail"].map((h) => (
                  <th key={h} className={TH}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allDays.length === 0 && (
                <tr>
                  <td className={`${TD} text-muted`} colSpan={8}>No hits recorded yet.</td>
                </tr>
              )}
              {allDays.map((d) => (
                <tr key={d.day} className="border-t border-line">
                  <td className={TD}>{d.day}</td>
                  <td className={TD}>{d.views}</td>
                  <td className={TD}>{d.wa}</td>
                  <td className={TD}>{pct(d.wa, d.views)}</td>
                  <td className={TD}>{d.tel}</td>
                  <td className={TD}>{d.cbOpen}</td>
                  <td className={TD}>{d.cb}</td>
                  <td className={TD}>{d.mail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionShell>

      <SectionShell number="03" title="Taps by button">
        <div className="overflow-x-auto border border-line rounded-xl">
          <table className="w-full border-collapse min-w-[480px]">
            <thead>
              <tr>
                {["Button", "WhatsApp", "Phone", "Call-back opened", "Call-back sent"].map((h) => (
                  <th key={h} className={TH}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {byPlacement.map((p) => (
                <tr key={p.placement} className="border-t border-line">
                  <td className={TD}>{p.placement}</td>
                  <td className={TD}>{p.wa}</td>
                  <td className={TD}>{p.tel}</td>
                  <td className={TD}>{p.cbOpen}</td>
                  <td className={TD}>{p.cb}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionShell>

      <SectionShell number="04" title="By language · campaign · ad">
        <div className="overflow-x-auto border border-line rounded-xl">
          <table className="w-full border-collapse min-w-[480px]">
            <thead>
              <tr>
                {["Language · utm_campaign · utm_content", "Views", "WhatsApp taps", "Other taps"].map((h) => (
                  <th key={h} className={TH}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {byCampaign.map((c) => (
                <tr key={c.key} className="border-t border-line">
                  <td className={TD}>{c.key}</td>
                  <td className={TD}>{c.views}</td>
                  <td className={TD}>{c.wa}</td>
                  <td className={TD}>{c.other}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionShell>
    </div>
  );
}
