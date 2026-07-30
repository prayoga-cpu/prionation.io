import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getFinanceSession } from "@/lib/finance/auth/requireSession";
import { getFinanceSnapshot } from "@/lib/finance/notion/snapshot";
import { DashboardHeader } from "./components/DashboardHeader";
import { KpiGrid } from "./components/KpiGrid";
import { IncomeByProject } from "./components/IncomeByProject";
import { ReceivablesTable } from "./components/ReceivablesTable";
import { ProfitSplitPanel } from "./components/ProfitSplitPanel";
import { BudgetVsActual } from "./components/BudgetVsActual";
import { PipelineByStage } from "./components/PipelineByStage";
import { LedgerTable } from "./components/LedgerTable";
import { DataQualityPanel } from "./components/DataQualityPanel";
import { SectionShell } from "./components/SectionShell";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dashboard · Finance · PRIONATION.io",
  robots: { index: false, follow: false },
};

export default async function FinanceDashboardPage() {
  // Middleware already gates this route — this is defense in depth, and the
  // source of the role/email shown in the header.
  const session = await getFinanceSession();
  if (!session) redirect("/finance/login");

  const data = await getFinanceSnapshot();

  return (
    <div className="max-w-[1100px] mx-auto px-6">
      <DashboardHeader role={session.role} fetchedAt={data.fetchedAt} />

      <div className="py-6 border-b border-line">
        <DataQualityPanel issues={data.dataQuality} />
      </div>

      <SectionShell number="01" title="Overview">
        <KpiGrid kpis={data.kpis} />
      </SectionShell>

      <SectionShell number="02" title="Income">
        <IncomeByProject
          byProject={data.incomeByProject}
          byCategory={data.incomeByCategory}
          byMonth={data.incomeByMonth}
        />
      </SectionShell>

      <SectionShell number="03" title="Receivables">
        <ReceivablesTable receivables={data.receivables} />
      </SectionShell>

      <SectionShell number="04" title="Profit split">
        <ProfitSplitPanel split={data.profitSplit} />
      </SectionShell>

      <SectionShell number="05" title="Budget">
        <BudgetVsActual lines={data.budgetVsActual} />
      </SectionShell>

      <SectionShell number="06" title="Pipeline">
        <PipelineByStage stages={data.pipelineByStage} />
      </SectionShell>

      <SectionShell number="07" title="Ledger">
        <LedgerTable transactions={data.transactions} />
      </SectionShell>

      <footer className="py-10 flex items-center justify-between">
        <Link
          href="/finance/terms"
          className="font-sans text-[12px] text-accent hover:text-white transition-colors"
        >
          Terms & conditions
        </Link>
        <p className="font-pixel text-[8px] tracking-[0.15em] text-muted uppercase">
          PRIONATION.io · Internal
        </p>
      </footer>
    </div>
  );
}
