import Image from "next/image";
import Link from "next/link";

import { normalizeACFImage } from "@/lib/acfNormalizers";
import { useTheme } from "@/components/providers/ThemeProvider";

interface ServiceCard {
    image?: any;
    title: string;
    description: string;
    link?: {
        title?: string;
        url?: string;
        target?: string;
    };
}

interface ServiceGridTitle {
    title?: string;
    short_description?: string;
}

interface ServicesGridProps {
    section_title?: string;
    sectionTitle?: ServiceGridTitle | null;
    cards: ServiceCard[];
    className?: string;
}

export function ServicesGrid({
    section_title,
    sectionTitle,
    cards,
    className,
}: ServicesGridProps) {
    const { theme } = useTheme();
    const headingTitle =
        sectionTitle?.title?.trim() || section_title?.trim() || "";
    const headingDescription = sectionTitle?.short_description || "";

    return (
        <section
            id="ser-grid"
            className={`relative ${className || "scroll-mt-30 py-10 lg:py-16"}`}
        >
            <div className="container">
                {(headingTitle || headingDescription) && (
                    <div className="sec-ttl mb-7 space-y-5 text-center lg:mb-12">
                        <h2 className="h2-title">{headingTitle}</h2>
                        {headingDescription && (
                            <div
                                className="prose"
                                dangerouslySetInnerHTML={{
                                    __html: headingDescription,
                                }}
                            />
                        )}
                    </div>
                )}

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {cards &&
                        cards.map((card, index) => {
                            const normalizedImage = normalizeACFImage(
                                card.image
                            );

                            const cardContent = (
                                <div
                                    className={`ser-bx-${index + 1} overflow-hidden rounded-3xl p-12 text-center transition-shadow ${
                                        theme === "light"
                                            ? "bg-testimonial"
                                            : "bg-[#070F1D99]"
                                    }`}
                                >
                                    {/* Card Image */}
                                    {normalizedImage?.url && (
                                        <div className="ser-img text-center">
                                            <Image
                                                src={normalizedImage.url}
                                                alt={
                                                    normalizedImage.alt ||
                                                    card.title
                                                }
                                                width={
                                                    normalizedImage.width || 96
                                                }
                                                height={
                                                    normalizedImage.height || 96
                                                }
                                                className="mx-auto h-24 w-auto transition-transform duration-300"
                                                unoptimized
                                            />
                                        </div>
                                    )}

                                    {/* Card Content */}
                                    <div className="pt-7">
                                        <h3 className="mb-3 text-3xl font-bold">
                                            {card.title}
                                        </h3>
                                        <div
                                            className="fs-19"
                                            dangerouslySetInnerHTML={{
                                                __html: card.description || "",
                                            }}
                                        />
                                    </div>
                                </div>
                            );

                            return card.link?.url ? (
                                <Link
                                    key={index}
                                    href={card.link.url}
                                    target={
                                        card.link.target === "_blank"
                                            ? "_blank"
                                            : "_self"
                                    }
                                    rel={
                                        card.link.target === "_blank"
                                            ? "noopener noreferrer"
                                            : undefined
                                    }
                                    className="block"
                                >
                                    {cardContent}
                                </Link>
                            ) : (
                                <div key={index}>{cardContent}</div>
                            );
                        })}
                </div>
            </div>
        </section>
    );
}
