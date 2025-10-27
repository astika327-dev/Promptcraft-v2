"use client";

import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input) {
      setError('Please enter an idea to generate a prompt.');
      return;
    }

    setIsLoading(true);
    setError('');
    setPrompt('');
    setCopied(false);

    try {
      const response = await fetch('/api/generate-prompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || 'An unknown error occurred.');
      }

      const data = await response.json();
      setPrompt(data.prompt);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (prompt) {
      navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800">
            PromptCraft
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Transforming Ideas into Enterprise-Grade AI Prompts
          </p>
        </header>

        <main>
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows="4"
              placeholder="e.g., a dynamic logo for an agile cybersecurity firm..."
            />
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg disabled:bg-gray-400"
            >
              {isLoading ? 'Crafting...' : 'Generate Prompt'}
            </button>
          </form>

          {isLoading && (
            <div className="flex justify-center mt-8">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {error && (
            <div className="mt-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              <p><strong>Error:</strong> {error}</p>
            </div>
          )}

          {prompt && (
            <div className="mt-8 p-6 bg-gray-50 border border-gray-200 rounded-lg relative">
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">Your Generated Prompt:</h2>
              <p className="text-gray-800 whitespace-pre-wrap font-mono">{prompt}</p>
              <button
                onClick={handleCopy}
                className="absolute top-4 right-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-3 rounded-lg"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          )}
        </main>

        <section className="mt-20">
          <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">Why PromptCraft?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-3 text-blue-600">Advanced AI</h3>
              <p className="text-gray-600">Leverage state-of-the-art models to transform simple ideas into complex, powerful prompts.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-3 text-blue-600">Marketplace</h3>
              <p className="text-gray-600">Discover, buy, and sell high-quality prompt templates from a community of creators.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-3 text-blue-600">For Creators</h3>
              <p className="text-gray-600">Monetize your prompt engineering skills by selling your creations to a global audience.</p>
            </div>
          </div>
        </section>

        <section className="mt-20 text-center">
          <h2 className="text-4xl font-bold mb-8 text-gray-800">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8 text-gray-600">
              <div className="flex flex-col items-center">
                  <div className="text-5xl font-bold text-blue-600 mb-2">1</div>
                  <h3 className="text-xl font-semibold mb-2">Input Your Idea</h3>
                  <p>Start with a simple concept or idea. Let our AI do the heavy lifting.</p>
              </div>
              <div className="flex flex-col items-center">
                  <div className="text-5xl font-bold text-blue-600 mb-2">2</div>
                  <h3 className="text-xl font-semibold mb-2">Generate Prompt</h3>
                  <p>Our system crafts a detailed, professional-grade prompt for you.</p>
              </div>
              <div className="flex flex-col items-center">
                  <div className="text-5xl font-bold text-blue-600 mb-2">3</div>
                  <h3 className="text-xl font-semibold mb-2">Explore & Create</h3>
                  <p>Use your new prompt, or browse the marketplace for more inspiration.</p>
              </div>
          </div>
        </section>

        <section className="mt-20 text-center bg-gray-100 p-10 rounded-lg">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Ready to Explore?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Dive into our marketplace to find the perfect prompt or start selling your own creations today.
          </p>
          <a href="/marketplace" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg">
              Visit the Marketplace
          </a>
        </section>
      </div>
    </div>
  );
}
