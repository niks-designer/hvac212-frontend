export const dynamic = "force-dynamic";
import Image from "next/image";
import { FlexibleContentRenderer } from "@/components/FlexibleContentRenderer";
import { getPageContentBySlug } from "@/lib/wordpress";
import { generatePageMetadata } from "@/lib/seo";

export async function generateMetadata() {
    return generatePageMetadata("air-conditioner-error-code-search");
}

export default async function AirConditionerErrorCodeSearchPage() {
    const flexibleContent = await getPageContentBySlug(
        "air-conditioner-error-code-search"
    );

    return (
        <div className="min-h-screen">
            <style>{`
                .top-ttl .h2-title {
                    font-size: 40px;
                }
            `}</style>
            <div className="pointer-events-none absolute inset-0 -z-50 blur-[50px] in-[.light]:hidden">
                <Image
                    src="/images/page-bg/ac-repair-bg.webp"
                    alt="Air Conditioner Error Code Search"
                    fill
                    priority
                    className="object-cover object-top"
                />
            </div>

            {flexibleContent.length > 0 ? (
                <FlexibleContentRenderer
                    sections={flexibleContent}
                    sectionClassNames={{
                        heading_with_bottom_action: ["top-ttl pt-10 lg:pt-16"],
                        trusted_brands: ["pb-10 lg:pb-16"],
                    }}
                />
            ) : (
                <section className="px-4 py-24 text-center md:px-8 lg:px-16">
                    <div className="bg-secondary mx-auto max-w-3xl rounded-2xl border border-white/10 p-12">
                        <h1 className="text-3xl font-bold">
                            Air Conditioner Error Code Search
                        </h1>
                        <p className="mt-4">
                            Content for this page will appear here once it is
                            added in WordPress.
                        </p>
                    </div>
                </section>
            )}
        </div>
    );
}
