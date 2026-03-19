'use client';

import { useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';
import { useAnalytics } from '@/lib/analytics/use-analytics';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  onClear?: () => void;
  defaultValue?: string;
  autoSubmit?: boolean;
  debounceMs?: number;
  className?: string;
}

export function SearchBar({
  placeholder = 'Search episodes...',
  onSearch,
  onClear,
  defaultValue = '',
  autoSubmit = false,
  debounceMs = 300,
  className,
}: SearchBarProps) {
  const [query, setQuery] = useState(defaultValue);
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);
  const { trackSearch } = useAnalytics();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);

    if (autoSubmit) {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
      const timer = setTimeout(() => {
        if (newQuery.trim()) {
          onSearch?.(newQuery.trim());
        } else {
          onClear?.();
        }
      }, debounceMs);
      setDebounceTimer(timer);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch?.(query.trim());
      trackSearch(query.trim(), 0); // Result count updated by parent
    }
  };

  const handleClear = () => {
    setQuery('');
    onClear?.();
  };

  return (
    <form onSubmit={handleSubmit} className={cn('relative', className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
          className="pl-10 pr-10"
          aria-label="Search episodes"
        />
        {query && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleClear}
            className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </form>
  );
}

import type { EpisodeFilters } from '@/types/domain';

interface SearchFilterProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: EpisodeFilters) => void;
  topics?: { id: string; name: string; slug: string }[];
  defaultQuery?: string;
  defaultFilters?: EpisodeFilters;
  resultCount?: number;
  className?: string;
}

export function SearchFilter({
  onSearch,
  onFilterChange,
  topics = [],
  defaultQuery = '',
  defaultFilters = {},
  resultCount,
  className,
}: SearchFilterProps) {
  const [query, setQuery] = useState(defaultQuery);
  const [filters, setFilters] = useState<EpisodeFilters>(defaultFilters);

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    onSearch(newQuery);
  };

  const handleFilterChange = (key: 'topicId' | 'sortBy', value: string) => {
    const newFilters: EpisodeFilters = {
      ...filters,
      [key]: value || undefined,
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleClear = () => {
    setQuery('');
    setFilters({});
    onSearch('');
    onFilterChange({});
  };

  return (
    <div className={cn('space-y-4', className)}>
      <SearchBar
        defaultValue={query}
        onSearch={handleSearch}
        onClear={() => {
          setQuery('');
          onSearch('');
        }}
        placeholder="Search by title, topic, or keyword..."
      />

      <div className="flex flex-wrap items-center gap-3">
        {/* Topic filter */}
        {topics.length > 0 && (
          <select
            value={filters.topicId || ''}
            onChange={(e) => handleFilterChange('topicId', e.target.value)}
            className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            aria-label="Filter by topic"
          >
            <option value="">All topics</option>
            {topics.map((topic) => (
              <option key={topic.id} value={topic.id}>
                {topic.name}
              </option>
            ))}
          </select>
        )}

        {/* Sort */}
        <select
          value={filters.sortBy || 'newest'}
          onChange={(e) => handleFilterChange('sortBy', e.target.value)}
          className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          aria-label="Sort episodes"
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
        </select>

        {/* Clear filters */}
        {(query || filters.topicId || filters.sortBy !== 'newest') && (
          <Button variant="ghost" size="sm" onClick={handleClear}>
            Clear filters
          </Button>
        )}

        {/* Result count */}
        {resultCount !== undefined && (
          <span className="ml-auto text-sm text-muted-foreground">
            {resultCount} {resultCount === 1 ? 'episode' : 'episodes'}
          </span>
        )}
      </div>
    </div>
  );
}
