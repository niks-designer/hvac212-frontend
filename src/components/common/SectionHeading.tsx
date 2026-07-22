interface SectionTitleDescription {
    title?: string;
    short_description?: string;
}

interface CTAButton {
    title?: string;
    url?: string;
    target?: string;
}

interface SectionHeadingCTAButtons {
    primary_button?: CTAButton | null;
    secondary_button?: CTAButton | null;
}

interface SectionHeadingProps {
    sectionTitle?: SectionTitleDescription | null;
    title?: string;
    description?: string;
    ctaButtons?: SectionHeadingCTAButtons | null;
    className?: string;
}

export default function SectionHeading({
    sectionTitle,
    title,
    description,
    ctaButtons,
    className,
}: SectionHeadingProps) {
    const headingTitle = sectionTitle?.title?.trim() || title?.trim() || "";
    const headingDescription =
        sectionTitle?.short_description || description || "";

    const primaryButton = ctaButtons?.primary_button;
    const secondaryButton = ctaButtons?.secondary_button;

    return (
        <section className={`${className || "py-16"}`}>
            <div className="container text-center">
                <div className="mx-auto max-w-4xl space-y-4">
                    {headingTitle && (
                        <h2 className="h2-title">{headingTitle}</h2>
                    )}
                    {headingDescription && (
                        <div
                            className="prose text-19 leading-7"
                            dangerouslySetInnerHTML={{
                                __html: headingDescription,
                            }}
                        />
                    )}
                    {(primaryButton?.url || secondaryButton?.url) && (
                        <div className="btn-wrap mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
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
            </div>
        </section>
    );
}
