"use client";

import { HeroBanner } from "./HeroBanner";
import { ServicesGrid } from "./ServicesGrid";
import SectionHeading from "./SectionHeading";
import { CenterImageSection } from "./CenterImageSection";
import { ReactNode } from "react";
import type { HeroSectionTitleDescription } from "@/lib/wordpress";

interface ACFFlexibleContent {
    acf_fc_layout: string;
    [key: string]: unknown;
}

interface FlexibleContentRendererProps {
    sections: ACFFlexibleContent[];
}

export function FlexibleContentRenderer({
    sections,
}: FlexibleContentRendererProps) {
    if (!sections || sections.length === 0) {
        return (
            <div
                className="py-12 text-center"
                style={{ color: "var(--color-muted)" }}
            >
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
                    />
                );

            case "services_grid":
                return (
                    <ServicesGrid
                        key={index}
                        section_title={section.section_title as string}
                        sectionTitle={section.service_grid_title as any}
                        cards={section.cards as any}
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
                    />
                );
            }

            default:
                console.warn(`Unknown layout: ${layout}`);
                return (
                    <div
                        key={index}
                        className="py-12 text-center"
                        style={{ color: "var(--color-muted)" }}
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
