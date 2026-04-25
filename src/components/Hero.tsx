"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { MapPin, Download, ArrowUpRight } from "lucide-react";
import { personal } from "@/data/portfolio";

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const codeLines = [
  { key: "l1", indent: false, tokens: [{ t: "const ", c: "text-[var(--muted)]" }, { t: "dev", c: "text-[var(--foreground)] font-semibold" }, { t: " = {", c: "text-[var(--muted)]" }] },
  { key: "l2", indent: true,  tokens: [{ t: "name", c: "text-[var(--muted)]" }, { t: ": ", c: "text-[var(--muted)]" }, { t: '"Tushar"', c: "text-[var(--foreground)]" }, { t: ",", c: "text-[var(--muted)]" }] },
  { key: "l3", indent: true,  tokens: [{ t: "stack", c: "text-[var(--muted)]" }, { t: ": [", c: "text-[var(--muted)]" }, { t: '"Next.js"', c: "text-[var(--foreground)]" }, { t: ", ", c: "text-[var(--muted)]" }, { t: '"TypeScript"', c: "text-[var(--foreground)]" }, { t: ", ", c: "text-[var(--muted)]" }, { t: '"Node.js"', c: "text-[var(--foreground)]" }, { t: "],", c: "text-[var(--muted)]" }] },
  { key: "l4", indent: true,  tokens: [{ t: "cp", c: "text-[var(--muted)]" }, { t: ": ", c: "text-[var(--muted)]" }, { t: '"250+ solved"', c: "text-[var(--foreground)]" }, { t: ",", c: "text-[var(--muted)]" }] },
  { key: "l5", indent: true,  tokens: [{ t: "open", c: "text-[var(--muted)]" }, { t: ": ", c: "text-[var(--muted)]" }, { t: "true", c: "text-[var(--foreground)] font-bold" }] },
  { key: "l6", indent: false, tokens: [{ t: "};", c: "text-[var(--muted)]" }] },
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  // Typewriter state
  const fullText = codeLines.map(l =>
    (l.indent ? "  " : "") + l.tokens.map(t => t.t).join("")
  ).join("\n");
  const [displayed, setDisplayed] = useState("");
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setRoleIndex((i) => (i + 1) % personal.roles.length), 2800);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (charIndex < fullText.length) {
      const ch = fullText[charIndex];
      const delay = ch === "\n" ? 500 : ch === " " ? 180 : 40;
      const t = setTimeout(() => {
        setDisplayed(fullText.slice(0, charIndex + 1));
        setCharIndex(c => c + 1);
      }, delay);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setDisplayed("");
        setCharIndex(0);
      }, 2200);
      return () => clearTimeout(t);
    }
  }, [charIndex, fullText]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[var(--background)]">

      {/* Wide soft white cone — the main sunlight */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 2.4, ease: "easeOut" }}
        aria-hidden
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 -top-48"
        style={{
          width: 1100, height: 700,
          background: "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.04) 45%, transparent 68%)",
          filter: "blur(72px)",
        }}
      />
      {/* Tight bright core — the "sun spot" */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 1.6, ease: "easeOut", delay: 0.25 }}
        aria-hidden
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 -top-16"
        style={{
          width: 440, height: 240,
          background: "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.12) 0%, transparent 55%)",
          filter: "blur(32px)",
        }}
      />
      {/* Bottom divider line lit by glow */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[var(--background)] to-transparent pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">

          {/* ── LEFT ── */}
          <div className="space-y-6">

            {/* Top pill */}
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex items-center gap-3"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border)] bg-[var(--card)] text-xs font-medium text-[var(--muted)]">
                <MapPin size={10} />{personal.location}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--border)] bg-[var(--card)] text-xs font-medium text-[var(--muted)]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Open to work
              </span>
            </motion.div>

            {/* Big headline */}
            <div className="space-y-1">
              <motion.p
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="text-[var(--muted)] text-lg font-medium tracking-wide"
              >
                Hey there, I&apos;m
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.55, delay: 0.22 }}
                className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter leading-none text-[var(--foreground)]"
              >
                {personal.name}
                <span className="text-[var(--border-2)] font-light">.</span>
              </motion.h1>
            </div>

            {/* Role pill — animated */}
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.35 }}
              className="flex items-center gap-2 h-7"
            >
              <div className="overflow-hidden flex items-center">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={roleIndex}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0,  opacity: 1 }}
                    exit={{   y: -20, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="text-sm font-semibold tracking-widest text-[var(--muted)] uppercase"
                  >
                    {personal.roles[roleIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
              <motion.span
                animate={{ opacity: [1, 1, 0, 0] }}
                transition={{ repeat: Infinity, duration: 1.2, times: [0, 0.5, 0.5, 1] }}
                className="w-0.5 h-4 bg-[var(--muted)] rounded-full"
              />
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.45 }}
              className="text-[var(--muted)] text-sm leading-relaxed max-w-sm border-l-2 border-[var(--border)] pl-4"
            >
              {personal.tagline}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.55 }}
              className="flex flex-wrap items-center gap-3"
            >
              <a
                href={personal.resumeUrl} download
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--accent)] text-[var(--btn-text)] text-sm font-semibold hover:opacity-90 hover:scale-[1.03] transition-all duration-200"
              >
                <Download size={13} />Download CV
              </a>
              <button
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[var(--border)] text-[var(--foreground)] text-sm font-semibold hover:bg-[var(--accent-subtle)] transition-all duration-200"
              >
                View Projects<ArrowUpRight size={13} />
              </button>
            </motion.div>

            {/* Socials + divider */}
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.65 }}
              className="flex items-center gap-3 pt-2"
            >
              {[
                { href: personal.github,   icon: GithubIcon,   label: "GitHub"   },
                { href: personal.linkedin, icon: LinkedinIcon, label: "LinkedIn" },
              ].map(({ href, icon: Icon, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--border)] text-[var(--muted)] text-xs font-medium hover:text-[var(--foreground)] hover:bg-[var(--accent-subtle)] transition-all duration-200"
                >
                  <Icon />{label}
                </a>
              ))}
              <span className="w-px h-4 bg-[var(--border)]" />
              <span className="text-xs text-[var(--muted-2)]">{personal.email}</span>
            </motion.div>

          </div>

          {/* ── RIGHT — Bento cluster ── */}
          <div className="hidden lg:grid grid-rows-[auto_auto] gap-3">

            {/* Code card — lines appear one by one */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden"
            >
              <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-[var(--border)] bg-[var(--card-2)]">
                <span className="w-2 h-2 rounded-full bg-red-400/60" />
                <span className="w-2 h-2 rounded-full bg-yellow-400/60" />
                <span className="w-2 h-2 rounded-full bg-green-400/60" />
                <span className="ml-auto text-[10px] text-[var(--muted-2)] font-mono">tushar.ts</span>
              </div>
              <div className="p-4 font-mono text-[11px] leading-6 select-none min-h-[112px]">
                <pre className="whitespace-pre text-[var(--muted)]">
                  {displayed.split("").map((ch, i) => {
                    // Colorize keywords inline
                    return <span key={i}>{ch}</span>;
                  })}
                  <motion.span
                    animate={{ opacity: [1, 1, 0, 0] }}
                    transition={{ repeat: Infinity, duration: 1, times: [0, 0.5, 0.5, 1] }}
                    className="inline-block w-[2px] h-[12px] bg-[var(--foreground)] align-middle ml-[1px]"
                  />
                </pre>
              </div>
            </motion.div>

            {/* Bottom 3 mini cards — staggered from bottom */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: "250+", label: "Problems",  sub: "Codeforces" },
                { value: "20+",  label: "Contests",  sub: "Competed"   },
                { value: "3+",   label: "Projects",  sub: "Live"       },
              ].map(({ value, label, sub }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 16, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.4, delay: 1.45 + i * 0.1, ease: [0.0, 0.0, 0.2, 1] }}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4 flex flex-col justify-between cursor-default hover:border-[var(--border-2)] transition-colors duration-200"
                >
                  <p className="text-2xl font-black tabular-nums text-[var(--foreground)]">{value}</p>
                  <div>
                    <p className="text-xs font-semibold text-[var(--muted)]">{label}</p>
                    <p className="text-[10px] text-[var(--muted-2)]">{sub}</p>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>

        </div>
      </div>

      {/* Scroll cue — mouse scroll indicator */}
      <motion.button
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--muted-2)] hover:text-[var(--muted)] transition-colors group"
        aria-label="Scroll down"
      >
        <svg width="22" height="34" viewBox="0 0 22 34" fill="none" className="text-[var(--muted-2)] group-hover:text-[var(--muted)] transition-colors">
          <rect x="1" y="1" width="20" height="32" rx="10" stroke="currentColor" strokeWidth="1.5" />
          <motion.rect
            x="9.5" y="6" width="3" height="6" rx="1.5"
            fill="currentColor"
            animate={{ y: [6, 12, 6], opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          />
        </svg>
        <span className="text-[10px] tracking-[0.15em] uppercase">Scroll</span>
      </motion.button>


    </section>
  );
}
