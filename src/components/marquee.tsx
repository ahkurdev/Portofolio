"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { TECH_STACK } from "@/lib/constants";

export default function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const doubled = [...TECH_STACK, ...TECH_STACK];

  useEffect(() => {
    if (!trackRef.current) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let tween: gsap.core.Tween | undefined;
    const ctx = gsap.context(() => {
      tween = gsap.to(trackRef.current, {
        x: "-50%",
        duration: 40,
        ease: "none",
        repeat: -1,
      });
    });

    let smoothed = 1;
    const tick = () => {
      if (!tween) return;
      const lenis = (window as unknown as { __lenis?: { velocity: number } })
        .__lenis;
      const velocity = lenis?.velocity ?? 0;
      const target = gsap.utils.clamp(-4, 6, 1 + velocity * 0.06);
      smoothed += (target - smoothed) * 0.08;
      tween.timeScale(smoothed);
    };

    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      ctx.revert();
    };
  }, []);

  return (
    <section className="relative z-10 py-6 overflow-hidden border-y border-white/[0.06]">
      <div ref={trackRef} className="flex whitespace-nowrap will-change-transform">
        {doubled.map((tech, i) => (
          <div key={i} className="flex items-center gap-3 mx-7 shrink-0">
            <span className="w-1 h-1 rounded-full bg-primary/60" />
            <img
              src={tech.icon}
              alt=""
              className="w-4 h-4 object-contain opacity-45"
              loading="lazy"
            />
            <span className="font-mono text-xs text-muted-foreground tracking-wide">
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
