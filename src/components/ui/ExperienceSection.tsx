
import { motion } from "framer-motion";
import {
  BriefcaseBusiness,
  Code2,
  Database,
  Laptop,
} from "lucide-react";

const experiences = [
  {
    role: "Data Analyst — Automation & Software Development",
    company: "Aurora Holdings",
    period: "August 2024 – Present",
    employment: "Company Employment",
    Icon: Database,
    description:
      "Started in data analytics with a focus on automation and expanded into developing internal web applications, backend services, and business tools.",
    responsibilities: [
      "Build and maintain Python automation workflows.",
      "Develop web applications and backend APIs for internal company tools.",
      "Integrate databases, APIs, and business process logic.",
      "Analyze operational data and improve repetitive workflows.",
    ],
  },
  {
    role: "Frontend Developer",
    company: "Sofreg Solutions",
    period: "November 2025 – April 2026",
    employment: "Previous Employment",
    Icon: Code2,
    description:
      "Worked on client-facing websites and the company's website, focusing on frontend development and website management.",
    responsibilities: [
      "Develop and maintain website interfaces.",
      "Manage website updates and frontend improvements.",
      "Build responsive layouts and improve user experience.",
    ],
  },
  {
    role: "Freelance Full-Stack Developer",
    company: "Independent / Self-Employed",
    period: "First Year of College – Present",
    employment: "Part-time · Remote",
    Icon: Laptop,
    description:
      "Started freelancing during college, accepting client projects, thesis systems, and capstone applications. Gradually expanded into full-stack development and custom software solutions.",
    responsibilities: [
      "Develop custom web applications based on client requirements.",
      "Build frontend interfaces, backend APIs, and database integrations.",
      "Develop academic, thesis, and capstone software projects.",
      "Manage development, testing, revisions, and project delivery.",
    ],
  },
];

export default function ExperienceSection() {
  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/[0.04] p-4">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-400">
          Professional Journey
        </p>
        <h3 className="mt-2 text-lg font-bold text-white">
          From freelance projects to software engineering
        </h3>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          My experience spans data analytics, automation, frontend
          development, and full-stack application development.
        </p>
      </div>

      <div className="relative space-y-4">
        <div
          aria-hidden="true"
          className="absolute bottom-6 left-[19px] top-6 w-px bg-emerald-400/20"
        />

        {experiences.map((experience, index) => {
          const Icon = experience.Icon;

          return (
            <motion.article
              key={experience.company + experience.role}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.08 }}
              className="relative rounded-xl border border-white/10 bg-[#081a13]/90 p-4 transition-colors hover:border-emerald-400/30 sm:p-5"
            >
              <div className="flex items-start gap-3">
                <div className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-xl border border-emerald-400/25 bg-[#092219] text-emerald-400">
                  <Icon size={19} />
                </div>

                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-bold leading-6 text-white sm:text-base">
                    {experience.role}
                  </h4>

                  <p className="mt-1 text-sm font-medium text-emerald-300">
                    {experience.company}
                  </p>

                  <p className="mt-2 text-xs leading-5 text-slate-400">
                    {experience.period}
                  </p>

                  <span className="mt-2 inline-flex rounded-md border border-emerald-400/20 bg-emerald-400/[0.06] px-2 py-1 text-[10px] font-semibold text-emerald-300">
                    {experience.employment}
                  </span>
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-300">
                {experience.description}
              </p>

              <ul className="mt-4 space-y-2">
                {experience.responsibilities.map((responsibility) => (
                  <li
                    key={responsibility}
                    className="flex items-start gap-2 text-sm leading-6 text-slate-400"
                  >
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-emerald-400" />
                    <span>{responsibility}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          );
        })}
      </div>

      <p className="flex items-center gap-2 px-1 text-xs leading-5 text-slate-500">
        <BriefcaseBusiness size={14} className="shrink-0" />
        Experience combines company employment and independent freelance work.
      </p>
    </div>
  );
}
