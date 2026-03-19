'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { Topic } from '@/types/domain';
import { useAnalytics } from '@/lib/analytics/use-analytics';

interface TopicChipProps {
  topic: Topic;
  variant?: 'default' | 'outline' | 'filled';
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  source?: 'navigation' | 'episode_tag' | 'related';
  className?: string;
}

export function TopicChip({
  topic,
  variant = 'default',
  size = 'sm',
  interactive = true,
  source = 'episode_tag',
  className,
}: TopicChipProps) {
  const { trackTopicClick } = useAnalytics();

  const baseStyles = cn(
    'inline-flex items-center rounded-full font-medium uppercase tracking-wider transition-all',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
    {
      'px-3 py-1 text-[10px]': size === 'sm',
      'px-4 py-1.5 text-xs': size === 'md',
      'px-5 py-2 text-xs': size === 'lg',
    },
    {
      'bg-secondary text-secondary-foreground hover:bg-accent/10 hover:text-accent': variant === 'default',
      'border border-border bg-transparent text-foreground hover:border-accent hover:text-accent': variant === 'outline',
      'bg-accent text-accent-foreground hover:bg-accent/90': variant === 'filled',
    },
    !interactive && 'pointer-events-none',
    className
  );

  const handleClick = () => {
    if (interactive) {
      trackTopicClick(topic, source);
    }
  };

  if (!interactive) {
    return <span className={baseStyles}>{topic.name}</span>;
  }

  return (
    <Link
      href={`/topics/${topic.slug}`}
      className={baseStyles}
      onClick={handleClick}
    >
      {topic.name}
    </Link>
  );
}

interface TopicCollectionProps {
  topics: Topic[];
  variant?: 'default' | 'outline' | 'filled';
  size?: 'sm' | 'md' | 'lg';
  source?: 'navigation' | 'episode_tag' | 'related';
  limit?: number;
  className?: string;
}

export function TopicCollection({
  topics,
  variant = 'default',
  size = 'sm',
  source = 'episode_tag',
  limit,
  className,
}: TopicCollectionProps) {
  const displayTopics = limit ? topics.slice(0, limit) : topics;
  const remaining = limit ? topics.length - limit : 0;

  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {displayTopics.map((topic) => (
        <TopicChip
          key={topic.id}
          topic={topic}
          variant={variant}
          size={size}
          source={source}
        />
      ))}
      {remaining > 0 && (
        <span className={cn(
          'inline-flex items-center rounded-full bg-muted/50 text-muted-foreground uppercase tracking-wider',
          size === 'sm' ? 'px-3 py-1 text-[10px]' : size === 'lg' ? 'px-5 py-2 text-xs' : 'px-4 py-1.5 text-xs'
        )}>
          +{remaining} more
        </span>
      )}
    </div>
  );
}
