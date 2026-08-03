export const dynamic = "force-dynamic";

import { FlexibleContentRenderer } from "@/components/FlexibleContentRenderer";
import { getPageContentBySlug } from "@/lib/wordpress";
import { generatePageMetadata } from "@/lib/seo";

export async function generateMetadata() {
    return generatePageMetadata("ductless-mini-split-repair");
}

export default async function DuctlessMiniSplitRepairPage() {
    const flexibleContent = await getPageContentBySlug("ductless-mini-split-repair");

    return (
        <div className="relative min-h-screen overflow-hidden">
            <div className="bg-shapes">
                <div
                    className="pointer-events-none absolute top-95.75 left-1/2 -z-10 h-375 w-[1582px] -translate-x-1/2 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(0,191,255,0.36)_0%,rgba(7,15,29,0.36)_100%)]"
                    aria-hidden="true"
                />

                <div
                    className="pointer-events-none absolute top-290 -left-62.5 -z-10 h-[1816px] w-[1996px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(228,187,76,0.25)_0%,rgba(7,15,29,0)_100%)]"
                    aria-hidden="true"
                />

                <div
                    className="pointer-events-none absolute bottom-0 left-162.5 -z-10 h-[1816px] w-[1916px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(0,191,255,0.22)_0%,rgba(7,15,29,0)_100%)]"
                    aria-hidden="true"
                />

                <div
                    className="pointer-events-none absolute top-[3817px] left-[calc(50%-1770px)] -z-10 h-[2232px] w-[2354px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(228,187,76,0.36)_0%,rgba(7,15,29,0)_100%)]"
                    aria-hidden="true"
                />
            </div>
            {flexibleContent.length > 0 ? (
                <FlexibleContentRenderer
                    sections={flexibleContent}
                    sectionClassNames={{
                        heading_with_bottom_action: ["", "p-0"],
                    }}
                />
            ) : (
                <section className="px-4 py-24 text-center md:px-8 lg:px-16">
                    <div className="bg-secondary mx-auto max-w-3xl rounded-2xl border border-white/10 p-12">
                        <h1 className="text-3xl font-bold">Ductless Mini Split Repair</h1>
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
