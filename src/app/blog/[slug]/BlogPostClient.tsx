"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Clock, Tag, Calendar } from "lucide-react";
import { blogPosts } from "@/data/blog";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TableOfContents from "@/components/blog/TableOfContents";
import ReadingProgress from "@/components/blog/ReadingProgress";
import CopyButton from "@/components/blog/CopyButton";
import ShareButtons from "@/components/blog/ShareButtons";
import LanguageToggle from "@/components/blog/LanguageToggle";
import ImageGallery from "@/components/blog/ImageGallery";

type Props = {
  post: typeof blogPosts[0];
};

export default function BlogPostClient({ post }: Props) {
  const [language, setLanguage] = useState<"en" | "bn">("en");
  
  const hasTranslation = !!(post.titleBn && post.contentBn);
  
  // Use appropriate content based on language
  const title = language === "bn" && post.titleBn ? post.titleBn : post.title;
  const excerpt = language === "bn" && post.excerptBn ? post.excerptBn : post.excerpt;
  const readTime = language === "bn" && post.readTimeBn ? post.readTimeBn : post.readTime;
  const content = language === "bn" && post.contentBn ? post.contentBn : post.content;

  // Helper functions
  function slugify(text: string) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }

  function extractHeadings(content: string) {
    return content
      .split("\n")
      .filter((line) => line.startsWith("## "))
      .map((line, index) => {
        const text = line.replace("## ", "");
        return { 
          id: `${language}-${slugify(text)}-${index}`, // Language-specific IDs
          text 
        };
      });
  }

  function renderContent(content: string) {
    const lines = content.split("\n");
    const elements: React.ReactNode[] = [];
    let i = 0;
    let keyCounter = 0;

    while (i < lines.length) {
      const line = lines[i];
      const key = `${language}-${keyCounter++}`; // Add language prefix to make keys unique

      if (line.startsWith("![" )) {
        const galleryMatch = line.match(/^!\[gallery:(.+)\]$/);
        if (galleryMatch) {
          // Collect all consecutive gallery lines
          const galleryImages: { src: string; alt: string }[] = [];
          let j = i;
          while (j < lines.length) {
            const gMatch = lines[j].match(/^!\[gallery:(.+)\]$/);
            if (gMatch) {
              const parts = gMatch[1].split("|");
              galleryImages.push({ src: parts[0], alt: parts[1] || parts[0] });
              j++;
            } else break;
          }
          elements.push(<ImageGallery key={key} images={galleryImages} />);
          i = j;
          continue;
        }
        const match = line.match(/^!\[(.*)\]\((.*)\)$/);
        if (match) {
          const [, alt, src] = match;
          elements.push(
            <div key={key} className="my-8 rounded-2xl overflow-hidden border border-[var(--border)] shadow-lg">
              <img src={src} alt={alt} className="w-full h-auto object-cover" loading="lazy" />
              {alt && <p className="text-center text-xs text-[var(--muted)] py-2 px-4 bg-[var(--card)] border-t border-[var(--border)]">{alt}</p>}
            </div>
          );
        }
      } else if (line.startsWith("### ")) {
        const text = line.replace("### ", "");
        elements.push(
          <h3 key={key} className="text-lg font-bold tracking-tight mt-8 mb-3 text-[var(--foreground)]">
            {text}
          </h3>
        );
      } else if (line.startsWith("## ")) {
        const text = line.replace("## ", "");
        const headingIndex = content.split("\n").slice(0, i).filter(l => l.startsWith("## ")).length;
        const id = `${language}-${slugify(text)}-${headingIndex}`;
        elements.push(
          <h2 key={key} id={id} className="text-2xl font-black tracking-tight mt-12 mb-4 scroll-mt-24 text-[var(--foreground)]">
            {text}
          </h2>
        );
      } else if (line.startsWith("```")) {
        const lang = line.replace("```", "").trim();
        const codeLines: string[] = [];
        i++;
        while (i < lines.length && !lines[i].startsWith("```")) {
          codeLines.push(lines[i]);
          i++;
        }
        const code = codeLines.join("\n");

        elements.push(
          <div key={key} className="my-6 rounded-2xl overflow-hidden border border-[var(--border)] shadow-lg">
            <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-[var(--border)]"
              style={{ background: "#161b22" }}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
              {lang && <span className="text-[10px] text-zinc-400 font-mono ml-2 bg-zinc-800 border border-zinc-700 px-2 py-0.5 rounded-md">{lang}</span>}
              <div className="ml-auto">
                <CopyButton code={code} />
              </div>
            </div>
            <pre className="overflow-x-auto text-xs leading-6 p-5 bg-[#0d1117] text-gray-300 m-0">
              <code>{code}</code>
            </pre>
          </div>
        );
      } else if (line.startsWith("| ")) {
        const tableRows: string[] = [];
        while (i < lines.length && lines[i].startsWith("|")) {
          tableRows.push(lines[i]);
          i++;
        }
        const headerRow = tableRows[0];
        // skip separator row (contains --)
        const bodyRows = tableRows.filter((r, idx) => idx !== 0 && !r.includes("---"));
        const parseRow = (row: string) =>
          row.split("|").slice(1, -1).map((cell) => cell.trim());
        elements.push(
          <div key={key} className="my-6 overflow-x-auto rounded-2xl border border-[var(--border)]">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border)]" style={{ background: "var(--card-2)" }}>
                  {parseRow(headerRow).map((cell, j) => (
                    <th key={j} className="px-4 py-3 text-left text-xs font-bold tracking-wider text-[var(--foreground)] uppercase">
                      {cell}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bodyRows.map((row, ri) => (
                  <tr key={ri} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--card-2)] transition-colors">
                    {parseRow(row).map((cell, ci) => (
                      <td key={ci} className={`px-4 py-3 text-xs text-[var(--muted)] ${ci === 0 ? "font-semibold text-[var(--foreground)]" : ""}`}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        continue;
      } else if (/^\d+\.\s/.test(line)) {
        const items: string[] = [];
        while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
          items.push(lines[i].replace(/^\d+\.\s/, ""));
          i++;
        }
        elements.push(
          <ol key={key} className="my-4 space-y-2.5 list-none">
            {items.map((item, j) => (
              <li key={`${key}-item-${j}`} className="flex items-start gap-3 text-sm text-[var(--muted)]">
                <span className="mt-0.5 min-w-[20px] h-5 rounded-full bg-[var(--accent)] text-[var(--btn-text)] text-[10px] font-bold flex items-center justify-center shrink-0">{j + 1}</span>
                <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, "<strong class='text-[var(--foreground)] font-semibold'>$1</strong>") }} />
              </li>
            ))}
          </ol>
        );
        continue;
      } else if (line.startsWith("- ")) {
        const items: string[] = [];
        while (i < lines.length && lines[i].startsWith("- ")) {
          items.push(lines[i].replace("- ", ""));
          i++;
        }
        elements.push(
          <ul key={key} className="my-4 space-y-2.5">
            {items.map((item, j) => (
              <li key={`${key}-item-${j}`} className="flex items-start gap-3 text-sm text-[var(--muted)]">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0" />
                <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, "<strong class='text-[var(--foreground)] font-semibold'>$1</strong>") }} />
              </li>
            ))}
          </ul>
        );
        continue;
      } else if (line.trim() === "") {
        elements.push(<div key={key} className="h-2" />);
      } else {
        elements.push(
          <p key={key} className="text-[var(--muted)] text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: line
              .replace(/\*\*(.*?)\*\*/g, "<strong class='text-[var(--foreground)] font-semibold'>$1</strong>")
              .replace(/`(.*?)`/g, "<code class='font-mono text-xs bg-[var(--accent-subtle)] border border-[var(--border)] px-1.5 py-0.5 rounded-md text-[var(--foreground)]'>$1</code>")
            }}
          />
        );
      }
      i++;
    }
    return elements;
  }

  const categoryColor: Record<string, string> = {
    "Web Dev": "bg-blue-500/10 border-blue-500/20 text-blue-400",
    "Competitive Programming": "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
    "Backend": "bg-orange-500/10 border-orange-500/20 text-orange-400",
    "Software Engineering": "bg-purple-500/10 border-purple-500/20 text-purple-400",
  };

  const headings = extractHeadings(content);
  const related = blogPosts.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 2);
  const currentIndex = blogPosts.findIndex((p) => p.slug === post.slug);
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;
  const badgeClass = categoryColor[post.category] ?? "bg-[var(--accent-subtle)] border-[var(--border)] text-[var(--muted)]";
  const renderedContent = renderContent(content);

  return (
    <>
      <Navbar />
      <ReadingProgress />

      <div className="relative min-h-screen overflow-hidden bg-[var(--background)]">

        {/* Subtle dot grid */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `radial-gradient(circle, var(--border) 1px, transparent 1px)`,
          backgroundSize: "28px 28px", opacity: 0.4,
        }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,transparent_40%,var(--background)_100%)] pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 flex gap-10 items-start pt-24 pb-24">

          {/* ── Article ── */}
          <article className="flex-1 min-w-0">

            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Link href="/blog"
                className="inline-flex items-center gap-2 text-xs text-[var(--muted)] hover:text-[var(--foreground)] transition-colors mb-10 group"
              >
                <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
                Back to Blog
              </Link>
            </motion.div>

            {/* Header card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="rounded-3xl border border-[var(--border)] p-6 sm:p-8 mb-10"
              style={{ background: "linear-gradient(135deg, var(--card) 0%, var(--card-2) 100%)" }}
            >
              {/* Language Toggle */}
              <LanguageToggle 
                hasTranslation={hasTranslation} 
                onLanguageChange={setLanguage} 
              />
              
              {/* Category + read time */}
              <div className="flex items-center gap-2 mb-4">
                <span className={`text-[10px] font-bold tracking-[0.15em] uppercase px-2.5 py-1 rounded-full border ${badgeClass}`}>
                  {post.category}
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] text-[var(--muted)] bg-[var(--background)] border border-[var(--border)] px-2.5 py-1 rounded-full">
                  <Clock size={9} />{readTime}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight mb-4">
                {title}<span className="text-[var(--muted)] font-light">.</span>
              </h1>

              <p className="text-[var(--muted)] text-base leading-relaxed border-l-2 border-[var(--border-2)] pl-4 mb-6">
                {excerpt}
              </p>

              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[var(--border)]">
                <span className="inline-flex items-center gap-1.5 text-xs text-[var(--muted)]">
                  <Calendar size={11} />
                  {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <span key={tag} className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-lg bg-[var(--background)] border border-[var(--border)] text-[var(--muted)]">
                      <Tag size={8} />{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Share */}
              <div className="pt-4">
                <ShareButtons
                  title={post.title}
                  url={`https://tushar-portfolio-swart.vercel.app/blog/${post.slug}`}
                />
              </div>
            </motion.div>

            {/* Body */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="prose-custom"
            >
              {renderedContent}
            </motion.div>

            {/* Prev / Next */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="mt-16 pt-10 border-t border-[var(--border)] grid grid-cols-2 gap-4"
            >
              <div>
                {prevPost && (
                  <Link href={`/blog/${prevPost.slug}`}
                    className="group flex flex-col gap-1.5 p-4 rounded-2xl border border-[var(--border)] hover:border-[var(--border-2)] hover:shadow-lg transition-all duration-200"
                    style={{ background: "linear-gradient(135deg, var(--card) 0%, var(--card-2) 100%)" }}
                  >
                    <span className="text-[10px] text-[var(--muted)] uppercase tracking-widest flex items-center gap-1">
                      <ArrowLeft size={10} /> Previous
                    </span>
                    <span className="text-sm font-bold leading-snug group-hover:text-[var(--accent)] transition-colors line-clamp-2">
                      {prevPost.title}
                    </span>
                  </Link>
                )}
              </div>
              <div>
                {nextPost && (
                  <Link href={`/blog/${nextPost.slug}`}
                    className="group flex flex-col gap-1.5 p-4 rounded-2xl border border-[var(--border)] hover:border-[var(--border-2)] hover:shadow-lg transition-all duration-200 text-right"
                    style={{ background: "linear-gradient(135deg, var(--card) 0%, var(--card-2) 100%)" }}
                  >
                    <span className="text-[10px] text-[var(--muted)] uppercase tracking-widest flex items-center justify-end gap-1">
                      Next <ArrowRight size={10} />
                    </span>
                    <span className="text-sm font-bold leading-snug group-hover:text-[var(--accent)] transition-colors line-clamp-2">
                      {nextPost.title}
                    </span>
                  </Link>
                )}
              </div>
            </motion.div>

            {/* Related */}
            {related.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="mt-16 pt-10 border-t border-[var(--border)]"
              >
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-[var(--muted)] mb-6">Related Posts</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {related.map((r, i) => (
                    <motion.div
                      key={r.slug}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.35 + i * 0.06 }}
                      whileHover={{ y: -4 }}
                    >
                      <Link href={`/blog/${r.slug}`}>
                        <div className="group rounded-2xl border border-[var(--border)] p-5 hover:border-[var(--border-2)] hover:shadow-lg transition-all duration-200"
                          style={{ background: "linear-gradient(135deg, var(--card) 0%, var(--card-2) 100%)" }}
                        >
                          <h3 className="font-bold text-sm leading-snug group-hover:text-[var(--accent)] transition-colors mb-2">
                            {r.title}
                          </h3>
                          <span className="inline-flex items-center gap-1 text-[10px] text-[var(--muted)]">
                            <Clock size={9} />{r.readTime}
                          </span>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </article>

          {/* ── TOC ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <TableOfContents key={`toc-${language}`} headings={headings} />
          </motion.div>

        </div>
      </div>

      <Footer />
    </>
  );
}
