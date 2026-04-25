"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import { personal } from "@/data/portfolio";

const sectionLinks = ["About", "Skills", "Projects", "Experience"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isBlog = pathname.startsWith("/blog");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      if (!isHome) return;
      const sections = sectionLinks.map((l) => document.getElementById(l.toLowerCase()));
      const current = sections.filter((s) => s && s.getBoundingClientRect().top <= 100).pop();
      setActive(current?.id ?? "");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? "bg-[var(--background)]/90 backdrop-blur-md border-b border-[var(--border)] shadow-sm"
        : "bg-transparent"
    }`}>
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <div className="w-7 h-7 rounded-lg bg-[var(--accent)] flex items-center justify-center shrink-0">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="var(--btn-text)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="8 6 2 12 8 18" />
              <polyline points="16 6 22 12 16 18" />
              <line x1="12" y1="4" x2="12" y2="20" strokeWidth="2" strokeDasharray="2 2" />
            </svg>
          </div>
          <span className="text-sm font-semibold tracking-tight">
            {personal.name}
          </span>
        </Link>

        {/* Center — pill nav */}
        {isHome && (
          <ul className="hidden md:flex items-center gap-0.5 bg-[var(--card)] border border-[var(--border)] rounded-full px-2 py-1.5">
            {sectionLinks.map((link) => (
              <li key={link}>
                <button
                  onClick={() => scrollTo(link.toLowerCase())}
                  className={`relative px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                    active === link.toLowerCase()
                      ? "text-[var(--btn-text)]"
                      : "text-[var(--muted)] hover:text-[var(--foreground)]"
                  }`}
                >
                  {active === link.toLowerCase() && (
                    <span className="absolute inset-0 rounded-full bg-[var(--accent)]" />
                  )}
                  <span className="relative z-10">{link}</span>
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Blog breadcrumb */}
        {isBlog && (
          <div className="hidden md:flex items-center gap-2 text-xs text-[var(--muted)]">
            <Link href="/" className="hover:text-[var(--foreground)] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[var(--foreground)] font-medium">Blog</span>
          </div>
        )}

        {/* Right — Contact + ThemeToggle + Blog */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          {isHome && (
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="text-xs font-medium text-[var(--muted)] hover:text-[var(--foreground)] transition-colors duration-200"
            >
              Contact
            </button>
          )}
          <ThemeToggle />
          <Link
            href="/blog"
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border ${
              isBlog
                ? "bg-[var(--accent)] text-[var(--btn-text)] border-[var(--accent)]"
                : "border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--accent-subtle)]"
            }`}
          >
            Blog
          </Link>
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            className="p-2 text-[var(--muted)]"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden bg-[var(--background)] border-b border-[var(--border)] px-6 py-3 space-y-1">
          {isHome && sectionLinks.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link.toLowerCase())}
              className="block w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--accent-subtle)] transition-colors"
            >
              {link}
            </button>
          ))}
          {isHome && (
            <button
              onClick={() => { scrollTo("contact"); setOpen(false); }}
              className="block w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--accent-subtle)] transition-colors"
            >
              Contact
            </button>
          )}
          <div className="pt-2 border-t border-[var(--border)]">
            <Link
              href="/blog"
              onClick={() => setOpen(false)}
              className={`block w-full text-center px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                isBlog
                  ? "bg-[var(--accent)] text-[var(--btn-text)]"
                  : "border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--accent-subtle)]"
              }`}
            >
              Blog
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
