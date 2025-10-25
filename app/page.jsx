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
      setError('Please enter an idea.');
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
        throw new Error(err.message || 'Something went wrong');
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
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <h1 className="text-4xl font-bold text-center mb-2">PromptCraft</h1>
        <p className="text-center text-gray-400 mb-8">Turn your simple ideas into powerful AI prompts.</p>

        <form onSubmit={handleSubmit}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            rows="3"
            placeholder="e.g., a logo for a sustainable coffee brand"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-500 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
          >
            {isLoading ? 'Generating...' : 'Generate Prompt'}
          </button>
        </form>

        {isLoading && (
          <div className="flex justify-center mt-8">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {error && (
          <div className="mt-8 p-4 bg-red-900/50 border border-red-700 text-red-300 rounded-lg">
            <p><strong>Error:</strong> {error}</p>
          </div>
        )}

        {prompt && (
          <div className="mt-8 p-6 bg-gray-800 border border-gray-700 rounded-lg relative">
            <h2 className="text-2xl font-semibold mb-4">Your Generated Prompt:</h2>
            <p className="text-gray-300 whitespace-pre-wrap">{prompt}</p>
            <button
              onClick={handleCopy}
              className="absolute top-4 right-4 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-3 rounded-lg text-sm transition duration-300"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
