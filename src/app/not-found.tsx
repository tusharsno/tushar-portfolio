import Link from "next/link";
import { personal } from "@/data/portfolio";

export const metadata = {
  title: "404 — Page Not Found | Tushar",
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-[var(--background)] relative overflow-hidden">

      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: "radial-gradient(circle, var(--border) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,transparent_40%,var(--background)_100%)] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center gap-6 max-w-md">

        {/* Big 404 */}
        <p className="text-[120px] sm:text-[160px] font-black leading-none tabular-nums text-[var(--border)] select-none">
          404
        </p>

        {/* Message */}
        <div className="space-y-2 -mt-4">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Page not found<span className="text-[var(--muted)] font-light">.</span>
          </h1>
          <p className="text-sm text-[var(--muted)] leading-relaxed">
            Looks like this page doesn&apos;t exist. Maybe it was moved, deleted, or you mistyped the URL.
          </p>
        </div>

        {/* Divider */}
        <div className="w-12 h-px bg-[var(--border-2)]" />

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--accent)] text-[var(--btn-text)] text-sm font-semibold hover:opacity-90 hover:scale-[1.03] transition-all duration-200"
          >
            Go Home
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[var(--border)] text-sm font-semibold hover:bg-[var(--accent-subtle)] hover:border-[var(--border-2)] transition-all duration-200"
          >
            Read Blog
          </Link>
        </div>

        {/* Footer note */}
        <p className="text-xs text-[var(--muted)]">
          {personal.name} · {personal.email}
        </p>

      </div>
    </div>
  );
}
