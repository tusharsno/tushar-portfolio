"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/portfolio";

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const tabs = ["All", "Full Stack", "Machine Learning"];

export default function Projects() {
  const [active, setActive] = useState("All");

  const filtered = active === "All"
    ? projects
    : projects.filter((p) => p.category === active);

  return (
    <section id="projects" className="relative py-28 px-6">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--border-2)] to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-3 mb-14"
        >
          <span className="h-px w-10 bg-[var(--accent)]" />
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--muted)]">Projects</span>
        </motion.div>

        {/* Heading + filter row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-4xl sm:text-5xl font-black tracking-tight leading-tight"
          >
            Things I&apos;ve Built<span className="text-[var(--muted)] font-light">.</span>
          </motion.h2>

          {/* Filter tabs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex items-center gap-1.5 bg-[var(--card)] border border-[var(--border)] rounded-full p-1"
          >
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActive(tab)}
                className={`relative px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  active === tab
                    ? "text-[var(--btn-text)]"
                    : "text-[var(--muted)] hover:text-[var(--foreground)]"
                }`}
              >
                {active === tab && (
                  <motion.span
                    layoutId="pill"
                    className="absolute inset-0 rounded-full bg-[var(--accent)]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <span className="relative z-10">{tab}</span>
              </button>
            ))}
          </motion.div>
        </div>

        {/* Cards */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.article
                key={project.title}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
                whileHover={{ y: -4 }}
                className="group bg-[var(--card)] border border-[var(--border)] rounded-3xl p-6 flex flex-col gap-4 hover:border-[var(--accent)]/30 hover:shadow-xl transition-all duration-300"
              >
                {/* Top row */}
                <div className="flex items-start justify-between">
                  <span className="text-2xl">{project.emoji}</span>
                  <div className="flex items-center gap-1">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Source"
                        className="p-2 rounded-xl text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--accent-subtle)] transition-all duration-150"
                      >
                        <GithubIcon />
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Live demo"
                        className="p-2 rounded-xl text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--accent-subtle)] transition-all duration-150"
                      >
                        <ArrowUpRight size={14} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Title + description */}
                <div className="flex-1 space-y-2">
                  <h3 className="font-bold text-base leading-snug group-hover:text-[var(--accent)] transition-colors duration-200">
                    {project.title}
                  </h3>
                  <p className="text-[var(--muted)] text-sm leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-[var(--border)]">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-lg bg-[var(--background)] border border-[var(--border)] text-[var(--muted)]"
                      >
                        {t}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-lg bg-[var(--background)] border border-[var(--border)] text-[var(--muted)]">
                        +{project.tech.length - 3}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-[var(--accent-subtle)] border border-[var(--border)] text-[var(--muted)] shrink-0">
                    {project.category}
                  </span>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
