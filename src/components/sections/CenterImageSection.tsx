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
                    <div className="sec-ttl mb-7 space-y-5 text-center lg:mb-12">
                        {title && <h2 className="h2-title">{title}</h2>}

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
                    <div className="h-[340px] overflow-hidden rounded-lg sm:h-auto lg:rounded-3xl">
                        <Image
                            src={normalizedImage.url}
                            alt={normalizedImage.alt || ""}
                            width={normalizedImage.width}
                            height={normalizedImage.height}
                            className="h-full w-full object-cover object-[30%_center] sm:h-auto"
                        />
                    </div>
                )}
            </div>
        </section>
    );
}
