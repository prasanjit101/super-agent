'use client';
import { useEffect, useMemo, useState } from 'react';

import { motion } from 'framer-motion';

import { MoveRight, PhoneCall } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Badge } from '../ui/badge';

export const AnimatedHero = () => {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => [
      'is AI-powered',
      'fully automate tasks',
      'needs no set-up',
      'browses the web',
      'is secure',
      'always accessible',
    ],
    [],
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className="w-full">
      <div className="container mx-auto">
        <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
          <div>
            <Badge variant="secondary">Coming Soon!</Badge>
          </div>
          <div className="flex gap-4 flex-col">
            <h1 className="text-4xl md:text-6xl max-w-2xl tracking-tighter text-center font-regular">
              <span className="text-spektr-cyan-50">Browser in cloud that</span>
              <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-semibold text-primary"
                    initial={{ opacity: 0, y: '-100' }}
                    transition={{ type: 'spring', stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? {
                            y: 0,
                            opacity: 1,
                          }
                        : {
                            y: titleNumber > index ? -150 : 150,
                            opacity: 0,
                          }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>

            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">
              Superagent provides agentic browsers in the cloud. Create an
              account, spin up a browser, and ask them to collect data, fill
              forms, surf the web and perform actions.
            </p>
          </div>
          <div className="flex flex-row gap-3">
            <Link
              href={'#app'}
              target="_blank"
              className={cn(
                'gap-4',
                buttonVariants({ size: 'lg', variant: 'outline' }),
              )}
            >
              Share your thoughts <PhoneCall className="w-4 h-4" />
            </Link>
            <Link
              href={'/dashboard'}
              className={cn('gap-4', buttonVariants({ size: 'lg' }))}
            >
              Access here <MoveRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
