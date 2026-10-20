
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Bot,
  ChevronDown,
  Code2,
  Database,
  Layers3,
  Smartphone,
  Workflow,
  Wrench,
} from "lucide-react";

import type { SkillGroup } from "../../data/locations";

type SkillsSectionProps = {
  groups: SkillGroup[];
};

const categoryIcons: Record<string, typeof Code2> = {
  "Backend Engineering": Code2,
  "Backend Development": Code2,
  Databases: Database,
  "Frontend Development": Layers3,
  "Automation & Integration": Workflow,
  "Mobile & Spatial": Smartphone,
  "Mobile Development": Smartphone,
  "AI Exploration": Bot,
  "Tools & Other Technologies": Wrench,
};

export default function SkillsSection({
  groups,
}: SkillsSectionProps) {
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);

  const toggleGroup = (category: string) => {
    setExpandedGroups((current) =>
      current.includes(category)
        ? current.filter((item) => item !== category)
        : [...current, category],
    );
  };

  return (
    <div className="space-y-4">
      {/* Section intro */}
      <div className="pb-1">
        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-emerald-400 sm:text-[10px]">
          TECH STACK
        </span>

        <h3 className="mt-1.5 text-xl font-bold tracking-tight text-white sm:text-2xl">
          Tools of the trade
        </h3>

        <p className="mt-1.5 max-w-md text-xs leading-5 text-slate-400 sm:text-sm sm:leading-6">
          Technologies and concepts I use to design, build, and improve
          applications.
        </p>
      </div>

      {/* Skill groups */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {groups.map((group, index) => {
          const Icon = categoryIcons[group.category] ?? Code2;
          const expanded = expandedGroups.includes(group.category);

          // Show a compact preview on mobile until expanded.
          const visibleSkills = expanded
            ? group.skills
            : group.skills.slice(0, 4);

          const remainingSkills = group.skills.length - visibleSkills.length;

          return (
            <motion.section
              key={group.category}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.05,
                duration: 0.3,
              }}
              className="min-w-0 rounded-xl border border-emerald-400/15 bg-[#07140e] p-3.5 transition-colors hover:border-emerald-400/30 sm:p-4"
            >
              {/* Category heading */}
              <div className="flex items-start gap-2.5">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-emerald-400/20 bg-emerald-400/[0.07] text-emerald-400">
                  <Icon size={18} />
                </div>

                <div className="min-w-0 flex-1">
                  <h4 className="break-words text-sm font-bold leading-5 text-white">
                    {group.category}
                  </h4>

                  <p className="mt-1 text-[10px] leading-4 text-slate-400 sm:text-xs sm:leading-5">
                    {group.description}
                  </p>
                </div>

                <span className="shrink-0 rounded-md border border-white/[0.07] bg-white/[0.03] px-1.5 py-1 text-[9px] font-medium text-slate-400">
                  {group.skills.length}
                </span>
              </div>

              {/* Skill badges */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {visibleSkills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex max-w-full items-center rounded-md border border-emerald-400/15 bg-emerald-400/[0.05] px-2 py-1.5 text-[10px] font-medium leading-4 text-emerald-100/85 sm:text-[11px]"
                  >
                    {skill}
                  </span>
                ))}

                {!expanded && remainingSkills > 0 && (
                  <button
                    type="button"
                    onClick={() => toggleGroup(group.category)}
                    className="inline-flex items-center rounded-md border border-white/10 bg-white/[0.04] px-2 py-1.5 text-[10px] font-semibold text-slate-300 transition-colors hover:border-emerald-400/30 hover:text-emerald-300"
                  >
                    +{remainingSkills} more
                  </button>
                )}
              </div>

              {/* Expand / collapse */}
              {group.skills.length > 4 && (
                <button
                  type="button"
                  onClick={() => toggleGroup(group.category)}
                  aria-expanded={expanded}
                  className="mt-3 inline-flex min-h-8 items-center gap-1.5 text-[10px] font-semibold text-slate-500 transition-colors hover:text-emerald-300"
                >
                  {expanded ? "Show less" : "View all skills"}

                  <ChevronDown
                    size={13}
                    className={`transition-transform duration-200 ${
                      expanded ? "rotate-180" : ""
                    }`}
                  />
                </button>
              )}
            </motion.section>
          );
        })}
      </div>
    </div>
  );
}
