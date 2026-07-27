import type { Metadata } from "next";

const DEFAULT_SEO_TITLE =
    "HVAC Installation Brooklyn, NY | AC Repair NYC | 212 HVAC®";
const DEFAULT_SEO_DESCRIPTION =
    "212 HVAC® premier Air conditioning services company providing best AC Installation , repair & maintenance Brooklyn, NYC & nearby.";

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

function buildRobots(seo?: PageSeoData): Metadata["robots"] | undefined {
    if (!seo) {
        return undefined;
    }

    return {
        index: seo.robots_noindex !== "1",
        follow: seo.robots_nofollow !== "1",
    };
}

function buildOpenGraph(seo?: PageSeoData): Metadata["openGraph"] | undefined {
    if (!seo) {
        return undefined;
    }

    const title = seo.og_title || seo.title;
    const description = seo.og_description || seo.description;

    if (!title && !description && !seo.og_image) {
        return undefined;
    }

    return {
        title,
        description,
        images: seo.og_image ? [{ url: seo.og_image }] : undefined,
    };
}

function buildTwitter(seo?: PageSeoData): Metadata["twitter"] | undefined {
    if (!seo) {
        return undefined;
    }

    const title = seo.twitter_title || seo.og_title || seo.title;
    const description =
        seo.twitter_description || seo.og_description || seo.description;
    const image = seo.twitter_image || seo.og_image;

    if (!title && !description && !image) {
        return undefined;
    }

    return {
        title,
        description,
        images: image ? [image] : undefined,
        card: "summary_large_image",
    };
}

function buildMetadata(page: WordPressPageSeoResponse, slug: string): Metadata {
    const seo = page.seo;
    const title =
        toNonEmptyString(seo?.title) || getDynamicTitle(slug, page.title);

    const pageExcerpt = toNonEmptyString(page.excerpt);
    const normalizedExcerpt = pageExcerpt ? stripHtml(pageExcerpt) : undefined;

    const description =
        toNonEmptyString(seo?.description) ||
        toNonEmptyString(normalizedExcerpt) ||
        DEFAULT_SEO_DESCRIPTION;
    const keywords = normalizeKeywords(seo?.focus_keyword);
    const canonical = seo?.canonical;
    const robots = buildRobots(seo);
    const openGraph = buildOpenGraph(seo);
    const twitter = buildTwitter(seo);

    const metadata: Metadata = {
        title,
        description,
    };

    if (keywords) {
        metadata.keywords = keywords;
    }

    if (canonical) {
        metadata.alternates = { canonical };
    }

    if (robots) {
        metadata.robots = robots;
    }

    if (openGraph) {
        metadata.openGraph = openGraph;
    }

    if (twitter) {
        metadata.twitter = twitter;
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
        };
    }
}

export async function generatePageMetadata(slug: string): Promise<Metadata> {
    return getPageSEO(slug);
}
