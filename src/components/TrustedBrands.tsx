"use client";

import Image from "next/image";
import { normalizeACFImage } from "@/lib/acfNormalizers";
import type { ACFImage } from "@/lib/acfNormalizers";

interface BrandLogoItem {
    add_logo?: ACFImage | null;
}

interface TrustedBrandsProps {
    brand_logos?: BrandLogoItem[] | null;
}

export default function TrustedBrands({ brand_logos }: TrustedBrandsProps) {
    if (!brand_logos || brand_logos.length === 0) return null;

    const logos = brand_logos
        .map((b) => normalizeACFImage(b.add_logo))
        .filter((l): l is ACFImage => !!l?.url);

    if (logos.length === 0) return null;

    // Duplicate the logos to create a seamless marquee
    const loopLogos = [...logos, ...logos];

    return (
        <section className="py-8">
            <div className="mx-auto w-full">
                <div className="overflow-hidden">
                    <div
                        className="flex items-center space-x-8 will-change-transform"
                        style={{
                            animation: `marquee 28s linear infinite`,
                        }}
                    >
                        {loopLogos.map((logo, i) => (
                            <div
                                key={`${logo.url}-${i}`}
                                className="flex flex-shrink-0 items-center justify-center px-4"
                            >
                                <div className="flex w-28 items-center justify-center md:w-40">
                                    <Image
                                        src={logo.url}
                                        alt={logo.alt || "brand logo"}
                                        width={logo.width || 160}
                                        height={logo.height || 48}
                                        className="h-auto w-full object-contain"
                                        unoptimized
                                    />
                                </div>
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
