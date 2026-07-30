"use client";

import { useState } from "react";

export function AcknowledgeButton({ alreadyAcknowledged }: { alreadyAcknowledged: boolean }) {
  const [status, setStatus] = useState<"idle" | "busy" | "done" | "error">(
    alreadyAcknowledged ? "done" : "idle",
  );

  async function handleClick() {
    setStatus("busy");
    try {
      const res = await fetch("/api/finance/acknowledge", { method: "POST" });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <p className="font-sans text-[13px] text-green-400">✓ You&apos;ve acknowledged these terms.</p>
    );
  }

  return (
    <div>
      <button
        onClick={handleClick}
        disabled={status === "busy"}
        className="bg-accent text-white font-sans font-semibold text-sm rounded-full px-6 py-3 transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {status === "busy" ? "Recording…" : "I've reviewed these terms"}
      </button>
      {status === "error" && (
        <p className="font-sans text-[12px] text-red-400 mt-2">
          Couldn&apos;t record this — acknowledgment tracking may not be configured yet.
        </p>
      )}
    </div>
  );
}
