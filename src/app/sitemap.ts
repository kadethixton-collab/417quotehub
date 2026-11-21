import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { cities } from "@/config/cities";
import { activeTrades } from "@/config/trades";
import { cityHref, serviceHref } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages = [
    { path: "/", priority: 1 },
    { path: "/services", priority: 0.8 },
    { path: "/contractors", priority: 0.6 },
    { path: "/privacy", priority: 0.2 },
    { path: "/terms", priority: 0.2 },
  ];
  const cityPages = activeTrades.flatMap((t) => cities.map((c) => ({ path: cityHref(c, t), priority: 0.9 })));
  const servicePages = activeTrades.flatMap((t) =>
    cities.flatMap((c) => t.projectTypes.map((p) => ({ path: serviceHref(c, p), priority: 0.8 }))),
  );
  return [...staticPages, ...cityPages, ...servicePages].map(({ path, priority }) => ({
    url: `${site.url}${path === "/" ? "" : path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority,
  }));
}
