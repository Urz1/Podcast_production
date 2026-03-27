'use client';

import { useCallback } from 'react';
import type { AnalyticsEventName, AnalyticsEvents, AnalyticsProvider } from './types';
import { noopAnalyticsProvider } from './types';

// Global provider instance - can be replaced at runtime
let analyticsProvider: AnalyticsProvider = noopAnalyticsProvider;

export function setAnalyticsProvider(provider: AnalyticsProvider) {
  analyticsProvider = provider;
}

export function getAnalyticsProvider(): AnalyticsProvider {
  return analyticsProvider;
}

/**
 * Hook for tracking analytics events
 * Returns memoized track functions that emit domain events
 */
export function useAnalytics() {
  const track = useCallback(
    <T extends AnalyticsEventName>(event: T, properties: AnalyticsEvents[T]) => {
      analyticsProvider.track(event, properties);
    },
    []
  );

  const trackEpisodeView = useCallback(
    (episode: { id: string; slug: string; title: string; topics: { id: string }[] }) => {
      track('episode_view', {
        episodeId: episode.id,
        episodeSlug: episode.slug,
        episodeTitle: episode.title,
        topicIds: episode.topics.map((t) => t.id),
      });
    },
    [track]
  );

  const trackPodcastPlay = useCallback(
    (episodeId: string, episodeSlug: string, source: 'inline_player' | 'platform_link', timestamp?: number) => {
      track('podcast_play', { episodeId, episodeSlug, source, timestamp });
    },
    [track]
  );

  const trackVideoPlayClick = useCallback(
    (episodeId: string, episodeSlug: string, platform?: string) => {
      track('video_play_click', { episodeId, episodeSlug, platform });
    },
    [track]
  );

  const trackTopicClick = useCallback(
    (
      topic: { id: string; slug: string; name: string },
      source: 'navigation' | 'episode_tag' | 'related'
    ) => {
      track('topic_click', {
        topicId: topic.id,
        topicSlug: topic.slug,
        topicName: topic.name,
        source,
      });
    },
    [track]
  );

  const trackSearch = useCallback(
    (query: string, resultCount: number) => {
      track('search_performed', { query, resultCount });
    },
    [track]
  );

  const trackTranscriptOpen = useCallback(
    (episodeId: string, episodeSlug: string) => {
      track('transcript_open', { episodeId, episodeSlug });
    },
    [track]
  );

  const trackSubscribeClick = useCallback(
    (platform: string, source: 'header' | 'footer' | 'episode' | 'cta_cluster', episodeId?: string) => {
      track('subscribe_click', { platform, source, episodeId });
    },
    [track]
  );

  const trackNewsletterSignup = useCallback(
    (source: 'footer' | 'episode' | 'newsletter_page' | 'popup' | 'homepage', success: boolean) => {
      track('newsletter_signup', { source, success });
    },
    [track]
  );

  return {
    track,
    trackEpisodeView,
    trackPodcastPlay,
    trackVideoPlayClick,
    trackTopicClick,
    trackSearch,
    trackTranscriptOpen,
    trackSubscribeClick,
    trackNewsletterSignup,
  };
}
