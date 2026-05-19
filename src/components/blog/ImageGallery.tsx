"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Images } from "lucide-react";

type Props = {
  images: { src: string; alt: string }[];
};

export default function ImageGallery({ images }: Props) {
  const [expanded, setExpanded] = useState(false);

  if (!images.length) return null;

  const [first, ...rest] = images;

  return (
    <div className="my-8 rounded-2xl overflow-hidden border border-[var(--border)] shadow-lg">
      {/* First image always visible */}
      <img
        src={first.src}
        alt={first.alt}
        className="w-full h-auto object-cover"
        loading="lazy"
      />

      {/* Expanded images */}
      <AnimatePresence>
        {expanded && rest.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="border-t border-[var(--border)] overflow-hidden"
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Toggle button */}
      {rest.length > 0 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[var(--card)] border-t border-[var(--border)] text-xs font-semibold text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--card-2)] transition-all duration-200"
        >
          <Images size={13} />
          {expanded ? (
            <>Hide {rest.length} more images <ChevronUp size={13} /></>
          ) : (
            <>Show {rest.length} more images <ChevronDown size={13} /></>
          )}
        </button>
      )}
    </div>
  );
}
