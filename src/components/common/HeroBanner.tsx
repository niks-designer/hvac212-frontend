import Image from "next/image";
import { normalizeACFImage } from "@/lib/acfNormalizers";

interface ACFImage {
    ID?: number;
    id?: number;
    url: string;
    alt?: string;
    title?: string;
    mime_type?: string;
    width?: number;
    height?: number;
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
    select_bg_video?: ACFImage | any;
    ctaButtons?: HeroCTAButtons | null;
    primary_button?: CTAButton | any;
    secondary_button?: CTAButton | any;
    className?: string;
}

export function HeroBanner({
    heroSectionTitle,
    backgroundImage,
    select_bg_video,
    ctaButtons,
    primary_button,
    secondary_button,
    className,
}: HeroBannerProps) {
    const normalizedImage = normalizeACFImage(backgroundImage);
    const videoSource = select_bg_video;
    const normalizedVideo = normalizeACFImage(videoSource);
    const videoUrl =
        normalizedVideo?.url ||
        (typeof videoSource === "string" ? videoSource : "");
    const title = heroSectionTitle?.title?.trim() || "";
    const description = heroSectionTitle?.short_description?.trim() || "";
    const primaryButton = ctaButtons?.primary_button || primary_button;
    const secondaryButton = ctaButtons?.secondary_button || secondary_button;
    const hasVideoUrl = Boolean(videoUrl);
    const isImageFile = Boolean(
        videoSource?.mime_type?.startsWith("image/") ||
        /\.(png|jpe?g|gif|webp|svg)(\?.*)?$/i.test(videoUrl)
    );
    const hasBackgroundVideo = hasVideoUrl && !isImageFile;

    //   console.log("HeroBanner - backgroundImage prop:", backgroundImage);
    //   console.log("HeroBanner - normalizedImage:", normalizedImage);
    //   console.log("HeroBanner - alt text:", normalizedImage?.alt);

    return (
        <section
            className={`relative flex h-140 items-center justify-center overflow-hidden md:h-162.5 ${className || ""}`}
        >
            {/* Background Media */}
            {hasBackgroundVideo ? (
                <div className="absolute inset-0">
                    <video
                        className="h-full w-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                    >
                        <source
                            src={videoUrl}
                            type={videoSource?.mime_type || "video/mp4"}
                        />
                    </video>
                    <div className="hero-overlay absolute inset-0"></div>
                </div>
            ) : normalizedImage?.url ? (
                <div className="absolute inset-0">
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

            {/* Content */}
            <div className="relative z-10 flex max-w-3xl flex-col gap-4 px-4 text-center text-white">
                {title && <h1 className="h1-title">{title}</h1>}
                {description && (
                    <div
                        className="prose text-2xl"
                        dangerouslySetInnerHTML={{ __html: description }}
                    />
                )}
                {(primaryButton?.url || secondaryButton?.url) && (
                    <div className="btn-wrap mt-2 flex flex-col items-center justify-center gap-4 sm:flex-row">
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
                                className="theme-btn"
                            >
                                {primaryButton.title || "Learn More"}
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
                                {secondaryButton.title || "Get Started"}
                            </a>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}
