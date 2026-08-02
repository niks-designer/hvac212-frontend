export const dynamic = "force-dynamic";

import { FlexibleContentRenderer } from "@/components/FlexibleContentRenderer";
import { getPageContentBySlug } from "@/lib/wordpress";
import { generatePageMetadata } from "@/lib/seo";

export async function generateMetadata() {
    return generatePageMetadata("furnace-installation");
}

export default async function FurnaceInstallationPage() {
    const flexibleContent = await getPageContentBySlug("furnace-installation");

    return (
        <div className="relative min-h-screen overflow-hidden">
            <div className="bg-shapes">
                {/* First Background Shape */}
                <div
                    className="pointer-events-none absolute top-95.75 -left-17.75 -z-10 h-375 w-[1582px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(252,177,22,0.36)_0%,rgba(7,15,29,0)_100%)]"
                    aria-hidden="true"
                />

                {/* Second Background Shape */}
                <div
                    className="pointer-events-none absolute top-374.5 -left-62.5 -z-10 h-[1816px] w-[1916px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(228,187,76,0.36)_0%,rgba(7,15,29,0)_100%)]"
                    aria-hidden="true"
                />

                {/* Third Background Shape */}
                <div
                    className="pointer-events-none absolute top-550.5 -left-157.25 -z-10 h-375 w-[1582px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(0,191,255,0.36)_0%,rgba(7,15,29,0)_100%)]"
                    aria-hidden="true"
                />

                {/* Fourth Background Shape */}
                <div
                    className="pointer-events-none absolute top-748 left-60.75 -z-10 h-375 w-[1582px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(0,191,255,0.36)_0%,rgba(7,15,29,0)_100%)]"
                    aria-hidden="true"
                />

                {/* Fifth Background Shape */}
                <div
                    className="pointer-events-none absolute top-954.25 -left-262.5 -z-10 h-558 w-[2354px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(228,187,76,0.36)_0%,rgba(7,15,29,0)_100%)]"
                    aria-hidden="true"
                />

                {/* Sixth Background Shape */}
                <div
                    className="pointer-events-none absolute top-[5299px] left-102 -z-10 h-375 w-[1582px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(0,191,255,0.36)_0%,rgba(7,15,29,0)_100%)]"
                    aria-hidden="true"
                />
            </div>
            {flexibleContent.length > 0 ? (
                <FlexibleContentRenderer
                    sections={flexibleContent}
                    sectionClassNames={{
                        section_heading: ["pb-10 lg:pb-16"],
                        heading_with_bottom_action: ["", "pb-10 lg:pb-16"],
                    }}
                />
            ) : (
                <section className="px-4 py-24 text-center md:px-8 lg:px-16">
                    <div className="bg-secondary mx-auto max-w-3xl rounded-2xl border border-white/10 p-12">
                        <h1 className="text-3xl font-bold">
                            Furnace Installation
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
