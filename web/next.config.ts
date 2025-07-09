import type { NextConfig } from "next";

const backendBaseUrl = process.env.NEXT_PUBLIC_API_URL?.replace('http://', 'https://') || "https://myspacebackend.us-east-1.elasticbeanstalk.com";

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
