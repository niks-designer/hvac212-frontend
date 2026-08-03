"use client";

import type { HeroSectionTitleDescription } from "@/lib/wordpress";

interface WhyChooseUsFeatureItem {
    wcuf_title?: string;
    wcuf_description?: string;
}

interface WhyChooseUsProps {
    wcu_title?: HeroSectionTitleDescription | null;
    features_lists?: WhyChooseUsFeatureItem[] | null;
    wcu_bottom_action?: string | null;
    className?: string;
    contentClassName?: string;
}

const DEFAULT_TITLE = "The 212 HVAC Standard";

const DEFAULT_FEATURES: WhyChooseUsFeatureItem[] = [
    {
        wcuf_title: "A+ Rated Service",
        wcuf_description: "Proudly recognized by the Better Business Bureau",
    },
    {
        wcuf_title: "Complete Diagnostics",
        wcuf_description:
            "Thorough evaluations for heating and cooling systems",
    },
    {
        wcuf_title: "Detailed Safety Inspections",
        wcuf_description: "Identifying leaks cracks and air flow issues",
    },
    {
        wcuf_title: "Preventive Maintenance",
        wcuf_description: "Essential system tuning to prevent future repairs",
    },
    {
        wcuf_title: "Certified Expertise",
        wcuf_description:
            "All repairs performed by licensed and insured technicians",
    },
];

export default function WhyChooseUs({
    wcu_title,
    features_lists,
    wcu_bottom_action,
    className,
    contentClassName,
}: WhyChooseUsProps) {
    const title = wcu_title?.title?.trim() || "";
    const description = wcu_title?.short_description?.trim() || "";
    const features = Array.isArray(features_lists) ? features_lists : [];
    const bottomAction = wcu_bottom_action?.trim() || "";
    const displayTitle = title || DEFAULT_TITLE;
    const displayDescription = description;
    const displayFeatures = features.length > 0 ? features : DEFAULT_FEATURES;

    return (
        <section className={`${className || "py-10 lg:py-16"}`}>
            <div className="container">
                <div className="mx-auto max-w-5xl">
                    {(displayTitle || displayDescription) && (
                        <div className="sec-ttl mb-6 space-y-4 text-center lg:mb-10 lg:space-y-5">
                            {displayTitle && (
                                <h2 className="h2-title">{displayTitle}</h2>
                            )}
                            {displayDescription && (
                                <div
                                    className="prose fs-19"
                                    dangerouslySetInnerHTML={{
                                        __html: displayDescription,
                                    }}
                                />
                            )}
                        </div>
                    )}

                    {displayFeatures.length > 0 && (
                        <div
                            className={`mx-auto w-fit space-y-5 ${
                                contentClassName || "max-w-175"
                            }`}
                        >
                            {displayFeatures.map((feature, index) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-3 sm:gap-4 lg:gap-5"
                                >
                                    <span className="shrink-0 pt-1">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6 sm:h-7 sm:w-7 md:h-7 md:w-7 lg:h-9 lg:w-9"
                                            viewBox="0 0 38 36"
                                            fill="none"
                                            aria-hidden="true"
                                        >
                                            <g
                                                clipPath={`url(#why-choose-us-check-${index})`}
                                            >
                                                <path
                                                    d="M37.7757 1.1993C30.424 8.26928 22.925 18.5338 13.4693 34.5264C12.6141 35.9709 10.7771 36.4322 9.36626 35.5566C8.86697 35.2468 8.46729 34.794 8.21664 34.2541C5.69956 28.9005 3.03999 23.5178 0.256962 21.6652C0.0971863 21.5575 0.000869606 21.3749 0.000514942 21.179C-0.00561568 20.9685 0.092677 20.769 0.261725 20.649C1.11272 19.9854 2.14218 19.6052 3.21099 19.5598C3.50011 19.5604 3.78833 19.593 4.07059 19.6571C6.07951 20.1433 8.06467 22.2731 10.3301 26.3867C10.5059 26.7044 10.9001 26.8161 11.2104 26.6361C11.2922 26.5886 11.363 26.5234 11.4176 26.445C21.6047 11.7216 29.7496 3.33877 37.0633 0.061497C37.3602 -0.0795228 37.7132 0.0291275 37.885 0.314331C38.073 0.594996 38.0261 0.975363 37.7757 1.1993H37.7757Z"
                                                    fill="#00BFFF"
                                                />
                                            </g>
                                            <defs>
                                                <clipPath
                                                    id={`why-choose-us-check-${index}`}
                                                >
                                                    <rect
                                                        width="38"
                                                        height="36"
                                                        fill="white"
                                                    />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </span>

                                    <div className="min-w-0 flex-1 text-left">
                                        {feature.wcuf_title && (
                                            <h3 className="text-xl leading-tight font-bold sm:text-2xl lg:text-[28px]">
                                                {feature.wcuf_title}
                                            </h3>
                                        )}

                                        {feature.wcuf_description && (
                                            <div
                                                className="prose mt-1 max-w-none text-base sm:mt-2 lg:text-[21px]"
                                                dangerouslySetInnerHTML={{
                                                    __html: feature.wcuf_description,
                                                }}
                                            />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {bottomAction && (
                        <div
                            className="action-link mt-6 text-center text-2xl font-bold lg:mt-10 lg:text-4xl"
                            dangerouslySetInnerHTML={{
                                __html: bottomAction,
                            }}
                        />
                    )}
                </div>
            </div>
        </section>
    );
}
