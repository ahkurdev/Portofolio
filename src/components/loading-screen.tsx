"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);

export default function LoadingScreen({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          autoAlpha: 0,
          duration: 0.4,
          ease: "power3.inOut",
          onComplete,
        });
      },
    });

    tl.fromTo(
      ringRef.current,
      { scale: 0.6, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.45, ease: "power2.out" }
    )
      .fromTo(
        orbRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "elastic.out(1, 0.55)" },
        "-=0.3"
      )
      .to(
        textRef.current,
        { duration: 0.55, text: "Ahmad Kurniawan", ease: "power2.out" },
        "-=0.15"
      )
      .fromTo(
        subtitleRef.current,
        { autoAlpha: 0, y: 10, filter: "blur(4px)" },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.35,
          ease: "power2.out",
        },
        "-=0.25"
      )
      .to(
        [textRef.current, subtitleRef.current, orbRef.current, ringRef.current],
        { autoAlpha: 0, duration: 0.3, delay: 0.2 }
      );
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-bg text-center"
      suppressHydrationWarning
    >
      <div className="relative w-20 h-20 mb-8 flex items-center justify-center">
        <div
          ref={ringRef}
          className="absolute inset-0 rounded-full border border-primary/30"
          suppressHydrationWarning
        />
        <div
          ref={orbRef}
          className="w-10 h-10 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 32% 28%, #c4b8ff 0%, #8b76ff 42%, #241b52 100%)",
            boxShadow: "0 0 40px rgba(139, 118, 255, 0.45)",
          }}
          suppressHydrationWarning
        />
      </div>
      <h1
        ref={textRef}
        className="font-sans text-3xl sm:text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-3"
      />
      <p
        ref={subtitleRef}
        className="font-mono text-sm text-text-secondary md:text-base"
      >
        Full-stack developer
      </p>
    </div>
  );
}
