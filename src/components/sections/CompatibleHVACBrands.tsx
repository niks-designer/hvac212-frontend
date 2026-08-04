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

interface CompatibleLogoFields {
    select_dark_logo?: ACFImageLike | null;
    select_light_logo?: ACFImageLike | null;
}

interface CompatibleLogoItem {
    add_logo?: CompatibleLogoFields | null;
    [key: string]: unknown;
}

interface CompatibleTitle {
    title?: string;
    short_description?: string;
}

interface CompatibleHVACBrandsProps {
    chs_title?: CompatibleTitle | null;
    chs_logos?: CompatibleLogoItem[] | null;
    className?: string;
}

interface NormalizedLogo {
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

const DEFAULT_COMPATIBLE_BRAND_LOGOS: NormalizedLogo[] = [
    {
        darkLogo: {
            url: "/images/trusted-brands/trane-logo.png",
            alt: "Trane",
            title: "Trane",
            width: 160,
            height: 48,
            unoptimized: false,
        },
        lightLogo: {
            url: "/images/trusted-brands/trane-light-logo.png",
            alt: "Trane",
            title: "Trane",
            width: 160,
            height: 48,
            unoptimized: false,
        },
    },
    {
        darkLogo: {
            url: "/images/trusted-brands/mitsubishi-logo.png",
            alt: "Mitsubishi",
            title: "Mitsubishi",
            width: 160,
            height: 48,
            unoptimized: false,
        },
        lightLogo: {
            url: "/images/trusted-brands/mitsubishi-light-logo.png",
            alt: "Mitsubishi",
            title: "Mitsubishi",
            width: 160,
            height: 48,
            unoptimized: false,
        },
    },
    {
        darkLogo: {
            url: "/images/trusted-brands/fujitsu-logo.png",
            alt: "Fujitsu",
            title: "Fujitsu",
            width: 160,
            height: 48,
            unoptimized: false,
        },
        lightLogo: {
            url: "/images/trusted-brands/fujitsu-light-logo.png",
            alt: "Fujitsu",
            title: "Fujitsu",
            width: 160,
            height: 48,
            unoptimized: false,
        },
    },
    {
        darkLogo: {
            url: "/images/trusted-brands/york-logo.png",
            alt: "York",
            title: "York",
            width: 160,
            height: 48,
            unoptimized: false,
        },
        lightLogo: {
            url: "/images/trusted-brands/york-light-logo.png",
            alt: "York",
            title: "York",
            width: 160,
            height: 48,
            unoptimized: false,
        },
    },
    {
        darkLogo: {
            url: "/images/trusted-brands/carrier-logo.png",
            alt: "Carrier",
            title: "Carrier",
            width: 160,
            height: 48,
            unoptimized: false,
        },
        lightLogo: {
            url: "/images/trusted-brands/carrier-light-logo.png",
            alt: "Carrier",
            title: "Carrier",
            width: 160,
            height: 48,
            unoptimized: false,
        },
    },
    {
        darkLogo: {
            url: "/images/trusted-brands/goodman-logo.png",
            alt: "Goodman",
            title: "Goodman",
            width: 160,
            height: 48,
            unoptimized: false,
        },
        lightLogo: {
            url: "/images/trusted-brands/goodman-light-logo.png",
            alt: "Goodman",
            title: "Goodman",
            width: 160,
            height: 48,
            unoptimized: false,
        },
    },
    {
        darkLogo: {
            url: "/images/trusted-brands/bryant-logo.png",
            alt: "Bryant",
            title: "Bryant",
            width: 160,
            height: 48,
            unoptimized: false,
        },
        lightLogo: {
            url: "/images/trusted-brands/bryant-light-logo.png",
            alt: "Bryant",
            title: "Bryant",
            width: 160,
            height: 48,
            unoptimized: false,
        },
    },
    {
        darkLogo: {
            url: "/images/trusted-brands/lg-logo.png",
            alt: "LG",
            title: "LG",
            width: 160,
            height: 48,
            unoptimized: false,
        },
        lightLogo: {
            url: "/images/trusted-brands/lg-light-logo.png",
            alt: "LG",
            title: "LG",
            width: 160,
            height: 48,
            unoptimized: false,
        },
    },
    {
        darkLogo: {
            url: "/images/trusted-brands/lennox-logo.png",
            alt: "Lennox",
            title: "Lennox",
            width: 160,
            height: 48,
            unoptimized: false,
        },
        lightLogo: {
            url: "/images/trusted-brands/lennox-light-logo.png",
            alt: "Lennox",
            title: "Lennox",
            width: 160,
            height: 48,
            unoptimized: false,
        },
    },
    {
        darkLogo: {
            url: "/images/trusted-brands/daikin-logo.png",
            alt: "Daikin",
            title: "Daikin",
            width: 160,
            height: 48,
            unoptimized: false,
        },
        lightLogo: {
            url: "/images/trusted-brands/daikin-light-logo.png",
            alt: "Daikin",
            title: "Daikin",
            width: 160,
            height: 48,
            unoptimized: false,
        },
    },
    {
        darkLogo: {
            url: "/images/trusted-brands/american-standard-logo.png",
            alt: "American Standard",
            title: "American Standard",
            width: 160,
            height: 48,
            unoptimized: false,
        },
        lightLogo: {
            url: "/images/trusted-brands/american-standard-light-logo.png",
            alt: "American Standard",
            title: "American Standard",
            width: 160,
            height: 48,
            unoptimized: false,
        },
    },
    {
        darkLogo: {
            url: "/images/trusted-brands/rheem-logo.png",
            alt: "Rheem",
            title: "Rheem",
            width: 160,
            height: 48,
            unoptimized: false,
        },
        lightLogo: {
            url: "/images/trusted-brands/rheem-light-logo.png",
            alt: "Rheem",
            title: "Rheem",
            width: 160,
            height: 48,
            unoptimized: false,
        },
    },
    {
        darkLogo: {
            url: "/images/trusted-brands/luxaire-logo.png",
            alt: "Luxaire",
            title: "Luxaire",
            width: 160,
            height: 48,
            unoptimized: false,
        },
        lightLogo: {
            url: "/images/trusted-brands/luxaire-light-logo.png",
            alt: "Luxaire",
            title: "Luxaire",
            width: 160,
            height: 48,
            unoptimized: false,
        },
    },
    {
        darkLogo: {
            url: "/images/trusted-brands/samsung-logo.png",
            alt: "Samsung",
            title: "Samsung",
            width: 160,
            height: 48,
            unoptimized: false,
        },
        lightLogo: {
            url: "/images/trusted-brands/samsung-light-logo.png",
            alt: "Samsung",
            title: "Samsung",
            width: 160,
            height: 48,
            unoptimized: false,
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

function normalizeCompatibleLogo(
    item: CompatibleLogoItem
): NormalizedLogo | null {
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
        200;
    const darkHeight =
        toPositiveNumber(darkLogo.height) ??
        toPositiveNumber(darkMediaDetails?.height) ??
        72;
    const lightWidth =
        toPositiveNumber(lightLogo.width) ??
        toPositiveNumber(lightMediaDetails?.width) ??
        200;
    const lightHeight =
        toPositiveNumber(lightLogo.height) ??
        toPositiveNumber(lightMediaDetails?.height) ??
        72;

    const darkImageWithMime = darkRaw as ACFImageLike | null;
    const lightImageWithMime = lightRaw as ACFImageLike | null;

    return {
        darkLogo: {
            url: darkLogo.url,
            alt: darkLogo.alt || darkLogo.title || "Compatible brand logo",
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
                "Compatible brand logo",
            title: lightLogo.title || "",
            width: lightWidth,
            height: lightHeight,
            unoptimized: isSvgImage(lightImageWithMime),
        },
    };
}

export default function CompatibleHVACBrands({
    chs_title,
    chs_logos,
    className,
}: CompatibleHVACBrandsProps) {
    const { theme } = useTheme();

    const title = chs_title?.title?.trim() || "";
    const shortDescription = chs_title?.short_description || "";

    const logos =
        chs_logos && chs_logos.length > 0
            ? chs_logos
                  .map((item) => normalizeCompatibleLogo(item))
                  .filter((logo): logo is NormalizedLogo => !!logo)
            : DEFAULT_COMPATIBLE_BRAND_LOGOS;

    if (!title && logos.length === 0) {
        return null;
    }

    return (
        <section className={`${className || "pt-12 pb-5 lg:pt-20"}`}>
            <div className="container">
                {(title || shortDescription) && (
                    <div className="sec-ttl mb-8 space-y-5 text-center lg:mb-15">
                        {title && (
                            <h2 className="h2-title">{title}</h2>
                        )}
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

                {logos.length > 0 && (
                    <div className="grid grid-cols-2 items-center gap-8 sm:grid-cols-3 md:grid-cols-4 md:gap-8 xl:gap-12 lg:grid-cols-5">
                        {logos.map((logo, index) => {
                            const activeLogo =
                                theme === "light"
                                    ? logo.lightLogo
                                    : logo.darkLogo;

                            return (
                                <div
                                    key={`${activeLogo.url}-${index}`}
                                    className="flex min-h-14 items-center justify-center"
                                >
                                    <Image
                                        src={activeLogo.url}
                                        alt={activeLogo.alt}
                                        width={activeLogo.width}
                                        height={activeLogo.height}
                                        className="w-auto object-contain"
                                        title={activeLogo.title || undefined}
                                        unoptimized={activeLogo.unoptimized}
                                    />
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
}
