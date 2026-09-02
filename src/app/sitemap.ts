import type { MetadataRoute } from "next";

import { specimens } from "@/data/specimens";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/collection", "/about"].map((route) => ({
    url: new URL(route, siteUrl).toString(),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const specimenRoutes = specimens.map((specimen) => ({
    url: new URL(`/specimens/${specimen.slug}`, siteUrl).toString(),
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...specimenRoutes];
}
