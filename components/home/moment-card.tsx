'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MomentCardProps {
  slug: string;
  title: string;
  episodeNumber: number;
  moment: string;
  className?: string;
}

export function MomentCard({ slug, title, episodeNumber, moment, className }: MomentCardProps) {
  const [coords, setCoords] = useState({ x: 50, y: 50 });

  const handleMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    setCoords({ x, y });
  };

  return (
    <Link
      href={`/episodes/${slug}`}
      onMouseMove={handleMove}
      className={cn(
        'group relative flex min-w-[300px] flex-col justify-between snap-start overflow-hidden rounded-2xl p-6 md:p-8 transition-all duration-500 md:min-w-[380px] h-full',
        'border border-border/50 bg-card shadow-lg',
        'hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10',
        className
      )}
      style={{
        backgroundImage: `radial-gradient(circle at ${coords.x}% ${coords.y}%, color-mix(in oklab, var(--primary) 15%, transparent), transparent 60%)`,
      }}
    >
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-primary/80 mb-2">
          Episode {episodeNumber}
        </p>
        <h3 className="line-clamp-2 font-serif text-xl sm:text-2xl font-medium tracking-tight text-foreground transition-colors group-hover:text-primary">
          {title}
        </h3>
        <div className="mt-5 relative">
          <span className="absolute -top-3 -left-2 text-4xl text-primary/20 font-serif">"</span>
          <p className="relative z-10 line-clamp-4 text-base italic leading-relaxed text-muted-foreground/95">
            {moment}
          </p>
        </div>
      </div>
      
      <div className="mt-8 pt-4 border-t border-border/50 flex justify-start">
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold tracking-wide text-primary transition-all group-hover:translate-x-1">
          Open episode
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
