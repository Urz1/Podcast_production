'use client';

import { cn } from '@/lib/utils';
import { formatDuration } from '@/lib/seo/metadata';
import type { ChapterMarker } from '@/types/domain';
import { Clock, ListMusic } from 'lucide-react';

interface ChapterMarkersProps {
  chapters: ChapterMarker[];
  currentTime?: number;
  onChapterClick?: (timestamp: number) => void;
  className?: string;
}

export function ChapterMarkers({
  chapters,
  currentTime = 0,
  onChapterClick,
  className,
}: ChapterMarkersProps) {
  // Find the currently active chapter
  const activeChapterIndex = chapters.findIndex((chapter, index) => {
    const nextChapter = chapters[index + 1];
    return (
      currentTime >= chapter.timestamp &&
      (!nextChapter || currentTime < nextChapter.timestamp)
    );
  });

  if (chapters.length === 0) return null;

  return (
    <section
      className={cn('surface-soft overflow-hidden', className)}
      aria-labelledby="chapters-heading"
    >
      <div className="flex items-center justify-between border-b border-border/80 bg-secondary/30 px-5 py-4">
        <div className="flex items-center gap-2">
          <ListMusic className="h-5 w-5 text-muted-foreground" />
          <h2 id="chapters-heading" className="font-semibold text-card-foreground">
            Chapters
          </h2>
        </div>
        <span className="section-kicker">Jump through moments</span>
      </div>

      <nav aria-label="Episode chapters">
        <ol className="space-y-2 p-2">
          {chapters.map((chapter, index) => (
            <li key={chapter.id}>
              <button
                onClick={() => onChapterClick?.(chapter.timestamp)}
                className={cn(
                  'group relative flex w-full items-start gap-4 rounded-md border border-transparent p-4 text-left transition-all duration-300',
                  'hover:border-border hover:bg-secondary/35',
                  'focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring',
                  index === activeChapterIndex && 'border-primary/30 bg-secondary/45 shadow-sm'
                )}
                aria-current={index === activeChapterIndex ? 'true' : undefined}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    'mt-1 h-6 w-1.5 rounded-full bg-border transition-all duration-300',
                    index === activeChapterIndex ? 'bg-primary' : 'group-hover:bg-muted-foreground/40'
                  )}
                />

                <div className="flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span className="w-12 text-left font-mono">
                    {formatDuration(chapter.timestamp)}
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <p className={cn(
                    'font-medium transition-colors',
                    index === activeChapterIndex ? 'text-primary' : 'text-foreground group-hover:text-foreground'
                  )}>
                    {chapter.title}
                  </p>
                  {chapter.description && (
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {chapter.description}
                    </p>
                  )}
                </div>
              </button>
            </li>
          ))}
        </ol>
      </nav>
    </section>
  );
}

interface ChapterProgressProps {
  chapters: ChapterMarker[];
  currentTime: number;
  duration: number;
  onChapterClick?: (timestamp: number) => void;
  className?: string;
}

export function ChapterProgress({
  chapters,
  currentTime,
  duration,
  onChapterClick,
  className,
}: ChapterProgressProps) {
  if (chapters.length === 0) return null;

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className={cn('relative', className)}>
      {/* Progress track */}
      <div className="h-2 rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Chapter markers */}
      <div className="relative">
        {chapters.map((chapter) => {
          const position = (chapter.timestamp / duration) * 100;
          return (
            <button
              key={chapter.id}
              onClick={() => onChapterClick?.(chapter.timestamp)}
              className="absolute top-0 -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${position}%` }}
              aria-label={`Jump to ${chapter.title}`}
            >
              <div className="h-3 w-3 rounded-full border-2 border-card bg-muted transition-colors hover:bg-primary" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
