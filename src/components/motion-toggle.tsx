"use client";

import { useEffect, useState } from "react";
import { Lightning } from "@phosphor-icons/react";
import { motionEnabled, applyMotionAttr } from "@/lib/motion";

export default function MotionToggle() {
  const [on, setOn] = useState(true);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      const enabled = motionEnabled();
      setOn(enabled);
      applyMotionAttr(enabled);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  const toggle = () => {
    const next = !on;
    localStorage.setItem("motion-pref", next ? "on" : "off");
    setOn(next);
    applyMotionAttr(next);
    window.dispatchEvent(new Event("motion:change"));
  };

  return (
    <button
      onClick={toggle}
      aria-pressed={on}
      aria-label={on ? "Disable animations" : "Enable animations"}
      className="fixed bottom-5 left-5 z-50 inline-flex items-center gap-2 px-3.5 py-2 rounded-full glass font-mono text-[10px] tracking-[0.14em] uppercase text-text-secondary hover:text-text transition-colors duration-200"
    >
      <Lightning
        size={12}
        weight="bold"
        className={on ? "text-primary-light" : "text-muted-foreground"}
      />
      Motion {on ? "on" : "off"}
    </button>
  );
}
