import { Product, Service } from "./types";

export const CUSTOM_THEME = {
  primary: "#FFFFFF",
  secondary: "#F3F4F6",
  text: "#111111",
  accent: "#6B7280",
  success: "#22C55E",
};

export const HERO_BACKGROUNDS = [
  "https://easternallianceautomation.in/wp-content/uploads/2025/11/Untitled-design-5-scaled.jpg",
  "https://easternallianceautomation.in/wp-content/uploads/2025/11/Untitled-design-3-scaled.jpg",
  "https://easternallianceautomation.in/wp-content/uploads/2025/11/Untitled-design-4-scaled.jpg",
  "https://easternallianceautomation.in/wp-content/uploads/2025/11/Untitled-design-2-scaled.jpg",
  "https://easternallianceautomation.in/wp-content/uploads/2025/11/Untitled-design-1-scaled.jpg",
  "https://easternallianceautomation.in/wp-content/uploads/2025/11/Untitled-design-scaled.jpg",
];

export const GENERAL_STATS = [
  { value: "2022", label: "Established" },
  { value: "100+", label: "Projects Completed" },
  { value: "6+", label: "Global Brand Partners" },
  { value: "24/7", label: "Engineering Support" },
];

export const PARTNER_BRANDS = [
  { name: "Siemens", logo: "https://res.cloudinary.com/doetkvre5/image/upload/v1781505342/Download_the_Food_Industry_Executive_Media_Kit_-_Food_Industry_Executive_News_v6rj0p.jpg", desc: "Digital Enterprise Integrations" },
  { name: "ABB", logo: "https://res.cloudinary.com/doetkvre5/image/upload/v1781505495/ABB_MCB_6KA_1P_16A_SH_201_C16_MINIATURE_CIRCUIT_BREAKER_1P_16A_2CDS211001R0164_ytx6wa.jpg", desc: "Electrification & Motion Solutions" },
  { name: "Parker", logo: "https://res.cloudinary.com/doetkvre5/image/upload/v1781505561/Parker_Hannifin___Evolve_Tradings_Pvt_Ltd___RRK_Digiverse_uhh6a5.jpg", desc: "Motion & Control Technologies" },
  { name: "Danfoss", logo: "https://res.cloudinary.com/doetkvre5/image/upload/v1781505611/Danfoss_ze3non.jpg", desc: "Power Electronics & VFD Drives" },
  { name: "Schneider Electric", logo: "https://res.cloudinary.com/doetkvre5/image/upload/v1781505668/download_2_qqrgfl.jpg", desc: "Energy Management Specialist" },
  { name: "Control Techniques", logo: "https://easternallianceautomation.in/wp-content/uploads/2025/10/Screenshot-2025-10-29-104413.png", desc: "Expert AC & DC Drives" },
];

export const TRUST_BADGES = [
  { title: "High Quality", text: "LOW VOLTAGE TO HIGH VOLTAGE  dielectric safety testing. Strict quality control protocols." },
  { title: "Precision Engineering", text: "Thermal analysis-driven layouts, copper busbar sizing, and IP55 ratings compliance." },
  { title: "Global Standards", text: "Aligned with IEC 61439 standards for low-voltage switchgear assemblies." },
  { title: "24×7 Support", text: "Emergency electrical engineering consultation & fast replacement parts dispatch." },
];

export const INDUSTRIES_SERVED = [
  { name: "Steel Industry", icon: "Flame", desc: "High-power DC drive cabinets and MCC setups for heavy rolling mill stands." },
  { name: "Packaging", icon: "Boxes", desc: "Multi-axis servo automation synchronized over high-bandwidth EtherCAT." },
  { name: "Printing", icon: "Printer", desc: "High-accuracy registering controls and web-tension feedback loops." },
  { name: "Wire & Cable", icon: "Cable", desc: "Dual capstan spooler controllers, rewinder control cabinets, and AC VFD integrations." },
  { name: "Manufacturing", icon: "Factory", desc: "General factory automation, sensor nets, pneumatic panels, and SCADA centers." },
  { name: "Power Plants", icon: "Zap", desc: "Heavy-duty intelligent electrical distribution panel boards and backup systems." },
  { name: "Process Industries", icon: "Pipette", desc: "Batch chemical dosing processes, automated valves, and PLC remote linkups." },
];

export const PRODUCTS_CATALOG: Product[] = [
  {
    id: "ac-drive-panel",
    title: "AC DRIVE PANEL UPTO 1000 KW",
    shortDesc: "High power, grid-optimized Variable Frequency Drive (VFD) panels designed for extreme industrial demands.",
    image: "https://easternallianceautomation.in/wp-content/uploads/2025/10/6-6kv-1000kw-medium-voltage-vfd09088796289.webp",
    category: "drive",
    features: [
      "Compatible with major brands including Siemens SINAMICS, ABB ACS series, and Danfoss VLT.",
      "Forced ventilation cooling systems with internal thermistors and dual-chamber containment.",
      "Built-in active harmonic filtration and dynamic regenerative braking modules.",
      "Comprehensive IP54 / IP55 powder-coated heavy-duty sheets.",
    ],
    applications: [
      "Intake and exhaust ventilation systems in heavy chemical facilities.",
      "High-volume pumps and pipelines.",
      "Heavy industrial extruders and conveyor belts.",
      "Cement mill induction motor controllers.",
    ],
    specifications: {
      "Power Rating": "Upto 1000 kW (1340 HP)",
      "Supply Voltage": "380V to 690V, 3-Phase, 50/60Hz",
      "Control Topology": "Sensorless Vector Control (SVC), Closed-Loop Vector Control",
      "IP Protection Level": "IP54 / IP55 standard (IP65 optional)",
      "Communication Bus": "PROFIBUS-DP, PROFINET, Modbus TCP/RTU, EtherCAT",
      "Harmonic Distortion": "IEEE 519 compliant (<5% THD with active filtering)",
    },
    industriesServed: ["Steel Industry", "Manufacturing", "Power Plants", "Wire & Cable"],
    benefits: [
      "Saves up to 45% power utilization compared to direct-on-line drives.",
      "Drastically reduces mechanical stress on motor shafts and bearings via smooth ramp starts.",
      "Complete motor protective mapping (short-circuit, overcurrent, thermal overload, phase loss).",
    ],
  },
  {
    id: "dc-drive-panel",
    title: "DC DRIVE PANEL UPTO 4000 AMP",
    shortDesc: "Robust thyristor-based DC drive systems offering high-torque capabilities for heavy metallurgy and manufacturing drives.",
    image: "https://easternallianceautomation.in/wp-content/uploads/2025/10/dc-drive-panel-500x500-1.webp",
    category: "drive",
    features: [
      "Digital microprocessor control for 4-quadrant regenerative operation.",
      "Air-cooled or liquid-cooled premium thyristor power bridges.",
      "Integrated high-speed semiconductor fuses for transient surge prevention.",
      "Double insulated copper busbars with high short-circuit withstand rating.",
    ],
    applications: [
      "Steel rolling mills and blast furnace charging systems.",
      "High-power drawing machines in cable fabrication.",
      "Paper mill central calenders and winders.",
      "Heavy rubber mixers and calenders.",
    ],
    specifications: {
      "Current Rating": "Up to 4000 Amperes continuous",
      "Armature Voltage": "Up to 1000V DC",
      "Field Current": "Up to 150A digital field regulator",
      "Cooling Type": "Forced air cooling with dynamic fan failure interlocks",
      "Enclosure Format": "Rittal TS8 equivalent modular design",
      "Overload Capacity": "150% load rating for 60 seconds",
    },
    industriesServed: ["Steel Industry", "Wire & Cable", "Manufacturing"],
    benefits: [
      "Delivers absolute 100% full torque starting at zero rotational speed.",
      "Regenerative feed capability recovers decelerating energy back to standard supply lines.",
      "Ultra-stable speed regulations down to 0.01% using digital encoder feedback loops.",
    ],
  },
  {
    id: "mcc-pcc-panel",
    title: "MCC & PCC PANEL",
    shortDesc: "Intelligent Motor Control Centers and Power Control Centers delivering centralized power distribution and safety.",
    image: "https://easternallianceautomation.in/wp-content/uploads/2025/10/MCC-PCC-and-AC-DC-DISTRIBUTION-PANELS-2-1.webp",
    category: "panel",
    features: [
      "Fully modular drawer draw-out compartments with safety interlocking handles.",
      "Inter-chamber segregation conforming to international IEC 61439 Form 4b configurations.",
      "Intelligent network breakers with digital thermography points and communication feeds.",
      "Spacious vertical and horizontal cable runs with secure front/rear entry panels.",
    ],
    applications: [
      "Central electrical control rooms in large utility and heavy industrial installations.",
      "Water treatment plants with high density pump requirements.",
      "Automated continuous-operation assembly lines.",
      "Food and beverage factories.",
    ],
    specifications: {
      "Operating Voltage": "415V / 690V AC",
      "Symmetrical Fault Level": "50kA for 1 second / 65kA on request",
      "Busbar Material": "Grade 99.9% Electrolytic Copper (E91E) / high-conductivity Aluminum",
      "Segregation Form": "Form 3b / Form 4a / Form 4b",
      "Relay Protections": "Intelligent Motor Protection Relays (IMPR) with network bus integration",
    },
    industriesServed: ["Steel Industry", "Manufacturing", "Power Plants", "Process Industries"],
    benefits: [
      "Enables hot-swapping module units during operation without shutting down the plant.",
      "Reduces installation footprints by combining power distribution and motor starters.",
      "Comprehensive diagnostic reporting allows preemptive maintenance planning.",
    ],
  },
  {
    id: "distribution-panel",
    title: "DISTRIBUTION PANEL",
    shortDesc: "Heavy industry electrical boards optimized for smart power separation, circuit protection, and energy monitoring.",
    image: "https://easternallianceautomation.in/wp-content/uploads/2025/10/industrial-distribution-panels-500x500-1.webp",
    category: "panel",
    features: [
      "Equipped with world-class breakers (Siemens, ABB, or Schneider Electric).",
      "Digital multifunction energy meters displaying active, reactive power, and harmonic ranges.",
      "Built-in overvoltage, undervoltage, and transient voltage surge suppressors (SPD Type 1+2).",
      "Clear laser-etched safety warning labels and systematic cable marking tags.",
    ],
    applications: [
      "Industrial buildings and manufacturing plants.",
      "Data centers and testing laboratories.",
      "HVAC central distribution grids.",
      "Steel processing utility segments.",
    ],
    specifications: {
      "Rated Current": "100A up to 3200A",
      "Short Circuit Capacity": "36kA to 50kA",
      "Earthing Layout": "Dual copper earth busbars included",
      "Gland Plates": "Removable non-magnetic plates (prevents eddy currents)",
      "Metering": "RS485 Modbus dynamic power analyzers",
    },
    industriesServed: ["Power Plants", "Manufacturing", "Process Industries"],
    benefits: [
      "Ensures continuous operation by isolating downstream electrical fault zones selectively.",
      "Understands real-time load distribution, preventing sub-circuit overloads and phase imbalances.",
      "IP54 powder-coated steel enclosures ensure safety in dusty industrial settings.",
    ],
  },
  {
    id: "servo-stabilizer",
    title: "SERVO VOLTAGE STABILIZER",
    shortDesc: "High-accuracy servo-controlled voltage stabilizers that protect expensive CNC and automation machines from voltage swings.",
    image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458319/WhatsApp_Image_2026-06-14_at_10.17.19_PM_2_zuno0b.jpg",
    category: "stabilizer",
    features: [
      "Buck-boost toroidal variac transformers with heavy-gauge winding wires.",
      "Solid-state digital microcontroller boards driving rapid DC servo engines.",
      "Over-voltage and under-voltage audio alarm networks.",
      "Manual and auto bypass mechanism to guarantee continuous run power.",
    ],
    applications: [
      "High-precision computerized CNC machining workshops.",
      "Analytical medical facilities and laboratory testing booths.",
      "Main power entrance for packaging plants.",
      "Sensitive industrial research campuses.",
    ],
    specifications: {
      "Capacity Range": "5 kVA up to 1000 kVA (Single and Three-Phase)",
      "Input Window": "300V - 460V / 340V - 480V Three-Phase AC",
      "Output Accuracy": "±1.0% (precise active compensation)",
      "Response Time": "Fewer than 10 milliseconds",
      "Efficiency": "Greater than 98% on peak load",
    },
    industriesServed: ["Packaging", "Printing", "Manufacturing"],
    benefits: [
      "Prolongs the working life of high-value tools and drives by eliminating voltage spikes.",
      "Avoids costly production halts due to regional grid voltage drops and dropouts.",
      "Maintains system efficiency and reduces high inductive heat load in electric motors.",
    ],
  },
  {
    id: "services-repairing",
    title: "SERVICES & REPAIRING",
    shortDesc: "VFD repairing, AC/DC drive troubleshooting, diagnostic repairs, and mechanical control recalibrations.",
    image: "https://easternallianceautomation.in/wp-content/uploads/2025/11/WhatsApp_Image_2025-11-01_at_5.57.28_PM__1_-removebg-preview.png",
    category: "service",
    features: [
      "In-house testing facility equipped with isolated scope analyzers and variable load rigs.",
      "Multi-brand proficiency including Parker SSD, Siemens, Danfoss, Schneider, and ABB.",
      "Preventative maintenance service agreements (component-level card testing, capacitor swap-outs).",
      "On-site diagnostic teams with quick tools for on-field troubleshooting.",
    ],
    applications: [
      "Sudden breakdown of central VFD panels in production lines.",
      "Obsolete thyristor card repair and parameter reconstruction.",
      "Routine preventive checks of industrial automation systems.",
      "Harmonic testing and noise mitigation on plant networks.",
    ],
    specifications: {
      "Repair Turnaround": "Typical emergency response < 24 hours",
      "Warranty on Repairs": "Up to 6 months on replaced components",
      "Test Setup": "Full-load dynamic testing up to 75kW internally",
      "Engineers Available": "Highly trained automation electrical troubleshooting specialists",
    },
    industriesServed: ["Steel Industry", "Wire & Cable", "Printing", "Packaging", "Manufacturing"],
    benefits: [
      "Revives expensive drives and control blocks at a fraction of replacements cost.",
      "Minimizes downtime with fast-turnaround card repair and replacement inventories.",
      "Ensures peak operational reliability by replacing aged internal parts before they fail.",
    ],
  },
  {
    id: "engineering-tools",
    title: "ENGINEERING TOOLS & PRODUCTS",
    shortDesc: "Expert process control tools, industrial network gateways, and specialized software setup.",
    image: "https://easternallianceautomation.in/wp-content/uploads/2025/10/Screenshot-2025-10-29-112855.png",
    category: "service",
    features: [
      "Turnkey HMI software integrations and industrial fieldbus gateway configurations.",
      "OPC-UA network linkages and SCADA supervision systems.",
      "Calibrators and measuring tool kits for multi-brand drives.",
    ],
    applications: [
      "Connecting localized factories to dynamic cloud management dashboards.",
      "Precision flow, rate, temperature, and pressure logging loops.",
      "Central SCADA setups for process plants.",
    ],
    specifications: {
      "Supported Formats": "OPC DA/UA, MQTT, EtherNet/IP, PROFINET, BACnet",
      "Developer Tools": "TIA Portal, RSLogix, Codesys, COPA-DATA zenon",
      "Hardware Grade": "Rugged, fanless, DIN-rail mount chassis",
    },
    industriesServed: ["Process Industries", "Manufacturing", "Power Plants"],
    benefits: [
      "Fuses disassociated device pools into a single accessible supervisory system.",
      "Real-time diagnostic analytics prevent catastrophic failures.",
      "Facilitates digital compliance reporting in processing sectors.",
    ],
  },
  {
    id: "spares",
    title: "SPARES",
    shortDesc: "Fast-availability stock of industrial electrical spares: air circuit breakers, contactors, fuses, semiconductor thyristor blocks.",
    image: "https://easternallianceautomation.in/wp-content/uploads/2025/11/WhatsApp-Image-2025-11-28-at-4.35.25-PM.jpeg",
    category: "spares",
    features: [
      "100% genuine parts sourced strictly from trusted global suppliers.",
      "Immediate shipping for emergency breakdown scenarios.",
      "Comprehensive warranty support on all spare shipments.",
    ],
    applications: [
      "Replacing damaged AC/DC drive IGBTs and thyristor power cards.",
      "Replacing worn contactor coils, overload relays, and busbar holders.",
      "Retrofitting outdated breaker units.",
    ],
    specifications: {
      "Availability": "Ex-stock Ghaziabad warehouse for leading SKUs",
      "Brands Stocked": "Siemens, ABB, Schneider, Semikron, Bussmann, L&T",
      "Components": "IGBTs, Thyristors, High-speed Fuses, Contactors, MPCB, SMPS",
    },
    industriesServed: ["Steel Industry", "Packaging", "Printing", "Wire & Cable", "Power Plants"],
    benefits: [
      "Reduces production downtime by ensuring critical spares arrive quickly.",
      "Maintains native system design parameters with authentic parts.",
      "Offers competitive wholesale pricing directly to the factory floor.",
    ],
  },
  {
    id: "plc-custom-panel",
    title: "PLC & CUSTOMISED CONTROL PANEL",
    shortDesc: "Made-to-order automation system panels, combining programmable controllers (PLC) and customised software.",
    image: "https://easternallianceautomation.in/wp-content/uploads/2025/11/WhatsApp-Image-2025-11-28-at-4.44.24-PM.jpeg",
    category: "panel",
    features: [
      "Customised PLC panel engineering featuring Siemens S7-1200 / S7-1500, Allen-Bradley ControlLogix, or Schneider Modicon.",
      "Professional wire routing using insulated cable trays.",
      "Complete functional pre-commissioning testing before leaving our Ghaziabad facility.",
      "Includes comprehensive AutoCAD electrical dwg prints and detailed I/O schedules.",
    ],
    applications: [
      "Fully integrated assembly line machinery sequences.",
      "High-complexity packaging system synchronizations.",
      "Multi-stage metal treatment automation.",
      "Supervisory plant equipment controllers.",
    ],
    specifications: {
      "Project Complexity": "Tailored to high-reliability industrial component specifications",
      "PLC Architectures": "Single central rack / decentralized remote I/O layout",
      "HMI / Display Panels": "4-inch to 22-inch high-definition touch panels",
      "Software standard": "IEC 61131-3 (Structured Text, Ladder, Function Block)",
      "Safety Standards": "Safety SIL2 / SIL3 setups, safety relays & emergency systems",
    },
    industriesServed: ["Steel Industry", "Packaging", "Printing", "Wire & Cable", "Manufacturing", "Process Industries"],
    benefits: [
      "Translates complex machinery actions into smooth and reliable automated operations.",
      "High-quality design results in neat electrical cabinets that are easy to maintain.",
      "Intuitive HMI displays give operators absolute control and clear error diagnostics.",
    ],
  },
];

export const SERVICES_CATALOG: Service[] = [
  {
    id: "automation-solutions",
    title: "Automation Solutions",
    description: "Designing end-to-end industrial architecture, SCADA visualizations, automated networks, and plant telemetry.",
    icon: "Cpu",
    industriesServed: ["Manufacturing", "Steel Industry", "Process Industries"],
  },
  {
    id: "plc-programming",
    title: "PLC Programming",
    description: "Multi-brand PLC code architecture (Siemens, Rockwell, Danfoss) featuring clear structures and full diagnostic alarms.",
    icon: "Terminal",
    industriesServed: ["Packaging", "Printing", "Wire & Cable"],
  },
  {
    id: "custom-control-panels",
    title: "Customised Control Panels",
    description: "In-house design, wiring, laser etching, and type-testing of power and logic control panels (PCC, MCC, VFD, APFC).",
    icon: "Sliders",
    industriesServed: ["Steel Industry", "Power Plants", "Manufacturing"],
  },
  {
    id: "drive-commissioning",
    title: "Drive Commissioning",
    description: "On-site setup and synchronization of low-voltage and medium-voltage AC/DC drives for heavy starts and process regulation.",
    icon: "Workflow",
    industriesServed: ["Wire & Cable", "Steel Industry"],
  },
  {
    id: "installation",
    title: "Installation Work",
    description: "Turnkey electrical field cabling, conduit layout, cable trays, and main distribution box links on the factory floor.",
    icon: "Wrench",
    industriesServed: ["Manufacturing", "Power Plants"],
  },
  {
    id: "repair-maintenance",
    title: "Repair & Maintenance",
    description: "VFD repairing, component testing, on-site troubleshooting sweepers, and annual support contracts (AMC).",
    icon: "ShieldAlert",
    industriesServed: ["Steel Industry", "Wire & Cable", "Packaging", "Printing"],
  },
  {
    id: "engineering-consultancy",
    title: "Engineering Consultancy",
    description: "System speed audits, safety reviews, harmonic noise measuring, and customised technical specification drafts.",
    icon: "Activity",
    industriesServed: ["Manufacturing", "Process Industries"],
  },
  {
    id: "industrial-automation-upgrades",
    title: "Industrial Automation Upgrades",
    description: "Migrating outdated, high-maintenance legacy controllers and drives to current high-efficiency digital frameworks.",
    icon: "RefreshCw",
    industriesServed: ["Printing", "Steel Industry", "Wire & Cable"],
  },
];
