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
import type { LocationId, PortfolioLocation } from "../../data/locations";

const iconMap = {
  home: House,
  projects: Code2,
  about: UserRound,
  skills: Wrench,
  experience: BriefcaseBusiness,
  contact: Mail,
} satisfies Record<LocationId, typeof House>;

type DetailPopupProps = {
  location: PortfolioLocation;
  locations: PortfolioLocation[];
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
  const Icon = iconMap[location.id];

  const locationIndex = locations.findIndex((item) => item.id === location.id);

  const index = locationIndex >= 0 ? locationIndex + 1 : 1;
  const totalLocations = locations.length;

  const progress =
    totalLocations > 0
      ? (Math.min(index, totalLocations) / totalLocations) * 100
      : 0;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key={location.id}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#020805]/90 p-2 backdrop-blur-xl sm:p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="detail-popup-title"
            className="relative flex h-[94dvh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-emerald-400/25 bg-[#04110d] text-white shadow-[0_0_100px_rgba(0,255,130,0.08)] sm:h-[min(900px,92dvh)] sm:rounded-3xl"
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 12 }}
            transition={{
              type: "spring",
              stiffness: 240,
              damping: 26,
            }}
            onClick={(event) => event.stopPropagation()}
          >
            {/* Ambient background */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 overflow-hidden"
            >
              <div className="absolute -right-32 -top-32 size-96 rounded-full bg-emerald-500/[0.09] blur-[100px]" />
              <div className="absolute -bottom-40 -left-24 size-80 rounded-full bg-green-500/[0.06] blur-[100px]" />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(52,211,153,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(52,211,153,0.025)_1px,transparent_1px)] bg-[size:32px_32px]" />
            </div>

            {/* Header */}
            <header className="relative z-20 flex shrink-0 items-center gap-3 border-b border-emerald-300/15 bg-[#07140f]/95 px-4 py-3.5 sm:px-7 sm:py-5">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-emerald-400/25 bg-emerald-400/[0.08] text-emerald-400 shadow-[inset_0_0_20px_rgba(16,185,129,0.06)] sm:size-14">
                <Sparkles size={25} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-emerald-400 sm:text-xs sm:tracking-[0.24em]">
                  JP's Developer Portfolio
                </p>

                <h2 className="mt-1 truncate text-sm font-black tracking-wide text-white sm:text-lg">
                  {location.shortTitle.toUpperCase()}
                </h2>
              </div>

              <button
                type="button"
                aria-label="Close details"
                onClick={onClose}
                className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/60 transition hover:border-emerald-400/40 hover:bg-emerald-400/10 hover:text-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 sm:size-12"
              >
                <X size={22} />
              </button>
            </header>

            {/* Scrollable content */}
            <main className="relative z-10 min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain">
              <div className="space-y-4 p-3 sm:space-y-6 sm:p-6 lg:p-8">
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
                    <div className="relative z-10 flex min-w-0 flex-col justify-center p-5 pb-1 sm:p-7 sm:pb-7 lg:p-9">
                      <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-400/35 bg-emerald-400/[0.08] px-3 py-2 text-[10px] font-extrabold tracking-[0.14em] text-emerald-300 sm:text-xs">
                        <span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                        LOCATION {String(index).padStart(2, "0")}
                      </div>

                      <div className="mt-5 flex items-start gap-3">
                        <div className="mt-1 flex size-11 shrink-0 items-center justify-center rounded-xl border border-emerald-400/25 bg-emerald-400/[0.08] text-emerald-400 sm:size-14">
                          <Icon size={27} />
                        </div>

                        <div className="min-w-0">
                          <h1
                            id="detail-popup-title"
                            className="break-words text-2xl font-black leading-tight tracking-tight sm:text-3xl lg:text-4xl"
                          >
                            {location.title}
                          </h1>

                          <p className="mt-2 text-sm font-medium leading-6 text-emerald-50/60 sm:text-base">
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
                    <div className="relative -mt-1 flex h-44 items-end justify-center overflow-hidden sm:mt-0 sm:h-72 lg:h-80">
                      <div
                        aria-hidden="true"
                        className="absolute bottom-0 left-1/2 h-32 w-48 -translate-x-1/2 rounded-full bg-emerald-400/15 blur-[55px] sm:h-48 sm:w-64"
                      />

                      <motion.img
                        key={location.id}
                        src={mascot}
                        alt="JP mascot"
                        draggable={false}
                        className="relative -mb-10 z-10 h-full max-w-full object-contain object-bottom drop-shadow-[0_12px_25px_rgba(0,0,0,0.4)] sm:absolute sm:bottom-0 sm:h-[112%] sm:max-w-none"
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.12, duration: 0.45 }}
                      />
                    </div>
                  </div>

                  {/* Capabilities */}
                  <div className="relative z-10 grid grid-cols-2 gap-2 px-3 pb-3 sm:grid-cols-4 sm:gap-3 sm:px-6 sm:pb-6 lg:px-8 lg:pb-8">
                    {capabilities.map(
                      ({ label, detail, Icon: CapabilityIcon }, i) => (
                        <motion.div
                          key={label}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.08 * i, duration: 0.3 }}
                          className="flex min-w-0 items-center gap-2 rounded-xl border border-emerald-300/15 bg-[#06140f]/80 p-2.5 transition-colors hover:border-emerald-400/40 hover:bg-emerald-400/[0.05] sm:gap-3 sm:p-3"
                        >
                          <div className="flex size-9 shrink-0 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/[0.07] text-emerald-400 sm:size-11">
                            <CapabilityIcon size={21} />
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

                {/* About */}
                <section className="rounded-2xl border border-emerald-300/20 bg-[#06140f]/75 p-5 sm:rounded-3xl sm:p-7 lg:p-8">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="h-8 w-1.5 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.3)]" />

                      <h3 className="text-sm font-black tracking-[0.13em] text-emerald-400 sm:text-lg sm:tracking-[0.16em]">
                        ABOUT THIS SECTION
                      </h3>
                    </div>

                    <span className="shrink-0 pt-1 text-[10px] font-bold tracking-[0.18em] text-white/40 sm:text-xs">
                      {String(index).padStart(2, "0")}
                      <span className="mx-1.5 text-emerald-400/50">/</span>
                      {String(totalLocations).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="ml-[18px] mt-5 border-b border-emerald-300/15 pb-6 sm:ml-[22px] sm:mt-6 sm:pb-7">
                    <p className="whitespace-pre-line break-words text-[14px] leading-7 text-slate-200/90 sm:text-base sm:leading-8 lg:text-lg">
                      {location.detail}
                    </p>
                  </div>

                  <div className="ml-[18px] mt-5 flex items-center gap-3 sm:ml-[22px] sm:mt-6 sm:gap-5">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-emerald-400 text-emerald-400 sm:size-14">
                      <Navigation size={25} />
                    </div>

                    <p className="text-xs leading-6 text-slate-400 sm:text-sm sm:leading-7">
                      Explore my projects, technical skills, and development
                      journey.
                    </p>
                  </div>
                </section>

                {/* Explore further */}
                <section className="group rounded-2xl border border-emerald-400/35 bg-gradient-to-br from-emerald-500/[0.09] to-[#06140f]/90 p-4 transition-colors hover:border-emerald-300/60 sm:rounded-3xl sm:p-6">
                  <div className="flex items-center gap-4 sm:gap-6">
                    <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl border border-emerald-400/30 bg-emerald-400/[0.08] text-emerald-400 sm:size-20">
                      <Navigation size={37} strokeWidth={1.8} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-black tracking-wide text-white sm:text-lg">
                        EXPLORE FURTHER
                      </h3>

                      <p className="mt-1.5 text-xs leading-5 text-slate-400 sm:text-sm sm:leading-6">
                        Want to learn more about{" "}
                        {location.shortTitle.toLowerCase()}? Ask JP to help you
                        explore this section.
                      </p>
                    </div>

                    <div className="hidden size-14 shrink-0 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/[0.05] text-white/80 transition-all group-hover:translate-x-1 group-hover:border-emerald-400 group-hover:text-emerald-300 sm:flex">
                      <ArrowRight size={26} />
                    </div>
                  </div>
                </section>

                {/* Primary CTA */}
                <button
                  type="button"
                  onClick={onAskJP}
                  className="group flex min-h-14 w-full items-center justify-center gap-3 rounded-full border border-emerald-200/30 bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-400 px-5 py-4 text-sm font-black text-[#032017] shadow-[0_0_28px_rgba(16,185,129,0.13)] transition-all hover:brightness-110 hover:shadow-[0_0_36px_rgba(16,185,129,0.24)] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#04110d] sm:min-h-[68px] sm:text-base"
                >
                  <Sparkles size={22} />
                  <span>Ask JP about this</span>
                  <ArrowRight
                    size={23}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </button>

                {/* Progress */}
                <div className="px-2 pb-2 pt-1 sm:px-4 sm:pt-2">
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
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-green-300"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>

                  <div className="mt-5 flex items-center justify-center gap-2 pb-1 text-xs text-slate-500">
                    <span className="h-px w-4 bg-cyan-500/70" />
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
