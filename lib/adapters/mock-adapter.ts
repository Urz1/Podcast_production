/**
 * Mock Adapter Implementation
 * Implements adapter interfaces using mock data
 * Can be swapped for CMS/API adapters with same interface
 */

import type {
  EpisodeAdapter,
  TopicAdapter,
  HostAdapter,
  ShowAdapter,
  NewsletterAdapter,
  ContentAdapter,
} from './types';
import type { EpisodeFilters, PaginatedResult, Episode } from '@/types/domain';
import {
  mockEpisodes,
  mockTopics,
  mockHosts,
  mockShow,
  mockNewsletterCTA,
} from './mock-data';

// Simulate async data fetching
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const episodeAdapter: EpisodeAdapter = {
  async getLatestEpisode() {
    await delay(100);
    const sorted = [...mockEpisodes].sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
    return sorted[0];
  },

  async getFeaturedEpisodes(limit = 3) {
    await delay(100);
    return mockEpisodes.filter((ep) => ep.featured).slice(0, limit);
  },

  async getEpisodeBySlug(slug) {
    await delay(100);
    return mockEpisodes.find((ep) => ep.slug === slug) || null;
  },

  async getEpisodes(filters?: EpisodeFilters, page = 1, pageSize = 10): Promise<PaginatedResult<Episode>> {
    await delay(100);
    
    let filtered = [...mockEpisodes];

    if (filters?.topicId) {
      filtered = filtered.filter((ep) =>
        ep.topics.some((t) => t.id === filters.topicId)
      );
    }

    if (filters?.hostId) {
      filtered = filtered.filter((ep) =>
        ep.hosts.some((h) => h.id === filters.hostId)
      );
    }

    if (filters?.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (ep) =>
          ep.title.toLowerCase().includes(query) ||
          ep.description.toLowerCase().includes(query) ||
          ep.topics.some((t) => t.name.toLowerCase().includes(query))
      );
    }

    // Sort
    if (filters?.sortBy === 'oldest') {
      filtered.sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime());
    } else if (filters?.sortBy === 'newest' || !filters?.sortBy) {
      filtered.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    }

    const total = filtered.length;
    const start = (page - 1) * pageSize;
    const items = filtered.slice(start, start + pageSize);

    return {
      items,
      total,
      page,
      pageSize,
      hasMore: start + pageSize < total,
    };
  },

  async getEpisodesByTopic(topicId, page = 1, pageSize = 10) {
    return this.getEpisodes({ topicId }, page, pageSize);
  },

  async getRelatedEpisodes(episodeId, limit = 3) {
    await delay(100);
    const episode = mockEpisodes.find((ep) => ep.id === episodeId);
    if (!episode) return [];

    const topicIds = episode.topics.map((t) => t.id);
    return mockEpisodes
      .filter((ep) => ep.id !== episodeId && ep.topics.some((t) => topicIds.includes(t.id)))
      .slice(0, limit);
  },

  async searchEpisodes(query, page = 1, pageSize = 10) {
    return this.getEpisodes({ searchQuery: query }, page, pageSize);
  },
};

const topicAdapter: TopicAdapter = {
  async getAllTopics() {
    await delay(100);
    return mockTopics;
  },

  async getTopicBySlug(slug) {
    await delay(100);
    return mockTopics.find((t) => t.slug === slug) || null;
  },

  async getPopularTopics(limit = 5) {
    await delay(100);
    return [...mockTopics]
      .sort((a, b) => b.episodeCount - a.episodeCount)
      .slice(0, limit);
  },
};

const hostAdapter: HostAdapter = {
  async getAllHosts() {
    await delay(100);
    return mockHosts;
  },

  async getHostById(id) {
    await delay(100);
    return mockHosts.find((h) => h.id === id) || null;
  },
};

const showAdapter: ShowAdapter = {
  async getShowInfo() {
    await delay(100);
    return mockShow;
  },
};

const newsletterAdapter: NewsletterAdapter = {
  async getCTA() {
    await delay(100);
    return mockNewsletterCTA;
  },

  async subscribe(email) {
    await delay(500);
    // Simulate validation
    if (!email || !email.includes('@')) {
      return { success: false, message: 'Please enter a valid email address.' };
    }
    return { success: true, message: 'Thanks for subscribing! Check your inbox to confirm.' };
  },
};

// Export combined adapter
export const mockContentAdapter: ContentAdapter = {
  episodes: episodeAdapter,
  topics: topicAdapter,
  hosts: hostAdapter,
  show: showAdapter,
  newsletter: newsletterAdapter,
};

// Export individual adapters for direct use
export { episodeAdapter, topicAdapter, hostAdapter, showAdapter, newsletterAdapter };
