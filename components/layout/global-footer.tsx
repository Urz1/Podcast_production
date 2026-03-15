'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { NewsletterCapture } from '@/components/podcast/newsletter-capture';
import { ArrowUpRight } from 'lucide-react';
import type { PlatformLink } from '@/types/domain';
import { useAnalytics } from '@/lib/analytics/use-analytics';

const footerNavigation = {
  podcast: [
    { name: 'All Episodes', href: '/episodes' },
    { name: 'Topics', href: '/topics' },
    { name: 'About', href: '/about' },
    { name: 'Newsletter', href: '/newsletter' },
  ],
  support: [
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ],
};

interface GlobalFooterProps {
  platformLinks?: PlatformLink[];
  className?: string;
}

export function GlobalFooter({ platformLinks = [], className }: GlobalFooterProps) {
  const { trackSubscribeClick } = useAnalytics();

  const handleSubscribeClick = (platform: string) => {
    trackSubscribeClick(platform, 'footer');
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn('border-t border-border bg-secondary/40 text-foreground', className)} role="contentinfo">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-8">
          {/* Brand and newsletter - Takes more space */}
          <div className="lg:col-span-5">
            <Link
              href="/"
              className="group inline-flex items-center gap-3"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors group-hover:border-foreground/40">
                <span className="font-serif text-lg font-medium text-foreground">U</span>
              </span>
              <span className="font-serif text-lg font-medium text-foreground">
                Unshakable Base
              </span>
            </Link>
            <p className="mt-6 max-w-sm text-muted-foreground">
              Building foundations that last. Weekly conversations with leaders, entrepreneurs, and thinkers on resilience, growth, and impact.
            </p>

            {/* Newsletter signup */}
            <div className="mt-8 max-w-sm">
              <p className="text-label mb-4 text-muted-foreground">Stay Updated</p>
              <NewsletterCapture
                variant="compact"
                source="footer"
              />
            </div>
          </div>

          {/* Navigation columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7 lg:justify-items-end">
            {/* Podcast links */}
            <div>
              <h3 className="text-label text-muted-foreground">Podcast</h3>
              <ul className="mt-6 space-y-4" role="list">
                {footerNavigation.podcast.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support links */}
            <div>
              <h3 className="text-label text-muted-foreground">Support</h3>
              <ul className="mt-6 space-y-4" role="list">
                {footerNavigation.support.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Platform links */}
            {platformLinks.length > 0 && (
              <div>
                <h3 className="text-label text-muted-foreground">Listen On</h3>
                <ul className="mt-6 space-y-4" role="list">
                  {platformLinks.slice(0, 5).map((link) => (
                    <li key={link.platform}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => handleSubscribeClick(link.platform)}
                        className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                        <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Unshakable Base. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Made with care for the relentless.
          </p>
        </div>
      </div>
    </footer>
  );
}
