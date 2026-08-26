"use client";

import { useRef, useEffect, type ComponentType } from "react";
import {
  Plugs,
  Network,
  Globe,
  FileHtml,
  LockKey,
  Package,
} from "@phosphor-icons/react";
import { TECH_STACK, SKILL_GROUPS } from "@/lib/constants";
import RevealHeadline from "@/components/reveal-headline";

const GLYPHS: Record<string, ComponentType<{ size?: number; weight?: "bold"; className?: string }>> = {
  Plugs,
  Network,
  Globe,
  FileHtml,
  LockKey,
  Package,
};

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const groups = sectionRef.current.querySelectorAll<HTMLElement>(".skill-group");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.classList.add("visible");
            setTimeout(() => el.classList.add("revealed"), 1200);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
    );

    groups.forEach((group, i) => {
      group.style.transitionDelay = `${Math.min(i * 70, 400)}ms`;
      observer.observe(group);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="py-28 sm:py-36 px-5 sm:px-6 relative z-10 overflow-hidden"
    >
      <span className="ghost-index" aria-hidden="true">
        03
      </span>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-14 sm:mb-20">
          <RevealHeadline
            text="The toolbox behind the work"
            className="font-sans font-extrabold text-[clamp(2.25rem,6vw,4.5rem)] leading-[1.02] tracking-[-0.035em] text-text max-w-2xl"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          {SKILL_GROUPS.map((group) => (
            <div key={group.label} className="skill-group scroll-reveal">
              <div className="font-mono text-[11px] text-primary-light tracking-[0.16em] uppercase mb-5 flex items-center gap-3">
                {group.label}
                <span className="flex-1 h-px bg-white/[0.07]" />
              </div>
              <div className="flex flex-wrap gap-2.5">
                {group.names.map((name) => {
                  const tech = TECH_STACK.find((t) => t.name === name);
                  if (!tech) return null;
                  const Glyph = tech.glyph ? GLYPHS[tech.glyph] : undefined;
                  return (
                    <div
                      key={name}
                      className="group inline-flex items-center gap-2.5 pl-3 pr-4 py-2.5 rounded-xl glass cursor-default transition-all duration-300 hover:border-primary/35 hover:-translate-y-0.5"
                    >
                      {tech.icon ? (
                        <img
                          src={tech.icon}
                          alt={`${tech.name} logo`}
                          className="w-5 h-5 object-contain"
                          loading="lazy"
                        />
                      ) : Glyph ? (
                        <Glyph size={16} weight="bold" className="text-primary-light" />
                      ) : (
                        <Plugs size={16} weight="bold" className="text-primary-light" />
                      )}
                      <span className="font-sans text-sm font-medium text-text-secondary group-hover:text-text transition-colors duration-300">
                        {tech.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
