
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { PromptInput } from './components/PromptInput';
import { CodePreview } from './components/CodePreview';
import { Loader } from './components/Loader';
import { generateWebpageCode } from './services/geminiService';
import { CodeIcon, EyeIcon } from './components/Icons';

type ViewMode = 'preview' | 'code';

export default function App() {
  const [prompt, setPrompt] = useState<string>('');
  const [generatedCode, setGeneratedCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('preview');

  const handleGenerate = useCallback(async () => {
    if (!prompt) {
      setError('Please enter a description for your webpage.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedCode('');

    try {
      const code = await generateWebpageCode(prompt);
      setGeneratedCode(code);
    } catch (err) {
      console.error(err);
      setError('An error occurred while generating the code. Please check your API key and try again.');
    } finally {
      setIsLoading(false);
    }
  }, [prompt]);

  const renderContent = () => {
    if (isLoading) {
      return <Loader />;
    }
    if (error) {
      return <div className="flex items-center justify-center h-full text-red-400 bg-red-900/20 rounded-lg p-4">{error}</div>;
    }
    if (!generatedCode) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-slate-400 text-center p-4">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 14.5M14.25 3.104c.251.023.501.05.75.082M7.5 18.75a2.25 2.25 0 002.25 2.25h3a2.25 2.25 0 002.25-2.25M16.5 18.75a2.25 2.25 0 00-2.25-2.25h-3a2.25 2.25 0 00-2.25 2.25m10.5-11.25h.008v.008h-.008V7.5zM12 1.5A10.5 10.5 0 001.5 12a10.5 10.5 0 0010.5 10.5 10.5 10.5 0 0010.5-10.5A10.5 10.5 0 0012 1.5z" />
           </svg>
          <h2 className="text-xl font-semibold text-slate-300">Your AI-generated webpage will appear here.</h2>
          <p className="mt-2 text-slate-400">Describe what you want to build, click "Weave," and watch your idea come to life.</p>
        </div>
      );
    }
    return <CodePreview code={generatedCode} viewMode={viewMode} />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-brand-dark text-slate-200 font-sans">
      <Header />
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          
          <div className="flex flex-col space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">Describe Your Vision</h2>
            <PromptInput
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onSubmit={handleGenerate}
              isLoading={isLoading}
            />
          </div>

          <div className="flex flex-col min-h-[500px] lg:min-h-0">
             <div className="flex items-center justify-between mb-4">
               <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">Live Canvas</h2>
                {generatedCode && (
                  <div className="flex items-center space-x-2 bg-slate-800 p-1 rounded-lg">
                    <button
                      onClick={() => setViewMode('preview')}
                      className={`px-3 py-1 text-sm rounded-md transition-colors ${viewMode === 'preview' ? 'bg-brand-secondary text-white' : 'text-slate-400 hover:bg-slate-700'}`}
                    >
                      <EyeIcon className="w-5 h-5 inline-block mr-1" />
                      Preview
                    </button>
                    <button
                      onClick={() => setViewMode('code')}
                      className={`px-3 py-1 text-sm rounded-md transition-colors ${viewMode === 'code' ? 'bg-brand-secondary text-white' : 'text-slate-400 hover:bg-slate-700'}`}
                    >
                      <CodeIcon className="w-5 h-5 inline-block mr-1" />
                      Code
                    </button>
                  </div>
                )}
             </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl flex-grow shadow-2xl overflow-hidden">
             {renderContent()}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
