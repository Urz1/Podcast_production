/**
 * Adapter Interfaces - Data Source Agnostic
 * UI consumes typed adapters, not hardcoded APIs.
 * Mock adapters now, CMS/API adapters later, same interface.
 */

import type {
  Episode,
  Topic,
  Host,
  PodcastShow,
  PaginatedResult,
  EpisodeFilters,
  NewsletterCTA,
} from '@/types/domain';

export interface EpisodeAdapter {
  getLatestEpisode(): Promise<Episode>;
  getFeaturedEpisodes(limit?: number): Promise<Episode[]>;
  getEpisodeBySlug(slug: string): Promise<Episode | null>;
  getEpisodes(filters?: EpisodeFilters, page?: number, pageSize?: number): Promise<PaginatedResult<Episode>>;
  getEpisodesByTopic(topicId: string, page?: number, pageSize?: number): Promise<PaginatedResult<Episode>>;
  getRelatedEpisodes(episodeId: string, limit?: number): Promise<Episode[]>;
  searchEpisodes(query: string, page?: number, pageSize?: number): Promise<PaginatedResult<Episode>>;
}

export interface TopicAdapter {
  getAllTopics(): Promise<Topic[]>;
  getTopicBySlug(slug: string): Promise<Topic | null>;
  getPopularTopics(limit?: number): Promise<Topic[]>;
}

export interface HostAdapter {
  getAllHosts(): Promise<Host[]>;
  getHostById(id: string): Promise<Host | null>;
}

export interface ShowAdapter {
  getShowInfo(): Promise<PodcastShow>;
}

export interface NewsletterAdapter {
  getCTA(): Promise<NewsletterCTA>;
  subscribe(email: string): Promise<{ success: boolean; message: string }>;
}

// Combined content adapter for convenience
export interface ContentAdapter {
  episodes: EpisodeAdapter;
  topics: TopicAdapter;
  hosts: HostAdapter;
  show: ShowAdapter;
  newsletter: NewsletterAdapter;
}
