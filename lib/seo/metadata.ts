/**
 * SEO Metadata Utilities
 * Generates consistent metadata and structured data across all pages
 */

import type { Metadata } from 'next';
import type { Episode, Topic, PodcastShow, Host } from '@/types/domain';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://unshakablebase.com';
const SITE_NAME = 'Unshakable Base';

interface BaseMetadataParams {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  noIndex?: boolean;
}

export function generateBaseMetadata({
  title,
  description,
  path,
  ogImage = '/images/og-default.jpg',
  noIndex = false,
}: BaseMetadataParams): Metadata {
  const url = `${SITE_URL}${path}`;

  return {
    title: `${title} | ${SITE_NAME}`,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export function generatePageMetadata(params: BaseMetadataParams): Metadata {
  return generateBaseMetadata(params);
}

export function generateEpisodeMetadata(episode: Episode): Metadata {
  return {
    title: `${episode.title} | ${SITE_NAME}`,
    description: episode.summary,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: `${SITE_URL}/episodes/${episode.slug}`,
    },
    openGraph: {
      title: episode.title,
      description: episode.summary,
      url: `${SITE_URL}/episodes/${episode.slug}`,
      siteName: SITE_NAME,
      images: [
        {
          url: episode.coverImageUrl,
          width: 1200,
          height: 630,
          alt: episode.title,
        },
      ],
      type: 'article',
      publishedTime: episode.publishedAt,
    },
    twitter: {
      card: 'summary_large_image',
      title: episode.title,
      description: episode.summary,
      images: [episode.coverImageUrl],
    },
  };
}

export function generateTopicMetadata(topic: Topic): Metadata {
  const title = `${topic.name} Episodes`;
  const description = topic.description;

  return generateBaseMetadata({
    title,
    description,
    path: `/topics/${topic.slug}`,
  });
}

// JSON-LD Structured Data Generators

export function generateOrganizationSchema(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    sameAs: [
      'https://twitter.com/unshakablebase',
      'https://youtube.com/@unshakablebase',
      'https://linkedin.com/company/unshakablebase',
    ],
  };
}

export function generatePodcastSeriesSchema(show: PodcastShow): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'PodcastSeries',
    name: show.name,
    description: show.description,
    url: SITE_URL,
    image: show.coverImageUrl.startsWith('http')
      ? show.coverImageUrl
      : `${SITE_URL}${show.coverImageUrl}`,
    author: show.hosts.map((host) => ({
      '@type': 'Person',
      name: host.name,
    })),
    inLanguage: show.language,
    genre: show.categories,
  };
}

export function generatePodcastEpisodeSchema(episode: Episode, show: PodcastShow): object {
  const episodeUrl = `${SITE_URL}/episodes/${episode.slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'PodcastEpisode',
    name: episode.title,
    description: episode.summary,
    url: episodeUrl,
    datePublished: episode.publishedAt,
    duration: formatDurationISO8601(episode.duration),
    associatedMedia: {
      '@type': 'AudioObject',
      contentUrl: episode.audioUrl.startsWith('http')
        ? episode.audioUrl
        : `${SITE_URL}${episode.audioUrl}`,
    },
    partOfSeries: {
      '@type': 'PodcastSeries',
      name: show.name,
      url: SITE_URL,
    },
    image: episode.coverImageUrl.startsWith('http')
      ? episode.coverImageUrl
      : `${SITE_URL}${episode.coverImageUrl}`,
    author: episode.hosts.map((host) => ({
      '@type': 'Person',
      name: host.name,
    })),
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

// Helper to format duration to ISO 8601
function formatDurationISO8601(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  let duration = 'PT';
  if (hours > 0) duration += `${hours}H`;
  if (minutes > 0) duration += `${minutes}M`;
  if (secs > 0) duration += `${secs}S`;

  return duration;
}

// Format duration for display (e.g., "57:00" or "1:23:45")
export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

// Format date for display
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
