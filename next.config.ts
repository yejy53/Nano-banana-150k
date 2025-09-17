import type { NextConfig } from "next";

const repo = "nano-banana-100k";
const assetPrefix = `/${repo}/`;
const basePath = `/${repo}`;

const nextConfig: NextConfig = {
  /* config options here */
  // basePath,
  // assetPrefix,
  assetPrefix: "https://longhz140516.github.io/nano-banana-100k/",
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
