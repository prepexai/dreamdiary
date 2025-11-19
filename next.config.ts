import type { NextConfig } from "next";

const isMobile = process.env.BUILD_MODE === 'mobile';

const nextConfig: NextConfig = {
  output: isMobile ? 'export' : undefined,
  images: {
    unoptimized: isMobile,
  },
};

export default nextConfig;
