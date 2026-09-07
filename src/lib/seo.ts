import type { Metadata } from "next";

const SITE_URL = "https://www.212hvac.com";

const SITE_NAME = "212 HVAC";

const DEFAULT_OG_IMAGE = `${SITE_URL}/images/og-image.jpg`;

const DEFAULT_SEO_TITLE =
    "HVAC Installation Brooklyn, NY | AC Repair NYC | 212 HVAC®";

const DEFAULT_SEO_DESCRIPTION =
    "212 HVAC® premier Air conditioning services company providing best AC Installation, repair & maintenance Brooklyn, NYC & nearby.";

interface PageSeoData {
    title?: string;
    description?: string;
    canonical?: string;
    focus_keyword?: string;
    robots_noindex?: string | number | null;
    robots_nofollow?: string | number | null;
    og_title?: string;
    og_description?: string;
    og_image?: string | null;
    twitter_title?: string;
    twitter_description?: string;
    twitter_image?: string | null;
    [key: string]: unknown;
}

interface WordPressPageSeoResponse {
    seo?: PageSeoData;
    title?: string;
    excerpt?: string;
    [key: string]: unknown;
}

function getApiUrl(path: string): string {
    const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

    if (!apiUrl) {
        throw new Error("NEXT_PUBLIC_WORDPRESS_API_URL is not defined");
    }

    const normalizedBase = apiUrl.replace(/\/+$/, "");
    const normalizedPath = path.replace(/^\/+/, "");

    if (normalizedBase.endsWith("/wp-json")) {
        return `${normalizedBase}/${normalizedPath}`;
    }

    if (normalizedPath.startsWith("wp-json/")) {
        return `${normalizedBase}/${normalizedPath}`;
    }

    return `${normalizedBase}/wp-json/${normalizedPath}`;
}

async function wpGet<T>(path: string): Promise<T> {
    const response = await fetch(getApiUrl(path), {
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch ${path}: ${response.statusText}`);
    }

    return response.json();
}

function normalizeKeywords(value?: string) {
    if (!value) {
        return undefined;
    }

    const keywords = value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

    return keywords.length > 0 ? keywords : undefined;
}

function toNonEmptyString(value: unknown): string | undefined {
    if (typeof value !== "string") {
        return undefined;
    }

    const trimmed = value.trim();

    return trimmed.length > 0 ? trimmed : undefined;
}

function stripHtml(value: string): string {
    return value
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

function formatSlugAsTitle(slug: string): string {
    return slug
        .split("-")
        .filter(Boolean)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");
}

function withSiteSuffix(title: string): string {
    return `${title} - 212 HVAC`;
}

function getFallbackTitleBySlug(slug: string): string {
    const pageTitle = formatSlugAsTitle(slug);

    return pageTitle ? withSiteSuffix(pageTitle) : DEFAULT_SEO_TITLE;
}

function getDynamicTitle(slug: string, pageTitle?: string): string {
    const normalizedPageTitle = toNonEmptyString(pageTitle);

    if (normalizedPageTitle) {
        return withSiteSuffix(normalizedPageTitle);
    }

    return getFallbackTitleBySlug(slug);
}

function buildRobots(seo?: PageSeoData): Metadata["robots"] {
    if (!seo) {
        return undefined;
    }

    return {
        index: seo.robots_noindex !== "1",
        follow: seo.robots_nofollow !== "1",
    };
}

function buildOpenGraph(seo?: PageSeoData): Metadata["openGraph"] {
    const title =
        toNonEmptyString(seo?.og_title) ||
        toNonEmptyString(seo?.title) ||
        DEFAULT_SEO_TITLE;

    const description =
        toNonEmptyString(seo?.og_description) ||
        toNonEmptyString(seo?.description) ||
        DEFAULT_SEO_DESCRIPTION;

    const image = toNonEmptyString(seo?.og_image) || DEFAULT_OG_IMAGE;

    return {
        title,
        description,
        siteName: SITE_NAME,
        url: SITE_URL,
        type: "website",
        images: [
            {
                url: image,
                width: 1200,
                height: 630,
                alt: title,
            },
        ],
    };
}

function buildTwitter(seo?: PageSeoData): Metadata["twitter"] {
    const title =
        toNonEmptyString(seo?.twitter_title) ||
        toNonEmptyString(seo?.og_title) ||
        toNonEmptyString(seo?.title) ||
        DEFAULT_SEO_TITLE;

    const description =
        toNonEmptyString(seo?.twitter_description) ||
        toNonEmptyString(seo?.og_description) ||
        toNonEmptyString(seo?.description) ||
        DEFAULT_SEO_DESCRIPTION;

    const image =
        toNonEmptyString(seo?.twitter_image) ||
        toNonEmptyString(seo?.og_image) ||
        DEFAULT_OG_IMAGE;

    return {
        title,
        description,
        images: [image],
        card: "summary_large_image",
    };
}

function buildCanonicalUrl(slug: string): string {
    const normalizedSlug = slug.replace(/^\/+|\/+$/g, "");

    if (!normalizedSlug) {
        return `${SITE_URL}/`;
    }

    return `${SITE_URL}/${normalizedSlug}/`;
}

function buildMetadata(page: WordPressPageSeoResponse, slug: string): Metadata {
    const seo = page.seo;

    const title =
        toNonEmptyString(seo?.title) || getDynamicTitle(slug, page.title);

    const pageExcerpt = toNonEmptyString(page.excerpt);

    const normalizedExcerpt = pageExcerpt ? stripHtml(pageExcerpt) : undefined;

    const description =
        toNonEmptyString(seo?.description) ||
        normalizedExcerpt ||
        DEFAULT_SEO_DESCRIPTION;

    const keywords = normalizeKeywords(seo?.focus_keyword);

    /*
     * Use WordPress/Yoast canonical when provided.
     * Otherwise automatically use the current frontend URL.
     */
    const canonical =
        toNonEmptyString(seo?.canonical) || buildCanonicalUrl(slug);

    const robots = buildRobots(seo);

    /*
     * Always generate Open Graph metadata.
     * If WordPress does not provide an OG image,
     * DEFAULT_OG_IMAGE will be used.
     */
    const openGraph = buildOpenGraph(seo);

    /*
     * Always generate Twitter/X metadata.
     * If Twitter image and OG image are missing,
     * DEFAULT_OG_IMAGE will be used.
     */
    const twitter = buildTwitter(seo);

    const metadata: Metadata = {
        title,
        description,

        alternates: {
            canonical,
        },

        openGraph,

        twitter,
    };

    if (keywords) {
        metadata.keywords = keywords;
    }

    if (robots) {
        metadata.robots = robots;
    }

    return metadata;
}

export async function getPageSEO(slug: string): Promise<Metadata> {
    try {
        const page = await wpGet<WordPressPageSeoResponse>(
            `hvac/v1/page/${slug}`
        );

        return buildMetadata(page, slug);
    } catch (error) {
        console.error("Error fetching SEO metadata:", error);

        return {
            title: getFallbackTitleBySlug(slug),

            description: DEFAULT_SEO_DESCRIPTION,

            alternates: {
                canonical: buildCanonicalUrl(slug),
            },

            openGraph: {
                title: DEFAULT_SEO_TITLE,
                description: DEFAULT_SEO_DESCRIPTION,
                siteName: SITE_NAME,
                url: buildCanonicalUrl(slug),
                type: "website",
                images: [
                    {
                        url: DEFAULT_OG_IMAGE,
                        width: 1200,
                        height: 630,
                        alt: DEFAULT_SEO_TITLE,
                    },
                ],
            },

            twitter: {
                title: DEFAULT_SEO_TITLE,
                description: DEFAULT_SEO_DESCRIPTION,
                images: [DEFAULT_OG_IMAGE],
                card: "summary_large_image",
            },
        };
    }
}

export async function generatePageMetadata(slug: string): Promise<Metadata> {
    return getPageSEO(slug);
}
