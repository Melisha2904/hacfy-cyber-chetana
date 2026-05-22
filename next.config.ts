import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    // Allow production builds even if TypeScript reports type errors
    ignoreBuildErrors: true,
  },
  eslint: {
    // Disable ESLint check during build (Next will still lint locally)
    ignoreDuringBuilds: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.js\.map$/,
      use: 'ignore-loader',
    });

    return config;
  },
  outputFileTracingRoot: __dirname,
  turbopack: {
    rules: {
      "*.js.map": ["ignore-loader"],
    },
  },
};

export default nextConfig;
