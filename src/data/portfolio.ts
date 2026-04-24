export const personal = {
  name: "Tushar",
  title: "Full Stack Developer",
  tagline: "I build fast, accessible web apps and solve hard algorithmic problems. Currently focused on full-stack development with Next.js & Node.js.",
  roles: ["Full Stack Developer", "Competitive Programmer", "Problem Solver", "ML Enthusiast"],
  email: "tusharcoder269@gmail.com",
  github: "https://github.com/tusharsno",
  linkedin: "https://www.linkedin.com/in/tushar-barua-0b657b272",
  resumeUrl: "/resume.pdf",
  location: "Bangladesh",
  avatar: "/tushar.jpeg",
};

export const about = {
  bio: "I'm a Full Stack Developer and competitive programmer from Bangladesh. I love solving hard problems — whether it's an algorithmic challenge on Codeforces or architecting a scalable web application. I specialize in the React & Node.js ecosystem and I'm always pushing to write cleaner, faster, and more maintainable code.",
  highlights: [
    "Solved 250+ problems on Codeforces across various difficulty ratings",
    "Participated in 20+ competitive programming contests",
    "Actively solving problems on LeetCode to sharpen DSA skills",
    "Building full-stack projects with Next.js, Prisma & PostgreSQL",
  ],
  stats: [
    { label: "Problems Solved", value: "250+", platform: "Codeforces", color: "#3f3f46" },
    { label: "Contests",        value: "20+",  platform: "Participated", color: "#3f3f46" },
    { label: "LeetCode",        value: "Active",platform: "Problem Solving", color: "#3f3f46" },
    { label: "Projects",        value: "10+",  platform: "Full Stack",   color: "#3f3f46" },
  ],
};

export const skills = [
  {
    category: "Frontend",
    emoji: "🎨",
    color: "#18181b",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "HTML/CSS"],
  },
  {
    category: "Backend",
    emoji: "⚙️",
    color: "#18181b",
    items: ["Node.js", "Express", "Prisma", "PostgreSQL", "REST APIs", "MySQL"],
  },
  {
    category: "Languages",
    emoji: "💻",
    color: "#18181b",
    items: ["JavaScript", "TypeScript", "Java", "Python", "C/C++"],
  },
  {
    category: "Java & GUI",
    emoji: "☕",
    color: "#18181b",
    items: ["Java OOP", "Java Swing", "GUI Design", "Hotel Mgmt App", "Scientific Calculator"],
  },
  {
    category: "ML & Data",
    emoji: "🤖",
    color: "#18181b",
    items: ["Python", "Scikit-learn", "Pandas", "Flask", "Data Analysis"],
  },
  {
    category: "Tools",
    emoji: "🛠️",
    color: "#18181b",
    items: ["Git", "GitHub", "Docker", "Vercel", "Linux", "Figma", "Postman"],
  },
];

export const projects = [
  {
    title: "DSA Platform",
    description: "A full-featured DSA learning and problem-solving platform. Covers data structures, algorithms, and curated problem sets to help developers level up their coding skills systematically.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    github: "https://github.com/tusharsno/dsa-platform",
    live: "https://dsaplatform.vercel.app",
    category: "Full Stack",
    emoji: "🧠",
    featured: true,
  },
  {
    title: "MediScript",
    description: "A full-stack patient-doctor consultation platform. Doctors can write digital prescriptions, patients can view their history, and the system manages appointments with role-based access.",
    tech: ["Next.js", "Node.js", "Prisma", "PostgreSQL"],
    github: "https://github.com/tusharsno/mediscript",
    live: "https://mediscript-e.vercel.app",
    category: "Full Stack",
    emoji: "🏥",
    featured: true,
  },
  {
    title: "Heart Disease Predictor",
    description: "An ML-powered web app that predicts heart disease risk from patient vitals. Trained on clinical datasets using classification algorithms, served via a clean React frontend.",
    tech: ["Python", "Scikit-learn", "React", "Flask"],
    github: "https://github.com/tusharsno/heart-scan",
    live: "https://heart-scan-three.vercel.app",
    category: "Machine Learning",
    emoji: "❤️",
    featured: true,
  },
];

export const experience = [
  {
    type: "work",
    role: "Full Stack Developer",
    company: "Freelance",
    period: "2022 – Present",
    description: "Building and shipping full-stack web applications for clients in healthcare and SaaS. Delivered production-ready platforms including a patient-doctor consultation system and a DSA learning platform.",
    tech: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Prisma"],
    highlights: ["Shipped 3+ live production apps", "End-to-end development & deployment"],
  },
  {
    type: "education",
    role: "B.Sc. in Software Engineering",
    company: "University",
    period: "2020 – 2024",
    description: "Studied core CS fundamentals — data structures, algorithms, OOP, database systems, and software architecture. Built real-world projects across web, desktop (Java Swing), and ML domains.",
    tech: ["Java", "Python", "C/C++", "React", "MySQL"],
    highlights: ["Dean's list academic performance", "Multiple project awards"],
  },
  {
    type: "cp",
    role: "Competitive Programmer",
    company: "Codeforces & LeetCode",
    period: "2021 – Present",
    description: "Actively solving algorithmic problems to sharpen problem-solving and DSA skills. Participated in rated contests and consistently improving ranking.",
    tech: ["C++", "Python", "DSA", "Algorithms"],
    highlights: ["250+ problems on Codeforces", "20+ rated contests participated"],
  },
];
