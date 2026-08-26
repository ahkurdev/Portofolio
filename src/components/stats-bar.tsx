"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FolderOpen, Star, Briefcase, CalendarDots } from "@phosphor-icons/react";
import { GitHubUser } from "@/lib/github";

gsap.registerPlugin(ScrollTrigger);

export default function StatsBar({
  user,
  totalStars,
}: {
  user: GitHubUser | null;
  totalStars: number;
}) {
  const ref = useRef<HTMLElement>(null);

  const stats = [
    {
      label: "Public repositories",
      value: user?.public_repos ?? 0,
      Icon: FolderOpen,
    },
    { label: "Stars earned", value: totalStars, Icon: Star },
    { label: "Client projects shipped", value: 50, suffix: "+", Icon: Briefcase },
    { label: "Years building", value: new Date().getFullYear() - 2022, Icon: CalendarDots },
  ];

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      stats.forEach((stat, i) => {
        const el = ref.current?.querySelector<HTMLElement>(`[data-count="${i}"]`);
        if (!el) return;

        const obj = { val: 0 };
        gsap.to(obj, {
          val: stat.value,
          duration: 1.8,
          delay: i * 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
          onUpdate: () => {
            el.textContent = Math.round(obj.val).toLocaleString();
          },
          onComplete: () => {
            el.textContent = `${stat.value.toLocaleString()}${stat.suffix ?? ""}`;
          },
        });
      });
    }, ref);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, totalStars]);

  return (
    <section ref={ref} className="relative z-10 px-5 sm:px-6 mt-10 sm:mt-14">
      <div className="max-w-6xl mx-auto">
        <div className="glass rounded-3xl p-7 sm:p-9 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, i) => (
            <div key={stat.label}>
              <div className="flex items-center gap-2 mb-3">
                <stat.Icon size={15} weight="bold" className="text-primary-light" />
              </div>
              <div
                data-count={i}
                className="font-sans text-[clamp(1.9rem,4vw,2.75rem)] font-extrabold text-text leading-none tabular-nums"
              >
                0
              </div>
              <span className="font-mono text-[11px] text-muted-foreground tracking-wide mt-2 block">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
