'use client';

import {
  Folder,
  Forward,
  MoreHorizontal,
  Trash2,
  type LucideIcon,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { SidebarComponentItems } from '@/config/nav';
import { Button } from '../ui/button';
import { Badge } from '@/components/ui/badge';

export function NavComponentsContainer({
  title,
  items,
}: {
  title: string;
  items: SidebarComponentItems[];
}) {
  const { isMobile } = useSidebar();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{title}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <item.Component>
                <Button
                  className="w-full flex items-center gap-2 p-2 justify-start text-sm font-normal"
                  size={'sm'}
                  disabled={!!item.soon}
                  variant={'ghost'}
                >
                  <item.icon />
                  <span className="group-data-[collapsible=icon]:hidden">
                    {item.name}
                    {item.soon && <Badge variant="secondary">soon</Badge>}
                  </span>
                </Button>
              </item.Component>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
