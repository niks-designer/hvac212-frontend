import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    trailingSlash: true,

    images: {
        unoptimized: process.env.NODE_ENV === "development",

        remotePatterns: [
            {
                protocol: "https",
                hostname: "nextjs212hvac.wpenginepowered.com",
            },
        ],
    },
};

export default nextConfig;
