import React from 'react';
import { SearchIcon } from 'lucide-react';
export default function SearchBar({ searchQuery, setSearchQuery }: { searchQuery: string; setSearchQuery: (value: string) => void; }) {
  return <div className="relative w-full max-w-md">
    <input type="text" placeholder="Search wallets..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full text-gray-600 dark:text-white pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
    <SearchIcon className="absolute left-3 top-2.5 text-gray-400" size={18} />
  </div>;
}