import { Button } from './ui/button';
import { Plus, Download, ArrowRight } from 'lucide-react';

interface CreateImportWalletProps {
  onNext: (type: 'create' | 'import') => void;
}

export function CreateImportWallet({ onNext }: CreateImportWalletProps) {
  return (
    <div className="w-full max-w-2xl">
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-12 border border-slate-200 dark:border-slate-700">
        {/* Progress indicator */}
        <div className="flex justify-center gap-2 mb-12">
          <div className="w-12 h-1.5 bg-orange-500 rounded-full"></div>
          <div className="w-12 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
          <div className="w-12 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
        </div>

        <h1 className="text-center text-slate-900 dark:text-white mb-4">
          Let's get started
        </h1>
        
        <p className="text-center text-slate-600 dark:text-slate-400 mb-12 max-w-md mx-auto">
          Choose how you'd like to set up your wallet
        </p>

        {/* Options */}
        <div className="space-y-4 mb-8">
          <button
            onClick={() => onNext('create')}
            className="w-full p-8 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-2 border-orange-200 dark:border-orange-700 rounded-2xl hover:shadow-lg hover:border-orange-300 dark:hover:border-orange-600 transition-all duration-200 group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-orange-500 dark:bg-orange-600 rounded-xl flex items-center justify-center shadow-md">
                  <Plus className="w-7 h-7 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="text-slate-900 dark:text-white mb-1">Create a new wallet</h3>
                  <p className="text-slate-600 dark:text-slate-400">Set up a new wallet with a secret recovery phrase</p>
                </div>
              </div>
              <ArrowRight className="w-6 h-6 text-slate-400 dark:text-slate-500 group-hover:text-orange-500 dark:group-hover:text-orange-400 group-hover:translate-x-1 transition-all duration-200" />
            </div>
          </button>

          <button
            onClick={() => onNext('import')}
            className="w-full p-8 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-2 border-orange-200 dark:border-orange-700 rounded-2xl hover:shadow-lg hover:border-orange-300 dark:hover:border-orange-600 transition-all duration-200 group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-orange-500 dark:bg-orange-600 rounded-xl flex items-center justify-center shadow-md">
                  <Download className="w-7 h-7 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="text-slate-900 dark:text-white mb-1">Import existing wallet</h3>
                  <p className="text-slate-600 dark:text-slate-400">Restore your wallet using a recovery phrase</p>
                </div>
              </div>
              <ArrowRight className="w-6 h-6 text-slate-400 dark:text-slate-500 group-hover:text-orange-500 dark:group-hover:text-orange-400 group-hover:translate-x-1 transition-all duration-200" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
