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
            className={`accordion-content overflow-hidden ${isOpen ? "in-[.light]:border-primary border-t border-b border-white" : ""} ${className}`}
            style={{ maxHeight, transition: "max-height 0.4s ease-in-out" }}
            ref={contentRef}
        >
            {children}
        </div>
    );
};

const goodmanAirConditioningCodes = [
    {
        id: "goodmanA2",
        code: "A2",
        result: "Shorted sensor./Open sensor./Sensor disconnected./Sensor out of range.",
    },
    {
        id: "goodmanA3",
        code: "A3",
        result: "Shorted sensor./Open sensor./Sensor disconnected./Sensor out of range.",
    },
    { id: "goodmanA5", code: "E5", result: "Short in low voltage wiring." },
    {
        id: "goodmanEE",
        code: "EE",
        result: "Compressor relay contacts welded.",
    },
    {
        id: "goodmanb0",
        code: "b0",
        result: "Indoor blower motor problem./Communications error between indoor and outdoor unit.",
    },
    {
        id: "goodmanb9",
        code: "b9",
        result: "Indoor blower motor problem./Blocked filters./Restrictive/ undersized ductwork./Indoor-outdoor unit miss match.",
    },
    {
        id: "goodmand0",
        code: "d0",
        result: "Air conditioner/heat pump is wired as part of a communicating system and integrated control module does not contain any shared data.",
    },
    {
        id: "goodmand1",
        code: "d1",
        result: "Air conditioner/heat pump is wired as part of a communicating system and integrated control module contains invalid shared data or network data is invalid for the integrated control module.",
    },
    {
        id: "goodmand2",
        code: "d2",
        result: "Air conditioner/heat pump is wired as part of a communicating system and outdoor unit requires airflow greater than indoor unit’s airflow capability./ Shared data is incompatible with the system or missing parameters.",
    },
    {
        id: "goodmand3",
        code: "d3",
        result: "Shared data sent to integrated control module does not match hardware configuration.",
    },
    {
        id: "goodmand4",
        code: "d4",
        result: "Shared data on memory card has been rejected.",
    },
    {
        id: "goodman01",
        code: "01",
        result: "Low refrigerant charge./Restriction in liquid line./Indoor blower motor failure.Indoor thermostat set extremely low.",
    },
    {
        id: "goodman02",
        code: "02",
        result: "Blocked condenser coil./Outdoor fan not running.",
    },
    {
        id: "goodman03",
        code: "03",
        result: "Intermittent thermostat demand./Faulty compressor relay.",
    },
    {
        id: "goodman04",
        code: "04",
        result: "Compressor overcurrent interruption.",
    },
    {
        id: "goodman05",
        code: "05",
        result: "Power is disconnected./Failed compressor protector./Compressor not properly wired to control.",
    },
    {
        id: "goodman06",
        code: "06",
        result: "Compressor start winding is open./Failed compressor run capacitor./Faulty run capacitor wiring./Compressor not properly wired to control./Faulty compressor wiring.",
    },
    {
        id: "goodman07",
        code: "07",
        result: "Compressor run winding is open./Compressor no properly wired to control./Faulty compressor wiring.",
    },
    {
        id: "goodman08",
        code: "08",
        result: "Low line voltage./ High line voltage.",
    },
    {
        id: "goodman09",
        code: "09",
        result: "Control detects secondary voltage less than 18 VAC./Transformer overloaded./Low line voltage.",
    },
];

export default function GoodmanPage() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [expandedAccordion, setExpandedAccordion] = useState<string | null>(
        "GoodmanAirConditioningCodes"
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

    const CodeSection = ({
        codes,
    }: {
        codes: typeof goodmanAirConditioningCodes;
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
        <main className="goodman-error-page relative min-h-screen overflow-hidden">
            <div className="pointer-events-none absolute inset-0 -z-50 blur-[50px] in-[.light]:hidden">
                <Image
                    src="/images/page-bg/search-code-bg.webp"
                    alt="Goodman"
                    fill
                    priority
                    className="object-cover object-center"
                />
            </div>

            <section className="relative flex h-140 items-center justify-center overflow-hidden md:h-90">
                <div className="absolute inset-0">
                    <Image
                        alt="Goodman Error Code Search"
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
                    <h1 className="h1-title">Goodman</h1>
                </div>
            </section>

            <section className="py-10 lg:py-16">
                <div className="container">
                    <div className="sec-ttl mx-auto flex max-w-6xl flex-col gap-5 text-center lg:gap-8">
                        <h2 className="h2-title">Goodman Error code search</h2>
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
                                aria-controls="code-dropdown-menu"
                            >
                                Error code search
                                <ChevronIcon isOpen={isDropdownOpen} />
                            </button>

                            <div
                                className={`code-dropdown dropdown-content ${isDropdownOpen ? "open" : ""}`}
                                id="code-dropdown-menu"
                            >
                                <div className="code-inner">
                                    <div className="code-item">
                                        <button
                                            type="button"
                                            className={`code-header flex w-full items-center justify-between px-4 py-3 text-left transition-colors duration-300 ${expandedAccordion === "GoodmanAirConditioningCodes" ? "text-blue bg-[#061f31] in-[.light]:bg-[#ececec]" : "bg-transparent"}`}
                                            onClick={() =>
                                                setExpandedAccordion(
                                                    expandedAccordion ===
                                                        "GoodmanAirConditioningCodes"
                                                        ? null
                                                        : "GoodmanAirConditioningCodes"
                                                )
                                            }
                                            aria-expanded={
                                                expandedAccordion ===
                                                "GoodmanAirConditioningCodes"
                                            }
                                        >
                                            <h3 className="h3title font-semibold">
                                                Goodman air conditioning error
                                                codes
                                            </h3>
                                            <PlusIcon
                                                isOpen={
                                                    expandedAccordion ===
                                                    "GoodmanAirConditioningCodes"
                                                }
                                            />
                                        </button>

                                        <AccordionContent
                                            isOpen={
                                                expandedAccordion ===
                                                "GoodmanAirConditioningCodes"
                                            }
                                            className={
                                                expandedAccordion ===
                                                "GoodmanAirConditioningCodes"
                                                    ? "bg-[#061f31] in-[.light]:bg-[#ececec]"
                                                    : "bg-transparent"
                                            }
                                        >
                                            <div className="flex flex-wrap gap-5 px-4">
                                                {goodmanAirConditioningCodes.map(
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
                            Goodman air conditioning error codes
                        </h2>

                        <CodeSection codes={goodmanAirConditioningCodes} />

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
