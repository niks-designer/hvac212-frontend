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

const bryantCodeGroups = [
    {
        id: "bryantAirConditioningCodes",
        title: "Bryant air conditioning codes",
        codes: [
            {
                id: "bryant1",
                code: "On solid, no flash",
                result: "None.",
                fix: "Normal operation.",
            },
            {
                id: "bryant2",
                code: "Rapid continuous flashing",
                result: "Standard Thermostat Control 288ANA/180ANA only.",
                fix: "Unit being controlled by standard thermostat inputs instead of Evolution Control. Only high stage operation is aveliable. This operating mode should be used in emergency situations only.",
            },
            {
                id: "bryant3",
                code: "1 pause",
                result: "None",
                fix: "Normal operation.",
            },
            {
                id: "bryant4",
                code: "2 pause",
                result: "None",
                fix: "Normal operation.",
            },
            {
                id: "bryant5",
                code: "16",
                result: "System Communications Failure.",
                fix: "Communication with User Interface lost. Check wiring to UI, indoor and outdoor units.",
            },
            {
                id: "bryant6",
                code: "25",
                result: "Invalid Model Plug.",
                fix: "Control does not detect a model plug or detects an invalid model plug. Unit will not operate without correct model plug.",
            },
            {
                id: "bryant7",
                code: "31",
                result: "High Pressure Switch Open.",
                fix: "High – pressure switch trip. Check refrigerant charge, outdoor fan operating and coils for airflow restrictions.",
            },
            {
                id: "bryant8",
                code: "32",
                result: "Low Pressure Switch Open.",
                fix: "Low – pressure switch trip. Check refrigerant charge and indoor air flow.",
            },
            {
                id: "bryant9",
                code: "45",
                result: "Control Fault.",
                fix: "Outdoor unit control board has failed. Control board needs to be replaced.",
            },
            {
                id: "bryant10",
                code: "46",
                result: "Brown Out (230v).",
                fix: "Line voltage < 187v for at least 4 seconds.",
            },
            {
                id: "bryant11",
                code: "47",
                result: "No 230v at Unit Measured at L1 and L2 on circuit board.",
                fix: "There is no 230v at the contactor when indoor unit is powered and cooling/heating demand exists.",
            },
            {
                id: "bryant12",
                code: "53",
                result: "No Outdoor Air Temp Sensor Fault.",
                fix: "There is no 230v at the contactor when indoor unit is powered and cooling/heating demand exists.Outdoor air sensor not reading or out of range.",
            },
            {
                id: "bryant13",
                code: "55",
                result: "No Outdoor Coil Sensor Fault.",
                fix: "Coil sensor not reading or out of range. Ohm out sensor and check wiring.",
            },
            {
                id: "bryant14",
                code: "56",
                result: "Thermistors out of range.",
                fix: "Improper relationship between coil sensor and outdoor air sensor. Ohm out sensor and check wiring.",
            },
            {
                id: "bryant15",
                code: "71",
                result: "Low Stage Thermal Cut out.",
                fix: "Compressor operation detected then disappears while low stage demand exists. Possible causes are internal compressor overload trip or start relay and capacitor held in circuit too long.",
            },
            {
                id: "bryant16",
                code: "72",
                result: "High Stage Thermal Cut out.",
                fix: "Compressor operation detected then disappears while low stage demand exists. Possible causes are internal compressor overload trip or start relay and capacitor held in circuit too long.",
            },
            {
                id: "bryant17",
                code: "73",
                result: "Contactor Shorted.",
                fix: "Compressor voltage sensed when no demand for compressor operation exists. Contactor may be stuck closed or there is a wiring error.",
            },
            {
                id: "bryant18",
                code: "74",
                result: "No 230v at Compressor.",
                fix: "Compressor voltage not sensed when compressor should be starting. Contactor may be stuck open or there is a wiring error.",
            },
            {
                id: "bryant19",
                code: "75",
                result: "Low Stage Did Not Start.",
                fix: "Specified start voltage at VR terminal was not achieved in low stage. Start relay was de-energized after 1 second.",
            },
            {
                id: "bryant20",
                code: "76",
                result: "Low Stage Did Not Start 3 times.",
                fix: "For 3 consecutive low stage starts, the specified start voltage at VR terminal was not achieved and start relay was de-energized. Low stage locked out for 30 minutes.",
            },
            {
                id: "bryant21",
                code: "77",
                result: "High Stage Did Not Start. times.",
                fix: "Specified start voltage at VS terminal was not achieved in high stage. Start relay was de-energized after 1 second.",
            },
            {
                id: "bryant22",
                code: "78",
                result: "High Stage Did Not Start 3 times.",
                fix: "For 3 consecutive high stage starts, the specified start voltage at VS terminal was not achieved and start relay was de-energized. High stage locked out for 30 minutes.",
            },
            {
                id: "bryant23",
                code: "81",
                result: "Low Stage Thermal Lockout.",
                fix: "Thermal cutout occurs in three consecutive low/high stage cycles. Low stage locked out 4 hours or until 24v power recycled.",
            },
            {
                id: "bryant24",
                code: "82",
                result: "High Stage Thermal Lockout.",
                fix: "Thermal Lockout occurs in three consecutive high/low stage cycles. High stage locked out for 4 hours or until 24V power recycled.",
            },
        ],
    },
];

const CodeSection = ({
    codes,
}: {
    codes: (typeof bryantCodeGroups)[number]["codes"];
}) => (
    <div className="code-results space-y-6 lg:space-y-8">
        {codes.map((item) => (
            <div key={item.id} className="code-info" id={item.id}>
                <h3 className="text-xl font-medium lg:mb-2 lg:text-2xl">
                    CODE: {item.code}
                </h3>
                <p className="fs-19">
                    <b>RESULT:</b>&nbsp;{item.result}
                    {item.fix && (
                        <>
                            <br />
                            <b>FIX:</b>&nbsp;{item.fix}
                        </>
                    )}
                </p>
            </div>
        ))}
    </div>
);

export default function BryantPage() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [expandedAccordion, setExpandedAccordion] = useState<string | null>(
        "bryantAirConditioningCodes"
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
        <main className="bryant-error-page relative min-h-screen overflow-hidden">
            <div className="pointer-events-none absolute inset-0 -z-50 blur-[50px] in-[.light]:hidden">
                <Image
                    src="/images/page-bg/search-code-bg.webp"
                    alt="Bryant"
                    fill
                    priority
                    className="object-cover object-center"
                />
            </div>

            <section className="relative flex h-140 items-center justify-center overflow-hidden md:h-90">
                <div className="absolute inset-0">
                    <Image
                        alt="Bryant Error Code Search"
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
                    <h1 className="h1-title">Bryant</h1>
                </div>
            </section>

            <section className="py-10 lg:py-16">
                <div className="container">
                    <div className="sec-ttl mx-auto flex max-w-6xl flex-col gap-5 text-center lg:gap-8">
                        <h2 className="h2-title">Bryant Error code search</h2>
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
                                    {bryantCodeGroups.map((group) => (
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

                    {bryantCodeGroups.map((group) => (
                        <div
                            className="result-wrap bg-testimonial rounded-2xl p-5 md:rounded-3xl md:p-10"
                            key={group.id}
                        >
                            <h2 className="york-title mb-6 text-2xl font-bold lg:mb-8 lg:text-3xl">
                                {group.title}
                            </h2>
                            <CodeSection codes={group.codes} />
                            <div className="mt-10 flex justify-center">
                                <Link className="theme-btn" href="/contact-us/">
                                    Get a Free Quote
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
