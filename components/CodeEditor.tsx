
import React, { useState, useEffect } from 'react';
import { LoadingSpinner } from './LoadingSpinner';
import { Language } from '../types';

interface CodeEditorProps {
  code: string;
  isLoading: boolean;
  error: string | null;
  language: Language;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ code, isLoading, error, language }) => {
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied'>('idle');

  useEffect(() => {
    if (code) {
      setCopyStatus('idle');
    }
  }, [code]);
  
  const handleCopy = () => {
    if (code) {
      navigator.clipboard.writeText(code);
      setCopyStatus('copied');
      setTimeout(() => setCopyStatus('idle'), 2000);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return <LoadingSpinner />;
    }
    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center text-red-400">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="font-semibold font-sans">Generation Failed</p>
          <p className="text-sm text-gray-400 font-sans">{error}</p>
        </div>
      );
    }
    if (code) {
      return (
        <pre className="overflow-auto">
          <code className={`language-${language === Language.VERSE ? 'verse' : 'cpp'}`}>{code}</code>
        </pre>
      );
    }
    return (
      <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
        <p className="font-semibold font-sans">Your generated code will appear here</p>
        <p className="text-sm font-sans">Describe your idea in the prompt below to get started.</p>
      </div>
    );
  };

  return (
    <div className="h-screen w-screen bg-gray-900 font-mono text-sm relative">
       {code && !isLoading && !error && (
         <div className="absolute top-16 right-4 z-10 flex items-center gap-2 bg-gray-800/50 backdrop-blur-sm rounded-lg p-1">
          <span className="px-2 text-xs text-gray-400 font-sans">{language}</span>
           <button
             onClick={handleCopy}
             className="px-3 py-1 text-xs font-sans font-semibold text-gray-200 bg-gray-700/50 hover:bg-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
             aria-label="Copy code to clipboard"
           >
             {copyStatus === 'copied' ? 'Copied!' : 'Copy'}
           </button>
         </div>
       )}
      <div className="h-full w-full overflow-auto pt-16 pb-32 px-6 box-border">
         {renderContent()}
      </div>
    </div>
  );
};
