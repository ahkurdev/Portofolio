import { useState, useEffect } from "react";
import {
  GITHUB_USERNAME,
  AVATAR_URL,
  FALLBACK_USER,
  CURATED_PROJECTS,
} from "./constants";

export interface GitHubUser {
  login: string;
  name: string;
  bio: string | null;
  avatar_url: string;
  location: string | null;
  company: string | null;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
}

export interface ProjectItem {
  id: string;
  repo: string;
  title: string;
  description: string;
  tags: string[];
  html_url: string;
  demo?: string;
  license?: string;
  language: string | null;
  stars: number;
  topics: string[];
}

function fallbackProjects(): ProjectItem[] {
  return CURATED_PROJECTS.map((p) => ({
    id: p.repo,
    repo: p.repo,
    title: p.title,
    description: p.description,
    tags: p.tags,
    html_url: `https://github.com/${GITHUB_USERNAME}/${p.repo}`,
    demo: p.demo,
    license: p.license,
    language: p.tags[0] ?? null,
    stars: p.fallbackStars,
    topics: [],
  }));
}

export function useGitHub() {
  const [user, setUser] = useState<GitHubUser>(FALLBACK_USER);
  const [projects, setProjects] = useState<ProjectItem[]>(fallbackProjects());
  const [languages, setLanguages] = useState<Record<string, number>>({
    Kotlin: 1,
    TypeScript: 1,
    Python: 1,
  });
  const [totalStars, setTotalStars] = useState(4);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
          fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`
          ),
        ]);

        if (cancelled) return;

        let liveStars = 0;
        const langCount: Record<string, number> = {};
        const repoMap = new Map<
          string,
          { stars: number; language: string | null; topics: string[] }
        >();

        if (reposRes.ok) {
          const data: Array<{
            name: string;
            stargazers_count: number;
            language: string | null;
            topics?: string[];
            fork: boolean;
          }> = await reposRes.json();

          data.forEach((r) => {
            if (r.fork) return;
            liveStars += r.stargazers_count ?? 0;
            if (r.language) {
              langCount[r.language] = (langCount[r.language] || 0) + 1;
            }
            repoMap.set(r.name, {
              stars: r.stargazers_count ?? 0,
              language: r.language,
              topics: r.topics ?? [],
            });
          });

          if (!cancelled && Object.keys(langCount).length > 0) {
            setLanguages(langCount);
          }
          if (!cancelled) setTotalStars(liveStars);
        }

        if (userRes.ok) {
          const userData = await userRes.json();
          if (!cancelled) setUser({ ...userData, avatar_url: userData.avatar_url || AVATAR_URL });
        }

        if (!cancelled) {
          const enriched = CURATED_PROJECTS.map((p) => {
            const live = repoMap.get(p.repo);
            return {
              id: p.repo,
              repo: p.repo,
              title: p.title,
              description: p.description,
              tags: p.tags,
              html_url: `https://github.com/${GITHUB_USERNAME}/${p.repo}`,
              demo: p.demo,
              license: p.license,
              language: live?.language ?? p.tags[0],
              stars: live?.stars ?? p.fallbackStars,
              topics: live?.topics ?? [],
            };
          });
          setProjects(enriched);
        }
      } catch {
        if (!cancelled) {
          setUser(FALLBACK_USER);
          setProjects(fallbackProjects());
        }
      } finally {
        if (!cancelled) setLoading(false);
        window.dispatchEvent(new Event("portfolio:data"));
      }
    };

    fetchData();
    return () => {
      cancelled = true;
    };
  }, []);

  return { user, projects, languages, totalStars, loading };
}
