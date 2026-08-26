"use client";

import { GithubLogo, EnvelopeSimple, LinkedinLogo } from "@phosphor-icons/react";
import { GITHUB_USERNAME, EMAIL, LINKEDIN_URL } from "@/lib/constants";

const YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-white/[0.06] relative z-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center flex-wrap gap-4">
        <div className="font-mono text-text text-sm">ahkur.dev</div>

        <div className="flex items-center gap-5">
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="text-muted-foreground hover:text-primary-light transition-colors duration-200"
          >
            <GithubLogo size={17} weight="bold" />
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="text-muted-foreground hover:text-primary-light transition-colors duration-200"
          >
            <LinkedinLogo size={17} weight="bold" />
          </a>
          <a
            href={`mailto:${EMAIL}`}
            aria-label="Send email"
            className="text-muted-foreground hover:text-primary-light transition-colors duration-200"
          >
            <EnvelopeSimple size={17} weight="bold" />
          </a>
        </div>

        <div className="font-sans text-xs text-muted-foreground">
          © {YEAR} Ahmad Kurniawan · Next.js + Three.js
        </div>
      </div>
    </footer>
  );
}
