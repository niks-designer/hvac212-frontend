"use client";

import Image from "next/image";
import { normalizeACFImage } from "@/lib/acfNormalizers";
import type { ACFImage } from "@/lib/acfNormalizers";

interface ApproachItem {
    item_text?: string;
}

interface ApproachTitle {
    title?: string;
    short_description?: string;
}

interface OurApproachProps {
    approach_section_title?: ApproachTitle | null;
    left_image?: ACFImage | null;
    approach_items?: ApproachItem[] | null;
    bottom_description?: string | null;
}

export default function OurApproach({
    approach_section_title,
    left_image,
    approach_items,
    bottom_description,
}: OurApproachProps) {
    const title = approach_section_title?.title?.trim() || "";
    const shortDescription = approach_section_title?.short_description || "";
    const image = normalizeACFImage(left_image as any);

    const items = (approach_items || [])
        .map((it) => it.item_text)
        .filter(Boolean) as string[];

    return (
        <section className="">
            <div className="container">
                <div className="flex flex-col items-center gap-8 px-16 md:flex-row lg:gap-[65px]">
                    {/* Left image */}
                    <div className="w-full lg:w-[445px] lg:max-w-[445px] lg:min-w-[445px]">
                        {image?.url && (
                            <div className="overflow-hidden rounded-2xl shadow-lg">
                                <div className="w-full">
                                    <Image
                                        src={image.url}
                                        alt={image.alt || "Approach image"}
                                        width={image.width || 620}
                                        height={image.height || 390}
                                        className="h-auto w-full object-cover"
                                        unoptimized
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right content */}
                    <div className="w-full space-y-10 md:w-2/3">
                        {title && <h2 className="h2-title">{title}</h2>}

                        {shortDescription && (
                            <div
                                className="prose"
                                dangerouslySetInnerHTML={{
                                    __html: shortDescription,
                                }}
                            />
                        )}

                        {/* Items list */}
                        {items.length > 0 && (
                            <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                                {items.map((it, idx) => (
                                    <li
                                        key={idx}
                                        className="flex items-center gap-3"
                                    >
                                        <span className="">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="38"
                                                height="36"
                                                viewBox="0 0 38 36"
                                                fill="none"
                                            >
                                                <g clipPath="url(#clip0_187_229)">
                                                    <path
                                                        d="M37.7757 1.1993C30.424 8.26928 22.925 18.5338 13.4693 34.5264C12.6141 35.9709 10.7771 36.4322 9.36626 35.5566C8.86697 35.2468 8.46729 34.794 8.21664 34.2541C5.69956 28.9005 3.03999 23.5178 0.256962 21.6652C0.0971863 21.5575 0.000869606 21.3749 0.000514942 21.179C-0.00561568 20.9685 0.092677 20.769 0.261725 20.649C1.11272 19.9854 2.14218 19.6052 3.21099 19.5598C3.50011 19.5604 3.78833 19.593 4.07059 19.6571C6.07951 20.1433 8.06467 22.2731 10.3301 26.3867C10.5059 26.7044 10.9001 26.8161 11.2104 26.6361C11.2922 26.5886 11.363 26.5234 11.4176 26.445C21.6047 11.7216 29.7496 3.33877 37.0633 0.061497C37.3602 -0.0795228 37.7132 0.0291275 37.885 0.314331C38.073 0.594996 38.0261 0.975363 37.7757 1.1993H37.7757Z"
                                                        fill="#00BFFF"
                                                    />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_187_229">
                                                        <rect
                                                            width="38"
                                                            height="36"
                                                            fill="white"
                                                        />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </span>
                                        <span className="text-2xl">{it}</span>
                                    </li>
                                ))}
                            </ul>
                        )}

                        {bottom_description && (
                            <div
                                className="prose text-19 mt-6 max-w-2xl"
                                dangerouslySetInnerHTML={{
                                    __html: bottom_description,
                                }}
                            />
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
