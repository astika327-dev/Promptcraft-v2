"use client";

import { useState, useEffect, useCallback } from 'react';

// Debounce hook untuk optimasi
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Local Storage Hook
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

export default function Home() {
  const [input, setInput] = useState('');
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useLocalStorage('promptHistory', []);
  const [showHistory, setShowHistory] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [suggestions] = useState([
    "a dynamic logo for an agile cybersecurity firm",
    "a minimalist website design for a coffee shop",
    "an engaging social media post about AI innovation",
    "a professional email template for client onboarding"
  ]);

  const debouncedInput = useDebounce(input, 300);

  useEffect(() => {
    setCharCount(input.length);
  }, [input]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) {
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
      
      // Add to history
      const newHistoryItem = {
        id: Date.now(),
        input: input,
        prompt: data.prompt,
        timestamp: new Date().toISOString()
      };
      setHistory(prev => [newHistoryItem, ...prev.slice(0, 9)]); // Keep last 10
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = useCallback(() => {
    if (prompt) {
      navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [prompt]);

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
  };

  const loadFromHistory = (item) => {
    setInput(item.input);
    setPrompt(item.prompt);
    setShowHistory(false);
  };

  const clearHistory = () => {
    setHistory([]);
    setShowHistory(false);
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Hero Header */}
          <header className="text-center mb-12 float-animation">
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-4 text-shadow-glow">
              Prompt<span className="text-purple-300">Craft</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-6">
              Transforming Ideas into Enterprise-Grade AI Prompts
            </p>
            <div className="flex items-center justify-center space-x-4 text-white/60 text-sm">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>AI-Powered</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
                <span>10K+ Users</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>4.9/5 Rating</span>
              </div>
            </div>
          </header>

          {/* Main Generator Card */}
          <main>
            <div className="glass-card rounded-2xl p-8 mb-8 hover-scale">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Input Area */}
                <div className="relative">
                  <label className="block text-white font-semibold mb-3 text-lg">
                    What's your idea?
                  </label>
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="w-full p-5 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white placeholder-white/50 transition-all-base resize-none"
                    rows="5"
                    placeholder="e.g., a dynamic logo for an agile cybersecurity firm..."
                  />
                  <div className="absolute bottom-3 right-3 text-white/50 text-sm">
                    {charCount} characters
                  </div>
                </div>

                {/* Suggestions */}
                <div className="space-y-2">
                  <p className="text-white/70 text-sm">Quick suggestions:</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white/80 hover:text-white px-4 py-2 rounded-lg text-sm transition-all-fast border border-white/20 hover:scale-105"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="flex-1 relative group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur opacity-75 group-hover:opacity-100 transition-all-base"></div>
                    <div className="relative bg-white text-purple-600 font-bold py-4 px-6 rounded-xl hover:scale-105 transition-all-fast flex items-center justify-center space-x-2">
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                          <span>Crafting Magic...</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          <span>Generate Prompt</span>
                        </>
                      )}
                    </div>
                  </button>
                  
                  {history.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setShowHistory(!showHistory)}
                      className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold py-4 px-6 rounded-xl transition-all-fast border border-white/20 hover:scale-105 flex items-center justify-center space-x-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>History ({history.length})</span>
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* History Panel */}
            {showHistory && history.length > 0 && (
              <div className="glass-card rounded-2xl p-6 mb-8 animate-fade-in">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-white font-bold text-xl">Recent History</h3>
                  <button
                    onClick={clearHistory}
                    className="text-red-400 hover:text-red-300 text-sm transition-all-fast"
                  >
                    Clear All
                  </button>
                </div>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {history.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => loadFromHistory(item)}
                      className="bg-white/5 hover:bg-white/10 p-4 rounded-lg cursor-pointer transition-all-fast border border-white/10 hover:border-white/20"
                    >
                      <p className="text-white/90 text-sm mb-1">{item.input}</p>
                      <p className="text-white/50 text-xs">
                        {new Date(item.timestamp).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Error Display */}
            {error && (
              <div className="glass-card rounded-2xl p-6 mb-8 border-2 border-red-500/50 animate-shake">
                <div className="flex items-start space-x-3">
                  <svg className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h3 className="text-red-400 font-semibold mb-1">Error</h3>
                    <p className="text-white/80">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Result Display */}
            {prompt && (
              <div className="glass-card rounded-2xl p-8 mb-8 animate-fade-in">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
                    <svg className="w-7 h-7 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Your Generated Prompt</span>
                  </h2>
                  <button
                    onClick={handleCopy}
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition-all-base"></div>
                    <div className="relative bg-white text-green-600 font-bold py-2 px-4 rounded-lg hover:scale-105 transition-all-fast flex items-center space-x-2">
                      {copied ? (
                        <>
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          <span>Copy</span>
                        </>
                      )}
                    </div>
                  </button>
                </div>
                <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                  <p className="text-white/90 whitespace-pre-wrap leading-relaxed font-mono text-sm">
                    {prompt}
                  </p>
                </div>
              </div>
            )}
          </main>

          {/* Features Section */}
          <section className="mt-24">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-white">
              Why Choose <span className="text-purple-300">PromptCraft</span>?
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  ),
                  title: "Advanced AI",
                  description: "Leverage state-of-the-art models to transform simple ideas into complex, powerful prompts.",
                  gradient: "from-purple-500 to-pink-500"
                },
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  ),
                  title: "Lightning Fast",
                  description: "Get professional-grade prompts in seconds with our optimized AI processing pipeline.",
                  gradient: "from-blue-500 to-cyan-500"
                },
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  title: "Marketplace",
                  description: "Discover, buy, and sell high-quality prompt templates from a community of creators.",
                  gradient: "from-green-500 to-emerald-500"
                }
              ].map((feature, index) => (
                <div
                  key={index}
                  className="glass-card rounded-2xl p-8 hover-scale group"
                >
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.gradient} mb-4 group-hover:scale-110 transition-all-base`}>
                    <div className="text-white">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-white">{feature.title}</h3>
                  <p className="text-white/70 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* How It Works */}
          <section className="mt-24">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-white">
              How It <span className="text-purple-300">Works</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: "1", title: "Input Your Idea", description: "Start with a simple concept or idea. Let our AI do the heavy lifting." },
                { step: "2", title: "Generate Prompt", description: "Our system crafts a detailed, professional-grade prompt for you." },
                { step: "3", title: "Explore & Create", description: "Use your new prompt, or browse the marketplace for more inspiration." }
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-50"></div>
                    <div className="relative w-20 h-20 bg-white rounded-full flex items-center justify-center">
                      <span className="text-4xl font-bold text-purple-600">{item.step}</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-white">{item.title}</h3>
                  <p className="text-white/70 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="mt-24 text-center">
            <div className="glass-card rounded-2xl p-12">
              <h2 className="text-4xl font-bold mb-4 text-white">Ready to Explore?</h2>
              <p className="text-white/70 mb-8 max-w-2xl mx-auto text-lg">
                Dive into our marketplace to find the perfect prompt or start selling your own creations today.
              </p>
              <a 
                href="/marketplace" 
                className="inline-block relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur opacity-75 group-hover:opacity-100 transition-all-base"></div>
                <div className="relative bg-white text-purple-600 font-bold py-4 px-8 rounded-xl hover:scale-105 transition-all-fast">
                  Visit the Marketplace →
                </div>
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
