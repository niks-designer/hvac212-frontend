export const dynamic = "force-dynamic";

import { getPostBySlug, getPosts } from "@/lib/wordpress";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateStaticParams() {
    const posts = await getPosts(100);
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        return {
            title: "Post Not Found",
        };
    }

    const description = post.excerpt.rendered
        .replace(/<[^>]+>/g, "")
        .trim()
        .substring(0, 160);

    return {
        title: post.title.rendered,
        description,
        alternates: {
            canonical: `/${slug}/`,
        },
    };
}

interface PostPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function PostPage({ params }: PostPageProps) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const date = new Date(post.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    const featuredMedia = post._embedded?.["wp:featuredmedia"]?.[0];
    const featuredImageUrl = featuredMedia?.source_url;

    return (
        <div className="min-h-screen">
            <div className="absolute inset-0 -z-50 blur-[50px] in-[.light]:hidden">
                <Image
                    src="/images/page-bg/con-edison-bg.webp"
                    alt="Con Edison Energy Rebates"
                    fill
                    priority
                    className="object-cover object-center"
                />
            </div>
            <section className="px-4 py-12 md:px-8 lg:px-16">
                <div className="container">
                    {featuredImageUrl ? (
                        <div className="featured-img mb-10 overflow-hidden rounded-2xl">
                            <Image
                                src={featuredImageUrl}
                                alt={
                                    featuredMedia?.alt_text ||
                                    post.title.rendered
                                }
                                width={1200}
                                height={675}
                                priority
                                className="h-auto w-full object-cover"
                            />
                        </div>
                    ) : null}
                    <div className="sec-ttl mb-8">
                        <h1 className="text-4xl font-bold">
                            {post.title.rendered}
                        </h1>
                        <div className="mt-4 flex items-center gap-4">
                            <time dateTime={post.date}>{date}</time>
                        </div>
                    </div>

                    <div className="post-content">
                        <div
                            dangerouslySetInnerHTML={{
                                __html: post.content.rendered,
                            }}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}
