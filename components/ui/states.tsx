'use client';

import { AlertCircle, Loader2, Search, Podcast } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LoadingStateProps {
  message?: string;
  className?: string;
}

export function LoadingState({ message = 'Loading...', className = '' }: LoadingStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center py-16 ${className}`} role="status" aria-live="polite">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="mt-4 text-muted-foreground">{message}</p>
      <span className="sr-only">{message}</span>
    </div>
  );
}

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title = 'Something went wrong',
  message = 'We encountered an error loading this content. Please try again.',
  onRetry,
  className = '',
}: ErrorStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center py-16 text-center ${className}`}
      role="alert"
    >
      <AlertCircle className="h-12 w-12 text-destructive" />
      <h2 className="mt-4 text-xl font-semibold text-foreground">{title}</h2>
      <p className="mt-2 max-w-md text-muted-foreground">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} className="mt-6">
          Try Again
        </Button>
      )}
    </div>
  );
}

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  message: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  className?: string;
}

export function EmptyState({
  icon,
  title,
  message,
  action,
  className = '',
}: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center py-16 text-center ${className}`}>
      {icon || <Podcast className="h-12 w-12 text-muted-foreground/50" />}
      <h2 className="mt-4 text-xl font-semibold text-foreground">{title}</h2>
      <p className="mt-2 max-w-md text-muted-foreground">{message}</p>
      {action && (
        action.href ? (
          <Button asChild className="mt-6">
            <a href={action.href}>{action.label}</a>
          </Button>
        ) : (
          <Button onClick={action.onClick} className="mt-6">
            {action.label}
          </Button>
        )
      )}
    </div>
  );
}

interface NoResultsStateProps {
  query?: string;
  onClear?: () => void;
  className?: string;
}

export function NoResultsState({ query, onClear, className = '' }: NoResultsStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center py-16 text-center ${className}`}>
      <Search className="h-12 w-12 text-muted-foreground/50" />
      <h2 className="mt-4 text-xl font-semibold text-foreground">No results found</h2>
      <p className="mt-2 max-w-md text-muted-foreground">
        {query
          ? `We couldn't find any results for "${query}". Try adjusting your search or filters.`
          : 'No content matches your current filters.'}
      </p>
      {onClear && (
        <Button variant="outline" onClick={onClear} className="mt-6">
          Clear filters
        </Button>
      )}
    </div>
  );
}
