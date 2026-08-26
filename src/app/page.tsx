"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { useGitHub } from "@/lib/github";

import ScrollProgress from "@/components/scroll-progress";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Marquee from "@/components/marquee";
import StatsBar from "@/components/stats-bar";
import Projects from "@/components/projects";
import Experience from "@/components/experience";
import Skills from "@/components/skills";
import GitHubAnalytics from "@/components/github-analytics";
import Contact from "@/components/contact";
import Footer from "@/components/footer";

export default function Home() {
  const { user, projects, languages, totalStars } = useGitHub();

  useEffect(() => {
    document.documentElement.classList.add("js");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return () => document.documentElement.classList.remove("js");
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    const update = (time: number) => lenis.raf(time * 1000);

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      document.documentElement.classList.remove("js");
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <div className="noise-overlay" aria-hidden="true" />
      <ScrollProgress />
      <Navbar />
      <main className="relative z-10 flex flex-col overflow-x-hidden">
        <Hero />
        <Marquee />
        <StatsBar user={user} totalStars={totalStars} />
        <Projects repos={projects} />
        <Experience />
        <Skills />
        <GitHubAnalytics languages={languages} user={user} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
