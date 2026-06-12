"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronRight, Menu } from "lucide-react";
import { cgipLabs, type LabTask } from "@/data/cgip";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CopyButton from "@/components/blog/CopyButton";
import SummaryReport from "@/components/blog/SummaryReport";
import ImageGallery from "@/components/blog/ImageGallery";

// ── Inline formatter ─────────────────────────────────────────────────────────
function inlineFormat(text: string) {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong class='text-[var(--foreground)] font-semibold'>$1</strong>")
    .replace(/`(.*?)`/g, "<code class='font-mono text-xs bg-[var(--accent-subtle)] border border-[var(--border)] px-1.5 py-0.5 rounded text-[var(--foreground)]'>$1</code>")
    .replace(/\*(.*?)\*/g, "<em class='italic text-[var(--muted)]'>$1</em>");
}

// ── Render markdown-like content ──────────────────────────────────────────────
function renderContent(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;
  let k = 0;

  while (i < lines.length) {
    const line = lines[i];
    const key = k++;

    if (line.startsWith(":::output")) {
      // Collect output block lines until :::end
      i++;
      const outputLines: string[] = [];
      while (i < lines.length && !lines[i].startsWith(":::end")) {
        outputLines.push(lines[i]);
        i++;
      }
      // Parse images and text from output block
      const imgs: { src: string; alt: string }[] = [];
      const txtLines: string[] = [];
      outputLines.forEach((ol) => {
        const m = ol.match(/^!\[(.*)\]\((.*)\)$/);
        if (m) imgs.push({ alt: m[1], src: m[2] });
        else if (ol.trim()) txtLines.push(ol);
      });
      elements.push(
        <div key={key} className="my-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-green-400">Output</span>
          </div>
          {imgs.length > 0 && <ImageGallery images={imgs} />}
          {txtLines.map((tl, j) => (
            <p key={j} className="text-xs font-mono text-green-300 bg-[#0d1117] border border-[#30363d] rounded px-3 py-1.5 mt-1"
              dangerouslySetInnerHTML={{ __html: inlineFormat(tl) }}
            />
          ))}
        </div>
      );
    } else if (line.startsWith("![{")) {
      // skip
    } else if (line.startsWith("![")) {
      const match = line.match(/^!\[(.*)\]\((.*)\)$/);
      if (match) {
        const [, alt, src] = match;
        elements.push(
          <div key={key} className="my-6 rounded-xl overflow-hidden border border-[var(--border)] shadow-md">
            <img src={src} alt={alt} className="w-full h-auto object-contain" loading="lazy" />
          </div>
        );
      }
    } else if (line.startsWith("```")) {
      const lang = line.replace("```", "").trim();
      const code: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        code.push(lines[i]);
        i++;
      }
      const codeStr = code.join("\n");
      elements.push(
        <div key={key} className="my-5 rounded-xl overflow-hidden border border-[var(--border)] shadow-md">
          <div className="flex items-center gap-1.5 px-4 py-2 border-b border-[var(--border)] bg-[#161b22]">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
            {lang && <span className="ml-2 text-[10px] font-mono text-zinc-400 bg-zinc-800 border border-zinc-700 px-2 py-0.5 rounded">{lang}</span>}
            <div className="ml-auto"><CopyButton code={codeStr} /></div>
          </div>
          <pre className="overflow-x-auto text-xs leading-6 p-4 bg-[#0d1117] text-gray-300 m-0">
            <code>{codeStr}</code>
          </pre>
        </div>
      );
    } else if (line.startsWith("### ")) {
      elements.push(
        <h3 key={key} className="text-base font-bold mt-7 mb-2 text-[var(--foreground)]">
          {line.slice(4)}
        </h3>
      );
    } else if (line.startsWith("## ")) {
      elements.push(
        <h2 key={key} className="text-xl font-black mt-10 mb-3 text-[var(--foreground)]">
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={key} className="my-3 space-y-2">
          {items.map((item, j) => (
            <li key={j} className="flex items-start gap-2 text-sm text-[var(--muted)]">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0" />
              <span dangerouslySetInnerHTML={{ __html: inlineFormat(item) }} />
            </li>
          ))}
        </ul>
      );
      continue;
    } else if (/^\d+\.\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s/, ""));
        i++;
      }
      elements.push(
        <ol key={key} className="my-3 space-y-2 list-none">
          {items.map((item, j) => (
            <li key={j} className="flex items-start gap-3 text-sm text-[var(--muted)]">
              <span className="shrink-0 w-5 h-5 rounded-full bg-[var(--accent)] text-[var(--btn-text)] text-[10px] font-bold flex items-center justify-center mt-0.5">{j + 1}</span>
              <span dangerouslySetInnerHTML={{ __html: inlineFormat(item) }} />
            </li>
          ))}
        </ol>
      );
      continue;
    } else if (line.trim() === "") {
      elements.push(<div key={key} className="h-2" />);
    } else {
      elements.push(
        <p key={key} className="text-sm text-[var(--muted)] leading-relaxed"
          dangerouslySetInnerHTML={{ __html: inlineFormat(line) }}
        />
      );
    }
    i++;
  }
  return elements;
}

// ── Right TOC (sections of active lab) ───────────────────────────────────────
function SectionTOC({ lab, activeSection }: { lab: LabTask; activeSection: string }) {
  return (
    <aside className="hidden xl:sticky xl:top-16 xl:flex xl:h-[calc(100vh-4rem)] shrink-0 w-56 flex-col border-l border-[var(--border)] overflow-y-auto">
      <div className="p-5">
        <p className="text-[11px] font-semibold text-[var(--foreground)] mb-4">On This Page</p>
        <div className="relative border-l border-[var(--border)]">
          {lab.sections.map((sec) => (
            <a
              key={sec.id}
              href={`#${sec.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(sec.id)?.scrollIntoView({ behavior: "smooth" });
              }}
              className={`relative block text-xs py-1.5 pl-4 pr-2 leading-snug transition-colors ${
                activeSection === sec.id
                  ? "text-[var(--foreground)] font-medium"
                  : "text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              {activeSection === sec.id && (
                <span className="absolute left-[-1px] top-1 bottom-1 w-px bg-[var(--foreground)]" />
              )}
              {sec.title}
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function CGIPClient() {
  const [activeLabId, setActiveLabId] = useState(cgipLabs[0].id);
  const [activeSection, setActiveSection] = useState(cgipLabs[0].sections[0]?.id ?? "");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const activeLab = cgipLabs.find((l) => l.id === activeLabId) ?? cgipLabs[0];

  // Track active section via IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    activeLab.sections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(sec.id); },
        { rootMargin: "-80px 0px -60% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [activeLabId, activeLab.sections]);

  function selectLab(id: string) {
    setActiveLabId(id);
    setActiveSection(cgipLabs.find((l) => l.id === id)?.sections[0]?.id ?? "");
    setSidebarOpen(false);
    contentRef.current?.scrollTo({ top: 0 });
    window.scrollTo({ top: 0 });
  }

  const currentIdx = cgipLabs.findIndex((l) => l.id === activeLabId);
  const prevLab = currentIdx > 0 ? cgipLabs[currentIdx - 1] : null;
  const nextLab = currentIdx < cgipLabs.length - 1 ? cgipLabs[currentIdx + 1] : null;

  return (
    <>
      <Navbar />

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 xl:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="min-h-screen bg-[var(--background)] pt-16">
        <div className="max-w-[1400px] mx-auto flex">

          {/* ── Left Sidebar ─────────────────────────────────────────────── */}
          <aside className={`
            fixed xl:sticky top-16 z-50 xl:z-auto
            h-[calc(100vh-4rem)] shrink-0 w-64
            border-r border-[var(--border)] bg-[var(--background)]
            overflow-y-auto transition-transform duration-300
            xl:translate-x-0
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full xl:translate-x-0"}
          `}>
            <div className="p-5">
              {/* Back link */}
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-xs text-[var(--muted)] hover:text-[var(--foreground)] transition-colors mb-6"
              >
                <ArrowLeft size={12} /> Back to Blog
              </Link>

              {/* Course title */}
              <div className="mb-6">
                <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-[var(--muted)] mb-1">Course</p>
                <h2 className="text-sm font-black leading-snug text-[var(--foreground)]">
                  Computer Graphics &amp; Image Processing
                </h2>
              </div>

              {/* Lab list */}
              <nav className="space-y-0.5">
                {cgipLabs.map((lab) => {
                  const isActive = lab.id === activeLabId;
                  return (
                    <button
                      key={lab.id}
                      onClick={() => selectLab(lab.id)}
                      className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-left text-xs transition-all duration-150 ${
                        isActive
                          ? "bg-[var(--accent)] text-[var(--btn-text)] font-semibold"
                          : "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--card)]"
                      }`}
                    >
                      <span className="leading-snug">{lab.title}</span>
                      {isActive && <ChevronRight size={12} className="shrink-0" />}
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* ── Main Content ─────────────────────────────────────────────── */}
          <main ref={contentRef} className="flex-1 min-w-0 px-6 xl:px-10 py-10">

            {/* Mobile top bar */}
            <div className="flex items-center gap-3 mb-8 xl:hidden">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-lg border border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)]"
              >
                <Menu size={16} />
              </button>
              <span className="text-sm font-semibold text-[var(--foreground)] truncate">
                {activeLab.title}
              </span>
            </div>

            <SummaryReport />

            <motion.div
              key={activeLabId}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Lab heading */}
              <h1 className="text-3xl font-black tracking-tight mb-2 text-[var(--foreground)]">
                {activeLab.title}
              </h1>
              <div className="h-px bg-[var(--border)] mb-8" />

              {/* Sections */}
              <div className="space-y-10">
                {activeLab.sections.map((sec) => (
                  <section key={sec.id} id={sec.id} className="scroll-mt-24">
                    <h2 className="text-lg font-bold mb-4 text-[var(--foreground)] flex items-center gap-2">
                      <span className="w-1 h-4 rounded-full bg-[var(--accent)] shrink-0" />
                      {sec.title}
                    </h2>
                    <div>{renderContent(sec.content)}</div>
                  </section>
                ))}
              </div>

              {/* Prev / Next nav */}
              <div className="mt-16 pt-8 border-t border-[var(--border)] grid grid-cols-2 gap-4">
                <div>
                  {prevLab && (
                    <button
                      onClick={() => selectLab(prevLab.id)}
                      className="group w-full flex flex-col gap-1 p-4 rounded-xl border border-[var(--border)] hover:border-[var(--border-2)] text-left transition-all"
                      style={{ background: "var(--card)" }}
                    >
                      <span className="text-[10px] text-[var(--muted)] uppercase tracking-widest flex items-center gap-1">
                        <ArrowLeft size={10} /> Previous
                      </span>
                      <span className="text-sm font-bold group-hover:text-[var(--accent)] transition-colors line-clamp-2">
                        {prevLab.title}
                      </span>
                    </button>
                  )}
                </div>
                <div>
                  {nextLab && (
                    <button
                      onClick={() => selectLab(nextLab.id)}
                      className="group w-full flex flex-col gap-1 p-4 rounded-xl border border-[var(--border)] hover:border-[var(--border-2)] text-right transition-all"
                      style={{ background: "var(--card)" }}
                    >
                      <span className="text-[10px] text-[var(--muted)] uppercase tracking-widest flex items-center justify-end gap-1">
                        Next <ChevronRight size={10} />
                      </span>
                      <span className="text-sm font-bold group-hover:text-[var(--accent)] transition-colors line-clamp-2">
                        {nextLab.title}
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </main>

          {/* ── Right TOC ────────────────────────────────────────────────── */}
          <SectionTOC lab={activeLab} activeSection={activeSection} />

        </div>
      </div>

      <Footer />
    </>
  );
}
