import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    trailingSlash: true,

    async redirects() {
        return [
            {
                source: "/ductless-mini-split-2/",
                destination: "/ductless-mini-split-repair/",
                permanent: true,
            },
            {
                source: "/packaged-rooftop-unit/",
                destination: "/packaged-rooftop-unit-repair/",
                permanent: true,
            },
            {
                source: "/packaged-rooftop-installation/",
                destination: "/packaged-rooftop-unit-installation/",
                permanent: true,
            },
            {
                source: "/packaged-rooftop-maintenance/",
                destination: "/packaged-rooftop-unit-maintenance/",
                permanent: true,
            },
            {
                source: "/central-air-conditioner-repair-service/",
                destination: "/central-air-repair/",
                permanent: true,
            },
            {
                source: "/hvac-repairs/",
                destination: "/hvac-repair/",
                permanent: true,
            },
        ];
    },

    images: {
        unoptimized: process.env.NODE_ENV === "development",

        remotePatterns: [
            {
                protocol: "https",
                hostname: "nextjs212hvac.wpenginepowered.com",
            },
            {
                protocol: "https",
                hostname: "www.212hvac.com",
            },
        ],
    },
};

export default nextConfig;
