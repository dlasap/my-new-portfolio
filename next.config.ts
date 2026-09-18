import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: __dirname,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      { source: "/projects", destination: "/work", permanent: true },
      { source: "/articles", destination: "/", permanent: true },
      { source: "/article/:slug", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;