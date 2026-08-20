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
                isOpen ? "border-b border-white" : ""
            } ${className}`}
            style={{ maxHeight, transition: "max-height 0.4s ease-in-out" }}
            ref={contentRef}
        >
            {children}
        </div>
    );
};

const airConditioningCodes = [
    {
        id: "AirConditioningE0",
        code: "E0",
        result: "Indoor EEPROM (Electrically Erasable Programmable Read-Only Memory) error.",
    },
    {
        id: "AirConditioningE1",
        code: "E1",
        result: "Indoor and outdoor unit communication malfunction.",
    },
    {
        id: "AirConditioningE3",
        code: "E3",
        result: "Indoor fan speed malfunction.",
    },
    {
        id: "AirConditioningE4",
        code: "E4",
        result: "Indoor room temperature sensor error.",
    },
    {
        id: "AirConditioningE5",
        code: "E5",
        result: "Evaporator coil temperature sensor error.",
    },
    {
        id: "AirConditioningEC",
        code: "Ec",
        result: "Refrigerant leak detection system malfunction.",
    },
    {
        id: "AirConditioningEE",
        code: "EE",
        result: "Water level alarm malfunction.",
    },
    {
        id: "AirConditioningE8",
        code: "E8",
        result: "Dual indoor unit (twin model only) communication malfunction.",
    },
    {
        id: "AirConditioningE9",
        code: "E9",
        result: "Other twin model malfunction.",
    },
    { id: "AirConditioningF0", code: "F0", result: "Overload protection." },
    {
        id: "AirConditioningF1",
        code: "F1",
        result: "Outdoor temperature sensor error.",
    },
    {
        id: "AirConditioningF2",
        code: "F2",
        result: "Outdoor condenser pipe sensor error.",
    },
    {
        id: "AirConditioningF3",
        code: "F3",
        result: "Discharge air temperature sensor error.",
    },
    {
        id: "AirConditioningF4",
        code: "F4",
        result: "Outdoor EEPROM (Electrically Erasable Programmable Read-Only Memory) error.",
    },
    {
        id: "AirConditioningF5",
        code: "F5",
        result: "Outdoor fan speed (DC fan motor only) malfunction.",
    },
    { id: "AirConditioningF6", code: "F6", result: "T2b sensor error." },
    {
        id: "AirConditioningF7",
        code: "F7",
        result: "Auto-lifting panel communication error.",
    },
    {
        id: "AirConditioningF8",
        code: "F8",
        result: "Auto-lifting panel malfunction.",
    },
    {
        id: "AirConditioningF9",
        code: "F9",
        result: "Auto-lifting panel is open.",
    },
    {
        id: "AirConditioningP0",
        code: "P0",
        result: "Inverter module IPM protection.",
    },
    {
        id: "AirConditioningP1",
        code: "P1",
        result: "High/Low voltage protection.",
    },
    {
        id: "AirConditioningP2",
        code: "P2",
        result: "Compressor top overheating protection.",
    },
    {
        id: "AirConditioningP3",
        code: "P3",
        result: "Outdoor low temperature protection.",
    },
    { id: "AirConditioningP4", code: "P4", result: "Compressor drive error." },
    { id: "AirConditioningP5", code: "P5", result: "Mode conflict." },
    {
        id: "AirConditioningP6",
        code: "P6",
        result: "Compressor low-pressure protection.",
    },
    {
        id: "AirConditioningP7",
        code: "P7",
        result: "Outdoor IGBT sensor error.",
    },
];

const centralControllerCodes = [
    {
        id: "CentralControllerH3",
        code: "H3",
        result: "Outdoor adding malfunction (valid for host unit).",
    },
    {
        id: "CentralControllerH2",
        code: "H2",
        result: "Outdoor decreasing malfunction (valid for host unit).",
    },
    {
        id: "CentralControllerH1",
        code: "H1",
        result: "Net communication malfunction.",
    },
    { id: "CentralControllerEF", code: "EF", result: "Other malfunction." },
    {
        id: "CentralControllerE4T4",
        code: "E4, T4",
        result: "Temp. Sensor malfunction.",
    },
    {
        id: "CentralControllerE3T3",
        code: "E3, T3",
        result: "Temp. Sensor malfunction.",
    },
    { id: "CentralControllerE2", code: "E2", result: "Sensor malfunction." },
    {
        id: "CentralControllerE1E0",
        code: "E1, E0",
        result: "Communication malfunction Phase sequence or lack of phase.",
    },
    { id: "CentralControllerPF", code: "PF", result: "Other Protection." },
    { id: "CentralControllerPE", code: "PE", result: "Oil Balance." },
    { id: "CentralControllerPD", code: "PD", result: "Oil Return." },
    { id: "CentralControllerPA", code: "PA", result: "Defrost Protection." },
    {
        id: "CentralControllerP8",
        code: "P8",
        result: "Compressor Current 3rd Protection.",
    },
    {
        id: "CentralControllerP7",
        code: "P7",
        result: "Compressor Current 2nd Protection.",
    },
    {
        id: "CentralControllerP5",
        code: "P5",
        result: "Condenser High Temp. Protection.",
    },
    {
        id: "CentralControllerP4",
        code: "P4",
        result: "Discharge Pipe Temp. Protection.",
    },
    {
        id: "CentralControllerP3",
        code: "P3",
        result: "Compressor Current 1st Protection.",
    },
    {
        id: "CentralControllerP2",
        code: "P2",
        result: "Discharge Low- pressure Protection.",
    },
    {
        id: "CentralControllerP1P0",
        code: "P1, P0",
        result: "Discharge High- pressure Protection Compressor High Temp. Protection.",
    },
];

const malfunctionCodes = [
    { id: "MalfunctionE1", code: "E1", result: "Phase sequence error." },
    {
        id: "MalfunctionE2",
        code: "E2",
        result: "Communication malfunction between indoor/outdoor units.",
    },
    {
        id: "MalfunctionE3",
        code: "E3",
        result: "T3 temperature sensor malfunction.",
    },
    {
        id: "MalfunctionE4",
        code: "E4",
        result: "T4 temperature sensor malfunction.",
    },
    {
        id: "MalfunctionE5",
        code: "E5",
        result: "T5 temperature sensor malfunction.",
    },
    {
        id: "MalfunctionE6",
        code: "E6",
        result: "Water-level alarm malfunction.",
    },
];

const centralAirConditioningCodes = [
    {
        id: "CentralAirConditioningEF",
        code: "EF",
        result: "Other malfunction PF Other Protection.",
    },
    {
        id: "CentralAirConditioningEE",
        code: "EE",
        result: "Water level checking malfunction PE Reserve.",
    },
    {
        id: "CentralAirConditioningED",
        code: "ED",
        result: "Outdoor protection PD Reserve.",
    },
    {
        id: "CentralAirConditioningEC",
        code: "EC",
        result: "Clear malfunction PC Reserve.",
    },
    {
        id: "CentralAirConditioningEB",
        code: "EB",
        result: "Inverter Module Protection PB Reserve.",
    },
    {
        id: "CentralAirConditioningEA",
        code: "EA",
        result: "Compressor Over-current (4 times) PA Reserve.",
    },
    {
        id: "CentralAirConditioningE9",
        code: "E9",
        result: "Communication malfunction between PCB and Display board P9 Reserve.",
    },
    {
        id: "CentralAirConditioningE8",
        code: "E8",
        result: "Fan motor checking out of control P8 Compressor Over-current.",
    },
    {
        id: "CentralAirConditioningE7",
        code: "E7",
        result: "EEPROM malfunction P7 Power Lack/Over Volt Protection.",
    },
    {
        id: "CentralAirConditioningE6",
        code: "E6",
        result: "Over-zero checking malfunction P6 Discharge Low-pressure Protection.",
    },
    {
        id: "CentralAirConditioningE5",
        code: "E5",
        result: "T3 sensor malfunction P5 Discharge High-pressure Protection.",
    },
    {
        id: "CentralAirConditioningE4",
        code: "E4",
        result: "T2B sensor malfunction P4 Discharge Pipe Temp. Protection.",
    },
    {
        id: "CentralAirConditioningE3",
        code: "E3",
        result: "T2A sensor malfunction P3 Compressor Temp. Protection.",
    },
    {
        id: "CentralAirConditioningE2",
        code: "E2",
        result: "T1 sensor malfunction P2 Condenser High Temp. Protection.",
    },
    {
        id: "CentralAirConditioningE1",
        code: "E1",
        result: "Communication malfunction P1 Anti-cooling or Defrost Protection.",
    },
    {
        id: "CentralAirConditioningE0",
        code: "E0",
        result: "Phase sequence or lack of phase P0 Evaporator Temp. Protection.",
    },
    {
        id: "CentralAirConditioning03",
        code: "03",
        result: "CCM/PC(gateway) Communication Malfunction.",
    },
    {
        id: "CentralAirConditioning02",
        code: "02",
        result: "CCM/Function Module Communication Malfunction.",
    },
    {
        id: "CentralAirConditioning01",
        code: "01",
        result: "CCM/NIM Communication Malfunction.",
    },
    {
        id: "CentralAirConditioning00",
        code: "00",
        result: "CCM/PCB Communication Malfunction.",
    },
];

const wallMountedCodes = [
    {
        id: "WallMountedE7",
        code: "E7",
        result: "Communication fault between indoor and outdoor units.",
    },
    {
        id: "WallMountedE1",
        code: "E1",
        result: "Room temperature sensor failure.",
    },
    { id: "WallMountedE4", code: "E4", result: "Indoor EEPROM error." },
    {
        id: "WallMountedE14",
        code: "E14",
        result: "Indoor fan motor malfunction.",
    },
    { id: "WallMountedE12", code: "F12", result: "Outdoor EEPROM error." },
    { id: "WallMountedF1", code: "F1", result: "The protection of IPM." },
    {
        id: "WallMountedF22",
        code: "F22",
        result: "Overcurrent protection of AC electricity for the outdoor model.",
    },
    {
        id: "WallMountedF3",
        code: "F3",
        result: "Communication fault between the IPM and outdoor PCB.",
    },
    {
        id: "WallMountedF19",
        code: "F19",
        result: "Power voltage is too high or low.",
    },
    {
        id: "WallMountedF4",
        code: "F4",
        result: "Overheat protection for Discharge temperature.",
    },
    { id: "WallMountedF8", code: "F8", result: "Outdoor DC fan motor fault." },
    {
        id: "WallMountedF21",
        code: "F21",
        result: "Defrost temperature sensor failure.",
    },
    {
        id: "WallMountedF7",
        code: "F7",
        result: "Suction temperature sensor failure.",
    },
    {
        id: "WallMountedF6",
        code: "F6",
        result: "Ambient temperature sensor failure.",
    },
    {
        id: "WallMountedF25",
        code: "F25",
        result: "Discharge temperature sensor failure.",
    },
    {
        id: "WallMountedF11",
        code: "F11",
        result: "deviate from the normal for the compressor.",
    },
    {
        id: "WallMountedF28",
        code: "F28",
        result: "Loop of the station detect error.",
    },
    {
        id: "WallMountedF2",
        code: "F2",
        result: "Overcurrent of the compressor.",
    },
    {
        id: "WallMountedF23",
        code: "F23",
        result: "Overcurrent protection for single-phase of the compressor.",
    },
];

export default function YorkPage() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [expandedAccordion, setExpandedAccordion] = useState<string | null>(
        "AirConditioningCodes"
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
        title,
        codes,
    }: {
        title: string;
        codes: typeof airConditioningCodes;
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
        <main className="york-error-page min-h-screen">
            <div className="pointer-events-none absolute inset-0 -z-50 blur-[50px] in-[.light]:hidden">
                <Image
                    src="/images/page-bg/search-code-bg.webp"
                    alt="York"
                    fill
                    priority
                    className="object-cover object-center"
                />
            </div>
            <section className="relative flex h-140 items-center justify-center overflow-hidden md:h-90">
                <div className="absolute inset-0">
                    <Image
                        alt="Ductless Mini Split Repair"
                        loading="lazy"
                        width="1912"
                        height="610"
                        decoding="async"
                        data-nimg="1"
                        className="h-full w-full object-cover"
                        src="/images/page-bg/error-code-search-bg.webp"
                    />
                    <div className="hero-overlay absolute inset-0"></div>
                </div>
                <div className="relative z-10 text-center text-white">
                    <h1 className="h1-title">York</h1>
                </div>
            </section>
            {/* Hero Section */}
            <section className="py-10 lg:py-16">
                <div className="container">
                    <div className="sec-ttl mx-auto flex max-w-6xl flex-col gap-5 text-center lg:gap-8">
                        <h2 className="h2-title">York Error code search</h2>
                        <div className="prose fs-19 mx-auto max-w-3xl text-center">
                            <p>
                                An unexpected HVAC failure is a critical
                                operational liability. Our specialists provide
                                priority diagnostics to identify the exact point
                                of failure and deliver data-driven repairs that
                                protect your equipment investment and restore
                                system integrity.
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

            {/* Error Code Search Section */}
            <section className="code-search py-5 lg:py-10">
                <div className="container">
                    <div className="click-dropdown mx-auto max-w-125">
                        <div className="error-btn">
                            <button
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
                                className={`code-dropdown dropdown-content ${isDropdownOpen ? "open" : ""}`}
                                id="code-dropdown-menu"
                            >
                                <div className="code-inner">
                                    {/* Air Conditioning Codes */}
                                    <div className="code-item">
                                        <button
                                            className={`code-header justify-betweenpx-4 flex w-full items-center py-3 text-left transition-colors duration-300 ${
                                                expandedAccordion ===
                                                "AirConditioningCodes"
                                                    ? "text-blue bg-[#061f31] in-[.light]:bg-[#ececec]"
                                                    : "bg-transparent"
                                            }`}
                                            onClick={() =>
                                                setExpandedAccordion(
                                                    expandedAccordion ===
                                                        "AirConditioningCodes"
                                                        ? null
                                                        : "AirConditioningCodes"
                                                )
                                            }
                                            aria-expanded={
                                                expandedAccordion ===
                                                "AirConditioningCodes"
                                            }
                                        >
                                            <h3 className="h3title font-semibold">
                                                York Air Conditioning Error
                                                Codes
                                            </h3>
                                            <PlusIcon
                                                isOpen={
                                                    expandedAccordion ===
                                                    "AirConditioningCodes"
                                                }
                                            />
                                        </button>
                                        <AccordionContent
                                            isOpen={
                                                expandedAccordion ===
                                                "AirConditioningCodes"
                                            }
                                            className={
                                                expandedAccordion ===
                                                "AirConditioningCodes"
                                                    ? "in-[.light]:border-primary bg-[#061f31] in-[.light]:bg-[#ececec]"
                                                    : "bg-transparent"
                                            }
                                        >
                                            <div className="flex flex-wrap gap-5 px-4">
                                                {airConditioningCodes.map(
                                                    (item) => (
                                                        <a
                                                            key={item.id}
                                                            className="error-id hover:text-blue cursor-pointer"
                                                            onClick={() => {
                                                                scrollToCode(
                                                                    item.id
                                                                );
                                                                setIsDropdownOpen(
                                                                    false
                                                                );
                                                            }}
                                                        >
                                                            {item.code}
                                                        </a>
                                                    )
                                                )}
                                            </div>
                                        </AccordionContent>
                                    </div>

                                    {/* Central Controller Codes */}
                                    <div className="code-item">
                                        <button
                                            className={`code-header flex w-full items-center justify-between px-4 py-3 text-left transition-colors duration-300 ${
                                                expandedAccordion ===
                                                "CentralControllerCodes"
                                                    ? "text-blue bg-[#061f31] in-[.light]:bg-[#ececec]"
                                                    : "bg-transparent"
                                            }`}
                                            onClick={() =>
                                                setExpandedAccordion(
                                                    expandedAccordion ===
                                                        "CentralControllerCodes"
                                                        ? null
                                                        : "CentralControllerCodes"
                                                )
                                            }
                                            aria-expanded={
                                                expandedAccordion ===
                                                "CentralControllerCodes"
                                            }
                                        >
                                            <h3 className="h3title font-semibold">
                                                York Central Controller Fault
                                                Codes
                                            </h3>
                                            <PlusIcon
                                                isOpen={
                                                    expandedAccordion ===
                                                    "CentralControllerCodes"
                                                }
                                            />
                                        </button>
                                        <AccordionContent
                                            isOpen={
                                                expandedAccordion ===
                                                "CentralControllerCodes"
                                            }
                                            className={
                                                expandedAccordion ===
                                                "CentralControllerCodes"
                                                    ? "in-[.light]:border-primary bg-[#061f31] in-[.light]:bg-[#ececec]"
                                                    : "bg-transparent"
                                            }
                                        >
                                            <div className="flex flex-wrap gap-5 px-4">
                                                {airConditioningCodes.map(
                                                    (item) => (
                                                        <a
                                                            key={item.id}
                                                            className="error-id hover:text-blue cursor-pointer"
                                                            onClick={() => {
                                                                scrollToCode(
                                                                    item.id
                                                                );
                                                                setIsDropdownOpen(
                                                                    false
                                                                );
                                                            }}
                                                        >
                                                            {item.code}
                                                        </a>
                                                    )
                                                )}
                                            </div>
                                        </AccordionContent>
                                    </div>

                                    {/* Malfunction Codes */}
                                    <div className="code-item">
                                        <button
                                            className={`code-header flex w-full items-center justify-between px-4 py-3 text-left transition-colors duration-300 ${
                                                expandedAccordion ===
                                                "MalfunctionCodes"
                                                    ? "text-blue bg-[#061f31] in-[.light]:bg-[#ececec]"
                                                    : "bg-transparent"
                                            }`}
                                            onClick={() =>
                                                setExpandedAccordion(
                                                    expandedAccordion ===
                                                        "MalfunctionCodes"
                                                        ? null
                                                        : "MalfunctionCodes"
                                                )
                                            }
                                            aria-expanded={
                                                expandedAccordion ===
                                                "MalfunctionCodes"
                                            }
                                        >
                                            <h3 className="h3title font-semibold">
                                                Malfunction Code Of Outdoor Unit
                                            </h3>
                                            <PlusIcon
                                                isOpen={
                                                    expandedAccordion ===
                                                    "MalfunctionCodes"
                                                }
                                            />
                                        </button>
                                        <AccordionContent
                                            isOpen={
                                                expandedAccordion ===
                                                "MalfunctionCodes"
                                            }
                                            className={
                                                expandedAccordion ===
                                                "MalfunctionCodes"
                                                    ? "in-[.light]:border-primary bg-[#061f31] in-[.light]:bg-[#ececec]"
                                                    : "bg-transparent"
                                            }
                                        >
                                            <div className="flex flex-wrap gap-5 px-4">
                                                {airConditioningCodes.map(
                                                    (item) => (
                                                        <a
                                                            key={item.id}
                                                            className="error-id hover:text-blue cursor-pointer"
                                                            onClick={() => {
                                                                scrollToCode(
                                                                    item.id
                                                                );
                                                                setIsDropdownOpen(
                                                                    false
                                                                );
                                                            }}
                                                        >
                                                            {item.code}
                                                        </a>
                                                    )
                                                )}
                                            </div>
                                        </AccordionContent>
                                    </div>

                                    {/* Central Air Conditioning Codes */}
                                    <div className="code-item">
                                        <button
                                            className={`code-header flex w-full items-center justify-between px-4 py-3 text-left transition-colors duration-300 ${
                                                expandedAccordion ===
                                                "CentralAirConditioningCodes"
                                                    ? "text-blue bg-[#061f31] in-[.light]:bg-[#ececec]"
                                                    : "bg-transparent"
                                            }`}
                                            onClick={() =>
                                                setExpandedAccordion(
                                                    expandedAccordion ===
                                                        "CentralAirConditioningCodes"
                                                        ? null
                                                        : "CentralAirConditioningCodes"
                                                )
                                            }
                                            aria-expanded={
                                                expandedAccordion ===
                                                "CentralAirConditioningCodes"
                                            }
                                        >
                                            <h3 className="h3title font-semibold">
                                                York Central Air Conditioning
                                                Error Codes
                                            </h3>
                                            <PlusIcon
                                                isOpen={
                                                    expandedAccordion ===
                                                    "CentralAirConditioningCodes"
                                                }
                                            />
                                        </button>
                                        <AccordionContent
                                            isOpen={
                                                expandedAccordion ===
                                                "CentralAirConditioningCodes"
                                            }
                                            className={
                                                expandedAccordion ===
                                                "CentralAirConditioningCodes"
                                                    ? "in-[.light]:border-primary bg-[#061f31] in-[.light]:bg-[#ececec]"
                                                    : "bg-transparent"
                                            }
                                        >
                                            <div className="flex flex-wrap gap-5 px-4">
                                                {airConditioningCodes.map(
                                                    (item) => (
                                                        <a
                                                            key={item.id}
                                                            className="error-id hover:text-blue cursor-pointer"
                                                            onClick={() => {
                                                                scrollToCode(
                                                                    item.id
                                                                );
                                                                setIsDropdownOpen(
                                                                    false
                                                                );
                                                            }}
                                                        >
                                                            {item.code}
                                                        </a>
                                                    )
                                                )}
                                            </div>
                                        </AccordionContent>
                                    </div>

                                    {/* Wall Mounted Codes */}
                                    <div className="code-item">
                                        <button
                                            className={`code-header flex w-full items-center justify-between px-4 py-3 text-left transition-colors duration-300 ${
                                                expandedAccordion ===
                                                "WallMountedCodes"
                                                    ? "text-blue in-[.light]:border-primary border-b border-white bg-[#061f31] in-[.light]:bg-[#ececec]"
                                                    : "bg-transparent"
                                            }`}
                                            onClick={() =>
                                                setExpandedAccordion(
                                                    expandedAccordion ===
                                                        "WallMountedCodes"
                                                        ? null
                                                        : "WallMountedCodes"
                                                )
                                            }
                                            aria-expanded={
                                                expandedAccordion ===
                                                "WallMountedCodes"
                                            }
                                        >
                                            <h3 className="h3title font-semibold">
                                                York Wall Mounted Type AC Error
                                                Codes
                                            </h3>
                                            <PlusIcon
                                                isOpen={
                                                    expandedAccordion ===
                                                    "WallMountedCodes"
                                                }
                                            />
                                        </button>
                                        <AccordionContent
                                            isOpen={
                                                expandedAccordion ===
                                                "WallMountedCodes"
                                            }
                                            className={
                                                expandedAccordion ===
                                                "WallMountedCodes"
                                                    ? "in-[.light]:border-primary border-none bg-[#061f31] in-[.light]:bg-[#ececec]"
                                                    : "bg-transparent"
                                            }
                                        >
                                            <div className="flex flex-wrap gap-5 px-4">
                                                {airConditioningCodes.map(
                                                    (item) => (
                                                        <a
                                                            key={item.id}
                                                            className="error-id hover:text-blue cursor-pointer"
                                                            onClick={() => {
                                                                scrollToCode(
                                                                    item.id
                                                                );
                                                                setIsDropdownOpen(
                                                                    false
                                                                );
                                                            }}
                                                        >
                                                            {item.code}
                                                        </a>
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

            {/* Disclaimers Section */}
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

                    {/* Error Code Results Sections */}
                    <div className="result-wrap bg-testimonial rounded-2xl p-5 md:rounded-3xl md:p-10">
                        <h2 className="york-title mb-6 text-2xl font-bold lg:mb-8 lg:text-3xl">
                            York air conditioning error codes
                        </h2>
                        <CodeSection
                            title="York Air Conditioning Error Codes"
                            codes={airConditioningCodes}
                        />
                        <div className="mt-10 flex justify-center">
                            <a className="theme-btn" href="/contact-us/">
                                Get a Free Quote
                            </a>
                        </div>
                    </div>

                    <div className="result-wrap bg-testimonial rounded-2xl p-5 md:rounded-3xl md:p-10">
                        <h2 className="york-title mb-6 text-2xl font-bold lg:mb-8 lg:text-3xl">
                            York Central Controller Fault Codes
                        </h2>
                        <CodeSection
                            title="York Central Controller Fault Codes"
                            codes={centralControllerCodes}
                        />
                        <div className="mt-10 flex justify-center">
                            <a className="theme-btn" href="/contact-us/">
                                Get a Free Quote
                            </a>
                        </div>
                    </div>

                    <div className="result-wrap bg-testimonial rounded-2xl p-5 md:rounded-3xl md:p-10">
                        <h2 className="york-title mb-6 text-2xl font-bold lg:mb-8 lg:text-3xl">
                            Malfunction Code of Outdoor unit
                        </h2>
                        <CodeSection
                            title="Malfunction Code Of Outdoor Unit"
                            codes={malfunctionCodes}
                        />
                        <div className="mt-10 flex justify-center">
                            <a className="theme-btn" href="/contact-us/">
                                Get a Free Quote
                            </a>
                        </div>
                    </div>

                    <div className="result-wrap bg-testimonial rounded-2xl p-5 md:rounded-3xl md:p-10">
                        <h2 className="york-title mb-6 text-2xl font-bold lg:mb-8 lg:text-3xl">
                            York Central Air Conditioning Error Codes
                        </h2>
                        <CodeSection
                            title="York Central Air Conditioning Error Codes"
                            codes={centralAirConditioningCodes}
                        />
                        <div className="mt-10 flex justify-center">
                            <a className="theme-btn" href="/contact-us/">
                                Get a Free Quote
                            </a>
                        </div>
                    </div>

                    <div className="result-wrap bg-testimonial rounded-2xl p-5 md:rounded-3xl md:p-10">
                        <h2 className="york-title mb-6 text-2xl font-bold lg:mb-8 lg:text-3xl">
                            York Wall Mounted Type AC Error Codes
                        </h2>
                        <CodeSection
                            title="York Wall Mounted Type AC Error Codes"
                            codes={wallMountedCodes}
                        />
                        <div className="mt-10 flex justify-center">
                            <a className="theme-btn" href="/contact-us/">
                                Get a Free Quote
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
