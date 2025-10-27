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
        <header className="flex justify-between items-center py-6 border-b border-border">
          <h1 className="text-4xl font-bold text-primary">
            Template Marketplace
          </h1>
          <nav className="flex items-center space-x-4">
            {session ? (
              <>
                <span className="text-muted-foreground">Welcome, {session.user.email}</span>
                <Link href="/api/auth/signout" className="text-muted-foreground hover:text-primary">
                  Sign Out
                </Link>
                <Link href="/marketplace/my-library" className="bg-muted hover:bg-muted/80 text-foreground font-bold py-2 px-4 rounded-lg">
                  My Library
                </Link>
                <Link href="/marketplace/create" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-2 px-4 rounded-lg">
                  Create Template
                </Link>
              </>
            ) : (
              <Link href="/auth/signin" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-2 px-4 rounded-lg">
                Sign In
              </Link>
            )}
          </nav>
        </header>

        <main className="mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-secondary">Explore Templates</h2>
          <TemplateList />
        </main>
      </div>
    </div>
  );
}
