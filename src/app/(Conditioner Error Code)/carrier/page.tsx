"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

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
                isOpen
                    ? "in-[.light]:border-primary border-t border-b border-white"
                    : ""
            } ${className}`}
            style={{ maxHeight, transition: "max-height 0.4s ease-in-out" }}
            ref={contentRef}
        >
            {children}
        </div>
    );
};

const carrierCodeGroups = [
    {
        id: "carrierIndoorCodes",
        title: "Carrier air conditioning Indoor error codes",
        codes: [
            {
                id: "d36b249",
                code: "E0",
                result: "Indoor unit EEPROM parameter error.",
            },
            {
                id: "a82bcfd",
                code: "E1",
                result: "Indoor / outdoor units communication error.",
            },
            {
                id: "db896b4",
                code: "E3",
                result: "Indoor fan speed has been out of control.",
            },
            {
                id: "f651830",
                code: "E4",
                result: "Indoor room temperature sensor T1 open circuit or short circuit.",
            },
            {
                id: "da5a4be",
                code: "E5",
                result: "Evaporator coil temperature sensor T2 open circuit or short circuit.",
            },
            {
                id: "880b894",
                code: "EC",
                result: "Refrigerant Leakage Detection.",
            },
            {
                id: "8cbe884",
                code: "F1",
                result: "Outdoor ambient temperature sensor T4 open circuit or short circuit.",
            },
            {
                id: "a2ed37f",
                code: "F2",
                result: "Condenser coil temperature sensor T3 open circuit or short circuit.",
            },
            {
                id: "43043ed",
                code: "F3",
                result: "Compressor discharge temperature sensor T5 open circuit or short circuit.",
            },
            {
                id: "3ff53db",
                code: "F4",
                result: "Outdoor unit EEPROM parameter error.",
            },
            {
                id: "197b4cc",
                code: "F5",
                result: "Outdoor fan speed has been out of control.",
            },
            {
                id: "ed1b339",
                code: "P0",
                result: "IPM malfunction or IGBT over-strong current protection.",
            },
            {
                id: "b42f968",
                code: "P1",
                result: "Over voltage or over low voltage protection.",
            },
            {
                id: "c550113",
                code: "P2",
                result: "High temperature protection of compressor top diagnosis and solution.",
            },
            {
                id: "85c7bbe",
                code: "P4",
                result: "Inverter compressor drive error.",
            },
            {
                id: "e1f80f4",
                code: "P5",
                result: "Mode conflict.",
            },
            {
                id: "c76c254",
                code: "P6",
                result: "Compressor voltage protection.",
            },
        ],
    },
    {
        id: "carrierOutdoorCodes",
        title: "Carrier air conditioning Outdoor error codes",
        codes: [
            {
                id: "d36b249",
                code: "E0",
                result: "Indoor unit EEPROM parameter error.",
            },
            {
                id: "a82bcfd",
                code: "E1",
                result: "Indoor / outdoor units communication error.",
            },
            {
                id: "db896b4",
                code: "E3",
                result: "Indoor fan speed has been out of control.",
            },
            {
                id: "f651830",
                code: "E4",
                result: "Indoor room temperature sensor T1 open circuit or short circuit.",
            },
            {
                id: "da5a4be",
                code: "E5",
                result: "Evaporator coil temperature sensor T2 open circuit or short circuit.",
            },
            {
                id: "880b894",
                code: "EC",
                result: "Refrigerant Leakage Detection.",
            },
            {
                id: "8cbe884",
                code: "F1",
                result: "Outdoor ambient temperature sensor T4 open circuit or short circuit.",
            },
            {
                id: "a2ed37f",
                code: "F2",
                result: "Condenser coil temperature sensor T3 open circuit or short circuit.",
            },
            {
                id: "43043ed",
                code: "F3",
                result: "Compressor discharge temperature sensor T5 open circuit or short circuit.",
            },
            {
                id: "3ff53db",
                code: "F4",
                result: "Outdoor unit EEPROM parameter error.",
            },
            {
                id: "197b4cc",
                code: "F5",
                result: "Outdoor fan speed has been out of control.",
            },
            {
                id: "ed1b339",
                code: "P0",
                result: "IPM malfunction or IGBT over-strong current protection.",
            },
            {
                id: "b42f968",
                code: "P1",
                result: "Over voltage or over low voltage protection.",
            },
            {
                id: "c550113",
                code: "P2",
                result: "High temperature protection of compressor top diagnosis and solution.",
            },
            {
                id: "85c7bbe",
                code: "P4",
                result: "Inverter compressor drive error.",
            },
            {
                id: "e1f80f4",
                code: "P5",
                result: "Mode conflict.",
            },
            {
                id: "c76c254",
                code: "P6",
                result: "Compressor voltage protection.",
            },
            {
                id: "236d040",
                code: "E0",
                result: "Outdoor EEPROM malfunction.",
            },
            {
                id: "777f19b",
                code: "E2",
                result: "Indoor/outdoor units communication error.",
            },
            {
                id: "6e4789e",
                code: "E3",
                result: "Compressor run winding is open./Compressor no properly wired to control./Faulty compressor wiring.",
            },
            {
                id: "7f55b2e",
                code: "E4",
                result: "Open or short circuit of outdoor unit temperature sensor.",
            },
            {
                id: "56427b4",
                code: "E5",
                result: "Voltage protection.",
            },
            {
                id: "06bbe0e",
                code: "E8",
                result: "Outdoor fan speed malfunction.",
            },
            {
                id: "fdaa3c3",
                code: "F1",
                result: "No A Indoor unit coil outlet temperature sensor or connector of sensor is defective.",
            },
            {
                id: "226d9bf",
                code: "F2",
                result: "No B Indoor unit coil outlet temperature sensor or connector of sensor is defective.",
            },
            {
                id: "034b9ea",
                code: "F3",
                result: "No C Indoor unit coil outlet temperature sensor or connector of sensor is defective.",
            },
            {
                id: "2db6173",
                code: "F4",
                result: "No D Indoor unit coil outlet temperature sensor or connector of sensor is defective.",
            },
            {
                id: "206268c",
                code: "F5",
                result: "No E Indoor unit coil outlet temperature sensor or connector of sensor is defective.",
            },
            {
                id: "6c0d2a2",
                code: "P1",
                result: "High pressure protection.",
            },
            {
                id: "fd9f902",
                code: "P2",
                result: "Low pressure protection.",
            },
            {
                id: "3581ef1",
                code: "P3",
                result: "Current protection of compressor.",
            },
            {
                id: "35e6611",
                code: "P4",
                result: "Temperature protection of compressor.",
            },
            {
                id: "c062a28",
                code: "P5",
                result: "High temperature protection of condenser.",
            },
            {
                id: "b4ed786",
                code: "P6",
                result: "IPM module protection.",
            },
        ],
    },
];

const CodeSection = ({
    codes,
}: {
    codes: (typeof carrierCodeGroups)[number]["codes"];
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

export default function CarrierPage() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [expandedAccordion, setExpandedAccordion] = useState<string | null>(
        "carrierIndoorCodes"
    );

    const scrollToCode = (id: string) => {
        const element = document.getElementById(id);
        if (!element) return;

        const headerHeight = 150;
        const elementPosition =
            element.getBoundingClientRect().top + window.scrollY;

        window.scrollTo({
            top: elementPosition - headerHeight,
            behavior: "smooth",
        });
    };

    const handleCodeClick = (id: string) => {
        scrollToCode(id);
        setIsDropdownOpen(false);

        // Keep the URL clean — no #id is added.
        window.history.replaceState(
            null,
            "",
            window.location.pathname + window.location.search
        );
    };

    return (
        <main className="carrier-error-page relative min-h-screen overflow-hidden">
            <div className="pointer-events-none absolute inset-0 -z-50 blur-[50px] in-[.light]:hidden">
                <Image
                    src="/images/page-bg/search-code-bg.webp"
                    alt="Carrier"
                    fill
                    priority
                    className="object-cover object-center"
                />
            </div>

            <section className="relative flex h-140 items-center justify-center overflow-hidden md:h-90">
                <div className="absolute inset-0">
                    <Image
                        alt="Carrier Error Code Search"
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
                    <h1 className="h1-title">Carrier</h1>
                </div>
            </section>

            <section className="py-10 lg:py-16">
                <div className="container">
                    <div className="sec-ttl mx-auto flex max-w-6xl flex-col gap-5 text-center lg:gap-8">
                        <h2 className="h2-title">Carrier Error code search</h2>
                        <div className="prose fs-19 mx-auto max-w-2xl text-center">
                            <p>
                                Error code search offers information on the
                                cause of the malfunction and the status of your
                                air conditioner by entering the error code.
                            </p>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                            <a
                                className="theme-btn bgc-yellow"
                                href="/air-conditioner-error-code-search/"
                            >
                                Back To Air Conditionar Brand
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section className="code-search py-5 lg:py-10">
                <div className="container">
                    <div className="click-dropdown mx-auto max-w-125">
                        <div className="error-btn">
                            <button
                                type="button"
                                className={`dropbtn in-[.light]:border-primary hover:text-blue hover:border-blue flex w-full cursor-pointer items-center justify-between border border-white px-4 py-3 text-left text-lg font-semibold transition-all duration-300 lg:px-5 lg:py-4 ${isDropdownOpen ? "rounded-tl-2xl rounded-tr-2xl rounded-br-none rounded-bl-none" : "rounded-2xl"}`}
                                onClick={() =>
                                    setIsDropdownOpen(!isDropdownOpen)
                                }
                                aria-expanded={isDropdownOpen}
                            >
                                Error code search
                                <ChevronIcon isOpen={isDropdownOpen} />
                            </button>

                            <div
                                className={`code-dropdown dropdown-content ${isDropdownOpen ? "open" : ""}`}
                            >
                                <div className="code-inner">
                                    {carrierCodeGroups.map((group) => (
                                        <div
                                            className="code-item"
                                            key={group.id}
                                        >
                                            <button
                                                type="button"
                                                className={`code-header flex w-full items-center justify-between px-4 py-3 text-left transition-colors duration-300 ${expandedAccordion === group.id ? "text-blue bg-[#061f31] in-[.light]:bg-[#ececec]" : "bg-transparent"}`}
                                                onClick={() =>
                                                    setExpandedAccordion(
                                                        expandedAccordion ===
                                                            group.id
                                                            ? null
                                                            : group.id
                                                    )
                                                }
                                                aria-expanded={
                                                    expandedAccordion ===
                                                    group.id
                                                }
                                            >
                                                <h3 className="h3title font-semibold">
                                                    {group.title}
                                                </h3>
                                                <PlusIcon
                                                    isOpen={
                                                        expandedAccordion ===
                                                        group.id
                                                    }
                                                />
                                            </button>

                                            <AccordionContent
                                                isOpen={
                                                    expandedAccordion ===
                                                    group.id
                                                }
                                                className={
                                                    expandedAccordion ===
                                                    group.id
                                                        ? "bg-[#061f31] in-[.light]:bg-[#ececec]"
                                                        : "bg-transparent"
                                                }
                                            >
                                                <div className="flex flex-wrap gap-5 px-4">
                                                    {group.codes.map((item) => (
                                                        <button
                                                            key={item.id}
                                                            type="button"
                                                            className="error-id hover:text-blue cursor-pointer text-left"
                                                            onClick={() =>
                                                                handleCodeClick(
                                                                    item.id
                                                                )
                                                            }
                                                        >
                                                            {item.code}
                                                        </button>
                                                    ))}
                                                </div>
                                            </AccordionContent>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

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

                    {carrierCodeGroups.map((group) => (
                        <div
                            className="result-wrap bg-testimonial rounded-2xl p-5 md:rounded-3xl md:p-10"
                            key={group.id}
                        >
                            <h2 className="york-title mb-6 text-2xl font-bold lg:mb-8 lg:text-3xl">
                                {group.title}
                            </h2>
                            <CodeSection codes={group.codes} />
                            <div className="mt-10 flex justify-center">
                                <a className="theme-btn" href="/contact-us/">
                                    Get a Free Quote
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
