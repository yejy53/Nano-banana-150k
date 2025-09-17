import type { NextConfig } from "next";

const repo = "nano-banana-100k";
const assetPrefix = `/${repo}/`;
const basePath = `/${repo}`;

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  /* config options here */
  basePath: isProd ? basePath : undefined,
  assetPrefix: isProd ? assetPrefix : undefined,
  output: "export",
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_ASSET_PREFIX: isProd ? assetPrefix : "/",
  },
};

export default nextConfig;
