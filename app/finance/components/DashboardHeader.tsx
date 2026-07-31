"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CurrencyToggle } from "./CurrencyToggle";
import { PillLogo } from "./PillLogo";

const ROLE_LABEL: Record<string, string> = { ceo: "Founder & CEO", cro: "CRO" };

function MoreIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="5" cy="12" r="2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="19" cy="12" r="2" />
    </svg>
  );
}

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
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    function onClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [menuOpen]);

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
      setMenuOpen(false);
    }
  }

  async function handleSignOut() {
    setSigningOut(true);
    await fetch("/api/finance/auth/signout", { method: "POST" });
    window.location.href = "/finance/login";
  }

  return (
    <header className="py-5 sm:py-8 border-b border-line">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <PillLogo compact />
          <p className="font-pixel text-[7px] sm:text-[8px] tracking-[0.1em] text-muted uppercase mt-1.5 truncate">
            <span className="hidden sm:inline">{ROLE_LABEL[role] ?? role} · </span>
            {asOf}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <CurrencyToggle />

          {/* Desktop: full actions inline */}
          <div className="hidden sm:flex items-center gap-3">
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

          {/* Mobile: overflow menu */}
          <div className="relative sm:hidden" ref={menuRef}>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="More actions"
              className="w-8 h-8 flex items-center justify-center text-muted hover:text-white transition-colors"
            >
              <MoreIcon />
            </button>
            {menuOpen && (
              <div className="absolute top-full right-0 mt-2 z-20 min-w-[160px] bg-card border border-line rounded-xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
                <button
                  onClick={handleRefresh}
                  disabled={refreshing}
                  className="block w-full text-left px-4 py-3 font-sans text-[13px] text-soft hover:bg-accent/10 hover:text-white transition-colors border-b border-line/50 disabled:opacity-50"
                >
                  {refreshing ? "Refreshing…" : "Refresh data"}
                </button>
                <button
                  onClick={handleSignOut}
                  disabled={signingOut}
                  className="block w-full text-left px-4 py-3 font-sans text-[13px] text-muted hover:bg-accent/10 hover:text-white transition-colors disabled:opacity-50"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
