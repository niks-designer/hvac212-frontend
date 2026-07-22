"use client";

import Image from "next/image";

interface BrandLogoItem {
    add_logo?: unknown;
    [key: string]: unknown;
}

interface TrustedBrandsProps {
    brand_logos?: BrandLogoItem[] | null;
    className?: string;
}

interface NormalizedBrandLogo {
    url: string;
    alt?: string;
    title?: string;
    width: number;
    height: number;
}

function toPositiveNumber(value: unknown): number | null {
    if (typeof value === "number" && Number.isFinite(value) && value > 0) {
        return value;
    }

    if (typeof value === "string") {
        const parsed = Number(value);
        if (Number.isFinite(parsed) && parsed > 0) {
            return parsed;
        }
    }

    return null;
}

function asRecord(value: unknown): Record<string, unknown> | null {
    if (!value || typeof value !== "object" || Array.isArray(value)) {
        return null;
    }

    return value as Record<string, unknown>;
}

function normalizeBrandLogo(item: BrandLogoItem): NormalizedBrandLogo | null {
    const parent = asRecord(item);
    if (!parent) return null;

    const nestedLogo = asRecord(parent.add_logo);
    const logo = nestedLogo ?? parent;

    const url = typeof logo.url === "string" ? logo.url : "";
    if (!url) return null;

    const mediaDetails = asRecord(logo.media_details);

    const width =
        toPositiveNumber(logo.width) ??
        toPositiveNumber(mediaDetails?.width) ??
        160;
    const height =
        toPositiveNumber(logo.height) ??
        toPositiveNumber(mediaDetails?.height) ??
        48;

    const alt = typeof logo.alt === "string" ? logo.alt : "";
    const title = typeof logo.title === "string" ? logo.title : "";

    return {
        url,
        alt,
        title,
        width,
        height,
    };
}

export default function TrustedBrands({
    brand_logos,
    className,
}: TrustedBrandsProps) {
    if (!brand_logos || brand_logos.length === 0) return null;

    const logos = brand_logos
        .map((item) => normalizeBrandLogo(item))
        .filter((logo): logo is NormalizedBrandLogo => !!logo?.url);

    if (logos.length === 0) return null;

    // Duplicate the logos to create a seamless marquee
    const loopLogos = [...logos, ...logos];

    return (
        <section className={`${className || "pt-20 pb-5"}`}>
            <div className="mx-auto w-full">
                <div className="overflow-hidden">
                    <div
                        className="flex items-center space-x-10 will-change-transform"
                        style={{
                            animation: `marquee 28s linear infinite`,
                        }}
                    >
                        {loopLogos.map((logo, i) => (
                            <div
                                key={`${logo.url}-${i}`}
                                className="flex shrink-0 items-center justify-center"
                            >
                                <Image
                                    src={logo.url}
                                    alt={logo.alt || "brand logo"}
                                    width={logo.width}
                                    height={logo.height}
                                    className="brand-logo w-auto object-contain"
                                    unoptimized
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes marquee {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }

                /* Ensure the inner track is wide enough for a smooth loop */
                .will-change-transform {
                    min-width: 200%;
                }
            `}</style>
        </section>
    );
}
