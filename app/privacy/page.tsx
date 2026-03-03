import type { Metadata } from 'next';
import { generateBaseMetadata } from '@/lib/seo/metadata';
import { PageContainer, PageHeader } from '@/components/layout/page-shell';

export const metadata: Metadata = generateBaseMetadata({
  title: 'Privacy Policy',
  description: 'Privacy policy for Unshakable Base podcast. Learn how we collect, use, and protect your personal information.',
  path: '/privacy',
});

export default function PrivacyPage() {
  return (
    <PageContainer width="content">
      <PageHeader
        title="Privacy Policy"
        description="Last updated: March 15, 2024"
      />

      <div className="prose prose-sm max-w-none text-muted-foreground prose-headings:text-foreground prose-a:text-primary prose-strong:text-foreground">
        <section>
          <h2>Introduction</h2>
          <p>
            Unshakable Base ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
          </p>
        </section>

        <section>
          <h2>Information We Collect</h2>
          <h3>Information You Provide</h3>
          <ul>
            <li>Email address when subscribing to our newsletter</li>
            <li>Contact information when reaching out through our contact form</li>
            <li>Any other information you choose to provide</li>
          </ul>

          <h3>Information Automatically Collected</h3>
          <ul>
            <li>Browser type and version</li>
            <li>Device type and operating system</li>
            <li>Pages visited and time spent on pages</li>
            <li>Referring website</li>
            <li>IP address (anonymized)</li>
          </ul>
        </section>

        <section>
          <h2>How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Send you our newsletter and updates (with your consent)</li>
            <li>Respond to your inquiries and provide customer support</li>
            <li>Analyze website usage to improve our content and services</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section>
          <h2>Sharing Your Information</h2>
          <p>
            We do not sell, trade, or rent your personal information to third parties. We may share information with:
          </p>
          <ul>
            <li>Service providers who assist in operating our website (e.g., email service providers, analytics tools)</li>
            <li>Legal authorities when required by law</li>
          </ul>
        </section>

        <section>
          <h2>Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section>
          <h2>Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Opt out of marketing communications</li>
            <li>Withdraw consent at any time</li>
          </ul>
        </section>

        <section>
          <h2>Cookies</h2>
          <p>
            We use cookies and similar tracking technologies to enhance your experience on our website. You can control cookie preferences through your browser settings.
          </p>
        </section>

        <section>
          <h2>Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
          </p>
        </section>

        <section>
          <h2>Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us at{' '}
            <a className="link-inline" href="mailto:privacy@unshakablebase.com">privacy@unshakablebase.com</a>.
          </p>
        </section>
      </div>
    </PageContainer>
  );
}
