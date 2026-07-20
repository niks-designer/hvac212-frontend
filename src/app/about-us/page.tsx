export const dynamic = "force-dynamic";

import { FlexibleContentRenderer } from "@/components/FlexibleContentRenderer";
import { getPageContentBySlug } from "@/lib/wordpress";

export default async function AboutUsPage() {
  const flexibleContent = await getPageContentBySlug("about-us");

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--color-background)" }}>
      {flexibleContent.length > 0 ? (
        <FlexibleContentRenderer sections={flexibleContent} />
      ) : (
        <section className="px-4 py-24 text-center md:px-8 lg:px-16">
          <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 p-12" style={{ backgroundColor: "var(--color-surface)" }}>
            <h1 className="text-3xl font-bold" style={{ color: "var(--color-heading)" }}>
              About Us
            </h1>
            <p className="mt-4" style={{ color: "var(--color-muted)" }}>
              Content for this page will appear here once it is added in WordPress.
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
