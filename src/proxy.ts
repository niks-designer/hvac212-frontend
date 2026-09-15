import { NextRequest, NextResponse } from "next/server";

const REDIRECT_API =
    "https://nextjs212hvac.wpenginepowered.com/wp-json/hvac/v1/redirects";

interface RedirectRule {
    source: string;
    destination: string;
    status: number;
    regex: boolean;
}

async function getRedirects(): Promise<RedirectRule[]> {
    try {
        const response = await fetch(REDIRECT_API, {
            cache: "no-store",
        });

        if (!response.ok) {
            console.error("Redirect API error:", response.status);

            return [];
        }

        const data = await response.json();

        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error("Redirect API fetch failed:", error);

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
