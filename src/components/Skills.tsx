"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skills } from "@/data/portfolio";
import {
  siReact, siNextdotjs, siTypescript, siTailwindcss, siFramer,
  siHtml5, siNodedotjs, siExpress, siPrisma, siPostgresql,
  siMysql, siJavascript, siPython, siCplusplus,
  siGit, siGithub, siDocker, siVercel, siLinux, siFigma, siPostman,
  siScikitlearn, siPandas, siFlask, siSqlite, siOpenjdk,
} from "simple-icons";

type SimpleIcon = { path: string; hex: string; title: string };

// Map skill name → simple-icon
const iconMap: Record<string, SimpleIcon> = {
  "React":           siReact,
  "Next.js":         siNextdotjs,
  "TypeScript":      siTypescript,
  "Tailwind CSS":    siTailwindcss,
  "Framer Motion":   siFramer,
  "HTML/CSS":        siHtml5,
  "Node.js":         siNodedotjs,
  "Express":         siExpress,
  "Prisma":          siPrisma,
  "PostgreSQL":      siPostgresql,
  "REST APIs":       siNodedotjs,
  "MySQL":           siMysql,
  "JavaScript":      siJavascript,
  "Java":            siOpenjdk,
  "Python":          siPython,
  "C/C++":           siCplusplus,
  "Java OOP":        siOpenjdk,
  "Java Swing":      siOpenjdk,
  "GUI Design":      siFigma,
  "Hotel Mgmt App":  siSqlite,
  "Scientific Calculator": siPython,
  "Scikit-learn":    siScikitlearn,
  "Pandas":          siPandas,
  "Flask":           siFlask,
  "Data Analysis":   siPandas,
  "Git":             siGit,
  "GitHub":          siGithub,
  "Docker":          siDocker,
  "Vercel":          siVercel,
  "Linux":           siLinux,
  "Figma":           siFigma,
  "Postman":         siPostman,
};

function SkillIcon({ name }: { name: string }) {
  const icon = iconMap[name];
  if (!icon) return null;
  return (
    <svg
      viewBox="0 0 24 24"
      width="15"
      height="15"
      fill={`#${icon.hex}`}
      className="shrink-0"
      aria-label={icon.title}
    >
      <path d={icon.path} />
    </svg>
  );
}

export default function Skills() {
  const [active, setActive] = useState(0);
  const current = skills[active];

  return (
    <section id="skills" className="relative py-28 px-6">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--border-2)] to-transparent" />

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-3 mb-14"
        >
          <span className="h-px w-10 bg-[var(--accent)]" />
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--muted)]">Skills</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="text-4xl sm:text-5xl font-black tracking-tight leading-tight mb-10"
        >
          What I Work With<span className="text-[var(--muted)] font-light">.</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="border border-[var(--border)] rounded-3xl overflow-hidden"
          style={{ background: "linear-gradient(135deg, var(--card) 0%, var(--card-2) 100%)" }}
        >
          <div className="flex flex-col sm:flex-row">

            {/* Tab sidebar */}
            <div className="sm:w-56 shrink-0 border-b sm:border-b-0 sm:border-r border-[var(--border)] p-2 flex sm:flex-col gap-1 overflow-x-auto sm:overflow-visible">
              {skills.map((group, i) => (
                <button
                  key={group.category}
                  onClick={() => setActive(i)}
                  className={`relative flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 w-full text-left ${
                    active === i
                      ? "text-[var(--foreground)]"
                      : "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--accent-subtle)]"
                  }`}
                >
                  {active === i && (
                    <motion.div
                      layoutId="tab-bg"
                      className="absolute inset-0 rounded-xl bg-[var(--accent-subtle)] border border-[var(--border-2)]"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                  <span className="relative z-10 text-base">{group.emoji}</span>
                  <span className="relative z-10 text-xs font-semibold">{group.category}</span>
                  {active === i && (
                    <span className="relative z-10 ml-auto text-[10px] font-bold text-[var(--muted)] bg-[var(--background)] border border-[var(--border)] px-1.5 py-0.5 rounded-md">
                      {group.items.length}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Pill panel */}
            <div className="flex-1 p-6 sm:p-8 min-h-[260px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Panel header */}
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-[var(--border)]">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{current.emoji}</span>
                      <div>
                        <h3 className="font-bold text-sm text-[var(--foreground)]">{current.category}</h3>
                        <p className="text-[10px] text-[var(--muted)]">{current.items.length} technologies</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold text-[var(--muted)] bg-[var(--background)] border border-[var(--border)] px-2.5 py-1 rounded-full">
                      {active + 1} / {skills.length}
                    </span>
                  </div>

                  {/* Pills with icons */}
                  <div className="flex flex-wrap gap-2">
                    {current.items.map((skill, i) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.15, delay: i * 0.04 }}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] hover:bg-[var(--accent)] hover:text-[var(--btn-text)] hover:border-[var(--accent)] hover:shadow-md transition-all duration-200 cursor-default group"
                      >
                        <span className="group-hover:brightness-0 group-hover:invert transition-all duration-200">
                          <SkillIcon name={skill} />
                        </span>
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
