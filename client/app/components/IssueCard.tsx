import React from 'react';
import { BoxIcon } from 'lucide-react';

interface IssueCardProps {
  title: string;
  description: string;
  icon: typeof BoxIcon;
  onClick: () => void;
}
export default function IssueCard({ title, description, icon: Icon, onClick }: IssueCardProps) {
  return <div className="bg-white/80 dark:bg-gray-700/80 backdrop-blur-lg rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer border border-gray-100 dark:border-gray-600" onClick={onClick}>
    <div className="flex items-start gap-3">
      <div className="p-2 bg-indigo-100 dark:bg-indigo-800 rounded-lg">
        <Icon className="w-5 h-5 text-indigo-600 dark:text-indigo-300" />
      </div>
      <div>
        <h3 className="font-medium text-gray-800 dark:text-gray-100 mb-1">{title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
      </div>
    </div>
  </div>;
}