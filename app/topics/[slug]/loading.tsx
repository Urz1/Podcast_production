import { Skeleton } from '@/components/ui/skeleton';

export default function TopicLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <Skeleton className="mb-6 h-10 w-24" />
      
      <div className="mb-12 space-y-4">
        <Skeleton className="h-1 w-16" />
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-6 w-full max-w-2xl" />
        <Skeleton className="h-6 w-32" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="aspect-video w-full rounded-lg" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ))}
      </div>
    </div>
  );
}
