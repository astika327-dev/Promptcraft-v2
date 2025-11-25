// app/marketplace/my-library/page.jsx
'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function MyLibraryPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [templates, setTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/signin');
    }
  }, [user, loading, router]);

  useEffect(() => {
    // For now, just show empty state
    // TODO: Fetch from Supabase when ready
    setIsLoading(false);
  }, [user]);

  if (loading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect
  }

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
            <h1 className="text-5xl font-bold text-white mb-2">
              My Library
            </h1>
            <p className="text-white/70 text-lg">
              Your purchased templates and creations
            </p>
          </header>

          {/* Main Content */}
          <main>
            <div className="glass-card rounded-2xl p-8">
              {templates.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {templates.map(template => (
                    <div key={template.id} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all-fast">
                      <h3 className="text-xl font-bold text-white mb-2">{template.title}</h3>
                      <p className="text-white/70 mb-4">{template.description}</p>
                      <Link 
                        href={`/marketplace/template/${template.id}`} 
                        className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 px-4 rounded-lg hover:scale-105 transition-all-fast"
                      >
                        View Template
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <svg className="w-24 h-24 mx-auto text-white/30 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                  <h3 className="text-2xl font-bold text-white mb-2">No templates yet</h3>
                  <p className="text-white/70 mb-6">
                    You haven't purchased any templates yet. Browse the marketplace to get started!
                  </p>
                  <Link 
                    href="/marketplace" 
                    className="inline-block relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition-all-base"></div>
                    <div className="relative bg-white text-purple-600 font-bold py-3 px-6 rounded-lg hover:scale-105 transition-all-fast">
                      Browse Marketplace
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
