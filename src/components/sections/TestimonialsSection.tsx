"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { normalizeACFImage } from "@/lib/acfNormalizers";
import type {
    HeroSectionTitleDescription,
    ACFImage,
    LinkField,
} from "@/lib/wordpress";

interface Testimonial {
    rating: string;
    review: string;
    author_name: string;
    author_designation: string;
    author_image: ACFImage;
}

interface ReviewPlatform {
    logo: ACFImage;
    button?: LinkField | null;
}

const DEFAULT_REVIEW_PLATFORMS: ReviewPlatform[] = [
    {
        logo: {
            id: 1,
            url: "/images/testimonials-logo/google-logo.png",
            alt: "Google",
            title: "Google",
        },
        button: {
            title: "Read More",
            url: "https://google.com/maps/place//data=!4m2!3m1!1s0x89c2595f953a325f:0xa7a86039d5636fdd?source=g.page.m.we",
            target: "_blank",
        },
    },
    {
        logo: {
            id: 2,
            url: "/images/testimonials-logo/yelp-logo.png",
            alt: "Yelp",
            title: "Yelp",
        },
        button: {
            title: "Read More",
            url: "https://www.yelp.com/biz/212-hvac-brooklyn-2",
            target: "_blank",
        },
    },
    {
        logo: {
            id: 3,
            url: "/images/testimonials-logo/angi-logo.png",
            alt: "Angi",
            title: "Angi",
        },
        button: {
            title: "Read More",
            url: "https://www.angi.com/companylist/us/ny/brooklyn/212-hvac-reviews-8590492.htm",
            target: "_blank",
        },
    },
    {
        logo: {
            id: 4,
            url: "/images/testimonials-logo/bbb-logo.png",
            alt: "BBB",
            title: "BBB",
        },
        button: {
            title: "Read More",
            url: "https://www.bbb.org/us/ny/brooklyn/profile/air-conditioning-repair/212-hvac-llc-0121-168110#sealclick",
            target: "_blank",
        },
    },
    {
        logo: {
            id: 5,
            url: "/images/testimonials-logo/expertise-logo.png",
            alt: "Expertise",
            title: "Expertise",
        },
        button: {
            title: "Read More",
            url: "https://www.expertise.com/home-improvement/ac-repair/new-york/nyc#212HVAC",
            target: "_blank",
        },
    },
];

interface TestimonialsSectionProps {
    testimonial_section_title?: HeroSectionTitleDescription | null;
    testimonials?: Testimonial[];
    review_platforms?: ReviewPlatform[];
    className?: string;
}

export function TestimonialsSection({
    testimonial_section_title,
    testimonials,
    review_platforms,
    className,
}: TestimonialsSectionProps) {
    const testimonialItems = testimonials || [];
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: "center",
    });
    const [currentIndex, setCurrentIndex] = useState(0);

    const title = testimonial_section_title?.title?.trim() || "Testimonials";
    const description =
        testimonial_section_title?.short_description?.trim() || "";
    const reviewPlatformsItems =
        review_platforms && review_platforms.length > 0
            ? review_platforms
            : DEFAULT_REVIEW_PLATFORMS;

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setCurrentIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        emblaApi.on("select", onSelect);

        return () => {
            emblaApi.off("select", onSelect);
        };
    }, [emblaApi, onSelect]);

    const handlePrevious = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const handleNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    if (testimonialItems.length === 0) {
        return null;
    }

    return (
        <section className={`${className || "overflow-hidden py-10 lg:py-16"}`}>
            <div className="container px-0! md:px-4!">
                <div className="bg-testimonial overflow-hidden px-4 py-12 sm:px-6 md:rounded-3xl md:px-8 lg:px-10 lg:py-16">
                    <div className="mx-auto max-w-6xl">
                        {/* Section Header */}
                        <div className="mb-8 text-center sm:mb-10 lg:mb-12">
                            {title && <h2 className="h2-title">{title}</h2>}
                            {description && (
                                <div
                                    className="prose mx-auto mt-4 max-w-3xl sm:mt-6"
                                    dangerouslySetInnerHTML={{
                                        __html: description,
                                    }}
                                />
                            )}
                        </div>

                        {/* Testimonial Carousel Container */}
                        <div className="overflow-x-hidden">
                            {/* Carousel */}
                            <div
                                className="relative w-full min-w-0 overflow-hidden"
                                ref={emblaRef}
                            >
                                <div className="flex min-w-0">
                                    {testimonialItems.map(
                                        (testimonial, index) => {
                                            const stars =
                                                testimonial.rating &&
                                                !isNaN(
                                                    parseFloat(
                                                        testimonial.rating
                                                    )
                                                )
                                                    ? Math.round(
                                                          parseFloat(
                                                              testimonial.rating
                                                          )
                                                      )
                                                    : 5;

                                            const authorImage =
                                                normalizeACFImage(
                                                    testimonial.author_image
                                                );

                                            const authorInitial =
                                                testimonial.author_name
                                                    ?.trim()
                                                    ?.charAt(0)
                                                    ?.toUpperCase() || "U";

                                            return (
                                                <div
                                                    key={index}
                                                    className="min-w-0 flex-[0_0_100%]"
                                                >
                                                    <div className="w-full max-w-full min-w-0">
                                                        {/* Star Rating */}
                                                        <div className="mb-4 flex justify-center gap-1.5 sm:gap-2">
                                                            {[...Array(5)].map(
                                                                (_, i) => (
                                                                    <span
                                                                        key={i}
                                                                        className="text-3xl lg:text-4xl"
                                                                        style={{
                                                                            color:
                                                                                i <
                                                                                stars
                                                                                    ? "var(--color-yellow)"
                                                                                    : "#404040",
                                                                        }}
                                                                    >
                                                                        ★
                                                                    </span>
                                                                )
                                                            )}
                                                        </div>

                                                        {/* Review Text */}
                                                        <div className="mx-auto w-full max-w-full min-w-0 px-8 sm:px-12 md:px-14 lg:px-16">
                                                            <div
                                                                className="fs-19 mx-auto mb-6 w-full max-w-4xl text-center text-base leading-relaxed wrap-break-word sm:mb-8"
                                                                dangerouslySetInnerHTML={{
                                                                    __html: testimonial.review,
                                                                }}
                                                            />
                                                        </div>

                                                        {/* Author Section */}
                                                        <div className="flex items-center justify-center gap-3 sm:gap-4">
                                                            {/* Author Avatar */}
                                                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0097a7] sm:h-13 sm:w-13">
                                                                {authorImage?.url ? (
                                                                    <Image
                                                                        src={
                                                                            authorImage.url
                                                                        }
                                                                        alt={
                                                                            authorImage.alt ||
                                                                            testimonial.author_name
                                                                        }
                                                                        width={
                                                                            56
                                                                        }
                                                                        height={
                                                                            56
                                                                        }
                                                                        className="h-12 w-12 rounded-full object-cover sm:h-14 sm:w-14"
                                                                        unoptimized
                                                                    />
                                                                ) : (
                                                                    <span className="text-xl font-bold text-white sm:text-2xl">
                                                                        {
                                                                            authorInitial
                                                                        }
                                                                    </span>
                                                                )}
                                                            </div>

                                                            {/* Author Info */}
                                                            <div className="fs-19 flex items-center text-center">
                                                                <p className="font-semibold">
                                                                    {testimonial.author_name?.trim() ||
                                                                        "Unknown User"}
                                                                    ,
                                                                </p>

                                                                {testimonial.author_designation?.trim() && (
                                                                    <p className="md:ml-2">
                                                                        {
                                                                            testimonial.author_designation
                                                                        }
                                                                    </p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        }
                                    )}
                                </div>

                                {/* Side Navigation (overlay) - inside carousel for correct positioning */}
                                <button
                                    onClick={handlePrevious}
                                    className="absolute top-[30%] left-0 z-9 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center sm:h-10 sm:w-10 md:top-1/2 md:left-3 lg:left-4"
                                    aria-label="Previous testimonial"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-7 w-4 sm:h-9 sm:w-5 md:h-11 md:w-6"
                                        viewBox="0 0 28 52"
                                        fill="none"
                                    >
                                        <path
                                            d="M27 50.73L0.999998 25.0691L27 0.729981"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </button>

                                <button
                                    onClick={handleNext}
                                    className="absolute top-[30%] right-0 z-9 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center sm:h-10 sm:w-10 md:top-1/2 md:right-3 lg:right-4"
                                    aria-label="Next testimonial"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-7 w-4 sm:h-9 sm:w-5 md:h-11 md:w-6"
                                        viewBox="0 0 28 52"
                                        fill="none"
                                    >
                                        <path
                                            d="M0.702393 0.71167L26.7024 26.3725L0.702393 50.7117"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </button>
                            </div>
                            {/* Pagination Dots */}
                            <div className="mt-6 flex items-center justify-center sm:mt-7">
                                <div className="flex flex-wrap justify-center gap-2">
                                    {testimonialItems.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() =>
                                                emblaApi?.scrollTo(index)
                                            }
                                            className={`testimonial-dot ${
                                                index === currentIndex
                                                    ? "testimonial-dot-active"
                                                    : ""
                                            }`}
                                            aria-label={`Go to testimonial ${index + 1}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Review Platforms */}
                        {reviewPlatformsItems.length > 0 && (
                            <div className="mt-10 sm:mt-12">
                                <div className="flex flex-wrap items-end justify-center gap-5 sm:gap-6 md:gap-8">
                                    {reviewPlatformsItems.map(
                                        (platform, index) => {
                                            const logoImage = normalizeACFImage(
                                                platform.logo
                                            );

                                            return (
                                                <div
                                                    key={index}
                                                    className="flex w-[calc(50%-0.75rem)] flex-col items-center gap-4 sm:w-auto sm:gap-6"
                                                >
                                                    {/* Logo */}

                                                    {logoImage?.url && (
                                                        <div className="relative max-w-40 sm:max-w-none">
                                                            <Image
                                                                src={
                                                                    logoImage.url
                                                                }
                                                                alt={
                                                                    logoImage.alt ||
                                                                    "Review platform"
                                                                }
                                                                width={
                                                                    logoImage.width ||
                                                                    100
                                                                }
                                                                height={
                                                                    logoImage.height ||
                                                                    50
                                                                }
                                                                className="light-brand h-auto w-auto"
                                                                unoptimized
                                                            />
                                                        </div>
                                                    )}

                                                    {/* Button */}
                                                    {platform.button?.url && (
                                                        <a
                                                            href={
                                                                platform.button
                                                                    .url
                                                            }
                                                            target={
                                                                platform.button
                                                                    .target ===
                                                                "_blank"
                                                                    ? "_blank"
                                                                    : "_self"
                                                            }
                                                            rel={
                                                                platform.button
                                                                    .target ===
                                                                "_blank"
                                                                    ? "noopener noreferrer"
                                                                    : undefined
                                                            }
                                                            className="bg-yellow text-primary text-md hover:bg-blue inline-block rounded-full px-6 py-3 font-semibold transition-colors sm:px-7 sm:py-4"
                                                        >
                                                            {platform.button
                                                                .title ||
                                                                "Read More"}
                                                        </a>
                                                    )}
                                                </div>
                                            );
                                        }
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
