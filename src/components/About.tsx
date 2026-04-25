"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2, Download, ArrowUpRight } from "lucide-react";
import { about, personal } from "@/data/portfolio";

export default function About() {
  return (
    <section id="about" className="relative py-28 px-6 overflow-hidden">

      {/* Subtle top border */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--border-2)] to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Section label — left aligned like Hero */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-3 mb-14"
        >
          <span className="h-px w-10 bg-[var(--accent)]" />
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--muted)]">About Me</span>
        </motion.div>

        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-14 items-start">

          {/* ── LEFT — Photo + bento stats ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-4"
          >
            {/* Photo */}
            <div className="relative w-full h-80 bg-[var(--background)] flex items-center justify-center">
              <Image
                src={personal.avatar}
                alt={personal.name}
                width={320}
                height={320}
                className="object-contain rounded-2xl"
                priority
              />
            </div>

            {/* 2×2 stat bento */}
            <div className="grid grid-cols-2 gap-3">
              {about.stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.07 }}
                  whileHover={{ y: -3 }}
                  className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4 hover:border-[var(--accent)]/30 transition-all duration-200"
                >
                  <p className="text-2xl font-black tabular-nums leading-none">{stat.value}</p>
                  <p className="text-xs font-semibold mt-2">{stat.label}</p>
                  <p className="text-[10px] text-[var(--muted)] mt-0.5">{stat.platform}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── RIGHT — Content ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-7"
          >
            {/* Big heading */}
            <div>
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight">
                Who I Am
                <span className="text-[var(--muted)] font-light">.</span>
              </h2>
            </div>

            {/* Bio — with left border like Hero tagline */}
            <p className="text-[var(--muted)] text-base leading-relaxed border-l-2 border-[var(--border)] pl-4">
              {about.bio}
            </p>

            {/* CP callout — clean pill row */}
            <div className="space-y-3">
              <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-[var(--muted)]">
                Competitive Programming
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  { text: "Codeforces · 250+ problems" },
                  { text: "20+ rated contests" },
                  { text: "LeetCode · Active" },
                ].map(({ text }) => (
                  <span
                    key={text}
                    className="inline-flex items-center text-xs text-[var(--muted)] bg-[var(--accent-subtle)] border border-[var(--border)] rounded-full px-3 py-1.5"
                  >
                    {text}
                  </span>
                ))}
              </div>
            </div>

            {/* Highlights */}
            <ul className="space-y-2.5">
              {about.highlights.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.08 }}
                  className="flex items-start gap-3 text-sm text-[var(--muted)]"
                >
                  <CheckCircle2 size={14} className="text-[var(--foreground)] mt-0.5 shrink-0" />
                  {item}
                </motion.li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={personal.resumeUrl}
                download
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--accent)] text-[var(--btn-text)] text-sm font-semibold hover:opacity-90 hover:scale-[1.03] transition-all duration-200"
              >
                <Download size={13} />Download CV
              </a>
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[var(--border)] text-sm font-semibold hover:bg-[var(--accent-subtle)] transition-all duration-200"
              >
                GitHub Profile<ArrowUpRight size={13} />
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
