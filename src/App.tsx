import { useState } from 'react';
import { WalletConnection } from './components/WalletConnection';
import { NFTMinting } from './components/NFTMinting';
import { Sun, Moon } from 'lucide-react';

export default function App() {
  const [currentFlow, setCurrentFlow] = useState<'wallet' | 'nft'>('wallet');
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleWalletConnected = () => {
    setCurrentFlow('nft');
  };

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 dark:from-slate-950 dark:via-purple-950 dark:to-slate-950 transition-colors duration-500 flex items-center justify-center">
        {/* Theme Toggle */}
        <div className="fixed top-6 right-6 z-50">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-3 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:shadow-lg transition-all duration-300"
          >
            {isDarkMode ? <Sun className="size-5" /> : <Moon className="size-5" />}
          </button>
        </div>

        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto">
            {currentFlow === 'wallet' ? (
              <WalletConnection onConnected={handleWalletConnected} />
            ) : (
              <NFTMinting onBack={() => setCurrentFlow('wallet')} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}