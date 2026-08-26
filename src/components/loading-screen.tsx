"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { motionEnabled } from "@/lib/motion";

const SEGMENTS = 32;
const MIN_DISPLAY_MS = 1200;

const PHASES = [
  { until: 15, label: "INITIALIZING INTERFACE" },
  { until: 60, label: "COMPILING SHADERS" },
  { until: 90, label: "SYNCING GITHUB DATA" },
  { until: 101, label: "FINALIZING" },
];

export default function LoadingScreen({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const statusRef = useRef<HTMLSpanElement>(null);
  const segmentsRef = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    const reduced = !motionEnabled();

    const state = {
      val: 0,
      target: 6,
      fonts: false,
      data: false,
      scene: false,
      done: false,
    };
    const start = performance.now();
    let phaseIdx = -1;
    let killed = false;
    const timeouts: Array<ReturnType<typeof setTimeout>> = [];
    const listeners: Array<[string, EventListener]> = [];

    const renderProgress = () => {
      const lit = Math.round((state.val / 100) * SEGMENTS);
      segmentsRef.current.forEach((seg, i) => {
        if (!seg) return;
        seg.style.opacity = i < lit ? "1" : "0.25";
      });
      if (percentRef.current) {
        percentRef.current.textContent = `${Math.round(state.val)}%`;
      }
      let idx = PHASES.findIndex((p) => state.val < p.until);
      if (idx === -1) idx = PHASES.length - 1;
      if (idx !== phaseIdx && statusRef.current) {
        phaseIdx = idx;
        statusRef.current.textContent = PHASES[idx].label;
      }
    };

    const tweenTo = (target: number, ease: string = "power2.out") => {
      gsap.to(state, {
        val: target,
        duration: Math.max(0.35, Math.abs(target - state.val) / 60),
        ease,
        overwrite: "auto",
        onUpdate: renderProgress,
      });
    };

    const finish = () => {
      if (killed || state.done) return;
      state.done = true;
      tweenTo(100, "power3.in");

      const totalElapsed = performance.now() - start;
      const wait = Math.max(0, MIN_DISPLAY_MS - totalElapsed) + 500;

      timeouts.push(
        setTimeout(() => {
          if (killed) return;
          if (reduced) {
            exit();
            return;
          }
          const tl = gsap.timeline({
            onComplete: () => exit(),
          });
          tl.to(segmentsRef.current, {
            opacity: 0.25,
            duration: 0.07,
            stagger: { each: 0.012, from: "start" },
            yoyo: true,
            repeat: 1,
          })
            .to(
              [percentRef.current, statusRef.current],
              { autoAlpha: 0, duration: 0.2 },
              "-=0.05"
            )
            .to(containerRef.current, {
              clipPath: "inset(0% 0% 100% 0%)",
              duration: 0.65,
              ease: "power4.inOut",
              delay: 0.1,
            });
        }, wait)
      );
    };

    const exit = () => {
      if (killed) return;
      killed = true;
      cleanup();
      onComplete();
    };

    const maybeFinish = () => {
      if (state.fonts && state.data && state.scene) finish();
    };

    const onFlag = (key: "fonts" | "data" | "scene", target: number) => () => {
      if (state[key]) return;
      state[key] = true;
      state.target = Math.max(state.target, target);
      tweenTo(state.target);
      maybeFinish();
    };

    const onData = onFlag("data", 60);
    const onScene = onFlag("scene", 90);

    window.addEventListener("portfolio:data", onData);
    window.addEventListener("portfolio:scene", onScene);
    listeners.push(["portfolio:data", onData], ["portfolio:scene", onScene]);

    timeouts.push(setTimeout(onData, 2600));
    timeouts.push(setTimeout(onScene, 3200));

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (!killed && !state.fonts) {
          state.fonts = true;
          state.target = Math.max(state.target, 15);
          tweenTo(state.target);
          maybeFinish();
        }
      });
    } else {
      state.fonts = true;
    }

    const intro = gsap.timeline();
    intro
      .fromTo(
        ringRef.current,
        { scale: 0.7, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "power2.out" }
      )
      .fromTo(
        orbRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.55, ease: "elastic.out(1, 0.55)" },
        "-=0.3"
      );

    if (reduced) {
      timeouts.push(
        setTimeout(() => {
          state.fonts = state.data = state.scene = true;
          finish();
        }, 400)
      );
    }

    tweenTo(state.target);

    function cleanup() {
      timeouts.forEach(clearTimeout);
      listeners.forEach(([n, fn]) => window.removeEventListener(n, fn));
      gsap.killTweensOf(state);
    }

    return cleanup;
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-bg px-6"
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
      suppressHydrationWarning
    >
      <div className="relative w-20 h-20 mb-10 flex items-center justify-center">
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
            boxShadow: "0 0 48px rgba(139, 118, 255, 0.5)",
          }}
          suppressHydrationWarning
        />
      </div>

      <span
        ref={percentRef}
        className="font-mono text-[clamp(2.5rem,7vw,4.5rem)] font-semibold text-text tabular-nums leading-none mb-8"
        suppressHydrationWarning
      >
        0%
      </span>

      <div className="flex gap-[3px] w-full max-w-md mb-6">
        {Array.from({ length: SEGMENTS }).map((_, i) => (
          <span
            key={i}
            ref={(el) => {
              segmentsRef.current[i] = el;
            }}
            className="flex-1 h-2 -skew-x-12 rounded-[2px] bg-primary"
            style={{
              opacity: 0.25,
              boxShadow: "0 0 10px rgba(139, 118, 255, 0.45)",
              transition: "opacity 0.18s linear",
            }}
            suppressHydrationWarning
          />
        ))}
      </div>

      <div className="font-mono text-[11px] tracking-[0.22em] text-muted-foreground uppercase h-4">
        <span ref={statusRef} suppressHydrationWarning>
          INITIALIZING INTERFACE
        </span>
      </div>
    </div>
  );
}
