interface HeroSectionTitleDescription {
    title?: string;
    short_description?: string;
}

interface CTAButton {
    title?: string;
    url?: string;
    target?: string;
}

interface HeroCTAButtons {
    primary_button?: CTAButton | null;
    secondary_button?: CTAButton | null;
}

interface HeadingWithBottomActionProps {
    title?: HeroSectionTitleDescription | null;
    bottomAction?: string | null;
    ctaButtons?: HeroCTAButtons | null;
    className?: string;
}

export default function HeadingWithBottomAction({
    title,
    bottomAction,
    ctaButtons,
    className,
}: HeadingWithBottomActionProps) {
    const heading = title?.title?.trim() || "";
    const shortDescription = title?.short_description || "";
    const primaryButton = ctaButtons?.primary_button;
    const secondaryButton = ctaButtons?.secondary_button;

    return (
        <section className={`${className || "py-10 lg:py-16"}`}>
            <div className="container">
                <div className="sec-ttl relative z-10 mx-auto flex max-w-6xl flex-col gap-5 text-center lg:gap-8">
                    {heading && (
                        <h2
                            className="h2-title"
                            dangerouslySetInnerHTML={{
                                __html: heading,
                            }}
                        />
                    )}

                    {shortDescription && (
                        <div
                            className="prose fs-19"
                            dangerouslySetInnerHTML={{
                                __html: shortDescription,
                            }}
                        />
                    )}

                    {bottomAction && (
                        <div
                            className="action-link text-2xl font-bold lg:text-4xl"
                            dangerouslySetInnerHTML={{ __html: bottomAction }}
                        />
                    )}

                    {(primaryButton?.url || secondaryButton?.url) && (
                        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
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
                                    className="theme-btn bgc-yellow"
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
            </div>
        </section>
    );
}
