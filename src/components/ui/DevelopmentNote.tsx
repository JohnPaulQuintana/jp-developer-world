
import { motion } from "framer-motion";
import { Code2, ArrowRight } from "lucide-react";

type DevelopmentNoteProps = {
  onContinue: () => void;
};

export default function DevelopmentNote({
  onContinue,
}: DevelopmentNoteProps) {
  return (
    <motion.div
      className="fixed inset-0 z-[190] flex items-center justify-center bg-[#06110d]/95 px-5 py-6 text-white backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.section
        className="w-full max-w-md rounded-2xl border border-emerald-400/20 bg-[#091a12] p-6 shadow-2xl sm:p-8"
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35, delay: 0.1 }}
      >
        <div className="mb-5 flex size-10 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
          <Code2 size={21} />
        </div>

        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400">
          A personal engineering project
        </p>

        <h1 className="text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
          My idea.
          <span className="text-emerald-400"> Built from scratch.</span>
        </h1>

        <p className="mt-4 text-sm leading-6 text-slate-400">
          AI-assisted development, used to solve complex UI and 3D
          challenges—not to generate the entire project.
        </p>

        <button
          type="button"
          onClick={onContinue}
          className="mt-7 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-400 px-5 py-3 text-sm font-bold text-[#06110d] transition hover:bg-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#091a12]"
        >
          Explore Portfolio
          <ArrowRight size={17} />
        </button>
      </motion.section>

      <p className="absolute bottom-5 px-4 text-center text-[10px] tracking-wide text-slate-600">
        Designed and developed by JP Quintana
      </p>
    </motion.div>
  );
}
