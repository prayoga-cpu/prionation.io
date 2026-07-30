import "server-only";
import type { BudgetLine, PipelineItem, StockShare, Transaction } from "./types";

export type FinanceData = {
  transactions: Transaction[];
  budget: BudgetLine[];
  shares: StockShare[];
  pipeline: PipelineItem[];
};

const sum = (nums: (number | null)[]) =>
  nums.reduce<number>((acc, n) => acc + (n ?? 0), 0);

function resolveProjectName(projectIds: string[], pipeline: PipelineItem[]): string {
  const id = projectIds[0];
  if (!id) return "Unassigned";
  return pipeline.find((p) => p.id === id)?.company ?? "Unassigned";
}

export function computeKpis(transactions: Transaction[]) {
  const income = transactions.filter((t) => t.type === "Income");
  const cashflow = transactions.filter((t) => t.type === "Cashflow");
  const expenses = transactions.filter((t) => t.type === "Expense");
  const realizedIncome = sum(income.map((t) => t.amountEur));
  const totalExpenses = sum(expenses.map((t) => t.amountEur));
  return {
    realizedIncome,
    unrealizedCashflow: sum(cashflow.map((t) => t.amountEur)),
    totalExpenses,
    netPosition: realizedIncome - totalExpenses,
    outstandingReceivables: sum(transactions.map((t) => t.potentialInflow)),
    overdueCount: transactions.filter((t) => (t.daysOverdue ?? 0) > 0).length,
  };
}

export function computeIncomeByProject(transactions: Transaction[], pipeline: PipelineItem[]) {
  const byProject = new Map<string, number>();
  for (const t of transactions) {
    if (t.type !== "Income") continue;
    const name = resolveProjectName(t.projectIds, pipeline);
    byProject.set(name, (byProject.get(name) ?? 0) + (t.amountEur ?? 0));
  }
  return [...byProject.entries()]
    .map(([project, amountEur]) => ({ project, amountEur }))
    .sort((a, b) => b.amountEur - a.amountEur);
}

export function computeIncomeByCategory(transactions: Transaction[]) {
  const byCategory = new Map<string, number>();
  for (const t of transactions) {
    if (t.type !== "Income") continue;
    const key = t.category ?? "Uncategorized";
    byCategory.set(key, (byCategory.get(key) ?? 0) + (t.amountEur ?? 0));
  }
  return [...byCategory.entries()]
    .map(([category, amountEur]) => ({ category, amountEur }))
    .sort((a, b) => b.amountEur - a.amountEur);
}

export function computeIncomeByMonth(transactions: Transaction[]) {
  const byMonth = new Map<string, number>();
  for (const t of transactions) {
    if (t.type !== "Income" || !t.date) continue;
    const month = t.date.slice(0, 7); // YYYY-MM
    byMonth.set(month, (byMonth.get(month) ?? 0) + (t.amountEur ?? 0));
  }
  return [...byMonth.entries()]
    .map(([month, amountEur]) => ({ month, amountEur }))
    .sort((a, b) => a.month.localeCompare(b.month));
}

export function computeReceivables(transactions: Transaction[]) {
  const overdue = transactions
    .filter((t) => (t.daysOverdue ?? 0) > 0)
    .sort((a, b) => (b.daysOverdue ?? 0) - (a.daysOverdue ?? 0));
  const withPercent = transactions.filter((t) => t.percentPaid !== null);
  return {
    totalPotentialInflow: sum(transactions.map((t) => t.potentialInflow)),
    avgPercentPaid: withPercent.length
      ? sum(withPercent.map((t) => t.percentPaid)) / withPercent.length
      : null,
    overdue,
  };
}

export function computeProfitSplit(transactions: Transaction[], pipeline: PipelineItem[]) {
  const relevant = transactions.filter(
    (t) => t.darwinCutEur !== null || t.evanCutEur !== null,
  );
  const ownDeals = relevant.filter((t) => t.ownProfitShareDeal);
  return {
    darwinTotal: sum(relevant.map((t) => t.darwinCutEur)),
    evanTotal: sum(relevant.map((t) => t.evanCutEur)),
    ownDeals: ownDeals.map((t) => ({
      id: t.id,
      name: t.name,
      project: resolveProjectName(t.projectIds, pipeline),
      amountEur: t.amountEur,
    })),
    breakdown: relevant.map((t) => ({
      id: t.id,
      name: t.name,
      project: resolveProjectName(t.projectIds, pipeline),
      amountEur: t.amountEur,
      darwinCutEur: t.darwinCutEur,
      evanCutEur: t.evanCutEur,
      ownProfitShareDeal: t.ownProfitShareDeal,
    })),
  };
}

export function computeBudgetVsActual(budget: BudgetLine[]) {
  return budget
    .map((b) => ({
      name: b.name,
      category: b.category,
      budgeted: b.budgetedAmount,
      actual: b.actualAmount,
      // Notion's own Variance formula is authoritative; fall back to a plain
      // subtraction only if that formula is somehow unset.
      variance:
        b.variance ??
        (b.budgetedAmount !== null && b.actualAmount !== null
          ? b.actualAmount - b.budgetedAmount
          : null),
    }))
    .sort((a, b) => (a.name < b.name ? -1 : 1));
}

const STAGE_ORDER = ["Prospect", "Qualified", "Proposal", "Negotiation", "Won", "Lost"];

export function computePipelineByStage(pipeline: PipelineItem[]) {
  const byStage = new Map<string, number>();
  for (const p of pipeline) {
    const key = p.stage ?? "Unstaged";
    byStage.set(key, (byStage.get(key) ?? 0) + 1);
  }
  return [...byStage.entries()]
    .map(([stage, count]) => ({ stage, count }))
    .sort((a, b) => {
      const ai = STAGE_ORDER.indexOf(a.stage);
      const bi = STAGE_ORDER.indexOf(b.stage);
      if (ai === -1 && bi === -1) return a.stage.localeCompare(b.stage);
      if (ai === -1) return 1;
      if (bi === -1) return -1;
      return ai - bi;
    });
}

export type DataQualityIssue = {
  id: string;
  label: string;
  count: number;
};

// See finance_dashboard_dev_plan.md section 7 — surface gaps rather than
// hide them. Every check below is derived from real fetched data, not a
// hardcoded example.
export function computeDataQuality(data: FinanceData): DataQualityIssue[] {
  const { transactions, shares, pipeline } = data;
  const issues: DataQualityIssue[] = [];

  const linkedIds = new Set(shares.flatMap((s) => s.linkedTransactionIds));
  const unlinkedCount = transactions.filter((t) => !linkedIds.has(t.id)).length;
  if (shares.length > 0 && unlinkedCount > 0) {
    issues.push({
      id: "shares-unlinked",
      label: "Transactions not linked to any Stock Shares record",
      count: unlinkedCount,
    });
  }

  const epidomUnflagged = transactions.filter(
    (t) =>
      !t.ownProfitShareDeal &&
      resolveProjectName(t.projectIds, pipeline).toLowerCase() === "epidom",
  ).length;
  if (epidomUnflagged > 0) {
    issues.push({
      id: "epidom-unflagged",
      label: 'Epidom transactions missing the "Own Profit Share Deal" flag',
      count: epidomUnflagged,
    });
  }

  const missingReceipts = transactions.filter((t) => !t.hasReceipt).length;
  if (missingReceipts > 0) {
    issues.push({
      id: "missing-receipts",
      label: "Transactions with no receipt attached",
      count: missingReceipts,
    });
  }

  return issues;
}

export function aggregateFinance(data: FinanceData) {
  return {
    kpis: computeKpis(data.transactions),
    incomeByProject: computeIncomeByProject(data.transactions, data.pipeline),
    incomeByCategory: computeIncomeByCategory(data.transactions),
    incomeByMonth: computeIncomeByMonth(data.transactions),
    receivables: computeReceivables(data.transactions),
    profitSplit: computeProfitSplit(data.transactions, data.pipeline),
    budgetVsActual: computeBudgetVsActual(data.budget),
    pipelineByStage: computePipelineByStage(data.pipeline),
    dataQuality: computeDataQuality(data),
  };
}
