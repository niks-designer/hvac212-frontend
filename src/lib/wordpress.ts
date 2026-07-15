/**
 * WordPress REST API utility functions
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
  target?: string;
  parent?: number;
  order?: number;
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

export interface HeroBannerSection extends ACFFlexibleContent {
  hero_section_title?: HeroSectionTitleDescription | null;
  background_image?: number | Record<string, unknown> | null;
  primary_button?: LinkField | null;
  secondary_button?: LinkField | null;
  form_shortcode?: string;
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

interface WordPressMedia {
  id: number;
  guid?: {
    rendered?: string;
  };
  source_url?: string;
  alt_text?: string;
  alt?: string;
  media_details?: {
    image_meta?: {
      image_alt?: string;
    };
  };
  title?: {
    rendered?: string;
  };
}

interface ACFFlexibleContent {
  acf_fc_layout: string;
  [key: string]: unknown;
}

interface WordPressPageWithACF extends WordPressPost {
  acf?: {
    page_builder?: ACFFlexibleContent[];
    [key: string]: unknown;
  };
}

/**
 * Fetch posts from WordPress
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
 * Fetch a single post by slug
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
 * Fetch a single page by slug
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
 * Fetch a single page by slug with ACF data
 */
export async function getPageBySlugWithACF(
  slug: string
): Promise<WordPressPageWithACF | null> {
  try {
    const pages = await wpGet<WordPressPageWithACF[]>(
      `wp/v2/pages?slug=${slug}&_embed&acf=true`
    );

    return pages.length > 0 ? pages[0] : null;
  } catch (error) {
    console.error("Error fetching page:", error);
    return null;
  }
}

/**
 * Fetch featured image by media ID
 */
export async function getMediaById(id: number): Promise<WordPressMedia | null> {
  try {
    return await wpGet<WordPressMedia>(`wp/v2/media/${id}`);
  } catch (error) {
    console.error("Error fetching media:", error);
    return null;
  }
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
 * Fetch image URL from media ID
 */
function getMediaAltText(media: WordPressMedia): string {
  return (
    media.alt_text ||
    media.alt ||
    media.media_details?.image_meta?.image_alt ||
    media.title?.rendered ||
    ""
  );
}

/**
 * Process ACF flexible content and resolve image IDs to URLs
 */
export async function processACFFlexibleContent(
  sections: ACFFlexibleContent[]
): Promise<ACFFlexibleContent[]> {
  if (!sections || !Array.isArray(sections)) {
    return [];
  }

  return Promise.all(
    sections.map(async (section) => {
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

      // Process background_image field (Image ID)
      if (processed.background_image && typeof processed.background_image === "number") {
        const imageId = processed.background_image;
        const media = await getMediaById(imageId);
        // console.log("Full media object for background image ID", imageId, ":", media);

        if (media) {
          // Extract alt text from various WordPress fields
          const alt =
            (media as any).alt_text ||
            (media as any).alt ||
            (media as any).media_details?.image_meta?.image_alt ||
            "";

          processed.background_image = {
            ID: imageId,
            url: (media as any).source_url,
            alt: alt,
          };
          // console.log("Processed background image:", processed.background_image);
        }
      }

      // Process add_image field (Image ID) for center_image layout or similar
      if (processed.add_image && typeof processed.add_image === "number") {
        const imageId = processed.add_image;
        const media = await getMediaById(imageId);

        if (media) {
          const alt = getMediaAltText(media);

          processed.add_image = {
            ID: imageId,
            url: (media as any).source_url,
            alt: alt,
          };
        }
      }

      // Process icon fields in features array
      if (Array.isArray(processed.features)) {
        processed.features = await Promise.all(
          processed.features.map(async (feature: any) => {
            if (feature.icon && typeof feature.icon === "number") {
              const iconId = feature.icon;
              const media = await getMediaById(iconId);

              if (media) {
                return {
                  ...feature,
                  icon: {
                    ID: iconId,
                    url: media.source_url,
                    alt: getMediaAltText(media),
                  },
                };
              }
            }
            return feature;
          })
        );
      }

      // Process cards in services_grid
      if (Array.isArray(processed.cards)) {
        processed.cards = await Promise.all(
          processed.cards.map(async (card: any) => {
            if (card.image && typeof card.image === "number") {
              const imageId = card.image;
              const media = await getMediaById(imageId);

              if (media) {
                return {
                  ...card,
                  image: {
                    ID: imageId,
                    url: media.source_url,
                    alt: getMediaAltText(media),
                  },
                };
              }
            }
            return card;
          })
        );
      }

      return processed;
    })
  );
}