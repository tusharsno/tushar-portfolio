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

        {/* Glow */}
        <div aria-hidden className="pointer-events-none absolute left-1/2 -translate-x-1/2 -top-48"
          style={{ width: 1100, height: 700, background: "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.03) 45%, transparent 68%)", filter: "blur(72px)" }}
        />

        <div className="relative z-10 max-w-6xl mx-auto">

          {/* Section label */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
            className="flex items-center gap-3 mb-14 pt-8"
          >
            <span className="h-px w-10 bg-[var(--accent)]" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--muted)]">Blog</span>
          </motion.div>

          {/* Heading + filter */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
            <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.05 }}
              className="text-4xl sm:text-5xl font-black tracking-tight leading-tight"
            >
              Thoughts & Writes<span className="text-[var(--muted)] font-light">.</span>
            </motion.h1>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}
              className="flex items-center gap-1.5 bg-[var(--card)] border border-[var(--border)] rounded-full p-1"
            >
              {categories.map((cat) => (
                <button key={cat} onClick={() => setActive(cat)}
                  className={`relative px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                    active === cat ? "text-[var(--btn-text)]" : "text-[var(--muted)] hover:text-[var(--foreground)]"
                  }`}
                >
                  {active === cat && (
                    <motion.span layoutId="blog-pill" className="absolute inset-0 rounded-full bg-[var(--accent)]"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              ))}
            </motion.div>
          </div>

          {/* Cards */}
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {filtered.map((post, i) => (
                <motion.div key={post.slug} layout
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.3, delay: i * 0.06 }}
                  whileHover={{ y: -4 }}
                >
                  <Link href={`/blog/${post.slug}`} className="group block h-full">
                    <article
                      className="h-full flex flex-col rounded-3xl border border-[var(--border)] overflow-hidden hover:border-[var(--border-2)] hover:shadow-2xl transition-all duration-300"
                      style={{ background: "linear-gradient(135deg, var(--card) 0%, var(--card-2) 100%)" }}
                    >
                      {/* Top color bar by category */}
                      <div className={`h-1 w-full ${
                        post.category === "Web Dev" ? "bg-gradient-to-r from-blue-500 to-blue-400" :
                        post.category === "Competitive Programming" ? "bg-gradient-to-r from-emerald-500 to-emerald-400" :
                        "bg-gradient-to-r from-[var(--accent)] to-[var(--accent-light)]"
                      }`} />

                      <div className="flex flex-col gap-4 p-5 flex-1">
                        {/* Top row */}
                        <div className="flex items-start justify-between">
                          <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-[var(--muted)] bg-[var(--background)] border border-[var(--border)] px-2.5 py-1 rounded-full">
                            {post.category}
                          </span>
                          <ArrowUpRight size={14} className="text-[var(--muted)] group-hover:text-[var(--foreground)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                        </div>

                        {/* Content */}
                        <div className="flex-1 space-y-2">
                          <h2 className="font-black text-base leading-snug group-hover:text-[var(--accent)] transition-colors duration-200">
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
                          <span className="inline-flex items-center gap-1 text-[10px] font-medium text-[var(--muted)] bg-[var(--background)] border border-[var(--border)] px-2 py-0.5 rounded-full">
                            <Clock size={9} />{post.readTime}
                          </span>
                        </div>
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
