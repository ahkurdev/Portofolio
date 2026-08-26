"use client";

import { useRef, useEffect, useState, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, GithubLogo } from "@phosphor-icons/react";
import { GITHUB_USERNAME } from "@/lib/constants";
import { motionEnabled } from "@/lib/motion";
import HeroScene from "@/components/hero-scene";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    const startIntro = () => {
      setPending(false);

      if (!sectionRef.current) return;
      if (!motionEnabled()) {
        gsap.fromTo(
          photoRef.current,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.6, ease: "power1.out" }
        );
        return;
      }

      requestAnimationFrame(() => {
        const ctx = gsap.context(() => {
          gsap.fromTo(
            [line1Ref.current, line2Ref.current],
            { yPercent: 110 },
            {
              yPercent: 0,
              duration: 1.1,
              ease: "power4.out",
              stagger: 0.12,
              delay: 0.15,
            }
          );

          gsap.fromTo(
            photoRef.current,
            { autoAlpha: 0, x: 90, scale: 1.05 },
            {
              autoAlpha: 1,
              x: 0,
              scale: 1,
              duration: 1.25,
              ease: "power3.out",
              delay: 0.45,
            }
          );
        }, sectionRef);

        gsap.to(photoRef.current, {
          yPercent: 14,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        return () => ctx.revert();
      });
    };

    if (window.__portfolioReady) {
      startIntro();
      return;
    }

    window.addEventListener("portfolio:ready", startIntro, { once: true });
    return () => window.removeEventListener("portfolio:ready", startIntro);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className={`min-h-[100dvh] flex items-center relative z-10 overflow-hidden ${
        pending ? "hero-pending" : ""
      }`}
    >
      <HeroScene />

      <div className="w-full max-w-7xl mx-auto px-5 sm:px-6 relative z-20 pt-24 pb-16 sm:pb-20">
        <h1 className="font-sans font-extrabold leading-[0.92] tracking-[-0.045em] text-text mb-7 select-none cursor-default">
          <span className="block overflow-hidden pb-1">
            <span
              ref={line1Ref}
              className="line-lift block text-[clamp(3rem,10vw,8rem)] will-change-transform"
            >
              {"AHMAD".split("").map((ch, i) => (
                <span
                  key={i}
                  className="hero-letter"
                  style={{ "--hd": `${i * 35}ms` } as CSSProperties}
                >
                  {ch}
                </span>
              ))}
            </span>
          </span>
          <span className="block overflow-hidden pb-2">
            <span
              ref={line2Ref}
              className="line-outline block text-[clamp(3rem,10vw,8rem)] will-change-transform"
            >
              {"KURNIAWAN".split("").map((ch, i) => (
                <span
                  key={i}
                  className="hero-letter"
                  style={{ "--hd": `${i * 28}ms` } as CSSProperties}
                >
                  {ch}
                </span>
              ))}
            </span>
          </span>
        </h1>

        <p
          data-hero-anim
          className="font-sans text-base sm:text-lg text-text-secondary leading-relaxed max-w-md mb-9"
          style={{ animation: "heroFadeUp 0.6s ease-out 0.55s both" }}
        >
          Full-stack developer crafting web, mobile, and desktop systems from
          Lampung, Indonesia.
        </p>

        <div
          data-hero-anim
          className="flex flex-wrap items-center gap-3"
          style={{ animation: "heroFadeUp 0.55s ease-out 0.7s both" }}
        >
          <button
            onClick={() =>
              document
                .getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-primary text-white font-semibold text-sm transition-all duration-200 hover:bg-primary-light hover:-translate-y-px active:translate-y-0 active:scale-[0.98]"
            style={{ boxShadow: "0 8px 32px rgba(139, 118, 255, 0.3)" }}
          >
            <span>View selected work</span>
            <ArrowRight size={15} weight="bold" />
          </button>

          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl glass text-text-secondary font-semibold text-sm no-underline transition-all duration-200 hover:text-text hover:border-primary/40 active:scale-[0.98]"
          >
            <GithubLogo size={17} weight="bold" />
            <span>GitHub</span>
          </a>
        </div>
      </div>

      <div className="absolute top-0 right-0 w-[52%] md:w-[42%] h-full z-[1] pointer-events-none">
        <div ref={photoRef} className="w-full h-full invisible">
          <img
            src="/allan.png"
            alt="Portrait of Ahmad Kurniawan"
            className="w-full h-full object-cover object-top opacity-60 sm:opacity-90"
            style={{
              maskImage:
                "radial-gradient(ellipse 85% 68% at 55% 50%, black 30%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 85% 68% at 55% 50%, black 30%, transparent 100%)",
            }}
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </div>
      </div>
    </section>
  );
}
