"use client";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { CheckCircle2, Download, ArrowUpRight } from "lucide-react";
import { about, personal } from "@/data/portfolio";

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [imageError, setImageError] = useState(false);

  return (
    <section id="about" className="relative py-28 px-6 overflow-hidden">
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
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--muted)]">About Me</span>
        </motion.div>

        <div ref={ref} className="grid lg:grid-cols-[0.85fr_1.15fr] gap-14 items-start">

          {/* ── LEFT ── */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="flex flex-col gap-4"
          >
            {/* Photo card */}
            <div className="relative rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--card)] p-1">
              <div className="relative w-full rounded-lg overflow-hidden" style={{ aspectRatio: "3/4" }}>
                {imageError ? (
                  <div className="w-full h-full bg-[var(--card-2)] flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-2">👤</div>
                      <p className="text-xs text-[var(--muted)]">Image not available</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <Image
                      src={personal.avatar}
                      alt={personal.name}
                      fill
                      className="object-cover object-center"
                      priority
                      onError={() => setImageError(true)}
                    />
                    {/* Bottom gradient */}
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[var(--card)] to-transparent" />
                    {/* Name overlay */}
                    <div className="absolute bottom-0 inset-x-0 p-4">
                      <p className="font-black text-base text-[var(--foreground)]">{personal.name}</p>
                      <p className="text-xs text-[var(--muted)]">{personal.title}</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* 2×2 stat bento */}
            <div className="grid grid-cols-2 gap-3">
              {about.stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  className="relative overflow-hidden bg-[var(--card)] border border-[var(--border)] rounded-lg p-4 hover:border-[var(--border-2)] hover:shadow-lg transition-all duration-200"
                >
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[var(--border)] to-transparent rounded-bl-xl opacity-40" />
                  <p className="text-2xl font-black tabular-nums leading-none text-[var(--foreground)]">{stat.value}</p>
                  <p className="text-xs font-semibold mt-2 text-[var(--foreground)]">{stat.label}</p>
                  <p className="text-[10px] text-[var(--muted)] mt-0.5">{stat.platform}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── RIGHT ── */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="space-y-7"
          >
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight">
              The Developer Behind the Code
              <span className="text-[var(--muted)] font-light">.</span>
            </h2>

            {/* Bio */}
            <div className="relative pl-4 border-l-2 border-[var(--border-2)]">
              <p className="text-[var(--muted)] text-base leading-relaxed">{about.bio}</p>
            </div>

            {/* CP callout */}
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg p-4 space-y-3">
              <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-[var(--muted)]">
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
                    className="inline-flex items-center text-xs text-[var(--foreground)] bg-[var(--accent-subtle)] border border-[var(--border-2)] rounded-full px-3 py-1.5 font-medium"
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
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className="flex items-start gap-3 text-sm text-[var(--muted)] bg-[var(--card)] border border-[var(--border)] rounded-lg px-4 py-2.5 hover:border-[var(--border-2)] transition-colors duration-200"
                >
                  <CheckCircle2 size={13} className="text-[var(--foreground)] mt-0.5 shrink-0" />
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
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[var(--border)] text-sm font-semibold hover:bg-[var(--accent-subtle)] hover:border-[var(--border-2)] transition-all duration-200"
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
