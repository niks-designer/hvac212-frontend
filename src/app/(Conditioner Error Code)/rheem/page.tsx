"use client";

import { useState } from "react";
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
    return (
        <div
            className={`accordion-content overflow-hidden ${isOpen ? "in-[.light]:border-primary border-t border-b border-white" : ""} ${className}`}
            style={{
                height: isOpen ? "200px" : "0px",
                maxHeight: isOpen ? "200px" : "0px",
                transition: "max-height 0.4s ease-in-out",
                overflowY: isOpen ? "auto" : "hidden",
                overflowX: "hidden",
                scrollbarWidth: "thin",
            }}
        >
            {children}
        </div>
    );
};

const rheemAirConditioningCodes = [
    {
        id: "rheem-0standby",
        code: "0 – Standby",
        result: "No command for unit operation.",
        fix: "Normal operation.",
    },
    {
        id: "rheem-cfirst-stage-cooling",
        code: "C – First Stage Cooling",
        result: "Unit has received a command for first stage cooling.",
        fix: "Normal operation.",
    },
    {
        id: "rheem-cflashing",
        code: "C Flashing",
        result: "Anti-short cycle timer (3 minutes) or Minimum run timer (30 seconds) active.",
        fix: "The unit has received a command for first stage cooling during an active anti-short cycle timer or minimum run timer. Wait until unit timer has expired or press the TEST button to defeat short cycle delay.",
    },
    {
        id: "rheem-csecond-stage-cooling",
        code: "C – Second Stage Cooling",
        result: "Unit has received a command for second stage cooling.",
        fix: "Normal operation.",
    },
    {
        id: "rheem-C-flashing",
        code: "C Flashing",
        result: "Anti-short cycle timer (3 minutes) or Minimum run timer (30 seconds) active.",
        fix: "The unit has received a command for second stage cooling during an active anti-short cycle timer or minimum run timer. Wait unit timer has expired or press the TEST button to defeat short cycle delay.",
    },
    {
        id: "rheem-Hfirst-stage-heat-pump",
        code: "H – First Stage Heat Pump",
        result: "Unit has received a command for first stage heat pump.",
        fix: "Normal operation.",
    },
    {
        id: "rheem-H-flashing",
        code: "H Flashing",
        result: "Anti-short cycle timer (3 minutes) or Minimum run timer (30 seconds) action.",
        fix: "The unit has received a command for first stage heat pump during an active anti-short cycle timer or minimum run time. Wait unit timer has expired or press the TEST button to defeat short cycle delay.",
    },
    {
        id: "rheem-Hsecond-stage-heat-pump",
        code: "H – Second Stage Heat Pump",
        result: "Unit has received a command for second stage heat pump.",
        fix: "Normal operation.",
    },
    {
        id: "rheem-hflashing",
        code: "H Flashing",
        result: "Anti-short cycle timer (3 minutes) or Minimum run timer (30 seconds) active.",
        fix: "The unit has received a command for second stage heat pump during an active anti-short cycle timer or minimum run timer. Wait unit timer has expired or press the TEST button to defeat short cycle delay.",
    },
    {
        id: "rheem-d-defrost-active",
        code: "D – Defrost Active",
        result: "The unit is undergoing a defrost cycle.",
        fix: "Normal operation.",
    },
    {
        id: "rheem-T-test-mode",
        code: "T – Test Mod",
        result: "Test Mod.",
        fix: "The ICC is in TEST mode.",
    },
    {
        id: "rheem-P-Protector-Trip",
        code: "P – Protector Trip",
        result: "A command for compressor operation is present but no current is measured to the compressor.",
        fix: "Motor protector open.",
    },
    {
        id: "rheem01",
        code: "01 – Long Run Time (Compressor)",
        result: "The compressor has continuously run for more than 18 hours in the cooling mode.",
        fix: "Low refrigerant charge. Air ducts have substantial leakage. Dirty indoor air filter. Dirty outdoor coil.",
    },
    {
        id: "rheem02",
        code: "02 – High Pressure",
        result: "Compressor limit has opened four (4) times within a call for operation.",
        fix: "Outdoor coil is dirty (cooling mode). Outdoor fan is not running (cooling mode). Dirty indoor coil or filter (heating mode). Indoor blower is not running (heating mode). Liquid line restriction. Excessive refrigerant charge.",
    },
    {
        id: "rheem03",
        code: "03 – Short Cycling",
        result: "ICC detects the run time for the past four (4) compressor or cycles is less than three (3) minutes each.",
        fix: "Check thermostat wire connection. Check thermostat location in zone.",
    },
    {
        id: "rheemL4",
        code: "L4 – Locked Rotor",
        result: "The ICC detects four (4) consecutive protector trips have occurred and the average run time for each trip is less than 15 seconds.",
        fix: "Bad run capacitor. Low line voltage. Excessive refrigerant in compressor. Seized bearings in compressor.",
    },
    {
        id: "rheem05",
        code: "05 – Open circuit (Compressor Will not Run)",
        result: "The ICC has had a protector trip for longer than 4 hours.",
        fix: "Check for damaged, miswired, or wrong run capacitor. Check for broken wires, loose connectors, or miswired compressor. Check compressor windings for continuity. Check for open compressor internal protector.",
    },
    {
        id: "rheem06",
        code: "06 – Compressor Open Start Circuit",
        result: "The ICC detects current in the Run circuit but not in the Start circuit of the compressor.",
        fix: "Check for damaged, miswired, or wrong run capacitor. Check for broken wires, loose connectors, or miswired compressor. Check compressor windings for continuity.",
    },
    {
        id: "rheemL6",
        code: "L6 – Compressor Open Start Circuit",
        result: "The ICC detects current in the Run circuit but not in the Start circuit of the compressor four (4) times in one compressor call.",
        fix: "Check for damaged, miswired, or wrong run capacitor. Check for broken wires, loose connectors, or miswired compressor. Check compressor windings for continuity.",
    },
    {
        id: "rheem07",
        code: "07 – Compressor Open Run Circuit",
        result: "The ICC detects current in the Start circuit but not in the Run circuit of the compressor.",
        fix: "Check for damaged, miswired, or wrong run capacitor. Check for broken wires, loose connectors, or miswired compressor. Check compressor windings for continuity.",
    },
    {
        id: "rheemL7",
        code: "L7 – Compressor Open Run Circuit",
        result: "The ICC detects current in the Start circuit but not in the Run circuit of the compressor four (4) times in one compressor call.",
        fix: "Check for damaged, miswired, or wrong run capacitor. Check for broken wires, loose connectors, or miswired compressor. Check compressor windings for continuity.",
    },
    {
        id: "rheem09",
        code: "09 – Low Secondary Volts",
        result: "The secondary voltage at R and C is below 18VAC.",
        fix: "Control transformer overloaded. Low line voltage.",
    },
    {
        id: "rheem21",
        code: "21 – Low Pressure Control Open",
        result: "The ICC detects the LPC is open. Note: The low pressure control is ignored for the first 90 seconds of compressor operation.",
        fix: "Unit has low refrigerant charge. Indoor coil is frozen (cooling mode). Dirty indoor coil or filter (cooling mode). Indoor blower is not running (cooling mode). Outdoor coil is frozen (heating mode). Expansion valve is not operating correctly.",
    },
    {
        id: "rheemL21",
        code: "L21 Flashing",
        result: "Active Protection, Low Pressure Control Trip.",
        fix: "LPC has opened 3 times in the same cooling operation, the ICC has locked out the compressor to protect it. ICC alternately flashes L and 21.",
    },
    {
        id: "rheem27",
        code: "27",
        result: "Low Line Voltage or No Line Voltage Fault.",
        fix: "Check incoming line voltage to the disconnect and unit. Check wiring connections.",
    },
    {
        id: "rheem28",
        code: "28",
        result: "High Line Voltage Fault.",
        fix: "Check line voltage.",
    },
    {
        id: "rheem29",
        code: "29",
        result: "High Pressure Control Open. The ICC detects the HPC is open.",
        fix: "Outdoor coil is dirty (cooling mode). Outdoor fan is not running (cooling mode). Dirty indoor coil or filter (heating mode). Indoor blower is not running (heating mode). Liquid line restriction. Excessive refrigerant charge.",
    },
    {
        id: "rheemL29",
        code: "L29 Flashing – Active Protection",
        result: "High Pressure Control Trip.",
        fix: "LPC has opened 3 times in the same cooling operation, the ICC has locked out the compressor to protect it. ICC alternately flashes L and 29.",
    },
    {
        id: "rheem30",
        code: "30 – Fuse Open",
        result: "The ICC detects the on-board fuse is open.",
        fix: "The 3 amp fuse on the ICC is open. Low voltage wiring at R and C is damaged or miswired.",
    },
    {
        id: "rheem80",
        code: "80 – Low Air Flow",
        result: "The ICC detects that the indoor unit is not providing the minimum airflow requirements.",
        fix: "Misapplied wrong indoor air mover – replace with properly sized unit.",
    },
    {
        id: "rheem83",
        code: "83 – Condenser Coil Temperature Fault",
        result: "The sensor detects an abnormally low or high coil temperature.",
        fix: "Replace the sensor. Check sensor is installed correctly on control.",
    },
    {
        id: "rheem84",
        code: "84 – Outdoor Ambient Temperature Fault",
        result: "The sensor detects an abnormally low or high outdoor ambient temperature.",
        fix: "Check unit placement – If the outdoor unit is in a high temperature area, wait until the ambient temperature drops and check sensor reading. Replace the sensor. Check sensor is installed correctly on control.",
    },
    {
        id: "rheem93",
        code: "93 – Internal Control Fault",
        result: "The sensor detects an abnormally low or high outdoor ambient temperature. The control is not functioning properly.",
        fix: "Check control for proper system operation. Replace control.",
    },
    {
        id: "rheemd1",
        code: "d1",
        result: "No Shared Data.",
        fix: "Replace memory card with correct system information.",
    },
    {
        id: "rheemd3",
        code: "d3 – Airflow CFM Mismatch",
        result: "The indoor air mover (air handler/furnace) cannot supply the required airflow for proper system operation.",
        fix: "Misapplied wrong indoor air mover – replace with properly sized air handler/furnace.",
    },
    {
        id: "rheemd4",
        code: "d4 – (Device) Memory Card Invalid for Device",
        result: "The data in the memory card inserted into the control board does not match the data in the control.",
        fix: "Check memory card to ensure it matches device. Check if memory card is present.",
    },
    {
        id: "rheemd8",
        code: "d8 – Old Shared Data",
        result: "System data is obsolete.",
        fix: "If system will not operate, order new memory card to update system information.",
    },
];

export default function RheemPage() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [expandedAccordion, setExpandedAccordion] = useState<string | null>(
        "RheemAirConditioningCodes"
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
        codes: typeof rheemAirConditioningCodes;
    }) => (
        <div className="code-results space-y-6 lg:space-y-8">
            {codes.map((item) => (
                <div key={item.id} className="code-info" id={item.id}>
                    <h3 className="text-xl font-medium lg:mb-2 lg:text-2xl">
                        CODE: {item.code}
                    </h3>
                    <p className="fs-19">
                        <b>RESULT:</b>&nbsp;{item.result}
                        <br />
                        <b>FIX:</b>&nbsp;{item.fix}
                    </p>
                </div>
            ))}
        </div>
    );

    return (
        <main className="rheem-error-page relative min-h-screen overflow-hidden">
            <div className="pointer-events-none absolute inset-0 -z-50 blur-[50px] in-[.light]:hidden">
                <Image
                    src="/images/page-bg/search-code-bg.webp"
                    alt="Rheem"
                    fill
                    priority
                    className="object-cover object-center"
                />
            </div>

            <section className="relative flex h-140 items-center justify-center overflow-hidden md:h-90">
                <div className="absolute inset-0">
                    <Image
                        alt="Rheem Error Code Search"
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
                    <h1 className="h1-title">Rheem</h1>
                </div>
            </section>

            <section className="py-10 lg:py-16">
                <div className="container">
                    <div className="sec-ttl mx-auto flex max-w-6xl flex-col gap-5 text-center lg:gap-8">
                        <h2 className="h2-title">Rheem Error code search</h2>
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
                                            className={`code-header flex w-full items-center justify-between px-4 py-3 text-left transition-colors duration-300 ${expandedAccordion === "RheemAirConditioningCodes" ? "text-blue bg-[#061f31] in-[.light]:bg-[#ececec]" : "bg-transparent"}`}
                                            onClick={() =>
                                                setExpandedAccordion(
                                                    expandedAccordion ===
                                                        "RheemAirConditioningCodes"
                                                        ? null
                                                        : "RheemAirConditioningCodes"
                                                )
                                            }
                                            aria-expanded={
                                                expandedAccordion ===
                                                "RheemAirConditioningCodes"
                                            }
                                        >
                                            <h3 className="h3title font-semibold">
                                                Rheem air conditioning codes
                                            </h3>
                                            <PlusIcon
                                                isOpen={
                                                    expandedAccordion ===
                                                    "RheemAirConditioningCodes"
                                                }
                                            />
                                        </button>

                                        <AccordionContent
                                            isOpen={
                                                expandedAccordion ===
                                                "RheemAirConditioningCodes"
                                            }
                                            className={
                                                expandedAccordion ===
                                                "RheemAirConditioningCodes"
                                                    ? "bg-[#061f31] in-[.light]:bg-[#ececec]"
                                                    : "bg-transparent"
                                            }
                                        >
                                            <div className="flex flex-wrap gap-5 px-4">
                                                {rheemAirConditioningCodes.map(
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
                            Rheem air conditioning codes
                        </h2>

                        <CodeSection codes={rheemAirConditioningCodes} />

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
