"use client";

import Image from "next/image";
import Link from "next/link";
import type { MegaMenuItem } from "@/lib/megamenu";

interface MegaMenuCardProps {
    item: MegaMenuItem;
    cardRadius?: number | string;
}

export default function MegaMenuCard({ item, cardRadius }: MegaMenuCardProps) {
    const radius = Number(cardRadius) || 18;

    return (
        <Link href={item.link?.url || "#"} className="group block">
            <div
                className="flex h-full flex-col rounded-2xl transition-all duration-300 hover:-translate-y-1"
                style={{
                    borderRadius: radius,
                    backgroundColor: "transparent",
                }}
            >
                <div
                    className="relative overflow-hidden rounded-2xl"
                    style={{
                        borderRadius: radius,
                    }}
                >
                    {item.image?.url ? (
                        <Image
                            src={item.image.url}
                            alt={item.image.alt || item.title}
                            width={item.image.width || 620}
                            height={item.image.height || 390}
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            unoptimized
                        />
                    ) : (
                        <div className="h-full w-full bg-white/10" />
                    )}
                </div>

                <h3 className="text-blue group-hover:text-yellow mt-5 text-xl font-bold transition-colors">
                    {item.title}
                </h3>

                {item.description && (
                    <div
                        className="mt-4 text-lg leading-8 text-white"
                        dangerouslySetInnerHTML={{
                            __html: item.description,
                        }}
                    />
                )}
            </div>
        </Link>
    );
}
