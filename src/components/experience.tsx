"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EXPERIENCE_DATA } from "@/lib/constants";
import RevealHeadline from "@/components/reveal-headline";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const lineRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll<HTMLElement>(".scroll-reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -15% 0px" }
    );

    cards.forEach((card) => observer.observe(card));

    const lineCtx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { height: 0 },
        {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: ".timeline-container",
            start: "top center",
            end: "bottom center",
            scrub: 1,
          },
        }
      );
    });

    return () => {
      observer.disconnect();
      lineCtx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="py-28 sm:py-36 px-5 sm:px-6 relative z-10"
    >
      <div className="max-w-4xl mx-auto">
        <div className="mb-16 sm:mb-24">
          <RevealHeadline
            text="Systems work under real load"
            className="font-sans font-extrabold text-[clamp(2.25rem,6vw,4.5rem)] leading-[1.02] tracking-[-0.035em] text-text mb-5 max-w-2xl"
          />
          <p className="font-sans text-text-secondary text-sm sm:text-base max-w-xl leading-relaxed">
            My foundation came from live community platforms: real users,
            persistent data, exploit pressure, and performance problems that had
            to be solved in production.
          </p>
        </div>

        <div className="timeline-container relative">
          <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-white/[0.06]">
            <div
              ref={lineRef}
              className="w-full bg-gradient-to-b from-primary to-primary-deep"
            />
          </div>

          {EXPERIENCE_DATA.map((exp, i) => {
            const isEven = i % 2 === 0;
            return (
              <div
                key={i}
                className={`scroll-reveal relative flex flex-col md:flex-row gap-6 sm:gap-8 mb-12 sm:mb-16 last:mb-0 ${
                  isEven ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="absolute left-4 md:left-1/2 -translate-x-[5px] md:-translate-x-1/2 top-8 w-2.5 h-2.5 rounded-full bg-bg border-2 border-primary z-10" />
                <div className="hidden md:block md:w-1/2" />

                <div
                  className={`md:w-1/2 pl-12 md:pl-0 ${
                    isEven ? "md:pr-12 md:text-right" : "md:pl-12"
                  }`}
                >
                  <div className="glass group rounded-2xl p-6 transition-all duration-300 hover:border-primary/30 hover:-translate-y-0.5">
                    <div className="font-mono text-xs text-primary-light mb-2.5">
                      {exp.period}
                    </div>
                    <h3 className="font-sans text-lg font-bold text-text mb-1">
                      {exp.role}
                    </h3>
                    <div className="font-sans text-sm text-muted-foreground mb-4">
                      {exp.company}
                    </div>
                    <p className="font-sans text-sm text-text-secondary leading-relaxed mb-5">
                      {exp.description}
                    </p>
                    <div
                      className={`flex flex-wrap gap-2 ${
                        isEven ? "md:justify-end" : ""
                      }`}
                    >
                      {exp.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[11px] px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.07] text-text-secondary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
