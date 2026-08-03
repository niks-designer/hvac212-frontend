export const dynamic = "force-dynamic";

import { FlexibleContentRenderer } from "@/components/FlexibleContentRenderer";
import { getPageContentBySlug } from "@/lib/wordpress";
import { generatePageMetadata } from "@/lib/seo";

export async function generateMetadata() {
    return generatePageMetadata("vrf-vrv-maintenance");
}

export default async function VrfVrvMaintenancePage() {
    const flexibleContent = await getPageContentBySlug("vrf-vrv-maintenance");

    return (
        <div className="relative min-h-screen overflow-hidden">
            <div className="bg-shapes">
                {/* bg-1 */}
                <div className="absolute top-95.75 -left-17.75 -z-10 h-375 w-[1582px] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(0,191,255,0.36)_0%,rgba(7,15,29,0)_100%)]" />

                {/* bg-2 */}
                <div className="absolute top-[15%] -left-62.5 -z-10 h-[1816px] w-[1916px] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(228,187,76,0.26)_0%,rgba(7,15,29,0)_100%)]" />

                {/* bg-3 */}
                <div className="absolute top-[40%] left-3 -z-11 h-375 w-[1582px] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(255,255,255,0.20)_0%,rgba(7,15,29,0.27)_100%)]" />

                {/* bg-4 */}
                <div className="absolute top-[2862px] left-121 -z-10 h-375 w-[1582px] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(0,191,255,0.36)_0%,rgba(7,15,29,0)_100%)]" />

                {/* bg-5 */}
                <div className="absolute top-[4388px] left-96.75 -z-10 h-[1816px] w-[1916px] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(0,191,255,0.16)_0%,rgba(7,15,29,0)_100%)]" />

                {/* bg-6 */}
                <div className="absolute top-[3136px] -left-262.5 -z-10 h-[2232px] w-[2354px] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(228,187,76,0.36)_0%,rgba(7,15,29,0)_100%)]" />
            </div>
            {flexibleContent.length > 0 ? (
                <FlexibleContentRenderer
                    sections={flexibleContent}
                    sectionClassNames={{
                        section_heading: ["", "pb-10 lg:pb-16"],
                    }}
                />
            ) : (
                <section className="px-4 py-24 text-center md:px-8 lg:px-16">
                    <div className="bg-secondary mx-auto max-w-3xl rounded-2xl border border-white/10 p-12">
                        <h1 className="text-3xl font-bold">
                            VRF / VRV Maintenance
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
