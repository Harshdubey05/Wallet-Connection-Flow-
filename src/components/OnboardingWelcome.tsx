import { Button } from './ui/button';
import { Wallet, Shield, Zap } from 'lucide-react';

interface OnboardingWelcomeProps {
  onNext: () => void;
}

export function OnboardingWelcome({ onNext }: OnboardingWelcomeProps) {
  return (
    <div className="w-full max-w-2xl">
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-12 border border-slate-200 dark:border-slate-700">
        {/* Logo/Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700 rounded-2xl flex items-center justify-center shadow-lg">
            <Wallet className="w-10 h-10 text-white" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-center text-slate-900 dark:text-white mb-4">
          Welcome to MetaWallet
        </h1>
        
        <p className="text-center text-slate-600 dark:text-slate-400 mb-12 max-w-lg mx-auto">
          Your gateway to the decentralized web. Secure, simple, and powerful.
        </p>

        {/* Features */}
        <div className="space-y-6 mb-12">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-slate-900 dark:text-white mb-1">Bank-level security</h3>
              <p className="text-slate-600 dark:text-slate-400">Your keys, your crypto. Always secure and private.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h3 className="text-slate-900 dark:text-white mb-1">Lightning fast</h3>
              <p className="text-slate-600 dark:text-slate-400">Instant transactions with minimal fees.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
              <Wallet className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="text-slate-900 dark:text-white mb-1">Multi-chain support</h3>
              <p className="text-slate-600 dark:text-slate-400">Access all your favorite networks in one place.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <Button
          onClick={onNext}
          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
        >
          Get Started
        </Button>

        <p className="text-center text-slate-500 dark:text-slate-500 mt-6">
          By continuing, you agree to our Terms of Service
        </p>
      </div>
    </div>
  );
}
