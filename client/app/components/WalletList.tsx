import React, { useState } from 'react';
import WalletCard from './WalletCard';
import SearchBar from './SearchBar';
import { wallets } from '~/utils/walletData';
import type { Wallet } from '~/utils/walletData';
interface WalletListProps {
  onWalletSelect: (wallet: Wallet) => void;
  onBack: () => void;
}

export default function WalletList({
  onWalletSelect, onBack
}: WalletListProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredWallets: Wallet[] = wallets.filter((wallet: Wallet) => 
    wallet.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-700 dark:text-gray-200">
          Select a Wallet
        </h1>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredWallets.map((wallet, id) => <WalletCard key={wallet.id} wallet={wallet} onSelect={onWalletSelect} />)}
      </div>
    </main>;
}