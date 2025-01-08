import Link from 'next/link';
import { auth } from '@/server/auth';
import { HydrateClient } from '@/trpc/server';
import { ThemeSwitcher } from '@/components/theme-switcher';
import ChatInterface from '@/components/sections/Chat';
import { AnimatedHero } from '@/components/sections/hero';
import { LandingNav } from '@/components/sections/nav';

export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex-1">
        <LandingNav />
        <AnimatedHero />
      </main>
    </HydrateClient>
  );
}
