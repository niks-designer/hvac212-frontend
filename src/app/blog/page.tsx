export const dynamic = "force-dynamic";

import BlogList from "@/components/blog/BlogList";
import Image from "next/image";
import { FlexibleContentRenderer } from "@/components/FlexibleContentRenderer";
import { getPageContentBySlug } from "@/lib/wordpress";
import { generatePageMetadata } from "@/lib/seo";

export async function generateMetadata() {
    return generatePageMetadata("blog");
}

export default async function BlogPage() {
    const flexibleContent = await getPageContentBySlug("blog");

    return (
        <div className="relative min-h-screen overflow-hidden">
            <div className="pointer-events-none absolute inset-0 -z-50 blur-[50px] in-[.light]:hidden">
                <Image
                    src="/images/page-bg/blog-bg.webp"
                    alt="Blog"
                    fill
                    priority
                    className="object-cover object-center"
                />
            </div>
            {flexibleContent.length > 0 && (
                <FlexibleContentRenderer sections={flexibleContent} />
            )}

            <BlogList />
        </div>
    );
}
