import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: "/news",
        destination: "/archives",
        permanent: true,
      },
      {
        source: "/news/:slug*",
        destination: "/archives/:slug*",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
    ],
    unoptimized: true, // Required for static export
  },
  output: "export",
  trailingSlash: true,
};

export default nextConfig;
