export type MotionPref = "system" | "on" | "off";

export function getMotionPref(): MotionPref {
  if (typeof window === "undefined") return "system";
  const stored = localStorage.getItem("motion-pref");
  return stored === "on" || stored === "off" ? stored : "system";
}

export function motionEnabled(): boolean {
  if (typeof window === "undefined") return true;
  const pref = getMotionPref();
  if (pref === "on") return true;
  if (pref === "off") return false;
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function applyMotionAttr(enabled: boolean) {
  if (typeof document === "undefined") return;
  if (enabled) {
    document.documentElement.dataset.motion = "on";
  } else {
    delete document.documentElement.dataset.motion;
  }
}
