import { MetadataRoute } from "next";
import { getContentAdapter } from "@/lib/adapters";
import { getAllEpisodes } from "@/lib/adapters/pagination";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://unshakablebase.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const adapter = getContentAdapter();
  const [episodes, topics] = await Promise.all([
    getAllEpisodes(adapter.episodes),
    adapter.topics.getAllTopics(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/episodes`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/topics`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/newsletter`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/search`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
  ];

  const episodeRoutes: MetadataRoute.Sitemap = episodes.map((episode) => ({
    url: `${BASE_URL}/episodes/${episode.slug}`,
    lastModified: new Date(episode.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const topicRoutes: MetadataRoute.Sitemap = topics.map((topic) => ({
    url: `${BASE_URL}/topics/${topic.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...episodeRoutes, ...topicRoutes];
}
