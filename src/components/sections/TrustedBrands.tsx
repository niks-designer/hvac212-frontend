"use client";

import Image from "next/image";
import { normalizeACFImage } from "@/lib/acfNormalizers";
import { useTheme } from "@/components/providers/ThemeProvider";

interface ACFImageLike {
    id?: number;
    url: string;
    alt?: string;
    title?: string;
    width?: number;
    height?: number;
    mime_type?: string;
}

interface BrandLogoFields {
    select_dark_logo?: ACFImageLike | null;
    select_light_logo?: ACFImageLike | null;
}

interface BrandLogoItem {
    add_logo?: BrandLogoFields | null;
    [key: string]: unknown;
}

interface BrandsTitle {
    title?: string;
    short_description?: string;
}

interface TrustedBrandsProps {
    brands_title?: BrandsTitle | null;
    brand_logos?: BrandLogoItem[] | null;
    className?: string;
}

interface NormalizedBrandLogo {
    darkLogo: {
        url: string;
        alt: string;
        title: string;
        width: number;
        height: number;
        unoptimized: boolean;
    };
    lightLogo: {
        url: string;
        alt: string;
        title: string;
        width: number;
        height: number;
        unoptimized: boolean;
    };
}

interface DefaultBrandAsset {
    darkLogo: {
        url: string;
        alt: string;
        title: string;
    };
    lightLogo: {
        url: string;
        alt: string;
        title: string;
    };
}

const DEFAULT_BRAND_LOGOS: DefaultBrandAsset[] = [
    {
        darkLogo: {
            url: "/images/trusted-brands/trane-logo.png",
            alt: "Trane",
            title: "Trane",
        },
        lightLogo: {
            url: "/images/trusted-brands/trane-light-logo.png",
            alt: "Trane",
            title: "Trane",
        },
    },
    {
        darkLogo: {
            url: "/images/trusted-brands/mitsubishi-logo.png",
            alt: "Mitsubishi",
            title: "Mitsubishi",
        },
        lightLogo: {
            url: "/images/trusted-brands/mitsubishi-light-logo.png",
            alt: "Mitsubishi",
            title: "Mitsubishi",
        },
    },
    {
        darkLogo: {
            url: "/images/trusted-brands/fujitsu-logo.png",
            alt: "Fujitsu",
            title: "Fujitsu",
        },
        lightLogo: {
            url: "/images/trusted-brands/fujitsu-light-logo.png",
            alt: "Fujitsu",
            title: "Fujitsu",
        },
    },
    {
        darkLogo: {
            url: "/images/trusted-brands/york-logo.png",
            alt: "York",
            title: "York",
        },
        lightLogo: {
            url: "/images/trusted-brands/york-light-logo.png",
            alt: "York",
            title: "York",
        },
    },
    {
        darkLogo: {
            url: "/images/trusted-brands/carrier-logo.png",
            alt: "Carrier",
            title: "Carrier",
        },
        lightLogo: {
            url: "/images/trusted-brands/carrier-light-logo.png",
            alt: "Carrier",
            title: "Carrier",
        },
    },
    {
        darkLogo: {
            url: "/images/trusted-brands/goodman-logo.png",
            alt: "Goodman",
            title: "Goodman",
        },
        lightLogo: {
            url: "/images/trusted-brands/goodman-light-logo.png",
            alt: "Goodman",
            title: "Goodman",
        },
    },
    {
        darkLogo: {
            url: "/images/trusted-brands/bryant-logo.png",
            alt: "Bryant",
            title: "Bryant",
        },
        lightLogo: {
            url: "/images/trusted-brands/bryant-light-logo.png",
            alt: "Bryant",
            title: "Bryant",
        },
    },
    {
        darkLogo: {
            url: "/images/trusted-brands/lg-logo.png",
            alt: "LG",
            title: "LG",
        },
        lightLogo: {
            url: "/images/trusted-brands/lg-light-logo.png",
            alt: "LG",
            title: "LG",
        },
    },
    {
        darkLogo: {
            url: "/images/trusted-brands/lennox-logo.png",
            alt: "Lennox",
            title: "Lennox",
        },
        lightLogo: {
            url: "/images/trusted-brands/lennox-light-logo.png",
            alt: "Lennox",
            title: "Lennox",
        },
    },
    {
        darkLogo: {
            url: "/images/trusted-brands/daikin-logo.png",
            alt: "Daikin",
            title: "Daikin",
        },
        lightLogo: {
            url: "/images/trusted-brands/daikin-light-logo.png",
            alt: "Daikin",
            title: "Daikin",
        },
    },
    {
        darkLogo: {
            url: "/images/trusted-brands/american-standard-logo.png",
            alt: "American Standard",
            title: "American Standard",
        },
        lightLogo: {
            url: "/images/trusted-brands/american-standard-light-logo.png",
            alt: "American Standard",
            title: "American Standard",
        },
    },
    {
        darkLogo: {
            url: "/images/trusted-brands/rheem-logo.png",
            alt: "Rheem",
            title: "Rheem",
        },
        lightLogo: {
            url: "/images/trusted-brands/rheem-light-logo.png",
            alt: "Rheem",
            title: "Rheem",
        },
    },
    {
        darkLogo: {
            url: "/images/trusted-brands/luxaire-logo.png",
            alt: "Luxaire",
            title: "Luxaire",
        },
        lightLogo: {
            url: "/images/trusted-brands/luxaire-light-logo.png",
            alt: "Luxaire",
            title: "Luxaire",
        },
    },
    {
        darkLogo: {
            url: "/images/trusted-brands/samsung-logo.png",
            alt: "Samsung",
            title: "Samsung",
        },
        lightLogo: {
            url: "/images/trusted-brands/samsung-light-logo.png",
            alt: "Samsung",
            title: "Samsung",
        },
    },
];

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

function isSvgImage(image: ACFImageLike | null): boolean {
    if (!image?.url) {
        return false;
    }

    if (typeof image.mime_type === "string") {
        return image.mime_type === "image/svg+xml";
    }

    return image.url.toLowerCase().endsWith(".svg");
}

function normalizeBrandLogo(item: BrandLogoItem): NormalizedBrandLogo | null {
    const parent = asRecord(item);
    if (!parent) return null;

    const nestedLogo = asRecord(parent.add_logo);
    const logo = nestedLogo ?? parent;

    const darkRaw = asRecord(logo.select_dark_logo);
    const lightRaw = asRecord(logo.select_light_logo);
    const darkLogo = normalizeACFImage(darkRaw);
    const lightLogo = normalizeACFImage(lightRaw);

    if (!darkLogo?.url || !lightLogo?.url) {
        return null;
    }

    const darkMediaDetails = asRecord(darkRaw?.media_details);
    const lightMediaDetails = asRecord(lightRaw?.media_details);

    const darkWidth =
        toPositiveNumber(darkLogo.width) ??
        toPositiveNumber(darkMediaDetails?.width) ??
        160;
    const darkHeight =
        toPositiveNumber(darkLogo.height) ??
        toPositiveNumber(darkMediaDetails?.height) ??
        48;
    const lightWidth =
        toPositiveNumber(lightLogo.width) ??
        toPositiveNumber(lightMediaDetails?.width) ??
        160;
    const lightHeight =
        toPositiveNumber(lightLogo.height) ??
        toPositiveNumber(lightMediaDetails?.height) ??
        48;

    const darkImageWithMime = darkRaw as ACFImageLike | null;
    const lightImageWithMime = lightRaw as ACFImageLike | null;

    return {
        darkLogo: {
            url: darkLogo.url,
            alt: darkLogo.alt || darkLogo.title || "brand logo",
            title: darkLogo.title || "",
            width: darkWidth,
            height: darkHeight,
            unoptimized: isSvgImage(darkImageWithMime),
        },
        lightLogo: {
            url: lightLogo.url,
            alt:
                lightLogo.alt ||
                lightLogo.title ||
                darkLogo.alt ||
                darkLogo.title ||
                "brand logo",
            title: lightLogo.title || "",
            width: lightWidth,
            height: lightHeight,
            unoptimized: isSvgImage(lightImageWithMime),
        },
    };
}

export default function TrustedBrands({
    brands_title,
    brand_logos,
    className,
}: TrustedBrandsProps) {
    const { theme } = useTheme();
    const title = brands_title?.title?.trim() || "";
    const shortDescription = brands_title?.short_description || "";

    const logos =
        brand_logos && brand_logos.length > 0
            ? brand_logos
                  .map((item) => normalizeBrandLogo(item))
                  .filter(
                      (logo): logo is NormalizedBrandLogo =>
                          !!logo?.darkLogo?.url
                  )
            : DEFAULT_BRAND_LOGOS;

    if (logos.length === 0) return null;

    // Duplicate the logos to create a seamless marquee
    const loopLogos = [...logos, ...logos];

    return (
        <section className={`${className || "pt-20 pb-5"}`}>
            <div className="mx-auto w-full">
                {/* Section Header */}
                {(title || shortDescription) && (
                    <div className="sec-ttl mx-auto mb-8 space-y-5 text-center">
                        {title && <h2 className="h2-title">{title}</h2>}
                        {shortDescription && (
                            <div
                                className="prose fs-19"
                                dangerouslySetInnerHTML={{
                                    __html: shortDescription,
                                }}
                            />
                        )}
                    </div>
                )}

                <div className="overflow-hidden">
                    <div
                        className="flex items-center space-x-10 will-change-transform"
                        style={{
                            animation: `marquee 28s linear infinite`,
                        }}
                    >
                        {loopLogos.map((logo, i) => {
                            const activeLogo =
                                theme === "light"
                                    ? logo.lightLogo
                                    : logo.darkLogo;
                            const hasIntrinsicDimensions =
                                "width" in activeLogo && "height" in activeLogo;

                            return (
                                <div
                                    key={`${logo.darkLogo.url}-${logo.lightLogo.url}-${i}`}
                                    className="flex shrink-0 items-center justify-center"
                                >
                                    {hasIntrinsicDimensions ? (
                                        (() => {
                                            const wpLogo =
                                                activeLogo as NormalizedBrandLogo[
                                                    "darkLogo" | "lightLogo"];

                                            return (
                                                <Image
                                                    src={wpLogo.url}
                                                    alt={wpLogo.alt}
                                                    width={wpLogo.width}
                                                    height={wpLogo.height}
                                                    className="h-auto w-auto max-w-full object-contain"
                                                    title={
                                                        wpLogo.title ||
                                                        undefined
                                                    }
                                                    unoptimized={
                                                        wpLogo.unoptimized
                                                    }
                                                />
                                            );
                                        })()
                                    ) : (
                                        <img
                                            src={activeLogo.url}
                                            alt={activeLogo.alt}
                                            title={
                                                activeLogo.title || undefined
                                            }
                                            className="h-auto object-contain"
                                            loading="lazy"
                                            decoding="async"
                                        />
                                    )}
                                </div>
                            );
                        })}
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
