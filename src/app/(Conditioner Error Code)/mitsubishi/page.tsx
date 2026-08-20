"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type CodeItem = {
    id: string;
    code: string;
    result: string;
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
        className={`-mr-2 h-6 w-6 shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
        }`}
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

const mitsubishiAirCodes: CodeItem[] = [
    { id: "mitsubishi-air-P1", code: "P1", result: "Intake sensor error." },
    {
        id: "mitsubishi-air-P2P9",
        code: "P2 – P9",
        result: "Pipe (Liquid or 2-phase pipe) sensor error.",
    },
    {
        id: "mitsubishi-air-E6E7",
        code: "E6 – E7",
        result: "Indoor/outdoor unit communication error.",
    },
    { id: "mitsubishi-air-p4", code: "P4", result: "Drain sensor error." },
    { id: "mitsubishi-air-p5", code: "P5", result: "Drain pump error." },
    {
        id: "mitsubishi-air-pA",
        code: "PA",
        result: "Forced compressor error.",
    },
    {
        id: "mitsubishi-air-p6",
        code: "P6",
        result: "Freezing/Overheating safeguard operation.",
    },
    {
        id: "mitsubishi-air-EE",
        code: "EE",
        result: "Communication error between indoor and outdoor units.",
    },
    {
        id: "mitsubishi-air-P8",
        code: "P8",
        result: "Pipe temperature error.",
    },
    {
        id: "mitsubishi-air-E4",
        code: "E4",
        result: "Remote controller signal receiving error.",
    },
    {
        id: "mitsubishi-air-Fb",
        code: "Fb",
        result: "Indoor unit control system error (memory error, etc.).",
    },
    {
        id: "mitsubishi-air-E0E3",
        code: "E0 – E3",
        result: "Remote controller transmission error.",
    },
    {
        id: "mitsubishi-air-E1E2",
        code: "E1 – E2",
        result: "Remote controller control board error.",
    },
    {
        id: "mitsubishi-air-E9",
        code: "E9",
        result: "Indoor/outdoor unit communication error (Transmitting error) (Outdoor unit).",
    },
    {
        id: "mitsubishi-air-UP",
        code: "UP",
        result: "Compressor overcurrent interruption.",
    },
    {
        id: "mitsubishi-air-U3U4",
        code: "U3 – U4",
        result: "Open/short of outdoor unit thermistors.",
    },
    {
        id: "mitsubishi-air-UF",
        code: "UF",
        result: "Compressor overcurrent interruption (When compressor locked).",
    },
    {
        id: "mitsubishi-air-PA",
        code: "PA",
        result: "Forced compressor error.",
    },
    {
        id: "mitsubishi-air-U2",
        code: "U2",
        result: "Abnormal high discharging temperature/49C worked/insufficient refrigerant.",
    },
    {
        id: "mitsubishi-air-U1Ud",
        code: "U1 – Ud",
        result: "Abnormal high pressure (63H worked)/Overheating safeguard operation.",
    },
    {
        id: "mitsubishi-air-U5",
        code: "U5",
        result: "Abnormal temperature of heat sink.",
    },
    {
        id: "mitsubishi-air-U8",
        code: "U8",
        result: "Outdoor unit fan safeguard stop.",
    },
    {
        id: "mitsubishi-air-U6",
        code: "U6",
        result: "Compressor overcurrent interruption/Abnormal of power module.",
    },
    {
        id: "mitsubishi-air-U7",
        code: "U7",
        result: "Abnormality of super heat due to low discharge temperature.",
    },
    {
        id: "mitsubishi-air-U9UH",
        code: "U9 – UH",
        result: "Abnormality such as over-voltage or voltage shortage and abnormal synchronous signal to main circuit/Current sensor error.",
    },
];

const slimACodes: CodeItem[] = [
    {
        id: "SlimEA",
        code: "EA",
        result: "Error detail Mis-wiring of indoor/outdoor unit. exceed the number of indoor unit connection. Inspected unit Outdoor.",
    },
    {
        id: "SlimEb",
        code: "Eb",
        result: "Error detail Mis-wiring of indoor/outdoor unit. (mis-wiring disconnection) Inspected unit Outdoor.",
    },
    {
        id: "SlimEC",
        code: "EC",
        result: "Error detail Start-up time over. Inspected unit Outdoor.",
    },
    {
        id: "SlimE6",
        code: "E6",
        result: "Error detail Indoor/outdoor unit transmission error (signal receiving error). Inspected unit Indoor.",
    },
    {
        id: "SlimE7",
        code: "E7",
        result: "Error detail Indoor/outdoor unit transmission error (transmitting error). Inspected unit Indoor.",
    },
    {
        id: "SlimE8",
        code: "E8",
        result: "Error detail Indoor/outdoor unit transmission error (signal receiving error). Inspected unit Outdoor.",
    },
    {
        id: "SlimE9",
        code: "E9",
        result: "Error detail Indoor/outdoor unit transmission error (transmitting error). Inspected unit Outdoor.",
    },
    {
        id: "SlimE0",
        code: "E0",
        result: "Error detail Remote control transmission error (signal receiving error). Inspected unit Remote control.",
    },
    {
        id: "SlimE3",
        code: "E3",
        result: "Error detail Remote control transmission error (transmitting error). Inspected unit Remote control.",
    },
    {
        id: "SlimE4",
        code: "E4",
        result: "Error detail Remote control transmission error (signal receiving error). Inspected unit Indoor.",
    },
    {
        id: "SlimE5",
        code: "E5",
        result: "Error detail Remote control transmission error (transmitting error). Inspected unit Indoor.",
    },
    {
        id: "SlimEF",
        code: "EF",
        result: "Error detail M-NET transmission error. Inspected unit Indoor and outdoor.",
    },
    {
        id: "SlimEd",
        code: "Ed",
        result: "Error detail Serial transmission error. Inspected unit Outdoor.",
    },
    {
        id: "SlimP1",
        code: "P1",
        result: "Error detail Abnormality of room temperature thermistor (TH1). Inspected unit Indoor.",
    },
    {
        id: "SlimP2",
        code: "P2",
        result: "Error detail Abnormality of pipe temperature thermistor/liquid (TH2). Inspected unit Indoor.",
    },
    {
        id: "SlimP4",
        code: "P4",
        result: "Error detail Abnomarlity of drain sensor (DS). Inspected unit Indoor.",
    },
    {
        id: "SlimP5",
        code: "P5",
        result: "Error detail Malfunction of drain-up machine. Inspected unit Indoor.",
    },
    {
        id: "SlimP6",
        code: "P6",
        result: "Error detail Freezing/overheating protection detect. Inspected unit Indoor.",
    },
    {
        id: "SlimP8",
        code: "P8",
        result: "Error detail Abnormality of pipe temperature. Inspected unit Indoor.",
    },
    {
        id: "SlimP9",
        code: "P9",
        result: "Error detail A-normality of pipe temperature thermistor/condenser/evaporator (TH5). Inspected unit Indoor.",
    },
    {
        id: "SlimF1",
        code: "F1",
        result: "Error detail Reverse phase detection.",
    },
    {
        id: "SlimF2",
        code: "F2",
        result: "Error detail L3 open phase detection.",
    },
    {
        id: "SlimF3",
        code: "F3",
        result: "Error detail 63L connector open.",
    },
    {
        id: "SlimF4",
        code: "F4",
        result: "Error detail 49C connector open.",
    },
    {
        id: "SlimF9",
        code: "F9",
        result: "Error detail Connector 2 or more open.",
    },
    {
        id: "SlimFA",
        code: "FA",
        result: "Error detail L2-phased open phase or 51CM connector open.",
    },
    {
        id: "SlimF7",
        code: "F7",
        result: "Error detail Reverse phase detection circuit (p.c.board) fault.",
    },
    {
        id: "SlimF8",
        code: "F8",
        result: "Error detail Input circuit fault.",
    },
    {
        id: "SlimU2",
        code: "U2",
        result: "Error detail Abnormal high discharging temperature.",
    },
    {
        id: "SlimU2-49C",
        code: "U2",
        result: "Error detail Inner thermostat (49C) operation.",
    },
    {
        id: "SlimU1",
        code: "U1",
        result: "Error detail Abnormal high pressure (high pressure switch 63H worked).",
    },
    {
        id: "SlimU1A",
        code: "U1",
        result: "Error detail Direct cut operation.",
    },
    {
        id: "SlimUE",
        code: "UE",
        result: "Error detail High pressure error (ball valve closed).",
    },
    {
        id: "SlimUL",
        code: "UL",
        result: "Error detail Over heat protection.",
    },
    {
        id: "SlimUd",
        code: "Ud",
        result: "Error detail Over heat protection.",
    },
    {
        id: "SlimU6",
        code: "U6",
        result: "Error detail Compressor over current (overload) cut off.",
    },
    {
        id: "SlimUA",
        code: "UA",
        result: "Error detail Compressor over current (terminal relay operation).",
    },
    {
        id: "SlimUF",
        code: "UF",
        result: "Error detail Compressor over current (start-up locked) cut off.",
    },
    {
        id: "SlimUF-operating",
        code: "UF",
        result: "Error detail Compressor over current (operating locked) cut off.",
    },
    {
        id: "SlimUH",
        code: "UH",
        result: "Error detail Current sensor error.",
    },
    {
        id: "SlimU3",
        code: "U3",
        result: "Error detail Discharge thermistor short/open.",
    },
    {
        id: "SlimU4",
        code: "U4",
        result: "Error detail Outdoor thermistor short/open.",
    },
];

const remoteControllerCodes: CodeItem[] = [
    {
        id: "Slim-LED-E0",
        code: "LED E0",
        result: "Diagnosis of malfunction Transmitting/receiving signal error. Inspected unit Indoor.",
    },
    {
        id: "Slim-LED-P1",
        code: "LED P1",
        result: "Diagnosis of malfunction Intake air sensor abnormal. Inspected unit Indoor.",
    },
    {
        id: "Slim-LED-P2",
        code: "LED P2",
        result: "Diagnosis of malfunction Pipe sensor abnormal. Inspected unit Indoor.",
    },
    {
        id: "Slim-LED-P4",
        code: "LED P4",
        result: "Diagnosis of malfunction Drain sensor abnormal. Inspected unit Indoor.",
    },
    {
        id: "Slim-LED-P5",
        code: "LED P5",
        result: "Diagnosis of malfunction Malfunctioning of the drain overflow protecting mechanism. Inspected unit Indoor.",
    },
    {
        id: "Slim-LED-P6",
        code: "LED P6",
        result: "Diagnosis of malfunction Abnormality of the coil frost/overheating protection mode. Inspected unit Indoor.",
    },
    {
        id: "Slim-LED-P3",
        code: "LED P3",
        result: "Diagnosis of malfunction System error (transmitting/receiving signal). Inspected unit Indoor.",
    },
    {
        id: "Slim-LED-P7",
        code: "LED P7",
        result: "Diagnosis of malfunction System error (address). Inspected unit Indoor.",
    },
    {
        id: "Slim-LED-P8",
        code: "LED E8",
        result: "Diagnosis of malfunction Outdoor unit malfunction. Inspected unit Outdoor.",
    },
];

const outdoorUnitCodes: CodeItem[] = [
    {
        id: "Slim-LED-LD1",
        code: "LED LD1",
        result: "LED ON Compressor directive, LED Flash Reverse phase detect.",
    },
    {
        id: "Slim-LED-LD2",
        code: "LED LD2",
        result: "LED ON Heating directive, LED Flash Open phase detect.",
    },
    {
        id: "Slim-LED-LD3",
        code: "LED LD3",
        result: "LED ON During 63H1 operation, LED Flash Pipe sensor short/open.",
    },
    {
        id: "Slim-LED-LD4",
        code: "LED LD4",
        result: "LED ON Compressor ON, LED Flash High pressure switch (63H2) operation.",
    },
    {
        id: "Slim-LED-LD5",
        code: "LED LD5",
        result: "LED ON Outdoor fan ON, LED Flash Over current relay (51CM) operation.",
    },
    {
        id: "Slim-LED-LD6",
        code: "LED LD6",
        result: "LED ON 4-way valve ON, LED Flash Thermal switch (26C) operation.",
    },
    {
        id: "Slim-LED-LD7",
        code: "LED LD7",
        result: "LED ON Bypass valve ON, LED Flash Thermistor (TH3) overheat protection.",
    },
    {
        id: "Slim-LED-LD8",
        code: "LED LD8",
        result: "LED ON Crankcase heater ON, LED Flash Detective input.",
    },
];

const membraneRows = [
    {
        id: "tableE0",
        code: "EO",
        diagnosis:
            "Signal transmitting/receiving error (Indoor controller does not respond to remote controller signal)",
        cause: "During individual unit control\n1) Bad contact of transmission wire.\n2) Signal transmitting/receiving circuit is abnormal.",
        check: "1) Check the transmission wire.\n2) Check with another remote controller. If “EO” is still indicated, replace the indoor controller board. If other check code appears, replace the original remote controller.",
    },
    {
        id: "tableP1",
        code: "P1",
        diagnosis: "Abnormality of room temperature thermistor (RT1)",
        cause: "1) Bad contact of thermistor\n2) Damaged thermistor",
        check: "1) Check the thermistor.\n2) Measure the resistance of the thermistor. Normal resistance should be as follows.\n32°F ····15kΩ\n86°F ·····4.3kΩ\n50°F ·····9.6kΩ\n104°F ····3.0kΩ\n68°F ·····6.3kΩ\nIf the resistance is normal, replace the indoor controller board.",
    },
    {
        id: "tableP2",
        code: "P2",
        diagnosis: "Abnormality of indoor coil thermistor (RT2)",
        cause: "1) Bad contact of thermistor\n2) Damaged thermistor",
        check: "1) Check the thermistor.\n2) Measure the resistance of the thermistor. Normal resistance should be as follows.\n32°F ····15kΩ\n86°F ·····4.3kΩ\n50°F ·····9.6kΩ\n104°F ····3.0kΩ\n68°F ·····6.3kΩ\nIf the resistance is normal, replace the indoor controller board.",
    },
    {
        id: "tableP3",
        code: "P3",
        diagnosis:
            "Signal transmission error (Remote controller does not respond to indoor controller signal)",
        cause: "1) Bad contact of transmission wire.\n2) Signal transmitting/receiving circuit is abnormal.\n3) Wrong operation due to noise wave emitted by other appliances.",
        check: "1) Check the transmission wire.\n2) Check with another remote controller. If “P3” is still indicated, replace the indoor board. If other check code appears, replace the original remote controller.\n3) Short-circuit between 1 and ➁ of CN40 and attach CN40 to the following units:\n• Second unit in twin control\n• Second and third units in triple control\n• Sub units in group control",
    },
    {
        id: "tableP4",
        code: "P4",
        diagnosis: "Abnormality of drain sensor",
        cause: "1) Bad contact of transmission wire\n2) Damaged thermistor",
        check: "1) Check the connector.\n2) Measure the resistance of the thermistor ➃ – ➄. As for the normal resistance, refer to the case of P1. If the resistance is normal, replace the indoor controller board.",
    },
    {
        id: "tableP5",
        code: "P5",
        diagnosis: "Malfunction of drain pump",
        cause: "1) Malfunction of drain pump\n2) Damaged drain sensor",
        check: "1) Check the drain pump.\n2) Check the drain sensor.\n• Check the drain sensor heater. Normal resistance should be 82Ω.\nIf the resistance is normal, replace the indoor controller board.",
    },
    {
        id: "tableP6",
        code: "P6",
        diagnosis: "Coil frost protection is working.",
        cause: "1) Short cycle of air cycle\n2) Dirty air filter\n3) Damaged fan\n4) Abnormal refrigerant",
        check: "1) Clear obstructions from the air cycle.\n2) Clean the air filter.\n3) Check the fan.\n4) Check the refrigerant temperature.",
    },
    {
        id: "tableP7",
        code: "P7",
        diagnosis: "System error",
        cause: "1) Wrong address-setting\n2) Signal transmitting/receiving circuit of remote controller is abnormal.\n3) Wrong SW6-setting",
        check: "1) Check the address-setting.\n2) Check with another remote controller. If check code other than “P7” appears, replace the original remote controller.\n3) Check SW6 setting.",
    },
    {
        id: "tableP8",
        code: "P8",
        diagnosis: "Abnormality in outdoor unit",
        cause: "1) Wrong wiring of indoor/outdoor connecting wire\n2) Reversed phase\n3) Protection device is working\n4) Damaged outdoor coil thermistor",
        check: "1) Check the indoor/outdoor connecting wire.\n2) Change the connection of electric wiring.\n3) Check the protection device.\n4) Measure the resistance of the outdoor coil thermistor. If the resistance is normal, replace the outdoor controller board.",
    },
];

const CodeSection = ({ codes }: { codes: CodeItem[] }) => (
    <div className="code-results space-y-6 lg:space-y-8">
        {codes.map((item) => (
            <div key={item.id} className="code-info" id={item.id}>
                <h3 className="text-xl font-medium lg:mb-2 lg:text-2xl">
                    CODE: {item.code}
                </h3>
                <p className="fs-19 whitespace-pre-line">
                    <b>RESULT:</b>&nbsp;{item.result}
                </p>
            </div>
        ))}
    </div>
);

export default function MitsubishiPage() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [expandedAccordion, setExpandedAccordion] = useState<string | null>(
        "MitsubishiAirCodes"
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

    const accordionGroups = [
        {
            id: "MitsubishiAirCodes",
            title: "Mitsubishi air conditioning error codes",
            codes: mitsubishiAirCodes,
        },
        {
            id: "SlimACodes",
            title: "Mr.Slim A-control error code list",
            codes: slimACodes,
        },
        {
            id: "RemoteControllerCodes",
            title: "Mr.Slim K-control Display of remote controller.",
            codes: remoteControllerCodes,
        },
        {
            id: "OutdoorUnitCodes",
            title: "Mr.Slim K-control Outdoor unit",
            codes: outdoorUnitCodes,
        },
        {
            id: "MembraneCodes",
            title: "Mitsubishi Mr. Slim Error Codes – Membrane type remote controllers",
            codes: membraneRows.map((row) => ({
                id: row.id,
                code: row.code,
                result: row.diagnosis,
            })),
        },
    ];

    return (
        <main className="mitsubishi-error-page min-h-screen">
            <div className="pointer-events-none absolute inset-0 -z-50 blur-[50px] in-[.light]:hidden">
                <Image
                    src="/images/page-bg/search-code-bg.webp"
                    alt="Mitsubishi Electric"
                    fill
                    priority
                    className="object-cover object-center"
                />
            </div>

            {/* Hero */}
            <section className="relative flex h-140 items-center justify-center overflow-hidden md:h-90">
                <div className="absolute inset-0">
                    <Image
                        src="/images/page-bg/error-code-search-bg.webp"
                        alt="Mitsubishi Electric Error Code Search"
                        fill
                        priority
                        className="h-full w-full object-cover"
                    />
                    <div className="hero-overlay absolute inset-0" />
                </div>

                <div className="relative z-10 text-center text-white">
                    <h1 className="h1-title">Mitsubishi Electric</h1>
                </div>
            </section>

            {/* Intro */}
            <section className="py-10 lg:py-16">
                <div className="container">
                    <div className="sec-ttl mx-auto flex max-w-6xl flex-col gap-5 text-center lg:gap-8">
                        <h2 className="h2-title">
                            Mitsubishi Electric Error code search
                        </h2>

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

            {/* Error Code Dropdown */}
            <section className="code-search py-5 lg:py-10">
                <div className="container">
                    <div className="click-dropdown mx-auto max-w-155">
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
                                id="code-dropdown-menu"
                                className={`code-dropdown dropdown-content ${
                                    isDropdownOpen ? "open" : ""
                                }`}
                            >
                                <div className="code-inner">
                                    {accordionGroups.map((group) => {
                                        const isOpen =
                                            expandedAccordion === group.id;

                                        return (
                                            <div
                                                className="code-item"
                                                key={group.id}
                                            >
                                                <button
                                                    className={`code-header flex w-full items-center justify-between px-4 py-3 text-left transition-colors duration-300 ${
                                                        isOpen
                                                            ? "text-blue bg-[#061f31] in-[.light]:bg-[#ececec]"
                                                            : "bg-transparent"
                                                    }`}
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
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Disclaimer / Caution */}
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

                    {/* Mitsubishi Air Conditioning */}
                    <div className="result-wrap bg-testimonial rounded-2xl p-5 md:rounded-3xl md:p-10">
                        <h2 className="york-title mb-6 text-2xl font-bold lg:mb-8 lg:text-3xl">
                            Mitsubishi air conditioning error codes
                        </h2>

                        <CodeSection codes={mitsubishiAirCodes} />

                        <div className="mt-10 flex justify-center">
                            <a className="theme-btn" href="/contact-us/">
                                Get a Free Quote
                            </a>
                        </div>
                    </div>

                    {/* Mr. Slim A-control */}
                    <div className="result-wrap bg-testimonial rounded-2xl p-5 md:rounded-3xl md:p-10">
                        <h2 className="york-title mb-6 text-2xl font-bold lg:mb-8 lg:text-3xl">
                            Mr.Slim A-control error code list
                        </h2>

                        <p className="fs-19 mb-6">
                            Display of remote controller
                        </p>

                        <CodeSection codes={slimACodes} />

                        <div className="mt-10 flex justify-center">
                            <a className="theme-btn" href="/contact-us/">
                                Get a Free Quote
                            </a>
                        </div>
                    </div>

                    {/* K-control Remote Controller */}
                    <div className="result-wrap bg-testimonial rounded-2xl p-5 md:rounded-3xl md:p-10">
                        <h2 className="york-title mb-6 text-2xl font-bold lg:mb-8 lg:text-3xl">
                            Mr.Slim K-control Display of remote controller.
                        </h2>

                        <CodeSection codes={remoteControllerCodes} />

                        <div className="mt-10 flex justify-center">
                            <a className="theme-btn" href="/contact-us/">
                                Get a Free Quote
                            </a>
                        </div>
                    </div>

                    {/* Outdoor Unit */}
                    <div className="result-wrap bg-testimonial rounded-2xl p-5 md:rounded-3xl md:p-10">
                        <h2 className="york-title mb-6 text-2xl font-bold lg:mb-8 lg:text-3xl">
                            Mr.Slim K-control Outdoor unit
                        </h2>

                        <div className="fs-19 mb-6 space-y-2">
                            <p>LED ON = Operation status</p>
                            <p>LED Flash = Check code display</p>
                        </div>

                        <CodeSection codes={outdoorUnitCodes} />

                        <div className="mt-10 flex justify-center">
                            <a className="theme-btn" href="/contact-us/">
                                Get a Free Quote
                            </a>
                        </div>
                    </div>
                </div>
                <div className="container mt-10">
                    {/* Membrane Table */}
                    <div className="result-wrap bg-testimonial rounded-2xl p-5 md:rounded-3xl md:p-10">
                        <h2 className="york-title mb-6 text-center text-2xl font-bold lg:mb-8 lg:text-3xl">
                            Mitsubishi Mr. Slim Error Codes – Membrane type
                            remote controllers
                        </h2>

                        <div className="table-scroll-mobile overflow-x-auto">
                            <table className="table-code-data in-[.light]:border-primary w-full border-collapse border border-white/20">
                                <thead>
                                    <tr>
                                        <th className="in-[.light]:border-primary border border-white/20 p-4 text-left">
                                            Check code
                                        </th>
                                        <th className="in-[.light]:border-primary border border-white/20 p-4 text-left">
                                            Diagnosis of malfunction
                                        </th>
                                        <th className="in-[.light]:border-primary border border-white/20 p-4 text-left">
                                            Cause
                                        </th>
                                        <th className="in-[.light]:border-primary border border-white/20 p-4 text-left">
                                            Check points
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {membraneRows.map((row) => (
                                        <tr key={row.id}>
                                            <td
                                                id={row.id}
                                                className="in-[.light]:border-primary border border-white/20 p-4 font-semibold"
                                            >
                                                {row.code}
                                            </td>
                                            <td className="in-[.light]:border-primary border border-white/20 p-4 whitespace-pre-line">
                                                {row.diagnosis}
                                            </td>
                                            <td className="in-[.light]:border-primary border border-white/20 p-4 whitespace-pre-line">
                                                {row.cause}
                                            </td>
                                            <td className="in-[.light]:border-primary border border-white/20 p-4 whitespace-pre-line">
                                                {row.check}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

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
