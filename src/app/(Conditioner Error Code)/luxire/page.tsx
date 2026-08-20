"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type CodeItem = {
    id: string;
    code: string;
    result: string;
};

type CodeGroup = {
    id: string;
    title: string;
    codes: CodeItem[];
};

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
        <polyline points="6 9 12 15 18 9" />
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
            ref={contentRef}
            className={`accordion-content overflow-hidden ${
                isOpen
                    ? "in-[.light]:border-primary border-t border-b border-white"
                    : ""
            } ${className}`}
            style={{
                maxHeight,
                transition: "max-height 0.4s ease-in-out",
            }}
        >
            {children}
        </div>
    );
};

const codeGroups: CodeGroup[] = [
    {
        id: "luxaireAirCodes",
        title: "Luxaire air conditioning error codes",
        codes: [
            {
                id: "luxaire-air-condition-E0",
                code: "E0",
                result: "Indoor EEPROM (Electrically Erasable Programmable Read-Only Memory) error.",
            },
            {
                id: "luxaire-air-condition-E1",
                code: "E1",
                result: "Indoor and outdoor unit communication malfunction.",
            },
            {
                id: "luxaire-air-condition-E3",
                code: "E3",
                result: "Indoor fan speed malfunction.",
            },
            {
                id: "luxaire-air-condition-E4",
                code: "E4",
                result: "Indoor room temperature sensor error.",
            },
            {
                id: "luxaire-air-condition-E5",
                code: "E5",
                result: "Evaporator coil temperature sensor error.",
            },
            {
                id: "luxaire-air-condition-EC",
                code: "EC",
                result: "Refrigerant leak detection system malfunction.",
            },
            {
                id: "luxaire-air-condition-EE",
                code: "EE",
                result: "Water level alarm malfunction.",
            },
            {
                id: "luxaire-air-condition-E8",
                code: "E8",
                result: "Dual indoor unit (twin model only) communication malfunction.",
            },
            {
                id: "luxaire-air-condition-E9",
                code: "E9",
                result: "Other twin model malfunction.",
            },
            {
                id: "luxaire-air-condition-F0",
                code: "F0",
                result: "Overload protection.",
            },
            {
                id: "luxaire-air-condition-F1",
                code: "F1",
                result: "Outdoor temperature sensor error.",
            },
            {
                id: "luxaire-air-condition-F2",
                code: "F2",
                result: "Outdoor condenser pipe sensor error.",
            },
            {
                id: "luxaire-air-condition-F3",
                code: "F3",
                result: "Discharge air temperature sensor error.",
            },
            {
                id: "luxaire-air-condition-F4",
                code: "F4",
                result: "Outdoor EEPROM (Electrically Erasable Programmable Read-Only Memory) error.",
            },
            {
                id: "luxaire-air-condition-F5",
                code: "F5",
                result: "Outdoor fan speed (DC fan motor only) malfunction.",
            },
            {
                id: "luxaire-air-condition-F6",
                code: "F6",
                result: "T2b sensor error.",
            },
            {
                id: "luxaire-air-condition-F7",
                code: "F7",
                result: "Auto-lifting panel communication error.",
            },
            {
                id: "luxaire-air-condition-F8",
                code: "F8",
                result: "Auto-lifting panel malfunction.",
            },
            {
                id: "luxaire-air-condition-F9",
                code: "F9",
                result: "Auto-lifting panel is open.",
            },
            {
                id: "luxaire-air-condition-P0",
                code: "P0",
                result: "Inverter module IPM protection.",
            },
            {
                id: "luxaire-air-condition-P1",
                code: "P1",
                result: "High/Low voltage protection.",
            },
            {
                id: "luxaire-air-condition-P2",
                code: "P2",
                result: "Compressor top overheating protection.",
            },
            {
                id: "luxaire-air-condition-P3",
                code: "P3",
                result: "Outdoor low temperature protection.",
            },
            {
                id: "luxaire-air-condition-P4",
                code: "P4",
                result: "Compressor drive error.",
            },
            {
                id: "luxaire-air-condition-P5",
                code: "P5",
                result: "Mode conflict.",
            },
            {
                id: "luxaire-air-condition-P6",
                code: "P6",
                result: "Compressor low-pressure protection.",
            },
            {
                id: "luxaire-air-condition-P7",
                code: "P7",
                result: "Outdoor IGBT sensor error.",
            },
        ],
    },
    {
        id: "luxaireCentralControllerCodes",
        title: "Luxaire Central Controller Fault Codes",
        codes: [
            {
                id: "luxaire-central-Controller-H3",
                code: "H3",
                result: "Outdoor adding malfunction (valid for host unit).",
            },
            {
                id: "luxaire-central-Controller-H2",
                code: "H2",
                result: "Outdoor decreasing malfunction (valid for host unit).",
            },
            {
                id: "luxaire-central-Controller-H1",
                code: "H1",
                result: "Net communication malfunction.",
            },
            {
                id: "luxaire-central-Controller-EF",
                code: "EF",
                result: "Other malfunction.",
            },
            {
                id: "luxaire-central-Controller-E4,T4",
                code: "E4, T4",
                result: "Temp. Sensor malfunction.",
            },
            {
                id: "luxaire-central-Controller-E2",
                code: "E2",
                result: "Sensor malfunction.",
            },
            {
                id: "luxaire-central-Controller-E1,E0",
                code: "E1, E0",
                result: "Communication malfunction Phase sequence or lack of phase.",
            },
            {
                id: "luxaire-central-Controller-PF",
                code: "PF",
                result: "Other Protection.",
            },
            {
                id: "luxaire-central-Controller-PE",
                code: "PE",
                result: "Oil Balance.",
            },
            {
                id: "luxaire-central-Controller-PD",
                code: "PD",
                result: "Oil Return.",
            },
            {
                id: "luxaire-central-Controller-PA",
                code: "PA",
                result: "Defrost Protection.",
            },
            {
                id: "luxaire-central-Controller-P8",
                code: "P8",
                result: "Compressor Current 3rd Protection.",
            },
            {
                id: "luxaire-central-Controller-P7",
                code: "P7",
                result: "Compressor Current 2nd Protection.",
            },
            {
                id: "luxaire-central-Controller-P5",
                code: "P5",
                result: "Condenser High Temp. Protection.",
            },
            {
                id: "luxaire-central-Controller-P4",
                code: "P4",
                result: "Discharge Pipe Temp. Protection.",
            },
            {
                id: "luxaire-central-Controller-P3",
                code: "P3",
                result: "Compressor Current 1st Protection.",
            },
            {
                id: "luxaire-central-Controller-P2",
                code: "P2",
                result: "Discharge Low- pressure Protection.",
            },
            {
                id: "luxaire-central-Controller-P1,P0",
                code: "P1, P0",
                result: "Discharge High- pressure Protection Compressor High Temp. Protection.",
            },
        ],
    },
    {
        id: "malfunctionOutdoorCodes",
        title: "Malfunction Code of Outdoor unit",
        codes: [
            {
                id: "luxaire-central-Controller-E1",
                code: "E1",
                result: "Phase sequence error.",
            },
            {
                id: "malfunctionOutdoorCodes-E2",
                code: "E2",
                result: "Communication malfunction between indoor/outdoor units.",
            },
            {
                id: "luxaire-central-Controller-E3",
                code: "E3",
                result: "T3 temperature sensor malfunction.",
            },
            {
                id: "Malfunction-Code-E4",
                code: "E4",
                result: "T4 temperature sensor malfunction.",
            },
            {
                id: "Malfunction-Code-E5",
                code: "E5",
                result: "T5 temperature sensor malfunction.",
            },
            {
                id: "Malfunction-Code-E6",
                code: "E6",
                result: "Water-level alarm malfunction.",
            },
        ],
    },
    {
        id: "luxaireCentralAirCodes",
        title: "Luxaire Central Air Conditioning Error Codes",
        codes: [
            {
                id: "Luxaire-Central-Air-EF",
                code: "EF",
                result: "Other malfunction PF Other Protection.",
            },
            {
                id: "Luxaire-Central-Air-EE",
                code: "EE",
                result: "Water level checking malfunction PE Reserve.",
            },
            {
                id: "Luxaire-Central-Air-ED",
                code: "ED",
                result: "Outdoor protection PD Reserve.",
            },
            {
                id: "Luxaire-Central-Air-EC",
                code: "EC",
                result: "Clear malfunction PC Reserve.",
            },
            {
                id: "Luxaire-Central-Air-EB",
                code: "EB",
                result: "Inverter Module Protection PB Reserve.",
            },
            {
                id: "Luxaire-Central-Air-EA",
                code: "EA",
                result: "Compressor Over-current (4 times) PA Reserve.",
            },
            {
                id: "Luxaire-Central-Air-E9",
                code: "E9",
                result: "Communication malfunction between PCB and Display board P9 Reserve.",
            },
            {
                id: "Luxaire-Central-Air-E8",
                code: "E8",
                result: "Fan motor checking out of control P8 Compressor Over-current.",
            },
            {
                id: "Luxaire-Central-Air-E7",
                code: "E7",
                result: "EEPROM malfunction P7 Power Lack/Over Volt Protection.",
            },
            {
                id: "Luxaire-Central-Air-E6",
                code: "E6",
                result: "Over-zero checking malfunction P6 Discharge Low-pressure Protection.",
            },
            {
                id: "Luxaire-Central-Air-E5",
                code: "E5",
                result: "T3 sensor malfunction P5 Discharge High-pressure Protection.",
            },
            {
                id: "Luxaire-Central-Air-E4",
                code: "E4",
                result: "T2B sensor malfunction P4 Discharge Pipe Temp. Protection.",
            },
            {
                id: "Luxaire-Central-Air-E3",
                code: "E3",
                result: "T2A sensor malfunction P3 Compressor Temp. Protection.",
            },
            {
                id: "Luxaire-Central-Air-E2",
                code: "E2",
                result: "T1 sensor malfunction P2 Condenser High Temp. Protection.",
            },
            {
                id: "Luxaire-Central-Air-E1",
                code: "E1",
                result: "Communication malfunction P1 Anti-cooling or Defrost Protection.",
            },
            {
                id: "Luxaire-Central-Air-E0",
                code: "E0",
                result: "Phase sequence or lack of phase P0 Evaporator Temp. Protection.",
            },
            {
                id: "Luxaire-Central-Air-03num",
                code: "03#",
                result: "CCM/PC(gateway) Communication Malfunction.",
            },
            {
                id: "Luxaire-Central-Air-02num",
                code: "02#",
                result: "CCM/Function Module Communication Malfunction.",
            },
            {
                id: "Luxaire-Central-Air-01num",
                code: "01#",
                result: "CCM/NIM Communication Malfunction.",
            },
            {
                id: "Luxaire-Central-Air-00num",
                code: "00#",
                result: "CCM/PCB Communication Malfunction.",
            },
        ],
    },
    {
        id: "luxaireWallMountedCodes",
        title: "Luxaire Wall Mounted Type Ac Error Codes",
        codes: [
            {
                id: "Luxaire-Wall-Mounted-E7",
                code: "E7",
                result: "Communication fault between indoor and outdoor units.",
            },
            {
                id: "Luxaire-Wall-Mounted-E1",
                code: "E1",
                result: "Room temperature sensor failure.",
            },
            {
                id: "Luxaire-Wall-Mounted-E4",
                code: "E4",
                result: "Indoor EEPROM error.",
            },
            {
                id: "Luxaire-Wall-Mounted-E14",
                code: "E14",
                result: "Indoor fan motor malfunction.",
            },
            {
                id: "Luxaire-Wall-Mounted-F12",
                code: "F12",
                result: "Outdoor EEPROM error.",
            },
            {
                id: "Luxaire-Wall-Mounted-F1",
                code: "F1",
                result: "The protection of IPM.",
            },
            {
                id: "Luxaire-Wall-Mounted-F22",
                code: "F22",
                result: "Overcurrent protection of AC electricity for the outdoor model.",
            },
            {
                id: "Luxaire-Wall-Mounted-F3",
                code: "F3",
                result: "Communication fault between the IPM and outdoor PCB.",
            },
            {
                id: "Luxaire-Wall-Mounted-F19",
                code: "F19",
                result: "Power voltage is too high or low.",
            },
            {
                id: "Luxaire-Wall-Mounted-F4",
                code: "F4",
                result: "Overheat protection for Discharge temperature.",
            },
            {
                id: "Luxaire-Wall-Mounted-F8",
                code: "F8",
                result: "Outdoor DC fan motor fault.",
            },
            {
                id: "Luxaire-Wall-Mounted-F21",
                code: "F21",
                result: "Defrost temperature sensor failure.",
            },
            {
                id: "Luxaire-Wall-Mounted-F7",
                code: "F7",
                result: "Suction temperature sensor failure.",
            },
            {
                id: "Luxaire-Wall-Mounted-F6",
                code: "F6",
                result: "Ambient temperature sensor failure.",
            },
            {
                id: "Luxaire-Wall-Mounted-F25",
                code: "F25",
                result: "Discharge temperature sensor failure.",
            },
            {
                id: "Luxaire-Wall-Mounted-F11",
                code: "F11",
                result: "deviate from the normal for the compressor.",
            },
            {
                id: "Luxaire-Wall-Mounted-F28",
                code: "F28",
                result: "Loop of the station detect error.",
            },
            {
                id: "Luxaire-WallMounted-F2",
                code: "F2",
                result: "Overcurrent of the compressor.",
            },
            {
                id: "Luxaire-Wall-Mounted-F23",
                code: "F23",
                result: "Overcurrent protection for single-phase of the compressor.",
            },
        ],
    },
];

const CodeSection = ({ codes }: { codes: CodeItem[] }) => (
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

export default function LuxairePage() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [expandedAccordion, setExpandedAccordion] = useState<string | null>(
        "luxaireAirCodes"
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

    useEffect(() => {
        const hash = window.location.hash.slice(1);
        if (!hash) return;

        setTimeout(() => scrollToCode(hash), 100);
    }, []);

    const handleCodeClick = (id: string) => {
        scrollToCode(id);
        setIsDropdownOpen(false);
        window.history.replaceState(
            null,
            "",
            window.location.pathname + window.location.search
        );
    };

    return (
        <main className="luxaire-error-page min-h-screen">
            <div className="pointer-events-none absolute inset-0 -z-50 blur-[50px] in-[.light]:hidden">
                <Image
                    src="/images/page-bg/search-code-bg.webp"
                    alt="Luxaire"
                    fill
                    priority
                    className="object-cover object-center"
                />
            </div>

            <section className="relative flex h-140 items-center justify-center overflow-hidden md:h-90">
                <div className="absolute inset-0">
                    <Image
                        src="/images/page-bg/error-code-search-bg.webp"
                        alt="Luxaire Error Code Search"
                        fill
                        priority
                        className="h-full w-full object-cover"
                    />
                    <div className="hero-overlay absolute inset-0" />
                </div>

                <div className="relative z-10 text-center text-white">
                    <h1 className="h1-title">Luxaire</h1>
                </div>
            </section>

            <section className="py-10 lg:py-16">
                <div className="container">
                    <div className="sec-ttl mx-auto flex max-w-6xl flex-col gap-5 text-center lg:gap-8">
                        <h2 className="h2-title">Luxaire Error code search</h2>

                        <div className="prose fs-19 mx-auto max-w-3xl text-center">
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
                                className={`dropbtn in-[.light]:border-primary hover:text-blue hover:border-blue flex w-full cursor-pointer items-center justify-between border border-white px-4 py-3 text-left text-lg font-semibold transition-all duration-300 lg:px-5 lg:py-4 ${isDropdownOpen ? "rounded-tl-2xl rounded-tr-2xl rounded-br-none rounded-bl-none" : "rounded-2xl"}`}
                                onClick={() =>
                                    setIsDropdownOpen(!isDropdownOpen)
                                }
                                aria-expanded={isDropdownOpen}
                                aria-controls="luxaire-code-dropdown"
                            >
                                Error code search
                                <ChevronIcon isOpen={isDropdownOpen} />
                            </button>

                            <div
                                id="luxaire-code-dropdown"
                                className={`code-dropdown dropdown-content ${isDropdownOpen ? "open" : ""}`}
                            >
                                <div className="code-inner">
                                    {codeGroups.map((group) => {
                                        const isOpen =
                                            expandedAccordion === group.id;

                                        return (
                                            <div
                                                className="code-item"
                                                key={group.id}
                                            >
                                                <button
                                                    className={`code-header flex w-full items-center justify-between px-4 py-3 text-left transition-colors duration-300 ${isOpen ? "text-blue bg-[#061f31] in-[.light]:bg-[#ececec]" : "bg-transparent"}`}
                                                    onClick={() =>
                                                        setExpandedAccordion(
                                                            isOpen
                                                                ? null
                                                                : group.id
                                                        )
                                                    }
                                                    aria-expanded={isOpen}
                                                >
                                                    <h3 className="h3title font-semibold">
                                                        {group.title}
                                                    </h3>
                                                    <PlusIcon isOpen={isOpen} />
                                                </button>

                                                <AccordionContent
                                                    isOpen={isOpen}
                                                    className={
                                                        isOpen
                                                            ? "in-[.light]:border-primary bg-[#061f31] in-[.light]:bg-[#ececec]"
                                                            : "bg-transparent"
                                                    }
                                                >
                                                    <div className="flex flex-wrap gap-5 px-4">
                                                        {group.codes.map(
                                                            (item) => (
                                                                <button
                                                                    key={
                                                                        item.id
                                                                    }
                                                                    type="button"
                                                                    className="error-id hover:text-blue cursor-pointer"
                                                                    onClick={() =>
                                                                        handleCodeClick(
                                                                            item.id
                                                                        )
                                                                    }
                                                                >
                                                                    {item.code}
                                                                </button>
                                                            )
                                                        )}
                                                    </div>
                                                </AccordionContent>
                                            </div>
                                        );
                                    })}
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

                    {codeGroups.map((group) => (
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
