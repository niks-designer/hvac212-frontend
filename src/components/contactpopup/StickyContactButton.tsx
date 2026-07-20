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
            className="bg-yellow text-primary fixed top-1/2 right-0 z-50 -translate-y-1/2 cursor-pointer rounded-tl-[30px] rounded-bl-[40px] px-3 py-4 text-lg font-bold shadow-lg transition-transform focus:outline-none sm:px-6 md:px-8 lg:px-10"
        >
            Contact Us
        </button>
    );
}
