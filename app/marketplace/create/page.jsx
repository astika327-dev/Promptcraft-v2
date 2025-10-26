// app/marketplace/create/page.jsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateTemplatePage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [promptText, setPromptText] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/templates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          promptText,
          category,
          price: parseInt(price * 100, 10), // Store in cents
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || 'Failed to create template.');
      }

      const newTemplate = await response.json();
      router.push(`/marketplace/template/${newTemplate.id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-grid-pattern text-gray-200 flex flex-col items-center p-4 font-sans">
      <div className="w-full max-w-2xl">
        <header className="py-6">
          <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-cyan-400">
            Create a New Template
          </h1>
        </header>
        <main className="mt-8 bg-black bg-opacity-50 backdrop-blur-md rounded-2xl border border-fuchsia-500/30 p-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-400 mb-2">Title</label>
              <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full p-3 bg-gray-900/70 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-400" />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-400 mb-2">Description</label>
              <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required rows="3" className="w-full p-3 bg-gray-900/70 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-400"></textarea>
            </div>
            <div className="mb-4">
              <label htmlFor="promptText" className="block text-gray-400 mb-2">Prompt Text</label>
              <textarea id="promptText" value={promptText} onChange={(e) => setPromptText(e.target.value)} required rows="6" className="w-full p-3 bg-gray-900/70 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-400"></textarea>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="category" className="block text-gray-400 mb-2">Category</label>
                <input type="text" id="category" value={category} onChange={(e) => setCategory(e.target.value)} required className="w-full p-3 bg-gray-900/70 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-400" />
              </div>
              <div>
                <label htmlFor="price" className="block text-gray-400 mb-2">Price ($)</label>
                <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} required min="0" step="0.01" className="w-full p-3 bg-gray-900/70 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-400" />
              </div>
            </div>
            {error && <p className="text-red-400 text-center mb-4">{error}</p>}
            <button type="submit" disabled={isLoading} className="w-full mt-4 bg-gradient-to-r from-fuchsia-600 to-blue-600 hover:from-fuchsia-700 hover:to-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 disabled:opacity-50">
              {isLoading ? 'Creating...' : 'Create Template'}
            </button>
          </form>
        </main>
      </div>
    </div>
  );
}
