"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { projects } from "@/data/portfolio";

const tabs = ["All", "Full Stack", "Machine Learning"];

type Project = typeof projects[number];

function FeaturedCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -4 }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="group relative p-[1px] rounded-xl col-span-full"
      style={{ "--mouse-x": "50%", "--mouse-y": "50%" } as React.CSSProperties}
    >
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.9), rgba(255,255,255,0.5) 40%, transparent 65%)` }}
      />
      <article className="relative z-10 bg-[var(--card)] border border-transparent group-hover:border-[var(--border)] rounded-xl overflow-hidden grid md:grid-cols-[1.4fr_1fr] gap-0 transition-colors duration-300 hover:shadow-2xl">
        {/* Left — screenshot */}
        <div className="relative h-64 md:h-auto overflow-hidden bg-[var(--card-2)]">
          {project.image ? (
            <>
              <Image src={project.image} alt={project.title} fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 60vw"
              />
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-6xl">{project.emoji}</div>
          )}
        </div>
        {/* Right — content */}
        <div className="flex flex-col gap-4 p-7 justify-center">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-semibold tracking-widest uppercase text-[var(--accent)] border border-[var(--accent)]/30 bg-[var(--accent-subtle)] px-2.5 py-1 rounded-full">Featured</span>
            <span className="text-sm">{project.emoji}</span>
          </div>
          <h3 className="text-2xl font-black tracking-tight group-hover:text-[var(--accent)] transition-colors duration-200">
            {project.title}
          </h3>
          <p className="text-[var(--muted)] text-sm leading-relaxed">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.tech.map((t) => (
              <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded-lg bg-[var(--background)] border border-[var(--border)] text-[var(--muted)]">{t}</span>
            ))}
          </div>
          <div className="flex gap-3 pt-2">
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--accent)] text-[var(--btn-text)] text-xs font-semibold hover:opacity-90 transition-opacity">
                Live Demo <ArrowUpRight size={12} />
              </a>
            )}
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] text-xs font-semibold hover:bg-[var(--accent-subtle)] transition-colors">
                <GithubIcon /> Source
              </a>
            )}
          </div>
        </div>
      </article>
    </motion.div>
  );
}

function ProjectCard({ project, i }: { project: Project; i: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3, delay: i * 0.06 }}
      whileHover={{ y: -4 }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="group relative p-[1px] rounded-xl flex flex-col"
      style={{ "--mouse-x": "50%", "--mouse-y": "50%" } as React.CSSProperties}
    >
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(300px circle at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.5) 40%, transparent 65%)`,
        }}
      />
      <article className="relative z-10 bg-[var(--card)] border border-transparent group-hover:border-[var(--border)] rounded-xl overflow-hidden flex flex-col h-full transition-colors duration-300 hover:shadow-2xl">
        {/* Screenshot preview */}
        <div className="relative w-full h-64 overflow-hidden bg-[var(--card-2)] shrink-0">
          {project.image ? (
            <>
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[var(--card)] to-transparent" />
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-4xl">
              {project.emoji}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col gap-3 p-5 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-base leading-snug group-hover:text-[var(--accent)] transition-colors duration-200">
              {project.title}
            </h3>
            <span className="text-lg shrink-0">{project.emoji}</span>
          </div>

          <p className="text-[var(--muted)] text-sm leading-relaxed line-clamp-2 flex-1">
            {project.description}
          </p>

          <div className="flex items-center justify-between pt-3 border-t border-[var(--border)]">
            <div className="flex flex-wrap gap-1.5">
              {project.tech.slice(0, 3).map((t) => (
                <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded-lg bg-[var(--background)] border border-[var(--border)] text-[var(--muted)]">
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
          <div className="flex gap-2">
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--accent)] text-[var(--btn-text)] text-xs font-semibold hover:opacity-90 transition-opacity">
                Live Demo <ArrowUpRight size={11} />
              </a>
            )}
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-xs font-semibold hover:bg-[var(--accent-subtle)] transition-colors">
                <GithubIcon /> Source
              </a>
            )}
          </div>
        </div>
      </article>
    </motion.div>
  );
}

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
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-2 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => {
              const isFeatured = i === 0 && project.featured && active === "All";
              return isFeatured
                ? <FeaturedCard key={project.title} project={project} />
                : <ProjectCard key={project.title} project={project} i={i} />;
            })}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
