'use client';
import { Button } from '@/components/ui/button';

// Error boundaries must be Client Components

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.error(error);
  console.error({ digest: error.digest });
  return (
    <html>
      <body className="space-y-2">
        <h2>Oops! Something went wrong!</h2>
        <p className="text-xs text-muted-foreground">{error.message}</p>
        <Button onClick={() => reset()}>Try again</Button>
      </body>
    </html>
  );
}
