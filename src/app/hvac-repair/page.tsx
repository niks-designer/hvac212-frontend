export const dynamic = "force-dynamic";

import { FlexibleContentRenderer } from "@/components/FlexibleContentRenderer";
import { getPageContentBySlug } from "@/lib/wordpress";

export default async function AboutUsPage() {
    const flexibleContent = await getPageContentBySlug("hvac-repair");

    return (
        <div className="relative min-h-screen overflow-hidden">
            <div className="bg-shapes">
                <div
                    className="pointer-events-none absolute top-[383px] left-1/2 -z-10 h-[1500px] w-[1582px] -translate-x-1/2"
                    style={{
                        background:
                            "radial-gradient(50% 50% at 50% 50%, rgba(0, 191, 255, 0.36) 0%, rgba(7, 15, 29, 0.36) 100%)",
                    }}
                    aria-hidden="true"
                />
            </div>
            {flexibleContent.length > 0 ? (
                <FlexibleContentRenderer
                    sections={flexibleContent}
                    sectionClassNames={{
                        services_grid: "",
                    }}
                />
            ) : (
                <section className="px-4 py-24 text-center md:px-8 lg:px-16">
                    <div className="bg-secondary mx-auto max-w-3xl rounded-2xl border border-white/10 p-12">
                        <h1 className="text-3xl font-bold">
                            HVAC Repair Page Content Not Found
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
