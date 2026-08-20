import type { LinkField } from "@/lib/wordpress";
import Link from "next/link";

interface ErrorCodeButtonItem {
    code_button?: LinkField | null;
}

interface ErrorCodeButtonsProps {
    error_code_pages_list?: ErrorCodeButtonItem[] | null;
    className?: string;
}

export function ErrorCodeButtons({
    error_code_pages_list,
    className,
}: ErrorCodeButtonsProps) {
    const items = error_code_pages_list ?? [];

    if (!items.length) {
        return null;
    }

    return (
        <section className={className || "py-10 lg:py-16"}>
            <div className="container">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                    {items.map((item, index) => {
                        const button = item.code_button;
                        const label = (button?.title || "View Code").trim();
                        const href = (button?.url || "#").trim();
                        const target =
                            button?.target === "_blank"
                                ? "_blank"
                                : button?.target === "_self"
                                  ? "_self"
                                  : "_self";

                        if (!href || href === "#") {
                            return null;
                        }

                        return (
                            <Link
                                key={`${label}-${index}`}
                                href={href}
                                target={target}
                                rel={
                                    target === "_blank"
                                        ? "noopener noreferrer"
                                        : undefined
                                }
                                className="theme-btn flex h-full min-h-14 items-center justify-center text-center"
                            >
                                {label}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
