export const dynamic = "force-dynamic";

import { FlexibleContentRenderer } from "@/components/FlexibleContentRenderer";
import { getPageContentBySlug } from "@/lib/wordpress";
import { generatePageMetadata } from "@/lib/seo";

export async function generateMetadata() {
    return generatePageMetadata("air-duct-cleaning");
}

export default async function AirDuctCleaningPage() {
    const flexibleContent = await getPageContentBySlug("air-duct-cleaning");

    return (
        <div className="relative min-h-screen overflow-hidden bg-[url(/images/central-air-bg.webp)] bg-cover bg-position-[center_40%] bg-no-repeat in-[.light]:bg-none">
            <div className="bg-shapes hidden">
                <div className="bg-shapes">
                    {/* Gradient Shape 1 */}
                    <div
                        className="pointer-events-none absolute top-95.75 -left-17.75 -z-10 h-375 w-[1582px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(252,177,22,0.36)_0%,rgba(7,15,29,0)_100%)]"
                        aria-hidden="true"
                    />

                    {/* Gradient Shape 2 */}
                    <div
                        className="pointer-events-none absolute top-146.25 -left-107 -z-10 h-[2232px] w-[2354px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(228,187,76,0.36)_0%,rgba(7,15,29,0)_100%)]"
                        aria-hidden="true"
                    />

                    {/* Gradient Shape 3 */}
                    <div
                        className="pointer-events-none absolute top-374.5 -left-62.5 -z-10 h-[1816px] w-[1916px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(228,187,76,0.36)_0%,rgba(7,15,29,0)_100%)]"
                        aria-hidden="true"
                    />

                    {/* Gradient Shape 4 */}
                    <div
                        className="pointer-events-none absolute top-550.5 -left-157.25 -z-10 h-375 w-[1582px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(0,191,255,0.36)_0%,rgba(7,15,29,0)_100%)]"
                        aria-hidden="true"
                    />

                    {/* Gradient Shape 5 */}
                    <div
                        className="pointer-events-none absolute top-573 -left-3 -z-10 h-375 w-[1582px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(255,255,255,0.27)_0%,rgba(7,15,29,0.27)_100%)]"
                        aria-hidden="true"
                    />
                </div>
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
