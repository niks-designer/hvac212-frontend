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
        <section className="">
            <div className="container text-center">
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
                            <div
                                className="prose"
                                dangerouslySetInnerHTML={{
                                    __html: description,
                                }}
                            />
                        )}
                    </div>
                )}

                {normalizedImage?.url && (
                    <div className="overflow-hidden rounded-3xl">
                        <Image
                            src={normalizedImage.url}
                            alt={normalizedImage.alt || ""}
                            width={normalizedImage.width}
                            height={normalizedImage.height}
                        />
                    </div>
                )}
            </div>
        </section>
    );
}
