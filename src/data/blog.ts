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
    title: "Next.js 16 — A to Z Complete Guide",
    excerpt: "Everything you need to know about Next.js 16 — from project setup to deployment. App Router, Server Components, data fetching, routing, and more explained clearly.",
    category: "Web Dev",
    date: "2025-01-15",
    readTime: "15 min read",
    tags: ["Next.js", "TypeScript", "React", "App Router"],
    content: `
## What is Next.js?

Next.js is a React framework built by Vercel that gives you everything you need to build production-ready web applications. It handles routing, rendering, data fetching, and optimization out of the box.

**Why use Next.js over plain React?**

- Built-in file-system routing — no need for React Router
- Server-side rendering (SSR) and static generation (SSG) out of the box
- Automatic code splitting and performance optimization
- Built-in image, font, and script optimization
- Full-stack capability — API routes in the same project
- Deploy instantly to Vercel with zero config

## Setting Up a New Project

\`\`\`bash
pnpm create next-app@latest my-app --typescript --tailwind --app
cd my-app
pnpm dev
\`\`\`

This creates a project with TypeScript, Tailwind CSS, and the App Router enabled. Open http://localhost:3000 to see your app.

## Project Structure

\`\`\`bash
my-app/
├── src/
│   └── app/
│       ├── layout.tsx      ← Root layout (wraps all pages)
│       ├── page.tsx        ← Home page (route: /)
│       ├── about/
│       │   └── page.tsx    ← About page (route: /about)
│       └── globals.css
├── public/
├── next.config.ts
└── package.json
\`\`\`

## App Router vs Pages Router

Next.js has two routing systems. The **App Router** (introduced in Next.js 13) is the modern approach.

- **App Router** — uses the app/ directory, supports Server Components, layouts, and streaming
- **Pages Router** — uses the pages/ directory, the older approach still supported

## File-System Routing

Every page.tsx file inside app/ automatically becomes a route:

\`\`\`bash
app/page.tsx              → /
app/about/page.tsx        → /about
app/blog/page.tsx         → /blog
app/blog/[slug]/page.tsx  → /blog/any-slug (dynamic route)
\`\`\`

## Server Components vs Client Components

This is the most important concept in the App Router.

**Server Components** (default) — run on the server, can fetch data directly, cannot use hooks or browser APIs:

\`\`\`tsx
export default async function Page() {
  const data = await fetch("https://api.example.com/data");
  const json = await data.json();
  return <div>{json.title}</div>;
}
\`\`\`

**Client Components** — run in the browser, can use useState, useEffect, event handlers:

\`\`\`tsx
"use client";
import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
\`\`\`

**Rule of thumb:** Use Server Components by default. Only add "use client" when you need interactivity or React hooks.

## Layouts

Layouts wrap multiple pages and persist across navigation:

\`\`\`tsx
// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav>My Navbar</nav>
        {children}
        <footer>My Footer</footer>
      </body>
    </html>
  );
}
\`\`\`

## Dynamic Routes

Use square brackets for dynamic segments:

\`\`\`tsx
// app/blog/[slug]/page.tsx
export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <h1>Post: {slug}</h1>;
}
\`\`\`

Note: In Next.js 16, params is a Promise — always await it.

## Data Fetching

In Server Components, fetch data directly with async/await:

\`\`\`tsx
async function getPosts() {
  const res = await fetch("https://api.example.com/posts", {
    next: { revalidate: 3600 },
  });
  return res.json();
}

export default async function BlogPage() {
  const posts = await getPosts();
  return (
    <ul>
      {posts.map((post: { id: number; title: string }) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
\`\`\`

## Static Generation with generateStaticParams

Pre-render dynamic routes at build time:

\`\`\`tsx
export function generateStaticParams() {
  return [
    { slug: "post-1" },
    { slug: "post-2" },
  ];
}
\`\`\`

## Metadata & SEO

\`\`\`tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Blog",
  description: "A blog about web development",
};
\`\`\`

## API Routes

Create backend endpoints inside your Next.js app:

\`\`\`tsx
// app/api/hello/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Hello World" });
}

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({ received: body });
}
\`\`\`

## Image Optimization

Always use next/image instead of img for automatic optimization:

\`\`\`tsx
import Image from "next/image";

export default function Avatar() {
  return (
    <Image
      src="/avatar.jpg"
      alt="Profile photo"
      width={200}
      height={200}
      priority
    />
  );
}
\`\`\`

## Environment Variables

\`\`\`bash
# .env.local
DATABASE_URL="postgresql://..."
NEXT_PUBLIC_API_URL="https://api.example.com"
\`\`\`

Variables prefixed with NEXT_PUBLIC_ are exposed to the browser. Others are server-only.

## Deploying to Vercel

\`\`\`bash
pnpm add -g vercel
vercel
\`\`\`

Or connect your GitHub repo to Vercel — every push auto-deploys.

## Conclusion

Next.js 16 is the most complete React framework available. Start with the App Router, use Server Components by default, and only reach for Client Components when needed. The file-system routing, built-in optimizations, and seamless Vercel deployment make it the best choice for modern web apps.
    `.trim(),
  },
  {
    slug: "dsa-problem-solving-tips",
    title: "DSA & Competitive Programming — Complete Guide",
    excerpt: "A complete guide to Data Structures, Algorithms, and Competitive Programming. From arrays to graphs, time complexity to contest strategy — everything explained with code examples.",
    category: "Competitive Programming",
    date: "2025-01-28",
    readTime: "20 min read",
    tags: ["DSA", "Codeforces", "Algorithms", "C++"],
    content: `
## What is DSA?

**Data Structures and Algorithms (DSA)** is the foundation of computer science. A data structure is a way to organize data, and an algorithm is a step-by-step process to solve a problem.

Mastering DSA helps you:
- Write efficient code that scales
- Crack technical interviews at top companies
- Perform well in competitive programming contests
- Think logically and break down complex problems

## Time & Space Complexity

Before learning data structures, understand **Big O Notation** — how we measure algorithm efficiency.

\`\`\`
O(1)       → Constant time   — best
O(log n)   → Logarithmic     — great
O(n)       → Linear          — good
O(n log n) → Linearithmic    — acceptable
O(n²)      → Quadratic       — slow for large n
O(2ⁿ)      → Exponential     — very slow
\`\`\`

**Rule:** If n is 10^8, O(n) is fine. If n is 10^6, O(n log n) is fine. If n is 10^3, O(n^2) is fine.

## Arrays

The most fundamental data structure. Elements stored in contiguous memory.

\`\`\`cpp
int arr[] = {1, 2, 3, 4, 5};
int n = 5;

// Access: O(1)
cout << arr[2]; // 3

// Prefix sum — precompute cumulative sums
int prefix[n];
prefix[0] = arr[0];
for (int i = 1; i < n; i++)
    prefix[i] = prefix[i-1] + arr[i];

// Range sum query in O(1)
// Sum from index l to r:
int sum = prefix[r] - (l > 0 ? prefix[l-1] : 0);
\`\`\`

## Two Pointers Technique

Use two pointers moving toward each other or in the same direction.

\`\`\`cpp
// Find pair with target sum in sorted array
bool hasPair(vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    while (left < right) {
        int sum = arr[left] + arr[right];
        if (sum == target) return true;
        else if (sum < target) left++;
        else right--;
    }
    return false;
}
// Time: O(n), Space: O(1)
\`\`\`

## Sliding Window

For problems involving subarrays or substrings of fixed or variable size.

\`\`\`cpp
// Maximum sum subarray of size k
int maxSumSubarray(vector<int>& arr, int k) {
    int windowSum = 0, maxSum = 0;
    for (int i = 0; i < k; i++)
        windowSum += arr[i];
    maxSum = windowSum;

    for (int i = k; i < arr.size(); i++) {
        windowSum += arr[i] - arr[i - k];
        maxSum = max(maxSum, windowSum);
    }
    return maxSum;
}
// Time: O(n), Space: O(1)
\`\`\`

## Binary Search

Search in O(log n) on sorted data. One of the most important techniques.

\`\`\`cpp
int binarySearch(vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}

// Binary search on answer
bool canAchieve(int x) { return true; }

int findMinimum(int lo, int hi) {
    while (lo < hi) {
        int mid = (lo + hi) / 2;
        if (canAchieve(mid)) hi = mid;
        else lo = mid + 1;
    }
    return lo;
}
\`\`\`

## Stack

LIFO (Last In First Out). Used for matching brackets, next greater element, etc.

\`\`\`cpp
// Classic: Valid parentheses
bool isValid(string s) {
    stack<char> st;
    for (char c : s) {
        if (c == '(' || c == '[' || c == '{') st.push(c);
        else {
            if (st.empty()) return false;
            if (c == ')' && st.top() != '(') return false;
            if (c == ']' && st.top() != '[') return false;
            if (c == '}' && st.top() != '{') return false;
            st.pop();
        }
    }
    return st.empty();
}
\`\`\`

## HashMap & HashSet

O(1) average lookup, insertion, deletion.

\`\`\`cpp
unordered_map<string, int> freq;
freq["apple"]++;
freq["banana"] += 2;

if (freq.count("apple")) cout << "exists";

unordered_set<int> seen;
seen.insert(5);
if (seen.count(5)) cout << "found";
\`\`\`

## Recursion & Backtracking

\`\`\`cpp
// Fibonacci with memoization
unordered_map<int, long long> memo;
long long fib(int n) {
    if (n <= 1) return n;
    if (memo.count(n)) return memo[n];
    return memo[n] = fib(n-1) + fib(n-2);
}

// Backtracking — generate all subsets
void subsets(vector<int>& nums, int idx,
             vector<int>& curr, vector<vector<int>>& result) {
    result.push_back(curr);
    for (int i = idx; i < nums.size(); i++) {
        curr.push_back(nums[i]);
        subsets(nums, i + 1, curr, result);
        curr.pop_back();
    }
}
\`\`\`

## Dynamic Programming

Break problem into overlapping subproblems, store results to avoid recomputation.

\`\`\`cpp
// Longest Common Subsequence (LCS)
int lcs(string& a, string& b) {
    int m = a.size(), n = b.size();
    vector<vector<int>> dp(m+1, vector<int>(n+1, 0));
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (a[i-1] == b[j-1])
                dp[i][j] = dp[i-1][j-1] + 1;
            else
                dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
        }
    }
    return dp[m][n];
}

// 0/1 Knapsack
int knapsack(vector<int>& weights, vector<int>& values, int W) {
    int n = weights.size();
    vector<vector<int>> dp(n+1, vector<int>(W+1, 0));
    for (int i = 1; i <= n; i++) {
        for (int w = 0; w <= W; w++) {
            dp[i][w] = dp[i-1][w];
            if (weights[i-1] <= w)
                dp[i][w] = max(dp[i][w],
                    dp[i-1][w-weights[i-1]] + values[i-1]);
        }
    }
    return dp[n][W];
}
\`\`\`

## Graph — BFS & DFS

\`\`\`cpp
// BFS — shortest path in unweighted graph
vector<int> bfs(vector<vector<int>>& adj, int src, int n) {
    vector<int> dist(n, -1);
    queue<int> q;
    dist[src] = 0;
    q.push(src);
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int v : adj[u]) {
            if (dist[v] == -1) {
                dist[v] = dist[u] + 1;
                q.push(v);
            }
        }
    }
    return dist;
}

// DFS
vector<bool> visited;
void dfs(vector<vector<int>>& adj, int u) {
    visited[u] = true;
    for (int v : adj[u])
        if (!visited[v]) dfs(adj, v);
}
\`\`\`

## Contest Strategy

After solving 250+ problems and 20+ contests, here is what actually works:

- **Read all problems first** — pick the easiest one, not necessarily problem A
- **Constraints tell you the algorithm** — n <= 10^5 means O(n log n)
- **Code fast, think slow** — spend more time on paper, less time debugging
- **Test with edge cases** — empty input, single element, maximum constraints
- **Upsolve after contests** — read editorials and implement solutions you missed

## Conclusion

DSA mastery comes from consistent practice. Start with arrays and sorting, then move to binary search, two pointers, and sliding window. Once comfortable, tackle graphs and dynamic programming. Solve at least one problem daily — the improvement compounds over time.
    `.trim(),
  },
  {
    slug: "building-fullstack-with-prisma",
    title: "Full Stack with Prisma & PostgreSQL — Complete Guide",
    excerpt: "A complete guide to building type-safe, scalable full-stack applications using Prisma ORM and PostgreSQL. Schema design, migrations, relations, queries, and real-world patterns explained.",
    category: "Backend",
    date: "2025-02-10",
    readTime: "18 min read",
    tags: ["Prisma", "PostgreSQL", "Node.js", "TypeScript"],
    content: `
## What is Prisma?

Prisma is a next-generation **ORM (Object-Relational Mapper)** for Node.js and TypeScript. It replaces raw SQL and traditional ORMs like Sequelize or TypeORM with a cleaner, fully type-safe API.

**Why Prisma over raw SQL?**

- Auto-generated TypeScript types from your schema — zero type errors
- Readable, intuitive query API — no SQL strings
- Automatic migrations — schema changes tracked in version control
- Prisma Studio — visual database browser built-in
- Works with PostgreSQL, MySQL, SQLite, MongoDB, and more

## Setting Up

\`\`\`bash
pnpm add prisma @prisma/client
pnpm add -D typescript ts-node
pnpm prisma init
\`\`\`

This creates prisma/schema.prisma and a .env file with a DATABASE_URL placeholder.

## Connecting to PostgreSQL

\`\`\`bash
# .env
DATABASE_URL="postgresql://username:password@localhost:5432/mydb"
\`\`\`

## Defining Your Schema

\`\`\`prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  role      Role     @default(USER)
  posts     Post[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  Int
  tags      Tag[]
  createdAt DateTime @default(now())
}

model Tag {
  id    Int    @id @default(autoincrement())
  name  String @unique
  posts Post[]
}

enum Role {
  USER
  ADMIN
}
\`\`\`

## Running Migrations

\`\`\`bash
pnpm prisma migrate dev --name init
pnpm prisma migrate deploy
pnpm prisma migrate reset
\`\`\`

## Generating the Prisma Client

\`\`\`bash
pnpm prisma generate
\`\`\`

Run this after every schema change.

## Setting Up the Prisma Client (Singleton)

\`\`\`typescript
// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({ log: ["query"] });

if (process.env.NODE_ENV !== "production")
  globalForPrisma.prisma = prisma;
\`\`\`

## CRUD Operations

**Create:**

\`\`\`typescript
const user = await prisma.user.create({
  data: {
    email: "tushar@example.com",
    name: "Tushar",
    role: "ADMIN",
  },
});

// Create with nested relations
const userWithPosts = await prisma.user.create({
  data: {
    email: "dev@example.com",
    name: "Developer",
    posts: {
      create: [
        { title: "First Post", content: "Hello World" },
        { title: "Second Post", published: true },
      ],
    },
  },
});
\`\`\`

**Read:**

\`\`\`typescript
// Find by unique field
const user = await prisma.user.findUnique({
  where: { email: "tushar@example.com" },
});

// Find many with filters
const publishedPosts = await prisma.post.findMany({
  where: {
    published: true,
    author: { role: "ADMIN" },
  },
  orderBy: { createdAt: "desc" },
  take: 10,
  skip: 0,
});

// Include relations
const userWithPosts = await prisma.user.findUnique({
  where: { id: 1 },
  include: {
    posts: {
      where: { published: true },
      orderBy: { createdAt: "desc" },
    },
  },
});

// Select specific fields
const users = await prisma.user.findMany({
  select: { id: true, name: true, email: true },
});
\`\`\`

**Update:**

\`\`\`typescript
const updated = await prisma.user.update({
  where: { id: 1 },
  data: { name: "New Name" },
});

// Upsert — create if not exists, update if exists
const upserted = await prisma.user.upsert({
  where: { email: "tushar@example.com" },
  update: { name: "Updated Name" },
  create: { email: "tushar@example.com", name: "Tushar" },
});
\`\`\`

**Delete:**

\`\`\`typescript
await prisma.user.delete({ where: { id: 1 } });
await prisma.post.deleteMany({ where: { published: false } });
\`\`\`

## Transactions

Run multiple operations atomically:

\`\`\`typescript
const result = await prisma.$transaction(async (tx) => {
  const user = await tx.user.create({
    data: { email: "new@example.com", name: "New User" },
  });
  const post = await tx.post.create({
    data: { title: "Welcome Post", authorId: user.id },
  });
  return { user, post };
});
\`\`\`

## Pagination Pattern

\`\`\`typescript
async function getPosts(page: number, pageSize = 10) {
  const [posts, total] = await prisma.$transaction([
    prisma.post.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { createdAt: "desc" },
      include: { author: { select: { name: true } } },
    }),
    prisma.post.count(),
  ]);

  return {
    posts,
    total,
    pages: Math.ceil(total / pageSize),
    currentPage: page,
  };
}
\`\`\`

## Using with Next.js API Routes

\`\`\`typescript
// app/api/posts/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: { author: { select: { name: true } } },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  const body = await request.json();
  const post = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: body.authorId,
    },
  });
  return NextResponse.json(post, { status: 201 });
}
\`\`\`

## Prisma Studio

Prisma comes with a built-in visual database browser:

\`\`\`bash
pnpm prisma studio
\`\`\`

Opens at http://localhost:5555 — browse, edit, and delete records visually.

## Seeding the Database

\`\`\`typescript
// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      name: "Admin",
      role: "ADMIN",
    },
  });
  console.log("Seeded:", user);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
\`\`\`

\`\`\`bash
pnpm prisma db seed
\`\`\`

## Conclusion

Prisma + PostgreSQL is the most productive backend stack for TypeScript developers. The auto-generated types eliminate an entire class of bugs, the migration system keeps your schema in sync, and the query API is intuitive enough to read like plain English. Start with a simple schema, add relations as needed, and use transactions for critical operations.
    `.trim(),
  },
];

export const categories = ["All", ...Array.from(new Set(blogPosts.map((p) => p.category)))];
