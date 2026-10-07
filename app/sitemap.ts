import type { MetadataRoute } from "next";
import { site } from "./lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${site.url}/`,
      lastModified: "2025-01-15",
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];
}
