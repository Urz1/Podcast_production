import type { Metadata } from 'next';
import { generateBaseMetadata } from '@/lib/seo/metadata';
import { PageContainer, PageHeader } from '@/components/layout/page-shell';

export const metadata: Metadata = generateBaseMetadata({
  title: 'Terms of Service',
  description: 'Terms of service for Unshakable Base podcast. Read our terms and conditions for using our website and services.',
  path: '/terms',
});

export default function TermsPage() {
  return (
    <PageContainer width="content">
      <PageHeader
        title="Terms of Service"
        description="Last updated: March 15, 2024"
      />

      <div className="prose prose-sm max-w-none text-muted-foreground prose-headings:text-foreground prose-a:text-primary prose-strong:text-foreground">
        <section>
          <h2>Acceptance of Terms</h2>
          <p>
            By accessing and using the Unshakable Base website and podcast services, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
          </p>
        </section>

        <section>
          <h2>Use of Services</h2>
          <p>You agree to use our services only for lawful purposes and in accordance with these Terms. You agree not to:</p>
          <ul>
            <li>Use our services in any way that violates applicable laws or regulations</li>
            <li>Attempt to gain unauthorized access to our systems</li>
            <li>Interfere with or disrupt our services</li>
            <li>Copy, distribute, or modify our content without permission</li>
            <li>Use automated systems to access our services without our consent</li>
          </ul>
        </section>

        <section>
          <h2>Intellectual Property</h2>
          <p>
            All content on this website, including podcast episodes, transcripts, graphics, and logos, is the property of Unshakable Base and is protected by copyright and other intellectual property laws.
          </p>
          <p>
            You may listen to our podcast episodes for personal, non-commercial use. Any other use requires our prior written consent.
          </p>
        </section>

        <section>
          <h2>User Content</h2>
          <p>
            If you submit content to us (such as feedback, comments, or suggestions), you grant us a non-exclusive, royalty-free license to use, modify, and distribute that content.
          </p>
        </section>

        <section>
          <h2>Disclaimer</h2>
          <p>
            Our podcast content is provided for informational and entertainment purposes only. The views expressed by guests are their own and do not necessarily reflect our views.
          </p>
          <p>
            We do not provide professional advice (legal, financial, medical, or otherwise). Always consult with qualified professionals for specific advice.
          </p>
        </section>

        <section>
          <h2>Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, Unshakable Base shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services.
          </p>
        </section>

        <section>
          <h2>External Links</h2>
          <p>
            Our website may contain links to third-party websites. We are not responsible for the content or practices of these websites and encourage you to review their terms and privacy policies.
          </p>
        </section>

        <section>
          <h2>Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. Changes will be effective when posted on this page. Your continued use of our services after changes constitutes acceptance of the modified Terms.
          </p>
        </section>

        <section>
          <h2>Termination</h2>
          <p>
            We may terminate or suspend your access to our services at any time, without prior notice, for any reason, including breach of these Terms.
          </p>
        </section>

        <section>
          <h2>Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the United States, without regard to conflict of law principles.
          </p>
        </section>

        <section>
          <h2>Contact Us</h2>
          <p>
            If you have questions about these Terms, please contact us at{' '}
            <a className="link-inline" href="mailto:legal@unshakablebase.com">legal@unshakablebase.com</a>.
          </p>
        </section>
      </div>
    </PageContainer>
  );
}
