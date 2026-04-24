export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  readTime: string;
  tags: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "getting-started-with-nextjs",
    title: "Getting Started with Next.js 16",
    excerpt: "A practical guide to building modern web applications with Next.js 16, App Router, and TypeScript.",
    category: "Web Dev",
    date: "2025-01-15",
    readTime: "5 min read",
    tags: ["Next.js", "TypeScript", "React"],
    content: `
## Introduction

Next.js 16 brings significant improvements to the App Router, making it easier than ever to build fast, scalable web applications.

## Setting Up

To create a new Next.js project, run:

\`\`\`bash
npx create-next-app@latest my-app --typescript --tailwind
\`\`\`

## App Router Basics

The App Router uses a file-system based routing approach. Every \`page.tsx\` file inside the \`app/\` directory becomes a route.

\`\`\`tsx
// app/about/page.tsx
export default function About() {
  return <h1>About Page</h1>;
}
\`\`\`

## Server vs Client Components

By default, all components in the App Router are **Server Components**. Add \`"use client"\` at the top to make it a Client Component.

## Conclusion

Next.js 16 is a powerful framework that makes building production-ready applications straightforward. Start with the basics and gradually explore advanced features.
    `.trim(),
  },
  {
    slug: "dsa-problem-solving-tips",
    title: "My DSA Problem Solving Approach",
    excerpt: "After solving 250+ problems on Codeforces, here are the strategies that helped me improve consistently.",
    category: "Competitive Programming",
    date: "2025-01-28",
    readTime: "7 min read",
    tags: ["DSA", "Codeforces", "Algorithms"],
    content: `
## Background

After solving 250+ problems on Codeforces and participating in 20+ contests, I've developed a systematic approach to tackling algorithmic problems.

## Step 1: Understand Before Coding

Read the problem at least twice. Identify:
- Input/output format
- Constraints (this tells you the expected time complexity)
- Edge cases

## Step 2: Think on Paper First

Never jump straight to coding. Spend 5-10 minutes thinking about the approach. Draw diagrams if needed.

## Step 3: Start with Brute Force

Always think about the brute force solution first, then optimize.

## Step 4: Common Patterns to Recognize

- **Two Pointers** — sorted arrays, finding pairs
- **Sliding Window** — subarray problems
- **Binary Search** — sorted data, monotonic functions
- **Dynamic Programming** — overlapping subproblems
- **Graph BFS/DFS** — connectivity, shortest path

## Step 5: Practice Consistently

Solve at least 1-2 problems daily. Focus on understanding, not just AC.

## Conclusion

Consistency beats intensity. Keep solving, keep learning.
    `.trim(),
  },
  {
    slug: "building-fullstack-with-prisma",
    title: "Full Stack Development with Prisma & PostgreSQL",
    excerpt: "How I use Prisma ORM with PostgreSQL to build type-safe, scalable backends for my projects.",
    category: "Backend",
    date: "2025-02-10",
    readTime: "6 min read",
    tags: ["Prisma", "PostgreSQL", "Node.js"],
    content: `
## Why Prisma?

Prisma is a next-generation ORM that makes database access easy with an auto-generated and type-safe query builder.

## Setting Up Prisma

\`\`\`bash
npm install prisma @prisma/client
npx prisma init
\`\`\`

## Defining Your Schema

\`\`\`prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
}
\`\`\`

## Running Migrations

\`\`\`bash
npx prisma migrate dev --name init
\`\`\`

## Querying Data

\`\`\`typescript
const users = await prisma.user.findMany({
  where: { email: { contains: "@gmail.com" } },
  orderBy: { createdAt: "desc" },
});
\`\`\`

## Conclusion

Prisma + PostgreSQL is my go-to stack for building reliable, type-safe backends. The developer experience is excellent.
    `.trim(),
  },
];

export const categories = ["All", ...Array.from(new Set(blogPosts.map((p) => p.category)))];
