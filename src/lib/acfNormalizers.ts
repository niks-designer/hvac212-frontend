/**
 * Utility functions to normalize ACF data
 */

export interface ACFImage {
  id: number;
  url: string;
  alt?: string;
  title?: string;
  width?: number;
  height?: number;
}

export interface ACFLink {
  title?: string;
  url?: string;
  target?: string;
}

export interface ACFButton {
  text: string;
  url: string;
  newTab?: boolean;
}

/**
 * Normalize Image
 * Expected API Response:
 * {
 *   id,
 *   url,
 *   alt,
 *   title,
 *   width,
 *   height
 * }
 */
export function normalizeACFImage(image: unknown): ACFImage | null {
  if (
    !image ||
    typeof image !== "object" ||
    !("url" in image)
  ) {
    return null;
  }

  const img = image as ACFImage;

  return {
    id: img.id,
    url: img.url,
    alt: img.alt ?? "",
    title: img.title ?? "",
    width: img.width,
    height: img.height,
  };
}

/**
 * Normalize ACF Link
 */
export function normalizeACFLink(
  link: ACFLink | null | undefined
): ACFButton | null {
  if (!link?.url) {
    return null;
  }

  return {
    text: link.title || "Click Here",
    url: link.url,
    newTab: link.target === "_blank",
  };
}

/**
 * Normalize ACF Color
 */
export function normalizeACFColor(
  color?: string
): string {
  if (!color) {
    return "bg-blue-600";
  }

  const colorMap: Record<string, string> = {
    "#0066cc": "bg-blue-600",
    "#00cc00": "bg-green-600",
    "#cc0000": "bg-red-600",
    "#ff6600": "bg-orange-600",
    blue: "bg-blue-600",
    green: "bg-green-600",
    red: "bg-red-600",
    orange: "bg-orange-600",
  };

  return colorMap[color.toLowerCase()] ?? color;
}