// Brand tokens as literal hex — Recharts renders raw SVG, so CSS custom
// properties aren't reliably resolved inside it. Mirrors app/globals.css.
export const CHART = {
  accent: "#5865f2",
  positive: "#58f287",
  negative: "#ed4245",
  grid: "#1c1d22",
  axis: "#73767d",
  tooltipBg: "#0c0d12",
  tooltipBorder: "#1c1d22",
  text: "#babbbe",
} as const;
