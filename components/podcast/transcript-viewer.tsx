'use client';

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAnalytics } from '@/lib/analytics/use-analytics';
import { formatDuration } from '@/lib/seo/metadata';
import type { TranscriptBlock } from '@/types/domain';
import { ChevronDown, ChevronUp, Copy, Check, Clock } from 'lucide-react';

interface TranscriptViewerProps {
  transcript: TranscriptBlock[];
  episodeId: string;
  episodeSlug: string;
  currentTime?: number;
  onTimestampClick?: (timestamp: number) => void;
  initiallyExpanded?: boolean;
  className?: string;
}

export function TranscriptViewer({
  transcript,
  episodeId,
  episodeSlug,
  currentTime = 0,
  onTimestampClick,
  initiallyExpanded = false,
  className,
}: TranscriptViewerProps) {
  const [isExpanded, setIsExpanded] = useState(initiallyExpanded);
  const [copied, setCopied] = useState(false);
  const { trackTranscriptOpen } = useAnalytics();
  const activeBlockRef = useRef<HTMLDivElement>(null);

  // Find the currently active block based on currentTime
  const activeBlockIndex = transcript.findIndex((block, index) => {
    const nextBlock = transcript[index + 1];
    return (
      currentTime >= block.timestamp &&
      (!nextBlock || currentTime < nextBlock.timestamp)
    );
  });

  useEffect(() => {
    if (isExpanded && activeBlockRef.current) {
      activeBlockRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [activeBlockIndex, isExpanded]);

  const handleToggle = () => {
    const newExpanded = !isExpanded;
    setIsExpanded(newExpanded);
    if (newExpanded) {
      trackTranscriptOpen(episodeId, episodeSlug);
    }
  };

  const handleCopyAll = async () => {
    const fullText = transcript
      .map((block) => {
        const speaker = block.speaker ? `${block.speaker}: ` : '';
        return `${speaker}${block.text}`;
      })
      .join('\n\n');

    await navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const visibleBlocks = isExpanded ? transcript : transcript.slice(0, 3);

  return (
    <section
      className={cn('surface-soft overflow-hidden', className)}
      aria-labelledby="transcript-heading"
    >
      <div className="flex items-center justify-between border-b border-border/80 bg-secondary/30 px-5 py-4">
        <div>
          <h2 id="transcript-heading" className="font-semibold text-card-foreground">
            Transcript
          </h2>
          <p className="section-kicker mt-1">Tap timestamps to jump in audio</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyAll}
            className="gap-1.5 bg-background/80"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copy all
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="p-4">
        <div className="relative">
          <div className={cn('space-y-3', !isExpanded && 'max-h-52 overflow-hidden')}>
            {visibleBlocks.map((block, index) => (
              <TranscriptBlockItem
                key={block.id}
                block={block}
                isActive={index === activeBlockIndex}
                onTimestampClick={onTimestampClick}
                ref={index === activeBlockIndex ? activeBlockRef : undefined}
              />
            ))}
          </div>

          {!isExpanded && transcript.length > 3 && (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-card via-card/85 to-transparent" />
          )}
        </div>

        {transcript.length > 3 && (
          <Button
            variant="ghost"
            onClick={handleToggle}
            className="mt-4 w-full justify-center gap-2 border border-border/70 bg-secondary/25 hover:bg-secondary/50"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="h-4 w-4" />
                Collapse transcript
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4" />
                Expand full transcript ({transcript.length} sections)
              </>
            )}
          </Button>
        )}
      </div>
    </section>
  );
}

interface TranscriptBlockItemProps {
  block: TranscriptBlock;
  isActive?: boolean;
  onTimestampClick?: (timestamp: number) => void;
}

import { forwardRef } from 'react';

const TranscriptBlockItem = forwardRef<HTMLDivElement, TranscriptBlockItemProps>(
  function TranscriptBlockItem({ block, isActive, onTimestampClick }, ref) {
    const handleTimestampClick = () => {
      onTimestampClick?.(block.timestamp);
    };

    return (
      <div
        ref={ref}
        id={`transcript-${block.id}`}
        className={cn(
          'group rounded-lg border border-border/60 bg-background/70 p-4 transition-all duration-300 hover:border-border hover:bg-secondary/20',
          isActive && 'border-primary/30 bg-secondary/45 shadow-sm'
        )}
      >
        <div className="mb-2 flex flex-wrap items-center gap-2">
          {block.speaker && (
            <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-foreground">
              {block.speaker}
            </span>
          )}
          <button
            onClick={handleTimestampClick}
            className="inline-flex items-center gap-1 rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
            aria-label={`Jump to ${formatDuration(block.timestamp)}`}
          >
            <Clock className="h-3 w-3" />
            {formatDuration(block.timestamp)}
          </button>
        </div>
        <p className="text-sm leading-7 text-muted-foreground md:text-base">{block.text}</p>
      </div>
    );
  }
);
