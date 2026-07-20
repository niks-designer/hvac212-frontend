"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import MegaMenuCard from "./MegaMenuCard";
import type { MegaMenuData } from "@/lib/megamenu";

interface MegaMenuProps {
    megaMenu?: MegaMenuData | null;
    isOpen: boolean;
    isMobile?: boolean;
    isLoading?: boolean;
    onClose?: () => void;
}

export default function MegaMenu({
    megaMenu,
    isOpen,
    isMobile = false,
    isLoading = false,
    onClose,
}: MegaMenuProps) {
    if (isLoading) return null;

    return (
        <div
            className={`${
                isMobile
                    ? "relative w-full"
                    : "absolute top-[57px] left-1/2 w-[1100px] max-w-[calc(100vw-120px)] -translate-x-1/2"
            } z-50 min-h-[500px] transform-gpu transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isOpen
                    ? "pointer-events-auto visible translate-y-0 opacity-100"
                    : "pointer-events-none invisible -translate-y-4 opacity-0"
            } `}
        >
            <div className="bg-primary overflow-hidden rounded-b-2xl shadow-2xl">
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
                                    className={`grid gap-6 px-14 py-8 ${
                                        megaMenu.menu_items.length === 4
                                            ? "grid-cols-4"
                                            : "grid-cols-5"
                                    }`}
                                >
                                    {megaMenu.menu_items.map((item, index) => (
                                        <MegaMenuCard
                                            key={index}
                                            item={item}
                                            cardRadius={megaMenu.card_radius}
                                        />
                                    ))}
                                </div>

                                {megaMenu.bottom_links &&
                                    megaMenu.bottom_links.length > 0 && (
                                        <div className="bg-blue flex flex-wrap items-center justify-center gap-2 px-6 py-4 text-center text-xl text-[#002D3E]">
                                            <span className="mr-2 font-medium">
                                                {megaMenu.bottom_cta_title}
                                            </span>

                                            {megaMenu.bottom_links.map(
                                                (item, index, arr) => (
                                                    <span key={index}>
                                                        <Link
                                                            href={item.link.url}
                                                            className="font-semibold text-black underline transition hover:opacity-70"
                                                        >
                                                            {item.link.title}
                                                        </Link>

                                                        {index <
                                                            arr.length - 1 && (
                                                            <span className="mx-2 text-black">
                                                                |
                                                            </span>
                                                        )}
                                                    </span>
                                                )
                                            )}
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
                                            <button
                                                onClick={onClose}
                                                className="text-white"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    )}

                                    <div className="grid grid-cols-2 gap-5">
                                        {megaMenu.menu_items.map(
                                            (item, index) => (
                                                <MegaMenuCard
                                                    key={index}
                                                    item={item}
                                                    cardRadius={
                                                        megaMenu.card_radius
                                                    }
                                                />
                                            )
                                        )}
                                    </div>

                                    {megaMenu.bottom_links &&
                                        megaMenu.bottom_links.length > 0 && (
                                            <div
                                                className="rounded-xl p-4 text-center"
                                                style={{
                                                    background: "#12C8FF",
                                                }}
                                            >
                                                <div className="mb-2 font-semibold text-black">
                                                    {megaMenu.bottom_cta_title}
                                                </div>

                                                <div className="flex flex-wrap justify-center gap-3">
                                                    {megaMenu.bottom_links.map(
                                                        (item, index) => (
                                                            <Link
                                                                key={index}
                                                                href={
                                                                    item.link
                                                                        .url
                                                                }
                                                                className="font-medium text-black underline"
                                                            >
                                                                {
                                                                    item.link
                                                                        .title
                                                                }
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
                        <div className="h-[420px]" />
                    )}
                </div>
            </div>
        </div>
    );
}
