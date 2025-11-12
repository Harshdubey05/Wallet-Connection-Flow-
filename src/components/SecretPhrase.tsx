import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { AlertTriangle, Copy, Eye, EyeOff, CheckCircle2 } from 'lucide-react';

interface SecretPhraseProps {
  onNext: (phrase: string[]) => void;
}

// Generate a mock 12-word phrase with unique words
const generateMockPhrase = (): string[] => {
  const words = [
    'abandon', 'ability', 'able', 'about', 'above', 'absent', 'absorb', 'abstract',
    'absurd', 'abuse', 'access', 'accident', 'account', 'accuse', 'achieve', 'acid',
    'acoustic', 'acquire', 'across', 'act', 'action', 'actor', 'actress', 'actual',
    'adapt', 'add', 'addict', 'address', 'adjust', 'admit', 'adult', 'advance',
    'advice', 'aerobic', 'affair', 'afford', 'afraid', 'again', 'age', 'agent',
    'agree', 'ahead', 'aim', 'air', 'airport', 'aisle', 'alarm', 'album'
  ];
  
  // Shuffle and take first 12 words to ensure uniqueness
  const shuffled = [...words].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 12);
};

export function SecretPhrase({ onNext }: SecretPhraseProps) {
  const [phrase, setPhrase] = useState<string[]>([]);
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setPhrase(generateMockPhrase());
  }, []);

  const handleCopy = async () => {
    try {
      // Try modern clipboard API first
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(phrase.join(' '));
      } else {
        // Fallback method using a temporary textarea
        const textarea = document.createElement('textarea');
        textarea.value = phrase.join(' ');
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      // Even if copy fails, show feedback for demo purposes
      console.log('Phrase to copy:', phrase.join(' '));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleNext = () => {
    if (revealed) {
      onNext(phrase);
    }
  };

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
          Secret Recovery Phrase
        </h1>
        
        <p className="text-center text-slate-600 dark:text-slate-400 mb-8 max-w-lg mx-auto">
          This is the only way to recover your wallet. Keep it safe and never share it with anyone.
        </p>

        {/* Warning */}
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 mb-8">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
            <div className="text-amber-900 dark:text-amber-200">
              <p className="mb-1">Store your recovery phrase securely:</p>
              <ul className="list-disc list-inside space-y-1 text-amber-800 dark:text-amber-300">
                <li>Write it down on paper and store it in a safe place</li>
                <li>Never share it with anyone</li>
                <li>MetaWallet will never ask for your recovery phrase</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Secret Phrase Grid */}
        <div className="relative mb-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 sm:p-6 bg-slate-50 dark:bg-slate-900/50 rounded-xl border-2 border-slate-200 dark:border-slate-700">
            {phrase.map((word, index) => (
              <div
                key={index}
                className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 min-w-0"
              >
                <span className="text-slate-400 dark:text-slate-500 min-w-[1.5rem] sm:min-w-[2rem] flex-shrink-0">
                  {index + 1}.
                </span>
                <span className={`text-slate-900 dark:text-white truncate ${!revealed && 'blur-sm select-none'}`}>
                  {word}
                </span>
              </div>
            ))}
          </div>

          {!revealed && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                onClick={() => setRevealed(true)}
                className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-700 shadow-xl border-2 border-slate-300 dark:border-slate-600 px-8 py-6"
              >
                <Eye className="w-5 h-5 mr-2" />
                Click to reveal
              </Button>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {revealed && (
          <div className="flex gap-4 mb-8">
            <Button
              onClick={handleCopy}
              variant="outline"
              className="flex-1 py-6 border-2 border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-5 h-5 mr-2 text-green-500" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5 mr-2" />
                  Copy to clipboard
                </>
              )}
            </Button>
          </div>
        )}

        <Button
          onClick={handleNext}
          disabled={!revealed}
          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
