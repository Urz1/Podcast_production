import type { Metadata } from 'next';
import Link from 'next/link';
import { generateBaseMetadata } from '@/lib/seo/metadata';
import { getContentAdapter } from '@/lib/adapters';
import { PageContainer, PageHeader } from '@/components/layout/page-shell';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = generateBaseMetadata({
  title: 'Topics',
  description: 'Explore episodes by topic. Find conversations on leadership, entrepreneurship, technology, mindset, and more.',
  path: '/topics',
});

export default async function TopicsPage() {
  const adapter = getContentAdapter();
  const topics = await adapter.topics.getAllTopics();

  return (
    <PageContainer>
      <PageHeader
        align="center"
        title="Explore by Topic"
        description="Dive deep into specific areas of interest. Each topic contains curated episodes and conversations."
        className="mx-auto max-w-2xl"
      />

      <div className="grid gap-6 md:gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {topics.map((topic) => (
          <Link
            key={topic.id}
            href={`/topics/${topic.slug}`}
            className="surface-soft group relative overflow-hidden p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/20 hover:bg-secondary/25 md:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: topic.color || 'var(--primary)' }}
                  aria-hidden="true"
                />
                <h2 className="truncate font-serif text-2xl font-medium text-card-foreground transition-colors group-hover:text-foreground">
                  {topic.name}
                </h2>
              </div>
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-background/70 text-muted-foreground transition-all group-hover:border-foreground/20 group-hover:text-foreground">
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>

            <p className="mt-5 line-clamp-3 text-base leading-relaxed text-muted-foreground">
              {topic.description}
            </p>

            <div className="mt-6 flex items-center justify-between border-t border-border/70 pt-5">
              <span className="rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">
                {topic.episodeCount} episodes
              </span>
              <span className="text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground">
                Explore topic
              </span>
            </div>
          </Link>
        ))}
      </div>
    </PageContainer>
  );
}
