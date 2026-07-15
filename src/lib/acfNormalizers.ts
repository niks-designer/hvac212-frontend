/**
 * Utility functions to normalize ACF data
 */

interface ACFImage {
    ID?: number;
    id?: number;
    url: string;
    alt?: string;
    title?: string;
    width?: number;
    height?: number;
}

interface ACFLink {
    title?: string;
    url?: string;
    target?: string;
}

interface ACFButton {
    text: string;
    url: string;
    newTab?: boolean;
}

/**
 * Convert ACF Image Array format to standard image object
 */
export function normalizeACFImage(image: any): ACFImage | null {
    if (!image) return null;

    // Log the data to help debug
    //console.log("ACF Image Data:", image);

    // If it's a number (Image ID)
    if (typeof image === "number") {
        // console.log("Image is an ID:", image, "- Need to fetch from API");
        return {
            ID: image,
            url: `_fetch_${image}`, // Marker to fetch later
            alt: "",
        };
    }

    // If it's a string URL directly
    if (typeof image === "string") {
        // Check if it's a URL or an ID
        if (image.match(/^\d+$/)) {
            // It's an ID as string
            return {
                ID: parseInt(image),
                url: `_fetch_${image}`,
                alt: "",
            };
        }
        // It's a URL
        return {
            url: image,
            alt: "",
        };
    }

    // If it's already in the right format with url property
    if (image.url && typeof image.url === "string") {
        const alt =
            image.alt ||
            image.alt_text ||
            image.alternative_text ||
            image.media_details?.image_meta?.image_alt ||
            "";

        //console.log("Normalized image object - alt text found:", alt);

        return {
            ID: image.ID || image.id,
            url: image.url,
            alt: alt,
            title: image.title,
        };
    }

    // If ACF returns array with first item being the image
    if (Array.isArray(image) && image.length > 0) {
        const firstImage = image[0];
        if (typeof firstImage === "number") {
            return normalizeACFImage(firstImage);
        }
        if (firstImage.url) {
            const alt =
                firstImage.alt ||
                firstImage.alt_text ||
                firstImage.alternative_text ||
                firstImage.media_details?.image_meta?.image_alt ||
                "";

            return {
                ID: firstImage.ID || firstImage.id,
                url: firstImage.url,
                alt: alt,
                title: firstImage.title,
            };
        }
    }

    // If nested inside another object
    if (typeof image === "object" && image.image?.url) {
        return normalizeACFImage(image.image);
    }

    //console.warn("Could not normalize image:", image);
    return null;
}

/**
 * Convert ACF Link field to button object
 */
export function normalizeACFLink(
    link: ACFLink | string | null
): ACFButton | null {
    if (!link) return null;

    if (typeof link === "string") {
        return {
            text: "Click Here",
            url: link,
            newTab: false,
        };
    }

    return {
        text: link.title || "Click Here",
        url: link.url || "#",
        newTab: link.target === "_blank",
    };
}

/**
 * Convert ACF color value to Tailwind class
 */
export function normalizeACFColor(color: string | undefined): string {
    if (!color) return "bg-blue-600";

    // Map common color formats to Tailwind classes
    const colorMap: { [key: string]: string } = {
        "#0066cc": "bg-blue-600",
        "#00cc00": "bg-green-600",
        "#cc0000": "bg-red-600",
        "#ff6600": "bg-orange-600",
        blue: "bg-blue-600",
        green: "bg-green-600",
        red: "bg-red-600",
        orange: "bg-orange-600",
    };

    return colorMap[color.toLowerCase()] || color;
}
