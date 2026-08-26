"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { TECH_STACK } from "@/lib/constants";
import { motionEnabled } from "@/lib/motion";

export default function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const doubled = [...TECH_STACK, ...TECH_STACK];

  useEffect(() => {
    if (!trackRef.current) return;

    const ctx = gsap.context(() => {
      const tween = gsap.to(trackRef.current, {
        x: "-50%",
        duration: 40,
        ease: "none",
        repeat: -1,
      });

      let smoothed = 1;
      const tick = () => {
        if (!motionEnabled()) {
          if (smoothed !== 0) {
            smoothed = 0;
            tween.timeScale(0);
          }
          return;
        }
        const lenis = (window as unknown as { __lenis?: { velocity: number } })
          .__lenis;
        const raw = lenis?.velocity;
        const velocity =
          typeof raw === "number" && Number.isFinite(raw) ? raw : 0;
        const target = gsap.utils.clamp(1, 5, 1 + Math.abs(velocity) * 0.06);
        smoothed += (target - smoothed) * 0.08;
        tween.timeScale(smoothed);
      };

      gsap.ticker.add(tick);
      return () => {
        gsap.ticker.remove(tick);
      };
    });

    return () => ctx.revert();
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
