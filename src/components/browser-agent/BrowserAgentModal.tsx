'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import BrowserAgentForm from './BrowserAgentForm';
import { BrowserAgent } from '@/server/db/schema';
import { cn } from '@/lib/utils';

export default function BrowserAgentModal({
  browserAgent,
  emptyState,
}: {
  browserAgent?: BrowserAgent;
  emptyState?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const editing = !!browserAgent?.id;
  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        {emptyState ? (
          <Button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-1"
            >
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
            New Browser
          </Button>
        ) : (
          <Button
            variant={editing ? 'outline' : 'default'}
            className={cn(!editing && 'hidden')}
            size={'sm'}
          >
            {editing ? 'Edit' : 'Add new +'}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="px-5 pt-5">
          <DialogTitle>{editing ? 'Edit' : 'Create'} browser agent</DialogTitle>
        </DialogHeader>
        <div className="px-5 pb-5">
          <BrowserAgentForm
            closeModal={closeModal}
            browserAgent={browserAgent}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
