import Image from "next/image";
import { normalizeACFImage } from "@/lib/acfNormalizers";

interface CenterImageSectionProps {
    title?: string;
    description?: string;
    image?: any;
}

export function CenterImageSection({
    title,
    description,
    image,
}: CenterImageSectionProps) {
    const normalizedImage = normalizeACFImage(image);

    return (
        <section className="px-4 py-16 md:px-8 lg:px-16">
            <div className="mx-auto flex max-w-6xl flex-col items-center text-center">
                {(title || description) && (
                    <div className="mb-10 max-w-3xl">
                        {title && (
                            <h2
                                className="text-3xl font-bold md:text-4xl"
                                style={{ color: "var(--color-heading)" }}
                            >
                                {title}
                            </h2>
                        )}
                        {description && (
                            <p
                                className="mt-4 text-lg leading-relaxed"
                                style={{ color: "var(--color-muted)" }}
                            >
                                {description}
                            </p>
                        )}
                    </div>
                )}

                {normalizedImage?.url && (
                    <div
                        className="w-full max-w-4xl overflow-hidden rounded-2xl border"
                        style={{
                            borderColor: "var(--color-border)",
                            backgroundColor: "var(--color-surface)",
                        }}
                    >
                        <div className="relative aspect-[16/9] w-full">
                            <Image
                                src={normalizedImage.url}
                                alt={
                                    normalizedImage.alt ||
                                    title ||
                                    "Center image"
                                }
                                fill
                                unoptimized
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 75vw"
                            />
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
