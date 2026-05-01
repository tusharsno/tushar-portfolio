"use client";
import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, GraduationCap, Code2, CheckCircle2 } from "lucide-react";

function YoutubeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z"/>
    </svg>
  );
}
import { experience } from "@/data/portfolio";

const typeConfig: Record<string, {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  textColor: string;
  borderColor: string;
  glowColor: string;
  badgeBg: string;
}> = {
  work: {
    icon: Briefcase,
    label: "Work Experience",
    textColor: "text-[var(--foreground)]",
    borderColor: "border-l-[var(--foreground)]",
    glowColor: "rgba(237,237,237,0.06)",
    badgeBg: "bg-[var(--accent-subtle)] border-[var(--border-2)] text-[var(--muted)]",
  },
  education: {
    icon: GraduationCap,
    label: "Education",
    textColor: "text-blue-400",
    borderColor: "border-l-blue-400",
    glowColor: "rgba(96,165,250,0.06)",
    badgeBg: "bg-blue-500/10 border-blue-500/20 text-blue-400",
  },
  youtube: {
    icon: YoutubeIcon,
    label: "Content Creator",
    textColor: "text-red-400",
    borderColor: "border-l-red-400",
    glowColor: "rgba(248,113,113,0.06)",
    badgeBg: "bg-red-500/10 border-red-500/20 text-red-400",
  },
  cp: {
    icon: Code2,
    label: "Competitive Programming",
    textColor: "text-emerald-400",
    borderColor: "border-l-emerald-400",
    glowColor: "rgba(52,211,153,0.06)",
    badgeBg: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
  },
};

function TimelineItem({ item, i }: { item: typeof experience[0]; i: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const cfg = typeConfig[item.type];
  const Icon = cfg.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: i * 0.13, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="relative grid grid-cols-[44px_1fr] gap-4 sm:gap-6"
    >
      {/* Left — icon dot + animated line */}
      <div className="flex flex-col items-center">
        <div className={`relative z-10 w-11 h-11 rounded-lg flex items-center justify-center shrink-0 border bg-[var(--card)] border-[var(--border)]`}>
          <Icon size={15} className={cfg.textColor} />
        </div>
        {i < experience.length - 1 && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.7, delay: i * 0.13 + 0.3, ease: "easeOut" }}
            style={{ originY: 0 }}
            className="w-px flex-1 mt-2 bg-gradient-to-b from-[var(--border-2)] to-transparent"
          />
        )}
      </div>

      {/* Right — premium card */}
      <div className="pb-10">
        <motion.div
          whileHover={{ x: 4, transition: { duration: 0.2 } }}
          className={`relative overflow-hidden rounded-xl border border-[var(--border)] border-l-2 ${cfg.borderColor} transition-all duration-300 hover:shadow-2xl`}
          style={{
            background: `linear-gradient(135deg, var(--card) 0%, var(--card-2) 100%)`,
          }}
        >
          {/* Subtle glow behind card based on type */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl"
            style={{ background: `radial-gradient(ellipse at 0% 50%, ${cfg.glowColor} 0%, transparent 60%)` }}
          />

          <div className="relative p-5 sm:p-6">

            {/* ── Top row: role + period ── */}
            <div className="flex flex-wrap items-start justify-between gap-3 mb-1">
              <div>
                <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.18em] uppercase ${cfg.textColor} mb-1.5`}>
                  <Icon size={9} />
                  {cfg.label}
                </span>
                <h3 className="font-black text-lg leading-tight text-[var(--foreground)]">
                  {item.role}
                </h3>
              </div>
              <span className={`text-[10px] font-semibold px-3 py-1.5 rounded-full border whitespace-nowrap ${cfg.badgeBg}`}>
                {item.period}
              </span>
            </div>

            {/* Company */}
            <p className={`text-sm font-semibold mb-4 ${cfg.textColor}`}>
              @ {item.company}
            </p>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-[var(--border)] via-[var(--border-2)] to-transparent mb-4" />

            {/* Description */}
            <p className="text-[var(--muted)] text-sm leading-relaxed mb-5">
              {item.description}
            </p>

            {/* Highlights */}
            <div className="grid sm:grid-cols-2 gap-2 mb-5">
              {item.highlights.map((h) => (
                <div
                  key={h}
                  className="flex items-start gap-2 text-xs text-[var(--muted)] bg-[var(--background)] border border-[var(--border)] rounded-lg px-3 py-2"
                >
                  <CheckCircle2 size={11} className={`${cfg.textColor} shrink-0 mt-0.5`} />
                  {h}
                </div>
              ))}
            </div>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-1.5">
              {item.tech.map((t) => (
                <span
                  key={t}
                  className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-[var(--background)] border border-[var(--border)] text-[var(--muted)] hover:border-[var(--border-2)] hover:text-[var(--foreground)] transition-colors duration-150 cursor-default"
                >
                  {t}
                </span>
              ))}
            </div>
            {'link' in item && item.link && (
              <a
                href={item.link as string}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold hover:bg-red-500/20 transition-colors duration-200"
              >
                <YoutubeIcon /> Visit Channel
              </a>
            )}

          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="relative py-28 px-6">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--border-2)] to-transparent" />

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
        <div>
          {experience.map((item, i) => (
            <TimelineItem key={i} item={item} i={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
