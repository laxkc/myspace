import type { NextConfig } from "next";

const backendBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!backendBaseUrl) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined in .env.local");
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${backendBaseUrl}/:path*`,
      },
    ];
  },
};

export default nextConfig;
