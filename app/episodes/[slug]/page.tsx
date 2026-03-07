import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { EpisodeDetailClient } from './episode-detail-client';
import { JsonLd } from '@/components/seo/json-ld';
import {
  generateEpisodeMetadata,
  generatePodcastEpisodeSchema,
  generateBreadcrumbSchema,
} from '@/lib/seo/metadata';
import { getContentAdapter } from '@/lib/adapters';

interface EpisodePageProps {
  params: Promise<{ slug: string }>;
}

async function getEpisode(slug: string) {
  const adapter = getContentAdapter();
  return adapter.episodes.getEpisodeBySlug(slug);
}

async function getRelatedEpisodes(episodeId: string) {
  const adapter = getContentAdapter();
  return adapter.episodes.getRelatedEpisodes(episodeId, 3);
}

export async function generateMetadata({ params }: EpisodePageProps): Promise<Metadata> {
  const { slug } = await params;
  const episode = await getEpisode(slug);
  
  if (!episode) {
    return {
      title: 'Episode Not Found',
    };
  }

  return generateEpisodeMetadata(episode);
}

export async function generateStaticParams() {
  const adapter = getContentAdapter();
  const episodes = (await adapter.episodes.getEpisodes(undefined, 1, 1000)).items;

  return episodes.map((episode) => ({
    slug: episode.slug,
  }));
}

export default async function EpisodePage({ params }: EpisodePageProps) {
  const { slug } = await params;
  const episode = await getEpisode(slug);

  if (!episode) {
    notFound();
  }

  const adapter = getContentAdapter();
  const show = await adapter.show.getShowInfo();
  const relatedEpisodes = await getRelatedEpisodes(episode.id);

  return (
    <>
      <JsonLd
        data={[
          generatePodcastEpisodeSchema(episode, show),
          generateBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Episodes', url: '/episodes' },
            { name: episode.title, url: `/episodes/${episode.slug}` },
          ]),
        ]}
      />
      <EpisodeDetailClient episode={episode} relatedEpisodes={relatedEpisodes} />
    </>
  );
}
