export const dynamic = "force-dynamic";

import { FlexibleContentRenderer } from "@/components/FlexibleContentRenderer";
import { getPageContentBySlug } from "@/lib/wordpress";
import { generatePageMetadata } from "@/lib/seo";

export async function generateMetadata() {
    return generatePageMetadata("hvac-maintenance");
}

export default async function HvacMaintenancePage() {
    const flexibleContent = await getPageContentBySlug("hvac-maintenance");

    return (
        <div className="relative min-h-screen overflow-hidden">
            <div className="bg-shapes">
                <div
                    className="pointer-events-none absolute top-95.75 left-1/2 -z-10 h-375 w-[1582px] -translate-x-1/2"
                    style={{
                        background:
                            "radial-gradient(50% 50% at 50% 50%, rgba(0, 191, 255, 0.36) 0%, rgba(7, 15, 29, 0.36) 100%)",
                    }}
                    aria-hidden="true"
                />
                <div
                    className="pointer-events-none absolute top-374.5 -left-62.5 -z-10 h-[1816px] w-[1916px]"
                    style={{
                        background:
                            "radial-gradient(50% 50% at 50% 50%, rgba(228, 187, 76, 0.35) 0%, rgba(7, 15, 29, 0) 100%)",
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
                        top: "75%",
                        background:
                            "radial-gradient(50% 50% at 50% 50%, rgba(0, 191, 255, 0.36) 0%, rgba(7, 15, 29, 0) 100%)",
                    }}
                    aria-hidden="true"
                />
            </div>
            {flexibleContent.length > 0 ? (
                <FlexibleContentRenderer
                    sections={flexibleContent}
                    sectionClassNames={{
                        section_heading: ["pb-10 lg:pb-16", ""],
                        system_replacement_signs: ["pb-6 lg:pb-10"],
                    }}
                />
            ) : (
                <section className="px-4 py-24 text-center md:px-8 lg:px-16">
                    <div className="bg-secondary mx-auto max-w-3xl rounded-2xl border border-white/10 p-12">
                        <h1 className="text-3xl font-bold">HVAC Maintenance</h1>
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
