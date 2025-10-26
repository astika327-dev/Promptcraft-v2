// app/marketplace/page.jsx
'use client'
import Link from 'next/link';
import TemplateList from '@/components/TemplateList';
import { useSession } from 'next-auth/react';

export default function MarketplacePage() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-grid-pattern text-gray-200 flex flex-col items-center p-4 font-sans">
      <div className="w-full max-w-6xl">
        <header className="flex justify-between items-center py-6">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-cyan-400">
            Template Marketplace
          </h1>
          <nav className="flex items-center space-x-4">
            {session ? (
              <>
                <span>Welcome, {session.user.email}</span>
                <Link href="/api/auth/signout" className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg">
                  Sign Out
                </Link>
                <Link href="/marketplace/my-library" className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-lg">
                  My Library
                </Link>
                <Link href="/marketplace/create" className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-2 px-4 rounded-lg">
                  Create Template
                </Link>
              </>
            ) : (
              <Link href="/auth/signin" className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-2 px-4 rounded-lg">
                Sign In
              </Link>
            )}
          </nav>
        </header>

        <main className="mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-cyan-400">Explore Templates</h2>
          <TemplateList />
        </main>
      </div>
    </div>
  );
}
