import React from "react";

const STAR_PATH =
  "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z";

function Row({ color, max, size }: { color: string; max: number; size: number }) {
  return (
    <div style={{ display: "flex", gap: 4 }}>
      {Array.from({ length: max }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" style={{ fill: color, flex: "none", display: "block" }}>
          <path d={STAR_PATH} />
        </svg>
      ))}
    </div>
  );
}

/** Star rating with fractional support (e.g. 4.5 → four-and-a-half stars).
 *  A gold row is overlaid on a muted row and clipped to `rating/max`. */
export function Stars({
  rating = 5,
  max = 5,
  size = 16,
  className = "",
}: {
  rating?: number;
  max?: number;
  size?: number;
  className?: string;
}) {
  const pct = Math.max(0, Math.min(1, rating / max)) * 100;
  return (
    <div
      className={`relative inline-block ${className}`}
      role="img"
      aria-label={`Rated ${rating} out of ${max}`}
    >
      <Row color="rgba(255,255,255,0.16)" max={max} size={size} />
      <div style={{ position: "absolute", top: 0, left: 0, height: "100%", width: `${pct}%`, overflow: "hidden" }} aria-hidden="true">
        <Row color="#f6c453" max={max} size={size} />
      </div>
    </div>
  );
}
