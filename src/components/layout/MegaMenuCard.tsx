"use client";

import Image from "next/image";
import Link from "next/link";
import type {
    MegaMenuItem,
    MegaMenuLink,
    MegaMenuMaybeLink,
    MegaMenuNestedItem,
} from "@/lib/megamenu";

interface MegaMenuCardProps {
    item: MegaMenuItem;
    cardRadius?: number | string;
}

type ValidNestedMenuItem = {
    menu_title: string;
    menu_link: MegaMenuLink | null;
};

function isValidLink(link: MegaMenuMaybeLink): link is MegaMenuLink {
    return (
        !!link &&
        typeof link === "object" &&
        typeof link.url === "string" &&
        link.url.trim().length > 0
    );
}

function getValidNestedItems(
    items: MegaMenuNestedItem[] | null | undefined
): ValidNestedMenuItem[] {
    if (!Array.isArray(items)) return [];

    return items
        .filter(
            (
                menuItem
            ): menuItem is {
                menu_title: string;
                menu_link?: MegaMenuMaybeLink;
            } =>
                typeof menuItem?.menu_title === "string" &&
                menuItem.menu_title.trim().length > 0
        )
        .map((menuItem) => ({
            menu_title: menuItem.menu_title.trim(),
            menu_link: isValidLink(menuItem.menu_link)
                ? menuItem.menu_link
                : null,
        }));
}

export default function MegaMenuCard({ item, cardRadius }: MegaMenuCardProps) {
    const radius = Number(cardRadius) || 18;
    const image =
        item.image_with_link?.image &&
        typeof item.image_with_link.image === "object"
            ? item.image_with_link.image
            : null;
    const imageLink = item.image_with_link?.image_link;
    const title =
        typeof item.title_with_link?.title === "string"
            ? item.title_with_link.title.trim()
            : "";
    const titleLink = item.title_with_link?.title_link;
    const nestedItems = getValidNestedItems(item.menu_items);
    const hasDescription =
        typeof item.description === "string" &&
        item.description.trim().length > 0;

    return (
        <div className="group mx-auto block w-fit">
            <div
                className="flex h-full flex-col rounded-2xl transition-all duration-300"
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
                    {image?.url ? (
                        isValidLink(imageLink) ? (
                            <Link
                                href={imageLink.url}
                                target={imageLink.target || "_self"}
                            >
                                <Image
                                    src={image.url}
                                    alt={
                                        image.alt || title || "Mega menu image"
                                    }
                                    width={image.width || 620}
                                    height={image.height || 390}
                                    className="w-full object-cover transition-transform duration-300"
                                    unoptimized
                                />
                            </Link>
                        ) : (
                            <Image
                                src={image.url}
                                alt={image.alt || title || "Mega menu image"}
                                width={image.width || 620}
                                height={image.height || 390}
                                className="w-full object-cover transition-transform duration-300"
                                unoptimized
                            />
                        )
                    ) : (
                        <div className="h-full w-full bg-white/10" />
                    )}
                </div>

                {title ? (
                    isValidLink(titleLink) ? (
                        <h3 className="mt-5 text-xl font-bold">
                            <Link
                                href={titleLink.url}
                                target={titleLink.target || "_self"}
                                className="text-blue hover:text-yellow transition-colors duration-300"
                            >
                                {title}
                            </Link>
                        </h3>
                    ) : (
                        <h3 className="text-blue mt-5 text-xl font-bold">
                            {title}
                        </h3>
                    )
                ) : null}

                {nestedItems.length > 0 && (
                    <ul className="mt-4 space-y-1">
                        {nestedItems.map((menuItem, index) => (
                            <li key={`${menuItem.menu_title}-${index}`}>
                                {menuItem.menu_link ? (
                                    <Link
                                        href={menuItem.menu_link.url}
                                        target={
                                            menuItem.menu_link.target || "_self"
                                        }
                                        className="hover:text-blue text-[17px] leading-5 transition"
                                    >
                                        {menuItem.menu_title}
                                    </Link>
                                ) : (
                                    <span className="text-[17px] leading-5">
                                        {menuItem.menu_title}
                                    </span>
                                )}
                            </li>
                        ))}
                    </ul>
                )}

                {hasDescription && (
                    <div
                        className="mt-3 text-[17px] leading-5"
                        dangerouslySetInnerHTML={{
                            __html: item.description as string,
                        }}
                    />
                )}
            </div>
        </div>
    );
}
