"use client";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  if (dark === null) return <div className="w-7 h-7" />;

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="p-1.5 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors duration-200"
    >
      {dark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
