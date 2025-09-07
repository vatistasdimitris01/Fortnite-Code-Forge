import React, { useState, useRef, useEffect } from 'react';
import { Language } from '../types';
import { EXAMPLES } from '../examples';

interface PromptInputProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  language: Language;
  setLanguage: (language: Language) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const ArrowUpIcon = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M9.47 2.47a.75.75 0 0 1 1.06 0l6 6a.75.75 0 0 1-1.06 1.06L10 4.06 4.53 9.53a.75.75 0 0 1-1.06-1.06l6-6Z" clipRule="evenodd" />
      <path fillRule="evenodd" d="M10 3a.75.75 0 0 1 .75.75v10.5a.75.75 0 0 1-1.5 0V3.75A.75.75 0 0 1 10 3Z" clipRule="evenodd" />
    </svg>
);

const SparklesIcon = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.293 2.293a1 1 0 010 1.414L10 16l-4 4 4-4 3.707-3.707a1 1 0 011.414 0L19 17m0 0v4m2-2h-4" />
    </svg>
);


export const PromptInput: React.FC<PromptInputProps> = ({
  prompt,
  setPrompt,
  language,
  setLanguage,
  onSubmit,
  isLoading,
}) => {
    const [showExamples, setShowExamples] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Auto-resize textarea height based on content
    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto'; // Reset height to recalculate
            const scrollHeight = textarea.scrollHeight;
            textarea.style.height = `${scrollHeight}px`;
        }
    }, [prompt]);


    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (!isLoading && prompt.trim()) {
                onSubmit();
            }
        }
    };

    const handleExampleClick = (example: typeof EXAMPLES[0]) => {
        setPrompt(example.prompt);
        setLanguage(example.language);
        setShowExamples(false);
    };

  return (
    <div className="fixed bottom-0 inset-x-0 z-10 p-2 md:p-4">
        <div className="max-w-4xl mx-auto relative">
             {showExamples && (
                <div 
                    className="absolute bottom-full left-0 right-0 mb-2 p-3 bg-gray-800/80 backdrop-blur-md border border-gray-600/50 rounded-xl shadow-2xl animate-fade-in-up"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="examples-heading"
                >
                    <div className="flex justify-between items-center mb-2">
                         <h3 id="examples-heading" className="text-sm font-semibold text-gray-300 px-2">Examples</h3>
                         <button onClick={() => setShowExamples(false)} className="p-1 rounded-full hover:bg-gray-700 text-gray-400 hover:text-white" aria-label="Close examples">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                         </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                    {EXAMPLES.map((example, index) => (
                        <button
                            key={index}
                            onClick={() => handleExampleClick(example)}
                            className="text-left p-3 rounded-lg hover:bg-gray-700/50 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                        <p className="font-medium text-sm text-gray-200">{example.title}</p>
                        <p className="text-xs text-gray-400 mt-1">{example.language}</p>
                        </button>
                    ))}
                    </div>
                </div>
            )}

            <div className="relative flex items-end bg-gray-800/70 backdrop-blur-md border border-gray-600/50 rounded-xl shadow-2xl p-2">
                 <button
                    onClick={() => setShowExamples(!showExamples)}
                    className="flex-shrink-0 w-10 h-10 inline-flex items-center justify-center text-gray-400 hover:text-purple-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-purple-500 rounded-full transition-colors"
                    aria-label="Show examples"
                    aria-expanded={showExamples}
                    aria-controls="examples-dialog"
                  >
                    <SparklesIcon />
                 </button>
                 <div className="border-l border-gray-600/50 h-6 mx-1 mb-2"></div>
                 <select
                    id="language-select"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as Language)}
                    className="appearance-none bg-transparent rounded-none pl-3 pr-4 py-2 text-gray-300 focus:outline-none focus:ring-0 text-sm font-medium"
                    disabled={isLoading}
                    aria-label="Select language"
                >
                    <option className="bg-gray-800" value={Language.VERSE}>Verse</option>
                    <option className="bg-gray-800" value={Language.UEFN_CPP}>UEFN C++</option>
                </select>
                <textarea
                    ref={textareaRef}
                    id="prompt-textarea"
                    rows={1}
                    className="flex-1 bg-transparent px-4 py-2 text-gray-200 focus:outline-none focus:ring-0 resize-none placeholder-gray-500 max-h-48"
                    placeholder="Describe what you want to build..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    disabled={isLoading}
                    onKeyDown={handleKeyDown}
                    aria-label="Code description prompt"
                />
                <button
                    onClick={onSubmit}
                    disabled={isLoading || !prompt.trim()}
                    className="ml-2 flex-shrink-0 w-10 h-10 inline-flex items-center justify-center text-white bg-purple-600 rounded-full hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-purple-500 disabled:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    aria-label={isLoading ? "Generating code" : "Generate code"}
                >
                    {isLoading ? (
                         <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    ) : (
                        <ArrowUpIcon />
                    )}
                </button>
            </div>
        </div>
    </div>
  );
};
