"use client";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const services = [
  {
    emoji: "🚀",
    title: "Full Stack Web App Development",
    description:
      "End-to-end web applications built with Next.js, Node.js, and PostgreSQL. From database schema to deployed product — clean architecture, fast performance, and production-ready code.",
    tech: ["Next.js", "TypeScript", "Node.js", "Prisma", "PostgreSQL"],
    deliverables: [
      "Complete web application",
      "REST API backend",
      "Database design & setup",
      "Vercel deployment",
    ],
    tag: "Most Popular",
    tagColor: "bg-blue-500/10 border-blue-500/20 text-blue-400",
    topColor: "#3b82f6",
  },
  {
    emoji: "🎨",
    title: "Frontend Development",
    description:
      "Pixel-perfect, responsive UIs built with React and Next.js. Fast, accessible, and visually polished interfaces with smooth animations and great user experience.",
    tech: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    deliverables: [
      "Responsive UI/UX",
      "Component library",
      "Animation & interactions",
      "Cross-browser compatible",
    ],
    tag: "UI Focused",
    tagColor: "bg-purple-500/10 border-purple-500/20 text-purple-400",
    topColor: "#a855f7",
  },
  {
    emoji: "🤖",
    title: "ML-Powered Web App",
    description:
      "Machine learning models integrated into production web apps. From training the model to serving predictions via API — complete ML pipeline with a modern frontend.",
    tech: ["Python", "Scikit-learn", "Flask", "Next.js", "Pandas"],
    deliverables: [
      "Trained ML model",
      "Flask prediction API",
      "Next.js frontend",
      "Deployed & live",
    ],
    tag: "ML Integrated",
    tagColor: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
    topColor: "#10b981",
  },
];

type Service = typeof services[number];

function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group relative p-[1px] rounded-xl flex flex-col"
    >
      {/* Full border glow on hover */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: `linear-gradient(135deg, ${service.topColor}80, ${service.topColor}40, ${service.topColor}80)` }}
      />

      <div
        className="relative z-10 rounded-xl border border-transparent group-hover:border-[var(--border)] overflow-hidden flex flex-col h-full transition-colors duration-300 hover:shadow-2xl"
        style={{ background: "linear-gradient(135deg, var(--card) 0%, var(--card-2) 100%)" }}
      >
        {/* Top color bar */}
        <div className="h-1 w-full" style={{ background: `linear-gradient(to right, ${service.topColor}, transparent)` }} />

        <div className="p-6 flex flex-col gap-4 flex-1">

          {/* Top row */}
          <div className="flex items-start justify-between">
            <span className="text-3xl">{service.emoji}</span>
            <span className={`text-[10px] font-bold tracking-[0.12em] uppercase px-2.5 py-1 rounded-full border ${service.tagColor}`}>
              {service.tag}
            </span>
          </div>

          {/* Title & description */}
          <div className="space-y-2">
            <h3 className="font-black text-base leading-snug group-hover:text-[var(--accent)] transition-colors duration-200">
              {service.title}
            </h3>
            <p className="text-[var(--muted)] text-sm leading-relaxed">
              {service.description}
            </p>
          </div>

          {/* Deliverables */}
          <ul className="space-y-1.5">
            {service.deliverables.map((item) => (
              <li key={item} className="flex items-center gap-2 text-xs text-[var(--muted)]">
                <span className="w-1 h-1 rounded-full bg-[var(--accent)] shrink-0" />
                {item}
              </li>
            ))}
          </ul>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 mt-auto pt-4 border-t border-[var(--border)]">
            {service.tech.map((t) => (
              <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded-lg bg-[var(--background)] border border-[var(--border)] text-[var(--muted)]">
                {t}
              </span>
            ))}
          </div>

        </div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="relative py-28 px-6">
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
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--muted)]">Services</span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="text-4xl sm:text-5xl font-black tracking-tight leading-tight mb-10"
        >
          What I Can Build<span className="text-[var(--muted)] font-light">.</span>
        </motion.h2>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-10 flex items-center justify-end"
        >
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--accent)] text-[var(--btn-text)] text-sm font-semibold hover:opacity-90 hover:scale-[1.03] transition-all duration-200"
          >
            Let&apos;s Work Together <ArrowUpRight size={14} />
          </button>
        </motion.div>

      </div>
    </section>
  );
}
