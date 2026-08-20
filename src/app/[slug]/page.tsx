export const dynamic = "force-dynamic";

import { getPostBySlug, getPosts } from "@/lib/wordpress";
import Link from "next/link";
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

    return (
        <div className="relative min-h-screen">
            <section className="px-4 py-12 md:px-8 lg:px-16">
                <div className="mx-auto max-w-4xl">
                    <Link
                        href="/blog"
                        className="hover:text-blue mb-8 inline-flex items-center font-semibold transition-colors"
                    >
                        ← Back to Blog
                    </Link>

                    <article>
                        <header className="mb-8">
                            <h1 className="text-4xl font-bold">
                                {post.title.rendered}
                            </h1>
                            <div className="mt-4 flex items-center gap-4 text-gray-600">
                                <time dateTime={post.date}>{date}</time>
                            </div>
                        </header>

                        <div className="prose prose-lg max-w-none">
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: post.content.rendered,
                                }}
                            />
                        </div>
                    </article>

                    <div className="mt-12 border-t border-gray-200 pt-8">
                        <Link
                            href="/blog"
                            className="hover:text-blue inline-flex items-center font-semibold transition-colors"
                        >
                            ← Back to Blog
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
