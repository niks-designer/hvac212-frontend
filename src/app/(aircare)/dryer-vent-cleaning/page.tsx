export const dynamic = "force-dynamic";

import { FlexibleContentRenderer } from "@/components/FlexibleContentRenderer";
import { getPageContentBySlug } from "@/lib/wordpress";
import { generatePageMetadata } from "@/lib/seo";

export async function generateMetadata() {
    return generatePageMetadata("dryer-vent-cleaning");
}

export default async function DryerVentCleaningPage() {
    const flexibleContent = await getPageContentBySlug("dryer-vent-cleaning");

    return (
        <div className="relative min-h-screen overflow-hidden bg-[url(/images/central-air-bg.webp)] bg-cover bg-position-[center_40%] bg-no-repeat in-[.light]:bg-none">
            {flexibleContent.length > 0 ? (
                <FlexibleContentRenderer
                    sections={flexibleContent}
                    sectionClassNames={{
                        why_choose_us: {
                            className: "pb-5 lg:pb-8",
                            contentClassName: "max-w-198",
                        },
                    }}
                />
            ) : (
                <section className="px-4 py-24 text-center md:px-8 lg:px-16">
                    <div className="bg-secondary mx-auto max-w-3xl rounded-2xl border border-white/10 p-12">
                        <h1 className="text-3xl font-bold">
                            Dryer Vent Cleaning
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
