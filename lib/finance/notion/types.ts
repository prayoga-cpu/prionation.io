export type TransactionType = "Income" | "Cashflow" | "Expense" | string;

export type Transaction = {
  id: string;
  name: string;
  date: string | null;
  type: TransactionType | null;
  status: string | null;
  category: string | null;
  currency: string | null;
  amount: number | null;
  amountEur: number | null;
  darwinCutEur: number | null;
  evanCutEur: number | null;
  potentialInflow: number | null;
  percentPaid: number | null;
  daysOverdue: number | null;
  ownProfitShareDeal: boolean;
  hasReceipt: boolean;
  projectIds: string[];
};

export type BudgetLine = {
  id: string;
  name: string;
  category: string | null;
  period: string | null;
  budgetedAmount: number | null;
  actualAmount: number | null;
};

export type StockShare = {
  id: string;
  name: string;
  percent: number | null;
  linkedTransactionIds: string[];
};

export type PipelineStage =
  | "Prospect"
  | "Qualified"
  | "Proposal"
  | "Negotiation"
  | "Won"
  | "Lost"
  | string;

export type PipelineItem = {
  id: string;
  company: string;
  stage: PipelineStage | null;
  geography: string | null;
  source: string | null;
};
