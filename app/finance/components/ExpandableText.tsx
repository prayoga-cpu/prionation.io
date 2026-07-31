"use client";

import { useState } from "react";

// Truncates long values (transaction names, project names) on narrow
// screens with a tap-to-expand toggle, instead of letting them force
// horizontal scroll or wrap tables into unreadable columns.
export function ExpandableText({ text, maxChars = 20 }: { text: string; maxChars?: number }) {
  const [expanded, setExpanded] = useState(false);

  if (!text) return <span>—</span>;
  if (text.length <= maxChars) return <span>{text}</span>;

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        setExpanded((v) => !v);
      }}
      className="text-left underline decoration-dotted decoration-line-soft underline-offset-2 hover:decoration-white"
    >
      {expanded ? text : `${text.slice(0, maxChars)}…`}
    </button>
  );
}
