'use client';

import { useState, useMemo, useEffect } from 'react';
import { EpisodeGrid } from '@/components/podcast/episode-list';
import { SearchFilter } from '@/components/podcast/search-bar';
import { Button } from '@/components/ui/button';
import { PageContainer, PageHeader, PageSection } from '@/components/layout/page-shell';
import type { Episode, EpisodeFilters, Topic } from '@/types/domain';
import { useAnalytics } from '@/lib/analytics/use-analytics';

const PAGE_SIZE = 9;

interface EpisodesPageClientProps {
  initialEpisodes: Episode[];
  topics: Topic[];
}

export function EpisodesPageClient({ initialEpisodes, topics }: EpisodesPageClientProps) {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<EpisodeFilters>({});
  const [page, setPage] = useState(1);
  const { trackSearch } = useAnalytics();

  const filteredEpisodes = useMemo(() => {
    let filtered = [...initialEpisodes];

    if (query) {
      const q = query.toLowerCase();
      filtered = filtered.filter(
        (ep) =>
          ep.title.toLowerCase().includes(q) ||
          ep.description.toLowerCase().includes(q) ||
          ep.topics.some((t) => t.name.toLowerCase().includes(q))
      );
    }

    if (filters.topicId) {
      filtered = filtered.filter((ep) =>
        ep.topics.some((t) => t.id === filters.topicId)
      );
    }

    if (filters.sortBy === 'oldest') {
      filtered.sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime());
    } else {
      filtered.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    }

    return filtered;
  }, [filters, initialEpisodes, query]);

  const episodes = useMemo(() => {
    return filteredEpisodes.slice(0, page * PAGE_SIZE);
  }, [filteredEpisodes, page]);

  const hasMore = episodes.length < filteredEpisodes.length;

  useEffect(() => {
    if (query) {
      trackSearch(query, filteredEpisodes.length);
    }
  }, [filteredEpisodes.length, query, trackSearch]);

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
  };

  const handleFilterChange = (newFilters: EpisodeFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <PageContainer>
      <PageHeader
        title="All Episodes"
        description="Explore our library of conversations on leadership, growth, and resilience."
        className="mb-8"
      />

      <SearchFilter
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        topics={topics}
        defaultQuery={query}
        defaultFilters={filters}
        resultCount={episodes.length}
        className="mb-8"
      />

      <PageSection variant="compact">
        <EpisodeGrid
          episodes={episodes}
          columns={3}
          searchQuery={query}
          onClearFilters={() => {
            setQuery('');
            setFilters({});
          }}
        />

        {hasMore && (
          <div className="mt-12 text-center">
            <Button
              variant="outline"
              size="lg"
              onClick={handleLoadMore}
            >
              Load more episodes
            </Button>
          </div>
        )}
      </PageSection>
    </PageContainer>
  );
}
