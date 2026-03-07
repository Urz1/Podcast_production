import type { Metadata } from 'next';
import { EpisodesPageClient } from './episodes-client';
import { generateBaseMetadata } from '@/lib/seo/metadata';
import { getContentAdapter } from '@/lib/adapters';

export const metadata: Metadata = generateBaseMetadata({
  title: 'All Episodes',
  description: 'Browse all episodes of Unshakable Base. Explore conversations on leadership, entrepreneurship, mindset, and building resilient careers.',
  path: '/episodes',
});

export default async function EpisodesPage() {
  const adapter = getContentAdapter();
  const [episodesResult, topics] = await Promise.all([
    adapter.episodes.getEpisodes(undefined, 1, 1000),
    adapter.topics.getAllTopics(),
  ]);

  return <EpisodesPageClient initialEpisodes={episodesResult.items} topics={topics} />;
}
