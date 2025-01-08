import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { auth, validateSession } from '@/server/auth';
import { ArrowRight, SquareArrowOutUpRight } from 'lucide-react';
import Link from 'next/link';

const DashboardPage = async () => {
  const session = await validateSession({});
  return (
    <>
      <div className="w-full">
        <p>Welcome, {session?.user?.name}!</p>
        <code>{session?.user?.email}</code>
      </div>
      <div className="mt-8 space-y-2">
        <p className="text-muted-foreground">
          Get started by creating a browser
        </p>
        <Link
          href={'/browser-agents'}
          className={cn(buttonVariants({ variant: 'default' }), 'items-left')}
        >
          here <SquareArrowOutUpRight className="w-4 h-4" />
        </Link>
      </div>
    </>
  );
};

export default DashboardPage;
