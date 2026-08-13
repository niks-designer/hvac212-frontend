"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { WordPressPost } from "@/lib/wordpress";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import BlogSearch from "@/components/blog/BlogSearch";

const POSTS_PER_PAGE = 18;
const INITIAL_VISIBLE_POSTS = 6;
const GRID_SCROLL_OFFSET = 120;

interface BlogApiResponse {
    posts: WordPressPost[];
    totalPages: number;
    totalPosts: number;
    page: number;
    perPage: number;
}

export default function BlogList() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const gridRef = useRef<HTMLDivElement | null>(null);
    const loadMoreTarget = useRef<number | null>(null);
    const [posts, setPosts] = useState<WordPressPost[]>([]);
    const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_POSTS);
    const [selectedPage, setSelectedPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalPosts, setTotalPosts] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [isPageLoading, setIsPageLoading] = useState(false);
    const [isSearchLoading, setIsSearchLoading] = useState(false);
    const [isLoadMoreLoading, setIsLoadMoreLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const filteredPosts = posts;
    const visiblePosts = filteredPosts.slice(0, visibleCount);

    const mergeUniquePosts = (
        previousPosts: WordPressPost[],
        incomingPosts: WordPressPost[]
    ) => {
        const postMap = new Map<number, WordPressPost>();

        [...previousPosts, ...incomingPosts].forEach((post) => {
            postMap.set(post.id, post);
        });

        return Array.from(postMap.values());
    };

    async function fetchPage(
        page: number,
        query: string,
        mode: "page" | "search"
    ) {
        if (mode === "page") {
            setIsPageLoading(true);
        } else {
            setIsSearchLoading(true);
        }
        setError(null);
        let fetchFailed = false;

        try {
            const response = await fetch(
                `/api/posts?page=${page}&perPage=${POSTS_PER_PAGE}&search=${encodeURIComponent(
                    query
                )}`,
                { cache: "no-store" }
            );

            if (!response.ok) {
                throw new Error("Unable to load blog posts.");
            }

            const data = (await response.json()) as BlogApiResponse;
            setTotalPages(data.totalPages);
            setTotalPosts(data.totalPosts);
            setPosts(data.posts);
            setVisibleCount(INITIAL_VISIBLE_POSTS);
            setSearchTerm(query);
        } catch (error) {
            fetchFailed = true;
            setError(
                error instanceof Error
                    ? error.message
                    : "An error occurred while loading posts."
            );
        } finally {
            if (mode === "page") {
                setIsPageLoading(false);
            } else {
                setIsSearchLoading(false);
            }
        }
    }

    useEffect(() => {
        const pageParam = Number(searchParams.get("page") ?? "1");
        const page =
            Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1;
        const queryParam = searchParams.get("search") ?? "";

        setSelectedPage(page);
        setSearchTerm(queryParam);
        setVisibleCount(INITIAL_VISIBLE_POSTS);

        if (typeof window !== "undefined") {
            scrollToGridTop();
        }
        void fetchPage(page, queryParam, "page");
    }, [searchParams]);

    const handleSearch = (query: string) => {
        if (!query) {
            if (!searchTerm) {
                return;
            }

            setSearchTerm("");
            setSelectedPage(1);
            setVisibleCount(INITIAL_VISIBLE_POSTS);
            router.push(`/blog?page=1`, { scroll: false });
            return;
        }

        setSearchTerm(query);
        setVisibleCount(INITIAL_VISIBLE_POSTS);
        router.push(`/blog?page=1&search=${encodeURIComponent(query)}`, {
            scroll: false,
        });
        void fetchPage(1, query, "search");
    };

    const loadMore = () => {
        if (isAnyLoading || isLoadMoreLoading) return;

        const targetCount = Math.min(
            visibleCount + INITIAL_VISIBLE_POSTS,
            posts.length
        );
        loadMoreTarget.current = targetCount;
        setIsLoadMoreLoading(true);
        setVisibleCount(targetCount);
    };

    useEffect(() => {
        if (isLoadMoreLoading && loadMoreTarget.current !== null) {
            if (visibleCount >= loadMoreTarget.current) {
                setIsLoadMoreLoading(false);
                loadMoreTarget.current = null;
            }
        }
    }, [visibleCount, isLoadMoreLoading]);

    const scrollToGridTop = () => {
        if (typeof window === "undefined") {
            return;
        }

        const top = gridRef.current?.offsetTop ?? 0;
        window.scrollTo({
            top: Math.max(0, top - GRID_SCROLL_OFFSET),
            behavior: "smooth",
        });
    };

    const goToPage = (page: number) => {
        if (page !== selectedPage) {
            setSelectedPage(page);
            setVisibleCount(INITIAL_VISIBLE_POSTS);
            setIsPageLoading(true);
            scrollToGridTop();
            const queryParam = searchTerm
                ? `&search=${encodeURIComponent(searchTerm)}`
                : "";
            router.push(`/blog?page=${page}${queryParam}`, { scroll: false });
        }
    };

    const pageButtons = Array.from(
        { length: totalPages },
        (_, index) => index + 1
    );
    const isAnyLoading = isPageLoading || isSearchLoading;
    const showLoadMore = visibleCount < posts.length && !isAnyLoading;

    return (
        <section className="pt-14 pb-20 lg:pt-18 lg:pb-28">
            <div className="container">
                <div className="text-center">
                    <h2 className="h2-title mb-3 text-3xl font-bold md:text-4xl">
                        Recent posts
                    </h2>
                </div>

                <BlogSearch
                    query={searchTerm}
                    onSearch={handleSearch}
                    isLoading={isSearchLoading}
                />

                <div ref={gridRef} className="grid gap-6 md:grid-cols-2">
                    {isPageLoading
                        ? Array.from({ length: INITIAL_VISIBLE_POSTS }).map(
                              (_, index) => (
                                  <div
                                      key={index}
                                      className="h-80 rounded-3xl bg-[#ececec] p-8 dark:bg-[#070F1D99]"
                                  >
                                      <div className="mb-5 h-44 animate-pulse rounded-3xl bg-slate-800" />
                                      <div className="space-y-3">
                                          <div className="h-5 w-3/4 animate-pulse rounded-full bg-slate-800" />
                                          <div className="h-4 w-1/2 animate-pulse rounded-full bg-slate-800" />
                                          <div className="h-3 w-full animate-pulse rounded-full bg-slate-800" />
                                      </div>
                                  </div>
                              )
                          )
                        : visiblePosts.map((post) => (
                              <BlogPostCard key={post.id} post={post} />
                          ))}
                </div>

                {visiblePosts.length === 0 &&
                    !isPageLoading &&
                    !isSearchLoading && (
                        <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-12 text-center text-slate-300">
                            <p className="text-xl font-semibold">
                                No posts found.
                            </p>
                            <p className="mt-3 text-sm text-slate-400">
                                Try a different search term or change pages.
                            </p>
                        </div>
                    )}

                <div className="mt-15 flex flex-col items-center justify-center gap-10">
                    {showLoadMore && (
                        <button
                            type="button"
                            onClick={loadMore}
                            disabled={isLoadMoreLoading || isAnyLoading}
                            className="theme-btn bgc-yellow disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isLoadMoreLoading && (
                                <svg
                                    className="h-4 w-4 animate-spin"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                    />
                                </svg>
                            )}
                            {isLoadMoreLoading ? "Loading…" : "Load More"}
                        </button>
                    )}

                    {totalPages > 1 && (
                        <div className="flex flex-wrap items-center justify-center gap-3">
                            {pageButtons.map((page) => (
                                <button
                                    key={page}
                                    type="button"
                                    onClick={() => goToPage(page)}
                                    className={`h-12 w-12 cursor-pointer rounded-full border text-sm font-semibold transition ${
                                        page === selectedPage
                                            ? "bg-blue in-[.light]:border-primary text-white"
                                            : "hover:border-blue hover:text-blue in-[.light]:border-primary border-white"
                                    } ${isAnyLoading ? "cursor-not-allowed opacity-60" : ""}`}
                                    disabled={isAnyLoading}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
