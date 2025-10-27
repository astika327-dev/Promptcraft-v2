// components/Navbar.jsx
'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

export default function Navbar() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-gray-800">
              PromptCraft
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/" className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">
                Home
              </Link>
              <Link href="/marketplace" className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">
                Marketplace
              </Link>
              {status === 'authenticated' && (
                <Link href="/marketplace/my-library" className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">
                  My Library
                </Link>
              )}
            </div>
          </div>
          <div className="hidden md:block">
            {status === 'loading' ? (
              <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            ) : status === 'authenticated' ? (
              <Link href="/api/auth/signout" className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg text-sm">
                Sign Out
              </Link>
            ) : (
              <Link href="/auth/signin" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg text-sm">
                Sign In
              </Link>
            )}
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-gray-200 inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-800 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-200 focus:ring-white"
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
            <Link href="/" className="text-gray-600 hover:text-gray-800 block px-3 py-2 rounded-md text-base font-medium">
              Home
            </Link>
            <Link href="/marketplace" className="text-gray-600 hover:text-gray-800 block px-3 py-2 rounded-md text-base font-medium">
              Marketplace
            </Link>
            {status === 'authenticated' && (
              <Link href="/marketplace/my-library" className="text-gray-600 hover:text-gray-800 block px-3 py-2 rounded-md text-base font-medium">
                My Library
              </Link>
            )}
            {status === 'loading' ? (
              <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            ) : status === 'authenticated' ? (
              <Link href="/api/auth/signout" className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold block py-2 px-4 rounded-lg text-sm">
                Sign Out
              </Link>
            ) : (
              <Link href="/auth/signin" className="bg-blue-600 hover:bg-blue-700 text-white font-bold block py-2 px-4 rounded-lg text-sm">
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
