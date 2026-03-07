"use client";

import { useState, useMemo, useCallback, useTransition } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Episode, Topic } from "@/types/domain";
import { EpisodeCard } from "@/components/podcast/episode-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X, Filter } from "lucide-react";
import { EmptyState } from "@/components/ui/states";
import { useAnalytics } from "@/lib/analytics/use-analytics";

interface SearchPageClientProps {
  episodes: Episode[];
  topics: Topic[];
}

export function SearchPageClient({ episodes, topics }: SearchPageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { trackSearch } = useAnalytics();
  const [isPending, startTransition] = useTransition();

  const initialQuery = searchParams.get("q") || "";
  const initialTopic = searchParams.get("topic") || "";

  const [query, setQuery] = useState(initialQuery);
  const [selectedTopic, setSelectedTopic] = useState(initialTopic);
  const [showFilters, setShowFilters] = useState(false);

  const updateUrl = useCallback(
    (newQuery: string, newTopic: string) => {
      startTransition(() => {
        const params = new URLSearchParams();
        if (newQuery) params.set("q", newQuery);
        if (newTopic) params.set("topic", newTopic);
        router.push(`/search?${params.toString()}`, { scroll: false });
      });
    },
    [router]
  );

  const filteredEpisodes = useMemo(() => {
    let results = episodes;

    if (query.trim()) {
      const searchTerms = query.toLowerCase().split(/\s+/);
      results = results.filter((episode) => {
        const searchableText = [
          episode.title,
          episode.description,
          ...episode.topics.map((t) => t.name),
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return searchTerms.every((term) => searchableText.includes(term));
      });
    }

    if (selectedTopic) {
      results = results.filter((episode) =>
        episode.topics.some((t) => t.slug === selectedTopic)
      );
    }

    return results;
  }, [episodes, query, selectedTopic]);

  const handleSearch = useCallback(
    (value: string) => {
      setQuery(value);
      updateUrl(value, selectedTopic);
      if (value.trim()) {
        trackSearch(value, filteredEpisodes.length);
      }
    },
    [selectedTopic, updateUrl, trackSearch, filteredEpisodes.length]
  );

  const handleTopicFilter = useCallback(
    (topicSlug: string) => {
      const newTopic = selectedTopic === topicSlug ? "" : topicSlug;
      setSelectedTopic(newTopic);
      updateUrl(query, newTopic);
    },
    [selectedTopic, query, updateUrl]
  );

  const clearFilters = useCallback(() => {
    setQuery("");
    setSelectedTopic("");
    updateUrl("", "");
  }, [updateUrl]);

  const hasActiveFilters = query.trim() || selectedTopic;

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Search Episodes
          </h1>
          <p className="mt-2 text-muted-foreground">
            Find conversations on leadership, resilience, and building
            sustainable success.
          </p>
        </header>

        {/* Search Input */}
        <div className="mb-6">
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              type="search"
              placeholder="Search by title, guest, topic..."
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              className="h-14 pl-12 pr-12 text-lg"
              aria-label="Search episodes"
            />
            {query && (
              <button
                type="button"
                onClick={() => handleSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                aria-label="Clear search"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        {/* Filter Toggle */}
        <div className="mb-6 flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="gap-2"
          >
            <Filter className="h-4 w-4" />
            {showFilters ? "Hide Filters" : "Show Filters"}
            {selectedTopic && (
              <span className="ml-1 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                1
              </span>
            )}
          </Button>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-muted-foreground"
            >
              Clear all filters
            </Button>
          )}
        </div>

        {/* Topic Filters */}
        {showFilters && (
          <div
            className="mb-8 rounded-lg border border-border bg-card p-4"
            role="group"
            aria-label="Filter by topic"
          >
            <h2 className="mb-3 text-sm font-medium text-foreground">
              Filter by Topic
            </h2>
            <div className="flex flex-wrap gap-2">
              {topics.map((topic) => (
                <button
                  key={topic.slug}
                  type="button"
                  onClick={() => handleTopicFilter(topic.slug)}
                  aria-pressed={selectedTopic === topic.slug}
                  className={
                    selectedTopic === topic.slug
                      ? "inline-flex items-center rounded-full bg-secondary px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-secondary-foreground"
                      : "inline-flex items-center rounded-full border border-border bg-transparent px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-foreground hover:border-accent hover:text-accent"
                  }
                >
                  {topic.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        <div aria-live="polite" aria-atomic="true">
          {isPending ? (
            <p className="text-center text-muted-foreground">Searching...</p>
          ) : filteredEpisodes.length > 0 ? (
            <>
              <p className="mb-4 text-sm text-muted-foreground">
                {filteredEpisodes.length}{" "}
                {filteredEpisodes.length === 1 ? "episode" : "episodes"} found
              </p>
              <div className="space-y-4">
                {filteredEpisodes.map((episode) => (
                  <EpisodeCard
                    key={episode.slug}
                    episode={episode}
                    variant="compact"
                  />
                ))}
              </div>
            </>
          ) : hasActiveFilters ? (
            <EmptyState
              title="No episodes found"
              message="Try adjusting your search terms or filters to find what you're looking for."
              action={
                {
                  label: 'Clear filters',
                  onClick: clearFilters,
                }
              }
            />
          ) : (
            <EmptyState
              title="Start searching"
              message="Enter a search term or select a topic to find episodes."
            />
          )}
        </div>
      </div>
    </main>
  );
}
