import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  // BriefcaseBusiness,
  Code2,
  Cpu,
  // House,
  // Mail,
  Navigation,
  Sparkles,
  // UserRound,
  // Wrench,
  X,
  Settings2,
  Box,
} from "lucide-react";

import mascot from "../../assets/hello.png";
// import type { LocationId } from "../../data/locations";

import SkillsSection from "./SkillsSection";
import ProjectsSection from "./ProjectsSection";
import ExperienceSection from "./ExperienceSection";
import type { CityLocation } from "../world/extended/FloatingProjectCity/types";
// const iconMap = {
//   home: House,
//   projects: Code2,
//   about: UserRound,
//   skills: Wrench,
//   experience: BriefcaseBusiness,
//   contact: Mail,
// } satisfies Record<LocationId, typeof House>;

type DetailPopupProps = {
  location: CityLocation;
  locations: CityLocation[];
  visible: boolean;
  onClose: () => void;
  onAskJP: () => void;
};

const capabilities = [
  { label: "Backend", detail: "Development", Icon: Code2 },
  { label: "Automation", detail: "& Scripting", Icon: Settings2 },
  { label: "AI &", detail: "Integrations", Icon: Cpu },
  { label: "Full-Stack", detail: "Applications", Icon: Box },
];

export default function DetailPopup({
  location,
  locations,
  visible,
  onClose,
  onAskJP,
}: DetailPopupProps) {
  console.log(locations);
  const isProjectLocation =
    location.kind === "project" && Boolean(location.projects?.length);

  const isSkillsLocation =
    location.id === "skills" && Boolean(location.skills?.length);

  const isExperienceLocation = location.id === "experience";

  useEffect(() => {
    if (!visible) return;

    onAskJP();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [visible, onClose]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="detail-drawer-overlay"
          className="fixed inset-0 z-50 bg-black/45 backdrop-blur-[2px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <motion.aside
            key={location.id}
            role="dialog"
            aria-modal="true"
            aria-labelledby="detail-popup-title"
            className="relative ml-auto flex h-[100dvh] w-full max-w-[550px] flex-col overflow-hidden border-l border-emerald-400/20 bg-[#04110d] text-white shadow-[-24px_0_80px_rgba(0,0,0,0.35)]"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              stiffness: 280,
              damping: 30,
              mass: 0.85,
            }}
            onClick={(event) => event.stopPropagation()}
          >
            {/* Drawer background */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 overflow-hidden"
            >
              <div className="absolute -right-32 -top-24 size-80 rounded-full bg-emerald-500/[0.07] blur-[100px]" />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(52,211,153,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(52,211,153,0.015)_1px,transparent_1px)] bg-[size:32px_32px]" />
            </div>

            {/* Header */}
            <header className="relative z-20 flex shrink-0 items-center gap-3 border-b border-emerald-300/15 bg-[#07140f]/95 px-4 py-3.5 sm:px-6 sm:py-5">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-emerald-400/25 bg-emerald-400/[0.08] text-emerald-400 sm:size-12">
                <Sparkles size={23} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-emerald-400 sm:text-xs sm:tracking-[0.24em]">
                  JP's Developer Portfolio
                </p>

                <h2 className="mt-1 truncate text-sm font-black tracking-wide text-white sm:text-base">
                  {location.shortTitle.toUpperCase()}
                </h2>
              </div>

              <button
                type="button"
                aria-label="Close details"
                onClick={onClose}
                className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/60 transition hover:border-emerald-400/40 hover:bg-emerald-400/10 hover:text-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                <X size={21} />
              </button>
            </header>

            {/* Scrollable content */}
            <main className="relative z-10 min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain">
              <div className="space-y-4 p-3 sm:space-y-5 sm:p-5 lg:p-6">
                
{/* Hero with static mascot */}
<div className="relative flex min-h-[120px] items-center overflow-visible rounded-xl border border-emerald-300/15 bg-[#071a11] px-4 py-4 sm:min-h-[140px] sm:px-5">
  <div className="relative z-10 min-w-0 flex-1 pr-20 sm:pr-24">
    <div className="mb-2 flex items-center gap-2">
      <span className="h-5 w-1 rounded-full bg-emerald-400" />

      <h3 className="text-xs font-black uppercase tracking-[0.15em] text-emerald-400 sm:text-sm">
        What I Offer
      </h3>
    </div>

    <p className="max-w-[280px] text-xs leading-5 text-slate-300 sm:text-sm sm:leading-6">
      Turning ideas into practical, reliable, and scalable solutions.
    </p>
  </div>

  {/* Static mascot aligned with the bottom border */}
  <img
    src={mascot}
    alt="JP's portfolio mascot"
    className="pointer-events-none absolute bottom-0 right-2 z-20 h-[110px] w-[100px] object-contain object-bottom sm:right-4 sm:h-[130px] sm:w-[120px]"
  />

  {/* Background decoration */}
  <div
    aria-hidden="true"
    className="pointer-events-none absolute right-0 top-0 size-32 rounded-full bg-emerald-400/[0.08] blur-3xl"
  />
</div>

                <section className="relative isolate overflow-hidden rounded-md border border-emerald-300/20 bg-[#061810]/90">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 overflow-hidden"
                  >
                    <div className="absolute -right-16 -top-20 size-72 rounded-full bg-emerald-500/15 blur-[70px]" />
                    <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-emerald-500/[0.07] to-transparent" />
                    <div className="absolute right-0 top-0 h-full w-1/3 skew-x-[-38deg] border-l border-emerald-400/10 bg-emerald-400/[0.025]" />
                  </div>

                  {/* Capabilities */}

                  <div className="relative z-10 grid grid-cols-2 gap-2 p-3 sm:gap-3">
                    {capabilities.map(
                      ({ label, detail, Icon: CapabilityIcon }, i) => (
                        <motion.div
                          key={label}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.08 * i, duration: 0.3 }}
                          className="flex min-w-0 items-center gap-2 rounded-md border border-emerald-300/15 bg-[#06140f]/80 p-2.5 transition-colors hover:border-emerald-400/40 hover:bg-emerald-400/[0.05] sm:gap-3 sm:p-3"
                        >
                          <div className="flex size-9 shrink-0 items-center justify-center rounded-md border border-emerald-400/30 bg-emerald-400/[0.07] text-emerald-400 sm:size-10">
                            <CapabilityIcon size={19} />
                          </div>

                          <div className="min-w-0">
                            <p className="text-[10px] font-bold leading-4 text-white/90 sm:text-xs">
                              {label}
                            </p>
                            <p className="text-[9px] leading-4 text-white/50 sm:text-xs">
                              {detail}
                            </p>
                          </div>
                        </motion.div>
                      ),
                    )}
                  </div>
                </section>

                {/* Dynamic section content */}
                <section className="rounded-2xl bg-[#06140f]/75 sm:rounded-3xl">
                  <div className="mb-5 flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="h-8 w-1.5 shrink-0 rounded-full bg-gray-200" />

                      <div>
                        <h3 className="text-sm font-black tracking-[0.13em] text-emerald-400">
                          {isProjectLocation
                            ? "PROJECT SHOWCASE"
                            : isSkillsLocation
                              ? "TECHNICAL SKILLS"
                              : isExperienceLocation
                                ? "PROFESSIONAL EXPERIENCE"
                                : "ABOUT THIS SECTION"}
                        </h3>

                        <p className="mt-1 text-xs text-slate-400">
                          {isProjectLocation
                            ? location.id === "projects"
                              ? "All projects, problems, solutions, and technologies"
                              : `Explore ${location.projects?.[0]?.name ?? location.shortTitle}`
                            : isSkillsLocation
                              ? "Technologies and development tools"
                              : isExperienceLocation
                                ? "Career history, responsibilities, and professional growth"
                                : "Explore my developer journey"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {isSkillsLocation && location.skills ? (
                    <SkillsSection groups={location.skills} />
                  ) : isProjectLocation && location.projects ? (
                    <ProjectsSection projects={location.projects} />
                  ) : isExperienceLocation ? (
                    <ExperienceSection />
                  ) : (
                    <div className="border-b border-emerald-300/15 pb-5">
                      <p className="whitespace-pre-line break-words text-sm leading-7 text-slate-200/90 sm:text-base sm:leading-8">
                        {location.detail}
                      </p>
                    </div>
                  )}
                </section>

                {/* Explore further */}
                <section className="group rounded-2xl border border-emerald-400/25 bg-[#06140f]/80 p-4 transition-colors hover:border-emerald-300/50 sm:rounded-3xl sm:p-5">
                  <div className="flex items-center gap-4">
                    <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl border border-emerald-400/30 bg-emerald-400/[0.06] text-emerald-400 sm:size-16">
                      <Navigation size={30} strokeWidth={1.8} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-black tracking-wide text-white">
                        EXPLORE FURTHER
                      </h3>

                      <p className="mt-1.5 text-xs leading-5 text-slate-400 sm:text-sm sm:leading-6">
                        Want to learn more about{" "}
                        {location.shortTitle.toLowerCase()}? Ask JP to help you
                        explore this section.
                      </p>
                    </div>

                    <div className="hidden size-10 shrink-0 items-center justify-center rounded-full border border-emerald-400/30 text-white/80 transition-all group-hover:translate-x-1 group-hover:border-emerald-400 group-hover:text-emerald-300 sm:flex">
                      <ArrowRight size={22} />
                    </div>
                  </div>
                </section>

                {/* Primary CTA */}
                {/* <button
                  type="button"
                  onClick={onAskJP}
                  className="group flex min-h-14 w-full items-center justify-center gap-3 rounded-xl border border-emerald-300/30 bg-emerald-400 px-5 py-4 text-sm font-black text-[#032017] transition-colors hover:bg-emerald-300 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#04110d] sm:min-h-16 sm:text-base"
                >
                  <Sparkles size={21} />
                  <span>Ask JP about this</span>
                  <ArrowRight
                    size={22}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </button> */}

                {/* Progress */}
                <div className="px-2 pb-3 pt-1 sm:px-3">
                  <div className="mt-5 flex items-center justify-center gap-2 pb-1 text-xs text-slate-500">
                    <span className="h-px w-4 bg-emerald-500/60" />
                    <span>Created by</span>
                    <span className="font-extrabold tracking-tight text-slate-400">
                      ◈ JP QUINTANA
                    </span>
                  </div>
                </div>
              </div>
            </main>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
