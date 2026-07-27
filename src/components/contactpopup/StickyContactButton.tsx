"use client";

import React from "react";

interface Props {
    onClick?: () => void;
}

export default function StickyContactButton({ onClick }: Props) {
    return (
        <button
            onClick={onClick}
            aria-label="Open contact form"
            className="bg-yellow text-primary fixed top-[85%] right-0 z-10 cursor-pointer rounded-tl-[30px] rounded-bl-[40px] px-4 py-3 text-sm font-bold shadow-lg transition-transform focus:outline-none sm:px-5 sm:text-base md:top-[70%] md:px-8 md:py-4 md:text-lg lg:px-10"
        >
            Contact Us
        </button>
    );
}
