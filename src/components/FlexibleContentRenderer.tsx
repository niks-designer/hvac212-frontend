"use client";

import { HeroBanner } from "./common/HeroBanner";
import { InnerPageHeroBanner } from "./common/InnerPageHeroBanner";
import { ServicesGrid } from "./sections/ServicesGrid";
import SectionHeading from "./common/SectionHeading";
import { CenterImageSection } from "./sections/CenterImageSection";
import { FAQSection } from "./sections/FAQSection";
import { TestimonialsSection } from "./sections/TestimonialsSection";
import TrustedBrands from "./sections/TrustedBrands";
import OurApproach from "./sections/OurApproach";
import HeadingWithBottomAction from "./sections/HeadingWithBottomAction";
import SelectHVACSystem from "./sections/SelectHVACSystem";
import { ReactNode } from "react";
import type { HeroSectionTitleDescription } from "@/lib/wordpress";

interface ACFFlexibleContent {
    acf_fc_layout: string;
    [key: string]: unknown;
}

interface FlexibleContentRendererProps {
    sections: ACFFlexibleContent[];
    // allow either an object map or a JSON string (string is a fallback when serialization fails)
    sectionClassNames?: Record<string, string> | string;
}

export function FlexibleContentRenderer({
    sections,
    sectionClassNames = {},
}: FlexibleContentRendererProps) {
    // Normalize sectionClassNames to an object map at runtime
    let sectionClassMap: Record<string, string> = {};
    try {
        if (typeof sectionClassNames === "string") {
            sectionClassMap = JSON.parse(sectionClassNames || "{}");
        } else if (typeof sectionClassNames === "object" && sectionClassNames !== null) {
            sectionClassMap = sectionClassNames as Record<string, string>;
        }
    } catch (e) {
        // parsing failed — fall back to empty map
        // eslint-disable-next-line no-console
        console.warn("FlexibleContentRenderer: failed to parse sectionClassNames", e);
        sectionClassMap = {};
    }
    if (!sections || sections.length === 0) {
        return (
            <div className="py-12 text-center">
                No content available
            </div>
        );
    }

    const renderSection = (
        section: ACFFlexibleContent,
        index: number
    ): ReactNode => {
        const layout = section.acf_fc_layout;

        switch (layout) {
            case "hero_banner":
                return (
                    <HeroBanner
                        key={index}
                        heroSectionTitle={
                            section.hero_section_title as
                                HeroSectionTitleDescription | undefined
                        }
                        backgroundImage={section.background_image as any}
                        ctaButtons={section.cta_buttons as any}
                        primary_button={section.primary_button as any}
                        secondary_button={section.secondary_button as any}
                        className={sectionClassMap?.[layout]}
                    />
                );

            case "inner_page_hero_banner":
                return (
                    <InnerPageHeroBanner
                        key={index}
                        title={section.ihs_title as
                            HeroSectionTitleDescription | undefined}
                        backgroundImage={section.ihs_bgimg as any}
                        ctaButtons={section.ihs_cta_buttons as any}
                        className={sectionClassMap?.[layout]}
                    />
                );

            case "services_grid":
                return (
                    <ServicesGrid
                        key={index}
                        section_title={section.section_title as string}
                        sectionTitle={section.service_grid_title as any}
                        cards={section.cards as any}
                        className={sectionClassMap?.[layout]}
                    />
                );

            case "section_heading":
                return (
                    <SectionHeading
                        key={index}
                        sectionTitle={
                            section.section_block_section_title as any
                        }
                        title={section.title as string}
                        description={section.description as string}
                        ctaButtons={section.section_cta_buttons as any}
                        className={sectionClassMap?.[layout]}
                    />
                );

            case "heading_with_bottom_action":
                return (
                    <HeadingWithBottomAction
                        key={index}
                        title={section.hwba_title as
                            HeroSectionTitleDescription | undefined}
                        bottomAction={section.hwba_bottom_action as string}
                        ctaButtons={section.hwba_cta_buttons as any}
                        className={sectionClassMap?.[layout]}
                    />
                );

            case "select_hvac_system":
                return (
                    <SelectHVACSystem
                        key={index}
                        sectionTitle={section.shs_title as
                            HeroSectionTitleDescription | undefined}
                        items={section.add_system as any}
                        className={sectionClassMap?.[layout]}
                    />
                );

            case "center_image": {
                const imageSectionTitle = section.image_section_title as
                    { title?: string; short_description?: string } | undefined;

                return (
                    <CenterImageSection
                        key={index}
                        title={imageSectionTitle?.title as string | undefined}
                        description={
                            imageSectionTitle?.short_description as
                                string | undefined
                        }
                        image={section.add_image as any}
                        className={sectionClassMap?.[layout]}
                    />
                );
            }

            case "faq":
                return (
                    <FAQSection
                        key={index}
                        faq_section_title={
                            section.faq_section_title as
                                HeroSectionTitleDescription | undefined
                        }
                        faqs={section.faqs as any}
                        className={sectionClassMap?.[layout]}
                    />
                );

            case "testimonials":
                return (
                    <TestimonialsSection
                        key={index}
                        testimonial_section_title={
                            section.testimonial_section_title as
                                HeroSectionTitleDescription | undefined
                        }
                        testimonials={section.testimonials as any}
                        review_platforms={section.review_platforms as any}
                        className={sectionClassMap?.[layout]}
                    />
                );

            case "trusted_brands":
                return (
                    <TrustedBrands
                        key={index}
                        brand_logos={section.brand_logos as any}
                        className={sectionClassMap?.[layout]}
                    />
                );

            case "our_approach":
                return (
                    <OurApproach
                        key={index}
                        approach_section_title={
                            section.approach_section_title as any
                        }
                        left_image={section.left_image as any}
                        approach_items={section.approach_items as any}
                        bottom_description={
                            section.bottom_description as string
                        }
                        className={sectionClassMap?.[layout]}
                    />
                );

            default:
                console.warn(`Unknown layout: ${layout}`);
                return (
                    <div
                        key={index}
                        className="py-12 text-center"
                    >
                        Unknown section type: {layout}
                    </div>
                );
        }
    };

    return (
        <div>
            {sections.map((section, index) => renderSection(section, index))}
        </div>
    );
}
