import type { Episode, EpisodeFilters } from '@/types/domain';
import type { EpisodeAdapter } from './types';

export async function getAllEpisodes(
  adapter: EpisodeAdapter,
  filters?: EpisodeFilters,
  pageSize = 200
): Promise<Episode[]> {
  const episodes: Episode[] = [];
  let page = 1;

  while (true) {
    const result = await adapter.getEpisodes(filters, page, pageSize);
    episodes.push(...result.items);

    if (!result.hasMore || result.items.length === 0) {
      break;
    }

    page += 1;
  }

  return episodes;
}