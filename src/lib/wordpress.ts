/**
 * WordPress API utility functions.
 * Uses the custom headless API for page content and keeps the existing
 * REST-based helpers for posts and site data where appropriate.
 */

import type { Metadata } from "next";

const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

function getApiUrl(path: string): string {
    if (!API_URL) {
        throw new Error("NEXT_PUBLIC_WORDPRESS_API_URL is not defined");
    }

    const normalizedBase = API_URL.replace(/\/+$/, "");
    const normalizedPath = path.replace(/^\/+/, "");

    if (normalizedBase.endsWith("/wp-json")) {
        return `${normalizedBase}/${normalizedPath}`;
    }

    if (normalizedPath.startsWith("wp-json/")) {
        return `${normalizedBase}/${normalizedPath}`;
    }

    return `${normalizedBase}/wp-json/${normalizedPath}`;
}

async function wpGet<T>(path: string, init?: RequestInit): Promise<T> {
    const response = await fetch(getApiUrl(path), {
        cache: "no-store",
        // No caching for WordPress API responses so header/footer reflect latest ACF and menu changes immediately.
        // Change to `next: { revalidate: 60 }` in production when you need to enable ISR.
        ...init,
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch ${path}: ${response.statusText}`);
    }

    return response.json();
}

export interface WordPressMenuItem {
    id: number;
    title: string;
    url: string;
    target: string;
    slug?: string;
    has_mega_menu?: boolean; // <-- Add this
    parent: number;
    order: number;
    children?: WordPressMenuItem[];
}

export interface LinkField {
    title?: string;
    url?: string;
    target?: string;
}

export interface FooterSettings {
    phoneNumber?: string;
    email?: string;
    officeAddress?: string;
    siteLogo?: string;
    darkLogo?: string;
    footerLogo?: string;
    favicon?: string | false | null;
    headerCta?: LinkField;
    showThemeToggle?: string;
    copyright?: string;
    manhattanLink?: LinkField;
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
    youtube?: string;
}

export interface SiteMenus {
    primary?: WordPressMenuItem[];
    footerQuickLinks?: WordPressMenuItem[];
    footerServices?: WordPressMenuItem[];
}

export interface SiteData {
    settings?: FooterSettings;
    menus?: SiteMenus;
}

export interface HeroSectionTitleDescription {
    title?: string;
    short_description?: string;
}

export interface ACFImage {
    id?: number;
    url: string;
    alt?: string;
    title?: string;
    width?: number;
    height?: number;
}

export interface HeroBannerSection extends ACFFlexibleContent {
    hero_section_title?: HeroSectionTitleDescription | null;
    background_image?: ACFImage | null;
    select_bg_video_?: ACFImage | null;
    add_image?: ACFImage | null;
    primary_button?: LinkField | null;
    secondary_button?: LinkField | null;
    form_shortcode?: string;
}

export interface FAQ {
    question: string;
    answer: string;
}

export interface FAQSection extends ACFFlexibleContent {
    faq_section_title?: HeroSectionTitleDescription | null;
    faqs?: FAQ[];
}

export interface Testimonial {
    rating: string;
    review: string;
    author_name: string;
    author_designation: string;
    author_image: ACFImage;
}

export interface ReviewPlatform {
    logo: ACFImage;
    button?: LinkField | null;
}

export interface TestimonialsSection extends ACFFlexibleContent {
    testimonial_section_title?: HeroSectionTitleDescription | null;
    testimonials?: Testimonial[];
    review_platforms?: ReviewPlatform[];
}

export interface TrustedBrandLogoFields {
    select_dark_logo?: ACFImage | null;
    select_light_logo?: ACFImage | null;
}

export interface TrustedBrandLogoItem {
    add_logo?: TrustedBrandLogoFields | null;
}

export interface TrustedBrandsSection extends ACFFlexibleContent {
    brand_logos?: TrustedBrandLogoItem[] | null;
}

interface WordPressPost {
    id: number;
    title: {
        rendered: string;
    };
    excerpt: {
        rendered: string;
    };
    content: {
        rendered: string;
    };
    featured_media?: number;
    date: string;
    slug: string;
}

export interface ACFFlexibleContent {
    acf_fc_layout: string;
    [key: string]: unknown;
}

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

interface WordPressPageWithACF {
    id?: number;
    slug?: string;
    title?: string | { rendered?: string; raw?: string };
    content?: string | { rendered?: string };
    excerpt?: string | { rendered?: string };
    acf?: {
        page_builder?: ACFFlexibleContent[];
        [key: string]: unknown;
    };
    seo?: PageSeoData;
    [key: string]: unknown;
}

function getPageTitleValue(page: WordPressPageWithACF, seo?: PageSeoData) {
    if (seo?.title) {
        return seo.title;
    }

    if (typeof page.title === "string") {
        return page.title;
    }

    if (typeof page.title?.rendered === "string") {
        return page.title.rendered;
    }

    if (typeof page.title?.raw === "string") {
        return page.title.raw;
    }

    return undefined;
}

function getPageDescriptionValue(
    page: WordPressPageWithACF,
    seo?: PageSeoData
) {
    if (seo?.description) {
        return seo.description;
    }

    if (typeof page.excerpt === "string") {
        return page.excerpt;
    }

    if (typeof page.excerpt?.rendered === "string") {
        return page.excerpt.rendered.replace(/<[^>]+>/g, "").trim();
    }

    return "";
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

function buildRobots(seo?: PageSeoData): Metadata["robots"] | undefined {
    if (!seo) {
        return undefined;
    }

    const index = seo.robots_noindex === "1" ? false : true;
    const follow = seo.robots_nofollow === "1" ? false : true;

    return { index, follow };
}

function buildOpenGraph(seo?: PageSeoData): Metadata["openGraph"] | undefined {
    if (!seo) {
        return undefined;
    }

    const openGraphTitle = seo.og_title || seo.title;
    const openGraphDescription = seo.og_description || seo.description;

    if (!openGraphTitle && !openGraphDescription && !seo.og_image) {
        return undefined;
    }

    return {
        title: openGraphTitle,
        description: openGraphDescription,
        images: seo.og_image ? [{ url: seo.og_image }] : undefined,
    };
}

function buildTwitter(seo?: PageSeoData): Metadata["twitter"] | undefined {
    if (!seo) {
        return undefined;
    }

    const twitterTitle = seo.twitter_title || seo.og_title || seo.title;
    const twitterDescription =
        seo.twitter_description || seo.og_description || seo.description;
    const twitterImage = seo.twitter_image || seo.og_image;

    if (!twitterTitle && !twitterDescription && !twitterImage) {
        return undefined;
    }

    return {
        title: twitterTitle,
        description: twitterDescription,
        images: twitterImage ? [twitterImage] : undefined,
        card: "summary_large_image",
    };
}

function createPageMetadata(page: WordPressPageWithACF): Metadata {
    const seo = page.seo;
    const title = getPageTitleValue(page, seo);
    const description = getPageDescriptionValue(page, seo);
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
        const page = await wpGet<WordPressPageWithACF>(`hvac/v1/page/${slug}`);
        return createPageMetadata(page);
    } catch (error) {
        console.error("Error fetching SEO metadata:", error);
        return {};
    }
}

/**
 * Fetch posts from WordPress.
 */
export async function getPosts(
    perPage: number = 10,
    page: number = 1
): Promise<WordPressPost[]> {
    try {
        return await wpGet<WordPressPost[]>(
            `wp/v2/posts?per_page=${perPage}&page=${page}&_embed`
        );
    } catch (error) {
        console.error("Error fetching posts:", error);
        return [];
    }
}

/**
 * Fetch a single post by slug.
 */
export async function getPostBySlug(
    slug: string
): Promise<WordPressPost | null> {
    try {
        const posts = await wpGet<WordPressPost[]>(
            `wp/v2/posts?slug=${slug}&_embed`
        );
        return posts.length > 0 ? posts[0] : null;
    } catch (error) {
        console.error("Error fetching post:", error);
        return null;
    }
}

/**
 * Fetch a single page by slug from the custom headless API.
 */
export async function getPageBySlugWithACF(
    slug: string
): Promise<WordPressPageWithACF | null> {
    try {
        return await wpGet<WordPressPageWithACF>(`hvac/v1/page/${slug}`);
    } catch (error) {
        console.error("Error fetching page:", error);
        return null;
    }
}

/**
 * Fetch a page and return its processed ACF flexible content.
 */
export async function getPageContentBySlug(
    slug: string
): Promise<ACFFlexibleContent[]> {
    const page = await getPageBySlugWithACF(slug);
    const flexibleContent =
        (page?.acf?.page_builder as ACFFlexibleContent[] | undefined) || [];

    if (flexibleContent.length === 0) {
        return [];
    }

    return processACFFlexibleContent(flexibleContent);
}

/**
 * Fetch site-level settings and menus from the custom HVAC site endpoint.
 * Uses no-store cache for immediate WordPress update visibility in development.
 */
export async function getSiteData(): Promise<SiteData | null> {
    try {
        return await wpGet<SiteData>("hvac/v1/site");
    } catch (error) {
        console.error("Error fetching site data:", error);
        return null;
    }
}

/**
 * Normalize hero section title data for the new headless API response.
 * Image fields are expected to already be formatted objects from the API.
 */
export async function processACFFlexibleContent(
    sections: ACFFlexibleContent[]
): Promise<ACFFlexibleContent[]> {
    if (!sections || !Array.isArray(sections)) {
        return [];
    }

    return sections.map((section) => {
        const processed = { ...section } as ACFFlexibleContent &
            HeroBannerSection;

        if (processed.acf_fc_layout === "hero_banner") {
            const heroSectionTitle = processed.hero_section_title;

            if (
                heroSectionTitle &&
                typeof heroSectionTitle === "object" &&
                !Array.isArray(heroSectionTitle)
            ) {
                const title =
                    typeof (heroSectionTitle as HeroSectionTitleDescription)
                        .title === "string"
                        ? (heroSectionTitle as HeroSectionTitleDescription)
                              .title
                        : "";
                const shortDescription =
                    typeof (heroSectionTitle as HeroSectionTitleDescription)
                        .short_description === "string"
                        ? (heroSectionTitle as HeroSectionTitleDescription)
                              .short_description
                        : "";

                processed.hero_section_title = {
                    title,
                    short_description: shortDescription,
                };
            }
        }

        return processed;
    });
}
