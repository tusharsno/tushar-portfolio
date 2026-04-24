import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Tag, Calendar } from "lucide-react";
import { blogPosts } from "@/data/blog";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return {};
  return { title: `${post.title} | Tushar`, description: post.excerpt };
}

function renderContent(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="text-2xl font-black tracking-tight mt-10 mb-4">
          {line.replace("## ", "")}
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
        <div key={i} className="my-5 rounded-2xl overflow-hidden border border-[var(--border)]">
          <div className="flex items-center gap-1.5 px-4 py-2.5 bg-[var(--accent-subtle)] border-b border-[var(--border)]">
            <span className="w-2 h-2 rounded-full bg-red-400/60" />
            <span className="w-2 h-2 rounded-full bg-yellow-400/60" />
            <span className="w-2 h-2 rounded-full bg-green-400/60" />
            {lang && <span className="ml-auto text-[10px] text-[var(--muted)] font-mono">{lang}</span>}
          </div>
          <pre className="p-4 overflow-x-auto bg-[var(--card)]">
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
        <ul key={i} className="my-4 space-y-2">
          {items.map((item, j) => (
            <li key={j} className="flex items-start gap-2 text-sm text-[var(--muted)]">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0" />
              <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, "<strong class='text-[var(--foreground)] font-semibold'>$1</strong>") }} />
            </li>
          ))}
        </ul>
      );
      continue;
    } else if (line.trim() === "") {
      elements.push(<div key={i} className="h-2" />);
    } else {
      elements.push(
        <p key={i} className="text-[var(--muted)] text-sm leading-relaxed"
          dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, "<strong class='text-[var(--foreground)] font-semibold'>$1</strong>").replace(/`(.*?)`/g, "<code class='font-mono text-xs bg-[var(--accent-subtle)] border border-[var(--border)] px-1.5 py-0.5 rounded-md'>$1</code>") }}
        />
      );
    }
    i++;
  }
  return elements;
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const related = blogPosts.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 2);

  return (
    <>
      <Navbar />
      <main className="relative min-h-screen pt-24 pb-16 px-6 overflow-hidden">

        {/* Dot grid */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `radial-gradient(circle, var(--border) 1px, transparent 1px)`,
          backgroundSize: "28px 28px", opacity: 0.5,
        }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,transparent_40%,var(--background)_100%)] pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto pt-8">

          {/* Back */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs text-[var(--muted)] hover:text-[var(--foreground)] transition-colors mb-10 group"
          >
            <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
            Back to Blog
          </Link>

          {/* Post header */}
          <div className="mb-10">
            <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-[var(--muted)] bg-[var(--accent-subtle)] border border-[var(--border)] px-2.5 py-1 rounded-full">
              {post.category}
            </span>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight mt-4 mb-4">
              {post.title}<span className="text-[var(--muted)] font-light">.</span>
            </h1>
            <p className="text-[var(--muted)] text-base leading-relaxed border-l-2 border-[var(--border)] pl-4 mb-6">
              {post.excerpt}
            </p>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--muted)]">
              <span className="inline-flex items-center gap-1.5">
                <Calendar size={11} />
                {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock size={11} />{post.readTime}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-1 font-mono px-2 py-0.5 rounded-lg bg-[var(--card)] border border-[var(--border)]">
                    <Tag size={8} />{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-[var(--border)] mb-10" />

          {/* Content */}
          <div className="prose-custom">
            {renderContent(post.content)}
          </div>

          {/* Related posts */}
          {related.length > 0 && (
            <div className="mt-16 pt-10 border-t border-[var(--border)]">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--muted)] mb-6">Related Posts</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {related.map((r) => (
                  <Link key={r.slug} href={`/blog/${r.slug}`}>
                    <div className="group bg-[var(--card)] border border-[var(--border)] rounded-3xl p-5 hover:border-[var(--accent)]/30 hover:shadow-lg transition-all duration-200">
                      <h3 className="font-bold text-sm leading-snug group-hover:text-[var(--accent)] transition-colors mb-2">
                        {r.title}
                      </h3>
                      <p className="text-[10px] text-[var(--muted)]">{r.readTime}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>
      <Footer />
    </>
  );
}
