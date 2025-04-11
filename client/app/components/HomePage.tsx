import React from 'react';
import { issues } from '../utils/issuesData';
import IssueCard from './IssueCard';

interface HomePageProps {
  onConnect: () => void;
}

export default function HomePage({ onConnect }: HomePageProps) {
  return <main className="flex flex-col w-full">
    <section className="flex flex-col md:flex-row w-full items-center justify-center px-6 py-12 md:py-20">
      <div className="flex flex-col max-w-lg space-y-6 md:w-1/2">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-700 dark:text-gray-200">
          DappsConnector
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Open protocol to communicate securely between Wallets and Dapps
          (Web3 Apps). The protocol establishes a remote connection using a
          bridge server.
        </p>
        <div>
          <button onClick={onConnect} className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-lg text-lg transition-colors">
            Connect
          </button>
        </div>
      </div>
      <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center">
        <div className="relative w-80 h-80">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/30 to-blue-500/30 rounded-full blur-2xl" />
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-full opacity-20" />
          <div className="absolute inset-8 bg-white rounded-full shadow-2xl" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 bg-indigo-600 rounded-2xl transform rotate-45" />
          </div>
        </div>
      </div>
    </section>
    <section className="w-full px-6 py-12 bg-gray-100 dark:bg-gray-800 backdrop-blur-sm">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid-rows-1 gap-4">
          {issues.map(issue => <IssueCard key={issue.id} title={issue.title} description={issue.description} icon={issue.icon} onClick={onConnect} />)}
        </div>
      </div>
    </section>
  </main>;
}