"use client";

import type { HeroSectionTitleDescription, LinkField } from "@/lib/wordpress";

interface SystemReplacementSignsItem {
    srs_title?: string;
    srs_description?: string;
}

interface SystemReplacementSignsProps {
    srs_title?: HeroSectionTitleDescription | null;
    replacement_lists?: SystemReplacementSignsItem[] | null;
    bottom_description?: string | null;
    srs_bottom_action?: string | null;
    srs_cta_buttons?: {
        primary_button?: LinkField;
        secondary_button?: LinkField;
    } | null;
    secondary_title?: string | null;
    className?: string;
    contentClassName?: string;
}

export default function SystemReplacementSigns({
    srs_title,
    replacement_lists,
    bottom_description,
    srs_bottom_action,
    srs_cta_buttons,
    secondary_title,
    className,
    contentClassName,
}: SystemReplacementSignsProps) {
    const title = srs_title?.title?.trim() || "";
    const description = srs_title?.short_description?.trim() || "";
    const items = Array.isArray(replacement_lists) ? replacement_lists : [];

    if (
        !title &&
        !description &&
        items.length === 0 &&
        !bottom_description &&
        !srs_bottom_action &&
        !secondary_title &&
        !srs_cta_buttons?.primary_button &&
        !srs_cta_buttons?.secondary_button
    ) {
        return null;
    }

    return (
        <section className={`${className || ""}`}>
            <div className="container px-0! md:px-4!">
                <div className="bg-[#ececec] px-6 py-10 sm:px-8 sm:py-12 md:rounded-3xl lg:px-12 lg:py-14 dark:bg-[#070F1D99]">
                    <div className="mx-auto">
                        {(title || description) && (
                            <div className="sec-ttl mx-auto space-y-5 text-center">
                                {title && (
                                    <h2
                                        className="h2-title"
                                        dangerouslySetInnerHTML={{
                                            __html: title,
                                        }}
                                    />
                                )}
                                {description && (
                                    <div
                                        className="prose fs-19"
                                        dangerouslySetInnerHTML={{
                                            __html: description,
                                        }}
                                    />
                                )}
                            </div>
                        )}

                        {items.length > 0 && (
                            <div
                                className={`mx-auto mt-10 w-fit space-y-5 ${
                                    contentClassName || "max-w-190"
                                }`}
                            >
                                {items.map((item, index) => (
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
                                                    clipPath={`url(#system-replacement-signs-check-${index})`}
                                                >
                                                    <path
                                                        d="M37.7757 1.1993C30.424 8.26928 22.925 18.5338 13.4693 34.5264C12.6141 35.9709 10.7771 36.4322 9.36626 35.5566C8.86697 35.2468 8.46729 34.794 8.21664 34.2541C5.69956 28.9005 3.03999 23.5178 0.256962 21.6652C0.0971863 21.5575 0.000869606 21.3749 0.000514942 21.179C-0.00561568 20.9685 0.092677 20.769 0.261725 20.649C1.11272 19.9854 2.14218 19.6052 3.21099 19.5598C3.50011 19.5604 3.78833 19.593 4.07059 19.6571C6.07951 20.1433 8.06467 22.2731 10.3301 26.3867C10.5059 26.7044 10.9001 26.8161 11.2104 26.6361C11.2922 26.5886 11.363 26.5234 11.4176 26.445C21.6047 11.7216 29.7496 3.33877 37.0633 0.061497C37.3602 -0.0795228 37.7132 0.0291275 37.885 0.314331C38.073 0.594996 38.0261 0.975363 37.7757 1.1993H37.7757Z"
                                                        fill="#00BFFF"
                                                    />
                                                </g>
                                                <defs>
                                                    <clipPath
                                                        id={`system-replacement-signs-check-${index}`}
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
                                            {item.srs_title && (
                                                <h3 className="text-xl leading-tight font-bold sm:text-2xl lg:text-[28px]">
                                                    {item.srs_title}
                                                </h3>
                                            )}

                                            {item.srs_description && (
                                                <div
                                                    className="prose mt-1 max-w-none text-base sm:mt-2 lg:text-[21px]"
                                                    dangerouslySetInnerHTML={{
                                                        __html: item.srs_description,
                                                    }}
                                                />
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {bottom_description && (
                            <div
                                className="prose fs-19 mt-10 text-center"
                                dangerouslySetInnerHTML={{
                                    __html: bottom_description,
                                }}
                            />
                        )}

                        {srs_bottom_action && (
                            <div
                                className="action-link mt-10 text-center text-2xl font-bold lg:text-4xl"
                                dangerouslySetInnerHTML={{
                                    __html: srs_bottom_action,
                                }}
                            />
                        )}

                        {srs_cta_buttons &&
                            (srs_cta_buttons.primary_button ||
                                srs_cta_buttons.secondary_button) && (
                                <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center lg:gap-6">
                                    {srs_cta_buttons.primary_button &&
                                        srs_cta_buttons.primary_button.url && (
                                            <a
                                                href={
                                                    srs_cta_buttons
                                                        .primary_button.url
                                                }
                                                target={
                                                    srs_cta_buttons
                                                        .primary_button
                                                        .target || "_self"
                                                }
                                                rel={
                                                    srs_cta_buttons
                                                        .primary_button
                                                        .target === "_blank"
                                                        ? "noopener noreferrer"
                                                        : undefined
                                                }
                                                className="theme-btn"
                                            >
                                                {srs_cta_buttons.primary_button
                                                    .title || "Learn More"}
                                            </a>
                                        )}
                                    {srs_cta_buttons.secondary_button &&
                                        srs_cta_buttons.secondary_button
                                            .url && (
                                            <a
                                                href={
                                                    srs_cta_buttons
                                                        .secondary_button.url
                                                }
                                                target={
                                                    srs_cta_buttons
                                                        .secondary_button
                                                        .target || "_self"
                                                }
                                                rel={
                                                    srs_cta_buttons
                                                        .secondary_button
                                                        .target === "_blank"
                                                        ? "noopener noreferrer"
                                                        : undefined
                                                }
                                                className="theme-btn-outline"
                                            >
                                                {srs_cta_buttons
                                                    .secondary_button.title ||
                                                    "More Info"}
                                            </a>
                                        )}
                                </div>
                            )}

                        {secondary_title && (
                            <div className="text-center">
                                <h3
                                    className="mx-auto text-[20px] leading-6 lg:leading-9 font-semibold lg:text-[26px]"
                                    dangerouslySetInnerHTML={{
                                        __html: secondary_title,
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
