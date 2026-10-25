
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  BriefcaseBusiness,
  CheckCircle2,
  Code2,
  ExternalLink,
  Github,
  ImageOff,
  Lightbulb,
  LoaderCircle,
} from "lucide-react";

import type { PortfolioProject } from "../../data/locations";

type ProjectsSectionProps = {
  projects: PortfolioProject[];
};

type ProjectPreviewProps = {
  image: string;
  name: string;
};

function ProjectPreview({ image, name }: ProjectPreviewProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Reset image state whenever the image source changes.
  useEffect(() => {
    setHasError(false);
    setIsLoaded(false);
  }, [image]);

  const handleImageError = (
    event: React.SyntheticEvent<HTMLImageElement>,
  ) => {
    const img = event.currentTarget;

    console.error("[ProjectsSection] Failed to load project image", {
      project: name,
      imageSource: image,
      resolvedURL: img.src,
      status: "Image failed to load",
    });

    setHasError(true);
    setIsLoaded(false);
  };

  if (!image || hasError) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-[#091b13] text-emerald-400/60">
        <ImageOff size={28} strokeWidth={1.5} />

        <span className="max-w-[85%] break-all text-center text-[10px] text-slate-400">
          {!image ? "Image path missing" : "Preview unavailable"}
        </span>

        {!image && (
          <span className="text-[9px] text-slate-500">
            {name}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#091b13]">
      {!isLoaded && (
        <div className="absolute inset-0 z-[1] flex items-center justify-center text-emerald-400/60">
          <LoaderCircle
            size={24}
            strokeWidth={1.5}
            className="animate-spin"
          />
        </div>
      )}

      <img
        key={image}
        src={image}
        alt={`${name} project preview`}
        loading="lazy"
        decoding="async"
        onLoad={() => {
          setIsLoaded(true);
          console.info(
            `[ProjectsSection] Image loaded successfully: ${name}`,
            image,
          );
        }}
        onError={handleImageError}
        className={`h-full w-full object-cover object-top transition-all duration-500 group-hover:scale-[1.03] ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}

export default function ProjectsSection({
  projects,
}: ProjectsSectionProps) {
  const [expandedProjects, setExpandedProjects] = useState<string[]>([]);

  const toggleExpanded = (id: string) => {
    setExpandedProjects((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:gap-5">
      {projects.map((project, index) => {
        const expanded = expandedProjects.includes(project.id);

        return (
          <motion.article
            key={project.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              delay: index * 0.05,
            }}
            className="group relative min-w-0 overflow-hidden rounded-xl border border-emerald-400/20 bg-[#07140e] transition-colors hover:border-emerald-400/40 sm:rounded-2xl"
          >
            {/* Project image preview */}
            <div className="relative aspect-[16/7] overflow-hidden bg-[#091b13] sm:aspect-[16/9]">
              <ProjectPreview
                image={project.image}
                name={project.name}
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#07140e]/90 via-transparent to-black/15" />

              <span className="absolute left-2.5 top-2.5 max-w-[65%] truncate rounded-md border border-white/10 bg-black/65 px-2 py-1 text-[9px] font-semibold text-emerald-200 backdrop-blur-sm sm:left-3 sm:top-3 sm:px-2.5 sm:text-[10px]">
                {project.category}
              </span>

              <span className="absolute bottom-2.5 right-2.5 rounded-full border border-white/10 bg-black/65 px-2 py-1 text-[9px] text-white/85 backdrop-blur-sm sm:bottom-3 sm:right-3 sm:text-[10px]">
                {project.status}
              </span>
            </div>

            {/* Project information */}
            <div className="p-3.5 sm:p-5">
              <div className="flex items-start gap-2.5">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-emerald-400/20 bg-emerald-400/[0.07] text-emerald-400 sm:size-10">
                  <Code2 size={18} />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="break-words text-base font-bold leading-tight text-white sm:text-lg">
                    {project.name}
                  </h3>

                  <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-slate-400 sm:text-sm sm:leading-6">
                    {project.summary}
                  </p>
                </div>
              </div>

              {/* Technology chips */}
              <div className="mt-3 flex flex-wrap gap-1.5 sm:mt-4 sm:gap-2">
                {project.technologies.map((technology) => (
                  <span
                    key={technology}
                    className="rounded-md border border-emerald-400/15 bg-emerald-400/[0.05] px-2 py-1 text-[9px] font-medium text-emerald-100/80 sm:text-[10px]"
                  >
                    {technology}
                  </span>
                ))}
              </div>

              {/* Expandable problem and solution */}
              {expanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.25 }}
                  className="mt-4 space-y-3 overflow-hidden border-t border-white/[0.07] pt-4"
                >
                  <div className="rounded-lg border border-rose-300/10 bg-rose-400/[0.035] p-3">
                    <div className="mb-1.5 flex items-center gap-2 text-rose-200/90">
                      <BriefcaseBusiness size={14} />

                      <h4 className="text-[10px] font-bold uppercase tracking-wider">
                        The problem
                      </h4>
                    </div>

                    <p className="text-xs leading-5 text-slate-300/75">
                      {project.businessProblem}
                    </p>
                  </div>

                  <div className="rounded-lg border border-emerald-300/10 bg-emerald-400/[0.035] p-3">
                    <div className="mb-1.5 flex items-center gap-2 text-emerald-300">
                      <Lightbulb size={14} />

                      <h4 className="text-[10px] font-bold uppercase tracking-wider">
                        The solution
                      </h4>
                    </div>

                    <p className="text-xs leading-5 text-slate-300/75">
                      {project.solution}
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Expand/collapse controls */}
              <div className="mt-3 flex items-center justify-between gap-2 border-t border-white/[0.07] pt-3 sm:mt-4 sm:pt-4">
                <button
                  type="button"
                  onClick={() => toggleExpanded(project.id)}
                  aria-expanded={expanded}
                  className="inline-flex min-h-9 items-center gap-1.5 rounded-lg px-1 text-[10px] font-semibold text-slate-400 transition-colors hover:text-emerald-300 sm:text-xs"
                >
                  <CheckCircle2 size={13} />

                  {expanded ? "Less details" : "More details"}

                  <ArrowDown
                    size={12}
                    className={`transition-transform duration-200 ${
                      expanded ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <span className="text-[9px] text-slate-500">
                  {project.technologies.length} technologies
                </span>
              </div>

              {/* Project links */}
              <div className="mt-3 grid grid-cols-2 gap-2">
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-lg bg-emerald-400 px-2 py-2 text-[10px] font-bold text-[#04110d] transition-colors hover:bg-emerald-300 sm:text-xs"
                  >
                    <ExternalLink size={14} />
                    Live Preview
                    <ArrowUpRight size={12} />
                  </a>
                ) : (
                  <span
                    title="Live preview not available yet"
                    className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.025] px-2 py-2 text-center text-[10px] text-slate-500 sm:text-xs"
                  >
                    <ExternalLink size={14} />
                    Preview soon
                  </span>
                )}

                {project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-2 py-2 text-[10px] font-semibold text-white/85 transition-colors hover:border-emerald-400/35 hover:text-emerald-300 sm:text-xs"
                  >
                    <Github size={15} />
                    GitHub
                    <ArrowUpRight size={12} />
                  </a>
                ) : (
                  <span
                    title="GitHub repository not available yet"
                    className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.025] px-2 py-2 text-[10px] text-slate-500 sm:text-xs"
                  >
                    <Github size={15} />
                    Source soon
                  </span>
                )}
              </div>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
}
