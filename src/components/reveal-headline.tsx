"use client";

import { useRef, useEffect, type CSSProperties } from "react";

export default function RevealHeadline({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          io.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const words = text.split(" ");

  return (
    <h2 ref={ref} className={`reveal-words ${className}`}>
      {words.map((word, i) => (
        <span key={i}>
          <span className="word-mask">
            <span
              className="word-inner"
              style={{ "--wd": `${i * 75}ms` } as CSSProperties}
            >
              {word}
            </span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </h2>
  );
}
