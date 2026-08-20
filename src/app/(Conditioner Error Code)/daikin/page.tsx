"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type ErrorCode = {
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
}) => (
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

const rawErrorCodes: Omit<ErrorCode, "id">[] = [
    {
        code: "A0",
        result: "External protection device activated. External protection device connected to the terminal strip T1-T2 of indoor unit is activated.",
    },
    {
        code: "A1",
        result: "Malfunction of indoor unit PCB Malfunction due to noise Defect of indoor unit PCB.",
    },
    {
        code: "A3",
        result: "Malfunction of drain level control system Drain piping clogging, improper drain piping work Defect of drain pump. Defect of float switch.",
    },
    {
        code: "A4",
        result: "Malfunction of freezing protection Shortage of water volume Low water temperature setting Defect of 26WL. Defect of water temperature thermistor.",
    },
    {
        code: "A5",
        result: "High pressure control in heating, freeze-up protection control in cooling Clogged air filter of indoor unit and short-circuit Defect of indoor unit heat exchanger thermistor.",
    },
    {
        code: "A6",
        result: "Fan motor locked, overload, overcurrent Defect of connector contact Defect of indoor unit PCB Defect of fan motor.",
    },
    {
        code: "A7",
        result: "Malfunction of swing flap motor Failure of swing flap motorm, Defect of indoor unit PCB Jammed swing mechanism/blade.",
    },
    {
        code: "A8",
        result: "Malfunction of power supply Overcurrent of AC input, Defect of power supply voltage.",
    },
    {
        code: "A9",
        result: "Malfunction of electronic expansion valve drive Defect of electronic expansion valve coil, Defect of indoor unit PCB, Defect of connector contact.",
    },
    {
        code: "AA",
        result: "Heater overheat 26WH is activated.",
    },
    {
        code: "AF",
        result: "Malfunction of a humidifier system Water leakage of humidifier (option), Failure of swing float switch. Improper drain piping incline.",
    },
    {
        code: "AH",
        result: "Malfunction of dust collector of air cleaner Defect of dust collecting element Defect of high voltage power supply unit Stained insulator part Defect of indoor unit PCB.",
    },
    {
        code: "AJ",
        result: "Malfunction of capacity setting (Indoor unit PCB) Capacity setting adaptor is not installed when replacing PCB Defect of indoor unit PCB.",
    },
    {
        code: "C1",
        result: "Failure of transmission (between indoor unit PCB and fan PCB) Defect of transmission of fan motor control driver.",
    },
    {
        code: "C4",
        result: "Malfunction of liquid pipe thermistor for heat exchanger Defect of connector contact. Defect of liquid pipe thermistor for heat exchanger.",
    },
    {
        code: "C5",
        result: "Malfunction of gas pipe thermistor for heat exchanger Defect of connector contact. Defect of gas pipe thermistor for heat exchanger.",
    },
    {
        code: "C6",
        result: "Malfunction of fan motor control driver Defect of fan motor sensor system Defect of fan motor control driver.",
    },
    {
        code: "C7",
        result: "Front panel driving motor fault Defect of front panel driving motor Defect of limit switch.",
    },
    {
        code: "C9",
        result: "Malfunction of suction air thermistor Defect of connector contact Defect of thermistor for suction air.",
    },
    {
        code: "CA",
        result: "Malfunction of discharge air thermistor Defect of connector contact. Defect of thermistor for discharge air.",
    },
    {
        code: "CC",
        result: "Malfunction of humidity sensor system Defect of connector contact Defect of humidity sensor.",
    },
    {
        code: "E0",
        result: "Protection devices actuated (unified) Protection device connected to outdoor PCB actuated Defect of protection device connector contact.",
    },
    {
        code: "E1",
        result: "Defect of outdoor unit PCB Malfunction due to noise Defect of outdoor unit PCB?.",
    },
    {
        code: "E3",
        result: "Actuation of high pressure switch (HPS) Dirty outdoor unit heat exchanger and suction filter Defect of HPS Clogged refrigerant piping Defect of connector contact.",
    },
    {
        code: "E3",
        result: "System No.1. Actuation of high pressure switch (HPS). Dirty outdoor unit heat exchanger Clogged refrigerant piping Defect of HPS Shortage of water volume Defect of connector contact Outdoor Unit.",
    },
    {
        code: "E4",
        result: "Actuation of low pressure switch (LPS) Clogged refrigerant piping Shortage of gas. Defect of connecting connector Defect of outdoor unit PCB.",
    },
    {
        code: "E5",
        result: "Overheat of inverter compressor motor Shortage of refrigerant amount Defect of connector contact Leakage of four way valve.",
    },
    {
        code: "E5",
        result: "Inverter compressor motor lock Inverter compressor lock Incorrect wiring.",
    },
    {
        code: "E6",
        result: "STD compressor motor overcurrent/lock Closed stop valve STD compressor lock.",
    },
    {
        code: "E6",
        result: "System No.1 Compressor overcurrent Defect of EXP. valve Defect of compressor Shortage of refrigerant amount.",
    },
    {
        code: "E7",
        result: "Malfunction of outdoor unit fan motor. Faulty contact of fan motor connector. Defect of fan motor, Defect of fan motor driver.",
    },
    {
        code: "E8",
        result: "Overcurrent of inverter compressor, Defect of compressor, Defect of outdoor unit PCB Defect of inverter main circuit capacitor Defect of power transistor.",
    },
    {
        code: "E9",
        result: "Malfunction of electronic expansion valve coil Defect of electronic expansion valve Defect of connector contact Defect of outdoor unit PCB.",
    },
    {
        code: "EA",
        result: "Malfunction of four way valve Defect of four way valve Defect of outdoor unit PCB Shortage of gas Defect of thermistor.",
    },
    {
        code: "EC",
        result: "Malfunction of entering water temperature Malfunction of cooling water temperature. Defect of thermistor. Defect of outdoor unit PCB.",
    },
    {
        code: "F3",
        result: "Malfunction of discharge pipe temperature Shortage of gas. Defect of connector contact. Clogged refrigerant piping Defect fo discharge pipe thermistor.",
    },
    {
        code: "F6",
        result: "Abnormal high pressure in cooling Defect of outdoor unit fan motor Defect of electronic expansion valve Defect of heat exchanger thermistor, Defect of outdoor unit PCB.",
    },
    {
        code: "F6",
        result: "Abnormal high pressure in cooling Defect of outdoor unit fan motor Defect of electronic expansion valve Defect of heat exchanger thermistor, Defect of outdoor unit PCB.",
    },
    {
        code: "F6",
        result: "Refrigerant overcharged Refrigerant overcharged Disconnection of heat exchanger thermistor Disconnection of outdoor air thermistor Disconnection of liquid pipe thermistor.",
    },
    {
        code: "H0",
        result: "Malfunction of sensor system of compressor, Harness is disconnected, or defective connection Defect of PCB.",
    },
    {
        code: "H1",
        result: "Malfunction of humidifier unit damper, Defect of limit switch Defect of damper.",
    },
    {
        code: "H3",
        result: "Malfunction of high pressure switch (HPS), Defect of high pressure switch. Broken wire. Defect of connector contact, Defect of outdoor unit PCB.",
    },
    {
        code: "H4",
        result: "Malfunction of low pressure switch (LPS), Defect of low pressure switch Broken wire. Defect of connector contact, Defect of outdoor unit PCB.",
    },
    {
        code: "H5",
        result: "Malfunction of compressor motor overload thermistor Defect of connector contact. Defect of compressor motor overload thermistor.",
    },
    {
        code: "H6",
        result: "Malfunction of position detection sensor, Faulty contact of compress or cable. Defect of compressor, Defect of outdoor unit PCB.",
    },
    {
        code: "H7",
        result: "Malfunction of outdoor fan motor signal Faulty contact of fan wiring Defect of fan motor driver Defect of fan motor.",
    },
    {
        code: "H8",
        result: "Malfunction of compressor input (CT) system Defect of power transistor. Defect of reactor. Faulty wiring of inverter system Defect of outdoor unit PCB.",
    },
    {
        code: "H9",
        result: "Malfunction of outdoor air thermistor. Defect of connector contact Defect of thermistor for outdoor air.",
    },
    {
        code: "HC",
        result: "Malfunction of (hot) water temperature thermistor Defect of connector contact Defect of outdoor unit PCB Defect of thermistor for water temperature.",
    },
    {
        code: "HF",
        result: "Alarm in thermal storage unit with ice Thermal storage group defective wiring Defect of setting Excess of thermal storage tank numbers.",
    },
    {
        code: "HJ",
        result: "Malfunction of thermal storage tank water level Low water level Defect of switch setting Water level detecting sensor failure Defect of connector contact Outdoor Unit.",
    },
    {
        code: "J1",
        result: "Malfunction of pressure sensor Defect of pressure sensor connector contact. Defect of pressure sensor. Defect of outdoor unit PCB.",
    },
    {
        code: "J2",
        result: "Malfunction of current sensor of compressor Defect of current sensor Defect of outdoor unit PCB Defect of compressor.",
    },
    {
        code: "J3",
        result: "Malfunction of discharge pipe thermistor. Defect of connector contact Defect of outdoor unit PCB Defect of discharge pipe thermistor.",
    },
    {
        code: "J4",
        result: "Malfunction of low pressure equivalent saturated temperature sensor system Defect of connector contact Defect of thermistor Defect of outdoor unit PCB (Multi-split, Super-multi ).",
    },
    {
        code: "J5",
        result: "Malfunction of suction pipe thermistor Defect of connector contact Defect of outdoor unit PCB Defect of suction pipe thermistor.",
    },
    {
        code: "J6",
        result: "Malfunction of heat exchanger thermistor Defect of connector contact Defect of outdoor unit PCB Defect of heat exchanger thermistor.",
    },
    {
        code: "J7",
        result: "Malfunction of liquid pipe thermistor (Refrigerant circuit and others) Defect of connector contact Defect of outdoor unit PCB Defect of liquid pipe thermistor.",
    },
    {
        code: "J8",
        result: "Malfunction of liquid pipe thermistor (Refrigerant circuit and others) Defect of connector contact Defect of outdoor unit PCB Defect of liquid pipe thermistor.",
    },
    {
        code: "J9",
        result: "Malfunction of gas pipe thermistor (Refrigerant circuit and others) Defect of connector contact Defect of outdoor unit PCB Defect of gas pipe thermistor.",
    },
    {
        code: "JA",
        result: "Malfunction of high pressure sensor Defect of connector contact Defect of outdoor unit PCB Defect of high pressure sensor.",
    },
    {
        code: "JC",
        result: "Malfunction of low pressure sensor Defect of connector contact Defect of outdoor unit PCB Defect of low pressure sensor.",
    },
    {
        code: "JE",
        result: "Malfunction of sub-tank thermistor Defect of connector contact Defect of outdoor unit PCB Defect of sub-tank thermistor.",
    },
    {
        code: "JF",
        result: "Malfunction of heating thermistor for heat exchanger Defect of connector contact Defect of outdoor unit PCB Defect of heat exchanger thermistor.",
    },
    {
        code: "JH",
        result: "Malfunction of oil temperature thermistor Defect of connector contact Defect of outdoor unit PCB Defect of oil temperature thermistor.",
    },
    {
        code: "L0",
        result: "Malfunction of inverter system Shortage of power supply capacity Defect of inverter PCB Defect of power transistor.",
    },
    {
        code: "L1",
        result: "Malfunction of inverter PCB Defect of compressor wiring Blown fuse Defect of outdoor unit fan motor Defect of inverter PCB.",
    },
    {
        code: "L3",
        result: "Electrical box temperature rise Fin temperature rise due to short-circuit Defect of power transistor Defect of outdoor unit fan Defect of outdoor unit PCB.",
    },
    {
        code: "L4",
        result: "Malfunction of inverter radiating fin temperature rise Fin temperature rise due to short-circuit Defect of fin thermistor.",
    },
    {
        code: "L5",
        result: "Malfunction of oil temperature thermistor Defect of connector contact Defect of outdoor unit PCB Defect of oil temperature thermistor.Inverter instantaneous overcurrent (DC) Closed stop valve Defect of compressor.",
    },
    {
        code: "L6",
        result: "Inverter instantaneous overcurrent (AC) Overcharge of refrigerant amount Defect of compressor Shortage of power supply capacity Defect of inverter unit.",
    },
    {
        code: "L8",
        result: "Overcurrent of inverter compressor Abnormal high pressure rise due to clogged refrigerant circuit and others Defect of compressor.",
    },
    {
        code: "L9",
        result: "Malfunction of inverter compressor startup Faulty of pressure equalization Defect of compressor wiring Defect of compressor.",
    },
    {
        code: "LA",
        result: "Malfunction of power transistor Defect of power transistor Defect of inverter PCB Defect of compressor.",
    },
    {
        code: "LC",
        result: "Malfunction of transmission between outdoor unit PCB and micro-computer Defect of grounding connection Defect of outdoor unit PCB Malfunction due to noise.",
    },
    {
        code: "LC",
        result: "Malfunction of transmission between control and inverter PCB Defect of connector contact Defect of inverter PCB Malfunction due to noise Defect of outdoor unit control PCB.",
    },
    {
        code: "P0",
        result: "Shortage of refrigerant amount (thermal storage unit) Shortage of refrigerant Clogged refrigerant piping Outdoor Unit.",
    },
    {
        code: "P1",
        result: "Power voltage imbalance, open phase Open phase Voltage imbalance between phases Faulty main circuit capacitor. Defect of wiring contact.",
    },
    {
        code: "P2",
        result: "Automatic refrigerant charge operation stop Closed stop valve. Closed valve of refrigerant tank.",
    },
    {
        code: "P3",
        result: "Malfunction of thermistor in electrical box Electrical box temperature rise (ambient temperature rise) Defect of fin thermistor, Defect of outdoor unit PCB.",
    },
    {
        code: "P4",
        result: "Malfunction of radiating fin temperature sensor Defect of radiating fin thermistor Defect of wiring contact Defect of outdoor unit PCB.",
    },
    {
        code: "P8",
        result: "Heat exchanger freezing protection during automatic refrigerant charging (Close the refrigerant cylinder. Start again from step 1.).",
    },
    {
        code: "P9",
        result: "Malfunction of fan motor (humidifier unit) Defect of fan motor Broken relay harness Defect of outdoor unit PCB Defect of connector contact.",
    },
    {
        code: "P9",
        result: "Automatic refrigerant charge operation completed.",
    },
    {
        code: "PA",
        result: "Broken wire of heater (humidifier unit) Defect of heater unit Defect of outdoor unit PCB Defect of thermistor.",
    },
    {
        code: "PA",
        result: "Empty refrigerant cylinder during automatic refrigerant charging\nRefrigerant cylinder of master unit is empty.",
    },
    {
        code: "PC",
        result: "Empty refrigerant cylinder during automatic refrigerant charging Refrigerant cylinder of slave unit 2 is empty.",
    },
    {
        code: "PE",
        result: "Automatic refrigerant charge operation nearly completed.",
    },
    {
        code: "PH",
        result: "Malfunction of temperature (humidifier unit) Defect of heater unit Defect of thermistor Defect of connector contact Defect of outdoor unit PCB.",
    },
    {
        code: "PH",
        result: "Empty refrigerant cylinder during automatic refrigerant charging Refrigerant cylinder of slave unit 1 is empty.",
    },
    {
        code: "PJ",
        result: "Malfunction of capacity setting (Outdoor unit PCB) Capacity setting adaptor is not installed Improper capacity setting adaptor Defect of outdoor unit PCB.",
    },
    {
        code: "PJ",
        result: "Improper combination between inverter and fan driver Mistake of inverter PCB Mistake of control PCB Mistake of inverter fan PCB System.",
    },
    {
        code: "U0",
        result: "Shortage of refrigerant Shortage of refrigerant Closed stop valve Clogged refrigerant piping.",
    },
    {
        code: "U1",
        result: "Reverse phase, open phase Reverse phase, open phase of power wiring Wrong wiring. Defect of outdoor unit PCB.",
    },
    {
        code: "U2",
        result: "Defect of power supply voltage or instantaneous power failure. Defect of power supply voltage Instantaneous power failure Defect of wiring contact.",
    },
    {
        code: "U3",
        result: "Check operation not executed. Check operation not executed.",
    },
    {
        code: "U3",
        result: "Malfunction of transmission Malfunction due to noise Defect of outdoor unit PCB Wrong wiring.",
    },
    {
        code: "U4",
        result: "Malfunction of transmission between indoor and outdoor unit Defect or indoor-outdoor transmission wiring Malfunction due to noise Defect of indoor unit PCB and outdoor unit PCB.",
    },
    {
        code: "U5",
        result: "Malfunction of transmission between indoor unit and remote controller Defect of remote controller wiring Defect of indoor unit PCB Malfunction due to noise Defect of remote controller main/sub setting.",
    },
    {
        code: "U6",
        result: "Malfunction of transmission between indoor units Faulty wiring Defect of indoor unit PCB Malfunction due to noise.",
    },
    {
        code: "U7",
        result: "Malfunction of transmission between main body micro-computer. INV micro-computer Harness disconnection/broken wire between PCB Defect of outdoor unit PCB",
    },
    {
        code: "U7",
        result: "Malfunction of transmission between outdoor units Defect of wiring between outdoor units Defect of outdoor unit switch setting Defect of wiring between outdoor thermal storage units.",
    },
    {
        code: "U8",
        result: "Malfunction of transmission between remote controllers Defect of remote controller main/sub setting Defect of remote controller wiring. Defect of remote controller PCB Others.",
    },
    {
        code: "77",
        result: "System No. 1 Malfunction of fan inter lock Defect of relay contact Broken wire.",
    },
    {
        code: "78",
        result: "System No. 2 Malfunction of fan inter lock Defect of relay contact Broken wire.",
    },
    {
        code: "7A",
        result: "System No. 2 Malfunction of current sensor of compressor Defect of current sensor. Defect of compressor Defect of outdoor unit PCB.",
    },
    {
        code: "7C",
        result: "System No. 2 Malfunction of pump inter lock Cooling water pump interlock actuated.",
    },
    {
        code: "80",
        result: "Malfunction of entering water temperature thermistor. Defect of connector contact. Defect of entering water temperature thermistor.",
    },
    {
        code: "81",
        result: "Malfunction of leaving water temperature thermistor Defect of connector contact Defect of leaving water temperature thermistor.",
    },
    {
        code: "82",
        result: "System No. 1 Malfunction of refrigerant thermistor Defect of connector contact Defect of refrigerant thermistor.",
    },
    {
        code: "83",
        result: "System No. 2 Malfunction of refrigerant thermistor Defect of connector contact Defect of refrigerant thermistor.",
    },
    {
        code: "84",
        result: "System No. 1 Malfunction of heat exchanger thermistor. Defect of connector contact. Defect of heat exchanger thermistor.",
    },
    {
        code: "85",
        result: "System No. 2. Malfunction of heat exchanger thermistor. Defect of connector contact. Defect of heat exchanger thermistor.",
    },
    {
        code: "86",
        result: "System No. 2. Malfunction of discharge pipe thermistor. Defect of connecting connector Defect of discharge pipe thermistor.",
    },
    {
        code: "88",
        result: "System No. 2. Malfunction of discharge pipe temperature. Shortage of gas. Defect of discharge pipe thermistor Defect of connector contact. Clogged refrigerant piping.",
    },
    {
        code: "89",
        result: "Malfunction of brazed-plate heat exchanger freezing Dirty heat exchanger. Shortage of refrigerant amount Defect of thermistor.",
    },
    {
        code: "8A",
        result: "System No. 2 Malfunction of leaving water temperature thermistor Defect of connector contact Defect of leaving water temperature thermistor.",
    },
    {
        code: "8E",
        result: "System System No. 1 Malfunction of suction pipe thermistor 1 for heating Defect of connector contact Defect of suction pipe thermistor.",
    },
    {
        code: "8A",
        result: "System No. 2 Malfunction of leaving water temperature thermistor Defect of connector contact Defect of leaving water temperature thermistor.",
    },
    {
        code: "8E",
        result: "System System No. 1 Malfunction of suction pipe thermistor 1 for heating Defect of connector contact Defect of suction pipe thermistor.",
    },
    {
        code: "8F",
        result: "System No. 1 Malfunction of suction pipe thermistor 2 for heating Defect of connector contact Defect of suction pipe thermistor.",
    },
    {
        code: "8H",
        result: "Abnormal high hot water temperature Three-way valve malfunction. Defect of thermistor Defect of water temperature setting.",
    },
    {
        code: "90",
        result: "Abnormal chilled water quantity, abnormal AXP. Shortage of water volume Disconnection of AXP.",
    },
    {
        code: "91",
        result: "System System No. 2 Malfunction of electronic expansion valve Defect of connector contact Defect of electronic expansion valve coil.",
    },
    {
        code: "92",
        result: "System System No. 2 Malfunction of suction pipe thermistor Defect of connector contact Defect of suction pipe thermistor.",
    },
    {
        code: "94",
        result: "Malfunction of transmission (between heat reclaim ventilation unit and fan unit) Defect of fan unit PCB Defect of connecting wire between (1) and (2).",
    },
    {
        code: "95",
        result: "System No. 1 Malfunction of inverter system Defect of fan inverter unit.",
    },
    {
        code: "96",
        result: "System No. 2 Malfunction of inverter system Defect of fan inverter unit.",
    },
    {
        code: "97",
        result: "Malfunction of thermal storage unit Defect of thermal storage unit.",
    },
    {
        code: "98",
        result: "Malfunction of thermal storage brine pump Actuation of thermal storage brine pump overcurrent (OC).",
    },
    {
        code: "99",
        result: "Malfunction of thermal storage brine tank Low water level of thermal storage brine tank System.",
    },
    {
        code: "U9",
        result: "Malfunction of transmission (other system) Defect of communication between other indoor unit and outdoor unit Other indoor unit electronic expansion valve failure.",
    },
    {
        code: "UA",
        result: "Defect of indoor/outdoor power supply Wrong model connections Wrong PCB connected Improper power supply Defect of PCB.",
    },
    {
        code: "UA",
        result: "Malfunction of field setting Malfunction of field setting by remote controller Defect of remote controller wiring Defective connection of optional device Defect of indoor unit PCB.",
    },
    {
        code: "UA",
        result: "Improper combination of indoor and outdoor units Excess of connected indoor units Malfunction of field setting Uncanceled service mode. Defect of outdoor unit PCB.",
    },
    {
        code: "UA",
        result: "Remote temperature setting wire disconnection Remote temperature setting wire disconnection Defect of connector contact.",
    },
    {
        code: "UC",
        result: "Malfunction of setting of centralized controller address. Address duplication of centralized controller.",
    },
    {
        code: "UE",
        result: "Malfunction of transmission between indoor unit and centralized controller Malfunction of wiring between indoor unit and centralized controller Defect of setting of group number Defect of indoor unit PCB.",
    },
    {
        code: "UF",
        result: "Wiring and piping mismatch Improper connection of transmission wiring between indoor-outdoor units and outdoor-outdoor units.",
    },
    {
        code: "UH",
        result: "Malfunction of system Improper connection of transmission wiring between indoor- outdoor units and outdoor-outdoor units Defect of indoor and outdoor unit PCB (RA: Mismatching indoor and outdoor units, Defect of voltage, Freeze protection in other indoor unit (k).",
    },
    {
        code: "UJ",
        result: "Malfunction of transmission (Accessory devices) Defect of accessory devices Faulty wiring.",
    },
    {
        code: "UF",
        result: "Wiring and piping mismatch Improper connection of transmission wiring between indoor-outdoor units and outdoor-outdoor units.",
    },
    {
        code: "UH",
        result: "Malfunction of system Improper connection of transmission wiring between indoor- outdoor units and outdoor-outdoor units Defect of indoor and outdoor unit PCB (RA: Mismatching indoor and outdoor units, Defect of voltage, Freeze protection in other indoor unit (k).",
    },
    {
        code: "UJ",
        result: "Malfunction of transmission (Accessory devices) Defect of accessory devices Faulty wiring.",
    },
    {
        code: "M1",
        result: "Malfunction of centralized remote controller PCB. Defect of centralized remote controller PCB.",
    },
    {
        code: "M8",
        result: "Malfunction of transmission between optional controllers for centralized control Other centralized control power disconnection Centralized control reset switch ON Defect of transmission wiring. Central remote controller address change.",
    },
    {
        code: "MA",
        result: "Improper combination of optional controllers for centralized control Improper combination of optional controllers for centralized control More than one master controller is connected Faulty setting of centralized control Defect of centralized control.",
    },
    {
        code: "MC",
        result: "Address duplication, improper setting Address duplication of central remote controller.",
    },
    {
        code: "60",
        result: "External protection device actuated Actuation of external protection device Defect of output signal wiring Defect of control PCB.",
    },
    {
        code: "64",
        result: "Malfunction of indoor air thermistor Defect of connecting connector Defect of thermistor for indoor air Defect of control PCB.",
    },
    {
        code: "65",
        result: "Malfunction of outdoor air thermistor Defect of connector contact Defect of control PCB Defect of outdoor air thermistor.",
    },
    {
        code: "6A",
        result: "Malfunction of damper system Defect of connector contact Defect of damper motor Defect of limit switch Defect of control PCB.",
    },
    {
        code: "70",
        result: "System No. 2 Compressor overload Shortage of refrigerant amount Defect of connector contact Leakage of four way valve.",
    },
    {
        code: "71",
        result: "System No. 2 Compressor overcurrent Shortage of refrigerant amount Short-circuit Defect of compressor.",
    },
    {
        code: "72",
        result: "System No. 2 Fan motor overcurrent Defect of fan motor connector contact Defect of fan motor Defect of PCB.",
    },
    {
        code: "73",
        result: "System No. 2 Malfunction of high pressure (HPS) actuated Dirty heat exchanger Clogged refrigerant piping Defect of HPS Shortage of water volume Defect of connector contact.",
    },
    {
        code: "74",
        result: "System No. 2 Malfunction of low pressure switch (LPS) Clogged refrigerant piping Shortage of gas. Defect of connector contact Defect of LPS.",
    },
    {
        code: "75",
        result: "System No. 2 Malfunction of low pressure sensor Defect of connector contact Defect of PCB Defect of low pressure sensor.",
    },
    {
        code: "76",
        result: "System No. 2 Malfunction of high pressure sensor Defect of connector contact Defect of PCB Defect of high pressure sensor.",
    },
];

const errorCodes: ErrorCode[] = rawErrorCodes.map((item, index) => ({
    ...item,
    id: `daikin-code-${index + 1}`,
}));

const ctaPositions = new Set([
    10, 20, 30, 40, 49, 59, 69, 79, 89, 99, 109, 119, 129, 139, 149, 159,
]);

export default function DaikinPage() {
    const [isSearchOpen, setIsSearchOpen] = useState(true);
    const [openAccordion, setOpenAccordion] = useState(true);

    const groupedCodes = useMemo(() => errorCodes, []);

    const scrollToCode = (id: string) => {
        const element = document.getElementById(id);

        if (!element) return;

        const headerOffset = 150;
        const elementTop = element.getBoundingClientRect().top + window.scrollY;

        window.scrollTo({
            top: Math.max(0, elementTop - headerOffset),
            behavior: "smooth",
        });

        // Do not add #id to the URL.
        window.history.replaceState(
            null,
            "",
            window.location.pathname + window.location.search
        );

        setIsSearchOpen(false);
        setOpenAccordion(false);
    };

    return (
        <main className="daikin-error-page relative min-h-screen overflow-hidden">
            <div className="pointer-events-none absolute inset-0 -z-50 blur-[50px] in-[.light]:hidden">
                <Image
                    src="/images/page-bg/search-code-bg.webp"
                    alt="Daikin"
                    fill
                    priority
                    className="object-cover object-center"
                />
            </div>

            <section className="relative flex h-140 items-center justify-center overflow-hidden md:h-90">
                <div className="absolute inset-0">
                    <Image
                        src="/images/page-bg/error-code-search-bg.webp"
                        alt="Daikin Error Code Search"
                        fill
                        priority
                        className="h-full w-full object-cover"
                    />
                    <div className="hero-overlay absolute inset-0" />
                </div>
                <h1 className="h1-title relative z-10 text-white">Daikin</h1>
            </section>

            <section className="py-10 lg:py-16">
                <div className="container">
                    <div className="sec-ttl mx-auto flex max-w-6xl flex-col gap-5 text-center lg:gap-8">
                        <h2 className="h2-title">Daikin Error code search</h2>
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
                                onClick={() =>
                                    setIsSearchOpen((value) => !value)
                                }
                                className={`dropbtn in-[.light]:border-primary hover:text-blue hover:border-blue flex w-full cursor-pointer items-center justify-between border border-white px-4 py-3 text-left text-lg font-semibold transition-all duration-300 lg:px-5 lg:py-4 ${isSearchOpen ? "rounded-tl-2xl rounded-tr-2xl rounded-br-none rounded-bl-none" : "rounded-2xl"}`}
                                aria-expanded={isSearchOpen}
                                aria-controls="daikin-code-dropdown"
                            >
                                Error code search
                                <ChevronIcon isOpen={isSearchOpen} />
                            </button>

                            <div
                                id="daikin-code-dropdown"
                                className={`code-dropdown dropdown-content ${isSearchOpen ? "open" : ""}`}
                            >
                                <div className="code-inner">
                                    <div className="code-item">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setOpenAccordion(
                                                    (value) => !value
                                                )
                                            }
                                            className={`code-header flex w-full items-center justify-between px-4 py-3 text-left transition-colors duration-300 ${openAccordion ? "text-blue bg-[#061f31] in-[.light]:bg-[#ececec]" : "bg-transparent"}`}
                                            aria-expanded={openAccordion}
                                        >
                                            <h3 className="h3title font-semibold">
                                                Daikin air conditioning error
                                                codes
                                            </h3>
                                            <PlusIcon isOpen={openAccordion} />
                                        </button>

                                        <AccordionContent
                                            isOpen={openAccordion}
                                            className={
                                                openAccordion
                                                    ? "bg-[#061f31] in-[.light]:bg-[#ececec]"
                                                    : "bg-transparent"
                                            }
                                        >
                                            <div className="flex flex-wrap gap-5 px-4">
                                                {groupedCodes.map((item) => (
                                                    <button
                                                        key={item.id}
                                                        type="button"
                                                        onClick={() =>
                                                            scrollToCode(
                                                                item.id
                                                            )
                                                        }
                                                        className="error-id hover:text-blue cursor-pointer text-left"
                                                    >
                                                        {item.code}
                                                    </button>
                                                ))}
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
                    <section className="desclaimer-block space-y-4">
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
                    </section>

                    <section className="caution-content mt-8 space-y-2">
                        <h2 className="text-2xl font-bold">Caution</h2>

                        <div className="space-y-2">
                            <p>
                                If molded case circuit breakers or earth leakage
                                circuit breakers have tripped, do not reset the
                                breaker immediately without first checking for
                                any problems with insulation of equipment.
                            </p>
                            <p>
                                Resetting breakers without a check of insulation
                                may cause damage to equipment.
                            </p>
                        </div>
                    </section>

                    <div className="result-wrap bg-testimonial rounded-2xl p-5 md:rounded-3xl md:p-10">
                        <h2 className="york-title mb-6 text-2xl font-bold lg:mb-8 lg:text-3xl">
                            Daikin air conditioning error codes
                        </h2>

                        <div className="code-results space-y-6 lg:space-y-8">
                            {groupedCodes.map((item, index) => (
                                <div key={item.id}>
                                    <div
                                        id={item.id}
                                        className="code-info scroll-mt-37.5"
                                    >
                                        <h3 className="text-xl font-medium lg:mb-2 lg:text-2xl">
                                            CODE: {item.code}
                                        </h3>

                                        <p className="fs-19">
                                            <strong>RESULT:</strong>&nbsp;
                                            {item.result}
                                        </p>
                                    </div>

                                    {ctaPositions.has(index + 1) && (
                                        <div className="mt-10 flex justify-center">
                                            <a
                                                href="/contact-us/"
                                                className="theme-btn"
                                            >
                                                Get a Free Quote
                                            </a>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
