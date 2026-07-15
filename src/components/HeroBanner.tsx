import Image from "next/image";
import { normalizeACFImage } from "@/lib/acfNormalizers";

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

interface HeroBannerProps {
    heroSectionTitle?: HeroSectionTitleDescription | null;
    backgroundImage?: ACFImage | any;
    ctaButtons?: HeroCTAButtons | null;
    primary_button?: CTAButton | any;
    secondary_button?: CTAButton | any;
}

export function HeroBanner({
    heroSectionTitle,
    backgroundImage,
    ctaButtons,
    primary_button,
    secondary_button,
}: HeroBannerProps) {
    const normalizedImage = normalizeACFImage(backgroundImage);
    const title = heroSectionTitle?.title?.trim() || "";
    const description = heroSectionTitle?.short_description?.trim() || "";
    const primaryButton = ctaButtons?.primary_button || primary_button;
    const secondaryButton = ctaButtons?.secondary_button || secondary_button;

    //   console.log("HeroBanner - backgroundImage prop:", backgroundImage);
    //   console.log("HeroBanner - normalizedImage:", normalizedImage);
    //   console.log("HeroBanner - alt text:", normalizedImage?.alt);

    return (
        <section className="relative flex h-96 items-center justify-center overflow-hidden md:h-[650px]">
            {/* Background Image */}
            {normalizedImage?.url ? (
                <div className="absolute inset-0">
                    <Image
                        src={normalizedImage.url}
                        alt={normalizedImage.alt || "Hero background"}
                        fill
                        priority
                        unoptimized
                        className="object-cover"
                        sizes="100vw"
                        onError={(e) => {
                            console.error(
                                "Image failed to load:",
                                normalizedImage.url
                            );
                            console.error("Full error:", e);
                        }}
                    />
                    <div
                        className="absolute inset-0"
                        style={{ backgroundColor: "var(--color-overlay)" }}
                    ></div>
                </div>
            ) : (
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "linear-gradient(90deg, var(--color-blue), var(--color-primary))",
                    }}
                ></div>
            )}

            {/* Content */}
            <div
                className="relative z-10 max-w-3xl px-4 text-center"
                style={{ color: "var(--color-white)" }}
            >
                {title && (
                    <h1 className="mb-4 text-4xl font-bold drop-shadow-lg md:text-5xl lg:text-6xl">
                        {title}
                    </h1>
                )}
                {description && (
                    <p className="text-lg drop-shadow-md md:text-xl">
                        {description}
                    </p>
                )}
                <div className="btn-wrap mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                    {/* Primary Button */}
                    {primaryButton?.url && (
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
                            className="inline-block rounded-[100] px-8 py-4 font-bold transition-colors"
                            style={{
                                backgroundColor: "var(--color-blue)",
                                color: "var(--color-secondary)",
                            }}
                        >
                            {primaryButton.title || "Learn More"}
                        </a>
                    )}
                    {/* Secondary Button */}
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
                            className="inline-block rounded-lg border-2 px-8 py-3 font-bold transition-colors"
                            style={{
                                backgroundColor: "transparent",
                                color: "var(--color-white)",
                                borderColor: "var(--color-white)",
                            }}
                        >
                            {secondaryButton.title || "Get Started"}
                        </a>
                    )}
                </div>
            </div>
        </section>
    );
}
