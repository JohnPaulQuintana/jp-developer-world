export type LocationId =
  | 'home'
  | 'projects'
  | 'about'
  | 'skills'
  | 'experience'
  | 'contact'

export type PortfolioLocation = {
  id: LocationId
  title: string
  shortTitle: string
  description: string
  detail: string
  position: [number, number]
  color: string
  kind: 'spawn' | 'project' | 'about' | 'skills' | 'experience' | 'contact'
  locked?: boolean
}

export const locations: PortfolioLocation[] = [
  {
    id: 'home',
    title: 'Developer Spawn Point',
    shortTitle: 'Home',
    description: 'Building software, automation, and AI-powered tools.',
    detail:
      "Hi, I'm JP. I'm a software engineer focused on backend development, automation, and building practical applications. I enjoy understanding how systems work, solving real problems, and turning ideas into working software.\n\nExplore my projects, technical skills, and development journey.",
    position: [-3, 2],
    color: '#19f58a',
    kind: 'spawn',
  },
  {
    id: 'projects',
    title: 'Project Lab',
    shortTitle: 'Projects',
    description: 'Explore applications and systems I have worked on.',
    detail:
      'NaviAtlas — an indoor navigation and spatial mapping project focused on interactive SVG floor maps and connected building navigation.\n\nNaviTap — a QR-based business review solution designed to help customers reach a business’s Google review page, with plans for business management and analytics.\n\nRisk Management Portal — a risk-monitoring application involving a FastAPI backend, a TypeScript frontend, authentication, and risk-flag workflows.\n\nBackend Engineering — reusable FastAPI components, N-tier architecture, database integration, API security, and automation workflows.\n\nThese projects represent ongoing development work. Features, deployment status, and available demos may vary.',
    position: [-1, -1],
    color: '#19f58a',
    kind: 'project',
  },
  {
    id: 'about',
    title: 'About JP',
    shortTitle: 'About Me',
    description: 'A software engineer who enjoys building and learning.',
    detail:
      "I'm JP, a software engineer with a practical, project-driven approach to learning and development.\n\nMy work focuses on backend systems, Python automation, API development, database integration, and web and mobile applications. I like breaking complex problems into manageable components and improving the structure, reliability, and maintainability of software.\n\nI'm also exploring how to build AI systems that can work with my own knowledge sources and become more useful over time.",
    position: [2, -2],
    color: '#a4ffce',
    kind: 'about',
  },
  {
    id: 'skills',
    title: 'Skills Reactor',
    shortTitle: 'Skills',
    description: 'Technologies I use across backend and application development.',
    detail:
      'BACKEND DEVELOPMENT\nPython, FastAPI, REST APIs, SQLAlchemy, Alembic, and N-tier architecture.\n\nDATABASES\nPostgreSQL, relational database design, and database migrations.\n\nFRONTEND DEVELOPMENT\nReact, TypeScript, Vite, Tailwind CSS, and TanStack Query.\n\nAUTOMATION AND INTEGRATION\nPython automation, API integration, workflow development, and data processing.\n\nMOBILE AND SPATIAL PROJECTS\nExpo, React Native, SVG rendering, and interactive navigation concepts.\n\nAI EXPLORATION\nWorking with AI APIs, local AI tools, and approaches to building a personal knowledge-based assistant.',
    position: [1, 1],
    color: '#19f58a',
    kind: 'skills',
  },
  {
    id: 'experience',
    title: 'Engineering Journey',
    shortTitle: 'Experience',
    description: 'From analysis and automation toward software engineering.',
    detail:
      'My development journey has involved analytical work, automation, backend development, and building full-stack applications.\n\nI have worked on Python automation workflows, API integrations, database-backed applications, and systems with authentication and role-based access.\n\nMy current learning focus is strengthening independent software design, backend architecture, system reliability, and AI engineering through hands-on projects.\n\nThis section describes my technical journey; specific employers, dates, formal qualifications, and measurable achievements should be added from my verified work history.',
    position: [3, 1],
    color: '#a4ffce',
    kind: 'experience',
  },
  {
    id: 'contact',
    title: 'Contact Beacon',
    shortTitle: 'Contact',
    description: 'Have a project, collaboration, or software opportunity?',
    detail:
      "I'm open to discussing software projects, automation opportunities, and ideas for useful applications.\n\nIf you'd like to connect, use the contact links on this portfolio to reach me. Add your verified professional email, GitHub profile, LinkedIn profile, and résumé link before publishing.",
    position: [0, 4],
    color: '#19f58a',
    kind: 'contact',
  },
]

export const storyMessages: Record<LocationId, string> = {
  home:
    "Welcome to my world! I'm JP, a software engineer who enjoys turning ideas into working software. Explore the map to discover my projects, skills, and journey.",

  projects:
    "You've discovered the Project Lab! This is where I turn ideas into applications, from indoor navigation and business tools to risk management systems and automation. Pick a project to see what I've been building.",

  about:
    "Curious about the developer behind the code? I'm JP. I enjoy solving problems, understanding how systems work, and continuously improving the way I build software.",

  skills:
    "Welcome to the Skills Reactor! My toolkit includes Python, FastAPI, PostgreSQL, React, TypeScript, and more. I'm especially interested in backend engineering, automation, and AI-powered applications.",

  experience:
    "Every project is another step forward. My journey has taken me through analytical work, automation, and software development. I'm continuing to strengthen my engineering skills by building real-world systems.",

  contact:
    "You've reached the Contact Beacon! Have a project, an opportunity, or an idea you'd like to bring to life? Let's connect and see what we can build together.",
}