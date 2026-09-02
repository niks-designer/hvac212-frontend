export const dynamic = "force-dynamic";
import Image from "next/image";
import Script from "next/script";
import { getPageContentBySlug, getPosts } from "@/lib/wordpress";
import { FlexibleContentRenderer } from "@/components/FlexibleContentRenderer";
import { generatePageMetadata } from "@/lib/seo";

export async function generateMetadata() {
    return generatePageMetadata("home");
}

export default async function Home() {
    const posts = await getPosts(10);
    const flexibleContent = await getPageContentBySlug("home");

    return (
        <div className="min-h-screen">
            <div className="pointer-events-none absolute inset-0 -z-50 blur-[50px] in-[.light]:hidden">
                <Image
                    src="/images/page-bg/home-bg.webp"
                    alt="AirCare"
                    fill
                    priority
                    className="object-cover object-top"
                />
            </div>
            {/* ACF Flexible Content Sections */}
            {flexibleContent.length > 0 && (
                <FlexibleContentRenderer
                    sections={flexibleContent}
                    sectionClassNames={JSON.stringify({
                        services_grid: "",
                        center_image: "py-8",
                    })}
                />
            )}
            <Script id="smooth-anchor">
                {`
                document.addEventListener("click",e=>{
                const a=e.target.closest("a[href^='#']");
                if(!a)return;
                const el=document.querySelector(a.getAttribute("href"));
                if(!el)return;
                e.preventDefault();
                el.scrollIntoView({behavior:"smooth"});
                history.replaceState(null,"",location.pathname+location.search);
                });
                `}
            </Script>
        </div>
    );
}
