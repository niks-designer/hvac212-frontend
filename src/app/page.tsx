export const dynamic = "force-dynamic";

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
        <div className="relative min-h-screen overflow-hidden">
            <div className="bg-shapes">
                {/* Blue Background */}
                <div
                    className="pointer-events-none absolute top-[383px] left-1/2 -z-10 h-[1500px] w-[1582px] -translate-x-1/2"
                    style={{
                        background:
                            "radial-gradient(50% 50% at 50% 50%, rgba(0, 191, 255, 0.36) 0%, rgba(7, 15, 29, 0.36) 100%)",
                    }}
                    aria-hidden="true"
                />

                {/* Yellow Background */}
                <div
                    className="pointer-events-none absolute -z-10"
                    style={{
                        width: "1916px",
                        height: "1816px",
                        left: "calc(50% - 958px - 389px)",
                        top: "1853px",
                        background:
                            "radial-gradient(50% 50% at 50% 50%, rgba(228, 187, 76, 0.36) 0%, rgba(7, 15, 29, 0) 100%)",
                    }}
                    aria-hidden="true"
                />

                {/* Background Gradient */}
                <div
                    className="pointer-events-none absolute -z-10"
                    style={{
                        width: "2354px",
                        height: "2232px",
                        left: "calc(50% - 1177px - 593px)",
                        top: "3817px",
                        background:
                            "radial-gradient(50% 50% at 50% 50%, rgba(228, 187, 76, 0.36) 0%, rgba(7, 15, 29, 0) 100%)",
                    }}
                    aria-hidden="true"
                />

                {/* Background Gradient */}
                <div
                    className="pointer-events-none absolute -z-10"
                    style={{
                        width: "1582px",
                        height: "1500px",
                        left: "calc(50% - 791px + 555px)",
                        top: "3738px",
                        background:
                            "radial-gradient(50% 50% at 50% 50%, rgba(0, 191, 255, 0.36) 0%, rgba(7, 15, 29, 0) 100%)",
                    }}
                    aria-hidden="true"
                />
            </div>

            {/* ACF Flexible Content Sections */}
            {flexibleContent.length > 0 && (
                <FlexibleContentRenderer
                    sections={flexibleContent}
                    sectionClassNames={JSON.stringify({
                            services_grid: "py-20",
                            center_image: "py-8"
                        })
                    }
                />
            )}

            {/* Blog Posts Section */}
            {posts.length > 0 && (
                <section className="hidden px-4 py-12">
                    <div className="mx-auto max-w-6xl">
                        <h2
                            className="mb-12 text-center text-3xl font-bold"
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
