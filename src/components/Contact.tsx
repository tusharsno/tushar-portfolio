"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Send, CheckCircle2 } from "lucide-react";
import { personal } from "@/data/portfolio";

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("sent");
    setForm({ name: "", email: "", message: "" });
  };

  const socials = [
    { label: "Email",    value: personal.email,          href: `mailto:${personal.email}`, icon: Mail         },
    { label: "GitHub",   value: "github.com/tusharsno",     href: personal.github,            icon: GithubIcon   },
    { label: "LinkedIn", value: "linkedin.com/in/tushar-barua", href: personal.linkedin,         icon: LinkedinIcon },
  ];

  return (
    <section id="contact" className="relative py-28 px-6 overflow-hidden">

      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle, var(--border) 1px, transparent 1px)`,
        backgroundSize: "28px 28px", opacity: 0.5,
      }} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,transparent_40%,var(--background)_100%)] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-3 mb-14"
        >
          <span className="h-px w-10 bg-[var(--accent)]" />
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--muted)]">Contact</span>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 items-start">

          {/* ── LEFT — Info ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight">
                Let&apos;s Work<br />Together<span className="text-[var(--muted)] font-light">.</span>
              </h2>
              <p className="text-[var(--muted)] text-sm leading-relaxed mt-4 border-l-2 border-[var(--border)] pl-4">
                Have a project in mind or just want to say hi? My inbox is always open.
              </p>
            </div>

            {/* Social links */}
            <div className="space-y-3">
              {socials.map(({ label, value, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-3xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)]/40 hover:shadow-md transition-all duration-200 group"
                >
                  <div className="w-9 h-9 rounded-2xl bg-[var(--accent-subtle)] border border-[var(--border)] flex items-center justify-center shrink-0 group-hover:bg-[var(--border)] transition-colors">
                    <Icon />
                  </div>
                  <div>
                    <p className="text-[10px] text-[var(--muted)] uppercase tracking-widest">{label}</p>
                    <p className="text-sm font-medium mt-0.5">{value}</p>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          {/* ── RIGHT — Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-[var(--card)] border border-[var(--border)] rounded-3xl overflow-hidden"
          >
            {status === "sent" ? (
              <div className="flex flex-col items-center justify-center gap-4 text-center p-12">
                <CheckCircle2 size={44} className="text-[var(--foreground)]" />
                <h3 className="font-black text-xl">Message Sent!</h3>
                <p className="text-[var(--muted)] text-sm">Thanks for reaching out. I&apos;ll get back to you soon.</p>
                <button
                  onClick={() => setStatus("idle")}
                  className="text-sm text-[var(--muted)] underline underline-offset-4 hover:text-[var(--foreground)] transition-colors"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
                {/* Form header */}
                <div className="pb-4 border-b border-[var(--border)]">
                  <h3 className="font-bold text-base">Send a message</h3>
                  <p className="text-xs text-[var(--muted)] mt-0.5">I&apos;ll reply within 24 hours.</p>
                </div>

                {[
                  { name: "name",  label: "Name",  type: "text",  placeholder: "Your name"      },
                  { name: "email", label: "Email", type: "email", placeholder: "your@email.com" },
                ].map(({ name, label, type, placeholder }) => (
                  <div key={name}>
                    <label className="block text-xs font-semibold tracking-wide uppercase text-[var(--muted)] mb-2">{label}</label>
                    <input
                      type={type}
                      required
                      placeholder={placeholder}
                      value={form[name as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [name]: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted)] text-sm focus:outline-none focus:border-[var(--accent)] transition-all"
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-xs font-semibold tracking-wide uppercase text-[var(--muted)] mb-2">Message</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell me about your project..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted)] text-sm focus:outline-none focus:border-[var(--accent)] transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-[var(--accent)] text-[var(--btn-text)] text-sm font-semibold hover:opacity-90 disabled:opacity-60 transition-all duration-200"
                >
                  {status === "sending" ? (
                    <span className="w-4 h-4 border-2 border-[var(--btn-text)]/30 border-t-[var(--btn-text)] rounded-full animate-spin" />
                  ) : (
                    <Send size={14} />
                  )}
                  {status === "sending" ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
