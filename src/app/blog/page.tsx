import type { Metadata } from "next";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "Blog | Tushar Barua",
  description:
    "Thoughts and write-ups on web development, DSA, competitive programming, and software engineering by Tushar Barua.",
};

export default function BlogPage() {
  return <BlogClient />;
}
