import { caseStudies } from "./caseStudies";

/* =========================================
   TYPES
   ========================================= */

export type LocationId =
  | "home"
  | "projects"
  | "about"
  | "skills"
  | "experience"
  | "contact";

export type ProjectStatus = "In development" | "Prototype" | "Live";

export type PortfolioProject = {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  summary: string;
  businessProblem: string;
  solution: string;
  result: string;
  technologies: string[];
  image: string;
  images: string[];
  githubUrl: string | null;
  liveUrl: string | null;
  status: ProjectStatus;
  confidential: boolean;
  type: string[];
};

export type SkillGroup = {
  category: string;
  description: string;
  skills: string[];
};

export type LocationKind =
  | "spawn"
  | "project"
  | "about"
  | "skills"
  | "experience"
  | "contact";

export type PortfolioLocation = {
  id: LocationId | `project-${string}`;
  title: string;
  shortTitle: string;
  description: string;
  detail: string;
  position: [number, number];
  color: string;
  kind: LocationKind;
  locked?: boolean;
  skills?: SkillGroup[];
  projects?: PortfolioProject[];
};

/* =========================================
   PROJECT HELPERS
   ========================================= */

const PROJECT_ID_OVERRIDES: Record<string, string> = {
  "Indoor Navigation & Spatial Mapping Engine (NaviAtlas)": "naviatlas",

  "License Plate Recognition & Vehicle Identification System":
    "plate-recognition",

  "Construction Warehouse & Project Resource Management Platform (iBodegero)":
    "ibodegero",

  "Public Transit Operations & Passenger Information Platform (GoBus)": "gobus",

  "Global Location Intelligence & Lead Discovery Platform (SpotDeck)":
    "spotdeck",

  "Gamified Object-Oriented Programming Learning Platform (CodeVision)":
    "codevision",

  "Enterprise Spreadsheet Governance & Monitoring System":
    "spreadsheet-governance",

  "Enterprise Ad Operations Data Pipeline": "ad-operations",

  "Real-Time Crypto Market Data & Pricing System": "crypto-market-data",

  "Controlled SQL Execution & Reporting Desktop Platform": "sql-reporting",

  "Multi-Platform Ad Account Monitoring System": "ad-account-monitoring",

  "Identity Verification & Compliance KYC Platform (Face API Integration)":
    "kyc-platform",

  "Risk Intelligence & Abuse Detection API": "risk-intelligence",

  "Unified Email Aggregation & Workspace Client (NaviSync)": "navisync",

  "Distributed Link Intelligence & Management Platform (NaviLink)": "navilink",

  NaviTap: "navitap",

  "Risk Management Portal": "risk-portal",
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function getProjectStatus(
  result: string,
  liveUrl: string | null,
): ProjectStatus {
  if (
    /\b(in development|under development|still developing|currently developing|work in progress|ongoing)\b/i.test(
      result,
    )
  ) {
    return "In development";
  }

  if (liveUrl) {
    return "Live";
  }

  return "Prototype";
}

/* =========================================
   CONVERT CASE STUDIES TO PROJECTS
   ========================================= */

/**
 * Case studies are the single source of truth for project data.
 *
 * Confidential case studies are excluded from the public portfolio.
 * IDs are kept stable using explicit overrides where available.
 */
function createPublicCaseStudyProjects(): PortfolioProject[] {
  const usedIds = new Set<string>();

  return caseStudies
    .filter((study) => !study.confidential)
    .map((study) => {
      const baseId = PROJECT_ID_OVERRIDES[study.title] ?? slugify(study.title);

      let id = baseId;
      let suffix = 2;

      while (usedIds.has(id)) {
        id = `${baseId}-${suffix}`;
        suffix += 1;
      }

      usedIds.add(id);

      return {
        id,
        name: study.title,
        subtitle: study.subtitle,
        category: study.type.join(" / "),
        summary: study.result,
        businessProblem: study.problem,
        solution: study.solution,
        result: study.result,
        technologies: [...study.tech],
        image: study.images[0] ?? "",
        images: [...study.images],
        githubUrl: study.repo,
        liveUrl: study.live,
        status: getProjectStatus(study.result, study.live),
        confidential: study.confidential ?? false,
        type: [...study.type],
      };
    });
}

/* =========================================
   PUBLIC PROJECTS
   ========================================= */

const publicCaseStudyProjects = createPublicCaseStudyProjects();

export const projects: PortfolioProject[] = [...publicCaseStudyProjects];

export const publicProjects = projects;

/* =========================================
   SKILLS
   ========================================= */

export const skillGroups: SkillGroup[] = [
  {
    category: "Backend Engineering",
    description: "APIs, application structure, and server-side development.",
    skills: [
      "Python",
      "FastAPI",
      "REST APIs",
      "SQLAlchemy",
      "Alembic",
      "N-tier Architecture",
      "JWT Authentication",
    ],
  },
  {
    category: "Databases",
    description: "Relational data modeling and persistence.",
    skills: ["PostgreSQL", "SQL", "Supabase", "Database Migrations"],
  },
  {
    category: "Frontend Development",
    description: "Modern web interfaces and data-driven applications.",
    skills: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "TanStack Query",
      "TanStack Router",
    ],
  },
  {
    category: "Automation & Integration",
    description: "Connecting services and streamlining repetitive tasks.",
    skills: [
      "Python Automation",
      "API Integration",
      "Data Processing",
      "Workflow Automation",
    ],
  },
  {
    category: "Mobile & Spatial",
    description: "Mobile experiences and interactive navigation concepts.",
    skills: ["React Native", "Expo", "SVG Maps", "Interactive Navigation"],
  },
  {
    category: "AI Exploration",
    description: "Exploring AI-assisted applications and integrations.",
    skills: ["AI APIs", "AI Integrations", "Knowledge-Based Assistants"],
  },
];

/* =========================================
   MAIN WORLD LOCATIONS
   ========================================= */

export const locations: PortfolioLocation[] = [
  {
    id: "home",
    title: "Home",
    shortTitle: "Home",
    description: "Building software, automation, and AI-powered tools.",
    detail:
      "Hi, I'm JP. I'm a software engineer focused on backend development, automation, and building practical applications. I enjoy understanding how systems work, solving real problems, and turning ideas into working software.\n\nExplore my projects, technical skills, and development journey.",
    position: [-3, 2],
    color: "#19f58a",
    kind: "spawn",
  },
  {
    id: "projects",
    title: "Projects & Case Studies",
    shortTitle: "Projects",
    description:
      "Real problems, practical solutions, and software in progress.",
    detail:
      "Explore the public case studies, the problems they address, their solutions, technologies, and results.",
    projects,
    position: [-1, -1],
    color: "#19f58a",
    kind: "project",
  },
  {
    id: "about",
    title: "About Me",
    shortTitle: "About Me",
    description: "A software engineer who enjoys building and learning.",
    detail:
      "I'm JP, a software engineer with a practical, project-driven approach to learning and development.\n\nMy work focuses on backend systems, Python automation, API development, database integration, and web and mobile applications. I enjoy breaking complex problems into manageable components and improving software structure, reliability, and maintainability.\n\nI'm also exploring AI systems that can work with my own knowledge sources and become more useful over time.",
    position: [2, -2],
    color: "#a4ffce",
    kind: "about",
  },
  {
    id: "skills",
    title: "Technical Skills",
    shortTitle: "Skills",
    description: "My development toolkit, organized by engineering discipline.",
    detail:
      "Explore my technical skills by category, from backend engineering and databases to frontend development and automation.",
    skills: skillGroups,
    position: [1, 1],
    color: "#19f58a",
    kind: "skills",
  },

  {
    id: "experience",
    title: "Professional Experience",
    shortTitle: "Experience",
    description:
      "From college freelancing to professional software engineering.",
    detail: [
      "A career built through continuous learning, freelance projects, and professional experience in software development, data analysis, and automation.",

      "Freelance Full-Stack Developer | Part-time · Remote | First Year of College – Present",
      "Started freelancing during my first year of college, accepting client projects, thesis systems, and capstone applications. Progressed into developing web applications, backend APIs, database integrations, and custom software solutions.",

      "Data Analyst — Automation & Software Development | Aurora Holdings | August 2024 – Present",
      "Started in data analytics with a focus on automation. Expanded into building internal web applications, backend services, APIs, and database-driven tools to improve business workflows and operational efficiency.",

      "Frontend Developer | Sofreg Solutions | November 2025 – April 2026",
      "Developed and managed client websites and the company website, focusing on responsive user interfaces, website maintenance, and frontend improvements.",
    ].join("\n\n"),
    position: [3, 1],
    color: "#a4ffce",
    kind: "experience",
  },

  {
    id: "contact",
    title: "Contact Me",
    shortTitle: "Contact",
    description: "Have a project, collaboration, or software opportunity?",
    detail:
      "I'm open to discussing software projects, automation opportunities, and ideas for useful applications.\n\nUse the contact links on this portfolio to reach me. Add your verified professional email, GitHub profile, LinkedIn profile, and résumé link before publishing.",
    position: [0, 4],
    color: "#19f58a",
    kind: "contact",
  },
];

/* =========================================
   STORY MESSAGES
   ========================================= */

export const storyMessages: Record<LocationId, string> = {
  home:
    "I'm JP, a software engineer focused on backend development, automation, and building practical software solutions.",

  projects:
    "Explore my projects, the problems they solve, and the technologies behind each solution.",

  about:
    "I'm a software engineer passionate about problem-solving, system design, and continuous learning.",

  skills:
    "Explore my technical skills in backend engineering, frontend development, databases, automation, and AI.",

  experience:
    "My experience spans freelance development, frontend engineering, data analytics, and business automation.",

  contact:
    "Have a project or opportunity in mind? Let's connect and build something useful together.",
};

/* =========================================
   AUTOMATIC PROJECT ISLANDS
   ========================================= */

export type ProjectLocationConfig = {
  id: `project-${string}`;
  projectId: string;
  title: string;
  shortTitle: string;
  description: string;
  position: [number, number];
  color: string;
  locked?: boolean;
};

export type AdditionalProjectLocation = Omit<PortfolioLocation, "id"> & {
  id: `project-${string}`;
  status: ProjectStatus;
};

const ISLAND_COLORS = [
  "#19f58a",
  "#a4ffce",
  "#7dd3fc",
  "#c4b5fd",
  "#f9a8d4",
  "#fcd34d",
];

const ISLAND_RADIUS_X = 10;
const ISLAND_RADIUS_Z = 8;
const ISLAND_START_ANGLE = -Math.PI / 2;

/**
 * Spread the islands around the central world.
 * Every public project gets a stable position based on its array index.
 */
function getIslandPosition(index: number, total: number): [number, number] {
  const angle = ISLAND_START_ANGLE + (index / Math.max(total, 1)) * Math.PI * 2;

  return [
    Number((Math.cos(angle) * ISLAND_RADIUS_X).toFixed(2)),
    Number((Math.sin(angle) * ISLAND_RADIUS_Z).toFixed(2)),
  ];
}

/* Generate island configuration directly from public projects. */

export const projectLocationConfigs: ProjectLocationConfig[] = projects.map(
  (project, index) => ({
    id: `project-${slugify(project.id)}`,
    projectId: project.id,
    title: project.name,
    shortTitle: project.subtitle,
    description: project.summary,
    position: getIslandPosition(index, projects.length),
    color: ISLAND_COLORS[index % ISLAND_COLORS.length],
    locked: false,
  }),
);

/* Generate the actual map locations from the configuration. */

export const additionalProjectLocations: AdditionalProjectLocation[] =
  projectLocationConfigs.flatMap((config) => {
    const project = projects.find((item) => item.id === config.projectId);

    if (!project) return [];

    return [
      {
        id: config.id,
        title: config.title,
        shortTitle: config.shortTitle,
        description: config.description,
        detail: [
          project.businessProblem,
          project.solution,
          project.result,
        ].join("\n\n"),
        position: config.position,
        color: config.color,
        kind: "project",
        locked: config.locked ?? false,
        projects: [project],
        status: project.status,
      },
    ];
  });

/* Combined collection for map renderers that need every location. */

export type WorldLocation = PortfolioLocation | AdditionalProjectLocation;

export const allWorldLocations: WorldLocation[] = [
  ...locations,
  ...additionalProjectLocations,
];
