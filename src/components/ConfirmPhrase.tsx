import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { AlertCircle } from 'lucide-react';

interface ConfirmPhraseProps {
  secretPhrase: string[];
  onNext: () => void;
}

export function ConfirmPhrase({ secretPhrase, onNext }: ConfirmPhraseProps) {
  const [selectedWords, setSelectedWords] = useState<number[]>([]);
  const [shuffledWords, setShuffledWords] = useState<{ word: string; originalIndex: number }[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Shuffle the words
    const wordsWithIndex = secretPhrase.map((word, index) => ({ word, originalIndex: index }));
    const shuffled = [...wordsWithIndex].sort(() => Math.random() - 0.5);
    setShuffledWords(shuffled);
  }, [secretPhrase]);

  const handleWordClick = (index: number) => {
    if (selectedWords.includes(index)) {
      setSelectedWords(selectedWords.filter(i => i !== index));
    } else {
      setSelectedWords([...selectedWords, index]);
    }
    setError(false);
  };

  const handleVerify = () => {
    // Check if words are selected in correct order
    const isCorrect = selectedWords.every((wordIndex, position) => {
      return shuffledWords[wordIndex].originalIndex === position;
    }) && selectedWords.length === secretPhrase.length;

    if (isCorrect) {
      onNext();
    } else {
      setError(true);
    }
  };

  const getWordPosition = (index: number) => {
    return selectedWords.indexOf(index);
  };

  return (
    <div className="w-full max-w-3xl">
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-12 border border-slate-200 dark:border-slate-700">
        {/* Progress indicator */}
        <div className="flex justify-center gap-2 mb-12">
          <div className="w-12 h-1.5 bg-orange-500 rounded-full"></div>
          <div className="w-12 h-1.5 bg-orange-500 rounded-full"></div>
          <div className="w-12 h-1.5 bg-orange-500 rounded-full"></div>
        </div>

        <h1 className="text-center text-slate-900 dark:text-white mb-4">
          Confirm Recovery Phrase
        </h1>
        
        <p className="text-center text-slate-600 dark:text-slate-400 mb-8 max-w-lg mx-auto">
          Select the words in the correct order to verify you've saved your recovery phrase
        </p>

        {/* Selected words display */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 sm:p-6 bg-slate-50 dark:bg-slate-900/50 rounded-xl border-2 border-slate-200 dark:border-slate-700 mb-8 min-h-[280px] sm:min-h-[280px]">
          {Array.from({ length: 12 }).map((_, index) => {
            const wordIndex = selectedWords[index];
            const hasWord = wordIndex !== undefined;
            
            return (
              <div
                key={index}
                className={`flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg border-2 transition-all duration-200 min-w-0 ${
                  hasWord
                    ? 'bg-white dark:bg-slate-800 border-orange-300 dark:border-orange-600'
                    : 'bg-white/50 dark:bg-slate-800/50 border-dashed border-slate-300 dark:border-slate-600'
                }`}
              >
                <span className="text-slate-400 dark:text-slate-500 min-w-[1.5rem] sm:min-w-[2rem] flex-shrink-0">
                  {index + 1}.
                </span>
                {hasWord && (
                  <span className="text-slate-900 dark:text-white truncate">
                    {shuffledWords[wordIndex].word}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-500 flex-shrink-0" />
              <p className="text-red-900 dark:text-red-200">
                The words are not in the correct order. Please try again.
              </p>
            </div>
          </div>
        )}

        {/* Word selection */}
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-3 mb-8">
          {shuffledWords.map((item, index) => {
            const position = getWordPosition(index);
            const isSelected = position !== -1;
            
            return (
              <button
                key={index}
                onClick={() => handleWordClick(index)}
                className={`relative p-3 sm:p-4 rounded-lg border-2 transition-all duration-200 min-w-0 ${
                  isSelected
                    ? 'bg-orange-50 dark:bg-orange-900/20 border-orange-300 dark:border-orange-700 text-slate-400 dark:text-slate-500'
                    : 'bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white hover:border-orange-300 dark:hover:border-orange-600 hover:shadow-md'
                }`}
              >
                <span className="truncate block">{item.word}</span>
                {isSelected && (
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs">
                    {position + 1}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="flex gap-4">
          <Button
            onClick={() => setSelectedWords([])}
            variant="outline"
            className="flex-1 py-6 border-2 border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700"
          >
            Clear
          </Button>
          <Button
            onClick={handleVerify}
            disabled={selectedWords.length !== 12}
            className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Verify
          </Button>
        </div>
      </div>
    </div>
  );
}
