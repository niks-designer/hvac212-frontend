"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import StickyContactButton from "@/components/contactpopup/StickyContactButton";
import ContactForm from "./ContactForm";

interface ContactContextValue {
    open: boolean;
    openPopup: () => void;
    closePopup: () => void;
}

const ContactPopupContext = createContext<ContactContextValue | undefined>(
    undefined
);

export function useContactPopup() {
    const ctx = useContext(ContactPopupContext);
    if (!ctx)
        throw new Error(
            "useContactPopup must be used within ContactPopupProvider"
        );
    return ctx;
}

export function ContactPopupProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setOpen(false);
    }, [pathname]);

    useEffect(() => {
        if (open) {
            const prev = document.body.style.overflow;
            document.body.style.overflow = "hidden";
            return () => {
                document.body.style.overflow = prev;
            };
        }
    }, [open]);

    const openPopup = () => setOpen(true);
    const closePopup = () => setOpen(false);

    return (
        <ContactPopupContext.Provider value={{ open, openPopup, closePopup }}>
            {children}
            <StickyContactButton onClick={openPopup} />
            <ContactPopup open={open} onClose={closePopup} />
        </ContactPopupContext.Provider>
    );
}

function ContactPopup({
    open,
    onClose,
}: {
    open: boolean;
    onClose: () => void;
}) {
    const [visible, setVisible] = useState(open);
    const [animateIn, setAnimateIn] = useState(false);

    useEffect(() => {
        let timeoutId: ReturnType<typeof setTimeout> | undefined;

        if (open) {
            setVisible(true);
            setAnimateIn(false);
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setAnimateIn(true);
                });
            });
        } else {
            setAnimateIn(false);
            timeoutId = setTimeout(() => setVisible(false), 350);
        }

        return () => {
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [open]);

    if (!visible) return null;

    const rightMargin = 0; // px, can be 20-30
    const translateXValue = animateIn ? "0" : `calc(100% + ${rightMargin}px)`;
    const panelStyle: React.CSSProperties = {
        right: rightMargin,
        top: "50%",
        transform: `translateX(${translateXValue}) translateY(-50%)`,
        transition: "transform 350ms ease-in-out, opacity 350ms ease-in-out",
        opacity: animateIn ? 1 : 0,
        willChange: "transform, opacity",
        position: "fixed",
        zIndex: 60,
        width: "min(400px, calc(100% - 30px))",
    };

    return (
        <div aria-hidden={!open} className={`fixed inset-0 z-50`}>
            {/* Backdrop */}
            <div
                onClick={onClose}
                className={`absolute inset-0 bg-black/50`}
                style={{
                    opacity: open ? 1 : 0,
                    transition: "opacity 350ms ease-in-out",
                }}
            />

            {/* Panel anchored to the right; slides in/out horizontally */}
            <div
                role="dialog"
                aria-modal="true"
                onClick={(e) => e.stopPropagation()}
                style={panelStyle}
            >
                <div className="bg-yellow text-primary rounded-tl-2xl rounded-bl-2xl px-7 py-8 shadow-xl">
                    <button
                        aria-label="Close contact form"
                        onClick={onClose}
                        className="absolute top-4 right-4 inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="17"
                            viewBox="0 0 16 17"
                            fill="none"
                        >
                            <line
                                x1="1.06066"
                                y1="1.24951"
                                x2="15"
                                y2="15.1888"
                                stroke="black"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                            />
                            <line
                                x1="15"
                                y1="1.06066"
                                x2="1.06066"
                                y2="15"
                                stroke="black"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                            />
                        </svg>
                    </button>

                    <h3 className="mb-4 text-center text-lg font-extrabold">
                        Contact Us
                    </h3>
                    <ContactForm />
                </div>
            </div>
        </div>
    );
}

export default ContactPopup;
