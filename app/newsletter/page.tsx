import type { Metadata } from 'next';
import { generateBaseMetadata } from '@/lib/seo/metadata';
import { NewsletterCapture } from '@/components/podcast/newsletter-capture';
import { PageContainer, PageHeader, PageSection, SectionHeading } from '@/components/layout/page-shell';
import { CheckCircle2, Mail, Sparkles, Calendar } from 'lucide-react';

export const metadata: Metadata = generateBaseMetadata({
  title: 'Newsletter',
  description: 'Subscribe to the Unshakable Base newsletter for weekly insights on leadership, entrepreneurship, and building resilient foundations.',
  path: '/newsletter',
});

const benefits = [
  {
    icon: Calendar,
    title: 'Weekly Digest',
    description: 'Get a summary of the latest episode with key takeaways and action items.',
  },
  {
    icon: Sparkles,
    title: 'Exclusive Content',
    description: 'Access bonus insights, behind-the-scenes content, and subscriber-only resources.',
  },
  {
    icon: Mail,
    title: 'Early Access',
    description: 'Be the first to know about new episodes, special guests, and upcoming events.',
  },
];

export default function NewsletterPage() {
  return (
    <PageContainer>
      <div className="mx-auto max-w-2xl text-center">
        <PageHeader
          align="center"
          icon={
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Mail className="h-8 w-8 text-primary" />
            </div>
          }
          title="Join the Newsletter"
          description="Join 15,000+ leaders who receive our weekly insights on building resilient careers and organizations."
        />

        <div className="mt-10">
          <NewsletterCapture
            variant="default"
            source="newsletter_page"
            title="Subscribe Now"
            description="No spam, unsubscribe anytime."
            buttonText="Subscribe"
          />
        </div>
      </div>

      <PageSection aria-labelledby="benefits-heading">
        <h2 id="benefits-heading" className="sr-only">Newsletter Benefits</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {benefits.map((benefit) => (
            <article
              key={benefit.title}
              className="surface-soft p-6 text-center"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <benefit.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 font-semibold text-card-foreground">{benefit.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{benefit.description}</p>
            </article>
          ))}
        </div>
      </PageSection>

      <PageSection className="mx-auto max-w-2xl rounded-lg bg-secondary/50 p-8">
        <SectionHeading title="What to Expect" />
        <ul className="mt-6 space-y-4">
          {[
            'Episode summaries with key insights and timestamps',
            'Curated resources and book recommendations',
            'Exclusive interviews and bonus content',
            'Community highlights and listener stories',
            'Early access to live events and Q&A sessions',
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <span className="text-muted-foreground">{item}</span>
            </li>
          ))}
        </ul>
      </PageSection>

      <p className="mt-12 text-center text-sm text-muted-foreground">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </PageContainer>
  );
}
