// app/marketplace/template/[id]/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function TemplateDetailPage({ params }) {
  const [template, setTemplate] = useState({});
  const [isPurchased, setIsPurchased] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const res = await fetch(`/api/templates/${params.id}`); // This API route doesn't exist yet, we need to create it.
        if(!res.ok) throw new Error("Failed to fetch template details.");
        const data = await res.json();
        setTemplate(data.template);
        setIsPurchased(data.isPurchased);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTemplate();
  }, [params.id]);

  const handleBuy = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/templates/${params.id}/buy`, { method: 'POST' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Purchase failed.');

      // Redirect to the dummy payment URL
      router.push(data.paymentUrl);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  if (isLoading) return <div className="text-center p-10">Loading...</div>;
  if (error) return <div className="text-center p-10 text-red-400">Error: {error}</div>;
  if (!template) return <div className="text-center p-10">Template not found.</div>;

  const isCreator = session?.user?.id === template.creatorId;

  return (
    <div className="min-h-screen bg-grid-pattern text-gray-200 flex flex-col items-center p-4 font-sans">
      <div className="w-full max-w-4xl">
        <header className="py-6">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-cyan-400">
            {template.title}
          </h1>
          <p className="text-gray-400 mt-2">Created by {template.creator.name || template.creator.email}</p>
        </header>

        <main className="mt-8 bg-black bg-opacity-50 backdrop-blur-md rounded-2xl border border-fuchsia-500/30 p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-semibold mb-4 text-cyan-400">Description</h2>
              <p className="text-gray-300">{template.description}</p>

              <h2 className="text-2xl font-semibold mt-8 mb-4 text-cyan-400">Prompt</h2>
              <div className="p-4 bg-gray-900/70 border border-gray-700 rounded-lg">
                {isPurchased || isCreator ? (
                  <p className="whitespace-pre-wrap font-mono">{template.promptText}</p>
                ) : (
                  <p className="italic text-gray-500">Purchase this template to unlock the full prompt.</p>
                )}
              </div>
            </div>

            <div>
              <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-6">
                <p className="text-3xl font-bold text-center text-cyan-400">${(template.price / 100).toFixed(2)}</p>
                {session && !isPurchased && !isCreator && (
                  <button onClick={handleBuy} disabled={isLoading} className="w-full mt-4 bg-gradient-to-r from-fuchsia-600 to-blue-600 hover:from-fuchsia-700 hover:to-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50">
                    {isLoading ? 'Processing...' : 'Buy Now'}
                  </button>
                )}
                 {isPurchased && <p className="text-green-400 text-center mt-4">Purchased!</p>}
                 {isCreator && <p className="text-blue-400 text-center mt-4">Your Template</p>}
                 {!session && <p className="text-gray-400 text-center mt-4">Sign in to buy</p>}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
