import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ahmad Kurniawan — Full-Stack Developer",
    short_name: "Ahmad Kurniawan",
    description:
      "Full-stack developer crafting web, mobile, and desktop systems from Lampung, Indonesia.",
    start_url: "/",
    display: "standalone",
    background_color: "#08070e",
    theme_color: "#08070e",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
