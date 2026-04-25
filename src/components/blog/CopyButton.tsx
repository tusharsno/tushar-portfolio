"use client";
import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={copy}
      aria-label="Copy code"
      className="flex items-center gap-1.5 text-[10px] font-medium text-[var(--muted)] hover:text-[var(--foreground)] transition-colors duration-150"
    >
      {copied ? (
        <>
          <Check size={11} className="text-emerald-500" />
          <span className="text-emerald-500">Copied!</span>
        </>
      ) : (
        <>
          <Copy size={11} />
          Copy
        </>
      )}
    </button>
  );
}
