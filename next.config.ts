import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    // Serve AVIF/WebP automatically to supporting browsers (smaller LCP assets).
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    // Next.js dev mode (Turbopack/webpack HMR, React's dev-mode callstack
    // reconstruction) needs eval() to run at all — confirmed live: without
    // 'unsafe-eval' the /finance/login page hard-errors on every click in
    // `next dev`. Production never needs it, so only relax this in dev.
    const scriptSrc =
      process.env.NODE_ENV === "production"
        ? "script-src 'self' 'unsafe-inline'"
        : "script-src 'self' 'unsafe-inline' 'unsafe-eval'";

    return [
      {
        // Internal-only, auth-gated route (see proxy.ts + AGENTS.md). Blocks
        // third-party script/style/frame origins entirely. Keeps
        // 'unsafe-inline' on script/style: Next.js's __NEXT_DATA__ hydration
        // payload and next/font's injected @font-face rules aren't verifiable
        // against a stricter nonce-based CSP without a live browser pass
        // against real data — tighten this once that's been tested.
        source: "/finance/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              scriptSrc,
              "style-src 'self' 'unsafe-inline'",
              "font-src 'self'",
              "img-src 'self' data:",
              "connect-src 'self'",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "no-referrer" },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
