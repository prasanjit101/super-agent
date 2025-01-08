import NextAuth from 'next-auth';
import { cache } from 'react';

import { authConfig } from './config';
import { redirect } from 'next/navigation';

const { auth: uncachedAuth, handlers, signIn, signOut } = NextAuth(authConfig);

const auth = cache(uncachedAuth);

const validateSession = async ({ redirectTo }: { redirectTo?: string }) => {
  const session = await auth();
  if (!session?.user) redirect(redirectTo ? redirectTo : '/login');
  else return session;
};

export { auth, handlers, signIn, signOut, validateSession };
