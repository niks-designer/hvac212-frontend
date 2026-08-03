"use client";

import { useEffect, useState } from "react";
import { useSiteSettings } from "@/components/providers/SiteSettingsProvider";
import type { LinkField } from "@/lib/wordpress";

interface MaintenanceTermsProps {
    layout?: {
        mt_link_text?: string;
        mt_description?: string;
    } | null;
    mt_link_text?: string;
    mt_description?: string;
    termsPopupTitle?: string;
    termsPopupContent?: string;
    enroll_button?: LinkField | null;
}

const DEFAULT_LINK_TEXT = "See Terms & Conditions";
const DEFAULT_TERMS_DESCRIPTION =
    "Memberships apply to equipment in good working condition at the initial visit. Troubleshooting and repairs for <br>malfunctioning units will be quoted separately.";
const DEFAULT_ENROLL_BUTTON: Required<LinkField> = {
    title: "Enroll Today",
    url: "https://app.kickserv.com/212hvac/portal",
    target: "_blank",
};

export default function MaintenanceTerms({
    layout,
    mt_link_text,
    mt_description,
    termsPopupTitle,
    termsPopupContent,
    enroll_button,
}: MaintenanceTermsProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isRendered, setIsRendered] = useState(false);

    const openModal = () => {
        setIsOpen(true);
        setIsRendered(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        window.setTimeout(() => setIsRendered(false), 220);
    };

    useEffect(() => {
        if (!isOpen) {
            return undefined;
        }

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) {
            return undefined;
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                closeModal();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen]);

    const globalSettings = useSiteSettings();

    const linkText =
        (mt_link_text ?? layout?.mt_link_text ?? "").trim() ||
        DEFAULT_LINK_TEXT;
    const description =
        (mt_description ?? layout?.mt_description ?? "").trim() ||
        DEFAULT_TERMS_DESCRIPTION;
    const popupTitle =
        (termsPopupTitle ?? globalSettings?.termsPopupTitle ?? "").trim() ||
        "Terms & Conditions";
    const popupContent =
        (termsPopupContent ?? globalSettings?.termsPopupContent ?? "").trim() ||
        "";

    const enrollButtonText = (
        enroll_button?.title ?? DEFAULT_ENROLL_BUTTON.title
    ).trim();
    const enrollButtonUrl = (
        enroll_button?.url ?? DEFAULT_ENROLL_BUTTON.url
    ).trim();
    const enrollButtonTarget =
        (enroll_button?.target ?? DEFAULT_ENROLL_BUTTON.target).trim() ||
        undefined;
    const hasEnrollButton = Boolean(enrollButtonText && enrollButtonUrl);

    return (
        <>
            <div className="w-full px-4 py-10 text-center lg:py-15">
                {hasEnrollButton ? (
                    <div className="mb-4 lg:mb-8">
                        <a
                            href={enrollButtonUrl}
                            target={enrollButtonTarget}
                            rel={
                                enrollButtonTarget === "_blank"
                                    ? "noopener noreferrer"
                                    : undefined
                            }
                            className="theme-btn bgc-yellow"
                        >
                            {enrollButtonText}
                        </a>
                    </div>
                ) : null}
                <button
                    type="button"
                    onClick={openModal}
                    className="fs-19 cursor-pointer font-light underline"
                >
                    {linkText}
                </button>

                {description ? (
                    <p
                        className="mt-5 text-base italic"
                        dangerouslySetInnerHTML={{
                            __html: description,
                        }}
                    />
                ) : null}
            </div>

            {isRendered ? (
                <div
                    className={`fixed inset-0 z-100 flex items-center justify-center bg-slate-950/40 px-4 py-4 backdrop-blur-xl transition-opacity duration-300 sm:py-8 ${
                        isOpen ? "opacity-100" : "opacity-0"
                    }`}
                    onClick={closeModal}
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="maintenance-terms-title"
                        className={`relative flex max-h-[calc(100dvh-2rem)] w-full max-w-6xl flex-col overflow-hidden rounded-3xl bg-[#070F1D99] p-6 transition-all duration-300 in-[.light]:bg-[#ececec] sm:max-h-[calc(100dvh-4rem)] lg:p-13 ${
                            isOpen
                                ? "scale-100 opacity-100"
                                : "scale-95 opacity-0"
                        }`}
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="mb-4 lg:mb-7">
                            <button
                                type="button"
                                aria-label="Close terms popup"
                                onClick={closeModal}
                                className="hover:text-blue absolute top-4 right-4 z-10 inline-flex h-6 w-6 cursor-pointer items-center justify-center transition sm:top-5 sm:right-5 lg:h-11 lg:w-11"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="30"
                                    height="32"
                                    viewBox="0 0 30 32"
                                    fill="none"
                                >
                                    <line
                                        x1="1.06066"
                                        y1="2.41553"
                                        x2="29"
                                        y2="30.3549"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                    />
                                    <line
                                        x1="29"
                                        y1="1.06066"
                                        x2="1.06067"
                                        y2="29"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </button>

                            <h3
                                id="maintenance-terms-title"
                                className="h2-title"
                            >
                                {popupTitle}
                            </h3>
                        </div>

                        <style
                            dangerouslySetInnerHTML={{
                                __html: `#maintenance-terms-content::-webkit-scrollbar { width: 10px; }
#maintenance-terms-content::-webkit-scrollbar-track { background: #000000; border-radius: 9999px; }
#maintenance-terms-content::-webkit-scrollbar-thumb { background: #ffffff; border-radius: 9999px; border: 2px solid #000000; }
#maintenance-terms-content { scrollbar-width: thin; scrollbar-color: #ffffff #000000; }`,
                            }}
                        />

                        <div
                            id="maintenance-terms-content"
                            className="min-h-0 flex-1 overflow-y-auto pr-3 text-sm leading-7"
                        >
                            {popupContent ? (
                                <div
                                    className="terms-content"
                                    dangerouslySetInnerHTML={{
                                        __html: popupContent,
                                    }}
                                />
                            ) : (
                                <p className="text-slate-400">
                                    No content available.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
}
