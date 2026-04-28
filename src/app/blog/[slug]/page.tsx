import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock, Tag, Calendar } from "lucide-react";
import { blogPosts } from "@/data/blog";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TableOfContents from "@/components/blog/TableOfContents";
import ReadingProgress from "@/components/blog/ReadingProgress";
import CopyButton from "@/components/blog/CopyButton";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return { title: `${post.title} | Tushar`, description: post.excerpt };
}

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function extractHeadings(content: string) {
  return content
    .split("\n")
    .filter((line) => line.startsWith("## "))
    .map((line) => {
      const text = line.replace("## ", "");
      return { id: slugify(text), text };
    });
}

function renderContent(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;
  let keyCounter = 0;

  while (i < lines.length) {
    const line = lines[i];
    const key = keyCounter++;

    if (line.startsWith("## ")) {
      const text = line.replace("## ", "");
      const id = slugify(text);
      elements.push(
        <h2 key={key} id={id} className="text-2xl font-black tracking-tight mt-12 mb-4 scroll-mt-24 text-[var(--foreground)]">
          {text}
        </h2>
      );
    } else if (line.startsWith("```")) {
      const lang = line.replace("```", "").trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      elements.push(
        <div key={key} className="my-6 rounded-2xl overflow-hidden border border-[var(--border)] shadow-lg">
          <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-[var(--border)]"
            style={{ background: "linear-gradient(135deg, var(--card-2) 0%, var(--card) 100%)" }}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
            {lang && <span className="text-[10px] text-[var(--muted)] font-mono ml-2 bg-[var(--background)] border border-[var(--border)] px-2 py-0.5 rounded-md">{lang}</span>}
            <div className="ml-auto">
              <CopyButton code={codeLines.join("\n")} />
            </div>
          </div>
          <pre className="p-5 overflow-x-auto bg-[var(--card)]">
            <code className="text-xs font-mono text-[var(--foreground)] leading-6">
              {codeLines.join("\n")}
            </code>
          </pre>
        </div>
      );
    } else if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(lines[i].replace("- ", ""));
        i++;
      }
      elements.push(
        <ul key={key} className="my-4 space-y-2.5">
          {items.map((item, j) => (
            <li key={j} className="flex items-start gap-3 text-sm text-[var(--muted)]">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0" />
              <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, "<strong class='text-[var(--foreground)] font-semibold'>$1</strong>") }} />
            </li>
          ))}
        </ul>
      );
      continue;
    } else if (line.trim() === "") {
      elements.push(<div key={key} className="h-2" />);
    } else {
      elements.push(
        <p key={key} className="text-[var(--muted)] text-sm leading-relaxed"
          dangerouslySetInnerHTML={{ __html: line
            .replace(/\*\*(.*?)\*\*/g, "<strong class='text-[var(--foreground)] font-semibold'>$1</strong>")
            .replace(/`(.*?)`/g, "<code class='font-mono text-xs bg-[var(--accent-subtle)] border border-[var(--border)] px-1.5 py-0.5 rounded-md text-[var(--foreground)]'>$1</code>")
          }}
        />
      );
    }
    i++;
  }
  return elements;
}

const categoryColor: Record<string, string> = {
  "Web Dev": "bg-blue-500/10 border-blue-500/20 text-blue-400",
  "Competitive Programming": "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
  "Backend": "bg-orange-500/10 border-orange-500/20 text-orange-400",
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const headings = extractHeadings(post.content);
  const related = blogPosts.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 2);
  const currentIndex = blogPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;
  const badgeClass = categoryColor[post.category] ?? "bg-[var(--accent-subtle)] border-[var(--border)] text-[var(--muted)]";

  return (
    <>
      <Navbar />
      <ReadingProgress />

      <div className="relative min-h-screen overflow-hidden bg-[var(--background)]">

        {/* Subtle dot grid */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `radial-gradient(circle, var(--border) 1px, transparent 1px)`,
          backgroundSize: "28px 28px", opacity: 0.4,
        }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,transparent_40%,var(--background)_100%)] pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 flex gap-10 items-start pt-24 pb-24">

          {/* ── Article ── */}
          <article className="flex-1 min-w-0">

            <Link href="/blog"
              className="inline-flex items-center gap-2 text-xs text-[var(--muted)] hover:text-[var(--foreground)] transition-colors mb-10 group"
            >
              <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
              Back to Blog
            </Link>

            {/* Header card */}
            <div className="rounded-3xl border border-[var(--border)] p-6 sm:p-8 mb-10"
              style={{ background: "linear-gradient(135deg, var(--card) 0%, var(--card-2) 100%)" }}
            >
              {/* Category + read time */}
              <div className="flex items-center gap-2 mb-4">
                <span className={`text-[10px] font-bold tracking-[0.15em] uppercase px-2.5 py-1 rounded-full border ${badgeClass}`}>
                  {post.category}
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] text-[var(--muted)] bg-[var(--background)] border border-[var(--border)] px-2.5 py-1 rounded-full">
                  <Clock size={9} />{post.readTime}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight mb-4">
                {post.title}<span className="text-[var(--muted)] font-light">.</span>
              </h1>

              <p className="text-[var(--muted)] text-base leading-relaxed border-l-2 border-[var(--border-2)] pl-4 mb-6">
                {post.excerpt}
              </p>

              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[var(--border)]">
                <span className="inline-flex items-center gap-1.5 text-xs text-[var(--muted)]">
                  <Calendar size={11} />
                  {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <span key={tag} className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-lg bg-[var(--background)] border border-[var(--border)] text-[var(--muted)]">
                      <Tag size={8} />{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="prose-custom">{renderContent(post.content)}</div>

            {/* Prev / Next */}
            <div className="mt-16 pt-10 border-t border-[var(--border)] grid grid-cols-2 gap-4">
              <div>
                {prevPost && (
                  <Link href={`/blog/${prevPost.slug}`}
                    className="group flex flex-col gap-1.5 p-4 rounded-2xl border border-[var(--border)] hover:border-[var(--border-2)] hover:shadow-lg transition-all duration-200"
                    style={{ background: "linear-gradient(135deg, var(--card) 0%, var(--card-2) 100%)" }}
                  >
                    <span className="text-[10px] text-[var(--muted)] uppercase tracking-widest flex items-center gap-1">
                      <ArrowLeft size={10} /> Previous
                    </span>
                    <span className="text-sm font-bold leading-snug group-hover:text-[var(--accent)] transition-colors line-clamp-2">
                      {prevPost.title}
                    </span>
                  </Link>
                )}
              </div>
              <div>
                {nextPost && (
                  <Link href={`/blog/${nextPost.slug}`}
                    className="group flex flex-col gap-1.5 p-4 rounded-2xl border border-[var(--border)] hover:border-[var(--border-2)] hover:shadow-lg transition-all duration-200 text-right"
                    style={{ background: "linear-gradient(135deg, var(--card) 0%, var(--card-2) 100%)" }}
                  >
                    <span className="text-[10px] text-[var(--muted)] uppercase tracking-widest flex items-center justify-end gap-1">
                      Next <ArrowRight size={10} />
                    </span>
                    <span className="text-sm font-bold leading-snug group-hover:text-[var(--accent)] transition-colors line-clamp-2">
                      {nextPost.title}
                    </span>
                  </Link>
                )}
              </div>
            </div>

            {/* Related */}
            {related.length > 0 && (
              <div className="mt-16 pt-10 border-t border-[var(--border)]">
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-[var(--muted)] mb-6">Related Posts</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {related.map((r) => (
                    <Link key={r.slug} href={`/blog/${r.slug}`}>
                      <div className="group rounded-2xl border border-[var(--border)] p-5 hover:border-[var(--border-2)] hover:shadow-lg transition-all duration-200"
                        style={{ background: "linear-gradient(135deg, var(--card) 0%, var(--card-2) 100%)" }}
                      >
                        <h3 className="font-bold text-sm leading-snug group-hover:text-[var(--accent)] transition-colors mb-2">
                          {r.title}
                        </h3>
                        <span className="inline-flex items-center gap-1 text-[10px] text-[var(--muted)]">
                          <Clock size={9} />{r.readTime}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* ── TOC ── */}
          <TableOfContents headings={headings} />

        </div>
      </div>

      <Footer />
    </>
  );
}
