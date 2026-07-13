import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    // Serve AVIF/WebP automatically to supporting browsers (smaller LCP assets).
    formats: ["image/avif", "image/webp"],
  },
  // pdfkit locates its built-in font metrics (.afm files) via __dirname at
  // runtime; bundling it (webpack/Turbopack) rewrites that path and breaks
  // the lookup (ENOENT). Keeping it external makes Node resolve it natively.
  serverExternalPackages: ["pdfkit"],
  // Belt-and-suspenders for Vercel's serverless file tracer, in case it still
  // doesn't detect pdfkit's dynamic data-file reads once external. Also force
  // -includes the brand .ttf files the diagnostic PDF reads via a computed fs
  // path (lib/consult/pdf.ts) — not statically traceable like a `require`.
  outputFileTracingIncludes: {
    "/api/consult/diagnostic/route": [
      "./node_modules/pdfkit/js/data/**",
      "./lib/consult/fonts/**",
    ],
  },
};

export default withNextIntl(nextConfig);
