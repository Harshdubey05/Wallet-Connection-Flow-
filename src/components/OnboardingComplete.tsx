import { Button } from './ui/button';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export function OnboardingComplete() {
  return (
    <div className="w-full max-w-2xl">
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-12 border border-slate-200 dark:border-slate-700">
        {/* Success Icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 dark:from-green-600 dark:to-green-700 rounded-full flex items-center justify-center shadow-lg">
              <CheckCircle2 className="w-12 h-12 text-white" />
            </div>
            <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20"></div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-center text-slate-900 dark:text-white mb-4">
          You're all set!
        </h1>
        
        <p className="text-center text-slate-600 dark:text-slate-400 mb-12 max-w-md mx-auto">
          Your wallet has been created successfully. You can now start exploring the decentralized web.
        </p>

        {/* Next Steps */}
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-2xl p-8 mb-8 border border-orange-200 dark:border-orange-700">
          <h3 className="text-slate-900 dark:text-white mb-4">What's next?</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-orange-500 dark:bg-orange-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white">1</span>
              </div>
              <div>
                <p className="text-slate-900 dark:text-white">Secure your wallet</p>
                <p className="text-slate-600 dark:text-slate-400">Make sure you've backed up your recovery phrase</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-orange-500 dark:bg-orange-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white">2</span>
              </div>
              <div>
                <p className="text-slate-900 dark:text-white">Add funds</p>
                <p className="text-slate-600 dark:text-slate-400">Transfer crypto to your new wallet address</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-orange-500 dark:bg-orange-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white">3</span>
              </div>
              <div>
                <p className="text-slate-900 dark:text-white">Explore Web3</p>
                <p className="text-slate-600 dark:text-slate-400">Connect to dApps and start your Web3 journey</p>
              </div>
            </li>
          </ul>
        </div>

        <Button
          onClick={() => window.location.reload()}
          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
        >
          Open Wallet
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
}
