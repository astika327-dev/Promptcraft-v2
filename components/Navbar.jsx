// components/Navbar.jsx
'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex items-center justify-between h-16">
        <div className="flex-shrink-0">
          <Link href="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-cyan-400">
            PromptCraft
          </Link>
        </div>
        <div className="hidden md:block">
          <div className="ml-10 flex items-baseline space-x-4">
            <Link href="/" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Home
            </Link>
            <Link href="/marketplace" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Marketplace
            </Link>
             {status === 'authenticated' && (
               <Link href="/marketplace/my-library" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                My Library
               </Link>
             )}
          </div>
        </div>
        <div className="hidden md:block">
           {status === 'loading' ? (
            <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
           ): status === 'authenticated' ? (
            <Link href="/api/auth/signout" className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg text-sm">
              Sign Out
            </Link>
          ) : (
            <Link href="/auth/signin" className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-2 px-4 rounded-lg text-sm">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
