export const dynamic = "force-dynamic";

import { getPosts } from "@/lib/wordpress";
import { PostCard } from "@/components/common/PostCard";
import { generatePageMetadata } from "@/lib/seo";

export async function generateMetadata() {
    return {
        title: "Blog - 212 HVAC",
        description:
            "Read our latest articles and tips about HVAC systems, maintenance, and home comfort.",
    };
}

export default async function BlogPage() {
    const posts = await getPosts(20);

    return (
        <div className="relative min-h-screen">
            <section className="px-4 py-12 md:px-8 lg:px-16">
                <div className="mx-auto max-w-6xl">
                    <div className="mb-12 text-center">
                        <h1 className="text-4xl font-bold">Blog</h1>
                        <p className="mt-4 text-lg text-gray-600">
                            Latest articles and tips about HVAC systems,
                            maintenance, and home comfort.
                        </p>
                    </div>

                    {posts.length > 0 ? (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {posts.map((post) => (
                                <PostCard key={post.id} post={post} />
                            ))}
                        </div>
                    ) : (
                        <div className="bg-secondary rounded-2xl border border-white/10 p-12 text-center">
                            <h2 className="text-2xl font-bold">
                                No Articles Found
                            </h2>
                            <p className="mt-4">
                                Articles will appear here once they are
                                published in WordPress.
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
