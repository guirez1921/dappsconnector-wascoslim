import React from 'react';

export default function Footer() {
  return <footer className="w-full bg-gray-100 dark:bg-gray-800 backdrop-blur-sm py-6 px-6 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <span className="text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} DappsConnector. All rights reserved.
          </span>
        </div>
        <div className="flex gap-6">
          <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
            Terms of Service
          </a>
          <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
            Privacy Policy
          </a>
          <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
            Support
          </a>
        </div>
      </div>
    </footer>;
}