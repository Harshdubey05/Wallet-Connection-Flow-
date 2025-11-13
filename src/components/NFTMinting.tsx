import { useState, useRef } from 'react';
import { Upload, CheckCircle2, Loader2, FileImage, Sparkles, ArrowLeft, Image as ImageIcon } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

type MintStep = 'upload' | 'metadata' | 'minting' | 'success';

interface NFTMintingProps {
  onBack: () => void;
}

export function NFTMinting({ onBack }: NFTMintingProps) {
  const [step, setStep] = useState<MintStep>('upload');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [nftName, setNftName] = useState('');
  const [nftDescription, setNftDescription] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
        setStep('metadata');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  const mintNFT = () => {
    setStep('minting');
    setTimeout(() => {
      setStep('success');
    }, 3000);
  };

  const reset = () => {
    setStep('upload');
    setImagePreview(null);
    setNftName('');
    setNftDescription('');
  };

  return (
    <div className="relative">
      {/* Upload Step */}
      <div
        className={`transition-all duration-500 ${
          step === 'upload' ? 'opacity-100 scale-100' : 'opacity-0 scale-95 absolute inset-0 pointer-events-none'
        }`}
      >
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-purple-500/10 dark:shadow-purple-500/20 border border-slate-200/50 dark:border-slate-700/50 p-10 transition-colors duration-300">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-2xl mb-4 transition-colors duration-300">
              <Sparkles className="size-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h2 className="text-slate-900 dark:text-white mb-2 transition-colors duration-300">
              Mint Your NFT
            </h2>
            <p className="text-slate-600 dark:text-slate-400 transition-colors duration-300">
              Upload your artwork to begin
            </p>
          </div>

          {/* Upload Area */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
          />
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 mb-6 ${
              isDragging
                ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 shadow-lg shadow-purple-500/20'
                : 'border-slate-300 dark:border-slate-700 hover:border-purple-400 dark:hover:border-purple-600 hover:bg-slate-50 dark:hover:bg-slate-800/30'
            }`}
          >
            <div className={`transition-all duration-300 ${isDragging ? 'scale-110' : ''}`}>
              <Upload
                className={`size-12 mx-auto mb-4 transition-colors duration-300 ${
                  isDragging ? 'text-purple-500' : 'text-slate-400 dark:text-slate-500'
                }`}
              />
              <h3 className="text-slate-900 dark:text-white mb-2 transition-colors duration-300">
                Drop your image here
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-1 transition-colors duration-300">
                or click to browse
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-500 transition-colors duration-300">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
          </div>

          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-300"
          >
            <ArrowLeft className="size-4" />
            Back to Wallet
          </button>
        </div>
      </div>

      {/* Metadata Step */}
      <div
        className={`transition-all duration-500 ${
          step === 'metadata' ? 'opacity-100 scale-100' : 'opacity-0 scale-95 absolute inset-0 pointer-events-none'
        }`}
      >
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-purple-500/10 dark:shadow-purple-500/20 border border-slate-200/50 dark:border-slate-700/50 p-10 transition-colors duration-300">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-2xl mb-4 transition-colors duration-300">
              <FileImage className="size-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h2 className="text-slate-900 dark:text-white mb-2 transition-colors duration-300">
              Add Details
            </h2>
            <p className="text-slate-600 dark:text-slate-400 transition-colors duration-300">
              Give your NFT a name and description
            </p>
          </div>

          {/* Image Preview */}
          <div className="mb-6">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors duration-300">
              {imagePreview && (
                <ImageWithFallback
                  src={imagePreview}
                  alt="NFT preview"
                  className="w-full h-full object-cover"
                />
              )}
              <button
                onClick={() => setStep('upload')}
                className="absolute top-3 right-3 px-3 py-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-lg text-sm text-purple-600 dark:text-purple-400 hover:bg-white dark:hover:bg-slate-900 transition-all duration-300 border border-slate-200 dark:border-slate-700"
              >
                Change
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-slate-700 dark:text-slate-300 mb-2 transition-colors duration-300">
                Name
              </label>
              <input
                type="text"
                value={nftName}
                onChange={(e) => setNftName(e.target.value)}
                placeholder="My Awesome NFT"
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
              />
            </div>
            <div>
              <label className="block text-slate-700 dark:text-slate-300 mb-2 transition-colors duration-300">
                Description
              </label>
              <textarea
                value={nftDescription}
                onChange={(e) => setNftDescription(e.target.value)}
                placeholder="Describe your NFT..."
                rows={4}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 resize-none"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={mintNFT}
              disabled={!nftName}
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
              className="relative w-full group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div
                className={`absolute -inset-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-all duration-300 ${
                  isButtonHovered && nftName ? 'opacity-75' : ''
                }`}
              />
              <div
                className={`relative px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl text-white shadow-lg transition-all duration-300 ${
                  isButtonHovered && nftName ? 'shadow-2xl shadow-purple-500/50 -translate-y-0.5' : 'shadow-purple-500/30'
                }`}
              >
                <span className="flex items-center justify-center gap-2">
                  Mint NFT
                  <Sparkles className="size-5" />
                </span>
              </div>
            </button>

            <button
              onClick={() => setStep('upload')}
              className="w-full py-3 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-300"
            >
              Back
            </button>
          </div>
        </div>
      </div>

      {/* Minting Step */}
      <div
        className={`transition-all duration-500 ${
          step === 'minting' ? 'opacity-100 scale-100' : 'opacity-0 scale-95 absolute inset-0 pointer-events-none'
        }`}
      >
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-purple-500/10 dark:shadow-purple-500/20 border border-slate-200/50 dark:border-slate-700/50 p-10 transition-colors duration-300">
          <div className="text-center py-8">
            <div className="relative inline-flex items-center justify-center mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-xl opacity-30 animate-pulse" />
              <Loader2 className="relative size-16 text-purple-500 animate-spin" />
            </div>
            <h3 className="text-slate-900 dark:text-white mb-2 transition-colors duration-300">
              Minting in Progress...
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-8 transition-colors duration-300">
              Please confirm the transaction in your wallet
            </p>

            {/* Minting Steps */}
            <div className="space-y-3 max-w-xs mx-auto">
              {[
                'Uploading to IPFS...',
                'Creating metadata...',
                'Broadcasting transaction...',
              ].map((text, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl transition-colors duration-300"
                >
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                  <span className="text-sm text-slate-600 dark:text-slate-400 transition-colors duration-300">
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Success Step */}
      <div
        className={`transition-all duration-500 ${
          step === 'success' ? 'opacity-100 scale-100' : 'opacity-0 scale-95 absolute inset-0 pointer-events-none'
        }`}
      >
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-purple-500/10 dark:shadow-purple-500/20 border border-slate-200/50 dark:border-slate-700/50 p-10 transition-colors duration-300">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="relative inline-flex items-center justify-center mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full blur-2xl opacity-30 animate-pulse" />
              <div className="relative w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-xl">
                <CheckCircle2 className="size-10 text-white" />
              </div>
            </div>
            <h2 className="text-slate-900 dark:text-white mb-3 transition-colors duration-300">
              NFT Minted Successfully! 🎉
            </h2>
            <p className="text-slate-600 dark:text-slate-400 transition-colors duration-300">
              Your NFT is now on the blockchain
            </p>
          </div>

          {/* NFT Card */}
          <div className="bg-gradient-to-br from-slate-50 to-purple-50/50 dark:from-slate-800/50 dark:to-purple-900/10 rounded-2xl p-4 mb-8 border border-slate-200 dark:border-slate-700 transition-colors duration-300">
            <div className="aspect-square rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 mb-4 transition-colors duration-300">
              {imagePreview && (
                <ImageWithFallback
                  src={imagePreview}
                  alt={nftName}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <h3 className="text-slate-900 dark:text-white mb-2 transition-colors duration-300">
              {nftName || 'Untitled NFT'}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2 transition-colors duration-300">
              {nftDescription || 'No description provided'}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500 dark:text-slate-500 transition-colors duration-300">
                Token ID: #1234
              </span>
              <button className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors duration-300">
                View on OpenSea →
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={reset}
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
                Mint Another
              </div>
            </button>

            <button
              onClick={onBack}
              className="w-full py-3 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-300"
            >
              Back to Wallet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
