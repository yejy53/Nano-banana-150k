import type { NextConfig } from "next";

const repo = "nano-banana-100k";
const assetPrefix = `/${repo}/`;
const basePath = `/${repo}`;

const nextConfig: NextConfig = {
  /* config options here */
  basePath,
  assetPrefix,
  output: "export",
};

export default nextConfig;
