import Image from "next/image";
import { normalizeACFImage } from "@/lib/acfNormalizers";
import Link from "next/link";

interface ACFImage {
    ID?: number;
    id?: number;
    url: string;
    alt?: string;
    title?: string;
}

interface CTAButton {
    title?: string;
    url?: string;
    target?: string;
}

interface HeroSectionTitleDescription {
    title?: string;
    short_description?: string;
}

interface HeroCTAButtons {
    primary_button?: CTAButton | null;
    secondary_button?: CTAButton | null;
}

interface InnerPageHeroBannerProps {
    title?: HeroSectionTitleDescription | null;
    backgroundImage?: ACFImage | any;
    ctaButtons?: HeroCTAButtons | null;
    className?: string;
}

export function InnerPageHeroBanner({
    title,
    backgroundImage,
    ctaButtons,
    className,
}: InnerPageHeroBannerProps) {
    const normalizedImage = normalizeACFImage(backgroundImage);
    const heading = title?.title?.trim() || "";
    const description = title?.short_description?.trim() || "";
    const primaryButton = ctaButtons?.primary_button;
    const secondaryButton = ctaButtons?.secondary_button;

    return (
        <section
            className={`relative flex h-auto items-center justify-center overflow-hidden lg:h-115 ${className || ""}`}
        >
            {normalizedImage?.url ? (
                <div className="relative lg:absolute lg:inset-0">
                    <Image
                        src={normalizedImage.url}
                        alt={normalizedImage.alt || "Hero background"}
                        width={normalizedImage.width}
                        height={normalizedImage.height}
                        className="h-full w-full object-cover"
                    />
                    <div className="hero-overlay absolute inset-0"></div>
                </div>
            ) : (
                <div className="from-blue to-primary absolute inset-0 bg-linear-to-r"></div>
            )}

            <div className="absolute z-10 flex flex-col gap-4 px-4 text-center text-white lg:relative">
                {heading && <h1 className="h1-title inner-h1">{heading}</h1>}
                {description && (
                    <div
                        className="prose text-2xl"
                        dangerouslySetInnerHTML={{ __html: description }}
                    />
                )}
                {(primaryButton?.url || secondaryButton?.url) && (
                    <div className="btn-wrap mt-2 flex flex-col items-center justify-center gap-4 sm:flex-row">
                        {primaryButton?.url && (
                            <Link
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
                                className="theme-btn"
                            >
                                {primaryButton.title || "Learn More"}
                            </Link>
                        )}

                        {secondaryButton?.url && (
                            <Link
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
                                {secondaryButton.title || "Get Started"}
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}
