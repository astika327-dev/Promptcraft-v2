// app/marketplace/page.jsx
'use client'
import Link from 'next/link';
import TemplateList from '@/components/TemplateList';
import { useSession } from 'next-auth/react';

export default function MarketplacePage() {
  const { data: session } = useSession();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center py-6 border-b border-gray-200">
          <h1 className="text-4xl font-bold text-gray-800">
            Template Marketplace
          </h1>
          <nav className="flex items-center space-x-4">
            {session ? (
              <>
                <span className="text-gray-600">Welcome, {session.user.email}</span>
                <Link href="/api/auth/signout" className="text-gray-600 hover:text-gray-800">
                  Sign Out
                </Link>
                <Link href="/marketplace/my-library" className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg">
                  My Library
                </Link>
                <Link href="/marketplace/create" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
                  Create Template
                </Link>
              </>
            ) : (
              <Link href="/auth/signin" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
                Sign In
              </Link>
            )}
          </nav>
        </header>

        <main className="mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Explore Templates</h2>
          <TemplateList />
        </main>
      </div>
    </div>
  );
}
