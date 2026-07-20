/**
 * WordPress API utility functions.
 * Uses the custom headless API for page content and keeps the existing
 * REST-based helpers for posts and site data where appropriate.
 */

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
    has_mega_menu?: boolean;   // <-- Add this
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
  [key: string]: unknown;
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
export async function getPostBySlug(slug: string): Promise<WordPressPost | null> {
  try {
    const posts = await wpGet<WordPressPost[]>(`wp/v2/posts?slug=${slug}&_embed`);
    return posts.length > 0 ? posts[0] : null;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

/**
 * Fetch a single page by slug from the legacy REST API.
 */
export async function getPageBySlug(slug: string): Promise<WordPressPost | null> {
  try {
    const pages = await wpGet<WordPressPost[]>(`wp/v2/pages?slug=${slug}&_embed`);
    return pages.length > 0 ? pages[0] : null;
  } catch (error) {
    console.error("Error fetching page:", error);
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
export async function getPageContentBySlug(slug: string): Promise<ACFFlexibleContent[]> {
  const page = await getPageBySlugWithACF(slug);
  const flexibleContent = (page?.acf?.page_builder as ACFFlexibleContent[] | undefined) || [];

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
    const processed = { ...section } as ACFFlexibleContent & HeroBannerSection;

    if (processed.acf_fc_layout === "hero_banner") {
      const heroSectionTitle = processed.hero_section_title;

      if (
        heroSectionTitle &&
        typeof heroSectionTitle === "object" &&
        !Array.isArray(heroSectionTitle)
      ) {
        const title =
          typeof (heroSectionTitle as HeroSectionTitleDescription).title === "string"
            ? (heroSectionTitle as HeroSectionTitleDescription).title
            : "";
        const shortDescription =
          typeof (heroSectionTitle as HeroSectionTitleDescription).short_description === "string"
            ? (heroSectionTitle as HeroSectionTitleDescription).short_description
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
