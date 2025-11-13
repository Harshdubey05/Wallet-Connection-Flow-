import { useState } from 'react';
import { Wallet, CheckCircle2, Loader2, Shield, ArrowRight, Sparkles } from 'lucide-react';

type Screen = 'welcome' | 'selection' | 'connecting' | 'success';

const wallets = [
  { 
    id: 'metamask', 
    name: 'MetaMask', 
    icon: '🦊',
    description: 'Connect using browser extension'
  },
  { 
    id: 'walletconnect', 
    name: 'WalletConnect', 
    icon: '🔗',
    description: 'Scan with your mobile wallet'
  },
  { 
    id: 'coinbase', 
    name: 'Coinbase Wallet', 
    icon: '🔵',
    description: 'Connect to Coinbase Wallet'
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

    // Simulate connection
    setTimeout(() => {
      setScreen('success');
    }, 2500);
  };

  return (
    <div className="relative">
      {/* Welcome Screen */}
      <div
        className={`transition-all duration-500 ${
          screen === 'welcome' ? 'opacity-100 scale-100' : 'opacity-0 scale-95 absolute inset-0 pointer-events-none'
        }`}
      >
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-purple-500/10 dark:shadow-purple-500/20 border border-slate-200/50 dark:border-slate-700/50 p-10 transition-colors duration-300">
          {/* Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-3xl blur-2xl opacity-30 animate-pulse" />
              <div className="relative p-6 bg-gradient-to-br from-purple-500 to-blue-500 rounded-3xl shadow-xl">
                <Wallet className="size-12 text-white" />
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-center text-slate-900 dark:text-white mb-3 transition-colors duration-300">
            Welcome to Web3
          </h1>
          <p className="text-center text-slate-600 dark:text-slate-400 mb-8 transition-colors duration-300">
            Securely connect your wallet to continue.
          </p>

          {/* Trust Indicators */}
          <div className="flex items-center justify-center gap-2 mb-8 text-slate-500 dark:text-slate-500">
            <Shield className="size-4" />
            <span className="text-sm">Secure & Encrypted</span>
          </div>

          {/* CTA Button */}
          <button
            onClick={() => setScreen('selection')}
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
            className="relative w-full group"
          >
            <div
              className={`absolute -inset-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-all duration-300 ${
                isButtonHovered ? 'opacity-75' : ''
              }`}
            />
            <div
              className={`relative px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl text-white shadow-lg transition-all duration-300 ${
                isButtonHovered ? 'shadow-2xl shadow-purple-500/50 -translate-y-0.5' : 'shadow-purple-500/30'
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                Connect Wallet
                <ArrowRight className={`size-5 transition-transform duration-300 ${isButtonHovered ? 'translate-x-1' : ''}`} />
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Wallet Selection Screen */}
      <div
        className={`transition-all duration-500 ${
          screen === 'selection' ? 'opacity-100 scale-100' : 'opacity-0 scale-95 absolute inset-0 pointer-events-none'
        }`}
      >
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-purple-500/10 dark:shadow-purple-500/20 border border-slate-200/50 dark:border-slate-700/50 p-10 transition-colors duration-300">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-2xl mb-4 transition-colors duration-300">
              <Wallet className="size-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h2 className="text-slate-900 dark:text-white mb-2 transition-colors duration-300">Choose Your Wallet</h2>
            <p className="text-slate-600 dark:text-slate-400 transition-colors duration-300">
              Select a wallet to connect securely
            </p>
          </div>

          {/* Wallet Options */}
          <div className="space-y-3 mb-6">
            {wallets.map((wallet) => (
              <button
                key={wallet.id}
                onClick={() => connectWallet(wallet.id)}
                onMouseEnter={() => setHoveredWallet(wallet.id)}
                onMouseLeave={() => setHoveredWallet(null)}
                className="w-full group"
              >
                <div className="relative">
                  <div
                    className={`absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl opacity-0 transition-all duration-300 blur ${
                      hoveredWallet === wallet.id ? 'opacity-30' : ''
                    }`}
                  />
                  <div
                    className={`relative flex items-center gap-4 p-5 rounded-2xl border transition-all duration-300 ${
                      hoveredWallet === wallet.id
                        ? 'bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-purple-300 dark:border-purple-600 shadow-lg shadow-purple-500/10 -translate-y-0.5'
                        : 'bg-slate-50/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-center w-12 h-12 bg-white dark:bg-slate-800 rounded-xl shadow-sm transition-colors duration-300">
                      <span className="text-2xl">{wallet.icon}</span>
                    </div>
                    <div className="flex-1 text-left">
                      <div className="text-slate-900 dark:text-white transition-colors duration-300">
                        {wallet.name}
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400 transition-colors duration-300">
                        {wallet.description}
                      </div>
                    </div>
                    <ArrowRight
                      className={`size-5 text-slate-400 transition-all duration-300 ${
                        hoveredWallet === wallet.id ? 'text-purple-500 translate-x-1' : ''
                      }`}
                    />
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Back Button */}
          <button
            onClick={() => setScreen('welcome')}
            className="w-full py-3 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-300"
          >
            Back
          </button>
        </div>
      </div>

      {/* MetaMask Popup Simulation (Connecting) */}
      <div
        className={`transition-all duration-500 ${
          screen === 'connecting' ? 'opacity-100 scale-100' : 'opacity-0 scale-95 absolute inset-0 pointer-events-none'
        }`}
      >
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-purple-500/10 dark:shadow-purple-500/20 border border-slate-200/50 dark:border-slate-700/50 p-10 transition-colors duration-300">
          {/* Mock MetaMask Header */}
          <div className="flex items-center gap-3 pb-6 mb-6 border-b border-slate-200 dark:border-slate-700 transition-colors duration-300">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-xl">🦊</span>
            </div>
            <div>
              <div className="text-slate-900 dark:text-white transition-colors duration-300">MetaMask</div>
              <div className="text-sm text-slate-500 dark:text-slate-400 transition-colors duration-300">Wallet Extension</div>
            </div>
          </div>

          {/* Connecting State */}
          <div className="text-center py-8">
            <div className="relative inline-flex items-center justify-center mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-xl opacity-30 animate-pulse" />
              <Loader2 className="relative size-16 text-purple-500 animate-spin" />
            </div>
            <h3 className="text-slate-900 dark:text-white mb-2 transition-colors duration-300">
              Connecting...
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-8 transition-colors duration-300">
              Please confirm in your wallet
            </p>

            {/* Connection Steps */}
            <div className="space-y-3 max-w-xs mx-auto">
              {['Requesting connection...', 'Verifying signature...', 'Establishing secure link...'].map(
                (text, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl transition-colors duration-300"
                  >
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                    <span className="text-sm text-slate-600 dark:text-slate-400 transition-colors duration-300">
                      {text}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Success Screen */}
      <div
        className={`transition-all duration-500 ${
          screen === 'success' ? 'opacity-100 scale-100' : 'opacity-0 scale-95 absolute inset-0 pointer-events-none'
        }`}
      >
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-purple-500/10 dark:shadow-purple-500/20 border border-slate-200/50 dark:border-slate-700/50 p-10 transition-colors duration-300">
          {/* Success Animation */}
          <div className="text-center mb-8">
            <div className="relative inline-flex items-center justify-center mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full blur-2xl opacity-30 animate-pulse" />
              <div className="relative w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-xl">
                <CheckCircle2 className="size-10 text-white" />
              </div>
            </div>
            <h2 className="text-slate-900 dark:text-white mb-3 transition-colors duration-300">
              Wallet Connected! ✅
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8 transition-colors duration-300">
              You're ready to explore Web3.
            </p>

            {/* Connected Wallet Info */}
            <div className="bg-gradient-to-br from-slate-50 to-purple-50/50 dark:from-slate-800/50 dark:to-purple-900/10 rounded-2xl p-6 mb-8 border border-slate-200 dark:border-slate-700 transition-colors duration-300">
              <div className="flex items-center justify-center gap-2 mb-3">
                <span className="text-2xl">🦊</span>
                <span className="text-slate-900 dark:text-white transition-colors duration-300">MetaMask</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors duration-300">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <code className="text-sm text-purple-600 dark:text-purple-400 transition-colors duration-300">
                  0x742d...8f3c
                </code>
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <button
            onClick={onConnected}
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
            className="relative w-full group mb-3"
          >
            <div
              className={`absolute -inset-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-all duration-300 ${
                isButtonHovered ? 'opacity-75' : ''
              }`}
            />
            <div
              className={`relative px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl text-white shadow-lg transition-all duration-300 ${
                isButtonHovered ? 'shadow-2xl shadow-purple-500/50 -translate-y-0.5' : 'shadow-purple-500/30'
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                Continue
                <Sparkles className={`size-5 transition-transform duration-300 ${isButtonHovered ? 'rotate-12 scale-110' : ''}`} />
              </span>
            </div>
          </button>

          <button
            onClick={() => setScreen('welcome')}
            className="w-full py-3 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-300"
          >
            Disconnect
          </button>
        </div>
      </div>
    </div>
  );
}
