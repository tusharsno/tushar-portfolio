"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUp, Mail, Heart } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { personal } from "@/data/portfolio";

const navLinks = [
  { label: "About",      id: "about"      },
  { label: "Skills",     id: "skills"     },
  { label: "Projects",   id: "projects"   },
  { label: "Experience", id: "experience" },
  { label: "Contact",    id: "contact"    },
];

const stack = ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"];

export default function Footer() {
  const pathname = usePathname();
  
  const scrollTo = (id: string) => {
    if (pathname !== "/") {
      // Blog page থেকে home page এ redirect
      window.location.href = `/#${id}`;
    } else {
      // Home page এ scroll
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative overflow-hidden bg-[var(--card)]">

      {/* Gradient top border */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[var(--border-2)] to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-16 pb-8">

        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="lg:col-span-2 space-y-5">
            {/* Logo — same as Navbar */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-2.5"
            >
              <div className="w-8 h-8 rounded-xl bg-[var(--accent)] flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="var(--btn-text)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="8 6 2 12 8 18" />
                  <polyline points="16 6 22 12 16 18" />
                  <line x1="12" y1="4" x2="12" y2="20" strokeWidth="1.8" strokeDasharray="2 2" />
                </svg>
              </div>
              <span className="text-base font-black tracking-tight">
                {personal.name}<span className="text-[var(--muted)] font-light">.</span>
              </span>
            </button>

            <p className="text-sm text-[var(--muted)] leading-relaxed max-w-xs border-l-2 border-[var(--border)] pl-4">
              {personal.tagline}
            </p>

            {/* Socials */}
            <div className="flex items-center gap-2">
              {[
                { label: "GitHub",   href: personal.github,              icon: GithubIcon   },
                { label: "LinkedIn", href: personal.linkedin,            icon: LinkedinIcon },
                { label: "Email",    href: `mailto:${personal.email}`,   icon: Mail         },
              ].map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 flex items-center justify-center rounded-xl border border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--accent-subtle)] transition-all duration-200"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[var(--muted)]">Navigation</p>
            <ul className="space-y-2">
              {navLinks.map(({ label, id }) => (
                <li key={id}>
                  <button
                    onClick={() => scrollTo(id)}
                    className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="w-0 group-hover:w-2.5 h-px bg-[var(--accent)] transition-all duration-200 inline-block" />
                    {label}
                  </button>
                </li>
              ))}
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors duration-200 flex items-center gap-1.5 group"
                >
                  <span className="w-0 group-hover:w-2.5 h-px bg-[var(--accent)] transition-all duration-200 inline-block" />
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[var(--muted)]">Get In Touch</p>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span className="text-sm text-[var(--muted)]">Available for work</span>
              </div>
              <a
                href={`mailto:${personal.email}`}
                className="block text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors break-all"
              >
                {personal.email}
              </a>
              <a
                href={personal.resumeUrl}
                download
                className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border border-[var(--border)] text-[var(--muted)] hover:bg-[var(--accent)] hover:text-[var(--btn-text)] hover:border-[var(--accent)] transition-all duration-200"
              >
                Download CV
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-[var(--border)] mb-6" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--muted)]">
            <span>© {new Date().getFullYear()}</span>
            <span className="font-semibold text-[var(--foreground)]">{personal.name}</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              Built with <Heart size={10} className="text-rose-400 fill-rose-400 mx-0.5" />
            </span>
            {stack.map((tech) => (
              <span key={tech} className="px-1.5 py-0.5 rounded-md bg-[var(--background)] border border-[var(--border)] font-mono text-[10px]">
                {tech}
              </span>
            ))}
          </div>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="group flex items-center gap-2 text-xs text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          >
            Back to top
            <span className="w-7 h-7 flex items-center justify-center rounded-xl border border-[var(--border)] group-hover:bg-[var(--accent-subtle)] transition-all duration-200">
              <ArrowUp size={12} />
            </span>
          </button>
        </div>

      </div>
    </footer>
  );
}
