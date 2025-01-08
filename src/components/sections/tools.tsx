import { ArrowUpRight, Check, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '../ui/card';
import Link from 'next/link';
import { buttonVariants } from '../ui/button';

const tools: {
  title: string;
  url: string;
  imageUrl: string;
  description: string;
  badge?: 'New' | 'Try' | 'Free' | 'Coming soon' | 'Check-out' | 'For Fun';
  external?: boolean;
}[] = [
  {
    title: 'Gentic',
    url: 'https://gentic.byjit.com/',
    imageUrl: '/gentic-app.png',
    description: "Small businesses's very own Agentic AI platform",
    external: true,
    badge: 'New',
  },
  {
    title: 'Illustra',
    url: '/illustra',
    imageUrl: '/illustra-hero.png',
    description:
      'Generate illustrations with consistent style from a single illustration',
    badge: 'Coming soon',
  },
  {
    title: 'Lovescope',
    url: '/lovescope',
    imageUrl: '/astrologer.jpeg',
    description: 'Your 2025 Love Life (Roasted)',
    badge: 'For Fun',
  },
];

export const ToolsGrid = () => (
  <div id="tools" className="w-full py-20 lg:py-40">
    <div className="container mx-auto">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col items-start gap-4">
          <div>
            <Badge>Tools</Badge>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="font-regular max-w-xl text-left text-3xl tracking-tighter md:text-5xl">
              Free to use tools
            </h2>
            <p className="max-w-xl text-left text-lg leading-relaxed tracking-tight text-muted-foreground lg:max-w-lg">
              Use responsibly
            </p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {tools.map((tool, i) => (
            <Card
              key={i}
              className="relative transform transition-transform duration-200 hover:scale-105"
            >
              <CardContent>
                {tool.badge && (
                  <Badge
                    variant={'destructive'}
                    className="absolute right-2 top-2"
                  >
                    {tool.badge}
                  </Badge>
                )}
                <div className="flex items-center justify-center p-3">
                  <img
                    src={tool.imageUrl}
                    alt={tool.title}
                    className="h-48 object-scale-down"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-semibold">{tool.title}</h3>
                  <p className="min-h-12 text-sm">{tool.description}</p>
                </div>
                <div className="mt-3">
                  <Link
                    href={tool.url}
                    target={tool.external ? '_blank' : '_self'}
                    className={cn(
                      buttonVariants({ size: 'sm', variant: 'default' }),
                      'w-24',
                    )}
                  >
                    Use now
                    <ArrowUpRight />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  </div>
);
