import { createHighlighter, type Highlighter } from "shiki";

export const SUPPORTED_LANGS = [
  "tsx", "ts", "typescript", "js", "javascript", "jsx",
  "bash", "cpp", "python", "prisma", "json", "css", "html",
] as const;

// Module-level singleton — initialized once, reused across all requests
let highlighterInstance: Highlighter | null = null;
let initPromise: Promise<Highlighter> | null = null;

export async function getHighlighter(): Promise<Highlighter> {
  if (highlighterInstance) return highlighterInstance;

  // Prevent multiple concurrent initializations
  if (!initPromise) {
    initPromise = createHighlighter({
      themes: ["github-dark"],
      langs: [...SUPPORTED_LANGS],
    }).then((h) => {
      highlighterInstance = h;
      return h;
    });
  }

  return initPromise;
}
