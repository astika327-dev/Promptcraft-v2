"use client";

import { useState } from 'react';

const DEFAULT_SYSTEM_PROMPT = "You are a world-class prompt engineer. Your task is to take a user's simple idea and transform it into a detailed, ready-to-use prompt for an AI image generator or language model. Your output should be ONLY the final prompt, without any additional explanations, pleasantries, or markdown formatting.";

export default function Home() {
  const [input, setInput] = useState('');
  const [submittedInput, setSubmittedInput] = useState('');
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  // Advanced settings state
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [temperature, setTemperature] = useState(0.7);
  const [topP, setTopP] = useState(1);
  const [systemPrompt, setSystemPrompt] = useState(DEFAULT_SYSTEM_PROMPT);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input) {
      setError('Please enter an idea to generate a prompt.');
      return;
    }

    setIsLoading(true);
    setError('');
    setPrompt('');
    setSubmittedInput(input); // Capture the input at submission time
    setCopied(false);

    try {
      const response = await fetch('/api/generate-prompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input,
          temperature,
          top_p: topP,
          system_prompt: systemPrompt,
        }),
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

  const handleDownload = () => {
    if (prompt) {
      const blob = new Blob([prompt], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'prompt.md';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="min-h-screen bg-grid-pattern text-gray-200 flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-3xl bg-black bg-opacity-50 backdrop-blur-md rounded-2xl border border-fuchsia-500/30 shadow-2xl shadow-fuchsia-500/10 p-8">
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

          <div className="mt-4">
            <button type="button" onClick={() => setShowAdvanced(!showAdvanced)} className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300">
              {showAdvanced ? 'Hide' : 'Show'} Advanced Settings
            </button>
          </div>

          {showAdvanced && (
            <div className="mt-4 p-4 border border-gray-700 rounded-lg bg-gray-900/50 animate-fade-in">
              <div className="mb-4">
                <label htmlFor="systemPrompt" className="block text-sm font-medium text-gray-300 mb-2">System Prompt</label>
                <textarea id="systemPrompt" value={systemPrompt} onChange={(e) => setSystemPrompt(e.target.value)} rows="5" className="w-full p-2 bg-gray-800 border border-gray-600 rounded-md focus:ring-1 focus:ring-cyan-500 focus:outline-none"/>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="temperature" className="block text-sm font-medium text-gray-300 mb-2">Temperature: {temperature}</label>
                  <input id="temperature" type="range" min="0" max="2" step="0.1" value={temperature} onChange={(e) => setTemperature(parseFloat(e.target.value))} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer" />
                </div>
                <div>
                  <label htmlFor="topP" className="block text-sm font-medium text-gray-300 mb-2">Top P: {topP}</label>
                  <input id="topP" type="range" min="0" max="1" step="0.1" value={topP} onChange={(e) => setTopP(parseFloat(e.target.value))} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer" />
                </div>
              </div>
            </div>
          )}

          <button type="submit" disabled={isLoading} className="w-full mt-6 bg-gradient-to-r from-fuchsia-600 to-blue-600 hover:from-fuchsia-700 hover:to-blue-700 disabled:bg-gray-700 disabled:from-gray-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-lg hover:shadow-cyan-500/30">
            {isLoading ? 'Crafting...' : 'Generate Prompt'}
          </button>
        </form>

        {isLoading && ( <div className="flex justify-center mt-8"> <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div> </div> )}
        {error && ( <div className="mt-8 p-4 bg-red-900/30 border border-red-700/50 text-red-300 rounded-lg"> <p><strong className="font-semibold">Error:</strong> {error}</p> </div> )}

        {prompt && (
          <div className="mt-8 p-6 bg-gray-900/50 border border-gray-700/50 rounded-lg relative transition-opacity duration-500 animate-fade-in">
            <div className="absolute top-4 right-4 flex space-x-2">
              <button onClick={handleCopy} className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-3 rounded-lg text-sm transition-colors duration-300 border border-gray-600">
                {copied ? 'Copied!' : 'Copy'}
              </button>
              <button onClick={handleDownload} className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-3 rounded-lg text-sm transition-colors duration-300 border border-gray-600">
                Download .md
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-12">
              <div>
                <h2 className="text-xl font-semibold mb-3 text-fuchsia-400">Your Initial Idea:</h2>
                <p className="text-gray-300 whitespace-pre-wrap font-mono text-base p-4 bg-gray-800/50 rounded-md border border-gray-700">{submittedInput}</p>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-3 text-cyan-400">Generated Prompt:</h2>
                <p className="text-gray-300 whitespace-pre-wrap font-mono text-base p-4 bg-gray-800/50 rounded-md border border-gray-700">{prompt}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
