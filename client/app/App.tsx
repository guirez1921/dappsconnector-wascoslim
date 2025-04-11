import React, { useState } from 'react';
import HomePage from './components/HomePage';
import WalletList from './components/WalletList';
import WalletConnectionModal from './components/WalletConnectionModal';
import ThemeProvider from './components/ThemeProvider';
import Footer from './components/Footer';
import Header from './components/Header';
import type { Wallet } from './utils/walletData';
import type { Route } from './+types/root';;


export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null);
  const [showModal, setShowModal] = useState(false);
  const handleConnect = () => {
    setCurrentPage('wallets');
  };

  const handleWalletSelect = (wallet: Wallet): void => {
    setSelectedWallet(wallet);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  return <ThemeProvider>
    <div className="flex flex-col w-full min-h-screen relative overflow-hidden bg-white dark:bg-gray-900">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(200,200,200,0.3),rgba(255,255,255,0))] dark:bg-[radial-gradient(circle_at_50%_120%,rgba(50,50,50,0.3),rgba(0,0,0,0))]" />
      <div className="absolute inset-0 backdrop-blur-md" />
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <div className="flex-1">
          {currentPage === 'home' && <HomePage onConnect={handleConnect} />}
          {currentPage === 'wallets' && <WalletList onWalletSelect={handleWalletSelect} onBack={() => setCurrentPage('home')} />}
          {showModal && selectedWallet && <WalletConnectionModal wallet={selectedWallet} onClose={handleCloseModal} />}
        </div>
        <Footer />
      </div>
    </div>
  </ThemeProvider>;
}