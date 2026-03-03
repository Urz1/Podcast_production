import type { Metadata } from 'next';
import Link from 'next/link';
import { generateBaseMetadata } from '@/lib/seo/metadata';
import { getContentAdapter } from '@/lib/adapters';
import { CTACluster } from '@/components/podcast/cta-cluster';
import { Button } from '@/components/ui/button';
import { PageContainer, PageHeader, PageSection, SectionHeading } from '@/components/layout/page-shell';
import { ArrowRight, Headphones, Users } from 'lucide-react';

export const metadata: Metadata = generateBaseMetadata({
  title: 'About',
  description: 'Learn about Unshakable Base podcast, meet the hosts, and discover our mission to help leaders and creators build resilient foundations.',
  path: '/about',
});

export default async function AboutPage() {
  const adapter = getContentAdapter();
  const show = await adapter.show.getShowInfo();

  return (
    <PageContainer>
      <PageHeader
        align="center"
        icon={<Headphones className="h-12 w-12 text-primary" />}
        title={`About ${show.name}`}
        description={show.description}
      />

      <PageSection className="surface-soft bg-secondary/50 p-8 md:p-12">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="section-title">Our Mission</h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            We believe that lasting success comes from building strong foundations. In a world of quick fixes and overnight success stories, we champion the slow, steady work of developing resilience, wisdom, and authentic leadership.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Each week, we bring you conversations with leaders, entrepreneurs, and thinkers who have built something meaningful—not through shortcuts, but through dedication to their craft and commitment to their values.
          </p>
        </div>
      </PageSection>

      <PageSection aria-labelledby="hosts-heading">
        <div className="text-center">
          <h2 id="hosts-heading" className="section-title">Meet Your Hosts</h2>
        </div>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {show.hosts.map((host) => (
            <article key={host.id} className="surface-soft p-8">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                <Users className="h-10 w-10 text-primary" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-card-foreground">{host.name}</h3>
              <p className="text-sm text-primary">{host.role}</p>
              <p className="mt-4 leading-relaxed text-muted-foreground">{host.bio}</p>
              {host.socialLinks && (
                <div className="mt-4 flex gap-4">
                  {host.socialLinks.twitter && (
                    <a
                      href={host.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-muted"
                    >
                      Twitter
                    </a>
                  )}
                  {host.socialLinks.linkedin && (
                    <a
                      href={host.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-muted"
                    >
                      LinkedIn
                    </a>
                  )}
                  {host.socialLinks.website && (
                    <a
                      href={host.socialLinks.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-muted"
                    >
                      Website
                    </a>
                  )}
                </div>
              )}
            </article>
          ))}
        </div>
      </PageSection>

      <PageSection className="surface-soft p-8 md:p-12">
        <div className="grid gap-8 text-center md:grid-cols-4">
          <div>
            <p className="text-4xl font-bold text-primary">{show.totalEpisodes}+</p>
            <p className="mt-1 text-muted-foreground">Episodes</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-primary">15K+</p>
            <p className="mt-1 text-muted-foreground">Subscribers</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-primary">500K+</p>
            <p className="mt-1 text-muted-foreground">Downloads</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-primary">4.9</p>
            <p className="mt-1 text-muted-foreground">Average Rating</p>
          </div>
        </div>
      </PageSection>

      <PageSection className="text-center">
        <SectionHeading
          title="Start Listening Today"
          description="Available on all major podcast platforms. Choose your favorite and subscribe to never miss an episode."
          align="center"
          className="mx-auto max-w-xl"
        />
        <div className="mt-8">
          <CTACluster
            platformLinks={show.platformLinks}
            variant="horizontal"
            buttonVariant="default"
            source="cta_cluster"
            className="justify-center"
          />
        </div>
      </PageSection>

      <PageSection className="rounded-lg bg-primary p-8 text-center text-primary-foreground md:p-12">
        <h2 className="text-2xl font-bold md:text-3xl">Ready to Build Your Foundation?</h2>
        <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">
          Start with our most popular episodes or explore topics that interest you.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button variant="secondary" size="lg" asChild>
            <Link href="/episodes">
              Browse Episodes
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="secondary" size="lg" asChild className="bg-primary-foreground/15 text-primary-foreground hover:bg-primary-foreground/25">
            <Link href="/topics">Explore Topics</Link>
          </Button>
        </div>
      </PageSection>
    </PageContainer>
  );
}
