import { useState, useEffect } from 'react';
import { Wallet, CheckCircle2, Loader2, Shield, ArrowRight, Sparkles, XCircle, ChevronRight, Lock, ExternalLink, ShieldCheck, AlertCircle } from 'lucide-react';

type Screen = 'welcome' | 'selection' | 'connecting' | 'signature' | 'success' | 'error';

const wallets = [
  { 
    id: 'metamask', 
    name: 'MetaMask', 
    icon: '🦊',
    description: 'Connect using browser extension',
    color: 'from-orange-500/20 to-orange-500/5',
    borderHover: 'group-hover:border-orange-500/50'
  },
  { 
    id: 'walletconnect', 
    name: 'WalletConnect', 
    icon: '🔗',
    description: 'Scan with your mobile wallet',
    color: 'from-blue-500/20 to-blue-500/5',
    borderHover: 'group-hover:border-blue-500/50'
  },
  { 
    id: 'coinbase', 
    name: 'Coinbase Wallet', 
    icon: '🔵',
    description: 'Connect to Coinbase Wallet',
    color: 'from-blue-600/20 to-blue-600/5',
    borderHover: 'group-hover:border-blue-600/50'
  },
];

interface WalletConnectionProps {
  onConnected: () => void;
}

export function WalletConnection({ onConnected }: WalletConnectionProps) {
  const [screen, setScreen] = useState<Screen>('welcome');
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [hoveredWallet, setHoveredWallet] = useState<string | null>(null);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const connectWallet = (walletId: string) => {
    setSelectedWallet(walletId);
    setScreen('connecting');

    // Simulate connection to wallet extension
    setTimeout(() => {
      setScreen('signature');
    }, 2000);
  };

  const signMessage = (success: boolean) => {
    if (success) {
      setScreen('success');
    } else {
      setScreen('error');
    }
  };

  const resetFlow = () => {
    setScreen('selection');
    setSelectedWallet(null);
  };

  // Apple-inspired premium base container classes
  const containerClasses = "bg-white/70 dark:bg-[#0f0f13]/80 backdrop-blur-3xl rounded-[2.5rem] shadow-2xl shadow-purple-500/5 dark:shadow-black/50 border border-white/40 dark:border-white/10 p-10 transition-all duration-500 relative overflow-hidden";

  return (
    <div className="relative w-full max-w-md mx-auto perspective-1000">
      
      {/* Welcome Screen */}
      <div className={`transition-all duration-700 absolute inset-0 ${screen === 'welcome' ? 'opacity-100 scale-100 relative z-10 translate-y-0' : 'opacity-0 scale-95 pointer-events-none -translate-y-4'}`}>
        <div className={containerClasses}>
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/50 dark:via-white/20 to-transparent" />
          
          <div className="flex justify-center mb-8">
            <div className="relative group">
              <div className="absolute inset-0 bg-blue-500 dark:bg-blue-600 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 animate-pulse" />
              <div className="relative w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-3xl shadow-xl flex items-center justify-center border border-white/50 dark:border-white/10">
                <Wallet className="size-10 text-slate-800 dark:text-white" />
              </div>
            </div>
          </div>

          <h1 className="text-center text-3xl font-semibold tracking-tight text-slate-900 dark:text-white mb-3">
            Connect Your Wallet
          </h1>
          <p className="text-center text-slate-600 dark:text-slate-400 mb-10 leading-relaxed text-sm">
            Securely access your assets and start interacting with Web3.
          </p>

          <div className="flex items-center justify-center gap-2 mb-10 px-4 py-2 bg-green-500/10 dark:bg-green-500/10 rounded-full w-max mx-auto border border-green-500/20">
            <ShieldCheck className="size-4 text-green-600 dark:text-green-400" />
            <span className="text-xs font-medium text-green-700 dark:text-green-400">Secure connection</span>
          </div>

          <button
            onClick={() => setScreen('selection')}
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
            className="relative w-full group active:scale-[0.98] transition-transform duration-200"
          >
            <div className={`absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-100 blur-md transition-all duration-500`} />
            <div className="relative px-8 py-4 bg-slate-900 dark:bg-white rounded-2xl text-white dark:text-slate-900 shadow-[0_0_0_1px_rgba(255,255,255,0.1)_inset] transition-all duration-300">
              <span className="flex items-center justify-center gap-2 font-medium">
                Connect Wallet
                <ArrowRight className={`size-4 transition-transform duration-300 ${isButtonHovered ? 'translate-x-1' : ''}`} />
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Wallet Selection Screen */}
      <div className={`transition-all duration-700 absolute inset-0 ${screen === 'selection' ? 'opacity-100 scale-100 relative z-10 translate-y-0' : 'opacity-0 scale-95 pointer-events-none -translate-y-4'}`}>
        <div className={containerClasses}>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white mb-2">Select Wallet</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              Choose how you want to connect
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {wallets.map((wallet) => (
              <button
                key={wallet.id}
                onClick={() => connectWallet(wallet.id)}
                onMouseEnter={() => setHoveredWallet(wallet.id)}
                onMouseLeave={() => setHoveredWallet(null)}
                className="w-full group active:scale-[0.98] transition-transform duration-200 text-left"
              >
                <div className={`relative flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 overflow-hidden ${
                  hoveredWallet === wallet.id
                    ? `bg-slate-50 dark:bg-slate-800/80 border-transparent shadow-lg ${wallet.borderHover} dark:${wallet.borderHover}`
                    : 'bg-white/50 dark:bg-slate-900/50 border-slate-200/50 dark:border-white/5'
                }`}>
                  {/* Subtle gradient background on hover based on wallet brand */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${wallet.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  <div className="relative flex items-center justify-center w-12 h-12 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-white/5 transition-colors duration-300 grayscale group-hover:grayscale-0">
                    <span className="text-2xl">{wallet.icon}</span>
                  </div>
                  <div className="relative flex-1">
                    <div className="font-medium text-slate-900 dark:text-white transition-colors duration-300">
                      {wallet.name}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 transition-colors duration-300 mt-0.5">
                      {wallet.description}
                    </div>
                  </div>
                  <ChevronRight className={`relative size-5 text-slate-300 dark:text-slate-600 transition-all duration-300 group-hover:text-slate-900 dark:group-hover:text-white group-hover:translate-x-1`} />
                </div>
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between text-sm border-t border-slate-200/50 dark:border-white/10 pt-6">
            <button onClick={() => setScreen('welcome')} className="text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
              Back
            </button>
            <a href="#" className="flex items-center gap-1 text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              What is a wallet? <ExternalLink className="size-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Connecting State */}
      <div className={`transition-all duration-700 absolute inset-0 ${screen === 'connecting' ? 'opacity-100 scale-100 relative z-10 translate-y-0' : 'opacity-0 scale-95 pointer-events-none -translate-y-4'}`}>
        <div className={containerClasses}>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="relative mb-10">
              <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-pulse-ring" />
              <div className="relative w-24 h-24 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center border border-slate-200 dark:border-white/10 shadow-inner">
                <span className="text-4xl animate-pulse">
                  {wallets.find(w => w.id === selectedWallet)?.icon || '🦊'}
                </span>
              </div>
            </div>
            <h3 className="text-xl font-medium text-slate-900 dark:text-white mb-2">
              Connecting securely...
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              Please confirm in your wallet
            </p>
          </div>
        </div>
      </div>

      {/* Signature Request Screen */}
      <div className={`transition-all duration-700 absolute inset-0 ${screen === 'signature' ? 'opacity-100 scale-100 relative z-10 translate-y-0' : 'opacity-0 scale-95 pointer-events-none -translate-y-4'}`}>
        <div className={containerClasses}>
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-500/10 rounded-full mb-4">
              <Lock className="size-5 text-purple-600 dark:text-purple-400" />
            </div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white mb-2">Verify Identity</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm px-4">
              We never access your funds without permission. Please sign the message to continue.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900/80 rounded-2xl p-4 mb-8 border border-slate-200/80 dark:border-white/5">
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-200 dark:border-white/5">
              <span className="text-xs text-slate-500">Wallet</span>
              <span className="text-sm font-medium text-slate-900 dark:text-white flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                0x742d...8f3c
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-500">Network</span>
              <span className="text-sm font-medium text-slate-900 dark:text-white bg-slate-200/50 dark:bg-slate-800 px-2.5 py-1 rounded-md">
                Ethereum
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => signMessage(false)}
              className="py-3.5 px-4 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors active:scale-[0.98]"
            >
              Cancel
            </button>
            <button
              onClick={() => signMessage(true)}
              className="py-3.5 px-4 rounded-xl text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 transition-colors shadow-lg active:scale-[0.98]"
            >
              Sign Message
            </button>
          </div>
        </div>
      </div>

      {/* Success Screen */}
      <div className={`transition-all duration-700 absolute inset-0 ${screen === 'success' ? 'opacity-100 scale-100 relative z-10 translate-y-0' : 'opacity-0 scale-95 pointer-events-none -translate-y-4'}`}>
        <div className={containerClasses}>
          <div className="text-center py-6">
            <div className="relative inline-flex items-center justify-center mb-8">
              <div className="absolute inset-0 bg-green-500/20 rounded-full blur-2xl animate-glow-burst" />
              <div className="relative w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-[2rem] flex items-center justify-center shadow-xl rotate-3">
                <CheckCircle2 className="size-12 text-white" />
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white mb-2">
              Connected
            </h2>
            
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-50 dark:bg-slate-800/80 rounded-full border border-slate-200 dark:border-white/10 mb-8">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 shadow-sm" />
              <code className="text-sm font-medium text-slate-900 dark:text-white">
                0x742d...8f3c
              </code>
            </div>

            <button
              onClick={onConnected}
              className="w-full py-4 rounded-2xl text-white dark:text-slate-900 bg-slate-900 dark:bg-white font-medium shadow-lg hover:shadow-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 group"
            >
              Continue to Dashboard
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Error Screen */}
      <div className={`transition-all duration-700 absolute inset-0 ${screen === 'error' ? 'opacity-100 scale-100 relative z-10 translate-y-0 animate-shake' : 'opacity-0 scale-95 pointer-events-none -translate-y-4'}`}>
        <div className={containerClasses}>
          <div className="text-center py-6">
            <div className="relative inline-flex items-center justify-center w-20 h-20 bg-red-500/10 rounded-3xl mb-6 border border-red-500/20">
              <XCircle className="size-10 text-red-500" />
            </div>
            
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white mb-3">
              Connection Failed
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-8 px-4 leading-relaxed">
              We couldn't connect to your wallet. You may have rejected the request or there's a network issue.
            </p>

            <div className="space-y-3">
              <button
                onClick={resetFlow}
                className="w-full py-4 rounded-2xl text-white bg-red-500 hover:bg-red-600 font-medium shadow-lg shadow-red-500/20 transition-all active:scale-[0.98]"
              >
                Try Again
              </button>
              <button
                onClick={() => setScreen('welcome')}
                className="w-full py-3.5 rounded-2xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
            
            <div className="mt-6 pt-6 border-t border-slate-200/50 dark:border-white/10">
              <button className="flex items-center justify-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors w-full">
                <AlertCircle className="size-4" />
                Switch Network
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
