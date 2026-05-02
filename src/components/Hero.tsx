"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import { MapPin, Download, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { personal } from "@/data/portfolio";
import AnimatedCounter from "@/components/AnimatedCounter";

const codeLines = [
  { key: "l1", indent: false, tokens: [
    { t: "const ",        c: "text-purple-400" },
    { t: "dev",           c: "text-blue-300 font-semibold" },
    { t: " = {",          c: "text-white/50" },
  ]},
  { key: "l2", indent: true, tokens: [
    { t: "name",          c: "text-sky-300" },
    { t: ": ",            c: "text-white/50" },
    { t: '"Tushar Barua"',c: "text-emerald-300" },
    { t: ",",             c: "text-white/50" },
  ]},
  { key: "l3", indent: true, tokens: [
    { t: "stack",         c: "text-sky-300" },
    { t: ": [",           c: "text-white/50" },
    { t: '"Next.js"',     c: "text-emerald-300" },
    { t: ", ",            c: "text-white/50" },
    { t: '"TypeScript"',  c: "text-emerald-300" },
    { t: ", ",            c: "text-white/50" },
    { t: '"Node.js"',     c: "text-emerald-300" },
    { t: "],",            c: "text-white/50" },
  ]},
  { key: "l4", indent: true, tokens: [
    { t: "cp",            c: "text-sky-300" },
    { t: ": ",            c: "text-white/50" },
    { t: '"250+ solved"', c: "text-emerald-300" },
    { t: ",",             c: "text-white/50" },
  ]},
  { key: "l5", indent: true, tokens: [
    { t: "open",          c: "text-sky-300" },
    { t: ": ",            c: "text-white/50" },
    { t: "true",          c: "text-orange-300 font-bold" },
  ]},
  { key: "l6", indent: false, tokens: [
    { t: "};",            c: "text-white/50" },
  ]},
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setRoleIndex((i) => (i + 1) % personal.roles.length), 2800);
    return () => clearInterval(t);
  }, []);

  // Typewriter state — track by char count, render with token colors
  const fullText = codeLines.map(l =>
    (l.indent ? "  " : "") + l.tokens.map(t => t.t).join("")
  ).join("\n");
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    if (charCount < fullText.length) {
      const ch = fullText[charCount];
      const delay = ch === "\n" ? 120 : ch === " " ? 60 : 40;
      const t = setTimeout(() => setCharCount(c => c + 1), delay);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setCharCount(0), 2200);
      return () => clearTimeout(t);
    }
  }, [charCount, fullText]);

  // Render tokens up to charCount with syntax colors
  const renderTokens = () => {
    let remaining = charCount;
    const result: React.ReactNode[] = [];
    let nodeIndex = 0;

    for (const line of codeLines) {
      if (remaining <= 0) break;
      const prefix = line.indent ? "  " : "";
      if (prefix) {
        const shown = prefix.slice(0, remaining);
        remaining -= prefix.length;
        result.push(<span key={nodeIndex++} className="text-white/0">{shown}</span>);
      }
      if (remaining <= 0) { result.push(<br key={nodeIndex++} />); break; }

      for (const token of line.tokens) {
        if (remaining <= 0) break;
        const shown = token.t.slice(0, remaining);
        remaining -= token.t.length;
        result.push(<span key={nodeIndex++} className={token.c}>{shown}</span>);
      }
      result.push(<br key={nodeIndex++} />);
    }
    return result;
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden dark" style={{ colorScheme: "dark" }}>

      {/* Background image */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/tushar-image/codingtime-in-library.jpeg"
          alt="background"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
          quality={90}
        />
      </motion.div>

      {/* Dark overlay — layered for depth */}
      <div className="absolute inset-0 z-[1] bg-black/70" />
      <div className="absolute inset-0 z-[2] bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
      <div className="absolute inset-0 z-[3] bg-gradient-to-t from-black/90 via-transparent to-black/30" />

      {/* Bottom fade into next section */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent pointer-events-none z-[4]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent z-[4]" />

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
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-xs font-medium text-white/80">
                <MapPin size={10} />{personal.location}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-xs font-medium text-white/80">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Open to work
              </span>
            </motion.div>

            {/* Big headline */}
            <div className="space-y-1">
              <motion.p
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="text-[var(--muted)] text-lg font-medium tracking-wide text-white/60"
              >
                Hey there, I&apos;m
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.55, delay: 0.22 }}
                className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter leading-none text-white"
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
                    className="text-sm font-semibold tracking-widest text-white/60 uppercase"
                  >
                    {personal.roles[roleIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
              <motion.span
                animate={{ opacity: [1, 1, 0, 0] }}
                transition={{ repeat: Infinity, duration: 1.2, times: [0, 0.5, 0.5, 1] }}
                className="w-0.5 h-4 bg-white/50 rounded-full"
              />
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.45 }}
              className="text-white/60 text-sm leading-relaxed max-w-sm border-l-2 border-white/20 pl-4"
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
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black text-sm font-semibold hover:opacity-90 hover:scale-[1.03] transition-all duration-200"
              >
                <Download size={13} />Download CV
              </a>
              <button
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-white text-sm font-semibold hover:bg-white/20 transition-all duration-200"
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
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white/70 text-xs font-medium hover:text-white hover:bg-white/20 transition-all duration-200"
                >
                  <Icon />{label}
                </a>
              ))}
              <span className="w-px h-4 bg-white/20" />
              <span className="text-xs text-white/40">{personal.email}</span>
            </motion.div>

          </div>

          {/* ── RIGHT — Bento cluster ── */}
          <div className="hidden lg:grid grid-rows-[auto_auto] gap-3">

            {/* Code card — lines appear one by one */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl overflow-hidden"
            >
              <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-white/10 bg-white/5">
                <span className="w-2 h-2 rounded-full bg-red-400/60" />
                <span className="w-2 h-2 rounded-full bg-yellow-400/60" />
                <span className="w-2 h-2 rounded-full bg-green-400/60" />
                <span className="ml-auto text-[10px] text-white/40 font-mono">tushar.ts</span>
              </div>
              <div className="p-4 font-mono text-[11px] leading-6 select-none min-h-[112px]">
                <pre className="whitespace-pre">
                  {renderTokens()}
                  <motion.span
                    animate={{ opacity: [1, 1, 0, 0] }}
                    transition={{ repeat: Infinity, duration: 1, times: [0, 0.5, 0.5, 1] }}
                    className="inline-block w-[2px] h-[12px] bg-white/80 align-middle ml-[1px]"
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
                  className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 flex flex-col justify-between cursor-default hover:bg-white/15 transition-colors duration-200"
                >
                  <p className="text-2xl font-black tabular-nums text-white"><AnimatedCounter value={value} /></p>
                  <div>
                    <p className="text-xs font-semibold text-white/60">{label}</p>
                    <p className="text-[10px] text-white/40">{sub}</p>
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 hover:text-white/70 transition-colors group z-10"
        aria-label="Scroll down"
      >
        <svg width="22" height="34" viewBox="0 0 22 34" fill="none" className="text-white/40 group-hover:text-white/70 transition-colors">
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
