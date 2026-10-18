import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BriefcaseBusiness,
  Code2,
  House,
  Mail,
  UserRound,
  Wrench,
  X,
  Sparkles,
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

export default function DetailPopup({
  location,
  locations,
  visible,
  onClose,
  onAskJP,
}: DetailPopupProps) {
  const Icon = iconMap[location.id];

  const locationIndex = locations.findIndex((item) => item.id === location.id);

  const index = locationIndex >= 0 ? locationIndex + 1 : 0;
  const totalLocations = locations.length;

  const progress =
    totalLocations > 0 && index > 0
      ? (Math.min(index, totalLocations) / totalLocations) * 100
      : 0;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key={location.id}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black/75 p-3 sm:p-6"
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
            className="relative flex h-[min(760px,90dvh)] w-full max-w-5xl flex-col overflow-hidden rounded-md border-2 border-green-500/40 bg-[#111711]/70 text-white sm:rounded-3xl"
            // className="relative flex h-[min(760px,90dvh)] w-full max-w-5xl flex-col overflow-hidden rounded-md border-2 border-green-500/40 bg-[#111711]/20 text-white sm:rounded-3xl"
            initial={{ opacity: 0, scale: 0.9, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 25,
            }}
            onClick={(event) => event.stopPropagation()}
          >
            {/* Fixed header */}
            <header className="relative z-20 flex shrink-0 items-center gap-3 border-b border-white/10 bg-[#111711] px-4 py-3 sm:px-6 sm:py-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-green-500/30 bg-green-500/10 text-green-400">
                <Sparkles size={21} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-bold tracking-[0.22em] text-green-400 sm:text-xs">
                  JP'S DEVELOPER PORTFOLIO
                </p>

                <h2 className="truncate text-sm font-extrabold tracking-wide sm:text-base">
                  {location.shortTitle.toUpperCase()}
                </h2>
              </div>

              <button
                type="button"
                aria-label="Close details"
                onClick={onClose}
                className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70 transition-colors hover:border-green-500/50 hover:bg-green-500/10 hover:text-green-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
              >
                <X size={20} />
              </button>
            </header>

            {/* Main content */}
            <div className="grid min-h-0 flex-1 grid-cols-1 grid-rows-[150px_minmax(0,1fr)] overflow-hidden sm:grid-cols-[0.9fr_1.1fr] sm:grid-rows-1">
              {/* Left: horizontal layout on mobile, vertical on desktop */}
              <section className="relative flex min-h-0 flex-row overflow-hidden border-b border-white/10 bg-[#111711]/80 sm:flex-col sm:border-b-0 sm:border-r sm:border-white/10">
                {/* Location information */}
                <div className="relative z-10 flex min-w-0 flex-1 flex-col justify-center space-y-2 p-2 sm:space-y-3 sm:p-6">
                  <div className="inline-flex w-fit items-center gap-2 rounded-full border border-green-500/25 bg-green-500/10 px-2 py-1.5 text-[9px] font-bold tracking-wider text-green-400 sm:px-3 sm:text-xs">
                    <span className="size-1.5 shrink-0 rounded-full bg-green-500" />
                    LOCATION {String(index).padStart(2, "0")}
                  </div>

                  <div className="flex min-w-0 items-start gap-2 sm:gap-3">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-green-500/25 bg-green-500/10 text-green-400 sm:size-12 sm:rounded-xl">
                      <Icon size={19} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h1
                        id="detail-popup-title"
                        className="break-words text-base font-black leading-tight tracking-tight sm:text-2xl lg:text-3xl"
                      >
                        {location.title}
                      </h1>

                      <p className="mt-1 break-words text-[10px] leading-3.5 text-white/60 sm:mt-2 sm:text-sm sm:leading-6">
                        {location.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mascot: right side on mobile, bottom on desktop */}
                <div className="flex w-[30%] min-w-0 shrink-0 items-end justify-center overflow-hidden sm:w-full sm:min-h-0 sm:flex-1">
                  <motion.img
                    key={location.id}
                    src={mascot}
                    alt="JP mascot"
                    draggable={false}
                    className="block h-full max-h-full w-full max-w-[120px] object-contain object-bottom sm:h-auto sm:max-w-[240px]"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.12,
                      duration: 0.4,
                    }}
                  />
                </div>
              </section>

              {/* Right: scrollable details */}
              <section
                aria-label={`${location.shortTitle} details`}
                tabIndex={0}
                className="min-h-0 min-w-0 overflow-x-hidden overflow-y-auto overscroll-contain focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-green-500"
              >
                <div className="space-y-5 p-4 sm:space-y-6 sm:p-7 lg:p-9">
                  {/* Main details */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-extrabold tracking-[0.18em] text-green-400">
                      ABOUT THIS SECTION
                    </h3>

                    <p className="whitespace-pre-line break-words text-sm leading-7 text-white/75 sm:text-base">
                      {location.detail}
                    </p>
                  </div>

                  {/* Next step */}
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
                    <div className="flex items-center gap-2 text-sm font-bold">
                      <Sparkles size={17} className="shrink-0 text-green-400" />
                      <span>EXPLORE FURTHER</span>
                    </div>

                    <p className="mt-2 text-sm leading-6 text-white/55">
                      Want to learn more about{" "}
                      {location.shortTitle.toLowerCase()}? Ask JP to help you
                      explore this section.
                    </p>
                  </div>

                  {/* Primary action */}
                  <button
                    type="button"
                    onClick={onAskJP}
                    className="group flex w-full items-center justify-center gap-3 rounded-xl border border-green-500/50 bg-green-500 px-5 py-4 text-sm font-extrabold text-white transition-colors hover:bg-green-600 active:bg-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#111711]"
                  >
                    Ask JP about this
                    <ArrowRight
                      size={18}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </button>

                  {/* Portfolio progress */}
                  <div className="space-y-3 pb-2">
                    <div className="flex items-center justify-between gap-3 text-[10px] font-bold tracking-widest text-white/45">
                      <span>PORTFOLIO PROGRESS</span>

                      <span className="text-green-400">
                        {String(index).padStart(2, "0")}
                        <span className="mx-2 text-white/25">/</span>
                        {String(totalLocations).padStart(2, "0")}
                      </span>
                    </div>

                    <div
                      className="h-1.5 overflow-hidden rounded-full bg-white/10"
                      role="progressbar"
                      aria-valuenow={Math.max(
                        0,
                        Math.min(index, totalLocations),
                      )}
                      aria-valuemin={0}
                      aria-valuemax={totalLocations}
                      aria-label="Portfolio progress"
                    >
                      <motion.div
                        className="h-full rounded-full bg-green-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
