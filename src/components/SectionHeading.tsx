interface SectionTitleDescription {
    title?: string;
    short_description?: string;
}

interface SectionHeadingProps {
    sectionTitle?: SectionTitleDescription | null;
    title?: string;
    description?: string;
}

export default function SectionHeading({
    sectionTitle,
    title,
    description,
}: SectionHeadingProps) {
    const headingTitle = sectionTitle?.title?.trim() || title?.trim() || "";
    const headingDescription =
        sectionTitle?.short_description?.trim() || description?.trim() || "";
    const descriptionLines = headingDescription
        .replace(/<br\s*\/?>/gi, "\n")
        .split(/\r?\n/)
        .filter((line) => line.length > 0);

    return (
        <section className="mx-auto max-w-6xl px-4 py-16 md:px-8 lg:px-16">
            <div className="space-y-4">
                {headingTitle && (
                    <h2
                        className="text-3xl font-bold md:text-4xl"
                        style={{ color: "var(--color-heading)" }}
                    >
                        {headingTitle}
                    </h2>
                )}
                {descriptionLines.length > 0 && (
                    <div
                        className="text-lg leading-relaxed whitespace-pre-wrap"
                        style={{ color: "var(--color-muted)" }}
                    >
                        {descriptionLines.map((line, index) => (
                            <p key={`${line}-${index}`}>
                                {line}
                                {index < descriptionLines.length - 1 ? (
                                    <br />
                                ) : null}
                            </p>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
