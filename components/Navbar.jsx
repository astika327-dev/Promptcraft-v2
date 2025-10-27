// components/Navbar.jsx
'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

export default function Navbar() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-background/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-primary">
              PromptCraft
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/" className="text-foreground/80 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
                Home
              </Link>
              <Link href="/marketplace" className="text-foreground/80 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
                Marketplace
              </Link>
              {status === 'authenticated' && (
                <Link href="/marketplace/my-library" className="text-foreground/80 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
                  My Library
                </Link>
              )}
            </div>
          </div>
          <div className="hidden md:block">
            {status === 'loading' ? (
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            ) : status === 'authenticated' ? (
              <Link href="/api/auth/signout" className="bg-muted hover:bg-muted/80 text-foreground font-bold py-2 px-4 rounded-lg text-sm">
                Sign Out
              </Link>
            ) : (
              <Link href="/auth/signin" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-2 px-4 rounded-lg text-sm">
                Sign In
              </Link>
            )}
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-muted inline-flex items-center justify-center p-2 rounded-md text-foreground/80 hover:text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-primary"
              aria-controls="mobile-menu"
              aria-expanded="false"
              data-testid="hamburger-button"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="text-foreground/80 hover:text-primary block px-3 py-2 rounded-md text-base font-medium">
              Home
            </Link>
            <Link href="/marketplace" className="text-foreground/80 hover:text-primary block px-3 py-2 rounded-md text-base font-medium">
              Marketplace
            </Link>
            {status === 'authenticated' && (
              <Link href="/marketplace/my-library" className="text-foreground/80 hover:text-primary block px-3 py-2 rounded-md text-base font-medium">
                My Library
              </Link>
            )}
            {status === 'loading' ? (
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto my-2"></div>
            ) : status === 'authenticated' ? (
              <Link href="/api/auth/signout" className="bg-muted hover:bg-muted/80 text-foreground font-bold block w-full text-left py-2 px-3 rounded-lg text-base">
                Sign Out
              </Link>
            ) : (
              <Link href="/auth/signin" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold block w-full text-left py-2 px-3 rounded-lg text-base">
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
