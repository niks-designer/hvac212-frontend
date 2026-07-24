export const dynamic = "force-dynamic";

import { FlexibleContentRenderer } from "@/components/FlexibleContentRenderer";
import { getPageContentBySlug } from "@/lib/wordpress";
import { generatePageMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return generatePageMetadata("about-us");
}

export default async function AboutUsPage() {
  const flexibleContent = await getPageContentBySlug("about-us");

  return (
    <div className="min-h-screen">
      {flexibleContent.length > 0 ? (
        <FlexibleContentRenderer
          sections={flexibleContent}
          sectionClassNames={{
              services_grid: "",
          }}
        />
      ) : (
        <section className="px-4 py-24 text-center md:px-8 lg:px-16">
          <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 p-12 bg-secondary">
            <h1 className="text-3xl font-bold" >
              About Us
            </h1>
            <p className="mt-4">
              Content for this page will appear here once it is added in WordPress.
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
