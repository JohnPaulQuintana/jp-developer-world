import { motion } from "framer-motion";
// import { Code2 } from "lucide-react";

type FantasyLoaderProps = {
  label?: string;
  fullscreen?: boolean;
};

const particles = [
  { left: "12%", top: "20%", delay: 0, duration: 7 },
  { left: "24%", top: "75%", delay: 1.2, duration: 9 },
  { left: "38%", top: "16%", delay: 2, duration: 8 },
  { left: "68%", top: "22%", delay: 0.8, duration: 10 },
  { left: "82%", top: "67%", delay: 1.7, duration: 8 },
  { left: "91%", top: "34%", delay: 2.5, duration: 9 },
  { left: "15%", top: "55%", delay: 3, duration: 10 },
  { left: "74%", top: "83%", delay: 0.5, duration: 7 },
  { left: "48%", top: "88%", delay: 2.2, duration: 9 },
  { left: "56%", top: "10%", delay: 1.4, duration: 8 },
  { left: "32%", top: "42%", delay: 3.5, duration: 10 },
  { left: "88%", top: "48%", delay: 0.3, duration: 7 },
];

export default function FantasyLoader({
  label = "Loading interactive portfolio",
  fullscreen = true,
}: FantasyLoaderProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`relative isolate flex flex-col items-center justify-center gap-8
  overflow-hidden
  bg-[radial-gradient(ellipse_at_center,#123d29_0%,#091a11_48%,#06110d_100%)]
  text-white
  ${
    fullscreen
      ? "fixed left-0 top-0 z-[9999] h-[100dvh] min-h-screen w-screen"
      : "relative min-h-[240px] w-full"
  }`}
    >
      {/* Living emerald atmosphere */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-[8%] -z-10 size-96 rounded-full bg-emerald-400/15 blur-[100px]"
        animate={{
          x: [0, 90, 35, 0],
          y: [0, 50, 100, 0],
          scale: [1, 1.2, 0.9, 1],
          opacity: [0.4, 0.8, 0.5, 0.4],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-[4%] -z-10 size-96 rounded-full bg-lime-400/10 blur-[110px]"
        animate={{
          x: [0, -80, -20, 0],
          y: [0, -55, -90, 0],
          scale: [1, 0.85, 1.15, 1],
          opacity: [0.3, 0.7, 0.4, 0.3],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Faint magical circles */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[min(85vw,680px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-300/[0.08]"
        animate={{ rotate: 360 }}
        transition={{
          duration: 90,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <span className="absolute left-1/2 top-0 size-1.5 -translate-x-1/2 rounded-full bg-emerald-200/70 shadow-[0_0_14px_4px_rgba(52,211,153,0.25)]" />
      </motion.div>

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[min(65vw,500px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-300/[0.05]"
        animate={{ rotate: -360 }}
        transition={{
          duration: 65,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Floating magical particles */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        {particles.map((particle, index) => (
          <motion.span
            key={index}
            className="absolute size-1 rounded-full bg-emerald-200"
            style={{
              left: particle.left,
              top: particle.top,
              boxShadow: "0 0 10px 2px rgba(52, 211, 153, 0.3)",
            }}
            animate={{
              y: [0, -28, -55, -12, 0],
              x: [0, 10, -8, 5, 0],
              opacity: [0.1, 0.75, 0.25, 0.65, 0.1],
              scale: [0.7, 1.3, 0.8, 1.2, 0.7],
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

      {/* Original animated portal */}
      <div className="relative flex size-24 items-center justify-center">
        <motion.div
          className="absolute inset-0 rounded-full bg-emerald-400/10 blur-2xl"
          animate={{
            scale: [0.85, 1.25, 0.9, 0.85],
            opacity: [0.4, 0.9, 0.5, 0.4],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute inset-0 rounded-full border border-emerald-400/20"
          animate={{ rotate: 360 }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <motion.div
          className="absolute inset-2 rounded-full border-2 border-emerald-400/70 border-t-transparent border-r-transparent"
          animate={{ rotate: -360 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <div className="relative flex size-14 items-center justify-center overflow-hidden rounded-full border border-emerald-400/20 bg-[#0a1a12]">
          <img
            src="/favicon.png"
            alt="JP Quintana"
            className="size-9 object-contain"
            draggable={false}
          />
        </div>
      </div>

      {/* Original loading status */}
      <div className="relative z-10 w-full max-w-xs px-5 text-center">
        <p className="text-lg font-extrabold uppercase tracking-[0.25em] text-white sm:text-xl">
          JP QUINTANA
        </p>

        <p className="mt-3 text-sm text-slate-400">{label}</p>

        {/* Original animated progress indicator */}
        <div className="mt-5 h-1 overflow-hidden rounded-full bg-white/[0.07]">
          <motion.div
            className="h-full w-1/3 rounded-full bg-emerald-400"
            animate={{ x: ["-100%", "300%"] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>
    </div>
  );
}
