'use client';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FaGoogle } from 'react-icons/fa';
import { signIn } from 'next-auth/react';

export function LoginForm({
  className,
  redirectUrl,
  ...props
}: React.ComponentPropsWithoutRef<'div'> & {
  redirectUrl?: string;
}) {
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">
            SuperAgent
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground">
            Login and be relieved! You are witnessing the agentic browser era!
          </p>
          <Button
            onClick={() =>
              signIn('google', { redirectTo: redirectUrl ?? '/dashboard' })
            }
            size={'lg'}
            className="w-full"
          >
            <FaGoogle />
            Login with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
