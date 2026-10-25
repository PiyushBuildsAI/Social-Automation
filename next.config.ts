import type { NextConfig } from "next";

const isMobileExport = process.env.MOBILE_EXPORT === "1";

const nextConfig: NextConfig = {
  /* config options here */
  output: isMobileExport ? "export" : "standalone",
  ...(isMobileExport ? { images: { unoptimized: true } } : {}),
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: !isMobileExport,
  partialPrefetching: !isMobileExport,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
