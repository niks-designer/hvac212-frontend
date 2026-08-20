export const dynamic = "force-dynamic";
import Image from "next/image";
import { getPageContentBySlug, getPosts } from "@/lib/wordpress";
import { PostCard } from "@/components/common/PostCard";
import { FlexibleContentRenderer } from "@/components/FlexibleContentRenderer";
import { generatePageMetadata } from "@/lib/seo";

export async function generateMetadata() {
    return generatePageMetadata("home");
}

export default async function Home() {
    const posts = await getPosts(10);
    const flexibleContent = await getPageContentBySlug("home");

    return (
        <div className="min-h-screen">
            <div className="pointer-events-none absolute inset-0 -z-50 blur-[50px] in-[.light]:hidden">
                <Image
                    src="/images/page-bg/home-bg.webp"
                    alt="AirCare"
                    fill
                    priority
                    className="object-cover object-top"
                />
            </div>
            {/* ACF Flexible Content Sections */}
            {flexibleContent.length > 0 && (
                <FlexibleContentRenderer
                    sections={flexibleContent}
                    sectionClassNames={JSON.stringify({
                        services_grid: "",
                        center_image: "py-8",
                    })}
                />
            )}

            {/* Blog Posts Section */}
            {posts.length > 0 && (
                <section className="hidden px-4 py-12">
                    <div className="mx-auto max-w-6xl">
                        <h2 className="mb-12 text-center text-3xl font-bold">
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
