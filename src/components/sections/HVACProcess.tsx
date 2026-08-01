"use client";

import Image from "next/image";
import { normalizeACFImage } from "@/lib/acfNormalizers";
import type { ACFImage } from "@/lib/acfNormalizers";

interface ProcessStep {
    process_img?: ACFImage | false | null;
    process_title?: string;
    process_description?: string;
}

interface ProcessCTA {
    title?: string;
    url?: string;
    target?: string;
}

interface ProcessCTAButtons {
    primary_button?: ProcessCTA | null;
    secondary_button?: ProcessCTA | null;
}

interface ProcessTitle {
    title?: string;
    short_description?: string;
}

interface ProcessStepDefaults {
    process_title: string;
    process_description: string;
    process_img: ACFImage;
}

const DEFAULT_PROCESS_TITLE = "The Process";
const DEFAULT_PROCESS_DESCRIPTION =
    "Precision-led installation from initial assessment to final commissioning.";
const DEFAULT_PROCESS_STEPS: ProcessStepDefaults[] = [
    {
        process_title: "Schedule Your Appointment",
        process_description: "",
        process_img: {
            id: 1,
            url: "/images/process/schedule-your-appointment.webp",
            alt: "Schedule your appointment",
            title: "Schedule Your Appointment",
            width: 506,
            height: 356,
        },
    },
    {
        process_title: "Get Your<br> Quote",
        process_description: "",
        process_img: {
            id: 2,
            url: "/images/process/get-your-quote.webp",
            alt: "Get your quote",
            title: "Get Your Quote",
            width: 507,
            height: 356,
        },
    },
    {
        process_title: "Installation<br> Day",
        process_description: "",
        process_img: {
            id: 3,
            url: "/images/process/installation-day.webp",
            alt: "Installation day",
            title: "Installation Day",
            width: 504,
            height: 356,
        },
    },
];

const DEFAULT_PRIMARY_CTA = {
    title: "Schedule Your Appointment",
    url: "/contact-us/",
    target: "_self",
};

interface HVACProcessProps {
    process_title?: ProcessTitle | null;
    process_step?: ProcessStep[] | null;
    process_cta?: ProcessCTAButtons | null;
    className?: string;
}

export default function HVACProcess({
    process_title,
    process_step,
    process_cta,
    className,
}: HVACProcessProps) {
    const title = process_title?.title?.trim() || DEFAULT_PROCESS_TITLE;
    const shortDescription =
        process_title?.short_description || DEFAULT_PROCESS_DESCRIPTION;
    const steps = Array.from(
        {
            length: Math.max(
                process_step?.length || 0,
                DEFAULT_PROCESS_STEPS.length
            ),
        },
        (_, index) => process_step?.[index] || {}
    );
    const primaryButton = {
        title:
            process_cta?.primary_button?.title?.trim() ||
            DEFAULT_PRIMARY_CTA.title,
        url:
            process_cta?.primary_button?.url?.trim() || DEFAULT_PRIMARY_CTA.url,
        target:
            process_cta?.primary_button?.target || DEFAULT_PRIMARY_CTA.target,
    };
    const secondaryButton = process_cta?.secondary_button;

    return (
        <section className={`${className || ""}`}>
            <div className="container">
                <div className="bg-[#ececec] px-6 py-10 sm:px-8 sm:py-12 md:rounded-3xl lg:px-12 lg:py-14 dark:bg-[#070F1D99]">
                    {/* Section Header */}
                    <div className="sec-ttl mb-7 space-y-4 text-center lg:mb-12">
                        {title && <h2 className="h2-title">{title}</h2>}
                        {shortDescription && (
                            <div
                                className="prose fs-19"
                                dangerouslySetInnerHTML={{
                                    __html: shortDescription,
                                }}
                            />
                        )}
                    </div>

                    {/* Process Steps */}
                    {steps.length > 0 && (
                        <div className="mb-10 grid gap-8 sm:gap-8 md:grid-cols-2 lg:mb-16 lg:grid-cols-3 lg:gap-8">
                            {steps.map((step, index) => {
                                const defaultStep =
                                    DEFAULT_PROCESS_STEPS[index];
                                const processImage = normalizeACFImage(
                                    step.process_img ||
                                        defaultStep?.process_img ||
                                        null
                                );
                                const stepTitle =
                                    step.process_title?.trim() ||
                                    defaultStep?.process_title ||
                                    "";
                                const stepDescription =
                                    step.process_description?.trim() ||
                                    defaultStep?.process_description ||
                                    "";

                                return (
                                    <div
                                        key={index}
                                        className="flex flex-col text-center"
                                    >
                                        {/* Step Image */}
                                        {processImage?.url && (
                                            <div className="mb-3 overflow-hidden rounded-xl lg:mb-8">
                                                <Image
                                                    src={processImage.url}
                                                    alt={
                                                        processImage.alt ||
                                                        `Step ${index + 1}`
                                                    }
                                                    width={
                                                        processImage.width ||
                                                        400
                                                    }
                                                    height={
                                                        processImage.height ||
                                                        300
                                                    }
                                                    className="h-auto w-full rounded-xl object-cover"
                                                    unoptimized
                                                />
                                            </div>
                                        )}
                                        {/* Step Number */}
                                        <p className="text-blue mb-2 text-sm font-bold sm:text-base lg:text-[21px]">
                                            Step {index + 1}:
                                        </p>
                                        {/* Step Title */}
                                        {stepTitle && (
                                            <h3
                                                className="text-xl leading-tight font-bold sm:text-2xl lg:text-[28px]"
                                                dangerouslySetInnerHTML={{
                                                    __html: stepTitle,
                                                }}
                                            />
                                        )}

                                        {/* Step Description */}
                                        {stepDescription && (
                                            <div className="flex-1">
                                                <p
                                                    className="text-base leading-relaxed"
                                                    dangerouslySetInnerHTML={{
                                                        __html: stepDescription,
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* CTA Buttons */}
                    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                        {primaryButton.url && (
                            <a
                                href={primaryButton.url}
                                target={
                                    primaryButton.target === "_blank"
                                        ? "_blank"
                                        : "_self"
                                }
                                rel={
                                    primaryButton.target === "_blank"
                                        ? "noopener noreferrer"
                                        : undefined
                                }
                                className="theme-btn bgc-yellow"
                            >
                                {primaryButton.title}
                            </a>
                        )}
                        {secondaryButton?.url && (
                            <a
                                href={secondaryButton.url}
                                target={
                                    secondaryButton.target === "_blank"
                                        ? "_blank"
                                        : "_self"
                                }
                                rel={
                                    secondaryButton.target === "_blank"
                                        ? "noopener noreferrer"
                                        : undefined
                                }
                                className="theme-btn theme-btn-outline"
                            >
                                {secondaryButton.title}
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
