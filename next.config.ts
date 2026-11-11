import type { NextConfig } from "next";

const nextConfig: NextConfig = {
images: {
      qualities: [75, 100],
    remotePatterns: [
      {
        protocol: "https",
      hostname: "images.unsplash.com",
      },
    ],
  },
  
  
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
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
