"use client";

import { useState, useEffect } from "react";
import LoadingScreen from "@/components/loading-screen";

declare global {
  interface Window {
    __portfolioReady?: boolean;
  }
}

export default function ClientShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loading) {
      window.__portfolioReady = true;
      window.dispatchEvent(new Event("portfolio:ready"));
    }
  }, [loading]);

  return (
    <>
      {children}
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
    </>
  );
}
