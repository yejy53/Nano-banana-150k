import type { NextConfig } from "next";

const repo = "nano-banana-100k";
const assetPrefix = `/${repo}/`;
const basePath = `/${repo}`;

const nextConfig: NextConfig = {
  basePath,
  assetPrefix,
  output: "export",
  images: {
    unoptimized: true, // 静态导出必须加这一行
  },
};

export default nextConfig;
