import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 16 only honours quality values listed here. Without this the
    // `quality={90}` on the headshot silently falls back to 75.
    qualities: [75, 90],
    // Illustrative project covers generated with Higgsfield. Move them into
    // /public/builds to drop this entry.
    remotePatterns: [{ protocol: "https", hostname: "d8j0ntlcm91z4.cloudfront.net" }],
  },
};

export default nextConfig;
