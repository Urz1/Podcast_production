import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { EpisodeGrid } from '@/components/podcast/episode-list';
import { TopicChip } from '@/components/podcast/topic-chip';
import { Button } from '@/components/ui/button';
import { PageContainer, PageHeader, PageSection } from '@/components/layout/page-shell';
import { JsonLd } from '@/components/seo/json-ld';
import { generateTopicMetadata, generateBreadcrumbSchema } from '@/lib/seo/metadata';
import { getContentAdapter } from '@/lib/adapters';
import { ArrowLeft } from 'lucide-react';

interface TopicPageProps {
  params: Promise<{ slug: string }>;
}

async function getTopic(slug: string) {
  const adapter = getContentAdapter();
  return adapter.topics.getTopicBySlug(slug);
}

async function getEpisodesByTopic(topicId: string) {
  const adapter = getContentAdapter();
  return (await adapter.episodes.getEpisodesByTopic(topicId, 1, 1000)).items;
}

async function getRelatedTopics(topicId: string) {
  const adapter = getContentAdapter();
  const allTopics = await adapter.topics.getAllTopics();
  return allTopics.filter((t) => t.id !== topicId).slice(0, 4);
}

export async function generateMetadata({ params }: TopicPageProps): Promise<Metadata> {
  const { slug } = await params;
  const topic = await getTopic(slug);
  
  if (!topic) {
    return {
      title: 'Topic Not Found',
    };
  }

  return generateTopicMetadata(topic);
}

export async function generateStaticParams() {
  const adapter = getContentAdapter();
  const topics = await adapter.topics.getAllTopics();

  return topics.map((topic) => ({
    slug: topic.slug,
  }));
}

export default async function TopicPage({ params }: TopicPageProps) {
  const { slug } = await params;
  const topic = await getTopic(slug);

  if (!topic) {
    notFound();
  }

  const episodes = await getEpisodesByTopic(topic.id);
  const relatedTopics = await getRelatedTopics(topic.id);

  return (
    <>
      <JsonLd
        data={generateBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Topics', url: '/topics' },
          { name: topic.name, url: `/topics/${topic.slug}` },
        ])}
      />

      <PageContainer>
        <Button variant="ghost" asChild className="mb-6 gap-1">
          <Link href="/topics">
            <ArrowLeft className="h-4 w-4" />
            All topics
          </Link>
        </Button>

        <PageHeader
          title={topic.name}
          description={topic.description}
          className="max-w-3xl"
        />
        <p className="-mt-8 mb-12 text-muted-foreground">{topic.episodeCount} episodes</p>

        <PageSection variant="compact" aria-labelledby="topic-episodes-heading">
          <h2 id="topic-episodes-heading" className="sr-only">
            Episodes about {topic.name}
          </h2>
          <EpisodeGrid
            episodes={episodes}
            columns={3}
            isEmpty={episodes.length === 0}
          />
        </PageSection>

        {relatedTopics.length > 0 && (
          <PageSection className="border-t border-border pt-12" aria-labelledby="related-topics-heading">
            <div className="mb-6">
              <h2 id="related-topics-heading" className="section-title">Explore More Topics</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {relatedTopics.map((relatedTopic) => (
                <TopicChip
                  key={relatedTopic.id}
                  topic={relatedTopic}
                  variant="outline"
                  size="md"
                  source="related"
                />
              ))}
            </div>
          </PageSection>
        )}
      </PageContainer>
    </>
  );
}
