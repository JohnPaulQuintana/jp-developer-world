
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

  "Public Transit Operations & Passenger Information Platform (GoBus)":
    "gobus",

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
      const baseId =
        PROJECT_ID_OVERRIDES[study.title] ?? slugify(study.title);

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
    title: "Developer Spawn Point",
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
    title: "Project Lab",
    shortTitle: "Projects",
    description: "Real problems, practical solutions, and software in progress.",
    detail:
      "Explore the public case studies, the problems they address, their solutions, technologies, and results.",
    projects,
    position: [-1, -1],
    color: "#19f58a",
    kind: "project",
  },
  {
    id: "about",
    title: "About JP",
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
    title: "Skills Reactor",
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
    title: "Engineering Journey",
    shortTitle: "Experience",
    description: "From analysis and automation toward software engineering.",
    detail:
      "My development journey has involved analytical work, automation, backend development, and building full-stack applications.\n\nI have worked on Python automation workflows, API integrations, database-backed applications, and systems with authentication and role-based access.\n\nMy current learning focus is strengthening independent software design, backend architecture, system reliability, and AI engineering through hands-on projects.",
    position: [3, 1],
    color: "#a4ffce",
    kind: "experience",
  },
  {
    id: "contact",
    title: "Contact Beacon",
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
    "Welcome to my world! I'm JP, a software engineer who enjoys turning ideas into working software. Explore the map to discover my projects, skills, and journey.",

  projects:
    "You've discovered the Project Lab! Explore the projects, the problems they address, and how each solution is built.",

  about:
    "Curious about the developer behind the code? I'm JP. I enjoy solving problems, understanding how systems work, and continuously improving the way I build software.",

  skills:
    "Welcome to the Skills Reactor! Explore my toolkit by category, from backend engineering and databases to frontend development and automation.",

  experience:
    "Every project is another step forward. My journey includes analytical work, automation, and software development. I'm continuing to strengthen my engineering skills by building real-world systems.",

  contact:
    "You've reached the Contact Beacon! Have a project, an opportunity, or an idea you'd like to bring to life? Let's connect and see what we can build together.",
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

export type AdditionalProjectLocation = Omit<
  PortfolioLocation,
  "id"
> & {
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
function getIslandPosition(
  index: number,
  total: number,
): [number, number] {
  const angle =
    ISLAND_START_ANGLE +
    (index / Math.max(total, 1)) * Math.PI * 2;

  return [
    Number((Math.cos(angle) * ISLAND_RADIUS_X).toFixed(2)),
    Number((Math.sin(angle) * ISLAND_RADIUS_Z).toFixed(2)),
  ];
}

/* Generate island configuration directly from public projects. */

export const projectLocationConfigs: ProjectLocationConfig[] =
  projects.map((project, index) => ({
    id: `project-${slugify(project.id)}`,
    projectId: project.id,
    title: project.name,
    shortTitle: project.subtitle,
    description: project.summary,
    position: getIslandPosition(index, projects.length),
    color: ISLAND_COLORS[index % ISLAND_COLORS.length],
    locked: false,
  }));

/* Generate the actual map locations from the configuration. */

export const additionalProjectLocations: AdditionalProjectLocation[] =
  projectLocationConfigs.flatMap((config) => {
    const project = projects.find(
      (item) => item.id === config.projectId,
    );

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

export type WorldLocation =
  | PortfolioLocation
  | AdditionalProjectLocation;

export const allWorldLocations: WorldLocation[] = [
  ...locations,
  ...additionalProjectLocations,
];