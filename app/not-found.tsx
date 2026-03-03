import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, Search, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
      <div className="mx-auto max-w-md">
        <p className="text-7xl font-bold text-primary">404</p>
        <h1 className="mt-4 text-2xl font-bold text-foreground md:text-3xl">
          Page not found
        </h1>
        <p className="mt-4 text-muted-foreground">
          Sorry, we couldn't find the page you're looking for. It may have been moved or doesn't exist.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Go home
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/episodes">
              <Search className="mr-2 h-4 w-4" />
              Browse episodes
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
