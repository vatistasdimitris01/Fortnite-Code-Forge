
import React from 'react';

const LlamaIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 18c-2.4 0-4.3.9-5.5 2.5"/><path d="M14.5 16.5c0-1-1.5-2.5-1.5-2.5-1 0-1.5 1.5-1.5 2.5S12.5 19 14 19s2-1.5 2-2.5Z"/><path d="M15 14c2.5-1 3-3.5 3-3.5s-1.5-2-4.5-2-4.5 2-4.5 2 1 2.5 3 3.5"/><path d="M18 10c0-1.5-1.5-3-1.5-3s-1.5-1.5-3-1.5-3 1.5-3 1.5S9 8.5 9 10c0 1.5 1 3 1 3"/><path d="M2.5 13.5c0-1.5 1.5-3 1.5-3s1.5-1.5 3-1.5S10 9 10 9s1.5 1.5 1.5 3"/>
    </svg>
);

export const Header: React.FC = () => {
  return (
    <header className="py-6 px-4 md:px-6 bg-gray-900/50 border-b border-gray-700/50 backdrop-blur-sm">
      <div className="container mx-auto flex items-center gap-4">
        <LlamaIcon />
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">
            Fortnite Code Forge
          </h1>
          <p className="text-sm text-gray-400">Your AI-Powered UEFN Co-pilot</p>
        </div>
      </div>
    </header>
  );
};
