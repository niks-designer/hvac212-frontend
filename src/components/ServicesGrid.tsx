import Image from "next/image";
import { normalizeACFImage } from "@/lib/acfNormalizers";

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
}

export function ServicesGrid({
    section_title,
    sectionTitle,
    cards,
}: ServicesGridProps) {
    const headingTitle =
        sectionTitle?.title?.trim() || section_title?.trim() || "";
    const headingDescription = sectionTitle?.short_description?.trim() || "";
    const descriptionLines = headingDescription
        .replace(/<br\s*\/?>/gi, "\n")
        .split(/\r?\n/)
        .filter((line) => line.length > 0);

    return (
        <section className="relative py-16">
            <div
                className="absolute inset-0 -z-10"
                style={{
                    background:
                        "radial-gradient(circle at 50% 0%, rgba(0,191,255,0.22) 0%, rgba(0,191,255,0.14) 18%, rgba(7,15,29,0) 50%), linear-gradient(180deg, #08182d 0%, #07253d 48%, #081827 100%)",
                }}
            />
            <div
                className="absolute inset-x-0 top-0 -z-10 h-72 opacity-60"
                style={{
                    background:
                        "radial-gradient(circle at center, rgba(255,255,255,0.08), rgba(255,255,255,0) 65%)",
                }}
            />
            <div className="container">
                {headingTitle && (
                    <div className="mb-12 text-center">
                        <h2
                            className="text-4xl font-bold"
                            style={{ color: "var(--color-heading)" }}
                        >
                            {headingTitle}
                        </h2>
                        <div
                            className="mt-5 leading-6"
                            dangerouslySetInnerHTML={{
                                __html: descriptionLines.join("<br />"),
                            }}
                        />
                        {/* {descriptionLines.length > 0 && (
                            <p
                                className="mx-auto mt-4 max-w-3xl text-lg leading-relaxed whitespace-pre-wrap"
                                style={{ color: "var(--color-muted)" }}
                            >
                                {descriptionLines.map((line, index) => (
                                    <span key={`${line}-${index}`}>
                                        {line}
                                        {index < descriptionLines.length - 1 ? (
                                            <br />
                                        ) : null}
                                    </span>
                                ))}
                            </p>
                        )} */}
                    </div>
                )}

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {cards &&
                        cards.map((card, index) => {
                            const normalizedImage = normalizeACFImage(
                                card.image
                            );

                            return (
                                <div
                                    key={index}
                                    className="overflow-hidden rounded-3xl bg-[#070F1D99] p-12 text-center transition-shadow"
                                >
                                    {/* Card Image */}
                                    {normalizedImage?.url && (
                                        <div className="text-center">
                                            <img
                                                src={normalizedImage.url}
                                                alt={
                                                    normalizedImage.alt ||
                                                    card.title
                                                }
                                                className="mx-auto h-24 transition-transform duration-300"
                                            />
                                        </div>
                                    )}

                                    {/* Card Content */}
                                    <div className="pt-7">
                                        <h3
                                            className="mb-5 text-3xl font-bold"
                                            style={{
                                                color: "var(--color-heading)",
                                            }}
                                        >
                                            {card.title}
                                        </h3>
                                        <p
                                            className="text-19 leading-6"
                                            style={{
                                                color: "var(--color-muted)",
                                            }}
                                            dangerouslySetInnerHTML={{
                                                __html: card.description,
                                            }}
                                        />

                                        {/* Card Link */}
                                        {card.link?.url && (
                                            <a
                                                href={card.link.url}
                                                target={
                                                    card.link.target ===
                                                    "_blank"
                                                        ? "_blank"
                                                        : "_self"
                                                }
                                                rel={
                                                    card.link.target ===
                                                    "_blank"
                                                        ? "noopener noreferrer"
                                                        : undefined
                                                }
                                                className="hidden font-semibold transition-colors"
                                                style={{
                                                    color: "var(--color-blue)",
                                                }}
                                            >
                                                {card.link.title ||
                                                    "Learn More"}{" "}
                                                →
                                            </a>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </section>
    );
}
