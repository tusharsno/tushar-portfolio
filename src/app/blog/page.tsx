"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Clock, Tag } from "lucide-react";
import { blogPosts, categories } from "@/data/blog";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function BlogPage() {
  const [active, setActive] = useState("All");

  const filtered = active === "All"
    ? blogPosts
    : blogPosts.filter((p) => p.category === active);

  return (
    <>
      <Navbar />
      <main className="relative min-h-screen pt-24 pb-16 px-6 overflow-hidden bg-[var(--background)]">

        {/* Wide soft white cone */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 -translate-x-1/2 -top-48"
          style={{
            width: 1100, height: 700,
            background: "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.04) 45%, transparent 68%)",
            filter: "blur(72px)",
          }}
        />
        {/* Tight bright core */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 -translate-x-1/2 -top-16"
          style={{
            width: 440, height: 240,
            background: "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.12) 0%, transparent 55%)",
            filter: "blur(32px)",
          }}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

        <div className="relative z-10 max-w-6xl mx-auto">

          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-3 mb-14 pt-8"
          >
            <span className="h-px w-10 bg-[var(--accent)]" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--muted)]">Blog</span>
          </motion.div>

          {/* Heading + filter */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="text-4xl sm:text-5xl font-black tracking-tight leading-tight"
            >
              Thoughts & Writes<span className="text-[var(--muted)] font-light">.</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex items-center gap-1.5 bg-[var(--card)] border border-[var(--border)] rounded-full p-1"
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`relative px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                    active === cat ? "text-[var(--btn-text)]" : "text-[var(--muted)] hover:text-[var(--foreground)]"
                  }`}
                >
                  {active === cat && (
                    <motion.span
                      layoutId="blog-pill"
                      className="absolute inset-0 rounded-full bg-[var(--accent)]"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              ))}
            </motion.div>
          </div>

          {/* Cards */}
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((post, i) => (
                <motion.div
                  key={post.slug}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                  whileHover={{ y: -4 }}
                >
                  <Link href={`/blog/${post.slug}`} className="group block h-full">
                    <article className="h-full bg-[var(--card)] border border-[var(--border)] rounded-3xl p-6 flex flex-col gap-4 hover:border-[var(--accent)]/30 hover:shadow-xl transition-all duration-300">

                      {/* Top */}
                      <div className="flex items-start justify-between">
                        <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-[var(--muted)] bg-[var(--accent-subtle)] border border-[var(--border)] px-2.5 py-1 rounded-full">
                          {post.category}
                        </span>
                        <ArrowUpRight size={14} className="text-[var(--muted)] group-hover:text-[var(--foreground)] transition-colors" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 space-y-2">
                        <h2 className="font-bold text-base leading-snug group-hover:text-[var(--accent)] transition-colors duration-200">
                          {post.title}
                        </h2>
                        <p className="text-[var(--muted)] text-sm leading-relaxed line-clamp-2">
                          {post.excerpt}
                        </p>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-lg bg-[var(--background)] border border-[var(--border)] text-[var(--muted)]">
                            <Tag size={8} />{tag}
                          </span>
                        ))}
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-3 border-t border-[var(--border)]">
                        <span className="text-[10px] text-[var(--muted)]">
                          {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[10px] text-[var(--muted)]">
                          <Clock size={10} />{post.readTime}
                        </span>
                      </div>
                    </article>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

        </div>
      </main>
      <Footer />
    </>
  );
}
