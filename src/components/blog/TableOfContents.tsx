"use client";
import { useEffect, useState, useRef } from "react";

type Heading = { id: string; text: string };

export default function TableOfContents({ headings }: { headings: Heading[] }) {
  const [active, setActive] = useState(headings[0]?.id ?? "");
  const [isAbsolute, setIsAbsolute] = useState(false);
  const asideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 }
    );
    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings]);

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector("footer");
      if (!footer || !asideRef.current) return;

      const footerTop = footer.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      // Switch to absolute when footer enters viewport
      setIsAbsolute(footerTop < windowHeight);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (headings.length === 0) return null;

  return (
    <aside ref={asideRef} className="hidden xl:block shrink-0 w-52 relative">
      <div
        className={`w-52 max-h-[calc(100vh-7rem)] overflow-y-auto pb-4 transition-none ${
          isAbsolute
            ? "absolute bottom-0 top-auto"
            : "fixed top-24"
        }`}
      >
        <p className="text-[11px] font-semibold text-[var(--foreground)] mb-4">
          On This Page
        </p>

        <div className="relative border-l border-[var(--border)]">
          {headings.map(({ id, text }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
              }}
              className={`relative block text-xs py-1.5 pl-4 pr-2 leading-snug transition-colors duration-150 ${
                active === id
                  ? "text-[var(--foreground)] font-medium"
                  : "text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              {active === id && (
                <span className="absolute left-[-1px] top-1 bottom-1 w-px bg-[var(--foreground)]" />
              )}
              {text}
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
}
