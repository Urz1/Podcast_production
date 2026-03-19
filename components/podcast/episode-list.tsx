'use client';

import { cn } from '@/lib/utils';
import type { Episode } from '@/types/domain';
import { EpisodeCard } from './episode-card';
import { LoadingState, EmptyState, NoResultsState } from '@/components/ui/states';

interface EpisodeListProps {
  episodes: Episode[];
  variant?: 'default' | 'compact';
  showImages?: boolean;
  showTopics?: boolean;
  isLoading?: boolean;
  isEmpty?: boolean;
  searchQuery?: string;
  onClearFilters?: () => void;
  className?: string;
}

export function EpisodeList({
  episodes,
  variant = 'default',
  showImages = true,
  showTopics = true,
  isLoading = false,
  isEmpty = false,
  searchQuery,
  onClearFilters,
  className,
}: EpisodeListProps) {
  if (isLoading) {
    return <LoadingState message="Loading episodes..." />;
  }

  if (isEmpty || episodes.length === 0) {
    if (searchQuery) {
      return <NoResultsState query={searchQuery} onClear={onClearFilters} />;
    }
    return (
      <EmptyState
        title="No episodes yet"
        message="Check back soon for new content."
      />
    );
  }

  if (variant === 'compact') {
    return (
      <div className={cn('divide-y divide-border', className)}>
        {episodes.map((episode) => (
          <EpisodeCard
            key={episode.id}
            episode={episode}
            variant="compact"
            showImage={showImages}
            showTopics={false}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={cn('space-y-6', className)}>
      {episodes.map((episode) => (
        <EpisodeCard
          key={episode.id}
          episode={episode}
          showImage={showImages}
          showTopics={showTopics}
        />
      ))}
    </div>
  );
}

interface EpisodeGridProps {
  episodes: Episode[];
  columns?: 2 | 3 | 4;
  showImages?: boolean;
  showTopics?: boolean;
  isLoading?: boolean;
  isEmpty?: boolean;
  searchQuery?: string;
  onClearFilters?: () => void;
  className?: string;
}

export function EpisodeGrid({
  episodes,
  columns = 3,
  showImages = true,
  showTopics = true,
  isLoading = false,
  isEmpty = false,
  searchQuery,
  onClearFilters,
  className,
}: EpisodeGridProps) {
  if (isLoading) {
    return <LoadingState message="Loading episodes..." />;
  }

  if (isEmpty || episodes.length === 0) {
    if (searchQuery) {
      return <NoResultsState query={searchQuery} onClear={onClearFilters} />;
    }
    return (
      <EmptyState
        title="No episodes yet"
        message="Check back soon for new content."
      />
    );
  }

  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  };

  return (
    <div className={cn('grid gap-6', gridCols[columns], className)}>
      {episodes.map((episode) => (
        <EpisodeCard
          key={episode.id}
          episode={episode}
          showImage={showImages}
          showTopics={showTopics}
        />
      ))}
    </div>
  );
}
