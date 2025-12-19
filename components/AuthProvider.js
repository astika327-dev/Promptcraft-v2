'use client';

import { SessionProvider, useSession, signOut as nextAuthSignOut } from 'next-auth/react';

export const useAuth = () => {
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  const user = session?.user ?? null;
  
  return {
    user,
    session,
    loading,
    signOut: () => nextAuthSignOut({ callbackUrl: '/' }),
  };
};

export default function AuthProvider({ children }) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}
