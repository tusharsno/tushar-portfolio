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
  {
    slug: "typescript-best-practices",
    title: "TypeScript — Complete A to Z Guide",
    excerpt: "The most complete TypeScript guide. Every concept explained in depth — from basic types to advanced generics, decorators, utility types, and real-world patterns.",
    category: "Web Dev",
    date: "2025-02-15",
    readTime: "30 min read",
    tags: ["TypeScript", "JavaScript", "Types", "Advanced"],
    content: `
## Why TypeScript?

TypeScript adds static typing to JavaScript, catching errors at compile time instead of runtime.

## Essential Type Annotations

\`\`\`typescript
interface User {
  name: string;
  age: number;
  email?: string;
}

function processUser(user: User): string {
  return user.name.toUpperCase();
}
\`\`\`

## Utility Types

\`\`\`typescript
type PublicUser = Pick<User, "id" | "name" | "email">;
type SafeUser = Omit<User, "password">;
type PartialUser = Partial<User>;
\`\`\`

## Generic Functions

\`\`\`typescript
function getFirst<T>(arr: T[]): T | undefined {
  return arr[0];
}
\`\`\`

## Discriminated Unions

\`\`\`typescript
type ApiState = 
  | { status: "loading" }
  | { status: "success"; data: string }
  | { status: "error"; error: string };
\`\`\`

## React with TypeScript

\`\`\`tsx
interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  variant?: "primary" | "secondary";
}

function Button({ children, onClick, variant = "primary" }: ButtonProps) {
  return <button onClick={onClick}>{children}</button>;
}
\`\`\`

## Conclusion

TypeScript is most effective when you embrace its type system fully. Use strict mode, explicit types, and handle null cases properly.
    `.trim(),
  },
  {
    slug: "docker-for-developers",
    title: "Docker for Developers — Complete Beginner Guide",
    excerpt: "Learn Docker from scratch. Containerize your applications, write Dockerfiles, use docker-compose, and deploy to production. Everything you need to get started.",
    category: "Backend",
    date: "2025-02-20",
    readTime: "14 min read",
    tags: ["Docker", "DevOps", "Containers", "Deployment"],
    content: `
## What is Docker?

Docker is a containerization platform that packages your application and its dependencies into lightweight, portable containers.

## Why Use Docker?

- **Consistency** — runs the same everywhere
- **Isolation** — no dependency conflicts
- **Portability** — works on any machine
- **Scalability** — easy to scale up/down

## Installing Docker

\`\`\`bash
# macOS/Windows: Download Docker Desktop
# Ubuntu:
sudo apt update
sudo apt install docker.io
sudo systemctl start docker
\`\`\`

## Basic Commands

\`\`\`bash
# Pull an image
docker pull node:18

# Run a container
docker run -it node:18 bash

# List running containers
docker ps

# Stop a container
docker stop <container-id>
\`\`\`

## Writing a Dockerfile

\`\`\`dockerfile
# Use official Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Expose port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
\`\`\`

## Building and Running

\`\`\`bash
# Build image
docker build -t my-app .

# Run container
docker run -p 3000:3000 my-app
\`\`\`

## Docker Compose

\`\`\`yaml
# docker-compose.yml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    depends_on:
      - db
  
  db:
    image: postgres:15
    environment:
      POSTGRES_DB: myapp
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
\`\`\`

\`\`\`bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down
\`\`\`

## Best Practices

- Use multi-stage builds for smaller images
- Don't run as root user
- Use .dockerignore to exclude files
- Keep images small with alpine variants
- Use specific version tags, not "latest"

## Conclusion

Docker simplifies deployment and ensures consistency across environments. Start with basic containers, then move to docker-compose for multi-service applications.
    `.trim(),
  },
  {
    slug: "system-design-basics",
    title: "System Design Basics — Building Scalable Applications",
    excerpt: "Learn fundamental system design concepts. Load balancing, caching, databases, microservices, and more. Essential knowledge for building scalable web applications.",
    category: "Backend",
    date: "2025-02-25",
    readTime: "16 min read",
    tags: ["System Design", "Scalability", "Architecture", "Backend"],
    content: `
## What is System Design?

System design is the process of architecting scalable, reliable, and maintainable software systems.

## Key Principles

- **Scalability** — handle increasing load
- **Reliability** — system works consistently
- **Availability** — system is accessible
- **Performance** — fast response times

## Load Balancing

Distribute requests across multiple servers for better performance and reliability.

## Caching Strategies

\`\`\`javascript
// Redis caching example
const redis = require('redis');
const client = redis.createClient();

async function getUser(id) {
  const cached = await client.get(\`user:\${id}\`);
  if (cached) return JSON.parse(cached);
  
  const user = await db.user.findById(id);
  await client.setex(\`user:\${id}\`, 3600, JSON.stringify(user));
  return user;
}
\`\`\`

## Database Scaling

- **Vertical Scaling** — More CPU, RAM on single machine
- **Horizontal Scaling** — Multiple database servers
- **Read Replicas** — Separate read and write operations
- **Sharding** — Split data across multiple databases

## Microservices vs Monolith

**Monolith:** Single deployable unit
**Microservices:** Multiple independent services

Choose based on team size, complexity, and scaling needs.

## API Design Best Practices

\`\`\`
GET    /api/users      → List users
GET    /api/users/123  → Get user
POST   /api/users      → Create user
PUT    /api/users/123  → Update user
DELETE /api/users/123  → Delete user
\`\`\`

## Message Queues

Handle asynchronous processing for better user experience and system reliability.

## Monitoring & Security

- Track response time, error rate, throughput
- Use HTTPS, authentication, rate limiting
- Implement proper logging and alerting

## Conclusion

System design is about making trade-offs. Start simple, measure performance, and scale incrementally based on actual needs.
    `.trim(),
  },
  {
    slug: "react-performance-optimization",
    title: "React Performance Optimization — Complete Guide",
    excerpt: "Master React performance with memo, useMemo, useCallback, code splitting, and more. Practical techniques to make your React apps lightning fast.",
    category: "Web Dev",
    date: "2025-03-01",
    readTime: "13 min read",
    tags: ["React", "Performance", "Optimization", "JavaScript"],
    content: `
## Why Performance Matters

Slow React apps lead to poor user experience, higher bounce rates, and lower conversions.

## React.memo

Prevent unnecessary re-renders of components:

\`\`\`jsx
// Without memo - re-renders on every parent update
function ExpensiveComponent({ data }) {
  return <div>{data.name}</div>;
}

// With memo - only re-renders when props change
const ExpensiveComponent = React.memo(function ExpensiveComponent({ data }) {
  return <div>{data.name}</div>;
});

// Custom comparison
const ExpensiveComponent = React.memo(function ExpensiveComponent({ data }) {
  return <div>{data.name}</div>;
}, (prevProps, nextProps) => {
  return prevProps.data.id === nextProps.data.id;
});
\`\`\`

## useMemo Hook

Memoize expensive calculations:

\`\`\`jsx
function ProductList({ products, filter }) {
  // ❌ Expensive calculation on every render
  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(filter.toLowerCase())
  );

  // ✅ Memoized - only recalculates when dependencies change
  const filteredProducts = useMemo(() => {
    return products.filter(p => 
      p.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [products, filter]);

  return (
    <ul>
      {filteredProducts.map(product => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
}
\`\`\`

## useCallback Hook

Memoize function references:

\`\`\`jsx
function TodoList({ todos }) {
  const [filter, setFilter] = useState('');

  // ❌ New function on every render
  const handleToggle = (id) => {
    // Toggle todo logic
  };

  // ✅ Memoized function
  const handleToggle = useCallback((id) => {
    // Toggle todo logic
  }, []);

  return (
    <div>
      {todos.map(todo => (
        <TodoItem 
          key={todo.id} 
          todo={todo} 
          onToggle={handleToggle} 
        />
      ))}
    </div>
  );
}
\`\`\`

## Code Splitting

Split your bundle for faster initial load:

\`\`\`jsx
// Route-based splitting
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./Dashboard'));
const Profile = lazy(() => import('./Profile'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

// Component-based splitting
const HeavyChart = lazy(() => import('./HeavyChart'));

function Analytics() {
  const [showChart, setShowChart] = useState(false);

  return (
    <div>
      <button onClick={() => setShowChart(true)}>Show Chart</button>
      {showChart && (
        <Suspense fallback={<div>Loading chart...</div>}>
          <HeavyChart />
        </Suspense>
      )}
    </div>
  );
}
\`\`\`

## Virtual Scrolling

Handle large lists efficiently:

\`\`\`jsx
import { FixedSizeList as List } from 'react-window';

function VirtualizedList({ items }) {
  const Row = ({ index, style }) => (
    <div style={style}>
      {items[index].name}
    </div>
  );

  return (
    <List
      height={600}
      itemCount={items.length}
      itemSize={50}
    >
      {Row}
    </List>
  );
}
\`\`\`

## State Management Optimization

\`\`\`jsx
// ❌ Single large state object
const [state, setState] = useState({
  user: null,
  posts: [],
  comments: [],
  loading: false
});

// ✅ Split state by concern
const [user, setUser] = useState(null);
const [posts, setPosts] = useState([]);
const [comments, setComments] = useState([]);
const [loading, setLoading] = useState(false);

// ✅ Use useReducer for complex state
const [state, dispatch] = useReducer(reducer, initialState);
\`\`\`

## Image Optimization

\`\`\`jsx
// ✅ Next.js Image component
import Image from 'next/image';

function ProductCard({ product }) {
  return (
    <div>
      <Image
        src={product.image}
        alt={product.name}
        width={300}
        height={200}
        loading="lazy"
        placeholder="blur"
      />
    </div>
  );
}

// ✅ Lazy loading with Intersection Observer
function LazyImage({ src, alt }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsLoaded(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef}>
      {isLoaded && <img src={src} alt={alt} />}
    </div>
  );
}
\`\`\`

## Bundle Analysis

\`\`\`bash
# Analyze your bundle size
npx webpack-bundle-analyzer build/static/js/*.js

# Or with Create React App
npm run build -- --analyze
\`\`\`

## Performance Monitoring

\`\`\`jsx
// Measure component render time
function ProfiledComponent() {
  return (
    <Profiler
      id="MyComponent"
      onRender={(id, phase, actualDuration) => {
        console.log('Render time:', actualDuration);
      }}
    >
      <MyComponent />
    </Profiler>
  );
}

// Use React DevTools Profiler
// Chrome DevTools Performance tab
// Web Vitals measurement
\`\`\`

## Common Performance Pitfalls

1. **Inline objects/functions in JSX**
2. **Not using keys properly in lists**
3. **Unnecessary re-renders from context**
4. **Large bundle sizes**
5. **Blocking the main thread**

## Conclusion

React performance optimization is about identifying bottlenecks and applying the right techniques. Use React DevTools Profiler to measure before and after optimizations.
    `.trim(),
  },
  {
    slug: "rest-api-design-nodejs",
    title: "REST API Design with Node.js — Best Practices",
    excerpt: "Build robust REST APIs with Node.js and Express. Authentication, validation, error handling, testing, and deployment. Complete guide with real examples.",
    category: "Backend",
    date: "2025-03-05",
    readTime: "15 min read",
    tags: ["Node.js", "Express", "REST API", "Backend"],
    content: `
## REST API Fundamentals

REST (Representational State Transfer) is an architectural style for designing web APIs using HTTP methods and status codes.

## HTTP Methods

\`\`\`
GET    /api/users      → Retrieve users
POST   /api/users      → Create user
GET    /api/users/123  → Retrieve specific user
PUT    /api/users/123  → Update entire user
PATCH  /api/users/123  → Partial update
DELETE /api/users/123  → Delete user
\`\`\`

## Project Setup

\`\`\`bash
npm init -y
npm install express mongoose joi bcryptjs jsonwebtoken
npm install -D nodemon jest supertest
\`\`\`

## Basic Express Server

\`\`\`javascript
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});
\`\`\`

## Database Models

\`\`\`javascript
// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
\`\`\`

## Input Validation

\`\`\`javascript
const Joi = require('joi');

// Validation schemas
const registerSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

// Validation middleware
const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: error.details[0].message
      });
    }
    next();
  };
};

module.exports = { validate, registerSchema, loginSchema };
\`\`\`

## Authentication & Authorization

\`\`\`javascript
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
};

// Auth middleware
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid token.' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token.' });
  }
};

// Admin middleware
const admin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied. Admin required.' });
  }
  next();
};

module.exports = { generateToken, auth, admin };
\`\`\`

## User Routes

\`\`\`javascript
// routes/users.js
const express = require('express');
const User = require('../models/User');
const { auth, admin } = require('../middleware/auth');
const { validate, registerSchema } = require('../middleware/validation');
const router = express.Router();

// GET /api/users - Get all users (admin only)
router.get('/', auth, admin, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const users = await User.find()
      .select('-password')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });
    
    const total = await User.countDocuments();
    
    res.json({
      users,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/users/:id - Get user by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Users can only view their own profile (unless admin)
    if (req.user.id !== user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/users/:id - Update user
router.put('/:id', auth, validate(registerSchema), async (req, res) => {
  try {
    const { name, email } = req.body;
    
    // Users can only update their own profile (unless admin)
    if (req.user.id !== req.params.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email },
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/users/:id - Delete user
router.delete('/:id', auth, admin, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
\`\`\`

## Error Handling

\`\`\`javascript
// Custom error class
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}

// Global error handler
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = new AppError(message, 404);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = new AppError(message, 400);
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    error = new AppError(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error'
  });
};

module.exports = { AppError, errorHandler };
\`\`\`

## Rate Limiting

\`\`\`javascript
const rateLimit = require('express-rate-limit');

// General rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

// Strict rate limiting for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: 'Too many authentication attempts, please try again later.'
});

app.use('/api/', limiter);
app.use('/api/auth', authLimiter);
\`\`\`

## Testing

\`\`\`javascript
// tests/auth.test.js
const request = require('supertest');
const app = require('../app');
const User = require('../models/User');

describe('Auth Endpoints', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123'
      };

      const res = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(201);

      expect(res.body).toHaveProperty('token');
      expect(res.body.user.email).toBe(userData.email);
      expect(res.body.user).not.toHaveProperty('password');
    });

    it('should not register user with invalid email', async () => {
      const userData = {
        name: 'John Doe',
        email: 'invalid-email',
        password: 'password123'
      };

      await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(400);
    });
  });
});
\`\`\`

## Environment Configuration

\`\`\`bash
# .env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/myapi
JWT_SECRET=your-super-secret-jwt-key
\`\`\`

## Deployment

\`\`\`javascript
// Production considerations
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');

// Security middleware
app.use(helmet());
app.use(compression());
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});
\`\`\`

## Conclusion

Building robust REST APIs requires attention to security, validation, error handling, and testing. Start with a solid foundation and add features incrementally.
    `.trim(),
  },
];

export const categories = ["All", ...Array.from(new Set(blogPosts.map((p) => p.category)))];
