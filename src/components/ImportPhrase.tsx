import { useState } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { AlertCircle, ClipboardPaste } from 'lucide-react';

interface ImportPhraseProps {
  onNext: (phrase: string[]) => void;
}

export function ImportPhrase({ onNext }: ImportPhraseProps) {
  const [phraseText, setPhraseText] = useState('');
  const [error, setError] = useState('');

  const handlePaste = async () => {
    try {
      // Try modern clipboard API first
      if (navigator.clipboard && navigator.clipboard.readText) {
        const text = await navigator.clipboard.readText();
        setPhraseText(text);
        setError('');
      } else {
        // For browsers that don't support clipboard read
        setError('Please paste manually using Ctrl+V or Cmd+V');
      }
    } catch (error) {
      // Permission denied or other error
      setError('Please paste manually using Ctrl+V or Cmd+V');
    }
  };

  const handleContinue = () => {
    // Clean and split the phrase
    const words = phraseText
      .trim()
      .toLowerCase()
      .split(/\s+/)
      .filter(word => word.length > 0);

    // Validate phrase length (12, 15, 18, 21, or 24 words are standard)
    const validLengths = [12, 15, 18, 21, 24];
    
    if (words.length === 0) {
      setError('Please enter your recovery phrase');
      return;
    }

    if (!validLengths.includes(words.length)) {
      setError(`Recovery phrase must be ${validLengths.join(', ')} words. You entered ${words.length} words.`);
      return;
    }

    setError('');
    onNext(words);
  };

  const wordCount = phraseText.trim().split(/\s+/).filter(word => word.length > 0).length;

  return (
    <div className="w-full max-w-3xl">
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-12 border border-slate-200 dark:border-slate-700">
        {/* Progress indicator */}
        <div className="flex justify-center gap-2 mb-12">
          <div className="w-12 h-1.5 bg-orange-500 rounded-full"></div>
          <div className="w-12 h-1.5 bg-orange-500 rounded-full"></div>
          <div className="w-12 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
        </div>

        <h1 className="text-center text-slate-900 dark:text-white mb-4">
          Import Recovery Phrase
        </h1>
        
        <p className="text-center text-slate-600 dark:text-slate-400 mb-8 max-w-lg mx-auto">
          Enter your secret recovery phrase to restore your wallet
        </p>

        {/* Input Area */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <label className="text-slate-700 dark:text-slate-300">
              Recovery phrase
            </label>
            <Button
              onClick={handlePaste}
              variant="ghost"
              size="sm"
              className="text-orange-600 dark:text-orange-500 hover:text-orange-700 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20"
            >
              <ClipboardPaste className="w-4 h-4 mr-2" />
              Paste
            </Button>
          </div>
          
          <Textarea
            value={phraseText}
            onChange={(e) => {
              setPhraseText(e.target.value);
              setError('');
            }}
            placeholder="Enter your recovery phrase separated by spaces (e.g., word1 word2 word3...)"
            className="min-h-[180px] bg-slate-50 dark:bg-slate-900/50 border-2 border-slate-200 dark:border-slate-700 focus:border-orange-500 dark:focus:border-orange-500 resize-none text-slate-900 dark:text-white"
          />
          
          <div className="flex items-center justify-between mt-2">
            <p className="text-slate-500 dark:text-slate-500">
              Typically 12 or 24 words
            </p>
            {wordCount > 0 && (
              <p className={`${
                [12, 15, 18, 21, 24].includes(wordCount)
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-slate-500 dark:text-slate-500'
              }`}>
                {wordCount} words
              </p>
            )}
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-red-900 dark:text-red-200">
                {error}
              </p>
            </div>
          </div>
        )}

        {/* Warning */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 mb-8">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-500 flex-shrink-0 mt-0.5" />
            <div className="text-blue-900 dark:text-blue-200">
              <p>
                Never share your recovery phrase with anyone. MetaWallet will never ask for it.
              </p>
            </div>
          </div>
        </div>

        <Button
          onClick={handleContinue}
          disabled={wordCount === 0}
          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
