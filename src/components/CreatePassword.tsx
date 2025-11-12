import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Checkbox } from './ui/checkbox';
import { Eye, EyeOff, Check, X } from 'lucide-react';

interface CreatePasswordProps {
  walletType: 'create' | 'import';
  onNext: () => void;
}

export function CreatePassword({ walletType, onNext }: CreatePasswordProps) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const hasMinLength = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const passwordsMatch = password === confirmPassword && confirmPassword.length > 0;

  const isValid = hasMinLength && hasNumber && hasSpecialChar && passwordsMatch && agreedToTerms;

  return (
    <div className="w-full max-w-2xl">
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-12 border border-slate-200 dark:border-slate-700">
        {/* Progress indicator */}
        <div className="flex justify-center gap-2 mb-12">
          <div className="w-12 h-1.5 bg-orange-500 rounded-full"></div>
          <div className="w-12 h-1.5 bg-orange-500 rounded-full"></div>
          <div className="w-12 h-1.5 bg-orange-500 rounded-full"></div>
        </div>

        <h1 className="text-center text-slate-900 dark:text-white mb-4">
          Create a Password
        </h1>
        
        <p className="text-center text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto">
          This password will unlock your wallet on this device
        </p>

        {/* Password Input */}
        <div className="space-y-6 mb-8">
          <div>
            <label className="block text-slate-700 dark:text-slate-300 mb-2">
              New password
            </label>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pr-12 py-6 bg-slate-50 dark:bg-slate-900/50 border-2 border-slate-200 dark:border-slate-700 focus:border-orange-500 dark:focus:border-orange-500 text-slate-900 dark:text-white"
                placeholder="Enter password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-slate-700 dark:text-slate-300 mb-2">
              Confirm password
            </label>
            <div className="relative">
              <Input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pr-12 py-6 bg-slate-50 dark:bg-slate-900/50 border-2 border-slate-200 dark:border-slate-700 focus:border-orange-500 dark:focus:border-orange-500 text-slate-900 dark:text-white"
                placeholder="Confirm password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Password Requirements */}
        <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-6 mb-8 border border-slate-200 dark:border-slate-700">
          <p className="text-slate-700 dark:text-slate-300 mb-3">Password must contain:</p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              {hasMinLength ? (
                <Check className="w-5 h-5 text-green-500" />
              ) : (
                <X className="w-5 h-5 text-slate-400" />
              )}
              <span className={hasMinLength ? 'text-green-600 dark:text-green-400' : 'text-slate-600 dark:text-slate-400'}>
                At least 8 characters
              </span>
            </div>
            <div className="flex items-center gap-2">
              {hasNumber ? (
                <Check className="w-5 h-5 text-green-500" />
              ) : (
                <X className="w-5 h-5 text-slate-400" />
              )}
              <span className={hasNumber ? 'text-green-600 dark:text-green-400' : 'text-slate-600 dark:text-slate-400'}>
                At least one number
              </span>
            </div>
            <div className="flex items-center gap-2">
              {hasSpecialChar ? (
                <Check className="w-5 h-5 text-green-500" />
              ) : (
                <X className="w-5 h-5 text-slate-400" />
              )}
              <span className={hasSpecialChar ? 'text-green-600 dark:text-green-400' : 'text-slate-600 dark:text-slate-400'}>
                At least one special character
              </span>
            </div>
            <div className="flex items-center gap-2">
              {passwordsMatch ? (
                <Check className="w-5 h-5 text-green-500" />
              ) : (
                <X className="w-5 h-5 text-slate-400" />
              )}
              <span className={passwordsMatch ? 'text-green-600 dark:text-green-400' : 'text-slate-600 dark:text-slate-400'}>
                Passwords match
              </span>
            </div>
          </div>
        </div>

        {/* Terms Checkbox */}
        <div className="flex items-start gap-3 mb-8">
          <Checkbox
            id="terms"
            checked={agreedToTerms}
            onCheckedChange={(checked) => setAgreedToTerms(checked === true)}
            className="mt-1"
          />
          <label
            htmlFor="terms"
            className="text-slate-600 dark:text-slate-400 cursor-pointer"
          >
            I understand that MetaWallet cannot recover this password for me.{' '}
            <a href="#" className="text-orange-600 dark:text-orange-500 hover:underline">
              Learn more
            </a>
          </label>
        </div>

        <Button
          onClick={onNext}
          disabled={!isValid}
          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {walletType === 'create' ? 'Create Wallet' : 'Import Wallet'}
        </Button>
      </div>
    </div>
  );
}
