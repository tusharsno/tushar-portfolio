"use client";
import { motion } from "framer-motion";
import { useState, useCallback } from "react";
import { Mail, Send, CheckCircle2, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { personal } from "@/data/portfolio";
import Toast, { ToastType } from "@/components/Toast";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);
  const closeToast = useCallback(() => setToast(null), []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
        setToast({ message: "Message sent! I'll get back to you soon.", type: "success" });
      } else {
        setStatus("idle");
        setToast({ message: "Failed to send. Please try again.", type: "error" });
      }
    } catch {
      setStatus("idle");
      setToast({ message: "Failed to send. Please try again.", type: "error" });
    }
  };

  const socials = [
    { label: "Email",    value: personal.email,                  href: `mailto:${personal.email}`, icon: Mail,         desc: "Drop me a line" },
    { label: "GitHub",   value: "github.com/tusharsno",          href: personal.github,            icon: GithubIcon,   desc: "See my code"    },
    { label: "LinkedIn", value: "linkedin.com/in/tushar-barua",  href: personal.linkedin,          icon: LinkedinIcon, desc: "Let's connect"  },
  ];

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} onClose={closeToast} />}
    <section id="contact" className="relative py-28 px-6">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--border-2)] to-transparent" />

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

          {/* ── LEFT ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight">
                Let&apos;s Work<br />Together<span className="text-[var(--muted)] font-light">.</span>
              </h2>
              <p className="text-[var(--muted)] text-sm leading-relaxed border-l-2 border-[var(--border-2)] pl-4">
                Have a project in mind or just want to say hi? My inbox is always open. I typically reply within 24 hours.
              </p>
            </div>

            {/* Social cards */}
            <div className="space-y-3">
              {socials.map(({ label, value, href, icon: Icon, desc }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  whileHover={{ x: 4, transition: { duration: 0.2 } }}
                  className="flex items-center gap-4 p-4 rounded-lg border border-[var(--border)] bg-[var(--card)] hover:border-[var(--border-2)] hover:shadow-lg transition-all duration-200 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[var(--background)] border border-[var(--border)] flex items-center justify-center shrink-0 group-hover:border-[var(--border-2)] transition-colors">
                    <Icon />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-[var(--muted)] uppercase tracking-widest">{label}</p>
                    <p className="text-sm font-semibold mt-0.5 truncate">{value}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <ArrowUpRight size={13} className="text-[var(--muted)] group-hover:text-[var(--foreground)] transition-colors" />
                    <span className="text-[10px] text-[var(--muted)]">{desc}</span>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* ── RIGHT — Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-xl border border-[var(--border)] overflow-hidden"
            style={{ background: "linear-gradient(135deg, var(--card) 0%, var(--card-2) 100%)" }}
          >
            {status === "sent" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center gap-4 text-center p-12"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <CheckCircle2 size={28} className="text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-black text-xl">Message Sent!</h3>
                  <p className="text-[var(--muted)] text-sm mt-1">Thanks for reaching out. I&apos;ll get back to you soon.</p>
                </div>
                <button
                  onClick={() => setStatus("idle")}
                  className="text-sm text-[var(--muted)] underline underline-offset-4 hover:text-[var(--foreground)] transition-colors"
                >
                  Send another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
                {/* Form header */}
                <div className="pb-4 border-b border-[var(--border)]">
                  <h3 className="font-black text-base">Send a message</h3>
                  <p className="text-xs text-[var(--muted)] mt-0.5">I&apos;ll reply within 24 hours.</p>
                </div>

                {[
                  { name: "name",  label: "Name",  type: "text",  placeholder: "Your name"      },
                  { name: "email", label: "Email", type: "email", placeholder: "your@email.com" },
                ].map(({ name, label, type, placeholder }) => (
                  <div key={name} className="space-y-1.5">
                    <label className="block text-xs font-bold tracking-wide uppercase text-[var(--muted)]">{label}</label>
                    <input
                      type={type}
                      required
                      placeholder={placeholder}
                      value={form[name as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [name]: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted-2)] text-sm focus:outline-none focus:border-[var(--border-2)] focus:ring-1 focus:ring-[var(--border-2)] transition-all"
                    />
                  </div>
                ))}

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold tracking-wide uppercase text-[var(--muted)]">Message</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell me about your project..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted-2)] text-sm focus:outline-none focus:border-[var(--border-2)] focus:ring-1 focus:ring-[var(--border-2)] transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-[var(--accent)] text-[var(--btn-text)] text-sm font-bold hover:opacity-90 disabled:opacity-60 transition-all duration-200 hover:scale-[1.01]"
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
    </>  
  );
}
