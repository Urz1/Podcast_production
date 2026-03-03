import Link from 'next/link';
import Image from 'next/image';
import { EpisodeCard } from '@/components/podcast/episode-card';
import { TopicChip } from '@/components/podcast/topic-chip';
import { NewsletterCapture } from '@/components/podcast/newsletter-capture';
import { DepthHeroVisual } from '@/components/home/depth-hero-visual';
import { MomentCard } from '@/components/home/moment-card';
import { JsonLd } from '@/components/seo/json-ld';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, ArrowUpRight } from 'lucide-react';
import { FaApple, FaSpotify, FaYoutube, FaPodcast, FaRss } from 'react-icons/fa';
import {
  generateOrganizationSchema,
  generatePodcastSeriesSchema,
} from '@/lib/seo/metadata';
import { getContentAdapter } from '@/lib/adapters';
import { HeroMotionScene } from '@/components/home/hero-motion-scene';
import { MagneticButton } from '@/components/ui/magnetic-button';
import { RevealContainer, RevealItem, ParallaxSection } from '@/components/ui/scroll-motion';

function getPlatformIcon(platform: string) {
  switch (platform.toLowerCase()) {
    case 'spotify':
      return <FaSpotify className="h-3.5 w-3.5" aria-hidden="true" />;
    case 'apple':
      return <FaApple className="h-3.5 w-3.5" aria-hidden="true" />;
    case 'youtube':
      return <FaYoutube className="h-3.5 w-3.5" aria-hidden="true" />;
    case 'rss':
      return <FaRss className="h-3.5 w-3.5" aria-hidden="true" />;
    case 'overcast':
      return <FaPodcast className="h-3.5 w-3.5" aria-hidden="true" />;
    default:
      return <FaPodcast className="h-3.5 w-3.5" aria-hidden="true" />;
  }
}

export default async function HomePage() {
  const adapter = getContentAdapter();
  const [show, latestEpisode, featuredEpisodes, popularTopics] = await Promise.all([
    adapter.show.getShowInfo(),
    adapter.episodes.getLatestEpisode(),
    adapter.episodes.getFeaturedEpisodes(3),
    adapter.topics.getPopularTopics(6),
  ]);
  const momentEpisodes = [latestEpisode, ...featuredEpisodes].slice(0, 4);
  const proofEpisodes = [latestEpisode, ...featuredEpisodes]
    .filter((episode, index, list) => list.findIndex((item) => item.id === episode.id) === index)
    .slice(0, 3);

  return (
    <>
      <JsonLd
        data={[
          generateOrganizationSchema(),
          generatePodcastSeriesSchema(show),
        ]}
      />

      {/* Hero Section - Full viewport entrance */}
      <section className="relative min-h-[90vh] overflow-hidden bg-background text-foreground">
        {/* Background Image with overlay */}
        <div className="absolute inset-x-0 top-0 h-[600px] w-full mix-blend-screen">
          <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-background/0 to-background z-10" />
        </div>
        
        <div className="relative z-20 page-container page-container-browse flex min-h-[90vh] flex-col justify-center py-24">
          <HeroMotionScene>
            <div className="z-20 flex flex-col items-start justify-center pr-8">
              <span className="section-kicker mb-6 inline-flex border border-primary/20 bg-primary/5 px-4 py-1.5 rounded-full backdrop-blur-md">
                A Podcast for the Relentless
              </span>
              <h1 className="text-display max-w-4xl text-balance text-foreground tracking-tight drop-shadow-sm">
                Building Foundations<br className="hidden lg:block" /> That Last
              </h1>
              <p className="prose-reading mt-8 max-w-2xl text-lg opacity-90 text-muted-foreground mix-blend-luminosity">
                Weekly conversations with leaders, entrepreneurs, and thinkers who have built resilient careers, organizations, and lives.
              </p>

              <div className="mt-12 flex flex-wrap items-center gap-6">
                <MagneticButton
                  size="lg"
                  className="group h-14 gap-3 px-8 rounded-full shadow-xl shadow-primary/25 bg-primary overflow-hidden"
                  strength={30}
                  asChild
                >
                  <Link href={`/episodes/${latestEpisode.slug}`}>
                    <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background/20 text-primary-foreground backdrop-blur-md">
                      <Play className="h-3.5 w-3.5 translate-x-0.5 fill-current" />
                    </span>
                    <span className="relative z-10 font-semibold tracking-wide">Latest Episode</span>
                    <div className="absolute inset-0 -translate-x-[150%] bg-white/20 skew-x-[45deg] transition-transform duration-700 ease-in-out group-hover:translate-x-[150%]" />
                  </Link>
                </MagneticButton>
                
                <MagneticButton
                  variant="outline"
                  size="lg"
                  className="h-14 gap-2 rounded-full border-border/50 bg-background/50 backdrop-blur-md hover:bg-muted font-medium"
                  strength={15}
                  asChild
                >
                  <Link href="/episodes">
                    Browse Episodes
                    <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
                  </Link>
                </MagneticButton>
              </div>
            </div>

            <div className="hidden lg:block z-20 relative mix-blend-normal">
              <DepthHeroVisual
                imageUrl={latestEpisode.coverImageUrl}
                title={latestEpisode.title}
                episodeNumber={latestEpisode.episodeNumber}
              />
            </div>
          </HeroMotionScene>

          <div className="section-panel mt-16 flex gap-16 border border-border/40 bg-card/60 backdrop-blur-xl p-8 rounded-2xl shadow-2xl z-30 relative mx-4 lg:mx-0">
            <div>
              <p className="font-serif text-5xl font-medium tracking-tighter text-foreground drop-shadow-sm">{show.totalEpisodes}+</p>
              <p className="text-sm font-medium tracking-widest uppercase mt-2 text-muted-foreground/80">Episodes</p>
            </div>
            <div>
              <p className="font-serif text-5xl font-medium tracking-tighter text-foreground drop-shadow-sm">15K+</p>
              <p className="text-sm font-medium tracking-widest uppercase mt-2 text-muted-foreground/80">Subscribers</p>
            </div>
            <div>
              <p className="font-serif text-5xl font-medium tracking-tighter text-foreground drop-shadow-sm">4.9</p>
              <p className="text-sm font-medium tracking-widest uppercase mt-2 text-muted-foreground/80">Average Rating</p>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator with bouncing animation */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 mix-blend-screen opacity-60">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Scrape the surface</p>
          <div className="h-12 w-[1px] bg-gradient-to-b from-primary/50 to-transparent animate-pulse" />
        </div>
      </section>

      {/* Trust & Proof Strip */}
      <section className="relative overflow-hidden border-b border-border bg-secondary/25 py-20 md:py-24">
        {/* Subtle parallax background for depth */}
        <ParallaxSection className="absolute inset-0 z-0 opacity-30 mix-blend-overlay" speed={0.15}>
          <div className="absolute top-1/2 left-1/4 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-primary/20 blur-[100px]" />
        </ParallaxSection>
        
        <div className="relative z-10 page-container page-container-browse py-0">
          <RevealContainer className="mx-auto max-w-3xl text-center">
            <RevealItem>
              <p className="section-kicker">Listener Favorites</p>
            </RevealItem>
            <RevealItem>
              <h2 className="text-title mt-3 text-foreground">Conversations That Keep People Coming Back</h2>
            </RevealItem>
            <RevealItem>
              <p className="prose-reading mx-auto mt-4 max-w-2xl text-base md:text-base">
                Deep, practical episodes designed for clear thinking, better decisions, and lasting momentum.
              </p>
            </RevealItem>
          </RevealContainer>

          <RevealContainer className="mt-10 grid gap-5 lg:grid-cols-3">
            {proofEpisodes.map((episode, index) => {
              const host = episode.hosts[0] ?? show.hosts[index % show.hosts.length];
              const quote = episode.summary.split(/[.!?]/).find((part) => part.trim().length > 45)?.trim() || episode.summary;

              return (
                <RevealItem key={`proof-${episode.id}`}>
                  <Link
                    href={`/episodes/${episode.slug}`}
                    className="surface-soft group block p-6 transition-all duration-300 hover:-translate-y-1 hover:border-foreground/20 hover:bg-secondary/35 hover:shadow-xl hover:shadow-primary/5 target-push"
                  >
                    <p className="text-sm leading-relaxed text-muted-foreground">“{quote}.”</p>
                    <div className="mt-5 flex items-center gap-3 border-t border-border/70 pt-4">
                      <div className="relative h-10 w-10 overflow-hidden rounded-full border border-border bg-muted">
                        <Image
                          src={host.avatarUrl}
                          alt={host.name}
                          fill
                          className="object-cover"
                          sizes="40px"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-foreground group-hover:text-primary transition-colors">{host.name}</p>
                        <p className="truncate text-xs text-muted-foreground">From episode {episode.episodeNumber}</p>
                      </div>
                    </div>
                  </Link>
                </RevealItem>
              );
            })}
          </RevealContainer>

          <RevealContainer className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {show.platformLinks.slice(0, 5).map((link) => (
              <RevealItem key={`proof-platform-${link.platform}`}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-background/80 px-5 py-2.5 text-sm text-muted-foreground transition-all hover:scale-105 hover:border-primary/30 hover:text-foreground hover:shadow-lg backdrop-blur-sm"
                >
                  {getPlatformIcon(link.platform)}
                  {link.label}
                </a>
              </RevealItem>
            ))}
          </RevealContainer>
        </div>
      </section>

      {/* Featured Episode - Editorial layout */}
      <section className="relative overflow-hidden border-b border-border bg-background py-24 md:py-32">
        <div className="page-container page-container-browse py-0 relative z-10">
          <RevealContainer className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            {/* Image */}
            <RevealItem className="image-reveal relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted shadow-2xl shadow-primary/5 border border-border/50">
              <ParallaxSection speed={-0.1} className="h-full w-full">
                <Image
                  src={latestEpisode.coverImageUrl}
                  alt=""
                  fill
                  className="object-cover scale-110 transition-transform duration-[20s] hover:scale-100 ease-out"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </ParallaxSection>
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent pointer-events-none" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Link
                  href={`/episodes/${latestEpisode.slug}`}
                  className="group flex h-24 w-24 items-center justify-center rounded-full bg-background/60 text-foreground shadow-2xl backdrop-blur-md transition-all duration-500 hover:scale-110 hover:bg-primary hover:text-primary-foreground border border-white/10"
                  aria-label="Play episode"
                >
                  <Play className="h-8 w-8 translate-x-0.5 fill-current" />
                </Link>
              </div>
            </RevealItem>
            
            {/* Content */}
            <div className="flex flex-col justify-center">
              <RevealItem>
                <div className="flex items-center gap-3">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
                  </span>
                  <p className="section-kicker text-accent mb-0">Latest Episode</p>
                </div>
              </RevealItem>
              <RevealItem>
                <p className="mt-4 text-sm font-medium uppercase tracking-widest text-muted-foreground/80">
                  Episode {latestEpisode.episodeNumber}
                </p>
              </RevealItem>
              
              <RevealItem>
                <Link href={`/episodes/${latestEpisode.slug}`} className="inline-block mt-4 group">
                  <h2 className="text-display text-4xl sm:text-5xl lg:text-6xl text-balance text-foreground transition-colors group-hover:text-primary">
                    {latestEpisode.title}
                  </h2>
                </Link>
              </RevealItem>
              
              <RevealItem>
                <p className="prose-reading mt-6 max-w-2xl text-lg text-muted-foreground">
                  {latestEpisode.summary}
                </p>
              </RevealItem>
              
              <RevealItem>
                <div className="mt-8 flex flex-wrap gap-2">
                  {latestEpisode.topics.slice(0, 3).map((topic) => (
                    <TopicChip key={topic.id} topic={topic} size="sm" />
                  ))}
                </div>
              </RevealItem>
              
              <RevealItem className="mt-10">
                <MagneticButton className="group gap-2 rounded-full px-8 h-14" strength={20} asChild>
                  <Link href={`/episodes/${latestEpisode.slug}`}>
                    Listen to Episode
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </MagneticButton>
              </RevealItem>
            </div>
          </RevealContainer>
        </div>
      </section>

      {/* Recent Episodes - Clean grid */}
      <section className="bg-secondary/20 py-24 md:py-32 relative">
        <div className="page-container page-container-browse py-0">
          <RevealContainer>
            {/* Section header */}
            <div className="flex items-end justify-between">
              <RevealItem>
                <p className="section-kicker">Explore</p>
                <h2 className="text-title mt-2 text-foreground">Recent Episodes</h2>
              </RevealItem>
              <RevealItem>
                <Link 
                  href="/episodes"
                  className="group hidden items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-accent md:flex"
                >
                  View All
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </RevealItem>
            </div>
            
            {/* Episodes grid */}
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {featuredEpisodes.map((episode) => (
                <RevealItem key={episode.id}>
                  <EpisodeCard
                    episode={episode}
                    variant="default"
                    showTopics
                  />
                </RevealItem>
              ))}
            </div>
            
            {/* Mobile CTA */}
            <RevealItem className="mt-10 md:hidden">
              <Button variant="outline" className="w-full rounded-full" asChild>
                <Link href="/episodes">View all episodes</Link>
              </Button>
            </RevealItem>
          </RevealContainer>
        </div>
      </section>

      {/* Topics Section - Magazine style */}
      <section className="relative overflow-hidden border-y border-border bg-secondary/45 py-24 md:py-32">
        <ParallaxSection speed={0.1} className="absolute inset-0 z-0 opacity-20 mix-blend-overlay">
          <div className="absolute top-1/4 right-1/4 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-accent/20 blur-[120px]" />
        </ParallaxSection>
        
        <div className="page-container page-container-browse py-0 relative z-10">
          <RevealContainer className="mx-auto max-w-2xl text-center">
            <RevealItem>
              <p className="section-kicker">Discover</p>
              <h2 className="text-title mt-2 text-foreground">Explore by Topic</h2>
              <p className="mt-4 text-muted-foreground text-lg">
                Find episodes that match your interests and goals
              </p>
            </RevealItem>
          </RevealContainer>
          
          <RevealContainer className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {popularTopics.map((topic) => (
              <RevealItem key={topic.id}>
                <Link
                  href={`/topics/${topic.slug}`}
                  className="surface-soft group relative block overflow-hidden p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-foreground/20 hover:bg-secondary/25 hover:shadow-2xl hover:shadow-primary/5 md:p-8"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex min-w-0 flex-1 items-center gap-4">
                      <span
                        className="h-3 w-3 shrink-0 rounded-full shadow-[0_0_12px_rgba(var(--primary),0.8)]"
                        style={{ backgroundColor: topic.color || 'var(--primary)' }}
                        aria-hidden="true"
                      />
                      <h3 className="truncate font-serif text-2xl font-medium text-card-foreground transition-colors group-hover:text-primary">
                        {topic.name}
                      </h3>
                    </div>
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-background/90 text-muted-foreground shadow-sm transition-all group-hover:scale-110 group-hover:border-primary/50 group-hover:bg-primary/5 group-hover:text-primary backdrop-blur-md">
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>

                  <p className="mt-6 line-clamp-3 text-base leading-relaxed text-muted-foreground">
                    {topic.description}
                  </p>

                  <div className="mt-8 flex items-center justify-between border-t border-border/70 pt-5">
                    <span className="rounded-full bg-secondary px-4 py-1.5 text-xs font-bold tracking-widest uppercase text-secondary-foreground">
                      {topic.episodeCount} episodes
                    </span>
                    <span className="text-sm font-medium text-muted-foreground transition-colors group-hover:text-primary">
                      Explore topic
                    </span>
                  </div>
                </Link>
              </RevealItem>
            ))}
          </RevealContainer>
          
          <RevealContainer className="mt-16 text-center">
            <RevealItem>
              <Button variant="outline" size="lg" className="rounded-full px-8" asChild>
                <Link href="/topics">
                  View all topics
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </RevealItem>
          </RevealContainer>
        </div>
      </section>

      {/* Key Moments Reel - Value-first discovery */}
      <section className="border-b border-border bg-background py-24 md:py-32">
        <div className="page-container page-container-browse py-0">
          <RevealContainer>
            <div className="flex items-end justify-between gap-6">
              <RevealItem>
                <p className="section-kicker">Highlights</p>
                <h2 className="text-title mt-2 text-foreground">Key Moments</h2>
                <p className="prose-reading mt-3 max-w-2xl text-base md:text-lg text-muted-foreground">
                  Jump into powerful ideas from recent conversations.
                </p>
              </RevealItem>
              <RevealItem>
                <Button variant="outline" asChild className="hidden md:inline-flex rounded-full">
                  <Link href="/episodes">See full archive</Link>
                </Button>
              </RevealItem>
            </div>

            <div className="no-scrollbar mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4">
              {momentEpisodes.map((episode) => {
                const moment =
                  episode.transcript.find((block) => block.text.length > 70)?.text ||
                  episode.summary;

                return (
                  <RevealItem key={`moment-${episode.id}`} className="min-w-[85vw] sm:min-w-[400px]">
                    <MomentCard
                      slug={episode.slug}
                      title={episode.title}
                      episodeNumber={episode.episodeNumber}
                      moment={moment}
                    />
                  </RevealItem>
                );
              })}
            </div>
          </RevealContainer>
        </div>
      </section>

      {/* Subscribe Section - Horizontal marquee style */}
      <section className="overflow-hidden border-b border-border bg-secondary/40 py-16">
        <div className="platform-marquee-wrapper">
          <div className="platform-marquee-track">
            {[...Array(4)].flatMap((_, arrayIndex) => 
              show.platformLinks.map((link, i) => (
                <a
                  key={`track-a-${arrayIndex}-${link.platform}-${i}`}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="platform-pill text-label inline-flex items-center gap-3 whitespace-nowrap rounded-full border border-border bg-background/70 px-4 py-2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <span className="platform-icon-ring inline-flex h-6 w-6 items-center justify-center rounded-full border border-border bg-background text-foreground">
                    {getPlatformIcon(link.platform)}
                  </span>
                  {link.label}
                  <span className="audio-bars" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </span>
                </a>
              ))
            )}
          </div>
          <div className="platform-marquee-track" aria-hidden="true">
            {[...Array(4)].flatMap((_, arrayIndex) => 
              show.platformLinks.map((link, i) => (
                <a
                  key={`track-b-${arrayIndex}-${link.platform}-${i}`}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="platform-pill text-label inline-flex items-center gap-3 whitespace-nowrap rounded-full border border-border bg-background/70 px-4 py-2 text-muted-foreground transition-colors hover:text-foreground"
                  tabIndex={-1}
                >
                  <span className="platform-icon-ring inline-flex h-6 w-6 items-center justify-center rounded-full border border-border bg-background text-foreground">
                    {getPlatformIcon(link.platform)}
                  </span>
                  {link.label}
                  <span className="audio-bars" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </span>
                </a>
              ))
            )}
          </div>
        </div>
      </section>

      {/* About Section - Split layout */}
      <section className="bg-secondary/20 py-24 md:py-32">
        <div className="page-container page-container-browse py-0">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* Content */}
            <div className="order-2 lg:order-1">
              <p className="section-kicker">About the Show</p>
              <h2 className="text-headline mt-4 text-foreground">
                Conversations<br />for the Curious
              </h2>
              <p className="prose-reading mt-6">
                Unshakable Base brings you weekly conversations with leaders, entrepreneurs, and thinkers who have built resilient careers, organizations, and lives.
              </p>
              <p className="prose-reading mt-4 text-base md:text-base">
                Each episode dives deep into the principles, practices, and mindsets that help people thrive in an uncertain world. Whether you&apos;re building a company, growing a team, or navigating your own career, you&apos;ll find actionable insights and inspiration.
              </p>
              <Button className="mt-8" asChild>
                <Link href="/about">
                  Meet the Hosts
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            {/* Hosts grid */}
            <div className="order-1 grid gap-6 sm:grid-cols-2 lg:order-2">
              {show.hosts.map((host, index) => (
                <div 
                  key={host.id} 
                  className={`hover-lift rounded-sm border border-border bg-card p-6 ${index === 1 ? 'sm:translate-y-8' : ''}`}
                >
                  <div className="relative h-14 w-14 overflow-hidden rounded-full border border-border bg-secondary/30">
                    <Image
                      src={host.avatarUrl}
                      alt={host.name}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                  <h3 className="mt-4 font-serif text-lg font-medium text-card-foreground">
                    {host.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{host.role}</p>
                  <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">
                    {host.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="relative overflow-hidden bg-secondary/50 py-24 text-foreground md:py-32">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>
        
        <div className="page-container relative max-w-3xl py-0 text-center">
          <p className="section-kicker">Stay Connected</p>
          <h2 className="text-headline mt-4 text-foreground">
            Never Miss an Episode
          </h2>
          <p className="prose-reading mx-auto mt-6 max-w-xl text-base md:text-lg">
            Get our weekly digest with episode summaries, key takeaways, and exclusive content delivered straight to your inbox.
          </p>
          <div className="mx-auto mt-10 max-w-md">
            <NewsletterCapture 
              variant="compact" 
              source="homepage"
              buttonText="Subscribe"
              placeholderText="Enter your email"
            />
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Join 15,000+ subscribers. Unsubscribe anytime.
          </p>
        </div>
      </section>
    </>
  );
}
