export const dynamic = "force-dynamic";

import { FlexibleContentRenderer } from "@/components/FlexibleContentRenderer";
import { getPageContentBySlug } from "@/lib/wordpress";
import { generatePageMetadata } from "@/lib/seo";

export async function generateMetadata() {
    return generatePageMetadata("privacy-policy");
}

export default async function PrivacyPolicyPage() {
    const flexibleContent = await getPageContentBySlug("privacy-policy");

    return (
        <div className="relative min-h-screen overflow-hidden">
            <div className="bg-shapes">
                {/* Background Shape 1 */}
                <div
                    className="pointer-events-none absolute -top-123 -left-122 -z-10 h-375 w-[1582px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(0,191,255,0.36)_0%,rgba(7,15,29,0)_100%)]"
                    aria-hidden="true"
                />

                {/* Background Shape 2 */}
                <div
                    className="pointer-events-none absolute top-95.75 -left-17.75 -z-10 h-375 w-[1582px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(252,177,22,0.36)_0%,rgba(7,15,29,0)_100%)]"
                    aria-hidden="true"
                />

                {/* Background Shape 3 */}
                <div
                    className="pointer-events-none absolute top-374.5 -left-62.5 -z-10 h-[1816px] w-[1916px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(228,187,76,0.36)_0%,rgba(7,15,29,0)_100%)]"
                    aria-hidden="true"
                />

                {/* Background Shape 4 */}
                <div
                    className="pointer-events-none absolute top-254 left-126.75 -z-10 h-375 w-[1582px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(0,191,255,0.36)_0%,rgba(7,15,29,0)_100%)]"
                    aria-hidden="true"
                />
            </div>
            {flexibleContent.length > 0 ? (
                <FlexibleContentRenderer
                    sections={flexibleContent}
                    sectionClassNames={{
                        system_replacement_signs: ["py-10 lg:py-16", ""],
                        section_heading: ["pb-10 lg:pb-12 privacy-content relative", ""],
                    }}
                />
            ) : (
                <section className="px-4 py-24 text-center md:px-8 lg:px-16">
                    <div className="bg-secondary mx-auto max-w-3xl rounded-2xl border border-white/10 p-12">
                        <h1 className="text-3xl font-bold">Privacy Policy</h1>
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
