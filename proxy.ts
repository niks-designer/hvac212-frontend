import { NextRequest, NextResponse } from "next/server";

const WP_API_URL =
    "https://nextjs212hvac.wpenginepowered.com/wp-json/hvac/v1/redirects";

interface RedirectRule {
    source: string;
    destination: string;
    status: number;
    regex?: boolean;
}

let redirectsCache: RedirectRule[] | null = null;
let redirectsCacheTime = 0;

const CACHE_DURATION = 60 * 1000; // 1 minute

async function getRedirects(): Promise<RedirectRule[]> {
    const now = Date.now();

    if (redirectsCache && now - redirectsCacheTime < CACHE_DURATION) {
        return redirectsCache;
    }

    try {
        const response = await fetch(WP_API_URL, {
            next: {
                revalidate: 60,
            },
        });

        if (!response.ok) {
            return [];
        }

        const data = (await response.json()) as RedirectRule[];

        redirectsCache = Array.isArray(data) ? data : [];
        redirectsCacheTime = now;

        return redirectsCache;
    } catch {
        return [];
    }
}

export async function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    const redirects = await getRedirects();

    const redirect = redirects.find((item) => item.source === pathname);

    if (!redirect) {
        return NextResponse.next();
    }

    const destination = new URL(redirect.destination, request.url);

    return NextResponse.redirect(destination, redirect.status || 301);
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
