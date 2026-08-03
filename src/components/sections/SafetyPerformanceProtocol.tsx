"use client";

import type { HeroSectionTitleDescription } from "@/lib/wordpress";

interface SafetyChecklistItem {
    checklist_text?: string;
}

interface SafetyCategory {
    category_title?: string;
    safety_checklist?: SafetyChecklistItem[] | null;
}

interface SafetyPerformanceProtocolProps {
    safety_title?: HeroSectionTitleDescription | null;
    safety_categories?: SafetyCategory[] | null;
    className?: string;
}

const DEFAULT_SAFETY_TITLE: HeroSectionTitleDescription = {
    title: "Safety & Performance Protocol",
    short_description:
        "Included with every membership. Our specialists thoroughly review the core <br>components of your forced-air system.",
};

const DEFAULT_SAFETY_CATEGORIES: SafetyCategory[] = [
    {
        category_title: "Electrical & Safety Audit",
        safety_checklist: [
            {
                checklist_text:
                    "<b>Test</b> compressor operating voltage <br>and amperage",
            },
            { checklist_text: "<b>Inspect</b> electrical disconnect switch" },
            { checklist_text: "<b>Verify</b> all electrical connections" },
            { checklist_text: "<b>Test</b> thermostat and remote control" },
            {
                checklist_text:
                    "<b>Review</b> safety controls and ignition components",
            },
        ],
    },
    {
        category_title: "Mechanical & Motor Review",
        safety_checklist: [
            {
                checklist_text:
                    "<b>Review</b> condenser blade and motor bearings",
            },
            { checklist_text: "<b>Inspect</b> crankcase heater" },
            { checklist_text: "<b>Lubricate and review</b> all motors" },
            { checklist_text: "<b>Review</b> blower wheel and bearings" },
            {
                checklist_text:
                    "<b>Monitor</b> indoor evaporator <br>discharge temperature",
            },
        ],
    },
    {
        category_title: "Airflow & System Performance",
        safety_checklist: [
            {
                checklist_text:
                    "<b>Clean or Replace</b> air filters (filters <br>not included)",
            },
            { checklist_text: "<b>Inspect and Clean</b> evaporator coil" },
            { checklist_text: "<b>Inspect and Clean</b> condenser coil" },
            { checklist_text: "<b>Flush and Drain</b> condensate pump" },
            {
                checklist_text:
                    "<b>Verify</b> refrigerant charge and <br>operating pressures",
            },
        ],
    },
];

function CheckIconSmall() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 sm:h-7 sm:w-7 md:h-7 md:w-7 lg:h-9 lg:w-9"
            width="38"
            height="36"
            viewBox="0 0 38 36"
            fill="none"
        >
            <g clipPath="url(#clip0_1575_1076)">
                <path
                    d="M37.7755 1.1993C30.4237 8.26928 22.9247 18.5338 13.469 34.5264C12.6139 35.9709 10.7769 36.4322 9.36601 35.5566C8.86672 35.2468 8.46704 34.794 8.2164 34.2541C5.69932 28.9005 3.03974 23.5178 0.256718 21.6652C0.0969421 21.5575 0.000625466 21.3749 0.000270801 21.179C-0.00585982 20.9685 0.0924328 20.769 0.261481 20.649C1.11247 19.9854 2.14194 19.6052 3.21074 19.5598C3.49987 19.5604 3.78808 19.593 4.07035 19.6571C6.07927 20.1433 8.06442 22.2731 10.3298 26.3867C10.5057 26.7044 10.8998 26.8161 11.2102 26.6361C11.292 26.5886 11.3627 26.5234 11.4174 26.445C21.6044 11.7216 29.7493 3.33877 37.0631 0.061497C37.36 -0.0795228 37.713 0.0291275 37.8847 0.314331C38.0728 0.594996 38.0258 0.975363 37.7755 1.1993H37.7755Z"
                    fill="#00BFFF"
                />
            </g>
            <defs>
                <clipPath id="clip0_1575_1076">
                    <rect width="38" height="36" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
}

export default function SafetyPerformanceProtocol({
    safety_title,
    safety_categories,
    className,
}: SafetyPerformanceProtocolProps) {
    const hasContent = (value?: string | null) => Boolean(value?.trim());

    const wordpressTitle = safety_title?.title?.trim() || "";
    const wordpressDescription = safety_title?.short_description?.trim() || "";
    const wordpressCategoriesRaw = Array.isArray(safety_categories)
        ? safety_categories
        : [];
    const title = wordpressTitle || DEFAULT_SAFETY_TITLE.title || "";
    const description =
        wordpressDescription || DEFAULT_SAFETY_TITLE.short_description || "";

    const getValidChecklist = (items?: SafetyChecklistItem[] | null) =>
        (Array.isArray(items) ? items : []).filter((item) =>
            hasContent(item?.checklist_text)
        );

    const categoryCount = Math.max(
        wordpressCategoriesRaw.length,
        DEFAULT_SAFETY_CATEGORIES.length
    );

    const categories = Array.from(
        { length: categoryCount },
        (_, categoryIdx) => {
            const wpCategory = wordpressCategoriesRaw[categoryIdx];
            const defaultCategory = DEFAULT_SAFETY_CATEGORIES[categoryIdx];

            const wpChecklist = getValidChecklist(wpCategory?.safety_checklist);
            const defaultChecklist = getValidChecklist(
                defaultCategory?.safety_checklist
            );

            const hasWordPressCategory =
                Boolean(wpCategory) &&
                (hasContent(wpCategory?.category_title) ||
                    wpChecklist.length > 0);

            if (hasWordPressCategory) {
                return {
                    category_title: wpCategory?.category_title || "",
                    safety_checklist:
                        wpChecklist.length > 0 ? wpChecklist : defaultChecklist,
                };
            }

            return {
                category_title: defaultCategory?.category_title || "",
                safety_checklist: defaultChecklist,
            };
        }
    ).filter((category) => {
        const hasCategoryTitle = hasContent(category.category_title);
        const hasChecklist = Array.isArray(category.safety_checklist)
            ? category.safety_checklist.some((item) =>
                  hasContent(item?.checklist_text)
              )
            : false;

        return hasCategoryTitle || hasChecklist;
    });

    if (!title && !description && categories.length === 0) {
        return null;
    }

    return (
        <section className={`${className || "py-10 lg:py-16"}`}>
            <div className="container">
                <div className="sec-ttl mx-auto space-y-5 text-center">
                    {title && <h2 className="h2-title">{title}</h2>}
                    {description && (
                        <div
                            className="prose fs-19"
                            dangerouslySetInnerHTML={{ __html: description }}
                        />
                    )}
                </div>

                <div className="mt-12 grid gap-6 md:grid-cols-3">
                    {categories.map((cat, idx) => (
                        <div key={idx} className="text-left">
                            {cat.category_title && (
                                <h3 className="text-blue mb-7 text-lg font-bold lg:text-2xl">
                                    {cat.category_title}
                                </h3>
                            )}

                            <div className="space-y-4">
                                {(cat.safety_checklist || []).map((item, i) => (
                                    <div
                                        key={i}
                                        className="flex items-start gap-3"
                                    >
                                        <span className="shrink-0">
                                            <CheckIconSmall />
                                        </span>
                                        <div className="min-w-0 flex-1">
                                            <p
                                                className="text-md leading-7 lg:text-[19px]"
                                                dangerouslySetInnerHTML={{
                                                    __html:
                                                        item.checklist_text ||
                                                        "",
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
