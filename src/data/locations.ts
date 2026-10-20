
export type LocationId =
  | "home"
  | "projects"
  | "about"
  | "skills"
  | "experience"
  | "contact";

export type PortfolioProject = {
  id: string;
  name: string;
  category: string;
  summary: string;
  businessProblem: string;
  solution: string;
  technologies: string[];
  image: string;
  githubUrl: string | null;
  liveUrl: string | null;
  status: "In development" | "Prototype" | "Live";
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
  id: LocationId;
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

export const projects: PortfolioProject[] = [
  {
    id: "navilink",
    name: "NaviLink",
    category: "Link Management",
    summary:
      "A platform for saving, organizing, and revisiting useful links.",
    businessProblem:
      "Useful links can become difficult to organize and return to when they are scattered across browser tabs, messages, and bookmarks.",
    solution:
      "A link-saving application built around organized spaces, collections, link previews, and reading-session progress.",
    technologies: [
      "React",
      "TypeScript",
      "Laravel",
      "Supabase",
    ],
    image: "/images/projects/navilink.png",
    githubUrl: null,
    liveUrl: null,
    status: "In development",
  },
  {
    id: "naviatlas",
    name: "NaviAtlas",
    category: "Indoor Navigation",
    summary:
      "An interactive navigation concept for indoor spaces and floor maps.",
    businessProblem:
      "Visitors can struggle to understand building layouts and locate rooms or destinations in unfamiliar indoor environments.",
    solution:
      "An interactive mapping approach using SVG floor maps and connected navigation concepts to make indoor spaces easier to explore.",
    technologies: [
      "React",
      "TypeScript",
      "SVG",
      "Interactive Maps",
    ],
    image: "/images/projects/naviatlas.png",
    githubUrl: null,
    liveUrl: null,
    status: "Prototype",
  },
  {
    id: "navitap",
    name: "NaviTap",
    category: "Business Tools",
    summary:
      "A QR-code and NFC experience that directs customers to business review pages.",
    businessProblem:
      "Customers may not leave reviews when finding the correct review page requires too many steps.",
    solution:
      "A tap-or-scan experience designed to take customers directly to a business's Google review page, with room to expand into business management and analytics.",
    technologies: [
      "QR Codes",
      "NFC",
      "Web Development",
      "API Integration",
    ],
    image: "/images/projects/navitap.png",
    githubUrl: null,
    liveUrl: null,
    status: "In development",
  },
  {
    id: "risk-portal",
    name: "Risk Management Portal",
    category: "Business Systems",
    summary:
      "A project-aware application for managing access and risk-related workflows.",
    businessProblem:
      "Risk-related workflows need a structured way to organize project access, user permissions, and risk-monitoring activities.",
    solution:
      "A multi-project application with a FastAPI backend, a TypeScript frontend, JWT authentication, and role-based project access.",
    technologies: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "SQLAlchemy",
      "React",
      "TypeScript",
    ],
    image: "/images/projects/risk-portal.png",
    githubUrl: null,
    liveUrl: null,
    status: "In development",
  },
  {
    id: "gobus",
    name: "GoBus",
    category: "Fleet Management",
    summary:
      "A bus-tracking system with location updates and operator monitoring.",
    businessProblem:
      "Fleet operators need visibility into vehicle locations, service status, passenger counts, and emergency events.",
    solution:
      "A bus-tracking application with map-based vehicle monitoring, location updates, and an operator dashboard for fleet metrics.",
    technologies: [
      "React Native",
      "Expo",
      "Maps",
      "Laravel",
      "Recharts",
    ],
    image: "/images/projects/gobus.png",
    githubUrl: null,
    liveUrl: null,
    status: "In development",
  },
];

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
    skills: [
      "PostgreSQL",
      "SQL",
      "Supabase",
      "Database Migrations",
    ],
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
    skills: [
      "React Native",
      "Expo",
      "SVG Maps",
      "Interactive Navigation",
    ],
  },
  {
    category: "AI Exploration",
    description: "Exploring AI-assisted applications and integrations.",
    skills: [
      "AI APIs",
      "AI Integrations",
      "Knowledge-Based Assistants",
    ],
  },
];

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
      "Explore selected projects and the problems each one is designed to solve.",
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
      "I'm JP, a software engineer with a practical, project-driven approach to learning and development.\n\nMy work focuses on backend systems, Python automation, API development, database integration, and web and mobile applications. I like breaking complex problems into manageable components and improving the structure, reliability, and maintainability of software.\n\nI'm also exploring how to build AI systems that can work with my own knowledge sources and become more useful over time.",
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
      "A collection of technologies and tools I use or am actively exploring through hands-on projects.",
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
      "My development journey has involved analytical work, automation, backend development, and building full-stack applications.\n\nI have worked on Python automation workflows, API integrations, database-backed applications, and systems with authentication and role-based access.\n\nMy current learning focus is strengthening independent software design, backend architecture, system reliability, and AI engineering through hands-on projects.\n\nThis section describes my technical journey; specific employers, dates, formal qualifications, and measurable achievements should be added from my verified work history.",
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
    "Every project is another step forward. My journey has taken me through analytical work, automation, and software development. I'm continuing to strengthen my engineering skills by building real-world systems.",
  contact:
    "You've reached the Contact Beacon! Have a project, an opportunity, or an idea you'd like to bring to life? Let's connect and see what we can build together.",
};


/* =========================================
   ADDITIONAL PROJECT LOCATION CONFIGURATION
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

export const projectLocationConfigs: ProjectLocationConfig[] = [
  {
    id: "project-navilink",
    projectId: "navilink",
    title: "NaviLink Archive",
    shortTitle: "NaviLink",
    description: "A magical archive for organizing useful links.",
    position: [-5, -4],
    color: "#19f58a",
  },
  {
    id: "project-naviatlas",
    projectId: "naviatlas",
    title: "NaviAtlas Observatory",
    shortTitle: "NaviAtlas",
    description: "An ancient observatory for mapping indoor spaces.",
    position: [-2, -6],
    color: "#a4ffce",
  },
  {
    id: "project-navitap",
    projectId: "navitap",
    title: "NaviTap Trading Post",
    shortTitle: "NaviTap",
    description: "A forest trading post connecting businesses and customers.",
    position: [5, -5],
    color: "#19f58a",
  },
  {
    id: "project-risk-portal",
    projectId: "risk-portal",
    title: "Risk Fortress",
    shortTitle: "Risk Portal",
    description: "A fortified outpost for risk monitoring and business systems.",
    position: [7, 0],
    color: "#a4ffce",
  },
  {
    id: "project-gobus",
    projectId: "gobus",
    title: "GoBus Waystation",
    shortTitle: "GoBus",
    description: "A forest waystation for fleet tracking and journey monitoring.",
    position: [5, 4],
    color: "#19f58a",
  },
];

/* =========================================
   GENERATED PROJECT LOCATIONS
   ========================================= */

// These are additional locations.
// The original `locations` array remains unchanged.

export const additionalProjectLocations: PortfolioLocation[] =
  projectLocationConfigs.flatMap((config) => {
    const project = projects.find(
      (item) => item.id === config.projectId,
    );

    // Ignore invalid project IDs rather than creating broken locations.
    if (!project) {
      return [];
    }

    return [
      {
        id: "projects",
        title: config.title,
        shortTitle: config.shortTitle,
        description: config.description,
        detail: `${project.businessProblem}\n\n${project.solution}`,
        position: config.position,
        color: config.color,
        kind: "project",
        locked: config.locked ?? false,
        projects: [project],
      },
    ];
  });
