'use client';

import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const { user, loading, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/';
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all-base ${
        scrolled 
          ? 'glass-card shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur-lg opacity-75 group-hover:opacity-100 transition-all-base"></div>
                <div className="relative bg-white rounded-lg p-2">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <span className="text-2xl font-bold text-white">
                Prompt<span className="text-purple-300">Craft</span>
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            <Link 
              href="/" 
              className="text-white/90 hover:text-white hover:bg-white/10 px-4 py-2 rounded-lg text-sm font-medium transition-all-fast"
            >
              Home
            </Link>
            <Link 
              href="/marketplace" 
              className="text-white/90 hover:text-white hover:bg-white/10 px-4 py-2 rounded-lg text-sm font-medium transition-all-fast"
            >
              Marketplace
            </Link>
            {user && (
              <Link 
                href="/marketplace/my-library" 
                className="text-white/90 hover:text-white hover:bg-white/10 px-4 py-2 rounded-lg text-sm font-medium transition-all-fast"
              >
                My Library
              </Link>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {loading ? (
              <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : user ? (
              <div className="flex items-center space-x-3">
                <div className="text-white/90 text-sm">
                  {user.email}
                </div>
                <button 
                  onClick={handleSignOut}
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold py-2.5 px-6 rounded-lg text-sm transition-all-fast border border-white/20 hover:scale-105"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link 
                  href="/auth/signin" 
                  className="text-white/90 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-all-fast"
                >
                  Sign In
                </Link>
                <Link 
                  href="/auth/signup" 
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition-all-base"></div>
                  <div className="relative bg-white text-purple-600 font-bold py-2.5 px-6 rounded-lg text-sm hover:scale-105 transition-all-fast">
                    Sign Up
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-white/10 backdrop-blur-sm inline-flex items-center justify-center p-2 rounded-lg text-white hover:bg-white/20 transition-all-fast border border-white/20"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden glass-card border-t border-white/10" id="mobile-menu">
          <div className="px-4 pt-2 pb-3 space-y-1">
            <Link 
              href="/" 
              className="text-white/90 hover:text-white hover:bg-white/10 block px-3 py-2 rounded-lg text-base font-medium transition-all-fast"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/marketplace" 
              className="text-white/90 hover:text-white hover:bg-white/10 block px-3 py-2 rounded-lg text-base font-medium transition-all-fast"
              onClick={() => setIsOpen(false)}
            >
              Marketplace
            </Link>
            {user && (
              <Link 
                href="/marketplace/my-library" 
                className="text-white/90 hover:text-white hover:bg-white/10 block px-3 py-2 rounded-lg text-base font-medium transition-all-fast"
                onClick={() => setIsOpen(false)}
              >
                My Library
              </Link>
            )}
            <div className="pt-4 border-t border-white/10 mt-4">
              {loading ? (
                <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div>
              ) : user ? (
                <>
                  <div className="text-white/70 text-sm px-3 py-2">
                    {user.email}
                  </div>
                  <button 
                    onClick={() => {
                      handleSignOut();
                      setIsOpen(false);
                    }}
                    className="bg-white/10 hover:bg-white/20 text-white font-semibold block w-full py-2 px-4 rounded-lg text-sm transition-all-fast border border-white/20 text-center"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <div className="space-y-2">
                  <Link 
                    href="/auth/signin" 
                    className="bg-white/10 hover:bg-white/20 text-white font-semibold block py-2 px-4 rounded-lg text-sm transition-all-fast border border-white/20 text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link 
                    href="/auth/signup" 
                    className="bg-white text-purple-600 font-bold block py-2 px-4 rounded-lg text-sm transition-all-fast text-center hover:scale-105"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
