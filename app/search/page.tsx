import { Suspense } from "react";
import { Metadata } from "next";
import { SearchPageClient } from "./search-client";
import { getContentAdapter } from "@/lib/adapters";
import { getAllEpisodes } from "@/lib/adapters/pagination";
import { generatePageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Search Episodes",
  description:
    "Search through all episodes of The Unshakable Base podcast. Find conversations on leadership, resilience, and building sustainable success.",
  path: "/search",
});

export default async function SearchPage() {
  const adapter = getContentAdapter();
  const [episodes, topics] = await Promise.all([
    getAllEpisodes(adapter.episodes),
    adapter.topics.getAllTopics(),
  ]);

  return (
    <Suspense fallback={<SearchLoadingSkeleton />}>
      <SearchPageClient episodes={episodes} topics={topics} />
    </Suspense>
  );
}

function SearchLoadingSkeleton() {
  return (
    <main className="min-h-screen bg-background">
      <div className="page-container page-container-browse max-w-4xl sm:px-6">
        <div className="mb-8 h-12 w-48 animate-pulse rounded-lg bg-muted" />
        <div className="mb-8 h-14 w-full animate-pulse rounded-lg bg-muted" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-32 animate-pulse rounded-lg bg-muted"
            />
          ))}
        </div>
      </div>
    </main>
  );
}
