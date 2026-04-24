import { useState, useEffect } from 'react';
import { WalletConnection } from './components/WalletConnection';
import { NFTMinting } from './components/NFTMinting';
import { Sun, Moon } from 'lucide-react';

export default function App() {
  const [currentFlow, setCurrentFlow] = useState<'wallet' | 'nft'>('wallet');
  // Enforce dark mode as the default for the ultra-premium feel, though toggle remains.
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleWalletConnected = () => {
    setCurrentFlow('nft');
  };

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden transition-colors duration-500 bg-slate-50 dark:bg-[#0a0a0c]">
        {/* Animated Background Gradients */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 -left-1/4 w-[150%] h-[150%] bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950/0 to-transparent dark:from-purple-900/20 dark:via-[#0a0a0c]/0 animate-gradient-shift" />
          <div className="absolute bottom-0 -right-1/4 w-[150%] h-[150%] bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-950/0 to-transparent dark:from-blue-900/20 dark:via-[#0a0a0c]/0 animate-gradient-shift" style={{ animationDelay: '4s' }} />
        </div>
        
        {/* subtle noise texture overlay could go here, but a very faint radial gradient works for depth */}
        <div className="absolute inset-0 bg-slate-900/5 dark:bg-black/40 backdrop-blur-[100px] pointer-events-none z-0" />

        {/* Theme Toggle */}
        <div className="fixed top-6 right-6 z-50">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-3 rounded-full bg-white/10 dark:bg-slate-800/30 backdrop-blur-md border border-white/20 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-white/20 dark:hover:bg-slate-800/50 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300 active:scale-95"
            title="Toggle Theme"
          >
            {isDarkMode ? <Sun className="size-5" /> : <Moon className="size-5" />}
          </button>
        </div>

        <div className="container relative z-10 mx-auto px-4 py-16">
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