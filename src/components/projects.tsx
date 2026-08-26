"use client";

import { useRef, useEffect } from "react";
import { ArrowUpRight, Star } from "@phosphor-icons/react";
import { ProjectItem } from "@/lib/github";
import { GITHUB_USERNAME } from "@/lib/constants";
import RevealHeadline from "@/components/reveal-headline";

export default function Projects({ repos }: { repos: ProjectItem[] }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const rows = sectionRef.current.querySelectorAll<HTMLElement>(".project-row");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.classList.add("visible");
            setTimeout(() => {
              el.style.transitionDelay = "0ms";
              el.classList.add("revealed");
            }, 1100);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -15% 0px" }
    );

    rows.forEach((row) => observer.observe(row));

    return () => observer.disconnect();
  }, [repos]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="py-28 sm:py-36 px-5 sm:px-6 relative z-10"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-14 sm:mb-20">
          <p className="font-mono text-xs text-primary-light tracking-[0.14em] uppercase mb-5">
            Selected work
          </p>
          <RevealHeadline
            text="Shipped products, open code"
            className="font-sans font-extrabold text-[clamp(2.25rem,6vw,4.5rem)] leading-[1.02] tracking-[-0.035em] text-text max-w-3xl"
          />
        </div>

        <div className="border-b border-white/[0.06]">
          {repos.map((repo, i) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className={`project-row scroll-reveal group block no-underline border-t border-white/[0.06] transition-colors duration-300 hover:bg-white/[0.02] ${
                i === 0 ? "border-t !border-t-white/[0.09]" : ""
              }`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-10 px-2 sm:px-4 py-9 sm:py-12">
                <span className="font-mono text-xs text-muted-foreground pt-2 lg:pt-4 shrink-0 w-8">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="flex-1 min-w-0">
                  <h3 className="font-sans font-extrabold text-[clamp(1.75rem,4.5vw,3.25rem)] leading-none tracking-[-0.03em] text-text transition-colors duration-300 group-hover:text-primary-light">
                    {repo.title}
                  </h3>
                  <p className="font-sans text-sm sm:text-base text-text-secondary leading-relaxed max-w-2xl mt-4">
                    {repo.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-5">
                    {repo.tags.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[11px] px-2.5 py-1 rounded-full glass text-text-secondary"
                      >
                        {t}
                      </span>
                    ))}
                    {repo.license && (
                      <span className="font-mono text-[11px] px-2.5 py-1 rounded-full border border-white/[0.08] text-muted-foreground">
                        {repo.license}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex lg:flex-col items-center lg:items-end justify-between gap-3 lg:gap-4 shrink-0 pt-1">
                  <div className="flex items-center gap-4">
                    {repo.language && (
                      <span className="font-mono text-xs text-text-secondary">
                        {repo.language}
                      </span>
                    )}
                    <span className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                      <Star size={11} weight="fill" className="text-primary-light" />
                      {repo.stars}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    {repo.demo && (
                      <span className="font-mono text-[11px] px-2.5 py-1 rounded-full bg-primary/15 border border-primary/30 text-primary-light">
                        Live demo
                      </span>
                    )}
                    <ArrowUpRight
                      size={20}
                      weight="bold"
                      className="text-muted-foreground transition-all duration-300 group-hover:text-primary-light group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-8">
          <a
            href={`https://github.com/${GITHUB_USERNAME}?tab=repositories`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-sm text-text-secondary hover:text-primary-light no-underline transition-colors duration-200"
          >
            View all repositories on GitHub
            <ArrowUpRight size={13} weight="bold" />
          </a>
        </div>
      </div>
    </section>
  );
}
