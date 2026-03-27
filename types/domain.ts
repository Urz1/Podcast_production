/**
 * Core Domain Models - Single Source of Data Truth
 * All fetching must map to these models through adapters.
 */

// Base types
export interface PlatformLink {
  platform: 'spotify' | 'apple' | 'youtube' | 'rss' | 'overcast' | 'pocketcasts' | 'amazon';
  url: string;
  label: string;
}

export interface Host {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatarUrl: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
}

export interface Topic {
  id: string;
  slug: string;
  name: string;
  description: string;
  episodeCount: number;
  color?: string;
}

export interface TranscriptBlock {
  id: string;
  timestamp: number; // seconds
  speaker?: string;
  text: string;
}

export interface ChapterMarker {
  id: string;
  title: string;
  timestamp: number; // seconds
  description?: string;
}

export interface SponsorSlot {
  id: string;
  name: string;
  tagline: string;
  logoUrl: string;
  url: string;
  message?: string;
}

export interface Episode {
  id: string;
  slug: string;
  episodeNumber: number;
  title: string;
  description: string;
  summary: string;
  showNotes: string; // HTML or Markdown
  publishedAt: string; // ISO date string
  duration: number; // seconds
  audioUrl: string;
  videoUrl?: string;
  coverImageUrl: string;
  topics: Topic[];
  hosts: Host[];
  transcript: TranscriptBlock[];
  chapters: ChapterMarker[];
  platformLinks: PlatformLink[];
  sponsors?: SponsorSlot[];
  featured?: boolean;
}

export interface NewsletterCTA {
  id: string;
  title: string;
  description: string;
  buttonText: string;
  placeholderText: string;
}

// Pagination types
export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// Filter types
export interface EpisodeFilters {
  topicId?: string;
  hostId?: string;
  searchQuery?: string;
  sortBy?: 'newest' | 'oldest' | 'popular';
}

// Metadata types for SEO
export interface PageMetadata {
  title: string;
  description: string;
  canonicalUrl: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'video.other';
  publishedAt?: string;
  modifiedAt?: string;
  keywords?: string[];
}

// Podcast show info
export interface PodcastShow {
  name: string;
  tagline: string;
  description: string;
  coverImageUrl: string;
  hosts: Host[];
  platformLinks: PlatformLink[];
  totalEpisodes: number;
  categories: string[];
  language: string;
  explicit: boolean;
}
