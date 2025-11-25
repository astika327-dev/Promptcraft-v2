// app/marketplace/page.jsx
'use client'
import Link from 'next/link';
import TemplateList from '@/components/TemplateList';
import { useAuth } from '@/components/AuthProvider';

export default function MarketplacePage() {
  const { user, loading } = useAuth();

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <header className="mb-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-5xl font-bold text-white mb-2">
                  Template Marketplace
                </h1>
                <p className="text-white/70 text-lg">
                  Discover and purchase premium prompt templates
                </p>
              </div>
              
              <nav className="flex items-center gap-3">
                {loading ? (
                  <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : user ? (
                  <>
                    <Link 
                      href="/marketplace/my-library" 
                      className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold py-2.5 px-6 rounded-lg transition-all-fast border border-white/20 hover:scale-105"
                    >
                      My Library
                    </Link>
                    <Link 
                      href="/marketplace/create" 
                      className="relative group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition-all-base"></div>
                      <div className="relative bg-white text-purple-600 font-bold py-2.5 px-6 rounded-lg hover:scale-105 transition-all-fast">
                        Create Template
                      </div>
                    </Link>
                  </>
                ) : (
                  <Link 
                    href="/auth/signin" 
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition-all-base"></div>
                    <div className="relative bg-white text-purple-600 font-bold py-2.5 px-6 rounded-lg hover:scale-105 transition-all-fast">
                      Sign In
                    </div>
                  </Link>
                )}
              </nav>
            </div>
          </header>

          {/* Main Content */}
          <main>
            <div className="glass-card rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6 text-white">Explore Templates</h2>
              <TemplateList />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
