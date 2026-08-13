export const dynamic = "force-dynamic";

import Image from "next/image";
import { FlexibleContentRenderer } from "@/components/FlexibleContentRenderer";
import { InnerPageHeroBanner } from "@/components/common/InnerPageHeroBanner";
import CareerForm from "@/components/contactpopup/CareerForm";
import { getPageContentBySlug } from "@/lib/wordpress";
import { generatePageMetadata } from "@/lib/seo";
import type { HeroSectionTitleDescription } from "@/lib/wordpress";

export async function generateMetadata() {
    return generatePageMetadata("careers");
}

export default async function CareersPage() {
    const flexibleContent = await getPageContentBySlug("careers");

    // Get the WP hero section separately
    const heroSection = flexibleContent.find(
        (section) => section.acf_fc_layout === "inner_page_hero_banner"
    );

    // Keep all other WP sections for below the Career Form
    const remainingSections = flexibleContent.filter(
        (section) => section.acf_fc_layout !== "inner_page_hero_banner"
    );

    return (
        <div className="relative min-h-screen overflow-hidden">
            <style>{`
                .positions-wrap .prose {
                    text-align: left;
                    margin: 0 auto;
                    width: fit-content;
                }
                .positions-wrap .prose h4 {
                    font-size: 34px;
                    line-height: 1.2;
                    margin: 40px 0 15px;
                }
                .positions-wrap .clr-blue {
                    color: #00bfff;
                }
                .action-link p {
                    font-size: 19px;
                    line-height: 1.5;
                    font-weight: 300;
                }
                @media (max-width: 768px) {
                    .positions-wrap .prose h4 {
                        font-size: 25px;
                    }
                }
            `}</style>
            {/* Careers Page Background */}
            <div className="pointer-events-none absolute inset-0 -z-50 blur-[50px] in-[.light]:hidden">
                <Image
                    src="/images/page-bg/careers-bg.webp"
                    alt="Careers"
                    fill
                    priority
                    className="object-cover object-center"
                />
            </div>

            {/* WordPress Hero Banner */}
            {heroSection && (
                <InnerPageHeroBanner
                    title={
                        heroSection.ihs_title as
                            HeroSectionTitleDescription | undefined
                    }
                    backgroundImage={heroSection.ihs_bgimg as any}
                    ctaButtons={heroSection.ihs_cta_buttons as any}
                />
            )}

            {/* Career Form */}
            <section className="relative py-10 lg:py-18">
                <div className="mx-auto max-w-5xl px-4">
                    <div className="sec-ttl mb-7 space-y-4 text-center lg:mb-10">
                        <h1 className="h2-title">How to Apply</h1>

                        <p className="fs-19">
                            Please send us your resume, a brief summary of your
                            field experience, and the Tier <br />
                            you are applying for by using the form below.
                        </p>
                    </div>

                    <CareerForm />
                </div>
            </section>

            {/* Remaining WordPress Content */}
            {remainingSections.length > 0 && (
                <FlexibleContentRenderer
                    sections={remainingSections}
                    sectionClassNames={{
                        system_replacement_signs: {
                            className: ["positions-wrap"],
                        },
                    }}
                />
            )}
        </div>
    );
}
