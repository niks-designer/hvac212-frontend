import { getAllPages, getAllPosts } from "@/lib/wordpress";

const SITE_URL = "https://www.212hvac.com";

const STATIC_PATHS = [
    "/",
    "/about-us/",
    "/blog/",
    "/careers/",
    "/con-edison-energy-rebates/",
    "/contact-us/",
    "/licensed-insured/",
    "/our-story/",
    "/payment-options/",
    "/privacy-policy/",
    "/the-212-warranty/",
    "/air-conditioning-installation/",
    "/air-conditioning-maintenance/",
    "/air-conditioning-repair/",
    "/air-duct-cleaning/",
    "/dryer-vent-cleaning/",
    "/ductwork-ventilation/",
    "/indoor-air-quality/",
    "/thermostat/",
    "/central-air-installation/",
    "/central-air-maintenance/",
    "/central-air-repair/",
    "/air-conditioner-error-code-search/",
    "/american-standard/",
    "/bryant/",
    "/carrier/",
    "/daikin/",
    "/goodman/",
    "/luxire/",
    "/mitsubishi/",
    "/rheem/",
    "/trane/",
    "/york/",
    "/ductless-mini-split-installation/",
    "/ductless-mini-split-maintenance/",
    "/ductless-mini-split-repair/",
    "/furnace-installation/",
    "/furnace-maintenance/",
    "/furnace-repair/",
    "/heat-pump-installation/",
    "/heat-pump-maintenance/",
    "/heat-pump-repair/",
    "/heating-installation/",
    "/heating-maintenance/",
    "/heating-repair/",
    "/hvac-installation/",
    "/hvac-maintenance/",
    "/hvac-repair/",
    "/packaged-rooftop-unit-installation/",
    "/packaged-rooftop-unit-maintenance/",
    "/packaged-rooftop-unit-repair/",
    "/vrf-vrv-installation/",
    "/vrf-vrv-maintenance/",
    "/vrf-vrv-repair/",
];

interface SitemapEntry {
    path: string;
    lastModified?: string;
}

function normalizePath(path: string): string | null {
    if (!path || path.includes("?") || path.includes("#")) {
        return null;
    }

    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    return normalizedPath === "/"
        ? normalizedPath
        : `/${normalizedPath.replace(/^\/+|\/+$/g, "")}/`;
}

function escapeXml(value: string): string {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

function createSitemapXml(entries: SitemapEntry[]): string {
    const urls = entries
        .map(({ path, lastModified }) => {
            const lastModifiedTag = lastModified
                ? `<lastmod>${escapeXml(lastModified)}</lastmod>`
                : "";

            return `<url><loc>${escapeXml(`${SITE_URL}${path}`)}</loc>${lastModifiedTag}</url>`;
        })
        .join("");

    return (
        `<?xml version="1.0" encoding="UTF-8"?>` +
        `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`
    );
}

export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
    const [posts, pages] = await Promise.all([getAllPosts(), getAllPages()]);
    const entries = new Map<string, SitemapEntry>();

    for (const path of STATIC_PATHS) {
        const normalizedPath = normalizePath(path);
        if (normalizedPath) {
            entries.set(normalizedPath, { path: normalizedPath });
        }
    }

    for (const post of posts) {
        const path = normalizePath(post.slug);
        if (path) {
            entries.set(path, { path, lastModified: post.date });
        }
    }

    for (const page of pages) {
        const path = normalizePath(page.slug);
        if (path && !entries.has(path)) {
            entries.set(path, { path, lastModified: page.modified });
        }
    }

    return new Response(createSitemapXml([...entries.values()]), {
        headers: {
            "Content-Type": "application/xml; charset=utf-8",
        },
    });
}
