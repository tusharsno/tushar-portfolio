import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tushar | Full Stack Developer",
  description: "Personal portfolio of Tushar Barua — Full Stack Developer specializing in Next.js, TypeScript, and Node.js. Building fast, production-ready web apps.",
  keywords: ["Full Stack Developer", "React", "Next.js", "TypeScript", "Node.js", "Portfolio", "Tushar Barua", "Bangladesh"],
  metadataBase: new URL("https://tushar-portfolio-swart.vercel.app"),
  openGraph: {
    title: "Tushar Barua | Full Stack Developer",
    description: "Building fast, production-ready web apps with Next.js, TypeScript & Node.js.",
    type: "website",
    url: "https://tushar-portfolio-swart.vercel.app",
    siteName: "Tushar Barua Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tushar Barua | Full Stack Developer",
    description: "Building fast, production-ready web apps with Next.js, TypeScript & Node.js.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){var t=localStorage.getItem('theme'),d=window.matchMedia('(prefers-color-scheme: dark)').matches;if(t==='dark'||(t===null&&d))document.documentElement.classList.add('dark')})()` }} />
      </head>
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)]" suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
