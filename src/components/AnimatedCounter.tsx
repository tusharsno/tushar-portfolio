"use client";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

type Props = {
  value: string; // e.g. "250+", "20+", "Active"
  duration?: number; // ms
};

export default function AnimatedCounter({ value, duration = 1200 }: Props) {
  // Parse numeric part and suffix (e.g. "250+" → 250, "+")
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1]) : null;
  const suffix = match ? match[2] : null;

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView || target === null) return;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
      else setCount(target);
    };

    requestAnimationFrame(tick);
  }, [inView, target, duration]);

  // Non-numeric value (e.g. "Active") — just show as-is
  if (target === null) return <span ref={ref}>{value}</span>;

  return (
    <span ref={ref}>
      {inView ? count : 0}{suffix}
    </span>
  );
}
