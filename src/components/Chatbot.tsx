"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

type Message = { role: "user" | "assistant"; content: string };

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I'm Tushar's assistant. Ask me anything about his skills, projects, or experience! 👋" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;

    const newMessages: Message[] = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      setMessages([...newMessages, { role: "assistant", content: data.reply || data.error || "Sorry, something went wrong." }]);
    } catch {
      setMessages([...newMessages, { role: "assistant", content: "Sorry, I couldn't connect. Please try again." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-[340px] h-[480px] flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)] bg-[var(--card-2)]">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-sm font-semibold text-[var(--foreground)]">Tushar&apos;s Assistant</span>
              </div>
              <button onClick={() => setOpen(false)} className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${msg.role === "user" ? "bg-[var(--accent)]" : "bg-[var(--border-2)]"}`}>
                    {msg.role === "user" ? <User size={12} className="text-[var(--btn-text)]" /> : <Bot size={12} className="text-[var(--foreground)]" />}
                  </div>
                  <div className={`max-w-[75%] px-3 py-2 rounded-xl text-sm leading-relaxed ${msg.role === "user" ? "bg-[var(--accent)] text-[var(--btn-text)] rounded-tr-sm" : "bg-[var(--accent-subtle)] text-[var(--foreground)] rounded-tl-sm border border-[var(--border)]"}`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex gap-2">
                  <div className="w-6 h-6 rounded-full bg-[var(--border-2)] flex items-center justify-center shrink-0">
                    <Bot size={12} className="text-[var(--foreground)]" />
                  </div>
                  <div className="bg-[var(--accent-subtle)] border border-[var(--border)] px-3 py-2 rounded-xl rounded-tl-sm flex gap-1 items-center">
                    {[0, 1, 2].map((i) => (
                      <span key={i} className="w-1.5 h-1.5 rounded-full bg-[var(--muted)] animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="px-3 py-3 border-t border-[var(--border)] bg-[var(--card-2)]">
              <div className="flex gap-2 items-center">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Ask about Tushar..."
                  className="flex-1 bg-[var(--background)] border border-[var(--border)] rounded-xl px-3 py-2 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] outline-none focus:border-[var(--border-2)] transition-colors"
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || loading}
                  className="w-8 h-8 rounded-xl bg-[var(--accent)] flex items-center justify-center disabled:opacity-40 transition-opacity hover:opacity-80"
                >
                  <Send size={14} className="text-[var(--btn-text)]" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full flex items-center justify-center"
        style={{
          background: open ? "var(--card-2)" : "linear-gradient(145deg, #1f1f1f, #111111)",
          boxShadow: open ? "none" : "0 0 0 1px rgba(255,255,255,0.1), 0 12px 40px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.08)",
          border: open ? "1px solid var(--border)" : "none",
        }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X size={18} className="text-[var(--foreground)]" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <MessageCircle size={20} className="text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
