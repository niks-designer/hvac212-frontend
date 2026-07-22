import Image from "next/image";
import { normalizeACFImage } from "@/lib/acfNormalizers";

interface CenterImageSectionProps {
    title?: string;
    description?: string;
    image?: any;
    className?: string;
}

export function CenterImageSection({
    title,
    description,
    image,
    className,
}: CenterImageSectionProps) {
    const normalizedImage = normalizeACFImage(image);

    return (
        <section className={`${className || ""}`}>
            <div className="container text-center">
                {(title || description) && (
                    <div className="mb-10 max-w-3xl">
                        {title && (
                            <h2 className="h2-title">
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
