import type { Metadata } from 'next';
import { generateBaseMetadata } from '@/lib/seo/metadata';
import { PageContainer, PageHeader, PageSection, SectionHeading } from '@/components/layout/page-shell';
import { ContactForm } from './contact-form';
import { Mail, MessageSquare, Mic } from 'lucide-react';

export const metadata: Metadata = generateBaseMetadata({
  title: 'Contact',
  description: 'Get in touch with the Unshakable Base team. We\'d love to hear from you about sponsorships, guest appearances, or general inquiries.',
  path: '/contact',
});

const contactOptions = [
  {
    icon: Mic,
    title: 'Guest Inquiries',
    description: 'Interested in being a guest on the show? We\'re always looking for inspiring stories.',
    email: 'guests@unshakablebase.com',
  },
  {
    icon: MessageSquare,
    title: 'Sponsorships',
    description: 'Partner with us to reach an engaged audience of leaders and entrepreneurs.',
    email: 'sponsors@unshakablebase.com',
  },
  {
    icon: Mail,
    title: 'General Inquiries',
    description: 'Questions, feedback, or just want to say hi? We\'d love to hear from you.',
    email: 'hello@unshakablebase.com',
  },
];

export default function ContactPage() {
  return (
    <PageContainer>
      <PageHeader
        align="center"
        title="Get in Touch"
        description="We'd love to hear from you. Whether you have a question, feedback, or want to collaborate, reach out and we'll get back to you soon."
        className="mx-auto max-w-2xl"
      />

      <PageSection className="grid gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading
            title="Send us a message"
            description="Fill out the form below and we'll respond within 48 hours."
          />
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>

        <div>
          <SectionHeading title="Other ways to reach us" description="Prefer email? Reach out directly to the appropriate team." />
          <div className="mt-6 space-y-6">
            {contactOptions.map((option) => (
              <article
                key={option.title}
                className="surface-soft p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <option.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-card-foreground">{option.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{option.description}</p>
                    <a
                      href={`mailto:${option.email}`}
                      className="link-inline mt-2 inline-block text-sm font-medium"
                    >
                      {option.email}
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </PageSection>
    </PageContainer>
  );
}
