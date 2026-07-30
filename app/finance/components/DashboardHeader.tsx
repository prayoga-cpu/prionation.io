"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CurrencyToggle } from "./CurrencyToggle";

const ROLE_LABEL: Record<string, string> = { ceo: "Founder & CEO", cro: "CRO" };

export function DashboardHeader({
  role,
  fetchedAt,
}: {
  role: string;
  fetchedAt: string;
}) {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  const asOf = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "short",
  }).format(new Date(fetchedAt));

  async function handleRefresh() {
    setRefreshing(true);
    try {
      await fetch("/api/finance/refresh", { method: "POST" });
      router.refresh();
    } finally {
      setRefreshing(false);
    }
  }

  async function handleSignOut() {
    setSigningOut(true);
    await fetch("/api/finance/auth/signout", { method: "POST" });
    window.location.href = "/finance/login";
  }

  return (
    <header className="flex flex-wrap items-center justify-between gap-4 py-8 border-b border-line">
      <div>
        <h1 className="font-sans text-xl font-bold text-white">
          PRIONATION<span className="text-accent">.</span>io
          <span className="text-muted font-normal"> · Finance</span>
        </h1>
        <p className="font-pixel text-[8px] tracking-[0.1em] text-muted uppercase mt-1">
          {ROLE_LABEL[role] ?? role} · Data as of {asOf}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <CurrencyToggle />
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="font-sans text-[12px] text-soft border border-line rounded-full px-4 py-2 hover:border-accent-30 hover:text-white transition-colors disabled:opacity-50"
        >
          {refreshing ? "Refreshing…" : "Refresh data"}
        </button>
        <button
          onClick={handleSignOut}
          disabled={signingOut}
          className="font-sans text-[12px] text-muted hover:text-white transition-colors disabled:opacity-50"
        >
          Sign out
        </button>
      </div>
    </header>
  );
}
