import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/recommandations/:path*",
        destination: "/recommendations/:path*",
        permanent: true,
      },
      {
        source: "/:lang/recommandations/:path*",
        destination: "/:lang/recommendations/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
