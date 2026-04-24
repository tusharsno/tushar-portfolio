"use client";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Code2, ArrowRight } from "lucide-react";
import { experience } from "@/data/portfolio";

const typeConfig: Record<string, { icon: typeof Briefcase; label: string }> = {
  work:      { icon: Briefcase,     label: "Work"        },
  education: { icon: GraduationCap, label: "Education"   },
  cp:        { icon: Code2,         label: "Competitive" },
};

export default function Experience() {
  return (
    <section id="experience" className="relative py-28 px-6 overflow-hidden">

      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle, var(--border) 1px, transparent 1px)`,
        backgroundSize: "28px 28px", opacity: 0.5,
      }} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,transparent_40%,var(--background)_100%)] pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-3 mb-14"
        >
          <span className="h-px w-10 bg-[var(--accent)]" />
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--muted)]">Experience</span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="text-4xl sm:text-5xl font-black tracking-tight leading-tight mb-14"
        >
          My Journey<span className="text-[var(--muted)] font-light">.</span>
        </motion.h2>

        {/* Timeline */}
        <div className="relative space-y-5">

          {/* Vertical line */}
          <div className="absolute left-[21px] top-3 bottom-3 w-px bg-gradient-to-b from-[var(--accent)] via-[var(--border)] to-transparent" />

          {experience.map((item, i) => {
            const cfg = typeConfig[item.type];
            const Icon = cfg.icon;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative flex gap-4"
              >
                {/* Icon */}
                <div className="relative z-10 w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 bg-[var(--card)] border border-[var(--border)]">
                  <Icon size={15} className="text-[var(--foreground)]" />
                </div>

                {/* Card */}
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                  className="flex-1 bg-[var(--card)] border border-[var(--border)] rounded-3xl p-5 hover:border-[var(--accent)]/30 hover:shadow-lg transition-all duration-300 mb-1"
                >
                  {/* Header */}
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <div>
                      <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-[var(--muted)]">
                        {cfg.label}
                      </span>
                      <h3 className="font-bold text-base leading-snug mt-0.5">{item.role}</h3>
                      <p className="text-sm text-[var(--muted)] mt-0.5">{item.company}</p>
                    </div>
                    <span className="text-[10px] text-[var(--muted)] bg-[var(--accent-subtle)] border border-[var(--border)] px-3 py-1 rounded-full whitespace-nowrap">
                      {item.period}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-[var(--muted)] text-sm leading-relaxed mb-4 border-l-2 border-[var(--border)] pl-3">
                    {item.description}
                  </p>

                  {/* Highlights */}
                  <div className="flex flex-col gap-1.5 mb-4">
                    {item.highlights.map((h) => (
                      <div key={h} className="flex items-center gap-2 text-xs text-[var(--muted)]">
                        <ArrowRight size={10} className="text-[var(--foreground)] shrink-0" />
                        {h}
                      </div>
                    ))}
                  </div>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {item.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-lg bg-[var(--background)] border border-[var(--border)] text-[var(--muted)]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
