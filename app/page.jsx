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
    <div className="flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-3xl bg-black bg-opacity-50 backdrop-blur-md rounded-2xl border border-fuchsia-500/30 shadow-2xl shadow-fuchsia-500/10 p-8 mt-10">
        <h1 className="text-5xl font-bold text-center mb-2 text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-cyan-400">
          PromptCraft
        </h1>
        <p className="text-center text-gray-400 mb-8 text-lg">
          Transforming Ideas into Enterprise-Grade AI Prompts
        </p>

        <form onSubmit={handleSubmit}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-4 bg-gray-900/70 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 focus:outline-none transition-all duration-300 placeholder-gray-500"
            rows="4"
            placeholder="e.g., a dynamic logo for an agile cybersecurity firm..."
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-4 bg-gradient-to-r from-fuchsia-600 to-blue-600 hover:from-fuchsia-700 hover:to-blue-700 disabled:bg-gray-700 disabled:from-gray-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-lg hover:shadow-cyan-500/30"
          >
            {isLoading ? 'Crafting...' : 'Generate Prompt'}
          </button>
        </form>

        {isLoading && (
          <div className="flex justify-center mt-8">
            <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {error && (
          <div className="mt-8 p-4 bg-red-900/30 border border-red-700/50 text-red-300 rounded-lg">
            <p><strong className="font-semibold">Error:</strong> {error}</p>
          </div>
        )}

        {prompt && (
          <div className="mt-8 p-6 bg-gray-900/50 border border-gray-700/50 rounded-lg relative transition-opacity duration-500 animate-fade-in">
            <h2 className="text-2xl font-semibold mb-4 text-cyan-400">Your Generated Prompt:</h2>
            <p className="text-gray-300 whitespace-pre-wrap font-mono text-base">{prompt}</p>
            <button
              onClick={handleCopy}
              className="absolute top-4 right-4 bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-3 rounded-lg text-sm transition-colors duration-300 border border-gray-600"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        )}
      </div>

      {/* Features Section */}
      <section className="w-full max-w-5xl mt-20 text-center">
        <h2 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Why PromptCraft?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-900/40 p-6 rounded-lg border border-gray-700/50">
            <h3 className="text-2xl font-semibold mb-3 text-fuchsia-400">Advanced AI</h3>
            <p className="text-gray-400">Leverage state-of-the-art models to transform simple ideas into complex, powerful prompts.</p>
          </div>
          <div className="bg-gray-900/40 p-6 rounded-lg border border-gray-700/50">
            <h3 className="text-2xl font-semibold mb-3 text-fuchsia-400">Marketplace</h3>
            <p className="text-gray-400">Discover, buy, and sell high-quality prompt templates from a community of creators.</p>
          </div>
          <div className="bg-gray-900/40 p-6 rounded-lg border border-gray-700/50">
            <h3 className="text-2xl font-semibold mb-3 text-fuchsia-400">For Creators</h3>
            <p className="text-gray-400">Monetize your prompt engineering skills by selling your creations to a global audience.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full max-w-5xl mt-20 text-center">
        <h2 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8 text-gray-400">
            <div className="flex flex-col items-center">
                <div className="text-5xl font-bold text-cyan-400 mb-2">1</div>
                <h3 className="text-xl font-semibold mb-2">Input Your Idea</h3>
                <p>Start with a simple concept or idea. Let our AI do the heavy lifting.</p>
            </div>
            <div className="flex flex-col items-center">
                <div className="text-5xl font-bold text-cyan-400 mb-2">2</div>
                <h3 className="text-xl font-semibold mb-2">Generate Prompt</h3>
                <p>Our system crafts a detailed, professional-grade prompt for you.</p>
            </div>
            <div className="flex flex-col items-center">
                <div className="text-5xl font-bold text-cyan-400 mb-2">3</div>
                <h3 className="text-xl font-semibold mb-2">Explore & Create</h3>
                <p>Use your new prompt, or browse the marketplace for more inspiration.</p>
            </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full max-w-5xl mt-20 text-center bg-gray-900/40 p-10 rounded-lg border border-fuchsia-500/30">
        <h2 className="text-3xl font-bold mb-4">Ready to Explore?</h2>
        <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Dive into our marketplace to find the perfect prompt or start selling your own creations today.
        </p>
        <a href="/marketplace" className="bg-gradient-to-r from-fuchsia-600 to-blue-600 hover:from-fuchsia-700 hover:to-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/30">
            Visit the Marketplace
        </a>
      </section>
    </div>
  );
}
