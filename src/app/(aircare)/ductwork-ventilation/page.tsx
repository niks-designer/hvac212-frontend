export const dynamic = "force-dynamic";

import { FlexibleContentRenderer } from "@/components/FlexibleContentRenderer";
import { getPageContentBySlug } from "@/lib/wordpress";
import { generatePageMetadata } from "@/lib/seo";

export async function generateMetadata() {
    return generatePageMetadata("ductwork-ventilation");
}

export default async function DuctworkVentilationPage() {
    const flexibleContent = await getPageContentBySlug("ductwork-ventilation");

    return (
        <div className="relative min-h-screen overflow-hidden bg-[url(/images/central-air-bg.webp)] bg-cover bg-position-[center_40%] bg-no-repeat in-[.light]:bg-none">
            {flexibleContent.length > 0 ? (
                <FlexibleContentRenderer
                    sections={flexibleContent}
                    sectionClassNames={{
                        heading_with_bottom_action: ["", "pt-10 lg:pt-16"],
                    }}
                />
            ) : (
                <section className="px-4 py-24 text-center md:px-8 lg:px-16">
                    <div className="bg-secondary mx-auto max-w-3xl rounded-2xl border border-white/10 p-12">
                        <h1 className="text-3xl font-bold">
                            Ductwork & Ventilation
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
