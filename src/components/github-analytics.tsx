"use client";

import { useRef, useEffect } from "react";
import { MapPin, Buildings, GithubLogo } from "@phosphor-icons/react";
import { GitHubUser } from "@/lib/github";
import { GITHUB_USERNAME, AVATAR_URL, LANG_COLORS } from "@/lib/constants";
import RevealHeadline from "@/components/reveal-headline";

export default function GitHubAnalytics({
  languages,
  user,
}: {
  languages: Record<string, number>;
  user: GitHubUser | null;
}) {
  const ref = useRef<HTMLElement>(null);
  const total = Object.values(languages).reduce((s, v) => s + v, 0);
  const sorted = Object.entries(languages)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);

  useEffect(() => {
    if (!sorted.length || !ref.current) return;

    const cards = ref.current.querySelectorAll<HTMLElement>(".activity-card");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            setTimeout(() => entry.target.classList.add("revealed"), 1200);
            const bars = entry.target.querySelectorAll<HTMLElement>("[data-bar]");
            bars.forEach((bar) => {
              const idx = Number(bar.getAttribute("data-bar"));
              if (!isNaN(idx) && sorted[idx]) {
                const pct =
                  total > 0 ? Math.round((sorted[idx][1] / total) * 100) : 0;
                bar.style.width = `${pct}%`;
              }
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -15% 0px" }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [languages, sorted, total]);

  return (
    <section ref={ref} className="py-28 sm:py-36 px-5 sm:px-6 relative z-10 overflow-hidden">
      <span className="ghost-index" aria-hidden="true">
        04
      </span>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-14 sm:mb-20">
          <RevealHeadline
            text="Activity you can verify"
            className="font-sans font-extrabold text-[clamp(2.25rem,6vw,4.5rem)] leading-[1.02] tracking-[-0.035em] text-text max-w-2xl"
          />
        </div>

        <div className="activity-card scroll-reveal mb-5">
          <div className="glass rounded-3xl p-7 sm:p-9">
            <div className="flex justify-between items-baseline mb-6">
              <h3 className="font-sans text-lg font-bold text-text">
                Contribution calendar
              </h3>
              <span className="font-mono text-[10px] text-muted-foreground tracking-[0.1em] uppercase">
                Last year · live
              </span>
            </div>
            <img
              src="https://ghchart.rshah.org/8b76ff/ahkurdev"
              alt="GitHub contribution calendar for ahkurdev"
              className="w-full h-auto block"
              loading="lazy"
              onError={(e) => {
                const card = e.currentTarget.closest("div");
                if (card) card.style.display = "none";
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          <div className="activity-card scroll-reveal lg:col-span-3">
            <div className="glass rounded-3xl p-8 sm:p-10 h-full">
              <h3 className="font-sans text-lg font-bold text-text mb-8">
                Language distribution
              </h3>
              <div className="flex flex-col gap-6">
                {sorted.map(([lang, count], i) => {
                  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
                  const color = LANG_COLORS[lang] || "#8b76ff";
                  return (
                    <div key={lang}>
                      <div className="flex justify-between items-baseline mb-2">
                        <span className="font-sans text-sm font-medium text-text-secondary">
                          {lang}
                          <span className="font-mono text-[10px] text-muted-foreground ml-2.5">
                            {count} {count === 1 ? "repo" : "repos"}
                          </span>
                        </span>
                        <span className="font-mono text-xs text-muted-foreground tabular-nums">
                          {pct}%
                        </span>
                      </div>
                      <div className="h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                        <div
                          data-bar={i.toString()}
                          className="h-full rounded-full transition-all duration-1000 ease-out"
                          style={{
                            width: "0%",
                            background: `linear-gradient(90deg, ${color}aa, ${color})`,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="font-mono text-[11px] text-muted-foreground mt-8">
                Live from the GitHub API — updates as repositories change
              </p>
            </div>
          </div>

          <div className="activity-card scroll-reveal lg:col-span-2" style={{ animationDelay: "0.12s" }}>
            <div className="glass rounded-3xl p-8 sm:p-10 flex flex-col gap-5 h-full">
              <h3 className="font-sans text-lg font-bold text-text mb-1">
                Profile
              </h3>

              <div className="flex items-center gap-4">
                <img
                  src={user?.avatar_url || AVATAR_URL}
                  alt={`${user?.name ?? "Ahmad Kurniawan"} avatar`}
                  className="w-16 h-16 rounded-full border border-primary/40"
                  onError={(e) => {
                    e.currentTarget.src = AVATAR_URL;
                  }}
                />
                <div>
                  <div className="font-sans text-lg font-bold text-text leading-tight">
                    {user?.name ?? "Ahmad Kurniawan"}
                  </div>
                  <div className="font-mono text-sm text-primary-light">
                    @{GITHUB_USERNAME}
                  </div>
                </div>
              </div>

              {user?.bio && (
                <p className="font-sans text-sm text-text-secondary leading-relaxed">
                  {user.bio}
                </p>
              )}

              <div className="border-t border-white/[0.06] my-1" />

              <div className="flex flex-col gap-3 text-sm">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin size={15} weight="bold" />
                  <span>{user?.location ?? "Lampung, Indonesia"}</span>
                </div>
                {(user?.company || true) && (
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Buildings size={15} weight="bold" />
                    <span>{user?.company ?? "IIB Darmajaya"}</span>
                  </div>
                )}
              </div>

              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-white/[0.04] border border-white/[0.09] text-text font-medium text-sm no-underline transition-all duration-200 hover:border-primary/40 hover:bg-primary/10 active:scale-[0.98]"
              >
                <GithubLogo size={16} weight="bold" /> View on GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
