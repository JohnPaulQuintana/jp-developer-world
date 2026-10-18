
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

type FantasyLoaderProps = {
  label?: string;
  fullscreen?: boolean;
};

export default function FantasyLoader({
  label = "Preparing your adventure",
  fullscreen = true,
}: FantasyLoaderProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio("/sounds/portal-opening.wav");

    audio.volume = 0.6;
    audioRef.current = audio;

    // Browsers may block autoplay until the visitor interacts.
    void audio.play().catch(() => {
      // The visual loader still works if audio is blocked.
    });

    return () => {
      audio.pause();
      audio.currentTime = 0;
      audioRef.current = null;
    };
  }, []);

  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex flex-col items-center justify-center gap-6
        bg-[#06110d] text-white
        ${fullscreen ? "fixed inset-0 z-[200]" : "min-h-[240px] w-full"}`}
    >
      {/* Magical portal */}
      <div className="relative flex size-40 items-center justify-center sm:size-48">
        <div className="absolute inset-0 rounded-full bg-green-500/10 blur-3xl" />

        <motion.div
          className="absolute inset-2 rounded-full border border-dashed border-green-400/30"
          animate={{ rotate: 360 }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        />

        <motion.div
          className="absolute inset-5 rounded-full border-2 border-green-400/70
            border-t-transparent border-l-transparent shadow-[0_0_24px_rgba(25,245,138,0.15)]"
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />

        <motion.div
          className="absolute inset-8 rounded-full border border-green-300/40
            border-b-transparent border-r-transparent"
          animate={{ rotate: -360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />

        <motion.div
          className="relative flex size-20 items-center justify-center
            rounded-full border border-green-400/40 bg-[#0b2016]
            shadow-[0_0_35px_rgba(25,245,138,0.18)] sm:size-24"
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Sparkles
            size={38}
            strokeWidth={1.3}
            className="text-green-300 drop-shadow-[0_0_10px_rgba(25,245,138,0.8)]"
          />
        </motion.div>

        {/* Floating magical particles */}
        {[0, 1, 2, 3].map((particle) => (
          <motion.span
            key={particle}
            className="absolute size-1.5 rounded-full bg-green-300
              shadow-[0_0_10px_rgba(25,245,138,0.9)]"
            style={{
              left: `${20 + particle * 20}%`,
              top: particle % 2 === 0 ? "18%" : "78%",
            }}
            animate={{
              y: [-5, 6, -5],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 2 + particle * 0.35,
              repeat: Infinity,
              ease: "easeInOut",
              delay: particle * 0.25,
            }}
          />
        ))}
      </div>

      {/* Welcome to the realm */}
      <div className="space-y-3 px-5 text-center">
        <motion.h2
          className="text-sm font-extrabold tracking-[0.25em] text-green-100 sm:text-base"
          animate={{
            opacity: [0.65, 1, 0.65],
            textShadow: [
              "0 0 8px rgba(25,245,138,0.2)",
              "0 0 18px rgba(25,245,138,0.65)",
              "0 0 8px rgba(25,245,138,0.2)",
            ],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          ENTERING JP&apos;S REALM
        </motion.h2>

        <p className="text-sm tracking-wide text-green-200/60">
          {label}...
        </p>

        <div className="mx-auto flex w-44 gap-1.5 sm:w-52">
          {Array.from({ length: 12 }, (_, index) => (
            <motion.span
              key={index}
              className="h-1 flex-1 rounded-full bg-green-400"
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                delay: index * 0.1,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
