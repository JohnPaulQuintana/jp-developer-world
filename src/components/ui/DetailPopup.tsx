import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BriefcaseBusiness,
  Code2,
  Cpu,
  House,
  Mail,
  Navigation,
  Sparkles,
  UserRound,
  Wrench,
  X,
  Settings2,
  Box,
} from "lucide-react";

import mascot from "../../assets/hello.png";
import type { LocationId } from "../../data/locations";

import SkillsSection from "./SkillsSection";
import ProjectsSection from "./ProjectsSection";
import type { CityLocation } from "../world/extended/FloatingProjectCity/types";

const iconMap = {
  home: House,
  projects: Code2,
  about: UserRound,
  skills: Wrench,
  experience: BriefcaseBusiness,
  contact: Mail,
} satisfies Record<LocationId, typeof House>;

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
  // const Icon = iconMap[location.id];
  const Icon =
    location.id in iconMap
      ? iconMap[location.id as keyof typeof iconMap]
      : iconMap.projects;

  const locationIndex = locations.findIndex((item) => item.id === location.id);

  const index = locationIndex >= 0 ? locationIndex + 1 : 1;
  const totalLocations = locations.length;

  const progress =
    totalLocations > 0
      ? (Math.min(index, totalLocations) / totalLocations) * 100
      : 0;

  const isProjectLocation =
    location.kind === "project" && Boolean(location.projects?.length);

  const isSkillsLocation =
    location.id === "skills" && Boolean(location.skills?.length);

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
            className="relative ml-auto flex h-[100dvh] w-full max-w-[680px] flex-col overflow-hidden border-l border-emerald-400/20 bg-[#04110d] text-white shadow-[-24px_0_80px_rgba(0,0,0,0.35)]"
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
                {/* Hero */}
                <section className="relative isolate overflow-hidden rounded-2xl border border-emerald-300/20 bg-[#061810]/90 sm:rounded-3xl">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 overflow-hidden"
                  >
                    <div className="absolute -right-16 -top-20 size-72 rounded-full bg-emerald-500/15 blur-[70px]" />
                    <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-emerald-500/[0.07] to-transparent" />
                    <div className="absolute right-0 top-0 h-full w-1/3 skew-x-[-38deg] border-l border-emerald-400/10 bg-emerald-400/[0.025]" />
                  </div>

                  <div className="relative grid grid-cols-1 sm:grid-cols-[1fr_0.85fr]">
                    {/* Hero copy */}
                    <div className="relative z-10 flex min-w-0 flex-col justify-center p-5 pb-1 sm:p-6 sm:pb-7 lg:p-7">
                      <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-400/35 bg-emerald-400/[0.08] px-3 py-2 text-[10px] font-extrabold tracking-[0.14em] text-emerald-300 sm:text-xs">
                        <span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                        LOCATION {String(index).padStart(2, "0")}
                      </div>

                      <div className="mt-5 flex items-start gap-3">
                        <div className="mt-1 flex size-10 shrink-0 items-center justify-center rounded-xl border border-emerald-400/25 bg-emerald-400/[0.08] text-emerald-400 sm:size-12">
                          <Icon size={24} />
                        </div>

                        <div className="min-w-0">
                          <h1
                            id="detail-popup-title"
                            className="break-words text-2xl font-black leading-tight tracking-tight sm:text-3xl"
                          >
                            {location.title}
                          </h1>

                          <p className="mt-2 text-sm font-medium leading-6 text-emerald-50/60">
                            {location.description}
                          </p>
                        </div>
                      </div>

                      <div className="mt-5 hidden h-px w-full bg-gradient-to-r from-emerald-400/40 to-transparent sm:block" />

                      <p className="mt-4 hidden max-w-sm text-sm leading-6 text-white/45 sm:block">
                        Building software, automation, and AI-powered tools to
                        solve practical problems.
                      </p>
                    </div>

                    {/* Mascot */}
                    <div className="relative -mt-1 flex h-44 items-end justify-center overflow-hidden sm:mt-0 sm:h-64 lg:h-72">
                      <div
                        aria-hidden="true"
                        className="absolute bottom-0 left-1/2 h-32 w-48 -translate-x-1/2 rounded-full bg-emerald-400/15 blur-[55px] sm:h-48 sm:w-56"
                      />

                      <motion.img
                        key={location.id}
                        src={mascot}
                        alt="JP mascot"
                        draggable={false}
                        className="relative z-10 -mb-10 h-full max-w-full object-contain object-bottom drop-shadow-[0_12px_25px_rgba(0,0,0,0.4)] sm:absolute sm:bottom-0 sm:h-[112%] sm:max-w-none"
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.12, duration: 0.45 }}
                      />
                    </div>
                  </div>

                  {/* Capabilities */}
                  <div className="relative z-10 grid grid-cols-2 gap-2 px-3 pb-3 sm:gap-3 sm:px-5 sm:pb-5">
                    {capabilities.map(
                      ({ label, detail, Icon: CapabilityIcon }, i) => (
                        <motion.div
                          key={label}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.08 * i, duration: 0.3 }}
                          className="flex min-w-0 items-center gap-2 rounded-xl border border-emerald-300/15 bg-[#06140f]/80 p-2.5 transition-colors hover:border-emerald-400/40 hover:bg-emerald-400/[0.05] sm:gap-3 sm:p-3"
                        >
                          <div className="flex size-9 shrink-0 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/[0.07] text-emerald-400 sm:size-10">
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
                <section className="rounded-2xl border border-emerald-300/20 bg-[#06140f]/75 p-4 sm:rounded-3xl sm:p-6">
                  <div className="mb-5 flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="h-8 w-1.5 shrink-0 rounded-full bg-emerald-400" />

                      <div>
                        <h3 className="text-sm font-black tracking-[0.13em] text-emerald-400">
                          {isProjectLocation
                            ? "PROJECT SHOWCASE"
                            : isSkillsLocation
                              ? "TECHNICAL SKILLS"
                              : "ABOUT THIS SECTION"}
                        </h3>

                        <p className="mt-1 text-xs text-slate-400">
                          {isProjectLocation
                            ? location.id === "projects"
                              ? "All projects, problems, solutions, and technologies"
                              : `Explore ${location.projects?.[0]?.name ?? location.shortTitle}`
                            : isSkillsLocation
                              ? "Technologies and development tools"
                              : "Explore my developer journey"}
                        </p>
                      </div>
                    </div>

                    <span className="shrink-0 pt-1 text-[10px] font-bold tracking-[0.18em] text-white/40">
                      {String(index).padStart(2, "0")}
                      <span className="mx-1.5 text-emerald-400/50">/</span>
                      {String(totalLocations).padStart(2, "0")}
                    </span>
                  </div>

                  {isSkillsLocation && location.skills ? (
                    <SkillsSection groups={location.skills} />
                  ) : isProjectLocation && location.projects ? (
                    <ProjectsSection projects={location.projects} />
                  ) : (
                    <div className="border-b border-emerald-300/15 pb-5">
                      <p className="whitespace-pre-line break-words text-sm leading-7 text-slate-200/90 sm:text-base sm:leading-8">
                        {location.detail}
                      </p>

                      <div className="mt-5 flex items-center gap-3 sm:gap-4">
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-full border-2 border-emerald-400 text-emerald-400 sm:size-12">
                          <Navigation size={22} />
                        </div>

                        <p className="text-xs leading-6 text-slate-400 sm:text-sm sm:leading-7">
                          Explore my projects, technical skills, and development
                          journey.
                        </p>
                      </div>
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
                <button
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
                </button>

                {/* Progress */}
                <div className="px-2 pb-3 pt-1 sm:px-3">
                  <div className="mb-3 flex items-center justify-between gap-3 text-[10px] font-bold tracking-[0.14em] text-white/35 sm:text-xs sm:tracking-[0.18em]">
                    <span>PORTFOLIO PROGRESS</span>
                    <span className="text-emerald-300">
                      {Math.round(progress)}%
                    </span>
                  </div>

                  <div
                    className="h-1 overflow-hidden rounded-full bg-white/10"
                    role="progressbar"
                    aria-valuenow={Math.round(progress)}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label="Portfolio progress"
                  >
                    <motion.div
                      className="h-full rounded-full bg-emerald-400"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>

                  <div className="mt-5 flex items-center justify-center gap-2 pb-1 text-xs text-slate-500">
                    <span className="h-px w-4 bg-emerald-500/60" />
                    <span>Powered by</span>
                    <span className="font-extrabold tracking-tight text-slate-400">
                      ◈ Netlify
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
