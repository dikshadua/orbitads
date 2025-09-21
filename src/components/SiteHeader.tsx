import React from 'react';
import { Logo } from './Logo';

export const SiteHeader: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <Logo className="h-10 w-auto" />
      </div>
    </header>
  );
};