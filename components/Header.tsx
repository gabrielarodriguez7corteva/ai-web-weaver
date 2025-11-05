
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="p-4 sm:p-6 text-center border-b border-slate-800">
        <div className="inline-flex items-center space-x-3">
             <svg width="48" height="48" viewBox="0 0 24 24" className="text-brand-secondary">
                <path fill="currentColor" d="M6.5 10.75a1.75 1.75 0 1 0 0-3.5a1.75 1.75 0 0 0 0 3.5Zm-1.5 6a1.75 1.75 0 1 0 0-3.5a1.75 1.75 0 0 0 0 3.5Zm5.25-1.25a1.75 1.75 0 1 1-3.5 0a1.75 1.75 0 0 1 3.5 0Zm1.5-6.25a1.75 1.75 0 1 0 0-3.5a1.75 1.75 0 0 0 0 3.5Zm5 1.5a1.75 1.75 0 1 1-3.5 0a1.75 1.75 0 0 1 3.5 0Zm1.5 5.5a1.75 1.75 0 1 0 0-3.5a1.75 1.75 0 0 0 0 3.5ZM12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2Z"></path>
            </svg>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
            AI Web Weaver
            </h1>
        </div>
       <p className="mt-2 text-md text-slate-400 max-w-2xl mx-auto">
        Your personal AI-powered developer for turning ideas into stunning, ready-to-use web pages.
      </p>
    </header>
  );
};
