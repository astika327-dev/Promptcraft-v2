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
          <h1 className="text-5xl font-bold text-primary">
            PromptCraft
          </h1>
          <p className="text-lg text-muted-foreground mt-2">
            Transforming Ideas into Enterprise-Grade AI Prompts
          </p>
        </header>

        <main>
          <form onSubmit={handleSubmit} className="bg-card p-8 rounded-lg border border-border shadow-lg">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full p-4 bg-background border border-border rounded-lg focus:ring-2 focus:ring-ring"
              rows="4"
              placeholder="e.g., a dynamic logo for an agile cybersecurity firm..."
            />
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 px-4 rounded-lg disabled:bg-muted"
            >
              {isLoading ? 'Crafting...' : 'Generate Prompt'}
            </button>
          </form>

          {isLoading && (
            <div className="flex justify-center mt-8">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {error && (
            <div className="mt-8 p-4 bg-destructive/20 border border-destructive/50 text-destructive-foreground rounded-lg">
              <p><strong>Error:</strong> {error}</p>
            </div>
          )}

          {prompt && (
            <div className="mt-8 p-6 bg-muted/50 border border-border rounded-lg relative">
              <h2 className="text-2xl font-semibold mb-4 text-secondary">Your Generated Prompt:</h2>
              <p className="text-foreground whitespace-pre-wrap font-mono">{prompt}</p>
              <button
                onClick={handleCopy}
                className="absolute top-4 right-4 bg-muted hover:bg-muted/80 text-foreground font-bold py-2 px-3 rounded-lg"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          )}
        </main>

        <section className="mt-20">
          <h2 className="text-4xl font-bold text-center mb-8 text-primary">Why PromptCraft?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg border border-border shadow-md">
              <h3 className="text-2xl font-semibold mb-3 text-secondary">Advanced AI</h3>
              <p className="text-muted-foreground">Leverage state-of-the-art models to transform simple ideas into complex, powerful prompts.</p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border shadow-md">
              <h3 className="text-2xl font-semibold mb-3 text-secondary">Marketplace</h3>
              <p className="text-muted-foreground">Discover, buy, and sell high-quality prompt templates from a community of creators.</p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border shadow-md">
              <h3 className="text-2xl font-semibold mb-3 text-secondary">For Creators</h3>
              <p className="text-muted-foreground">Monetize your prompt engineering skills by selling your creations to a global audience.</p>
            </div>
          </div>
        </section>

        <section className="mt-20 text-center">
          <h2 className="text-4xl font-bold mb-8 text-primary">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8 text-muted-foreground">
              <div className="flex flex-col items-center">
                  <div className="text-5xl font-bold text-secondary mb-2">1</div>
                  <h3 className="text-xl font-semibold mb-2">Input Your Idea</h3>
                  <p>Start with a simple concept or idea. Let our AI do the heavy lifting.</p>
              </div>
              <div className="flex flex-col items-center">
                  <div className="text-5xl font-bold text-secondary mb-2">2</div>
                  <h3 className="text-xl font-semibold mb-2">Generate Prompt</h3>
                  <p>Our system crafts a detailed, professional-grade prompt for you.</p>
              </div>
              <div className="flex flex-col items-center">
                  <div className="text-5xl font-bold text-secondary mb-2">3</div>
                  <h3 className="text-xl font-semibold mb-2">Explore & Create</h3>
                  <p>Use your new prompt, or browse the marketplace for more inspiration.</p>
              </div>
          </div>
        </section>

        <section className="mt-20 text-center bg-card border border-border p-10 rounded-lg">
          <h2 className="text-3xl font-bold mb-4 text-primary">Ready to Explore?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Dive into our marketplace to find the perfect prompt or start selling your own creations today.
          </p>
          <a href="/marketplace" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold py-3 px-8 rounded-lg">
              Visit the Marketplace
          </a>
        </section>
      </div>
    </div>
  );
}
