import { cookies } from 'next/headers';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { SessionProvider } from 'next-auth/react';
import { Feedback } from '@/components/feedback';
import { validateSession } from '@/server/auth';
import { AppSidebar } from '@/components/AppSidebar';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { GoBack } from '@/components/go-back';

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await validateSession({});

  return (
    <main>
      <SessionProvider>
        <SidebarProvider defaultOpen={false}>
          <AppSidebar session={session} />
          <SidebarInset>
            <header className="flex h-12 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <GoBack />
              </div>
            </header>
            <div className="p-4 overflow-y-auto w-full min-h-[60%]">
              {children}
            </div>
            {/* <Feedback teamId={"0fa930f9-720c-4b0a-b656-43f69f65fc50"} /> */}
          </SidebarInset>
        </SidebarProvider>
      </SessionProvider>
    </main>
  );
}
