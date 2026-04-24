"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skills } from "@/data/portfolio";

export default function Skills() {
  const [active, setActive] = useState(0);
  const current = skills[active];

  return (
    <section id="skills" className="relative py-28 px-6 overflow-hidden">

      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle, var(--border) 1px, transparent 1px)`,
        backgroundSize: "28px 28px", opacity: 0.5,
      }} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,transparent_40%,var(--background)_100%)] pointer-events-none" />

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

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="text-4xl sm:text-5xl font-black tracking-tight leading-tight mb-10"
        >
          What I Work With<span className="text-[var(--muted)] font-light">.</span>
        </motion.h2>

        {/* Bento panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-[var(--card)] border border-[var(--border)] rounded-3xl overflow-hidden"
        >
          <div className="flex flex-col sm:flex-row">

            {/* Tab sidebar */}
            <div className="sm:w-52 shrink-0 border-b sm:border-b-0 sm:border-r border-[var(--border)] p-2 flex sm:flex-col gap-1 overflow-x-auto sm:overflow-visible">
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
                      className="absolute inset-0 rounded-xl bg-[var(--accent-subtle)]"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                  <span className="relative z-10 text-base">{group.emoji}</span>
                  <span className="relative z-10 text-xs">{group.category}</span>
                  {active === i && (
                    <span className="relative z-10 ml-auto w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0" />
                  )}
                </button>
              ))}
            </div>

            {/* Pill panel */}
            <div className="flex-1 p-6 sm:p-8 min-h-[240px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Panel header */}
                  <div className="flex items-center gap-2 mb-6 pb-4 border-b border-[var(--border)]">
                    <span className="text-2xl">{current.emoji}</span>
                    <div>
                      <h3 className="font-bold text-sm">{current.category}</h3>
                      <p className="text-[10px] text-[var(--muted)]">{current.items.length} skills</p>
                    </div>
                  </div>

                  {/* Pills */}
                  <div className="flex flex-wrap gap-2">
                    {current.items.map((skill, i) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.88 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.18, delay: i * 0.04 }}
                        className="px-3 py-1.5 rounded-xl text-xs font-medium border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] hover:bg-[var(--accent)] hover:text-[var(--btn-text)] hover:border-[var(--accent)] transition-all duration-200 cursor-default"
                      >
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
