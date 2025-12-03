'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Moon, Sun, Pill, Menu, X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Bell, Search,LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function HomeLayout({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black transition-all duration-500">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-gray-950/80 border-b border-gray-200/50 dark:border-gray-800/50">
  <div className="container mx-auto px-4">
    <div className="flex items-center justify-between h-16">
      
      {/* Brand Logo */}
      <div className="flex items-center space-x-3 cursor-pointer hover:scale-105 transition-transform">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl flex items-center justify-center shadow-lg">
          <Pill className="h-6 w-6 text-white" />
        </div>
        <div>
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-600">
            MediShop
          </span>
          <div className="text-xs text-gray-500">Pharmacy Management</div>
        </div>
      </div>

      {/* Action Icons for Desktop */}
      <div className="hidden md:flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/home/notification")}
        >
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/home/search")}
        >
          <Search className="h-5 w-5" />
          <span className="sr-only">Search</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            localStorage.removeItem("medishop-auth-token");
            window.location.href = "/welcome";
          }}
        >
          <LogOut className="h-5 w-5" />
          <span className="sr-only">Log out</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
        >
          {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          <span className="sr-only">Toggle Theme</span>
        </Button>
      </div>

      {/* Mobile Icons */}
      <div className="md:hidden flex items-center space-x-2">
        <Button variant="ghost" size="icon" onClick={() => router.push("/home/notification")}>
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => router.push("/home/search")}>
          <Search className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
        <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>
    </div>

    {/* Optional Mobile Menu */}
    {isMenuOpen && (
      <div className="md:hidden bg-white/95 dark:bg-gray-950/95 shadow-lg border-t border-gray-300 dark:border-gray-700">
        <div className="p-4 space-y-2">
          <Link href="/login">
            <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
              Log Out
            </Button>
          </Link>
        </div>
      </div>
    )}
  </div>
</header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden relative">
        <main className="flex-1 overflow-y-auto p-6 md:ml-24 md:mr-24 lg:ml-48 lg:mr-48 backdrop-blur-xl bg-opacity-70 shadow-lg">
          {children}
        </main>

        {/* Optional Sidebars */}
        {/* <SidebarLeft /> */}
        {/* <SidebarRight /> */}

        {/* Background Glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="w-full h-full bg-gradient-to-br from-transparent via-indigo-900 to-transparent opacity-30 blur-3xl"></div>
        </div>
      </div>
    </div>
  );
}
