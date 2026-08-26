"use client";

import { useState, useEffect } from "react";
import { List, X } from "@phosphor-icons/react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sentinel = document.createElement("div");
    sentinel.style.cssText = "position:absolute;top:0;height:60px;width:1px;pointer-events:none;";
    document.body.prepend(sentinel);

    const observer = new IntersectionObserver(([entry]) => {
      setScrolled(!entry.isIntersecting);
    });
    observer.observe(sentinel);

    return () => {
      observer.disconnect();
      sentinel.remove();
    };
  }, []);

  const go = (id: string) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setOpen(false);
    }
  };

  const links = ["About", "Projects", "Experience", "Skills", "Contact"];

  return (
    <>
      <nav
        className="fixed left-1/2 -translate-x-1/2 z-50 max-w-4xl w-[calc(100%-2rem)] rounded-full transition-all duration-500"
        style={{
          top: "16px",
          animation: "navSlideDown 0.8s cubic-bezier(0.16,1,0.3,1) 0.15s both",
        }}
      >
        <div
          className={`px-6 h-14 flex items-center justify-between rounded-full transition-all duration-500 ${
            scrolled ? "glass" : "bg-transparent border border-transparent"
          }`}
        >
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-mono text-text text-base tracking-tight hover:text-primary-light transition-colors focus:outline-none focus-visible:text-primary-light"
          >
            ahkur.dev
          </button>

          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <button
                key={l}
                onClick={() => go(l)}
                className="font-sans text-sm text-text-secondary hover:text-text px-4 py-2 rounded-full transition-all duration-200 hover:bg-white/[0.05] focus:outline-none"
              >
                {l}
              </button>
            ))}
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-text-secondary p-2 rounded-full hover:bg-white/[0.05] transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            {open ? <X size={20} weight="bold" /> : <List size={20} weight="bold" />}
          </button>
        </div>
      </nav>

      {open && (
        <div
          className="fixed inset-0 z-40 md:hidden bg-bg/85 backdrop-blur-xl"
          onClick={() => setOpen(false)}
        >
          <div
            className="flex flex-col items-center justify-center h-full gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            {links.map((l, i) => (
              <button
                key={l}
                onClick={() => go(l)}
                className="font-sans text-3xl font-bold text-text-secondary hover:text-text py-3 px-8 rounded-full transition-all duration-200 focus:outline-none hover:bg-white/[0.05]"
                style={{
                  animation: `menuFadeIn 0.4s ease-out ${i * 60}ms both`,
                }}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
