"use client";

import type {
    ACFImage,
    HeroSectionTitleDescription,
    LinkField,
} from "@/lib/wordpress";

interface MaintenancePlanFeatureItem {
    feature_text?: string;
}

interface MaintenancePlanItem {
    plan_name?: string;
    price?: string;
    price_note?: string;
    card_background?: ACFImage | boolean | null;
    most_popular?: boolean;
    badge_text?: string;
    plan_features?: MaintenancePlanFeatureItem[] | null;
}

interface MaintenancePlansProps {
    plans_title?: HeroSectionTitleDescription | null;
    plans?: MaintenancePlanItem[] | null;
    className?: string;
}

const DEFAULT_PLAN_BACKGROUNDS = [
    "/images/plans/silver-bg.png",
    "/images/plans/gold-bg.png",
    "/images/plans/platinum-bg.png",
];

const DEFAULT_MAINTENANCE_PLANS: MaintenancePlanItem[] = [
    {
        plan_name: "Silver",
        price: "680",
        price_note: "Annual Membership <br> (Plus Tax)",
        most_popular: false,
        plan_features: [
            { feature_text: "2 Scheduled Visits <span>per year</span>" },
            { feature_text: "5% Discount <span>on repair labor</span>" },
            { feature_text: "Professional Safety & Performance Audit" },
            {
                feature_text:
                    "50% Discount on one service <span>call visit ($87.50 value)</span>",
            },
        ],
    },
    {
        plan_name: "Gold",
        price: "770",
        price_note: "Annual Membership <br>(Plus Tax)",
        most_popular: true,
        plan_features: [
            { feature_text: "2 Scheduled Visits <span>per year</span>" },
            { feature_text: "10% Discount <span>on repair labor</span>" },
            { feature_text: "Professional Safety & Performance Audit" },
            {
                feature_text:
                    "1 Free Service Call <br><span>visit per year ($175 value)</span>   ",
            },
            {
                feature_text:
                    "Priority 48-Hour <br><span>service response</span>",
            },
        ],
    },
    {
        plan_name: "Platinum",
        price: "950",
        price_note: "Annual Membership <br> (Plus Tax)",
        most_popular: false,
        plan_features: [
            { feature_text: "2 Scheduled Visits <span>per year</span>" },
            { feature_text: "15% Discount <span>on repair labor</span>" },
            { feature_text: "Professional Safety & Performance Audit" },
            {
                feature_text:
                    "1 Free Service Call <br><span>visit per year ($175 value)</span>",
            },
            {
                feature_text:
                    "Priority 24-Hour <br><span>service response</span>",
            },
        ],
    },
];

function formatFeatureText(featureText?: string) {
    if (!featureText) {
        return "";
    }

    return featureText
        .replace(/<span>/g, '<span class="font-normal text-base text-[20px]">')
        .replace(/<\/span>/g, "</span>");
}

function CheckIcon() {
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

export default function MaintenancePlans({
    plans_title,
    plans,
    className,
}: MaintenancePlansProps) {
    const title = plans_title?.title?.trim() || "";
    const description = plans_title?.short_description?.trim() || "";
    const wordpressPlanItems = Array.isArray(plans) ? plans : [];
    const planItems =
        wordpressPlanItems.length > 0
            ? wordpressPlanItems
            : DEFAULT_MAINTENANCE_PLANS;

    if (!title && !description && planItems.length === 0) {
        return null;
    }

    const pricingBoxStyles = (backgroundImage: string) => {
        const base = "p-8";

        return backgroundImage
            ? `${base} bg-cover bg-center bg-no-repeat text-white`
            : base;
    };

    return (
        <section className={`${className || ""}`}>
            <div className="container px-0! md:px-4!">
                <div className="bg-[#ececec] px-6 py-10 sm:px-8 sm:py-12 md:rounded-3xl lg:px-12 lg:py-14 dark:bg-[#070F1D99]">
                    {(title || description) && (
                        <div className="sec-ttl mb-7 space-y-5 text-center lg:mb-12">
                            {title && <h2 className="h2-title">{title}</h2>}
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

                    {planItems.length > 0 && (
                        <div className="grid gap-10 xl:grid-cols-3">
                            {planItems.map((plan, index) => {
                                const isPopular = plan.most_popular;
                                const wordpressBackgroundImage =
                                    typeof plan.card_background === "object" &&
                                    plan.card_background?.url
                                        ? plan.card_background.url
                                        : undefined;
                                const defaultBackgroundImage =
                                    DEFAULT_PLAN_BACKGROUNDS[index] ||
                                    DEFAULT_PLAN_BACKGROUNDS[
                                        DEFAULT_PLAN_BACKGROUNDS.length - 1
                                    ];
                                const backgroundImage =
                                    wordpressBackgroundImage ||
                                    defaultBackgroundImage;
                                const headerStyles =
                                    pricingBoxStyles(backgroundImage);

                                return (
                                    <div key={index} className="plan-wrap">
                                        <div className="">
                                            <div className="relative overflow-hidden rounded-[20px]">
                                                {isPopular && (
                                                    <span className="bg-blue absolute top-7.5 -right-7.5 z-10 w-36 rotate-45 py-1 text-center text-[13px] font-bold text-white shadow-md">
                                                        Most Popular
                                                    </span>
                                                )}

                                                <div
                                                    className={headerStyles}
                                                    style={
                                                        backgroundImage
                                                            ? {
                                                                  backgroundImage: `url(${backgroundImage})`,
                                                              }
                                                            : undefined
                                                    }
                                                >
                                                    <div className="mx-auto max-w-[320px] text-center">
                                                        {plan.plan_name && (
                                                            <h3 className="text-[24px] font-bold tracking-[0.04em] text-[#002D3E] sm:text-[33px]">
                                                                {plan.plan_name}
                                                            </h3>
                                                        )}

                                                        {plan.price && (
                                                            <p className="text-blue text-[56px] leading-none font-bold sm:text-[71px]">
                                                                ${plan.price}
                                                            </p>
                                                        )}

                                                        {plan.price_note && (
                                                            <p
                                                                className="text-primary text-lg italic"
                                                                dangerouslySetInnerHTML={{
                                                                    __html: plan.price_note,
                                                                }}
                                                            ></p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {plan.plan_features &&
                                                plan.plan_features.length >
                                                    0 && (
                                                    <div className="mt-8 space-y-5">
                                                        {plan.plan_features.map(
                                                            (
                                                                feature,
                                                                featureIndex
                                                            ) => (
                                                                <div
                                                                    key={
                                                                        featureIndex
                                                                    }
                                                                    className="flex items-start gap-3"
                                                                >
                                                                    <span className="mt-1 shrink-0 text-[#00BFFF]">
                                                                        <CheckIcon />
                                                                    </span>
                                                                    <div className="min-w-0 flex-1 text-left">
                                                                        <p
                                                                            className="text-base font-bold lg:text-[21px]"
                                                                            dangerouslySetInnerHTML={{
                                                                                __html: formatFeatureText(
                                                                                    feature.feature_text
                                                                                ),
                                                                            }}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
