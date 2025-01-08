'use client';

import * as React from 'react';
import { Blocks, Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Script } from '@/server/db/schema';
import Link from 'next/link';

export function ScriptsCombobox({ scripts }: { scripts: Script[] }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          size={'default'}
          className="w-18 h-14"
        >
          Generated Scripts
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search Scripts..." className="h-9" />
          <CommandList>
            <CommandEmpty>No script found.</CommandEmpty>
            <CommandGroup>
              {scripts.map((script) => (
                <CommandItem key={script.id} value={script.name}>
                  <Link
                    className="w-full"
                    href={`/script/${script.id}`}
                    target="_blank"
                  >
                    {script.name}
                  </Link>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
