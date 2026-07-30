import type { DataQualityIssue } from "@/lib/finance/notion/aggregate";

export function DataQualityPanel({ issues }: { issues: DataQualityIssue[] }) {
  if (issues.length === 0) {
    return (
      <div className="bg-card border border-line rounded-xl px-5 py-4 flex items-center gap-3">
        <span className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
        <p className="font-sans text-[13px] text-soft">No data-quality issues detected.</p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-line rounded-xl px-5 py-4">
      <div className="flex items-center gap-3 mb-3">
        <span className="w-2 h-2 rounded-full bg-red-400 flex-shrink-0" />
        <p className="font-pixel text-[9px] tracking-[0.1em] text-white uppercase">
          {issues.length} data-quality {issues.length === 1 ? "issue" : "issues"}
        </p>
      </div>
      <ul className="space-y-1.5">
        {issues.map((issue) => (
          <li key={issue.id} className="font-sans text-[13px] text-soft pl-5">
            {issue.label} — <span className="text-white">{issue.count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
