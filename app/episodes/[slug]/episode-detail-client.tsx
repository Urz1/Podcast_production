'use client';

import { useState, useEffect } from 'react';
import { EpisodeHero } from '@/components/podcast/episode-hero';
import { YouTubeEmbed } from '@/components/audio/youtube-embed';
import { AmbientCanvas } from '@/components/audio/ambient-canvas';
import { SoundscapeProvider } from '@/components/audio/soundscape-provider';
import { ChapterMarkers } from '@/components/podcast/chapter-markers';
import { TranscriptViewer } from '@/components/podcast/transcript-viewer';
import { RelatedEpisodes } from '@/components/podcast/related-episodes';
import { NewsletterCapture } from '@/components/podcast/newsletter-capture';
import { PageContainer, PageSection, SectionHeading } from '@/components/layout/page-shell';
import type { Episode } from '@/types/domain';
import { useAnalytics } from '@/lib/analytics/use-analytics';
import { RevealContainer, RevealItem } from '@/components/ui/scroll-motion';

interface EpisodeDetailClientProps {
  episode: Episode;
  relatedEpisodes: Episode[];
}

export function EpisodeDetailClient({ episode, relatedEpisodes }: EpisodeDetailClientProps) {
  const [currentTime, setCurrentTime] = useState(0);
  const { trackEpisodeView } = useAnalytics();

  // Extract topic colors for the ambient canvas palette
  const topicColors = episode.topics
    .map((t) => t.color)
    .filter((c): c is string => Boolean(c));

  useEffect(() => {
    trackEpisodeView(episode);
  }, [episode, trackEpisodeView]);

  const handleSeek = (timestamp: number) => {
    setCurrentTime(timestamp);
  };

  return (
    <SoundscapeProvider>
      {/* Living ambient background — responds to YouTube playback */}
      <AmbientCanvas topicColors={topicColors} />

      <article className="relative z-10 pb-16 pt-0">
        <RevealContainer className="relative overflow-hidden border-b border-border bg-secondary/30 py-16 md:py-24">
          {/* Cinematic Background Glow */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px] pointer-events-none mix-blend-screen" />

          <RevealItem>
            <PageContainer className="py-0 relative z-10">
              <EpisodeHero episode={episode} />
            </PageContainer>
          </RevealItem>
        </RevealContainer>

        <PageContainer className="mt-12">
          <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
            <div className="space-y-16 lg:col-span-2">
              {/* YouTube Video Player — drives the ambient canvas */}
              {episode.videoUrl && (
                <RevealContainer>
                  <RevealItem>
                    <PageSection variant="compact" aria-labelledby="player-heading">
                      <h2 id="player-heading" className="sr-only">Episode Video</h2>
                      <YouTubeEmbed
                        videoUrl={episode.videoUrl}
                        episodeId={episode.id}
                        episodeSlug={episode.slug}
                        title={episode.title}
                        coverImageUrl={episode.coverImageUrl}
                        duration={episode.duration}
                        chapters={episode.chapters}
                      />
                    </PageSection>
                  </RevealItem>
                </RevealContainer>
              )}

              <RevealContainer>
                <RevealItem>
                  <PageSection variant="compact" aria-labelledby="summary-heading">
                    <SectionHeading id="summary-heading" title="About This Episode" />
                    <div className="section-panel mt-6 p-8 md:p-10 border border-border/40 shadow-lg shadow-primary/5 rounded-2xl bg-card/60 backdrop-blur-md">
                      <p className="prose-reading max-w-none text-lg text-muted-foreground leading-relaxed">
                        {episode.description}
                      </p>
                    </div>
                  </PageSection>
                </RevealItem>
              </RevealContainer>

              <RevealContainer>
                <RevealItem>
                  <PageSection variant="compact" aria-labelledby="shownotes-heading">
                    <SectionHeading id="shownotes-heading" title="Show Notes" />
                    <div className="section-panel mt-6 p-8 md:p-10 border border-border/40 shadow-lg shadow-primary/5 rounded-2xl bg-card/60 backdrop-blur-md">
                      <div className="prose-reading max-w-none whitespace-pre-line text-muted-foreground leading-relaxed">
                        {episode.showNotes}
                      </div>
                    </div>
                  </PageSection>
                </RevealItem>
              </RevealContainer>

              {episode.chapters.length > 0 && (
                <RevealContainer>
                  <RevealItem>
                    <ChapterMarkers
                      chapters={episode.chapters}
                      currentTime={currentTime}
                      onChapterClick={handleSeek}
                    />
                  </RevealItem>
                </RevealContainer>
              )}

              {episode.transcript.length > 0 && (
                <RevealContainer>
                  <RevealItem>
                    <TranscriptViewer
                      transcript={episode.transcript}
                      episodeId={episode.id}
                      episodeSlug={episode.slug}
                      currentTime={currentTime}
                      onTimestampClick={handleSeek}
                    />
                  </RevealItem>
                </RevealContainer>
              )}
            </div>

            <aside className="space-y-10">
              <RevealContainer>
                <RevealItem>
                  <div className="sticky top-28">
                    <NewsletterCapture
                      title="Get Episode Updates"
                      description="Subscribe to receive new episodes and weekly insights."
                      source="episode"
                    />

                    {relatedEpisodes.length > 0 && (
                      <div className="hidden lg:block mt-10">
                        <RelatedEpisodes
                          episodes={relatedEpisodes}
                          description="More conversations aligned with this episode's themes."
                          variant="compact"
                          showViewAll
                        />
                      </div>
                    )}
                  </div>
                </RevealItem>
              </RevealContainer>
            </aside>
          </div>

          {relatedEpisodes.length > 0 && (
            <RevealContainer>
              <RevealItem>
                <PageSection className="border-t border-border/50 pt-16 mt-16 lg:hidden" variant="compact">
                  <RelatedEpisodes
                    episodes={relatedEpisodes}
                    description="More conversations aligned with this episode's themes."
                    variant="grid"
                    showViewAll
                  />
                </PageSection>
              </RevealItem>
            </RevealContainer>
          )}
        </PageContainer>
      </article>
    </SoundscapeProvider>
  );
}
