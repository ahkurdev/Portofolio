"use client";

import { useRef, useEffect } from "react";
import { TECH_STACK } from "@/lib/constants";
import RevealHeadline from "@/components/reveal-headline";

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll<HTMLElement>(".skill-card");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.classList.add("visible");
            setTimeout(() => {
              el.style.transitionDelay = "0ms";
              el.classList.add("revealed");
            }, 1400);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
    );

    cards.forEach((card, i) => {
      card.style.transitionDelay = `${Math.min(i * 45, 600)}ms`;
      observer.observe(card);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="py-28 sm:py-36 px-5 sm:px-6 relative z-10"
    >
      <div className="max-w-5xl mx-auto">
        <div className="mb-14 sm:mb-20">
          <RevealHeadline
            text="The toolbox behind the work"
            className="font-sans font-extrabold text-[clamp(2.25rem,6vw,4.5rem)] leading-[1.02] tracking-[-0.035em] text-text max-w-2xl"
          />
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {TECH_STACK.map((tech) => (
            <div
              key={tech.name}
              className="skill-card scroll-reveal group relative p-4 sm:p-5 rounded-2xl glass flex flex-col items-center justify-center gap-2.5 transition-all duration-300 hover:border-primary/35 hover:-translate-y-1 cursor-default overflow-hidden"
            >
              <img
                src={tech.icon}
                alt={`${tech.name} logo`}
                className="w-8 h-8 sm:w-9 sm:h-9 object-contain relative z-10 transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <span className="font-mono text-[11px] text-muted-foreground font-medium group-hover:text-text transition-colors duration-300 relative z-10 text-center">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
