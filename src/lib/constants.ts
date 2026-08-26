export const GITHUB_USERNAME = "ahkurdev";

export const AVATAR_URL = "https://avatars.githubusercontent.com/u/192310219?v=4";

export const EMAIL = "ah.kurniawan27@gmail.com";
export const LINKEDIN_URL = "https://www.linkedin.com/in/ahmad-kurniawan-0a6b42347";

export interface CuratedProject {
  repo: string;
  title: string;
  description: string;
  tags: string[];
  demo?: string;
  license?: string;
  fallbackStars: number;
}

export const CURATED_PROJECTS: CuratedProject[] = [
  {
    repo: "Hikalist",
    title: "Hikalist",
    description:
      "A calm Windows desktop music player built with Kotlin and Compose Desktop. Streaming search, synced lyrics, local and collaborative playlists, offline mode, Spotify import, and Discord Rich Presence — no external player required.",
    tags: ["Kotlin", "Compose Desktop", "Supabase", "FFmpeg"],
    license: "GPL-3.0",
    fallbackStars: 2,
  },
  {
    repo: "web-hikalist",
    title: "Web Hikalist",
    description:
      "Companion web client for the Hikalist ecosystem. Account, profile, and playlist management built with TypeScript and deployed on Vercel.",
    tags: ["TypeScript", "React", "Vercel"],
    demo: "https://web-hikalist-allans-projects-f2f44acb.vercel.app",
    fallbackStars: 1,
  },
  {
    repo: "DOT-LAYER",
    title: "DOT-LAYER",
    description:
      "Lightweight always-on-top crosshair overlay for Windows. Six templates, custom PNG support, global hotkeys, click-through input, anti-capture rendering, and a one-click installer.",
    tags: ["Python", "Win32", "Tkinter"],
    fallbackStars: 1,
  },
];

export const FALLBACK_USER = {
  login: GITHUB_USERNAME,
  name: "Ahmad Kurniawan",
  bio: "Full-stack developer building web, mobile, and desktop systems from Lampung, Indonesia.",
  avatar_url: AVATAR_URL,
  location: "Lampung, Indonesia",
  company: "IIB Darmajaya",
  public_repos: 5,
  followers: 1,
  following: 1,
  html_url: `https://github.com/${GITHUB_USERNAME}`,
};

export const EXPERIENCE_DATA = [
  {
    period: "2025 — Mar 2026",
    company: "Aether Roleplay",
    role: "Head Developer",
    description:
      "Built a production roleplay platform from zero: core systems, event validation, database flows, and operational tooling for live players.",
    tags: ["Lua", "Backend Systems", "Event Security"],
  },
  {
    period: "2024",
    company: "Indoraya Roleplay",
    role: "Security Specialist",
    description:
      "Audited server-side logic, patched exploit paths, and hardened framework permissions so community systems stayed stable under real traffic.",
    tags: ["Security Audit", "Exploit Mitigation", "Access Control"],
  },
  {
    period: "2023 — 2024",
    company: "Sanjana Roleplay",
    role: "Framework Developer",
    description:
      "Integrated gameplay frameworks with persistent data, debugged production issues, and optimized Lua/MySQL workflows for daily server use.",
    tags: ["Lua", "MySQL", "Performance"],
  },
  {
    period: "2023",
    company: "Budaya Roleplay",
    role: "Lead Systems Developer",
    description:
      "Led custom script development, framework integration, and performance cleanup across player-facing systems and admin workflows.",
    tags: ["System Design", "Integration", "Optimization"],
  },
  {
    period: "2022 — Present",
    company: "Freelance",
    role: "Independent Developer",
    description:
      "Delivered 50+ client projects across custom features, framework conversions, debugging, deployment support, and technical consulting.",
    tags: ["Client Delivery", "Debugging", "Consulting"],
  },
];

export const TECH_STACK: Array<{ name: string; icon: string; glyph?: string }> = [
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
  { name: "Kotlin", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
  { name: "Pandas", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg" },
  { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" },
  { name: "C", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg" },
  { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" },
  { name: "Lua", icon: "https://cdn.simpleicons.org/lua/a8a8ff" },
  { name: "Dart", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dart/dart-original.svg" },
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
  { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
  { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" },
  { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Bootstrap", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg" },
  { name: "Vite", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vite/vite-original.svg" },
  { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg" },
  { name: "REST API", icon: "" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
  { name: "Flutter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg" },
  { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" },
  { name: "MariaDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mariadb/mariadb-original.svg" },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
  { name: "Supabase", icon: "https://cdn.simpleicons.org/supabase/8b76ff" },
  { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg" },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
  { name: "Scapy", icon: "", glyph: "Network" },
  { name: "Requests", icon: "", glyph: "Globe" },
  { name: "BeautifulSoup", icon: "", glyph: "FileHtml" },
  { name: "Paramiko", icon: "", glyph: "LockKey" },
  { name: "PyInstaller", icon: "", glyph: "Package" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
  { name: "GitHub", icon: "https://cdn.simpleicons.org/github/ffffff" },
  { name: "GitLab", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/gitlab/gitlab-original.svg" },
  { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg" },
  { name: "Postman", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg" },
  { name: "Linux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg" },
];

export const SKILL_GROUPS: Array<{ label: string; names: string[] }> = [
  {
    label: "Languages",
    names: [
      "JavaScript",
      "TypeScript",
      "Kotlin",
      "Python",
      "Java",
      "C",
      "C++",
      "Lua",
      "Dart",
    ],
  },
  {
    label: "Frameworks & Runtime",
    names: [
      "React",
      "Next.js",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Bootstrap",
      "Vite",
      "PHP",
      "REST API",
      "Node.js",
      "Flutter",
    ],
  },
  {
    label: "Data & Cloud",
    names: ["MySQL", "MariaDB", "MongoDB", "PostgreSQL", "Supabase", "Firebase", "Pandas"],
  },
  {
    label: "Security & Scripting",
    names: ["Scapy", "Requests", "BeautifulSoup", "Paramiko", "PyInstaller"],
  },
  {
    label: "Tools",
    names: ["Git", "GitHub", "GitLab", "VS Code", "Postman", "Linux", "Docker"],
  },
];

export const LANG_COLORS: Record<string, string> = {
  Kotlin: "#a97bff",
  TypeScript: "#3178c6",
  JavaScript: "#f7df1e",
  Python: "#3776ab",
  Java: "#ed8b00",
  Dart: "#0175c2",
  "C++": "#00599c",
  CSS: "#1572b6",
  HTML: "#e34f26",
  Lua: "#6e6e9e",
  Shell: "#89e051",
};
