import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--c-bg)",
        card: "var(--c-card)",
        "card-soft": "var(--c-card-soft)",
        line: "var(--c-line)",
        "line-soft": "var(--c-line-soft)",
        muted: "var(--c-muted)",
        soft: "var(--c-soft)",
        fg: "var(--c-fg)",
        accent: "var(--c-accent)",
        "accent-glow": "var(--c-accent-glow)",
        "accent-10": "var(--c-accent-10)",
        "accent-30": "var(--c-accent-30)",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        pixel: ["var(--font-pixel)"],
        display: ["var(--font-display)"],
      },
      spacing: {
        "page-x": "var(--page-x)",
      },
      transitionDuration: {
        fast: "var(--motion-fast)",
        normal: "var(--motion-normal)",
        slow: "var(--motion-slow)",
      },
      maxWidth: {
        "max-w": "var(--max-w)",
      },
    },
  },
  plugins: [],
};
export default config;
