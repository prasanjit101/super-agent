import {
  AudioWaveform,
  Command,
  SquareTerminal,
  Bot,
  BookOpen,
  Settings2,
  Frame,
  PieChart,
  MapPin,
  GalleryVerticalEndIcon,
  LucideIcon,
  LayoutDashboard,
  ShoppingBag,
  Brain,
  BookText,
  Send,
  Wrench,
} from 'lucide-react';
import { PropsWithChildren } from 'react';
import { DialogProps } from '@radix-ui/react-dialog';

export interface SidebarCollapsibleItems {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items: string[];
}

export interface SidebarItemDto {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  workspaces: {
    name: string;
    logo: LucideIcon;
    plan: string;
  }[];
  base?: {
    name: string;
    url: string;
    icon: LucideIcon;
  }[];
}

export const sideNavItems: SidebarItemDto = {
  user: {
    name: 'user',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  workspaces: [
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEndIcon,
      plan: 'Enterprise',
    },
  ],
  base: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      name: 'Browser Agents',
      url: '/browser-agents',
      icon: Bot,
    },
  ],
};

export const sidebarFooterItems: SidebarItemDto['base'] = [];

export interface SidebarComponentItems {
  name: string;
  icon: LucideIcon;
  Component: React.ComponentType<PropsWithChildren<DialogProps>>;
  soon?: boolean;
}

export const sideNavComponents: SidebarComponentItems[] = [
  // {
  // 	name: 'AI models',
  // 	Component: browserAgentModal,
  // 	icon: Brain,
  // },
];
