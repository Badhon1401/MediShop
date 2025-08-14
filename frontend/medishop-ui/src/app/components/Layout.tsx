import React from 'react';
import { NavigationBar } from './NavigationBar';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar />
      <main className="py-6">
        {children}
      </main>
    </div>
  );
};
