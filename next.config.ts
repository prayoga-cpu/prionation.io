import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    // Serve AVIF/WebP automatically to supporting browsers (smaller LCP assets).
    formats: ["image/avif", "image/webp"],
  },
};

export default withNextIntl(nextConfig);
