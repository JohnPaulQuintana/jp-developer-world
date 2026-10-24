
export interface CaseStudy {
  title: string;
  subtitle: string;
  type: string[];
  confidential?: boolean;
  problem: string;
  solution: string;
  result: string;
  tech: string[];
  images: string[];
  repo: string | null;
  live: string | null;
}

export const caseStudies: CaseStudy[] = [
  {
    confidential: false,
    type: ["Web Application"],
    title: "Indoor Navigation & Spatial Mapping Engine (NaviAtlas)",
    subtitle: "Indoor Navigation",
    problem:
      "There was no efficient system to test, simulate, and validate indoor SVG-based navigation maps for spatial layouts.",
    solution:
      "Built an indoor mapping and visualization engine that supports SVG-based spatial structures for testing navigation paths and layout validation.",
    result:
      "Accelerated prototyping and validation of indoor navigation systems for spatial applications.",
    tech: [
      "React",
      "SVG",
      "Spatial Mapping",
      "Visualization",
      "Express",
      "Astar Algorithm",
      "3D",
    ],
    images: ["/flow/5.png", "/flow/navi1.PNG", "/flow/6.png"],
    repo: null,
    live: "https://naviatlas.netlify.app/",
  },

  {
    type: ["Web Application"],
    title: "License Plate Recognition & Vehicle Identification System",
    subtitle: "Vehicle Recognition",
    problem:
      "Automotive service centers required a faster way to identify vehicles and retrieve customer records without manual plate number entry.",
    solution:
      "Developing an OCR-based license plate recognition system that captures vehicle plate numbers from camera feeds, extracts readable text, and converts the information into a structured format for integration with automotive service and customer management workflows.",
    result:
      "Currently in development. Initial prototypes successfully detect and extract plate numbers, laying the foundation for automated vehicle identification and service record retrieval.",
    tech: [
      "Python",
      "OCR",
      "Computer Vision",
      "OpenCV",
      "Image Processing",
      "REST API",
    ],
    images: ["/flow/p2.PNG", "/flow/p3.PNG", "/flow/p4.PNG", "/flow/p5.PNG"],
    repo: null,
    live: "https://plate-recognition.netlify.app/",
  },

  {
    type: ["Web Application"],
    title:
      "Construction Warehouse & Project Resource Management Platform (iBodegero)",
    subtitle: "Construction Management",
    confidential: false,
    problem:
      "Construction teams lacked a centralized system for managing warehouse inventory, monitoring shipments, and coordinating material requests across active projects. Inventory records, project allocations, and shipment tracking were handled through disconnected processes, reducing operational visibility and efficiency.",
    solution:
      "Developed a web-based warehouse and project resource management platform that enables administrators, warehouse personnel, and project managers to manage inventory, monitor inbound and outbound shipments, process material requests, track project allocations, and oversee warehouse operations through a centralized system. Implemented role-based access controls and email verification workflows to support secure user onboarding and account management.",
    result:
      "Improved inventory visibility across warehouses and construction projects, streamlined material request workflows, enhanced shipment tracking, and provided real-time oversight of resource allocation and warehouse operations.",
    tech: ["React", "Laravel", "MySQL"],
    images: ["/flow/i1.PNG", "/flow/i2.PNG", "/flow/i3.PNG", "/flow/i4.PNG"],
    repo: null,
    live: "https://cwms-app.netlify.app/",
  },

  {
    type: ["Web Application", "Android App"],
    title: "Public Transit Operations & Passenger Information Platform (GoBus)",
    subtitle: "Transit Management",
    problem:
      "Public transportation operators lacked a centralized system for managing fleets, monitoring active buses, tracking drivers, and providing real-time transit information to passengers. Commuters had limited visibility into bus locations, arrival times, occupancy status, and route progress.",
    solution:
      "Developed a multi-platform transit management system consisting of a web application for administrators and operators, along with React Native mobile applications for drivers and passengers. The platform enables fleet registration, driver management, bus stop administration, route monitoring, emergency incident reporting, and real-time vehicle tracking. Drivers are provided with route navigation and trip guidance, while passengers can view live bus locations, estimated arrival times, upcoming stops, occupancy levels, and seat availability. Integrated Arduino-based hardware components to support vehicle monitoring and passenger counting workflows.",
    result:
      "Improved operational visibility for transit operators, enhanced fleet monitoring capabilities, streamlined incident management, enabled real-time vehicle tracking, and delivered accurate transit information that improved the passenger commuting experience.",
    tech: [
      "React",
      "React Native",
      "Laravel",
      "MySQL",
      "Arduino",
      "Google Maps API",
    ],
    images: [
      "./flow/sb1.PNG",
      "./flow/sb2.PNG",
      "./flow/sb3.PNG",
      "./flow/sb4.jpg",
      "./flow/sb5.jpg",
      "./flow/sb6.jpg",
      "./flow/sb7.jpg",
    ],
    repo: null,
    live: "https://gobus-admin.netlify.app/",
  },

  {
    type: ["Web Application"],
    title: "Global Location Intelligence & Lead Discovery Platform (SpotDeck)",
    subtitle: "Lead Intelligence",
    problem:
      "Businesses and sales teams lacked an efficient way to discover, evaluate, and prioritize potential business opportunities across multiple regions and countries. Manually researching restaurants, retail stores, and other establishments at scale was time-consuming and provided limited insight into lead quality and market opportunities.",
    solution:
      "Developed a global location intelligence platform that aggregates business locations and points of interest from mapping services into a centralized workspace. The platform enables users to discover businesses worldwide, generate lead datasets, analyze business information, and rank opportunities using factors such as ratings, review volume, business category, location characteristics, and custom scoring criteria. Designed to support large-scale lead generation and market research workflows across multiple geographic regions.",
    result:
      "Accelerated global lead discovery, reduced manual market research efforts, improved opportunity qualification, and provided a data-driven approach for identifying high-value business prospects across international markets.",
    tech: ["React", "Node.js", "MySQL", "Google Maps API"],
    images: [
      "./flow/sp1.PNG",
      "./flow/sp2.PNG",
      "./flow/sp3.PNG",
      "./flow/sp4.PNG",
      "./flow/sp5.PNG",
    ],
    repo: null,
    live: "https://spotdeck.netlify.app/",
  },

  {
    type: ["Web Application"],
    title:
      "Gamified Object-Oriented Programming Learning Platform (CodeVision)",
    subtitle: "Gamified Learning",
    problem:
      "Many aspiring developers struggle to learn Object-Oriented Programming (OOP) concepts due to traditional learning methods that lack engagement, progression tracking, and motivation to continue learning.",
    solution:
      "Developing a gamified web-based learning platform focused on teaching Object-Oriented Programming concepts through interactive lessons, challenges, and progression systems. Inspired by creature-collection and adventure-style games, the platform transforms learning into a competitive journey where users gain experience, advance through learning paths, unlock achievements, and compete on leaderboards. Integrated Google account authentication to simplify onboarding and user access.",
    result:
      "Currently in development. The platform aims to increase learner engagement, improve OOP concept retention, and provide a structured progression system that motivates users through competition, achievements, and skill-based rankings.",
    tech: ["React", "Laravel", "MySQL", "Google OAuth"],
    images: [
      "./flow/c1.PNG",
      "./flow/c2.PNG",
      "./flow/c3.PNG",
      "./flow/c4.PNG",
      "./flow/c5.PNG",
    ],
    repo: null,
    live: "https://codevision-app.netlify.app/",
  },

  {
    type: ["Web Application", "Automation"],
    title: "Enterprise Spreadsheet Governance & Monitoring System",
    subtitle: "Spreadsheet Monitoring",
    confidential: true,
    problem:
      "Organizations relied on numerous operational spreadsheets for reporting and business processes, but team leads lacked visibility into which sheets were actively maintained, which were outdated, and who was responsible for updating them. This resulted in stale reports, delayed updates, and reduced confidence in business data.",
    solution:
      "Developed a centralized spreadsheet monitoring platform that scans registered online spreadsheets, tracks update activity, identifies stale or overdue sheets, and associates each spreadsheet with its designated owner. The system automatically evaluates spreadsheet freshness, generates monitoring reports, and integrates with Telegram to deliver real-time notifications and status summaries to team leads and stakeholders.",
    result:
      "Improved spreadsheet governance, increased accountability for report ownership, reduced the risk of outdated business data, and enabled team leads to proactively identify and address reporting gaps through automated monitoring and notifications.",
    tech: ["React", "Python", "Google Sheets API", "Telegram Bot API"],
    images: ["./flow/ss2.PNG", "./flow/ss1.PNG"],
    repo: null,
    live: null,
  },

  {
    type: ["Automation"],
    title: "Enterprise Ad Operations Data Pipeline",
    subtitle: "Marketing Automation",
    confidential: true,
    problem:
      "Advertising performance data was fragmented across multiple platforms, requiring manual extraction and consolidation into reporting sheets.",
    solution:
      "Designed and implemented an automated data pipeline that aggregates advertising metrics from multiple ad networks and synchronizes structured reporting data into centralized sheets.",
    result:
      "Standardized reporting workflow across marketing operations and eliminated manual data compilation.",
    tech: [
      "Playwright",
      "Python",
      "Web Scraping",
      "Google Sheets",
      "ETL Pipelines",
    ],
    images: ["/flow/1.png"],
    repo: null,
    live: null,
  },

  {
    type: ["Automation"],
    title: "Real-Time Crypto Market Data & Pricing System",
    subtitle: "Crypto Market Data",
    confidential: true,
    problem:
      "Business systems lacked a reliable mechanism to continuously track and normalize crypto market data for internal pricing and reporting.",
    solution:
      "Built a scheduled data ingestion system that collects market data from Binance, applies rate normalization logic, and updates internal backoffice systems on an hourly cadence.",
    result:
      "Enabled consistent real-time financial visibility across internal trading and reporting tools.",
    tech: ["Node.js", "APIs", "Cron Jobs", "Data Pipelines"],
    images: [
      "/flow/coin1.PNG",
      "/flow/coin2.PNG",
      "/flow/coin3.PNG",
      "/flow/2.png",
    ],
    repo: null,
    live: "https://coins-automation.netlify.app/",
  },

  {
    type: ["Desktop Application", "Automation"],
    title: "Controlled SQL Execution & Reporting Desktop Platform",
    subtitle: "SQL Reporting",
    confidential: true,
    problem:
      "Teams were directly accessing analytics infrastructure (Superset) and executing unmanaged SQL queries, creating operational risk and inconsistency.",
    solution:
      "Architected a desktop execution layer that integrates with Asana task workflows, allowing controlled SQL execution and generating standardized, downloadable reporting outputs without direct database access.",
    result:
      "Improved data governance, reduced query-level risk, and enforced controlled reporting workflows.",
    tech: ["Electron", "SQL", "Node.js"],
    images: ["/flow/3.png"],
    repo: null,
    live: null,
  },

  {
    type: ["Automation"],
    title: "Enterprise Spreadsheet Governance & Monitoring System",
    subtitle: "Spreadsheet Monitoring",
    confidential: true,
    problem:
      "Critical business spreadsheets lacked observability, resulting in outdated reports and delayed updates across teams.",
    solution:
      "Developed a centralized monitoring system that scans registered spreadsheets, evaluates update timestamps, and detects stale reporting states. Integrated alerting via Telegram for team leads.",
    result:
      "Improved data reliability across reporting operations and introduced proactive monitoring for business-critical spreadsheets.",
    tech: ["Node.js", "Schedulers", "Telegram API", "Monitoring"],
    images: ["/flow/4.png"],
    repo: null,
    live: null,
  },

  {
    confidential: true,
    type: ["Automation"],
    title: "Multi-Platform Ad Account Monitoring System",
    subtitle: "Ad Account Monitoring",
    problem:
      "Ad account balances across multiple platforms were tracked manually, increasing operational overhead and risk of oversight.",
    solution:
      "Built a centralized monitoring system that aggregates account balance data across advertising platforms and standardizes visibility into financial status.",
    result:
      "Reduced operational monitoring effort and improved financial oversight across ad operations.",
    tech: ["Node.js", "Automation", "Reporting", "Monitoring"],
    images: [],
    repo: null,
    live: null,
  },

  {
    type: ["Web Application"],
    confidential: true,
    title:
      "Identity Verification & Compliance KYC Platform (Face API Integration)",
    subtitle: "Identity Verification",
    problem:
      "User onboarding required manual identity verification, creating delays and inconsistent validation outcomes.",
    solution:
      "Engineered a KYC verification workflow using Face API for facial detection and matching, combined with camera-based ID capture, validation checks, and watermarking before submission to backoffice systems.",
    result:
      "Streamlined identity verification workflow and improved compliance processing efficiency.",
    tech: ["Face API", "Node.js", "Image Processing", "KYC", "Compliance"],
    images: [],
    repo: null,
    live: null,
  },

  {
    confidential: true,
    type: ["Backend Application"],
    title: "Risk Intelligence & Abuse Detection API",
    subtitle: "Risk Detection",
    problem:
      "Risk teams needed a scalable backend service to identify fraudulent activities such as multi-accounting, bonus abuse, and suspicious player behavior across multiple systems.",
    solution:
      "Designed and developed a centralized risk analysis API that ingests account, transaction, and behavioral data, applies rule-based detection logic, and generates risk signals for downstream enforcement workflows.",
    result:
      "Improved fraud detection coverage, streamlined risk investigations, and enabled faster identification of suspicious account activity.",
    tech: ["Python", "REST API", "Fraud Detection", "Rules Engine"],
    images: [],
    repo: null,
    live: null,
  },

  {
    type: ["Android Application"],
    title: "Unified Email Aggregation & Workspace Client (NaviSync)",
    subtitle: "Unified Email",
    problem:
      "Users managing multiple email accounts lacked a centralized interface for monitoring communications.",
    solution:
      "Built a unified read-only email aggregation client that connects multiple email providers into a single interface for consolidated viewing.",
    result:
      "Improved productivity by reducing context switching across email platforms.",
    tech: ["React", "Email APIs", "Express"],
    images: [],
    repo: null,
    live: null,
  },

  {
    type: ["Android Application"],
    title: "Distributed Link Intelligence & Management Platform (NaviLink)",
    subtitle: "Link Management",
    problem:
      "Important digital resources and links were scattered across multiple tools, chats, and notes.",
    solution:
      "Designed a link management system that enables categorization, storage, and controlled sharing of digital resources.",
    result:
      "Improved knowledge organization and enabled structured information sharing.",
    tech: ["React", "Laravel", "Knowledge Management", "Search"],
    images: [],
    repo: null,
    live: null,
  },

  {
    type: ["Business Tools", "Web Application"],
    title: "NaviTap",
    subtitle: "Business Reviews",
    confidential: false,
    problem:
      "Customers may not leave reviews when finding the correct review page requires too many steps.",
    solution:
      "Designed a tap-or-scan experience that directs customers to a business's Google review page using QR codes first, with NFC support and opportunities to expand into business management and analytics.",
    result:
      "A business review stand concept designed to simplify customer feedback and support future business analytics.",
    tech: [
      "QR Codes",
      "NFC",
      "FastAPI",
      "PostgreSQL",
      "SQLAlchemy",
      "API Integration",
    ],
    images: ["/images/projects/navitap.png"],
    repo: null,
    live: null,
  },

  {
    type: ["Business Systems", "Backend Engineering"],
    title: "Risk Management Portal",
    subtitle: "Risk Management",
    confidential: false,
    problem:
      "Risk-related workflows need a structured way to organize project access, user permissions, and risk-monitoring activities.",
    solution:
      "Developed a multi-project application with a FastAPI backend, a TypeScript frontend, JWT authentication, and role-based project access.",
    result:
      "An ongoing enterprise application for structured risk workflows, project access control, and monitoring.",
    tech: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "SQLAlchemy",
      "React",
      "TypeScript",
    ],
    images: ["/images/projects/risk-portal.png"],
    repo: null,
    live: null,
  },
];
