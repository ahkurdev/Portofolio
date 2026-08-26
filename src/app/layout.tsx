import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ClientShell from "@/components/client-shell";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
});

const SITE_URL = "https://ahkur.my.id";
const TITLE = "Ahmad Kurniawan — Full-Stack Developer";
const DESCRIPTION =
  "Portfolio of Ahmad Kurniawan, a full-stack developer from Lampung, Indonesia building web, mobile, and desktop systems with Next.js, Kotlin, Flutter, and security tooling.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "Ahmad Kurniawan",
    "ahkurdev",
    "full-stack developer",
    "frontend developer Indonesia",
    "Next.js developer",
    "Kotlin developer",
    "Flutter developer",
    "Compose Desktop",
    "Lampung developer",
    "hire developer Indonesia",
  ],
  authors: [{ name: "Ahmad Kurniawan", url: "https://github.com/ahkurdev" }],
  creator: "Ahmad Kurniawan",
  publisher: "Ahmad Kurniawan",
  category: "technology",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Ahmad Kurniawan Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#08070e",
  width: "device-width",
  initialScale: 1,
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ahmad Kurniawan",
  url: SITE_URL,
  image: `${SITE_URL}/opengraph-image`,
  jobTitle: "Full-Stack Developer",
  description: DESCRIPTION,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lampung",
    addressCountry: "ID",
  },
  worksFor: {
    "@type": "Organization",
    name: "Freelance",
  },
  knowsAbout: [
    "Next.js",
    "TypeScript",
    "Kotlin",
    "Compose Desktop",
    "Flutter",
    "Node.js",
    "REST API",
    "Security tooling",
  ],
  sameAs: [
    "https://github.com/ahkurdev",
    "https://www.linkedin.com/in/ahmad-kurniawan-0a6b42347",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased min-h-[100dvh] relative" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
