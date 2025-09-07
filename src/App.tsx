import React, { useState, useCallback } from 'react';
import { PromptInput } from './components/PromptInput';
import { CodeEditor } from './components/CodeEditor';
import { generateFortniteCode } from './services/geminiService';
import { Language } from './types';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [language, setLanguage] = useState<Language>(Language.VERSE);
  const [generatedCode, setGeneratedCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateCode = useCallback(async () => {
    if (!prompt.trim()) {
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedCode('');

    try {
      const code = await generateFortniteCode(prompt, language);
      setGeneratedCode(code);
    } catch (err) {
      setError('An error occurred while generating the code. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [prompt, language]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans relative overflow-hidden">
       <a 
        href="https://x.com/vatistasdim" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="fixed top-4 right-4 bg-gray-800/50 text-gray-400 text-xs px-3 py-1 rounded-full hover:bg-gray-700 transition-colors z-20 font-sans"
        aria-label="Link to creator's X.com profile"
      >
            by vatistasdimitris
        </a>

      <CodeEditor
        code={generatedCode}
        isLoading={isLoading}
        error={error}
        language={language}
      />

      <PromptInput
        prompt={prompt}
        setPrompt={setPrompt}
        language={language}
        setLanguage={setLanguage}
        onSubmit={handleGenerateCode}
        isLoading={isLoading}
      />
    </div>
  );
};

export default App;
