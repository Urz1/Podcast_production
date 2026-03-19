'use client';

import { cn } from '@/lib/utils';
import type { Episode } from '@/types/domain';
import { EpisodeCard } from './episode-card';
import { EpisodeGrid } from './episode-list';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface RelatedEpisodesProps {
  episodes: Episode[];
  title?: string;
  description?: string;
  variant?: 'grid' | 'compact' | 'carousel';
  showViewAll?: boolean;
  viewAllHref?: string;
  className?: string;
}

export function RelatedEpisodes({
  episodes,
  title = 'Related Episodes',
  description,
  variant = 'grid',
  showViewAll = true,
  viewAllHref = '/episodes',
  className,
}: RelatedEpisodesProps) {
  if (episodes.length === 0) return null;

  return (
    <section className={cn('space-y-5', className)} aria-labelledby="related-episodes-heading">
      <div className="flex items-end justify-between gap-4 border-b border-border/70 pb-4">
        <div>
          <p className="section-kicker">Discover More</p>
          <h2 id="related-episodes-heading" className="mt-2 font-serif text-2xl font-medium text-foreground md:text-3xl">
            {title}
          </h2>
          {description && (
            <p className="mt-2 text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        {showViewAll && (
          <Button variant="outline" asChild className="hidden gap-1 sm:flex">
            <Link href={viewAllHref}>
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        )}
      </div>

      {variant === 'compact' ? (
        <div className="surface-soft divide-y divide-border/80 bg-secondary/15">
          {episodes.map((episode) => (
            <EpisodeCard
              key={episode.id}
              episode={episode}
              variant="compact"
              showTopics={false}
            />
          ))}
        </div>
      ) : variant === 'carousel' ? (
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
          {episodes.map((episode) => (
            <div key={episode.id} className="w-72 flex-shrink-0">
              <EpisodeCard episode={episode} showTopics={false} />
            </div>
          ))}
        </div>
      ) : (
        <EpisodeGrid episodes={episodes} columns={3} showTopics={false} />
      )}

      {showViewAll && (
        <div className="sm:hidden">
          <Button variant="outline" asChild className="w-full gap-1">
            <Link href={viewAllHref}>
              View all episodes
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      )}
    </section>
  );
}
