/**
 * Analytics Event Contract
 * UI emits domain events only.
 * Analytics provider implementation must be swappable.
 */

// Event types with their payloads
export interface AnalyticsEvents {
  episode_view: {
    episodeId: string;
    episodeSlug: string;
    episodeTitle: string;
    topicIds: string[];
  };
  podcast_play: {
    episodeId: string;
    episodeSlug: string;
    timestamp?: number;
    source: 'inline_player' | 'platform_link';
  };
  video_play_click: {
    episodeId: string;
    episodeSlug: string;
    platform?: string;
  };
  topic_click: {
    topicId: string;
    topicSlug: string;
    topicName: string;
    source: 'navigation' | 'episode_tag' | 'related';
  };
  search_performed: {
    query: string;
    resultCount: number;
  };
  transcript_open: {
    episodeId: string;
    episodeSlug: string;
  };
  subscribe_click: {
    platform: string;
    episodeId?: string;
    source: 'header' | 'footer' | 'episode' | 'cta_cluster';
  };
  newsletter_signup: {
    source: 'footer' | 'episode' | 'newsletter_page' | 'popup' | 'homepage';
    success: boolean;
  };
}

export type AnalyticsEventName = keyof AnalyticsEvents;

// Analytics provider interface - can be swapped
export interface AnalyticsProvider {
  track<T extends AnalyticsEventName>(
    event: T,
    properties: AnalyticsEvents[T]
  ): void;
  page(name: string, properties?: Record<string, unknown>): void;
  identify(userId: string, traits?: Record<string, unknown>): void;
}

// Default no-op provider for development/SSR
export const noopAnalyticsProvider: AnalyticsProvider = {
  track: () => {},
  page: () => {},
  identify: () => {},
};
