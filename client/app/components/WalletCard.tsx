import React from 'react';
import type { Wallet } from '~/utils/walletData';

interface WalletCardProps {
  wallet: Wallet;
  onSelect: (wallet: Wallet) => void;
}

export default function WalletCard({
  wallet,
  onSelect
}: WalletCardProps) {
  return <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col items-center" onClick={() => onSelect(wallet)}>
      <div className="w-12 h-12 mb-3 flex items-center justify-center">
        <img src={wallet.logo} alt={`${wallet.name} logo`} className="max-w-full max-h-full" />
      </div>
      <h3 className="font-medium text-gray-700 dark:text-gray-200">{wallet.name}</h3>
      <p className="text-xs text-gray-500 dark:text-gray-400">{wallet.url}</p>
    </div>;
}