'use client';

import { Button, buttonVariants } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Bot, Menu, MoveRight, X } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { ThemeSwitcher } from '../theme-switcher';
import { cn } from '@/lib/utils';
import { FaGithub } from 'react-icons/fa';

export interface Header1NavItems {
  title: string;
  href?: string;
  description: string;
  items?: {
    title: string;
    href: string;
    external?: boolean;
  }[];
  external?: boolean;
}

export const LandingNav = () => {
  const navigationItems: Header1NavItems[] = [
    {
      title: 'Solutions',
      description: 'Our other products and services',
      items: [
        {
          title: 'Gentic',
          href: 'https://gentic.byjit.com',
          external: true,
        },
      ],
    },
    {
      title: 'About',
      description: 'Learn more about us',
      items: [
        {
          title: 'About Me',
          href: 'https://www.byjit.com',
          external: true,
        },
      ],
    },
  ];

  const [isOpen, setOpen] = useState(false);
  return (
    <header className="fixed left-0 top-0 z-40 w-full bg-background">
      <div className="container relative mx-auto flex min-h-20 flex-row items-center gap-4">
        <div className="hidden flex-row items-center justify-start gap-2 lg:flex">
          <Link
            href="/"
            className="w-34 flex gap-2 font-semibold text-primary dark:text-primary"
          >
            <Bot />
            SuperAgent
          </Link>
          <NavigationMenu className="flex items-start justify-start">
            <NavigationMenuList className="flex justify-start flex-row">
              {navigationItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  {item.href ? (
                    <>
                      <NavigationMenuLink
                        href={item.href}
                        target={item?.external ? '_blank' : '_self'}
                      >
                        <Button variant="ghost">{item.title}</Button>
                      </NavigationMenuLink>
                    </>
                  ) : (
                    <>
                      <NavigationMenuTrigger className="text-sm font-medium">
                        {item.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="!w-[200px] p-4">
                        <div className="flex p-4 h-full flex-col justify-between">
                          <div className="flex flex-col">
                            <p className="text-base">{item.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {item.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex h-full flex-col justify-end text-sm">
                          {item.items?.map((subItem) => (
                            <NavigationMenuLink
                              href={subItem.href}
                              key={subItem.title}
                              target={item?.external ? '_blank' : '_self'}
                              className="flex flex-row items-center justify-between rounded px-4 py-2 hover:bg-muted"
                            >
                              <span>{subItem.title}</span>
                              <MoveRight className="h-4 w-4 text-muted-foreground" />
                            </NavigationMenuLink>
                          ))}
                        </div>
                      </NavigationMenuContent>
                    </>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex w-full justify-end gap-4">
          <ThemeSwitcher />
          <Link
            href={'https://github.com/prasanjit101/super-agent'}
            target="_blank"
            className={buttonVariants({ size: 'icon', variant: 'outline' })}
          >
            <FaGithub className="h-6 w-6" />
          </Link>
          <div className="hidden border-r md:inline"></div>
          <Link
            className={cn(buttonVariants({ variant: 'default' }))}
            href="/dashboard"
          >
            Access
          </Link>
        </div>
        <div className="flex w-12 shrink items-end justify-end lg:hidden">
          <Button variant="ghost" onClick={() => setOpen(!isOpen)}>
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          {isOpen && (
            <div className="container absolute right-0 top-20 flex w-full flex-col gap-8 border-t bg-background py-4 shadow-lg">
              {navigationItems.map((item) => (
                <div key={item.title}>
                  <div className="flex flex-col gap-2">
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="flex items-center justify-between"
                      >
                        <span className="text-lg">{item.title}</span>
                        <MoveRight className="h-4 w-4 stroke-1 text-muted-foreground" />
                      </Link>
                    ) : (
                      <p className="text-lg">{item.title}</p>
                    )}
                    {item.items
                      ? item.items.map((subItem) => (
                          <Link
                            key={subItem.title}
                            href={subItem.href}
                            className="flex items-center justify-between"
                          >
                            <span className="text-muted-foreground">
                              {subItem.title}
                            </span>
                            <MoveRight className="h-4 w-4 stroke-1" />
                          </Link>
                        ))
                      : null}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
