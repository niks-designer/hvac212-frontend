"use client";

import { useState, useRef, useEffect } from "react";
import type { HeroSectionTitleDescription } from "@/lib/wordpress";

interface FAQ {
    question: string;
    answer: string;
}

interface FAQSectionProps {
    faq_section_title?: HeroSectionTitleDescription | null;
    faqs?: FAQ[];
    className?: string;
}

export function FAQSection({
    faq_section_title,
    faqs,
    className,
}: FAQSectionProps) {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const title = faq_section_title?.title?.trim() || "FAQ";
    const description = faq_section_title?.short_description?.trim() || "";

    const toggleAccordion = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    if (!faqs || faqs.length === 0) {
        return null;
    }

    return (
        <section className={`${className || "pt-0 pb-10 lg:pb-30"}`}>
            <div className="container">
                {/* Section Header */}
                <div className="sec-ttl mx-auto mb-6 space-y-5 text-center">
                    {title && <h2 className="h2-title">{title}</h2>}

                    {description && (
                        <div
                            className="fs-19"
                            dangerouslySetInnerHTML={{
                                __html: description,
                            }}
                        />
                    )}
                </div>

                {/* FAQ Grid */}
                <div className="flex flex-wrap justify-center gap-5 xl:gap-10">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="w-[calc(50%-10px)] lg:w-[calc(25%-30px)]"
                        >
                            <AccordionItem
                                faq={faq}
                                index={index}
                                expanded={expandedIndex === index}
                                onToggle={() => toggleAccordion(index)}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function AccordionItem({
    faq,
    index,
    expanded,
    onToggle,
}: {
    faq: FAQ;
    index: number;
    expanded: boolean;
    onToggle: () => void;
}) {
    const contentRef = useRef<HTMLDivElement | null>(null);
    const [maxHeight, setMaxHeight] = useState("0px");

    /*
     * Calculate the actual answer height.
     * ResizeObserver also handles changes caused by:
     * - responsive width
     * - font loading
     * - text wrapping
     * - dynamic HTML content
     */
    useEffect(() => {
        const updateHeight = () => {
            if (!contentRef.current) {
                return;
            }

            if (expanded) {
                setMaxHeight(`${contentRef.current.scrollHeight}px`);
            } else {
                setMaxHeight("0px");
            }
        };

        updateHeight();

        const frame = requestAnimationFrame(updateHeight);

        return () => {
            cancelAnimationFrame(frame);
        };
    }, [expanded, faq.answer]);

    /*
     * Keep the height synchronized if the answer content
     * changes after the initial calculation.
     */
    useEffect(() => {
        if (!expanded || !contentRef.current) {
            return;
        }

        const resizeObserver = new ResizeObserver(() => {
            if (contentRef.current) {
                setMaxHeight(`${contentRef.current.scrollHeight}px`);
            }
        });

        resizeObserver.observe(contentRef.current);

        return () => {
            resizeObserver.disconnect();
        };
    }, [expanded]);

    return (
        <div className="bg-testimonial flex h-full flex-col items-center justify-start rounded-2xl p-3 text-center transition-colors duration-300 md:p-5 lg:p-8">
            {/* Quote Icon */}
            <div className="mb-4 text-6xl font-bold lg:mb-6">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="54"
                    height="89"
                    viewBox="0 0 54 89"
                    fill="none"
                    className="h-12 w-8 md:h-auto md:w-auto"
                >
                    <path
                        d="M20.0752 76.25H31.9297V88.6406H20.0752V76.25ZM0 28.5342C0 19.9561 2.42253 13.0658 7.26758 7.86328C12.1126 2.62109 18.7646 0 27.2236 0C35.0472 0 41.3021 2.24382 45.9883 6.73145C50.7142 11.1794 53.0771 16.8783 53.0771 23.8281C53.0771 28.0378 52.2035 31.4531 50.4561 34.0742C48.7484 36.6953 45.2734 40.5475 40.0312 45.6309C36.2188 49.3242 33.7367 52.4616 32.585 55.043C31.473 57.5846 30.917 61.3574 30.917 66.3613H20.3135C20.3135 60.6823 20.9886 56.1152 22.3389 52.6602C23.6891 49.1654 26.6478 45.1742 31.2148 40.6865L35.9805 35.9805C37.4102 34.6302 38.5618 33.2204 39.4355 31.751C41.0241 29.1696 41.8184 26.4889 41.8184 23.709C41.8184 19.8171 40.6468 16.4414 38.3037 13.582C36.0003 10.7227 32.168 9.29297 26.8066 9.29297C20.1745 9.29297 15.5876 11.7552 13.0459 16.6797C11.6162 19.4199 10.8021 23.3714 10.6035 28.5342H0Z"
                        fill="#00BFFF"
                    />
                </svg>
            </div>

            {/* Question */}
            <h3
                className="mb-auto text-base leading-5 font-bold lg:text-[26px] lg:leading-8"
                dangerouslySetInnerHTML={{
                    __html: faq.question,
                }}
            />

            {/* Answer */}
            <div
                ref={contentRef}
                className="w-full overflow-hidden"
                style={{
                    maxHeight,
                    opacity: expanded ? 1 : 0,
                    transition: "max-height 350ms ease, opacity 250ms ease",
                }}
            >
                <div
                    className="md:text-md pt-5 text-sm"
                    dangerouslySetInnerHTML={{
                        __html: faq.answer,
                    }}
                />
            </div>

            {/* Button */}
            <button
                type="button"
                onClick={onToggle}
                className="theme-btn"
                style={{
                    marginTop: "20px",
                    backgroundColor: expanded ? "var(--color-white)" : "",
                    color: expanded ? "#070F1D" : "",
                }}
            >
                {expanded ? "Close" : "Find Out"}
            </button>
        </div>
    );
}
