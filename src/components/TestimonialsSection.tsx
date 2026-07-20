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

interface TestimonialsSectionProps {
    testimonial_section_title?: HeroSectionTitleDescription | null;
    testimonials?: Testimonial[];
    review_platforms?: ReviewPlatform[];
}

export function TestimonialsSection({
    testimonial_section_title,
    testimonials,
    review_platforms,
}: TestimonialsSectionProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: "center",
    });
    const [currentIndex, setCurrentIndex] = useState(0);

    const title = testimonial_section_title?.title?.trim() || "Testimonials";
    const description =
        testimonial_section_title?.short_description?.trim() || "";

    if (!testimonials || testimonials.length === 0) {
        return null;
    }

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setCurrentIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        emblaApi.on("select", onSelect);
        onSelect();

        return () => {
            emblaApi.off("select", onSelect);
        };
    }, [emblaApi, onSelect]);

    const currentTestimonial = testimonials[currentIndex];

    const handlePrevious = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const handleNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    const authorImage = normalizeACFImage(currentTestimonial.author_image);

    return (
        <section className="py-16">
            <div className="container">
                <div className="bg-testimonial rounded-3xl px-6 py-16">
                    <div className="mx-auto max-w-6xl">
                        {/* Section Header */}
                        <div className="mb-12 text-center">
                            {title && <h2 className="h2-title">{title}</h2>}
                            {description && (
                                <div
                                    className="prose mx-auto mt-6 max-w-3xl"
                                    dangerouslySetInnerHTML={{
                                        __html: description,
                                    }}
                                />
                            )}
                        </div>

                        {/* Testimonial Carousel Container */}
                        <div>
                            {/* Carousel */}
                            <div
                                className="relative overflow-hidden px-8"
                                ref={emblaRef}
                            >
                                <div className="flex">
                                    {testimonials.map((testimonial, index) => {
                                        const stars =
                                            testimonial.rating &&
                                            !isNaN(
                                                parseFloat(testimonial.rating)
                                            )
                                                ? Math.round(
                                                      parseFloat(
                                                          testimonial.rating
                                                      )
                                                  )
                                                : 5;

                                        const authorImage = normalizeACFImage(
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
                                                className="min-w-full flex-shrink-0"
                                            >
                                                {/* Star Rating */}
                                                <div className="mb-3 flex justify-center gap-2">
                                                    {[...Array(5)].map(
                                                        (_, i) => (
                                                            <span
                                                                key={i}
                                                                className="text-4xl"
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
                                                <div
                                                    className="text-19 mx-auto mb-8 max-w-4xl text-center"
                                                    dangerouslySetInnerHTML={{
                                                        __html: testimonial.review,
                                                    }}
                                                />

                                                {/* Author Section */}
                                                <div className="flex flex-col items-center gap-4 md:flex-row md:justify-center">
                                                    {/* Author Avatar */}
                                                    <div
                                                        className="flex h-13 w-13 items-center justify-center rounded-full"
                                                        style={{
                                                            backgroundColor:
                                                                "var(--color-blue)",
                                                        }}
                                                    >
                                                        {authorImage?.url ? (
                                                            <Image
                                                                src={
                                                                    authorImage.url
                                                                }
                                                                alt={
                                                                    authorImage.alt ||
                                                                    testimonial.author_name
                                                                }
                                                                width={56}
                                                                height={56}
                                                                className="h-14 w-14 rounded-full object-cover"
                                                                unoptimized
                                                            />
                                                        ) : (
                                                            <span className="text-2xl font-bold text-white">
                                                                {authorInitial}
                                                            </span>
                                                        )}
                                                    </div>

                                                    {/* Author Info */}
                                                    <div className="text-19 flex text-center md:text-left">
                                                        <p className="font-semibold">
                                                            {testimonial.author_name?.trim() ||
                                                                "Unknown User"}
                                                            ,
                                                        </p>

                                                        {testimonial.author_designation?.trim() && (
                                                            <p className="ml-2">
                                                                {
                                                                    testimonial.author_designation
                                                                }
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Side Navigation (overlay) - inside carousel for correct positioning */}
                                <button
                                    onClick={handlePrevious}
                                    className="absolute top-1/2 left-6 z-20 hidden -translate-y-1/2 cursor-pointer items-center justify-center md:flex"
                                    style={{ color: "var(--color-white)" }}
                                    aria-label="Previous testimonial"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="28"
                                        height="52"
                                        viewBox="0 0 28 52"
                                        fill="none"
                                    >
                                        <path
                                            d="M27 50.73L0.999998 25.0691L27 0.729981"
                                            stroke="white"
                                            strokeWidth="2"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </button>

                                <button
                                    onClick={handleNext}
                                    className="absolute top-1/2 right-6 z-20 hidden h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center md:flex"
                                    style={{ color: "var(--color-white)" }}
                                    aria-label="Next testimonial"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="28"
                                        height="52"
                                        viewBox="0 0 28 52"
                                        fill="none"
                                    >
                                        <path
                                            d="M0.702393 0.71167L26.7024 26.3725L0.702393 50.7117"
                                            stroke="white"
                                            strokeWidth="2"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </button>
                            </div>
                            {/* Pagination Dots */}
                            <div className="mt-7 flex items-center justify-center">
                                <div className="flex gap-2">
                                    {testimonials.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() =>
                                                emblaApi?.scrollTo(index)
                                            }
                                            className="h-[14px] w-[14px] cursor-pointer rounded-full border-2 border-solid border-white transition-all"
                                            style={{
                                                backgroundColor:
                                                    index === currentIndex
                                                        ? "var(--color-white)"
                                                        : "var(--color-primary)",
                                                width:
                                                    index === currentIndex
                                                        ? ""
                                                        : "",
                                            }}
                                            aria-label={`Go to testimonial ${index + 1}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Review Platforms */}
                        {review_platforms && review_platforms.length > 0 && (
                            <div className="mt-12">
                                <div className="flex flex-wrap items-end justify-center gap-6 md:gap-8">
                                    {review_platforms.map((platform, index) => {
                                        const logoImage = normalizeACFImage(
                                            platform.logo
                                        );

                                        return (
                                            <div
                                                key={index}
                                                className="flex flex-col items-center gap-6"
                                            >
                                                {/* Logo */}

                                                {logoImage?.url && (
                                                    <div className="relative">
                                                        <Image
                                                            src={logoImage.url}
                                                            alt={
                                                                logoImage.alt ||
                                                                "Review platform"
                                                            }
                                                            width={100}
                                                            height={50}
                                                            className="h-auto w-full object-contain"
                                                            unoptimized
                                                        />
                                                    </div>
                                                )}

                                                {/* Button */}
                                                {platform.button?.url && (
                                                    <a
                                                        href={
                                                            platform.button.url
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
                                                        className="bg-yellow text-primary text-md hover:bg-blue inline-block rounded-full px-7 py-4 font-semibold transition-colors"
                                                    >
                                                        {platform.button
                                                            .title ||
                                                            "Read More"}
                                                    </a>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
