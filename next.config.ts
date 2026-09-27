import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow the sandboxed live-preview proxy host to hit the dev server.
  allowedDevOrigins: ["*.e2b.app", "*.app.github.dev", "localhost"],
};

export default nextConfig;
