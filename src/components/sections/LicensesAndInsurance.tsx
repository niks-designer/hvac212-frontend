import Image from "next/image";
import type { ACFImage } from "@/lib/wordpress";

interface LicenseItem {
    licenses_image?: ACFImage | null;
    licenses_description?: string;
}

interface LicensesAndInsuranceProps {
    licenses_item?: LicenseItem[] | null;
    className?: string;
}

export default function LicensesAndInsurance({
    licenses_item,
    className,
}: LicensesAndInsuranceProps) {
    const items = Array.isArray(licenses_item) ? licenses_item : [];

    if (items.length === 0) return null;

    return (
        <section
            className={`bg-[#ececec] dark:bg-[#070F1D99] ${className || "py-12 lg:py-20"}`}
        >
            <div className="container">
                <div className="mx-auto flex max-w-4xl flex-col gap-9">
                    {items.map((item, index) => {
                        const img = item.licenses_image;

                        return (
                            <div
                                key={index}
                                className="flex flex-col items-center gap-5 md:w-fit md:flex-row md:gap-9"
                            >
                                {img?.url && (
                                    <div className="min-w-[325px] text-center">
                                        <Image
                                            src={img.url}
                                            alt={img.alt || img.title || ""}
                                            width={img.width || 160}
                                            height={img.height || 80}
                                            className={`mx-auto w-auto${index === 0 || index === 3 ? " light-brand" : ""}`}
                                        />
                                    </div>
                                )}
                                {item.licenses_description && (
                                    <div
                                        className="prose fs-19 text-center md:text-left"
                                        dangerouslySetInnerHTML={{
                                            __html: item.licenses_description,
                                        }}
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
