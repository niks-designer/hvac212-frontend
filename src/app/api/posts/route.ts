import { NextResponse } from "next/server";

const DEFAULT_PER_PAGE = 12;

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

export async function GET(request: Request) {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page") ?? "1");
  const perPage = Number(url.searchParams.get("perPage") ?? `${DEFAULT_PER_PAGE}`);
  const search = url.searchParams.get("search")?.trim() ?? "";

  if (page < 1 || perPage < 1) {
    return NextResponse.json(
      { error: "Invalid pagination parameters." },
      { status: 400 }
    );
  }

  const queryString = new URLSearchParams({
    per_page: String(perPage),
    page: String(page),
    _embed: "",
  });

  if (search) {
    queryString.set("search", search);
  }

  const apiUrl = getApiUrl(`wp/v2/posts?${queryString.toString()}`);

  try {
    const response = await fetch(apiUrl, { cache: "no-store" });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Unable to fetch posts from WordPress." },
        { status: response.status }
      );
    }

    const posts = await response.json();
    const totalPosts = Number(response.headers.get("X-WP-Total") ?? "0");
    const totalPagesHeader = Number(response.headers.get("X-WP-TotalPages") ?? "0");
    const totalPages =
      totalPagesHeader > 0 ? totalPagesHeader : Math.ceil(totalPosts / perPage);

    return NextResponse.json({
      posts,
      totalPosts,
      totalPages,
      page,
      perPage,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to fetch posts." },
      { status: 500 }
    );
  }
}
