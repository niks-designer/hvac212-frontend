import type { ACFImage } from "@/lib/wordpress";

const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

function getApiUrl(path: string): string {
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_WORDPRESS_API_URL is not defined");
  }

  const normalizedBase = API_URL.replace(/\/+$|^\s+|\s+$/g, "");
  const normalizedPath = path.replace(/^\/+/, "");

  if (normalizedBase.endsWith("/wp-json")) {
    return `${normalizedBase}/${normalizedPath}`;
  }

  return `${normalizedBase}/wp-json/${normalizedPath}`;
}

export interface MegaMenuLink {
  title: string;
  url: string;
  target?: string;
}

export interface MegaMenuItem {
  image: ACFImage | null;
  title: string;
  description: string;
  link: MegaMenuLink;
}

export interface MegaMenuBottomLink {
  link: MegaMenuLink;
}

export interface MegaMenuData {
  id: number;
  title: string;
  slug: string;

  menu_items: MegaMenuItem[];

  bottom_cta_title?: string;

  bottom_links?: MegaMenuBottomLink[];

  background_color?: string;

  card_radius?: number | string;
}

export async function getMegaMenu(
  slug: string
): Promise<MegaMenuData | null> {
  if (!slug) return null;

  try {
    const response = await fetch(
      getApiUrl(`hvac/v1/mega-menu/${slug}`),
      {
        next: {
          revalidate: 60,
        },
      }
    );

    if (!response.ok) return null;

    return await response.json();
  } catch (e) {
    console.error(e);
    return null;
  }
}