'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu, X, ChevronDown } from 'lucide-react';
import type { PlatformLink } from '@/types/domain';
import { useAnalytics } from '@/lib/analytics/use-analytics';
import { ThemeToggle } from './theme-toggle';

const navigation = [
  { name: 'Episodes', href: '/episodes' },
  { name: 'Topics', href: '/topics' },
  { name: 'About', href: '/about' },
  { name: 'Newsletter', href: '/newsletter' },
];

interface GlobalHeaderProps {
  platformLinks?: PlatformLink[];
  className?: string;
}

export function GlobalHeader({ platformLinks = [], className }: GlobalHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { trackSubscribeClick } = useAnalytics();

  const handleSubscribeClick = (platform: string) => {
    trackSubscribeClick(platform, 'header');
  };

  const textColor = 'text-foreground';
  const mutedColor = 'text-muted-foreground';

  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur-md transition-all duration-300',
      className
    )}>
      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="skip-to-content"
      >
        Skip to content
      </a>

      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8" aria-label="Main navigation">
        {/* Logo */}
        <Link
          href="/"
          className={cn(
            'group flex items-center gap-3 transition-colors',
            textColor
          )}
        >
          <span className={cn(
            'flex h-10 w-10 items-center justify-center rounded-full border transition-colors',
            'border-border group-hover:border-foreground/50'
          )}>
            <span className="font-serif text-lg font-medium">U</span>
          </span>
          <span className="hidden font-serif text-lg font-medium sm:block">
            Unshakable Base
          </span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'relative px-4 py-2 text-sm font-medium transition-colors',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
                  isActive 
                    ? textColor
                    : cn(mutedColor, 'hover:' + textColor)
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.name}
                {isActive && (
                  <span className={cn(
                    'absolute bottom-0 left-4 right-4 h-0.5',
                    'bg-foreground'
                  )} />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right side actions - Desktop */}
        <div className="hidden lg:flex lg:items-center lg:gap-4">
          <ThemeToggle />
          
          {platformLinks.length > 0 ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="default" className="gap-2">
                  Subscribe
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {platformLinks.slice(0, 5).map((link) => (
                  <DropdownMenuItem key={link.platform} asChild>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => handleSubscribeClick(link.platform)}
                    >
                      {link.label}
                    </a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="default" asChild>
              <Link href="/newsletter">Subscribe</Link>
            </Button>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 top-20 z-40 overflow-y-auto bg-background lg:hidden"
        >
          <div className="flex h-full flex-col px-6 py-8">
            <div className="flex-1 space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'block py-4 font-serif text-2xl font-medium transition-colors',
                      isActive 
                        ? 'text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>

            {platformLinks.length > 0 && (
              <div className="border-t border-border pt-8">
                <p className="text-label mb-4 text-muted-foreground">
                  Listen On
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {platformLinks.slice(0, 4).map((link) => (
                    <Button
                      key={link.platform}
                      variant="outline"
                      asChild
                      onClick={() => handleSubscribeClick(link.platform)}
                    >
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.label}
                      </a>
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
