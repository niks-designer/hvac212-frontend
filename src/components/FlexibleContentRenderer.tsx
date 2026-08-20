"use client";

import { HeroBanner } from "./common/HeroBanner";
import { InnerPageHeroBanner } from "./common/InnerPageHeroBanner";
import { ServicesGrid } from "./sections/ServicesGrid";
import SectionHeading from "./common/SectionHeading";
import { CenterImageSection } from "./sections/CenterImageSection";
import { FAQSection } from "./sections/FAQSection";
import { TestimonialsSection } from "./sections/TestimonialsSection";
import TrustedBrands from "./sections/TrustedBrands";
import CompatibleHVACBrands from "./sections/CompatibleHVACBrands";
import OurApproach from "./sections/OurApproach";
import HeadingWithBottomAction from "./sections/HeadingWithBottomAction";
import SelectHVACSystem from "./sections/SelectHVACSystem";
import WhyChooseUs from "./sections/WhyChooseUs";
import SystemReplacementSigns from "./sections/SystemReplacementSigns";
import HVACProcess from "./sections/HVACProcess";
import TroubleshootingGuide from "./sections/TroubleshootingGuide";
import MaintenancePlans from "./sections/MaintenancePlans";
import MaintenanceTerms from "./sections/MaintenanceTerms";
import SafetyPerformanceProtocol from "./sections/SafetyPerformanceProtocol";
import LicensesAndInsurance from "./sections/LicensesAndInsurance";
import { ErrorCodeButtons } from "./sections/ErrorCodeButtons";
import { ReactNode } from "react";
import type {
    HeroSectionTitleDescription,
    WhyChooseUsFeatureItem,
    SystemReplacementSignsItem,
} from "@/lib/wordpress";

interface ACFFlexibleContent {
    acf_fc_layout: string;
    [key: string]: unknown;
}

interface SectionClassConfig {
    className?: string | string[];
    contentClassName?: string | string[];
}

type SectionClassValue = string | string[] | SectionClassConfig;

interface FlexibleContentRendererProps {
    sections: ACFFlexibleContent[];
    // allow either an object map or a JSON string (string is a fallback when serialization fails)
    // values can be single strings or arrays of strings for multiple occurrences of the same layout
    sectionClassNames?: Record<string, SectionClassValue> | string;
}

export function FlexibleContentRenderer({
    sections,
    sectionClassNames = {},
}: FlexibleContentRendererProps) {
    // Normalize sectionClassNames to an object map at runtime
    let sectionClassMap: Record<string, SectionClassValue> = {};
    try {
        if (typeof sectionClassNames === "string") {
            sectionClassMap = JSON.parse(sectionClassNames || "{}");
        } else if (
            typeof sectionClassNames === "object" &&
            sectionClassNames !== null
        ) {
            sectionClassMap = sectionClassNames as Record<
                string,
                SectionClassValue
            >;
        }
    } catch (e) {
        // parsing failed — fall back to empty map
        // eslint-disable-next-line no-console
        console.warn(
            "FlexibleContentRenderer: failed to parse sectionClassNames",
            e
        );
        sectionClassMap = {};
    }
    if (!sections || sections.length === 0) {
        return <div className="py-12 text-center">No content available</div>;
    }

    // Track occurrence index for each layout to support array-based classes
    const layoutIndexes: Record<string, number> = {};

    // Helper function to get the appropriate class for a layout
    const getLayoutConfig = (
        layout: string
    ): {
        className?: string;
        contentClassName?: string;
    } => {
        const classValue = sectionClassMap?.[layout];

        if (!classValue) {
            return {};
        }

        // If it's a plain string, use it as the outer class name
        if (typeof classValue === "string") {
            return { className: classValue };
        }

        // If it's an array, get the class at the current index for this layout
        if (Array.isArray(classValue)) {
            const currentIndex = layoutIndexes[layout] || 0;
            return { className: classValue[currentIndex] || "" };
        }

        const currentIndex = layoutIndexes[layout] || 0;
        const resolvedClassName = Array.isArray(classValue.className)
            ? classValue.className[currentIndex] || ""
            : classValue.className;
        const resolvedContentClassName = Array.isArray(
            classValue.contentClassName
        )
            ? classValue.contentClassName[currentIndex] || ""
            : classValue.contentClassName;

        return {
            className: resolvedClassName,
            contentClassName: resolvedContentClassName,
        };
    };

    const renderSection = (
        section: ACFFlexibleContent,
        index: number
    ): ReactNode => {
        const layout = section.acf_fc_layout;

        // Get the class for this occurrence and increment the index for next time
        const { className, contentClassName } = getLayoutConfig(layout);
        layoutIndexes[layout] = (layoutIndexes[layout] || 0) + 1;

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
                        select_bg_video={section.select_bg_video as any}
                        ctaButtons={section.cta_buttons as any}
                        primary_button={section.primary_button as any}
                        secondary_button={section.secondary_button as any}
                        className={className}
                    />
                );

            case "inner_page_hero_banner":
                return (
                    <InnerPageHeroBanner
                        key={index}
                        title={
                            section.ihs_title as
                                HeroSectionTitleDescription | undefined
                        }
                        backgroundImage={section.ihs_bgimg as any}
                        ctaButtons={section.ihs_cta_buttons as any}
                        className={className}
                    />
                );

            case "services_grid":
                return (
                    <ServicesGrid
                        key={index}
                        section_title={section.section_title as string}
                        sectionTitle={section.service_grid_title as any}
                        cards={section.cards as any}
                        className={className}
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
                        className={className}
                    />
                );

            case "heading_with_bottom_action":
                return (
                    <HeadingWithBottomAction
                        key={index}
                        title={
                            section.hwba_title as
                                HeroSectionTitleDescription | undefined
                        }
                        bottomAction={section.hwba_bottom_action as string}
                        ctaButtons={section.hwba_cta_buttons as any}
                        className={className}
                    />
                );

            case "select_hvac_system":
                return (
                    <SelectHVACSystem
                        key={index}
                        sectionTitle={
                            section.shs_title as
                                HeroSectionTitleDescription | undefined
                        }
                        items={section.add_system as any}
                        className={className}
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
                        className={className}
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
                        className={className}
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
                        className={className}
                    />
                );

            case "trusted_brands":
                return (
                    <TrustedBrands
                        key={index}
                        brands_title={
                            section.brands_title as
                                | { title?: string; short_description?: string }
                                | undefined
                        }
                        brand_logos={section.brand_logos as any}
                        className={className}
                    />
                );

            case "compatible_hvac_brands":
                return (
                    <CompatibleHVACBrands
                        key={index}
                        chs_title={
                            section.chs_title as
                                | { title?: string; short_description?: string }
                                | undefined
                        }
                        chs_logos={section.chs_logos as any}
                        className={className}
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
                        className={className}
                    />
                );

            case "why_choose_us":
                return (
                    <WhyChooseUs
                        key={index}
                        wcu_title={
                            section.wcu_title as
                                HeroSectionTitleDescription | undefined
                        }
                        features_lists={
                            section.features_lists as
                                WhyChooseUsFeatureItem[] | undefined
                        }
                        wcu_bottom_action={
                            section.wcu_bottom_action as string | undefined
                        }
                        className={className}
                        contentClassName={contentClassName}
                    />
                );

            case "system_replacement_signs":
                return (
                    <SystemReplacementSigns
                        key={index}
                        srs_title={
                            section.srs_title as
                                HeroSectionTitleDescription | undefined
                        }
                        replacement_lists={
                            section.replacement_lists as
                                SystemReplacementSignsItem[] | undefined
                        }
                        bottom_description={
                            section.bottom_description as string | undefined
                        }
                        srs_bottom_action={
                            section.srs_bottom_action as string | undefined
                        }
                        srs_cta_buttons={section.srs_cta_buttons as any}
                        secondary_title={
                            section.secondary_title as string | undefined
                        }
                        className={className}
                        contentClassName={contentClassName}
                    />
                );

            case "hvac_process":
                return (
                    <HVACProcess
                        key={index}
                        process_title={
                            section.process_title as
                                | { title?: string; short_description?: string }
                                | undefined
                        }
                        process_step={section.process_step as any}
                        process_cta={section.process_cta as any}
                        className={className}
                    />
                );

            case "troubleshooting_guide":
                return (
                    <TroubleshootingGuide
                        key={index}
                        trouble_title={
                            section.trouble_title as
                                HeroSectionTitleDescription | undefined
                        }
                        safe_checks={section.safe_checks as any}
                        warning_signs={section.warning_signs as any}
                        trouble_btm_description={
                            section.trouble_btm_description as
                                string | undefined
                        }
                        trouble_btm_action={
                            section.trouble_btm_action as string | undefined
                        }
                        trouble_cta_buttons={section.trouble_cta_buttons as any}
                        className={className}
                        contentClassName={contentClassName}
                    />
                );

            case "maintenance_plans":
                return (
                    <MaintenancePlans
                        key={index}
                        plans_title={
                            section.plans_title as
                                HeroSectionTitleDescription | undefined
                        }
                        plans={section.plans as any}
                        className={className}
                    />
                );

            case "safety_performance_protocol":
                return (
                    <SafetyPerformanceProtocol
                        key={index}
                        safety_title={
                            section.safety_title as
                                HeroSectionTitleDescription | undefined
                        }
                        safety_categories={section.safety_categories as any}
                        className={className}
                    />
                );

            case "licenses_and_insurance":
                return (
                    <LicensesAndInsurance
                        key={index}
                        licenses_item={section.licenses_item as any}
                        className={className}
                    />
                );

            case "maintenance_terms":
                return (
                    <MaintenanceTerms
                        key={index}
                        layout={
                            (section.layout as {
                                mt_link_text?: string;
                                mt_description?: string;
                            }) ?? undefined
                        }
                        mt_link_text={
                            section.mt_link_text as string | undefined
                        }
                        mt_description={
                            section.mt_description as string | undefined
                        }
                        termsPopupTitle={
                            section.termsPopupTitle as string | undefined
                        }
                        termsPopupContent={
                            section.termsPopupContent as string | undefined
                        }
                        enroll_button={section.enroll_button as any}
                    />
                );

            case "error_code_buttons":
                return (
                    <ErrorCodeButtons
                        key={index}
                        error_code_pages_list={
                            section.error_code_pages_list as any
                        }
                        className={className}
                    />
                );

            default:
                console.warn(`Unknown layout: ${layout}`);
                return (
                    <div key={index} className="py-12 text-center">
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
