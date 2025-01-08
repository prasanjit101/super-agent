'use client';
import { BrowserAgent } from '@/server/db/schema';
import BrowserAgentModal from './BrowserAgentModal';
import { Card, CardContent, CardFooter, CardTitle } from '../ui/card';
import { trpc } from '@/trpc/react';
import Link from 'next/link';
import { buttonVariants } from '../ui/button';
import { SquareArrowOutUpRight } from 'lucide-react';

export default function BrowserAgentList({
  browserAgents,
}: {
  browserAgents: BrowserAgent[];
}) {
  const { data: b } = trpc.browserAgent.list.useQuery(undefined, {
    initialData: browserAgents,
    refetchOnMount: false,
  });

  if (b.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="grid grid-cols-4 gap-4">
      {b.map((browserAgent) => (
        <BrowserAgentCard browserAgent={browserAgent} key={browserAgent.id} />
      ))}
    </div>
  );
}

const BrowserAgentCard = ({ browserAgent }: { browserAgent: BrowserAgent }) => {
  return (
    <Card className="col-span-1 my-2 py-5 px-7 rounded-md">
      <div className="space-y-2 h-28">
        <p className="w-full font-semibold">{browserAgent.title}</p>
        <p className="line-clamp-4 text-muted-foreground">
          {browserAgent.description}
        </p>
      </div>
      <div className="flex space-x-2 mt-4">
        <BrowserAgentModal browserAgent={browserAgent} />
        <Link
          href={`/browser-agents/${browserAgent.id}`}
          className={buttonVariants({ size: 'sm' })}
        >
          Open
          <SquareArrowOutUpRight />
        </Link>
      </div>
    </Card>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No browsers
      </h3>
      <p className="mt-1 text-sm">Get started by creating a new browser.</p>
      <div className="mt-6">
        <BrowserAgentModal emptyState={true} />
      </div>
    </div>
  );
};
