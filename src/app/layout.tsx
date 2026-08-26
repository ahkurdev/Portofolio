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

export const metadata: Metadata = {
  metadataBase: new URL("https://github.com/ahkurdev"),
  title: "Ahmad Kurniawan — Full-Stack Developer",
  description:
    "Portfolio of Ahmad Kurniawan, a full-stack developer from Lampung, Indonesia building web, mobile, and desktop systems.",
  openGraph: {
    title: "Ahmad Kurniawan — Full-Stack Developer",
    description:
      "Full-stack developer crafting web, mobile, and desktop systems from Lampung, Indonesia.",
    type: "website",
  },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#08070e",
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
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
