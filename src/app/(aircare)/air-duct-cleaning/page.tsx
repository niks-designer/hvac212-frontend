export const dynamic = "force-dynamic";
import Image from "next/image";
import { FlexibleContentRenderer } from "@/components/FlexibleContentRenderer";
import { getPageContentBySlug } from "@/lib/wordpress";
import { generatePageMetadata } from "@/lib/seo";

export async function generateMetadata() {
    return generatePageMetadata("air-duct-cleaning");
}

export default async function AirDuctCleaningPage() {
    const flexibleContent = await getPageContentBySlug("air-duct-cleaning");

    return (
        <div className="min-h-screen">
            <div className="pointer-events-none absolute inset-0 -z-50 blur-[50px] in-[.light]:hidden">
                <Image
                    src="/images/page-bg/central-air-bg.webp"
                    alt="AirCare"
                    fill
                    priority
                    className="object-cover object-top"
                />
            </div>
            {flexibleContent.length > 0 ? (
                <FlexibleContentRenderer
                    sections={flexibleContent}
                    sectionClassNames={{
                        why_choose_us: {
                            className: "pb-5 lg:pb-8",
                            contentClassName: "max-w-187.5",
                        },
                    }}
                />
            ) : (
                <section className="px-4 py-24 text-center md:px-8 lg:px-16">
                    <div className="bg-secondary mx-auto max-w-3xl rounded-2xl border border-white/10 p-12">
                        <h1 className="text-3xl font-bold">
                            Air Duct Cleaning
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
