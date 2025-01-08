'use client';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  HeartHandshake,
  PiggyBank,
  MessageCircleHeart,
  HandHelping,
  LogIn,
  Sparkle,
  Settings,
  ShoppingBag,
  Bot,
} from 'lucide-react';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { Session } from 'next-auth';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { NavBase } from '@/components/nav/nav-base';
import { NavFooter } from '@/components/nav/nav-footer';
import { NavMain } from '@/components/nav/nav-main';
import {
  SidebarCollapsibleItems,
  sideNavComponents,
  sideNavItems,
} from '@/config/nav';
import { NavComponentsContainer } from '@/components/nav/nav-component-box';
import { useSidebar } from "@/components/ui/sidebar"
import { cn } from '@/lib/utils';

export const AppSidebar = ({
  session,
  ...props
}: React.ComponentProps<typeof Sidebar> & { session?: Session }) => {
  const mainCollapsibleItems: SidebarCollapsibleItems[] = [];

  const {
    state,
    open,
  } = useSidebar()

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-1">
          {/* <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
						<Image
							src={'/logo.png'}
							width={30}
							height={30}
							alt={'Gentic Workspace'}
						/>
					</div> */}
          <div className="p-2 text-primary flex items-center gap-2 font-semibold">
            <Bot />
            <span className={cn((state === 'collapsed' ? 'hidden' : ''))}>SuperAgent</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {sideNavItems.base && (
          <NavBase title="Platform" items={sideNavItems.base} />
        )}
        <NavMain title="" items={mainCollapsibleItems} />
        {/* <NavComponentsContainer title="Configurations" items={sideNavComponents} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavFooter
          user={{
            name: session?.user?.name ?? 'User',
            email: session?.user?.email ?? '',
            avatar: session?.user?.image ?? '#',
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};
