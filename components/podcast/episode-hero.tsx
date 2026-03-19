'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { Episode } from '@/types/domain';
import { formatDuration, formatDate } from '@/lib/seo/metadata';
import { TopicCollection } from './topic-chip';
import { CTACluster } from './cta-cluster';
import { Clock, Calendar, Users } from 'lucide-react';

interface EpisodeHeroProps {
  episode: Episode;
  variant?: 'full' | 'compact';
  className?: string;
}

export function EpisodeHero({
  episode,
  variant = 'full',
  className,
}: EpisodeHeroProps) {
  if (variant === 'compact') {
    return (
      <header className={cn('space-y-4', className)}>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Episode {episode.episodeNumber}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={episode.publishedAt}>{formatDate(episode.publishedAt)}</time>
        </div>
        <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {episode.title}
        </h1>
        <p className="text-lg text-muted-foreground">{episode.summary}</p>
        {episode.topics.length > 0 && (
          <TopicCollection topics={episode.topics} size="md" />
        )}
      </header>
    );
  }

  return (
    <header className={cn('', className)}>
      <div className="grid gap-8 lg:grid-cols-5 lg:gap-12">
        {/* Cover image */}
        <div className="lg:col-span-2">
          <div className="relative aspect-square overflow-hidden rounded-lg bg-muted shadow-lg">
            <Image
              src={episode.coverImageUrl}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
              priority
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center lg:col-span-3">
          {/* Episode number and date */}
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="rounded-full bg-primary/10 px-3 py-1 font-medium text-primary">
              Episode {episode.episodeNumber}
            </span>
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              <time dateTime={episode.publishedAt}>{formatDate(episode.publishedAt)}</time>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              <span>{formatDuration(episode.duration)}</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="mt-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            {episode.title}
          </h1>

          {/* Summary */}
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            {episode.summary}
          </p>

          {/* Topics */}
          {episode.topics.length > 0 && (
            <div className="mt-4">
              <TopicCollection topics={episode.topics} size="md" />
            </div>
          )}

          {/* Hosts */}
          {episode.hosts.length > 0 && (
            <div className="mt-6 flex items-center gap-3">
              <Users className="h-4 w-4 text-muted-foreground" />
              <div className="flex items-center gap-2">
                {episode.hosts.map((host, index) => (
                  <span key={host.id} className="text-sm text-muted-foreground">
                    {host.name}
                    {index < episode.hosts.length - 1 && ', '}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Listen links */}
          {episode.platformLinks.length > 0 && (
            <div className="mt-6">
              <CTACluster
                platformLinks={episode.platformLinks.slice(0, 4)}
                title="Listen on"
                variant="horizontal"
                buttonVariant="outline"
                source="episode"
                episodeId={episode.id}
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
