import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import mascot from "../../assets/me.JPG";
type DevelopmentNoteProps = {
  onContinue: () => void;
};

const particles = [
  { left: "8%", top: "18%", delay: 0, duration: 9 },
  { left: "18%", top: "72%", delay: 2, duration: 11 },
  { left: "34%", top: "25%", delay: 1, duration: 8 },
  { left: "48%", top: "82%", delay: 3, duration: 12 },
  { left: "63%", top: "15%", delay: 1.5, duration: 10 },
  { left: "75%", top: "68%", delay: 0.5, duration: 9 },
  { left: "89%", top: "32%", delay: 2.5, duration: 11 },
  { left: "94%", top: "85%", delay: 1, duration: 8 },
];

export default function DevelopmentNote({ onContinue }: DevelopmentNoteProps) {
  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-title"
      className="fixed inset-0 z-[190] isolate flex items-center justify-center overflow-hidden px-3 py-3 sm:px-5 sm:py-4 ..."
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      {/* Cinematic atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_50%,rgba(16,185,129,0.09)_0%,transparent_65%)]"
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-[10%] -z-10 size-[min(80vw,420px)] rounded-full bg-emerald-500/10 blur-[100px]"
        animate={{
          x: [0, 70, 20, 0],
          y: [0, 45, 90, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-0 -z-10 size-[min(80vw,400px)] rounded-full bg-lime-400/[0.08] blur-[110px]"
        animate={{
          x: [0, -65, -20, 0],
          y: [0, -45, -85, 0],
          scale: [1, 0.9, 1.15, 1],
        }}
        transition={{
          duration: 21,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating forest lights */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        {particles.map((particle, index) => (
          <motion.span
            key={index}
            className="absolute size-1 rounded-full bg-emerald-200"
            style={{
              left: particle.left,
              top: particle.top,
              boxShadow: "0 0 14px 3px rgba(52,211,153,0.3)",
            }}
            animate={{
              y: [0, -25, -55, -15, 0],
              x: [0, 10, -8, 6, 0],
              opacity: [0.1, 0.7, 0.2, 0.8, 0.1],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Cinematic frame */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-2 -z-10 rounded-2xl sm:inset-5"
      />

      {/* Responsive welcome panel */}
      <motion.section
        className="relative my-auto w-full max-w-xl shrink-0 overflow-hidden rounded-2xl border border-emerald-200/20 bg-[#06130c]/85 shadow-[0_20px_100px_rgba(0,0,0,0.45),0_0_55px_rgba(16,185,129,0.08)] backdrop-blur-2xl"
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.65, delay: 0.12 }}
      >
        <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/80 to-transparent" />

        {/* Ambient highlight */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-24 size-64 rounded-full bg-emerald-400/[0.09] blur-[80px]"
          animate={{
            x: [0, -20, 0],
            y: [0, 25, 0],
            opacity: [0.4, 0.9, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="relative p-5 sm:p-7 md:p-8">
          {/* Personal branding */}
          <div className="flex items-center gap-3">
            <motion.div
              className="relative size-16 shrink-0 rounded-2xl border border-emerald-300/40 bg-emerald-400/10 p-1 shadow-lg sm:size-20"
              animate={{
                boxShadow: [
                  "0 0 12px rgba(52,211,153,0.08)",
                  "0 0 30px rgba(52,211,153,0.22)",
                  "0 0 12px rgba(52,211,153,0.08)",
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <img
                src={mascot}
                alt="JP Quintana profile"
                className="size-full rounded-xl object-cover object-center"
                style={{
                  imageRendering: "auto",
                  backfaceVisibility: "hidden",
                  transform: "translateZ(0)",
                }}
                draggable={false}
              />

              <span className="absolute -right-2 -top-2 flex size-6 items-center justify-center rounded-full border border-emerald-200/30 bg-[#06130c]">
                <Sparkles size={13} className="text-lime-200" />
              </span>
            </motion.div>

            <div>
              <p className="text-sm font-bold tracking-[0.16em] text-white">
                JP QUINTANA
              </p>
              <p className="mt-0.5 text-[9px] font-medium uppercase tracking-[0.15em] text-emerald-300/80 sm:text-[10px] sm:tracking-[0.19em]">
                Developer · Creator · Engineer
              </p>
            </div>
          </div>

          {/* Welcome message */}
          <div className="mt-6 sm:mt-7">
            <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.24em] text-emerald-300 sm:mb-3 sm:text-[10px] sm:tracking-[0.28em]">
              A world built through code
            </p>

            <h1
              id="welcome-title"
              className="max-w-md text-3xl font-bold leading-[1.08] tracking-tight text-white sm:text-4xl md:text-5xl"
            >
              Welcome to
              <span className="mt-1 block bg-gradient-to-r from-emerald-200 via-emerald-400 to-lime-200 bg-clip-text text-transparent sm:mt-2">
                my portfolio.
              </span>
            </h1>

            <p className="mt-3 max-w-md text-sm leading-6 text-slate-300/85 sm:mt-4 sm:leading-7 md:text-base">
              An interactive journey through the projects, ideas, and
              experiments I've brought to life. Explore the islands and discover
              what I've been building.
            </p>
          </div>

          {/* AI-assisted development disclosure */}
          <div className="mt-5 flex gap-3 border-l-2 border-emerald-400/50 pl-3 sm:mt-6 sm:pl-4">
            <Sparkles
              size={15}
              className="mt-0.5 shrink-0 text-emerald-300/80"
            />
            <p className="text-[11px] leading-5 text-slate-400 sm:text-xs sm:leading-6">
              Built through hands-on engineering, 3D experimentation, and
              AI-assisted tools to explore complex ideas and bring this
              experience to life.
            </p>
          </div>

          {/* Enter portfolio */}
          <div className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:items-center sm:gap-4">
            <motion.button
              type="button"
              onClick={onContinue}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group flex min-h-11 w-full items-center justify-center gap-3 rounded-xl bg-emerald-400 px-5 py-3 text-sm font-bold text-[#041009] shadow-[0_0_25px_rgba(52,211,153,0.12)] transition-colors hover:bg-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200 focus-visible:ring-offset-2 focus-visible:ring-offset-[#06130c] sm:w-auto sm:min-w-48"
            >
              Explore My Portfolio
              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </motion.button>
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-emerald-300/20 to-transparent" />
      </motion.section>
    </motion.div>
  );
}
