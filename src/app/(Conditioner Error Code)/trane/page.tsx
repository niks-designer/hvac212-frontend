"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`-mr-2 h-6 w-6 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
    >
        <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
);

const PlusIcon = ({ isOpen }: { isOpen: boolean }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="13"
        height="13"
        viewBox="0 0 12 12"
        fill="none"
        className={`shrink-0 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
    >
        <path
            d="M12 6.85714H6.85714V12H5.14286V6.85714H0V5.14286H5.14286V0H6.85714V5.14286H12V6.85714Z"
            fill="currentColor"
        />
    </svg>
);

const AccordionContent = ({
    isOpen,
    children,
    className = "",
}: {
    isOpen: boolean;
    children: React.ReactNode;
    className?: string;
}) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const [maxHeight, setMaxHeight] = useState("0px");

    useEffect(() => {
        if (isOpen && contentRef.current) {
            setMaxHeight(`${contentRef.current.scrollHeight}px`);
        } else {
            setMaxHeight("0px");
        }
    }, [isOpen]);

    return (
        <div
            className={`accordion-content overflow-hidden ${
                isOpen ? "" : ""
            } ${className}`}
            style={{ maxHeight, transition: "max-height 0.4s ease-in-out" }}
            ref={contentRef}
        >
            {children}
        </div>
    );
};

const traneAirConditioningCodes = [
    {
        id: "traneAirConditioningH0",
        code: "H0",
        result: "M_Home unmatching (Reserve).",
    },
    {
        id: "traneAirConditioningE0",
        code: "E0",
        result: "EEPROM Fault.",
    },
    {
        id: "traneAirConditioningE2",
        code: "E2",
        result: "Communication fault of the outdoor chip and the indoor chip",
    },
    {
        id: "traneAirConditioningE3",
        code: "E3",
        result: "Communication error between Main board and IR341",
    },
    {
        id: "traneAirConditioningE4",
        code: "E4",
        result: "Outdoor unit sensor fault.",
    },
    {
        id: "traneAirConditioningE5",
        code: "E5",
        result: "Voltage protection fault.",
    },
    {
        id: "traneAirConditioningE6",
        code: "E6",
        result: "Direct-current fan fault.",
    },
    {
        id: "traneAirConditioningE7",
        code: "E7",
        result: "Heating fan fault in the area A lasts for 5 minutes.",
    },
    {
        id: "traneAirConditioningE8",
        code: "E8",
        result: "There are two times E6 fault in 10 minutes (recovery will be after power off).",
    },
    {
        id: "traneAirConditioningP0",
        code: "P0",
        result: "The cooling fin high temperature protection.",
    },
    {
        id: "traneAirConditioningP1",
        code: "P1",
        result: "High pressure protection.",
    },
    {
        id: "traneAirConditioningP2",
        code: "P2",
        result: "Low pressure protection.",
    },
    {
        id: "traneAirConditioningP3",
        code: "P3",
        result: "Compressor current protection.",
    },
    {
        id: "traneAirConditioningP4",
        code: "P4",
        result: "Discharge temperature protection.",
    },
    {
        id: "traneAirConditioningP5",
        code: "P5",
        result: "Outdoor condenser high temperature protection.",
    },
    {
        id: "traneAirConditioningP6",
        code: "P6",
        result: "IPM modules protection.",
    },
    {
        id: "traneAirConditioningP7",
        code: "P7",
        result: "Evaporator high temperature protection.",
    },
    {
        id: "traneAirConditioningP8",
        code: "P8",
        result: "Typhoon protection.",
    },
];

export default function TranePage() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [expandedAccordion, setExpandedAccordion] = useState<string | null>(
        "TraneAirConditioningCodes"
    );

    useEffect(() => {
        const hash = window.location.hash.slice(1);

        if (hash) {
            setTimeout(() => {
                const element = document.getElementById(hash);

                if (element) {
                    const headerHeight = 122;
                    const elementPosition =
                        element.getBoundingClientRect().top + window.scrollY;

                    window.scrollTo({
                        top: elementPosition - headerHeight,
                        behavior: "smooth",
                    });
                }
            }, 100);
        }
    }, []);

    const scrollToCode = (id: string) => {
        const element = document.getElementById(id);

        if (element) {
            const headerHeight = 150;
            const elementPosition =
                element.getBoundingClientRect().top + window.scrollY;

            window.scrollTo({
                top: elementPosition - headerHeight,
                behavior: "smooth",
            });
        }
    };

    const CodeSection = ({
        codes,
    }: {
        codes: typeof traneAirConditioningCodes;
    }) => (
        <div className="code-results space-y-6 lg:space-y-8">
            {codes.map((item) => (
                <div key={item.id} className="code-info" id={item.id}>
                    <h3 className="text-xl font-medium lg:mb-2 lg:text-2xl">
                        CODE: {item.code}
                    </h3>

                    <p className="fs-19">
                        <b>RESULT:</b>&nbsp;{item.result}
                    </p>
                </div>
            ))}
        </div>
    );

    return (
        <main className="trane-error-page relative min-h-screen overflow-hidden">
            {/* Page Background */}
            <div className="pointer-events-none absolute inset-0 -z-50 blur-[50px] in-[.light]:hidden">
                <Image
                    src="/images/page-bg/search-code-bg.webp"
                    alt="Trane"
                    fill
                    priority
                    className="object-cover object-center"
                />
            </div>

            {/* Hero Banner */}
            <section className="relative flex h-140 items-center justify-center overflow-hidden md:h-90">
                <div className="absolute inset-0">
                    <Image
                        alt="Trane Error Code Search"
                        loading="lazy"
                        width="1912"
                        height="610"
                        decoding="async"
                        className="h-full w-full object-cover"
                        src="/images/page-bg/error-code-search-bg.webp"
                    />

                    <div className="hero-overlay absolute inset-0"></div>
                </div>

                <div className="relative z-10 text-center text-white">
                    <h1 className="h1-title">Trane</h1>
                </div>
            </section>

            {/* Intro Section */}
            <section className="py-10 lg:py-16">
                <div className="container">
                    <div className="sec-ttl mx-auto flex max-w-6xl flex-col gap-5 text-center lg:gap-8">
                        <h2 className="h2-title">Trane Error code search</h2>

                        <div className="prose fs-19 mx-auto max-w-2xl text-center">
                            <p>
                                Error code search offers information on the
                                cause of the malfunction and the status of your
                                air conditioner by entering the error code.
                            </p>
                        </div>

                        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                            <Link
                                className="theme-btn bgc-yellow"
                                href="/air-conditioner-error-code-search/"
                            >
                                Back To Air Conditionar Brand
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Error Code Search */}
            <section className="code-search py-5 lg:py-10">
                <div className="container">
                    <div className="click-dropdown mx-auto max-w-125">
                        <div className="error-btn">
                            <button
                                type="button"
                                className={`dropbtn in-[.light]:border-primary hover:text-blue hover:border-blue flex w-full cursor-pointer items-center justify-between border border-white px-4 py-3 text-left text-lg font-semibold transition-all duration-300 lg:px-5 lg:py-4 ${
                                    isDropdownOpen
                                        ? "rounded-tl-2xl rounded-tr-2xl rounded-br-none rounded-bl-none"
                                        : "rounded-2xl"
                                }`}
                                onClick={() =>
                                    setIsDropdownOpen(!isDropdownOpen)
                                }
                                aria-expanded={isDropdownOpen}
                                aria-controls="code-dropdown-menu"
                            >
                                Error code search
                                <ChevronIcon isOpen={isDropdownOpen} />
                            </button>

                            <div
                                className={`code-dropdown dropdown-content ${
                                    isDropdownOpen ? "open" : ""
                                }`}
                                id="code-dropdown-menu"
                            >
                                <div className="code-inner">
                                    <div className="code-item">
                                        <button
                                            type="button"
                                            className={`code-header flex w-full items-center justify-between px-4 py-3 text-left transition-colors duration-300 ${
                                                expandedAccordion ===
                                                "TraneAirConditioningCodes"
                                                    ? "text-blue bg-[#061f31] in-[.light]:bg-[#ececec]"
                                                    : "bg-transparent"
                                            }`}
                                            onClick={() =>
                                                setExpandedAccordion(
                                                    expandedAccordion ===
                                                        "TraneAirConditioningCodes"
                                                        ? null
                                                        : "TraneAirConditioningCodes"
                                                )
                                            }
                                            aria-expanded={
                                                expandedAccordion ===
                                                "TraneAirConditioningCodes"
                                            }
                                        >
                                            <h3 className="h3title font-semibold">
                                                Trane Air Conditioning Error
                                                Codes
                                            </h3>

                                            <PlusIcon
                                                isOpen={
                                                    expandedAccordion ===
                                                    "TraneAirConditioningCodes"
                                                }
                                            />
                                        </button>

                                        <AccordionContent
                                            isOpen={
                                                expandedAccordion ===
                                                "TraneAirConditioningCodes"
                                            }
                                            className={
                                                expandedAccordion ===
                                                "TraneAirConditioningCodes"
                                                    ? "in-[.light]:border-primary border-t border-white bg-[#061f31] in-[.light]:bg-[#ececec]"
                                                    : "bg-transparent"
                                            }
                                        >
                                            <div className="flex flex-wrap gap-5 px-4">
                                                {traneAirConditioningCodes.map(
                                                    (item) => (
                                                        <button
                                                            key={item.id}
                                                            type="button"
                                                            className="error-id hover:text-blue cursor-pointer text-left"
                                                            onClick={() => {
                                                                scrollToCode(
                                                                    item.id
                                                                );
                                                                setIsDropdownOpen(
                                                                    false
                                                                );
                                                                window.history.replaceState(
                                                                    null,
                                                                    "",
                                                                    window
                                                                        .location
                                                                        .pathname +
                                                                        window
                                                                            .location
                                                                            .search
                                                                );
                                                            }}
                                                        >
                                                            {item.code}
                                                        </button>
                                                    )
                                                )}
                                            </div>
                                        </AccordionContent>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Disclaimer + Caution + Results */}
            <section className="px-5 pt-8 pb-20 lg:pt-12 lg:pb-24">
                <div className="content-block mx-auto max-w-225 space-y-10">
                    <div className="desclaimer-block space-y-4">
                        <h2 className="text-2xl font-bold">Disclaimers</h2>

                        <ol className="list-decimal space-y-3 pl-5">
                            <li>
                                This page provides a simple explanation
                                concerning content relating to error codes and
                                their possible causes. Please note that the
                                content may slightly differ depending on models.
                            </li>

                            <li>
                                212 HVAC assumes no responsibility for any
                                accidents or troubles caused in the disassembly
                                or repair of equipment performed according to
                                information on this page.
                            </li>
                        </ol>
                    </div>

                    <div className="caution-content mt-8 space-y-2">
                        <h2 className="text-2xl font-bold">Caution</h2>

                        <p>
                            If molded case circuit breakers or earth leakage
                            circuit breakers have tripped, do not reset the
                            breaker immediately without first checking for any
                            problems with insulation of equipment.
                        </p>

                        <p>
                            Resetting breakers without a check of insulation may
                            cause damage to equipment.
                        </p>
                    </div>

                    <div className="result-wrap bg-testimonial rounded-2xl p-5 md:rounded-3xl md:p-10">
                        <h2 className="york-title mb-6 text-2xl font-bold lg:mb-8 lg:text-3xl">
                            Trane air conditioning error codes
                        </h2>

                        <CodeSection codes={traneAirConditioningCodes} />

                        <div className="mt-10 flex justify-center">
                            <Link className="theme-btn" href="/contact-us/">
                                Get a Free Quote
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
