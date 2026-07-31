import { describe, it, expect } from 'vitest';
import {
  computeKpis,
  computeIncomeByProject,
  computeIncomeByCategory,
  computeIncomeByMonth,
  computeReceivables,
  computeProfitSplit,
  computeBudgetVsActual,
  computePipelineByStage,
  computeDataQuality,
} from '@/lib/finance/notion/aggregate';
import type { Transaction, BudgetLine, StockShare, PipelineItem } from '@/lib/finance/notion/types';

function makeTx(overrides: Partial<Transaction>): Transaction {
  return {
    id: 'tx-' + Math.random().toString(36).slice(2),
    name: 'Test transaction',
    date: '2026-06-15',
    type: 'Income',
    status: null,
    category: null,
    currency: 'EUR',
    amount: 1000,
    amountEur: 1000,
    darwinCutEur: null,
    evanCutEur: null,
    potentialInflow: null,
    percentPaid: null,
    daysOverdue: null,
    ownProfitShareDeal: false,
    hasReceipt: false,
    projectIds: [],
    stockShareIds: [],
    ...overrides,
  };
}

const epidom: PipelineItem = { id: 'proj-epidom', company: 'Epidom', stage: 'Won', geography: 'EU', source: null };
const acme: PipelineItem = { id: 'proj-acme', company: 'Acme', stage: 'Prospect', geography: 'EU', source: null };

// 1 EUR = 20,000 IDR, matching FxRates' shape (rates.ts is EUR-based).
const RATES = { EUR: 1, USD: 1.1, IDR: 20000 };

describe('computeKpis', () => {
  it('sums by type and never coerces null to 0 into the wrong bucket', () => {
    const kpis = computeKpis(
      [
        makeTx({ type: 'Income', amountEur: 1000 }),
        makeTx({ type: 'Income', amountEur: 500 }),
        makeTx({ type: 'Expense', amountEur: 300 }),
        makeTx({ type: 'Cashflow', amountEur: 200 }),
        makeTx({ type: 'Expense', amountEur: null }), // missing figure, not zero
        makeTx({ type: 'Income', amountEur: null, potentialInflow: 400, daysOverdue: 5 }),
      ],
      RATES,
    );
    expect(kpis.realizedIncome).toBe(1500); // the null-amountEur row contributes 0, not NaN
    expect(kpis.totalExpenses).toBe(300);
    expect(kpis.unrealizedCashflow).toBe(200);
    expect(kpis.netPosition).toBe(kpis.realizedIncome - kpis.totalExpenses);
    expect(kpis.outstandingReceivables).toBe(400);
    expect(kpis.overdueCount).toBe(1);
  });

  it('converts native-currency potentialInflow to EUR before summing, never mixes raw units', () => {
    // Regression test: "Potential Inflow" (Invoice Total − Amount Paid) is a
    // Notion formula that is NOT EUR-normalized, unlike amountEur — it's in
    // each transaction's own native currency. Real bug: IDR 4,000,000 was
    // once summed as if it were €4,000,000.
    const kpis = computeKpis(
      [
        makeTx({ currency: 'EUR', potentialInflow: 500 }),
        makeTx({ currency: 'IDR', potentialInflow: 4_000_000 }), // = €200 at 20,000 IDR/EUR
      ],
      RATES,
    );
    expect(kpis.outstandingReceivables).toBe(700); // 500 + (4_000_000 / 20_000), not 4_000_500
  });

  it('drops potentialInflow from the sum when its currency has no live rate', () => {
    const kpis = computeKpis(
      [makeTx({ currency: 'GBP', potentialInflow: 100 })], // unsupported currency, no rate
      RATES,
    );
    expect(kpis.outstandingReceivables).toBe(0); // null contributes 0, not a wrong guess
  });
});

describe('computeIncomeByProject / byCategory / byMonth', () => {
  const txs = [
    makeTx({ type: 'Income', amountEur: 1000, projectIds: [epidom.id], category: 'Retainer', date: '2026-05-10' }),
    makeTx({ type: 'Income', amountEur: 500, projectIds: [acme.id], category: 'Build', date: '2026-06-01' }),
    makeTx({ type: 'Expense', amountEur: 200, projectIds: [acme.id] }), // excluded — not Income
  ];

  it('groups income by resolved project name', () => {
    const byProject = computeIncomeByProject(txs, [epidom, acme]);
    expect(byProject).toEqual(
      expect.arrayContaining([
        { project: 'Epidom', amountEur: 1000 },
        { project: 'Acme', amountEur: 500 },
      ]),
    );
  });

  it('falls back to "Unassigned" for an unresolvable project id', () => {
    const byProject = computeIncomeByProject(
      [makeTx({ type: 'Income', amountEur: 100, projectIds: ['unknown-id'] })],
      [epidom],
    );
    expect(byProject).toEqual([{ project: 'Unassigned', amountEur: 100 }]);
  });

  it('groups income by category', () => {
    const byCategory = computeIncomeByCategory(txs);
    expect(byCategory).toEqual(
      expect.arrayContaining([
        { category: 'Retainer', amountEur: 1000 },
        { category: 'Build', amountEur: 500 },
      ]),
    );
  });

  it('groups income by month, sorted ascending', () => {
    const byMonth = computeIncomeByMonth(txs);
    expect(byMonth).toEqual([
      { month: '2026-05', amountEur: 1000 },
      { month: '2026-06', amountEur: 500 },
    ]);
  });
});

describe('computeReceivables', () => {
  it('sorts overdue by days overdue, descending', () => {
    const r = computeReceivables(
      [
        makeTx({ daysOverdue: 3, potentialInflow: 100 }),
        makeTx({ daysOverdue: 30, potentialInflow: 200 }),
        makeTx({ daysOverdue: null, potentialInflow: 50 }), // not overdue
      ],
      RATES,
    );
    expect(r.overdue.map((t) => t.daysOverdue)).toEqual([30, 3]);
    expect(r.totalPotentialInflow).toBe(350);
  });

  it('converts each overdue row potentialInflow to EUR and sums totalPotentialInflow correctly across currencies', () => {
    const r = computeReceivables(
      [
        makeTx({ id: 'eur-row', currency: 'EUR', potentialInflow: 500, daysOverdue: 1 }),
        makeTx({ id: 'idr-row', currency: 'IDR', potentialInflow: 4_000_000, daysOverdue: 2 }),
      ],
      RATES,
    );
    expect(r.totalPotentialInflow).toBe(700); // 500 + 200, not 4_000_500
    expect(r.overdue.find((t) => t.id === 'idr-row')?.potentialInflowEur).toBe(200);
  });

  it('avgPercentPaid ignores transactions with no percentPaid data', () => {
    const r = computeReceivables(
      [
        makeTx({ percentPaid: 50 }),
        makeTx({ percentPaid: 100 }),
        makeTx({ percentPaid: null }),
      ],
      RATES,
    );
    expect(r.avgPercentPaid).toBe(75);
  });

  it('avgPercentPaid is null when no transaction has the figure', () => {
    const r = computeReceivables([makeTx({ percentPaid: null })], RATES);
    expect(r.avgPercentPaid).toBeNull();
  });
});

describe('computeProfitSplit', () => {
  it('sums Darwin/Evan cuts and surfaces own-deal exceptions separately', () => {
    const split = computeProfitSplit(
      [
        makeTx({ darwinCutEur: 800, evanCutEur: 200, projectIds: [acme.id] }),
        makeTx({
          darwinCutEur: 1000,
          evanCutEur: 0,
          ownProfitShareDeal: true,
          projectIds: [epidom.id],
        }),
        makeTx({ darwinCutEur: null, evanCutEur: null }), // not a split-relevant row
      ],
      [epidom, acme],
    );
    expect(split.darwinTotal).toBe(1800);
    expect(split.evanTotal).toBe(200);
    expect(split.ownDeals).toHaveLength(1);
    expect(split.ownDeals[0].project).toBe('Epidom');
    expect(split.breakdown).toHaveLength(2);
  });
});

describe('computeBudgetVsActual', () => {
  it('falls back to actual-minus-budgeted when the Notion Variance formula is unset', () => {
    const lines: BudgetLine[] = [
      { id: '1', name: 'Hosting', category: 'Infra', period: '2026-06', budgetedAmount: 100, actualAmount: 120, variance: null },
      { id: '2', name: 'Ads', category: 'Marketing', period: '2026-06', budgetedAmount: 500, actualAmount: 400, variance: null },
      { id: '3', name: 'Unknown', category: null, period: null, budgetedAmount: null, actualAmount: 50, variance: null },
    ];
    const result = computeBudgetVsActual(lines);
    expect(result.find((l) => l.name === 'Hosting')?.variance).toBe(20);
    expect(result.find((l) => l.name === 'Ads')?.variance).toBe(-100);
    expect(result.find((l) => l.name === 'Unknown')?.variance).toBeNull();
  });

  it("prefers Notion's own Variance formula over the fallback", () => {
    const lines: BudgetLine[] = [
      { id: '1', name: 'Hosting', category: null, period: null, budgetedAmount: 100, actualAmount: 120, variance: 999 },
    ];
    expect(computeBudgetVsActual(lines)[0].variance).toBe(999);
  });
});

describe('computePipelineByStage', () => {
  it('orders by the canonical funnel stage, not insertion order', () => {
    const pipeline: PipelineItem[] = [
      { id: '1', company: 'A', stage: 'Won', geography: null, source: null },
      { id: '2', company: 'B', stage: 'Prospect', geography: null, source: null },
      { id: '3', company: 'C', stage: 'Prospect', geography: null, source: null },
      { id: '4', company: 'D', stage: 'Proposal', geography: null, source: null },
    ];
    const stages = computePipelineByStage(pipeline);
    expect(stages.map((s) => s.stage)).toEqual(['Prospect', 'Proposal', 'Won']);
    expect(stages.find((s) => s.stage === 'Prospect')?.count).toBe(2);
  });

  it('puts unrecognized stages after known ones', () => {
    const stages = computePipelineByStage([
      { id: '1', company: 'A', stage: 'SomethingNew', geography: null, source: null },
      { id: '2', company: 'B', stage: 'Won', geography: null, source: null },
    ]);
    expect(stages.map((s) => s.stage)).toEqual(['Won', 'SomethingNew']);
  });
});

describe('computeDataQuality', () => {
  it('flags transactions unlinked to any Stock Shares record', () => {
    const shares: StockShare[] = [
      {
        id: 's1',
        name: 'Darwin',
        percent: 80,
        role: null,
        covers: '',
        splitExceptions: '',
        linkedTransactionIds: ['tx-linked'],
      },
    ];
    const issues = computeDataQuality({
      transactions: [makeTx({ id: 'tx-linked' }), makeTx({ id: 'tx-unlinked' })],
      budget: [],
      shares,
      pipeline: [],
    });
    expect(issues.find((i) => i.id === 'shares-unlinked')?.count).toBe(1);
  });

  it('flags Epidom transactions missing the Own Profit Share Deal checkbox', () => {
    const issues = computeDataQuality({
      transactions: [
        makeTx({ projectIds: [epidom.id], ownProfitShareDeal: false }),
        makeTx({ projectIds: [epidom.id], ownProfitShareDeal: true }),
      ],
      budget: [],
      shares: [],
      pipeline: [epidom],
    });
    expect(issues.find((i) => i.id === 'epidom-unflagged')?.count).toBe(1);
  });

  it('flags transactions with no receipt', () => {
    const issues = computeDataQuality({
      transactions: [makeTx({ hasReceipt: false }), makeTx({ hasReceipt: true })],
      budget: [],
      shares: [],
      pipeline: [],
    });
    expect(issues.find((i) => i.id === 'missing-receipts')?.count).toBe(1);
  });

  it('returns no issues when everything is clean', () => {
    const issues = computeDataQuality({
      transactions: [makeTx({ hasReceipt: true })],
      budget: [],
      shares: [],
      pipeline: [],
    });
    expect(issues).toEqual([]);
  });
});
