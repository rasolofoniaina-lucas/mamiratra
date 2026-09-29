import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  output: process.env.NEXT_OUTPUT_STANDALONE === "true" ? "standalone" : undefined,
  poweredByHeader: false,
  allowedDevOrigins: ["127.0.0.1"],
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85],
  },
};

export default withNextIntl(nextConfig);
