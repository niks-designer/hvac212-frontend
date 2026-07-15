export const dynamic = "force-dynamic";

import {
    getPageBySlugWithACF,
    getPosts,
    processACFFlexibleContent,
} from "@/lib/wordpress";
import { PostCard } from "@/components/PostCard";
import { FlexibleContentRenderer } from "@/components/FlexibleContentRenderer";

export default async function Home() {
    const homePage = await getPageBySlugWithACF("home");
    const posts = await getPosts(10);

    let flexibleContent = homePage?.acf?.page_builder || [];

    // Process ACF data to resolve image IDs to URLs
    if (flexibleContent.length > 0) {
        flexibleContent = await processACFFlexibleContent(flexibleContent);
    }

    return (
        <div
            className="min-h-screen"
            style={{ backgroundColor: "var(--color-background)" }}
        >
            {/* ACF Flexible Content Sections */}
            {flexibleContent.length > 0 && (
                <FlexibleContentRenderer sections={flexibleContent} />
            )}

            {/* Blog Posts Section */}
            {posts.length > 0 && (
                <section className="hidden px-4 py-12">
                    <div className="mx-auto max-w-6xl">
                        <h2
                            className="mb-12 text-center text-3xl font-bold"
                            style={{ color: "var(--color-heading)" }}
                        >
                            Latest Articles
                        </h2>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {posts.map((post) => (
                                <PostCard key={post.id} post={post} />
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}
