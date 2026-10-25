
import { motion } from "framer-motion";
import { Code2 } from "lucide-react";

type FantasyLoaderProps = {
  label?: string;
  fullscreen?: boolean;
};

export default function FantasyLoader({
  label = "Loading interactive portfolio",
  fullscreen = true,
}: FantasyLoaderProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex flex-col items-center justify-center gap-8
        bg-[#06110d] text-white
        ${fullscreen ? "fixed inset-0 z-[200]" : "min-h-[240px] w-full"}`}
    >
      {/* Minimal animated portal */}
      <div className="relative flex size-24 items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-emerald-400/10 blur-2xl" />

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

        <div className="relative flex size-14 items-center justify-center rounded-full border border-emerald-400/20 bg-[#0a1a12]">
          <Code2
            size={25}
            strokeWidth={1.6}
            className="text-emerald-300"
          />
        </div>
      </div>

      {/* Loading status */}
      <div className="w-full max-w-xs px-5 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">
          JP QUINTANA
        </p>

        <p className="mt-3 text-sm text-slate-400">
          {label}
        </p>

        {/* Animated progress indicator */}
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
