"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import { personal } from "@/data/portfolio";

const sectionLinks = ["About", "Skills", "Projects", "Experience", "Contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [pastHero, setPastHero] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isBlog = pathname.startsWith("/blog");

  useEffect(() => {
    let rafId: number;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        setScrolled(scrollY > 20);
        setPastHero(scrollY > window.innerHeight * 0.8);
        if (!isHome) return;
        const sections = sectionLinks.map((l) => document.getElementById(l.toLowerCase()));
        
        let current = null;
        for (let i = sections.length - 1; i >= 0; i--) {
          const section = sections[i];
          if (!section) continue;
          
          const rect = section.getBoundingClientRect();
          const sectionId = section.id;
          
          // Special handling for Contact (last section)
          if (sectionId === 'contact') {
            // If we're near the bottom of the page OR contact is 30% visible
            if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 200 || 
                rect.top <= window.innerHeight * 0.7) {
              current = section;
              break;
            }
          } else {
            // Normal sections: trigger when top is within 100px of viewport top
            if (rect.top <= 100) {
              current = section;
              break;
            }
          }
        }
        setActive(current?.id ?? "");
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [isHome]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  // On hero section: force white text. Past hero: use theme colors
  const onHero = isHome && !pastHero;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? "bg-[var(--background)]/90 backdrop-blur-md border-b border-[var(--border)] shadow-sm"
        : "bg-transparent"
    }`}>
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-300 ${
            onHero ? "bg-white/20 backdrop-blur-md border border-white/20" : "bg-[var(--accent)]"
          }`}>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none"
              stroke={onHero ? "white" : "var(--btn-text)"}
              strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            >
              <polyline points="8 6 2 12 8 18" />
              <polyline points="16 6 22 12 16 18" />
              <line x1="12" y1="4" x2="12" y2="20" strokeWidth="2" strokeDasharray="2 2" />
            </svg>
          </div>
          <span className={`text-sm font-semibold tracking-tight transition-colors duration-300 ${onHero ? "text-white" : ""}`}>
            {personal.name}
          </span>
        </Link>

        {/* Center — pill nav */}
        {isHome && (
          <ul className={`hidden md:flex items-center gap-0.5 rounded-full px-2 py-1.5 border transition-all duration-300 ${
            onHero
              ? "bg-white/10 backdrop-blur-md border-white/20"
              : "bg-[var(--card)] border-[var(--border)]"
          }`}>
            {sectionLinks.map((link) => (
              <li key={link}>
                <button
                  onClick={() => scrollTo(link.toLowerCase())}
                  className={`relative px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                    active === link.toLowerCase()
                      ? onHero ? "text-black" : "text-[var(--btn-text)]"
                      : onHero ? "text-white/70 hover:text-white" : "text-[var(--muted)] hover:text-[var(--foreground)]"
                  }`}
                >
                  {active === link.toLowerCase() && (
                    <span className={`absolute inset-0 rounded-full ${onHero ? "bg-white" : "bg-[var(--accent)]"}`} />
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

        {/* Right */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <ThemeToggle />
          <Link
            href="/blog"
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border ${
              isBlog
                ? "bg-[var(--accent)] text-[var(--btn-text)] border-[var(--accent)]"
                : onHero
                  ? "border-white/30 text-white bg-white/10 backdrop-blur-md hover:bg-white/20"
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
            className={`p-2 transition-colors ${onHero ? "text-white/70" : "text-[var(--muted)]"}`}
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
