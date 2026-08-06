export const dynamic = "force-dynamic";
import Image from "next/image";
import { FlexibleContentRenderer } from "@/components/FlexibleContentRenderer";
import { getPageContentBySlug } from "@/lib/wordpress";
import { generatePageMetadata } from "@/lib/seo";

export async function generateMetadata() {
    return generatePageMetadata("air-conditioning-maintenance");
}

export default async function AirConditioningMaintenancePage() {
    const flexibleContent = await getPageContentBySlug(
        "air-conditioning-maintenance"
    );

    return (
        <div className="min-h-screen">
            <div className="absolute inset-0 -z-50 blur-[50px] in-[.light]:hidden">
                <Image
                    src="/images/page-bg/ac-maintenance-bg.webp"
                    alt="air conditioning maintenance"
                    fill
                    priority
                    className="object-cover object-center"
                />
            </div>
            {flexibleContent.length > 0 ? (
                <FlexibleContentRenderer
                    sections={flexibleContent}
                    sectionClassNames={{
                        section_heading: ["pt-5 pb-10 lg:pb-16", ""],
                    }}
                />
            ) : (
                <section className="px-4 py-24 text-center md:px-8 lg:px-16">
                    <div className="bg-secondary mx-auto max-w-3xl rounded-2xl border border-white/10 p-12">
                        <h1 className="text-3xl font-bold">
                            Air Conditioning Maintenance
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
