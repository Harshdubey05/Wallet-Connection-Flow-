import { useState } from 'react';
import { OnboardingWelcome } from './components/OnboardingWelcome';
import { CreateImportWallet } from './components/CreateImportWallet';
import { SecretPhrase } from './components/SecretPhrase';
import { ImportPhrase } from './components/ImportPhrase';
import { ConfirmPhrase } from './components/ConfirmPhrase';
import { CreatePassword } from './components/CreatePassword';
import { OnboardingComplete } from './components/OnboardingComplete';
import { Moon, Sun, ArrowLeft } from 'lucide-react';

type Step = 'welcome' | 'create-import' | 'secret-phrase' | 'import-phrase' | 'confirm-phrase' | 'create-password' | 'complete';

export default function App() {
  const [currentStep, setCurrentStep] = useState<Step>('welcome');
  const [stepHistory, setStepHistory] = useState<Step[]>(['welcome']);
  const [darkMode, setDarkMode] = useState(false);
  const [walletType, setWalletType] = useState<'create' | 'import'>('create');
  const [secretPhrase, setSecretPhrase] = useState<string[]>([]);

  const handleNext = (step: Step, data?: any) => {
    if (data?.walletType) {
      setWalletType(data.walletType);
    }
    if (data?.secretPhrase) {
      setSecretPhrase(data.secretPhrase);
    }
    setCurrentStep(step);
    setStepHistory([...stepHistory, step]);
  };

  const handleBack = () => {
    if (stepHistory.length > 1) {
      const newHistory = stepHistory.slice(0, -1);
      setStepHistory(newHistory);
      setCurrentStep(newHistory[newHistory.length - 1]);
    }
  };

  const showBackButton = currentStep !== 'welcome' && currentStep !== 'complete';

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 transition-colors duration-300">
        {/* Back Button */}
        {showBackButton && (
          <button
            onClick={handleBack}
            className="fixed top-6 left-6 p-3 rounded-full bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-all duration-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5 text-slate-700 dark:text-slate-300" />
          </button>
        )}

        {/* Theme Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="fixed top-6 right-6 p-3 rounded-full bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-all duration-200 border border-slate-200 dark:border-slate-700"
          aria-label="Toggle theme"
        >
          {darkMode ? (
            <Sun className="w-5 h-5 text-amber-500" />
          ) : (
            <Moon className="w-5 h-5 text-slate-700" />
          )}
        </button>

        {/* Main Content */}
        <div className="flex items-center justify-center min-h-screen p-8">
          {currentStep === 'welcome' && (
            <OnboardingWelcome onNext={() => handleNext('create-import')} />
          )}
          {currentStep === 'create-import' && (
            <CreateImportWallet
              onNext={(type) => {
                handleNext(type === 'create' ? 'secret-phrase' : 'import-phrase', { walletType: type });
              }}
            />
          )}
          {currentStep === 'secret-phrase' && (
            <SecretPhrase
              onNext={(phrase) => handleNext('confirm-phrase', { secretPhrase: phrase })}
            />
          )}
          {currentStep === 'import-phrase' && (
            <ImportPhrase
              onNext={(phrase) => handleNext('create-password', { secretPhrase: phrase })}
            />
          )}
          {currentStep === 'confirm-phrase' && (
            <ConfirmPhrase
              secretPhrase={secretPhrase}
              onNext={() => handleNext('create-password')}
            />
          )}
          {currentStep === 'create-password' && (
            <CreatePassword
              walletType={walletType}
              onNext={() => handleNext('complete')}
            />
          )}
          {currentStep === 'complete' && (
            <OnboardingComplete />
          )}
        </div>
      </div>
    </div>
  );
}
