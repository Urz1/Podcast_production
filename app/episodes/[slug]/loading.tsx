import { Skeleton } from '@/components/ui/skeleton';

export default function EpisodeLoading() {
  return (
    <div className="pb-16">
      {/* Hero skeleton */}
      <div className="border-b border-border bg-secondary/30 py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-5 lg:gap-12">
            <div className="lg:col-span-2">
              <Skeleton className="aspect-square w-full rounded-lg" />
            </div>
            <div className="flex flex-col justify-center space-y-4 lg:col-span-3">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-12 w-full max-w-lg" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-3/4" />
              <div className="flex gap-2">
                <Skeleton className="h-8 w-24 rounded-full" />
                <Skeleton className="h-8 w-24 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid gap-12 py-12 lg:grid-cols-3 lg:gap-16">
          <div className="space-y-8 lg:col-span-2">
            <Skeleton className="h-24 w-full rounded-lg" />
            <div className="space-y-3">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
          <div className="space-y-4">
            <Skeleton className="h-48 w-full rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
