import { motion } from "framer-motion";
import { Code2, ArrowRight } from "lucide-react";

type DevelopmentNoteProps = {
  onContinue: () => void;
};

const particles = [
  { left: "8%", top: "18%", delay: 0, duration: 9, size: 3 },
  { left: "18%", top: "72%", delay: 2, duration: 11, size: 2 },
  { left: "28%", top: "35%", delay: 1, duration: 8, size: 3 },
  { left: "39%", top: "85%", delay: 3, duration: 12, size: 2 },
  { left: "52%", top: "12%", delay: 1.5, duration: 10, size: 3 },
  { left: "63%", top: "76%", delay: 0.5, duration: 9, size: 2 },
  { left: "73%", top: "25%", delay: 2.5, duration: 11, size: 3 },
  { left: "84%", top: "62%", delay: 1, duration: 8, size: 2 },
  { left: "94%", top: "38%", delay: 3.5, duration: 10, size: 3 },
  { left: "12%", top: "48%", delay: 4, duration: 12, size: 2 },
  { left: "47%", top: "60%", delay: 2, duration: 9, size: 2 },
  { left: "89%", top: "88%", delay: 1.5, duration: 11, size: 3 },
];

export default function DevelopmentNote({
  onContinue,
}: DevelopmentNoteProps) {
  return (
    <motion.div
      className="fixed inset-0 z-[190] isolate flex items-center justify-center overflow-hidden bg-[#030b07] px-5 py-6 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Deep forest atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_45%,#103c25_0%,#071b11_38%,#030b07_78%)]"
      />

      {/* Slowly moving magical light */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-[10%] -z-10 size-[420px] rounded-full bg-emerald-500/[0.12] blur-[110px]"
        animate={{
          x: [0, 90, 35, 0],
          y: [0, 55, 110, 0],
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
        className="pointer-events-none absolute -right-40 bottom-[-10%] -z-10 size-[480px] rounded-full bg-lime-400/[0.08] blur-[120px]"
        animate={{
          x: [0, -85, -25, 0],
          y: [0, -65, -110, 0],
          scale: [1, 0.85, 1.15, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Faint magical rings */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[min(90vw,720px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-300/[0.07]"
        animate={{ rotate: 360, scale: [1, 1.04, 1] }}
        transition={{
          rotate: { duration: 100, repeat: Infinity, ease: "linear" },
          scale: { duration: 12, repeat: Infinity, ease: "easeInOut" },
        }}
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[min(70vw,540px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-200/[0.05]"
        animate={{ rotate: -360 }}
        transition={{
          duration: 75,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Floating magical particles */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        {particles.map((particle, index) => (
          <motion.span
            key={index}
            className="absolute rounded-full bg-emerald-200"
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
              boxShadow: "0 0 12px 2px rgba(52, 211, 153, 0.3)",
            }}
            animate={{
              y: [0, -35, -70, -20, 0],
              x: [0, 12, -10, 8, 0],
              opacity: [0.12, 0.7, 0.25, 0.8, 0.12],
              scale: [0.8, 1.3, 0.9, 1.2, 0.8],
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

      {/* Main card */}
      <motion.section
        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-emerald-300/20 bg-[#07150e]/85 p-6 shadow-[0_0_80px_rgba(16,185,129,0.08)] backdrop-blur-xl sm:p-8"
        initial={{ opacity: 0, y: 14, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        {/* Subtle living glow inside the card */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-20 size-56 rounded-full bg-emerald-400/[0.09] blur-[65px]"
          animate={{
            x: [0, -25, 0],
            y: [0, 25, 0],
            opacity: [0.4, 0.9, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Fine top accent */}
        <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/60 to-transparent" />

        <div className="relative z-10">
          <div className="mb-5 flex size-10 items-center justify-center rounded-xl border border-emerald-300/15 bg-emerald-400/10 text-emerald-300">
            <Code2 size={21} />
          </div>

          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-300">
            A personal engineering project
          </p>

          <h1 className="text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
            My idea.
            <span className="text-emerald-400"> Built from scratch.</span>
          </h1>

          <p className="mt-4 text-sm leading-6 text-slate-300/80">
            AI-assisted development, used to solve complex UI and 3D
            challenges—not to generate the entire project.
          </p>

          <button
            type="button"
            onClick={onContinue}
            className="group mt-7 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-400 px-5 py-3 text-sm font-bold text-[#06110d] transition duration-300 hover:bg-emerald-300 hover:shadow-[0_0_28px_rgba(52,211,153,0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#091a12]"
          >
            Explore Portfolio
            <ArrowRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        </div>
      </motion.section>

      {/* Footer */}
      <p className="absolute bottom-5 px-4 text-center text-[10px] tracking-wide text-slate-500/70">
        Designed and developed by JP Quintana
      </p>
    </motion.div>
  );
}