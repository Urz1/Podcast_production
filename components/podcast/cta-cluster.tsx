'use client';

import { cn } from '@/lib/utils';
import type { PlatformLink } from '@/types/domain';
import { useAnalytics } from '@/lib/analytics/use-analytics';
import { Button } from '@/components/ui/button';
import { 
  Music2, 
  Apple, 
  Youtube, 
  Rss,
  Radio
} from 'lucide-react';

const platformIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  spotify: Music2,
  apple: Apple,
  youtube: Youtube,
  rss: Rss,
  overcast: Radio,
  pocketcasts: Radio,
  amazon: Music2,
};

interface CTAClusterProps {
  platformLinks: PlatformLink[];
  title?: string;
  description?: string;
  variant?: 'horizontal' | 'vertical' | 'grid';
  buttonVariant?: 'default' | 'outline' | 'secondary';
  source?: 'header' | 'footer' | 'episode' | 'cta_cluster';
  episodeId?: string;
  className?: string;
}

export function CTACluster({
  platformLinks,
  title,
  description,
  variant = 'horizontal',
  buttonVariant = 'outline',
  source = 'cta_cluster',
  episodeId,
  className,
}: CTAClusterProps) {
  const { trackSubscribeClick } = useAnalytics();

  const handleClick = (platform: string) => {
    trackSubscribeClick(platform, source, episodeId);
  };

  const containerStyles = cn(
    {
      'flex flex-wrap items-center gap-3': variant === 'horizontal',
      'flex flex-col gap-3': variant === 'vertical',
      'grid grid-cols-2 gap-3 sm:grid-cols-3': variant === 'grid',
    },
    className
  );

  return (
    <div className={cn('space-y-4', className)}>
      {(title || description) && (
        <div className="space-y-1">
          {title && <h3 className="font-semibold text-foreground">{title}</h3>}
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
      )}
      <div className={containerStyles}>
        {platformLinks.map((link) => {
          const Icon = platformIcons[link.platform] || Radio;
          return (
            <Button
              key={link.platform}
              variant={buttonVariant}
              asChild
              className="gap-2"
              onClick={() => handleClick(link.platform)}
            >
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </a>
            </Button>
          );
        })}
      </div>
    </div>
  );
}

interface SubscribeBannerProps {
  platformLinks: PlatformLink[];
  title?: string;
  description?: string;
  className?: string;
}

export function SubscribeBanner({
  platformLinks,
  title = 'Never miss an episode',
  description = 'Subscribe to Unshakable Base on your favorite podcast platform.',
  className,
}: SubscribeBannerProps) {
  return (
    <section className={cn('rounded-lg bg-secondary p-6 md:p-8', className)}>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-xl font-bold text-foreground md:text-2xl">{title}</h2>
        <p className="mt-2 text-muted-foreground">{description}</p>
        <div className="mt-6">
          <CTACluster
            platformLinks={platformLinks.slice(0, 4)}
            variant="horizontal"
            buttonVariant="default"
            source="cta_cluster"
            className="justify-center"
          />
        </div>
      </div>
    </section>
  );
}
