"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCurrency } from "./CurrencyContext";
import { formatDate } from "@/lib/finance/format";

export type DetailRow = {
  id: string;
  name: string;
  amount: number | null;
  date?: string | null;
  note?: string;
};

export function DetailModal({
  title,
  subtitle,
  rows,
  onClose,
}: {
  title: string;
  subtitle?: string;
  rows: DetailRow[];
  onClose: () => void;
}) {
  const { format } = useCurrency();
  const total = rows.reduce((acc, r) => acc + (r.amount ?? 0), 0);

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6"
      >
        <motion.div
          key="panel"
          onClick={(e) => e.stopPropagation()}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="w-full sm:max-w-[440px] max-h-[82vh] bg-card border border-line rounded-t-[24px] sm:rounded-[20px] overflow-hidden flex flex-col"
        >
          <div className="flex items-start justify-between gap-3 p-5 border-b border-line shrink-0">
            <div className="min-w-0">
              <h3 className="font-sans font-bold text-white text-[15px]">{title}</h3>
              {subtitle && <p className="font-sans text-[12px] text-muted mt-0.5">{subtitle}</p>}
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="text-muted hover:text-white transition-colors shrink-0 p-1"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="overflow-y-auto p-5 flex-1">
            {rows.length === 0 ? (
              <p className="font-sans text-[13px] text-muted">No contributing transactions.</p>
            ) : (
              <div className="space-y-4">
                {rows.map((r) => (
                  <div key={r.id} className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-sans text-[13px] text-white leading-snug">{r.name || "—"}</p>
                      <p className="font-sans text-[11px] text-muted mt-0.5">
                        {r.date ? formatDate(r.date) : null}
                        {r.date && r.note ? " · " : null}
                        {r.note}
                      </p>
                    </div>
                    <p className="font-sans text-[13px] text-soft shrink-0 whitespace-nowrap">
                      {format(r.amount)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {rows.length > 0 && (
            <div className="flex items-center justify-between p-5 border-t border-line shrink-0">
              <p className="font-pixel text-[8px] tracking-[0.1em] text-muted uppercase">
                Total ({rows.length})
              </p>
              <p className="font-sans text-[15px] font-bold text-white">{format(total)}</p>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
