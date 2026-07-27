import Image from "next/image";
import Link from "next/link";
import { normalizeACFImage } from "@/lib/acfNormalizers";
import { useTheme } from "@/components/providers/ThemeProvider";

interface HeroSectionTitleDescription {
    title?: string;
    short_description?: string;
}

interface ItemLink {
    title?: string;
    url?: string;
    target?: string;
}

interface SelectHvacSystemItem {
    image?: any;
    title?: string;
    description?: string;
    link?: ItemLink | string | null;
}

interface SelectHVACSystemProps {
    sectionTitle?: HeroSectionTitleDescription | null;
    items?: SelectHvacSystemItem[] | null;
    className?: string;
}

export default function SelectHVACSystem({
    sectionTitle,
    items,
    className,
}: SelectHVACSystemProps) {
    const heading = sectionTitle?.title?.trim() || "";
    const description = sectionTitle?.short_description || "";
    const cards = Array.isArray(items) ? items : [];
    const { theme } = useTheme();

    return (
        <section
            className={`${
                theme === "light" ? "bg-ececec" : "bg-[#070F1D99]"
            } ${className || "py-10 lg:py-16"}`}
        >
            <div className="container">
                <div className="mx-auto max-w-4xl text-center">
                    {heading && <h2 className="h2-title">{heading}</h2>}
                    {description && (
                        <div
                            className="prose mt-3 lg:mt-5"
                            dangerouslySetInnerHTML={{ __html: description }}
                        />
                    )}
                </div>

                <div className="mt-8 flex flex-wrap justify-center gap-4 lg:mt-12 lg:flex-nowrap lg:gap-6">
                    {cards.map((card, index) => {
                        const normalizedImage = normalizeACFImage(card.image);
                        const link =
                            typeof card.link === "string"
                                ? undefined
                                : card.link;

                        const cardContent = (
                            <div className="group overflow-hidden">
                                {normalizedImage?.url && (
                                    <div className="relative overflow-hidden rounded-2xl">
                                        <Image
                                            src={normalizedImage.url}
                                            alt={
                                                normalizedImage.alt ||
                                                card.title ||
                                                "HVAC system"
                                            }
                                            width={normalizedImage.width || 620}
                                            height={
                                                normalizedImage.height || 390
                                            }
                                            className="mx-auto block w-full rounded-2xl object-cover transition duration-500 group-hover:scale-105"
                                            unoptimized
                                        />
                                    </div>
                                )}

                                <div className="mt-4 space-y-3 text-center lg:mt-6">
                                    {card.title && (
                                        <div className="text-blue text-xl font-bold">
                                            {card.title}
                                        </div>
                                    )}

                                    {card.description && (
                                        <div
                                            className="prose prose-sm mx-auto max-w-xs"
                                            dangerouslySetInnerHTML={{
                                                __html: card.description,
                                            }}
                                        />
                                    )}

                                    {/*link?.url && (
                        <span className="inline-flex rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold text-sky-300 transition duration-300 group-hover:bg-slate-800">
                            {link.title || "Learn More"}
                        </span>
                    )*/}
                                </div>
                            </div>
                        );

                        return link?.url ? (
                            <Link
                                key={index}
                                href={link.url}
                                target={
                                    link.target === "_blank"
                                        ? "_blank"
                                        : "_self"
                                }
                                className="block w-[calc(50%-0.5rem)] md:w-[calc(33.333%-0.75rem)] lg:w-auto lg:max-w-75 lg:flex-1"
                            >
                                {cardContent}
                            </Link>
                        ) : (
                            <div
                                key={index}
                                className="w-[calc(50%-0.5rem)] md:w-[calc(33.333%-0.75rem)] lg:w-auto lg:max-w-75 lg:flex-1"
                            >
                                {cardContent}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
