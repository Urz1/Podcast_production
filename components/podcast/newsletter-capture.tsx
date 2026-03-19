'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAnalytics } from '@/lib/analytics/use-analytics';
import { CheckCircle2, AlertCircle, Loader2, ArrowRight } from 'lucide-react';

interface NewsletterCaptureProps {
  title?: string;
  description?: string;
  buttonText?: string;
  placeholderText?: string;
  variant?: 'default' | 'compact' | 'banner' | 'dark';
  source?: 'footer' | 'episode' | 'newsletter_page' | 'popup' | 'homepage';
  onSubmit?: (email: string) => Promise<{ success: boolean; message: string }>;
  className?: string;
}

export function NewsletterCapture({
  title = 'Get the Weekly Digest',
  description = 'Join 15,000+ leaders who receive our weekly insights.',
  buttonText = 'Subscribe',
  placeholderText = 'Enter your email',
  variant = 'default',
  source = 'footer',
  onSubmit,
  className,
}: NewsletterCaptureProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const { trackNewsletterSignup } = useAnalytics();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');

    try {
      let success = false;
      let responseMessage = '';

      if (onSubmit) {
        const result = await onSubmit(email);
        success = result.success;
        responseMessage = result.message;
      } else {
        const response = await fetch('/api/newsletter', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, source }),
        });

        const result = await response.json();
        success = response.ok && result.success;
        responseMessage = result.message || result.error || 'Subscription failed.';
      }

      setStatus(success ? 'success' : 'error');
      setMessage(responseMessage);
      trackNewsletterSignup(source, success);

      if (success) {
        setEmail('');
      }
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
      trackNewsletterSignup(source, false);
    }
  };

  // Compact variant - inline form
  if (variant === 'compact') {
    return (
      <form onSubmit={handleSubmit} className={cn('space-y-3', className)}>
        <div className="flex gap-2">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholderText}
            disabled={status === 'loading' || status === 'success'}
            className="flex-1 rounded-full border-border/50 bg-background/50 px-5"
            aria-label="Email address"
          />
          <Button 
            type="submit" 
            disabled={status === 'loading' || status === 'success'}
            className="rounded-full px-6"
          >
            {status === 'loading' ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <ArrowRight className="h-4 w-4" />
            )}
          </Button>
        </div>
        {message && (
          <p className={cn(
            'text-sm',
            status === 'success' ? 'text-accent' : 'text-destructive'
          )}>
            {message}
          </p>
        )}
      </form>
    );
  }

  // Dark variant - for dark backgrounds
  if (variant === 'dark') {
    return (
      <form onSubmit={handleSubmit} className={cn('space-y-3', className)}>
        <div className="flex gap-2">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholderText}
            disabled={status === 'loading' || status === 'success'}
            className="flex-1 rounded-full border-background/20 bg-background/10 px-5 text-background placeholder:text-background/50"
            aria-label="Email address"
          />
          <Button 
            type="submit" 
            disabled={status === 'loading' || status === 'success'}
            className="rounded-full bg-background px-6 text-foreground hover:bg-background/90"
          >
            {status === 'loading' ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <ArrowRight className="h-4 w-4" />
            )}
          </Button>
        </div>
        {message && (
          <p className={cn(
            'text-sm',
            status === 'success' ? 'text-background/80' : 'text-red-300'
          )}>
            {message}
          </p>
        )}
      </form>
    );
  }

  // Banner variant - full width section
  if (variant === 'banner') {
    return (
      <section className={cn('bg-foreground py-16 text-background md:py-24', className)}>
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-headline text-background">{title}</h2>
          <p className="mt-4 text-lg text-background/70">{description}</p>
          
          {status === 'success' ? (
            <div className="mt-8 flex items-center justify-center gap-2 text-background">
              <CheckCircle2 className="h-5 w-5" />
              <span>{message}</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8">
              <div className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={placeholderText}
                  disabled={status === 'loading'}
                  className="flex-1 rounded-full border-background/20 bg-background/10 px-6 text-background placeholder:text-background/50"
                  aria-label="Email address"
                />
                <Button
                  type="submit"
                  disabled={status === 'loading'}
                  className="rounded-full bg-background px-8 text-foreground hover:bg-background/90"
                >
                  {status === 'loading' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {buttonText}
                </Button>
              </div>
              {status === 'error' && (
                <p className="mt-4 flex items-center justify-center gap-1 text-sm text-red-300">
                  <AlertCircle className="h-4 w-4" />
                  {message}
                </p>
              )}
            </form>
          )}
        </div>
      </section>
    );
  }

  // Default variant - card style
  return (
    <div className={cn('surface-soft overflow-hidden bg-secondary/20 p-0', className)}>
      <div className="border-b border-border/70 bg-secondary/35 px-6 py-4">
        <p className="section-kicker">Newsletter</p>
        <h3 className="mt-2 font-serif text-xl font-medium text-card-foreground">{title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      </div>
      
      {status === 'success' ? (
        <div className="px-6 py-6">
          <div className="flex items-center gap-2 text-accent">
          <CheckCircle2 className="h-5 w-5" />
          <span className="text-sm">{message}</span>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 px-6 py-6">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholderText}
            disabled={status === 'loading'}
            className="rounded-md border-border/80 bg-background/85"
            aria-label="Email address"
          />
          <Button
            type="submit"
            className="w-full rounded-md"
            disabled={status === 'loading'}
          >
            {status === 'loading' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {buttonText}
          </Button>
          {status === 'error' && (
            <p className="flex items-center gap-1 text-sm text-destructive">
              <AlertCircle className="h-4 w-4" />
              {message}
            </p>
          )}
        </form>
      )}
    </div>
  );
}
