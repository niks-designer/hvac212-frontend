"use client";

import type { HeroSectionTitleDescription, LinkField } from "@/lib/wordpress";

interface SafeCheckItem {
    safe_title?: string;
    safe_description?: string;
}

interface WarningSignItem {
    warning_title?: string;
    warning_description?: string;
}

interface TroubleshootingGuideProps {
    trouble_title?: HeroSectionTitleDescription | null;
    safe_checks?: SafeCheckItem[] | null;
    warning_signs?: WarningSignItem[] | null;
    trouble_btm_description?: string | null;
    trouble_btm_action?: string | null;
    trouble_cta_buttons?: {
        primary_button?: LinkField | null;
        secondary_button?: LinkField | null;
    } | null;
    className?: string;
    contentClassName?: string;
}

function StatusIcon({ variant }: { variant: "check" | "cross" }) {
    if (variant === "cross") {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 sm:h-7 sm:w-7 md:h-7 md:w-7 lg:h-9 lg:w-9"
                width="32"
                height="33"
                viewBox="0 0 32 33"
                fill="none"
            >
                <g clipPath="url(#clip0_1575_556)">
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M31.5616 1.55916C32.1241 0.59331 32.1516 -0.247941 30.361 0.0680175C28.7871 0.34573 22.2075 4.7933 15.5746 10.4077C11.0584 3.37664 7.92012 -1.66679 5.67341 0.513623C2.59064 3.50534 5.48409 9.30633 10.2524 15.1852C3.23917 21.8988 -2.1717 29.0484 0.862258 32.4869C3.02738 34.9409 7.6771 28.2446 14.399 19.863C20.9423 26.7024 28.5966 32.611 30.3711 32.9325C32.1148 33.2484 32.2119 32.4072 31.7924 31.4414C31.0239 29.6723 28.39 27.5506 26.9999 26.0247C23.851 22.5681 21.0915 18.7684 18.5023 14.8955C19.2783 13.9903 20.0755 13.0822 20.8938 12.1797C23.2488 9.58201 30.4454 3.47512 31.5616 1.55923L31.5616 1.55916Z"
                        fill="#FF3333"
                    />
                </g>
                <defs>
                    <clipPath id="clip0_1575_556">
                        <rect width="32" height="33" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        );
    }

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 sm:h-7 sm:w-7 md:h-7 md:w-7 lg:h-9 lg:w-9"
            viewBox="0 0 38 36"
            fill="none"
            aria-hidden="true"
        >
            <g clipPath="url(#troubleshooting-check)">
                <path
                    d="M37.7757 1.1993C30.424 8.26928 22.925 18.5338 13.4693 34.5264C12.6141 35.9709 10.7771 36.4322 9.36626 35.5566C8.86697 35.2468 8.46729 34.794 8.21664 34.2541C5.69956 28.9005 3.03999 23.5178 0.256962 21.6652C0.0971863 21.5575 0.000869606 21.3749 0.000514942 21.179C-0.00561568 20.9685 0.092677 20.769 0.261725 20.649C1.11272 19.9854 2.14218 19.6052 3.21099 19.5598C3.50011 19.5604 3.78833 19.593 4.07059 19.6571C6.07951 20.1433 8.06467 22.2731 10.3301 26.3867C10.5059 26.7044 10.9001 26.8161 11.2104 26.6361C11.2922 26.5886 11.363 26.5234 11.4176 26.445C21.6047 11.7216 29.7496 3.33877 37.0633 0.061497C37.3602 -0.0795228 37.7132 0.0291275 37.885 0.314331C38.073 0.594996 38.0261 0.975363 37.7757 1.1993H37.7757Z"
                    fill="#00BFFF"
                />
            </g>
            <defs>
                <clipPath id="troubleshooting-check">
                    <rect width="38" height="36" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
}

export default function TroubleshootingGuide({
    trouble_title,
    safe_checks,
    warning_signs,
    trouble_btm_description,
    trouble_btm_action,
    trouble_cta_buttons,
    className,
    contentClassName,
}: TroubleshootingGuideProps) {
    const title = trouble_title?.title?.trim() || "";
    const description = trouble_title?.short_description?.trim() || "";
    const safeChecks = Array.isArray(safe_checks) ? safe_checks : [];
    const warningSigns = Array.isArray(warning_signs) ? warning_signs : [];

    if (
        !title &&
        !description &&
        safeChecks.length === 0 &&
        warningSigns.length === 0 &&
        !trouble_btm_description &&
        !trouble_btm_action &&
        !trouble_cta_buttons?.primary_button &&
        !trouble_cta_buttons?.secondary_button
    ) {
        return null;
    }

    return (
        <section className={`${className || ""}`}>
            <div className="container px-0! md:px-4!">
                <div className="bg-[#ececec] px-6 py-10 sm:px-8 sm:py-12 md:rounded-3xl lg:px-12 lg:py-14 dark:bg-[#070F1D99]">
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

                    {(safeChecks.length > 0 || warningSigns.length > 0) && (
                        <div
                            className={`mt-14 grid gap-13 ${
                                contentClassName || "md:px-10"
                            } lg:grid-cols-2`}
                        >
                            {safeChecks.length > 0 && (
                                <div>
                                    <div className="mx-auto w-fit max-w-175 space-y-5">
                                        {safeChecks.map((item, index) => (
                                            <div
                                                key={index}
                                                className="flex items-start gap-3 sm:gap-4 lg:gap-5"
                                            >
                                                <span className="shrink-0 pt-1">
                                                    <StatusIcon variant="check" />
                                                </span>

                                                <div className="min-w-0 flex-1 text-left">
                                                    {item.safe_title && (
                                                        <h4 className="text-xl leading-tight font-bold sm:text-2xl lg:text-[28px]">
                                                            {item.safe_title}
                                                        </h4>
                                                    )}

                                                    {item.safe_description && (
                                                        <div
                                                            className="prose mt-1 max-w-none text-base sm:mt-2 lg:text-[21px]"
                                                            dangerouslySetInnerHTML={{
                                                                __html: item.safe_description,
                                                            }}
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {warningSigns.length > 0 && (
                                <div>
                                    <div className="mx-auto w-fit max-w-175 space-y-5">
                                        {warningSigns.map((item, index) => (
                                            <div
                                                key={index}
                                                className="flex items-start gap-3 sm:gap-4 lg:gap-5"
                                            >
                                                <span className="shrink-0 pt-1">
                                                    <StatusIcon variant="cross" />
                                                </span>

                                                <div className="min-w-0 flex-1 text-left">
                                                    {item.warning_title && (
                                                        <h4 className="text-xl leading-tight font-bold sm:text-2xl lg:text-[28px]">
                                                            {item.warning_title}
                                                        </h4>
                                                    )}

                                                    {item.warning_description && (
                                                        <div
                                                            className="prose mt-1 max-w-none text-base sm:mt-2 lg:text-[21px]"
                                                            dangerouslySetInnerHTML={{
                                                                __html: item.warning_description,
                                                            }}
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {trouble_btm_description && (
                        <div
                            className="prose fs-19 mt-8 text-center"
                            dangerouslySetInnerHTML={{
                                __html: trouble_btm_description,
                            }}
                        />
                    )}

                    {trouble_btm_action && (
                        <div
                            className="action-link mt-14 text-center text-2xl font-bold lg:text-4xl"
                            dangerouslySetInnerHTML={{
                                __html: trouble_btm_action,
                            }}
                        />
                    )}

                    {trouble_cta_buttons &&
                        (trouble_cta_buttons.primary_button ||
                            trouble_cta_buttons.secondary_button) && (
                            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center lg:gap-6">
                                {trouble_cta_buttons.primary_button &&
                                    trouble_cta_buttons.primary_button.url && (
                                        <a
                                            href={
                                                trouble_cta_buttons
                                                    .primary_button.url
                                            }
                                            target={
                                                trouble_cta_buttons
                                                    .primary_button.target ||
                                                "_self"
                                            }
                                            rel={
                                                trouble_cta_buttons
                                                    .primary_button.target ===
                                                "_blank"
                                                    ? "noopener noreferrer"
                                                    : undefined
                                            }
                                            className="theme-btn"
                                        >
                                            {trouble_cta_buttons.primary_button
                                                .title || "Learn More"}
                                        </a>
                                    )}
                                {trouble_cta_buttons.secondary_button &&
                                    trouble_cta_buttons.secondary_button
                                        .url && (
                                        <a
                                            href={
                                                trouble_cta_buttons
                                                    .secondary_button.url
                                            }
                                            target={
                                                trouble_cta_buttons
                                                    .secondary_button.target ||
                                                "_self"
                                            }
                                            rel={
                                                trouble_cta_buttons
                                                    .secondary_button.target ===
                                                "_blank"
                                                    ? "noopener noreferrer"
                                                    : undefined
                                            }
                                            className="theme-btn-outline"
                                        >
                                            {trouble_cta_buttons
                                                .secondary_button.title ||
                                                "More Info"}
                                        </a>
                                    )}
                            </div>
                        )}
                </div>
            </div>
        </section>
    );
}
