"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { EnvelopeSimple, GithubLogo, LinkedinLogo, MapPin } from "@phosphor-icons/react";
import {
  GITHUB_USERNAME,
  EMAIL,
  LINKEDIN_URL,
} from "@/lib/constants";
import RevealHeadline from "@/components/reveal-headline";

function MagneticLink({
  href,
  children,
  className,
  external = true,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(useTransform(mx, (v) => v * 0.35), {
    stiffness: 180,
    damping: 18,
  });
  const y = useSpring(useTransform(my, (v) => v * 0.35), {
    stiffness: 180,
    damping: 18,
  });

  return (
    <motion.a
      ref={ref}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      style={{ x, y }}
      className={className}
      onPointerMove={(e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        mx.set(e.clientX - (rect.left + rect.width / 2));
        my.set(e.clientY - (rect.top + rect.height / 2));
      }}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      {children}
    </motion.a>
  );
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [time, setTime] = useState("");

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Jakarta",
    });
    const update = () => setTime(`${formatter.format(new Date())} WIB`);
    update();
    const interval = setInterval(update, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    const items = sectionRef.current.querySelectorAll<HTMLElement>("[data-reveal]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            setTimeout(() => entry.target.classList.add("revealed"), 1200);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -15% 0px" }
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-32 sm:py-44 px-5 sm:px-6 relative z-10 overflow-hidden"
    >
      <span className="ghost-index" aria-hidden="true">
        05
      </span>

      <div className="max-w-2xl mx-auto text-center relative z-10">
        <RevealHeadline
          text="Let's build something reliable"
          className="font-sans font-extrabold text-[clamp(2.5rem,7vw,5rem)] leading-[1.02] tracking-[-0.04em] text-text mb-6"
        />

        <p
          data-reveal
          className="scroll-reveal font-sans text-base text-text-secondary leading-relaxed max-w-md mx-auto mb-12"
        >
          Open to freelance systems work, internships, and full-time roles where
          reliability matters.
        </p>

        <div
          data-reveal
          className="scroll-reveal flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <MagneticLink
            href={`mailto:${EMAIL}`}
            external={false}
            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-primary text-white font-semibold text-sm no-underline transition-colors duration-200 hover:bg-primary-light active:scale-[0.98]"
          >
            <EnvelopeSimple size={17} weight="bold" />
            Start a conversation
          </MagneticLink>

          <MagneticLink
            href={LINKEDIN_URL}
            className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl glass text-text-secondary font-medium text-sm no-underline transition-colors duration-200 hover:text-text hover:border-primary/40 active:scale-[0.98]"
          >
            <LinkedinLogo size={16} weight="bold" />
            LinkedIn
          </MagneticLink>

          <MagneticLink
            href={`https://github.com/${GITHUB_USERNAME}`}
            className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl glass text-text-secondary font-medium text-sm no-underline transition-colors duration-200 hover:text-text hover:border-primary/40 active:scale-[0.98]"
          >
            <GithubLogo size={16} weight="bold" />
            GitHub
          </MagneticLink>
        </div>

        <div
          data-reveal
          className="scroll-reveal glass rounded-2xl mt-14 px-7 py-5 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-2 items-center text-left"
        >
          <div>
            <div className="font-mono text-[10px] text-muted-foreground tracking-[0.14em] uppercase mb-1">
              Local time
            </div>
            <div className="font-mono text-sm text-text tabular-nums">{time || "—"}</div>
          </div>
          <div className="sm:border-l sm:border-white/[0.07] sm:pl-5">
            <div className="font-mono text-[10px] text-muted-foreground tracking-[0.14em] uppercase mb-1">
              Location
            </div>
            <div className="font-sans text-sm text-text-secondary flex items-center gap-1.5">
              <MapPin size={13} weight="bold" className="text-primary-light" />
              Lampung, Indonesia
            </div>
          </div>
          <div className="sm:border-l sm:border-white/[0.07] sm:pl-5">
            <div className="font-mono text-[10px] text-muted-foreground tracking-[0.14em] uppercase mb-1">
              Status
            </div>
            <div className="font-sans text-sm text-text-secondary flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              Available for projects
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
