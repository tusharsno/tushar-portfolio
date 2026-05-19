"use client";
import { useState } from "react";
import { motion } from "framer-motion";

type Props = {
  hasTranslation: boolean;
  onLanguageChange: (lang: "en" | "bn") => void;
};

export default function LanguageToggle({ hasTranslation, onLanguageChange }: Props) {
  const [active, setActive] = useState<"en" | "bn">("en");

  if (!hasTranslation) return null;

  const handleToggle = (lang: "en" | "bn") => {
    setActive(lang);
    onLanguageChange(lang);
  };

  return (
    <div className="flex items-center gap-1.5 bg-[var(--card)] border border-[var(--border)] rounded-full p-1 mb-6">
      {(["en", "bn"] as const).map((lang) => (
        <button
          key={lang}
          onClick={() => handleToggle(lang)}
          className={`relative px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
            active === lang
              ? "text-[var(--btn-text)]"
              : "text-[var(--muted)] hover:text-[var(--foreground)]"
          }`}
        >
          {active === lang && (
            <motion.span
              layoutId="lang-bg"
              className="absolute inset-0 rounded-full bg-[var(--accent)]"
              transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
            />
          )}
          <span className="relative z-10">
            {lang === "en" ? "English" : "বাংলা"}
          </span>
        </button>
      ))}
    </div>
  );
}