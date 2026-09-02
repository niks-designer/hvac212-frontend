export const dynamic = "force-dynamic";

import { FlexibleContentRenderer } from "@/components/FlexibleContentRenderer";
import { getPageContentBySlug } from "@/lib/wordpress";
import { generatePageMetadata } from "@/lib/seo";

export async function generateMetadata() {
    return generatePageMetadata("thank-you");
}

export default async function ThankYouPage() {
    const flexibleContent = await getPageContentBySlug("thank-you");

    return (
        <div className="min-h-screen">
            {flexibleContent.length > 0 ? (
                <FlexibleContentRenderer sections={flexibleContent} />
            ) : (
                <section className="px-4 py-24 text-center md:px-8 lg:px-16">
                    <div className="bg-secondary mx-auto max-w-3xl rounded-2xl border border-white/10 p-12">
                        <h1 className="text-3xl font-bold">Thank You</h1>
                        <p className="mt-4">
                            Thank you for contacting us. We will be in touch
                            soon.
                        </p>
                    </div>
                </section>
            )}
        </div>
    );
}