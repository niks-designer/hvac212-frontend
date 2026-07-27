"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import MegaMenuCard from "./MegaMenuCard";
import type {
    MegaMenuData,
    MegaMenuLink,
    MegaMenuMaybeLink,
} from "@/lib/megamenu";

interface MegaMenuProps {
    megaMenu?: MegaMenuData | null;
    isOpen: boolean;
    isMobile?: boolean;
    isLoading?: boolean;
    onClose?: () => void;
    onNavigate?: () => void;
}

function toMenuSlug(value: string): string {
    return value
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")
        .replace(/-+/g, "-");
}

function isValidLink(link: MegaMenuMaybeLink): link is MegaMenuLink {
    return (
        !!link &&
        typeof link === "object" &&
        typeof link.url === "string" &&
        link.url.trim().length > 0
    );
}

export default function MegaMenu({
    megaMenu,
    isOpen,
    isMobile = false,
    isLoading = false,
    onClose,
    onNavigate,
}: MegaMenuProps) {
    if (isLoading) return null;

    const submenuClass = megaMenu?.title
        ? `submenu-${toMenuSlug(megaMenu.title)}`
        : "submenu";
    const menuItems = Array.isArray(megaMenu?.menu_items)
        ? megaMenu.menu_items
        : [];
    const bottomLinks = Array.isArray(megaMenu?.bottom_links)
        ? megaMenu.bottom_links
              .map((item) => item?.link)
              .filter((link): link is MegaMenuLink => isValidLink(link))
        : [];

    return (
        <div
            className={`${
                isMobile
                    ? "relative w-full"
                    : "absolute top-14.75 left-1/2 w-[calc(100vw-2rem)] max-w-327.5 -translate-x-1/2"
            } z-51 min-h-125 transform-gpu transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isOpen
                    ? "pointer-events-auto visible translate-y-0 opacity-100"
                    : "pointer-events-none invisible -translate-y-4 opacity-0"
            } `}
        >
            <div className="bg-megamenu min-h-125 overflow-hidden rounded-b-2xl shadow-2xl">
                <div className="w-full">
                    {/* Loading */}
                    {/* {isLoading && (
                        <div className="py-12 text-center text-white">
                        Loading...
                        </div>
                    )} */}

                    {megaMenu ? (
                        <>
                            {/* Desktop */}
                            <div className="hidden lg:block">
                                <div
                                    className={`${submenuClass} grid gap-4 px-16 pt-15 pb-8 ${
                                        menuItems.length === 4
                                            ? "grid-cols-4"
                                            : "grid-cols-5"
                                    }`}
                                >
                                    {menuItems.map((item, index) => (
                                        <MegaMenuCard
                                            key={index}
                                            item={item}
                                            cardRadius={megaMenu.card_radius}
                                            onNavigate={onNavigate}
                                        />
                                    ))}
                                </div>

                                {bottomLinks.length > 0 && (
                                    <div className="bg-blue flex flex-wrap items-center justify-center gap-2 px-6 py-4 text-center text-xl text-[#002D3E]">
                                        <span className="mr-2 font-medium">
                                            {megaMenu.bottom_cta_title}
                                        </span>

                                        {bottomLinks.map((link, index, arr) => (
                                            <span key={index}>
                                                <Link
                                                    href={link.url}
                                                    className="font-semibold text-black underline transition hover:opacity-70"
                                                    onClick={onNavigate}
                                                >
                                                    {link.title}
                                                </Link>

                                                {index < arr.length - 1 && (
                                                    <span className="mx-2 text-black">
                                                        |
                                                    </span>
                                                )}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Mobile */}

                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out lg:hidden ${
                                    isOpen ? "opacity-100" : "opacity-0"
                                }`}
                            >
                                <div className="space-y-5 p-5">
                                    {onClose && (
                                        <div className="flex justify-end">
                                            <button onClick={onClose}>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="25"
                                                    height="25"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="square"
                                                >
                                                    <line
                                                        x1="18"
                                                        y1="6"
                                                        x2="6"
                                                        y2="18"
                                                    ></line>
                                                    <line
                                                        x1="6"
                                                        y1="6"
                                                        x2="18"
                                                        y2="18"
                                                    ></line>
                                                </svg>
                                            </button>
                                        </div>
                                    )}

                                    <div className="grid grid-cols-2 gap-5">
                                        {menuItems.map((item, index) => (
                                            <MegaMenuCard
                                                key={index}
                                                item={item}
                                                cardRadius={
                                                    megaMenu.card_radius
                                                }
                                                onNavigate={onNavigate}
                                            />
                                        ))}
                                    </div>

                                    {bottomLinks.length > 0 && (
                                        <div className="bg-blue rounded-xl p-4 text-center">
                                            <div className="mb-2 font-semibold text-black">
                                                {megaMenu.bottom_cta_title}
                                            </div>

                                            <div className="flex flex-wrap justify-center gap-3">
                                                {bottomLinks.map(
                                                    (link, index) => (
                                                        <Link
                                                            key={index}
                                                            href={link.url}
                                                            className="font-medium text-black underline"
                                                            onClick={onNavigate}
                                                        >
                                                            {link.title}
                                                        </Link>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="h-105" />
                    )}
                </div>
            </div>
        </div>
    );
}
