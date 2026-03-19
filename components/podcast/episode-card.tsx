'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Play, Clock, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Episode } from '@/types/domain';
import { formatDuration, formatDate } from '@/lib/seo/metadata';
import { TopicCollection } from './topic-chip';
import { Button } from '@/components/ui/button';
import { useAnalytics } from '@/lib/analytics/use-analytics';
import { motion } from 'framer-motion';
import { MagneticButton } from '../ui/magnetic-button';

interface EpisodeCardProps {
  episode: Episode;
  variant?: 'default' | 'featured' | 'compact' | 'minimal';
  showImage?: boolean;
  showTopics?: boolean;
  className?: string;
}

export function EpisodeCard({
  episode,
  variant = 'default',
  showImage = true,
  showTopics = true,
  className,
}: EpisodeCardProps) {
  const { trackPodcastPlay } = useAnalytics();
  const quickTakeaway =
    episode.summary.split(/[.!?]/).find((part) => part.trim().length > 28)?.trim() ||
    episode.summary;

  const handlePlayClick = (e: React.MouseEvent) => {
    e.preventDefault();
    trackPodcastPlay(episode.id, episode.slug, 'inline_player');
  };

  // Compact variant - horizontal card
  if (variant === 'compact') {
    return (
      <Link
        href={`/episodes/${episode.slug}`}
        className={cn(
          'group flex items-center gap-5 py-4 transition-colors',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
          className
        )}
      >
        {showImage && (
          <div className="image-reveal relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-sm bg-muted">
            <Image
              src={episode.coverImageUrl}
              alt=""
              fill
              className="object-cover"
              sizes="80px"
            />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className="text-label text-muted-foreground">
            Episode {episode.episodeNumber}
          </p>
          <h3 className="mt-1 truncate font-serif text-lg font-medium text-foreground transition-colors group-hover:text-accent">
            {episode.title}
          </h3>
          <div className="mt-2 flex items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {formatDuration(episode.duration)}
            </span>
          </div>
        </div>
        <ArrowUpRight className="h-5 w-5 flex-shrink-0 text-muted-foreground opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Link>
    );
  }

  // Minimal variant - text only list item
  if (variant === 'minimal') {
    return (
      <Link
        href={`/episodes/${episode.slug}`}
        className={cn(
          'group flex items-baseline justify-between gap-4 border-b border-border py-5 transition-colors',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
          className
        )}
      >
        <div className="min-w-0 flex-1">
          <span className="text-sm text-muted-foreground">
            {String(episode.episodeNumber).padStart(2, '0')}
          </span>
          <h3 className="mt-1 font-serif text-xl font-medium text-foreground transition-colors group-hover:text-accent">
            {episode.title}
          </h3>
        </div>
        <span className="flex-shrink-0 text-sm text-muted-foreground">
          {formatDuration(episode.duration)}
        </span>
      </Link>
    );
  }

  // Featured variant - large horizontal layout
  if (variant === 'featured') {
    return (
      <div className={cn('overflow-hidden rounded-sm border border-border bg-card', className)}>
        <div className="flex flex-col lg:flex-row">
          {showImage && (
            <div className="image-reveal relative aspect-square w-full lg:aspect-auto lg:h-auto lg:w-96">
              <Image
                src={episode.coverImageUrl}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 384px"
                priority
              />
              <button
                onClick={handlePlayClick}
                className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors hover:bg-black/10"
                aria-label={`Play ${episode.title}`}
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-background text-foreground shadow-2xl transition-transform hover:scale-110">
                  <Play className="h-6 w-6 translate-x-0.5" />
                </div>
              </button>
            </div>
          )}
          <div className="flex flex-1 flex-col justify-center p-8 lg:p-10">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="text-label">Episode {episode.episodeNumber}</span>
              <span className="h-1 w-1 rounded-full bg-current" aria-hidden="true" />
              <time dateTime={episode.publishedAt}>{formatDate(episode.publishedAt)}</time>
            </div>
            <Link href={`/episodes/${episode.slug}`}>
              <h2 className="text-headline mt-4 text-balance text-card-foreground transition-colors hover:text-accent">
                {episode.title}
              </h2>
            </Link>
            <p className="mt-4 line-clamp-3 text-lg text-muted-foreground">
              {episode.summary}
            </p>
            {showTopics && episode.topics.length > 0 && (
              <div className="mt-6">
                <TopicCollection topics={episode.topics} limit={3} />
              </div>
            )}
            <div className="mt-8 flex items-center gap-6">
              <Button onClick={handlePlayClick} className="gap-2">
                <Play className="h-4 w-4" />
                Play Episode
              </Button>
              <span className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                {formatDuration(episode.duration)}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default variant - vertical card
  return (
    <motion.article 
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn('group relative overflow-hidden rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm shadow-lg transition-all hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10', className)}
    >
      {showImage && (
        <Link href={`/episodes/${episode.slug}`} className="block overflow-hidden">
          <div className="relative aspect-[16/10] overflow-hidden bg-muted">
            <Image
              src={episode.coverImageUrl}
              alt=""
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-60 transition-opacity group-hover:opacity-80" />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                whileHover={{ scale: 1.1 }}
                className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/90 text-primary-foreground opacity-0 shadow-2xl backdrop-blur-md transition-all duration-300 group-hover:opacity-100 group-hover:scale-100"
              >
                <Play className="h-6 w-6 translate-x-0.5 fill-current" />
              </motion.div>
            </div>
          </div>
        </Link>
      )}
      <div className="p-6">
        <div className="flex items-center gap-3 text-sm">
          <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-widest text-primary">
            Ep. {episode.episodeNumber}
          </span>
          <span className="h-1 w-1 rounded-full bg-muted-foreground/50" aria-hidden="true" />
          <time className="text-xs font-medium uppercase tracking-wider text-muted-foreground" dateTime={episode.publishedAt}>
            {formatDate(episode.publishedAt)}
          </time>
        </div>
        <Link href={`/episodes/${episode.slug}`} className="mt-4 block">
          <h3 className="line-clamp-2 font-serif text-2xl font-medium tracking-tight text-foreground transition-colors group-hover:text-primary">
            {episode.title}
          </h3>
        </Link>
        <p className="mt-3 line-clamp-2 text-base text-muted-foreground leading-relaxed">
          {episode.summary}
        </p>
        
        {/* Animated Quick Takeaway */}
        <div className="mt-5 overflow-hidden rounded-xl border border-border/50 bg-secondary/30 p-4 transition-colors group-hover:bg-secondary/50 group-hover:border-primary/20">
          <div className="flex gap-3">
            <div className="mt-1 sticky shrink-0">
              <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            </div>
            <p className="line-clamp-2 text-sm italic text-muted-foreground group-hover:text-foreground transition-colors">
              "{quickTakeaway}"
            </p>
          </div>
        </div>
        
        <div className="mt-6 flex items-end justify-between border-t border-border/50 pt-5">
          {showTopics && episode.topics.length > 0 ? (
            <TopicCollection topics={episode.topics} limit={2} size="sm" />
          ) : (
            <div />
          )}
          <span className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
            <Clock className="h-3.5 w-3.5" />
            {formatDuration(episode.duration)}
          </span>
        </div>
      </div>
    </motion.article>
  );
}
