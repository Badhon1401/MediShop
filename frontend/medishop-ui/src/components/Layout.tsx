import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../store/AuthContext';
import { UserRole } from '../modules/user/types';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated, logout, isManager } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Manager navigation items
  const managerNavItems = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Medicines', href: '/medicines' },
    { name: 'Inventory', href: '/inventory' },
    { name: 'Sales', href: '/sales' },
    { name: 'Customers', href: '/customers' },
    { name: 'Suppliers', href: '/suppliers' },
    { name: 'Users', href: '/users' },
  ];

  // Salesperson navigation items
  const salespersonNavItems = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Process Sale', href: '/sales' },
    { name: 'View Inventory', href: '/inventory' },
    { name: 'Customers', href: '/customers' },
  ];

  const navItems = isManager ? managerNavItems : salespersonNavItems;

  // Don't show layout for login/register pages
  const hideLayout = ['/login', '/register', '/forgot-password', '/verify-otp', '/reset-password'].includes(location.pathname);

  if (hideLayout) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo and main nav */}
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/dashboard" className="text-xl font-bold text-blue-600">
                  MediShop
                </Link>
              </div>
              
              {/* Desktop navigation */}
              {isAuthenticated && (
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`${
                        location.pathname === item.href
                          ? 'border-blue-500 text-gray-900'
                          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                      } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* User menu */}
            <div className="flex items-center">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-700">
                    Welcome, <span className="font-medium">{user?.name}</span>
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    user?.role === UserRole.MANAGER 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {user?.role}
                  </span>
                  <Link
                    to="/profile"
                    className="text-gray-500 hover:text-gray-700 text-sm font-medium"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-gray-500 hover:text-gray-700 text-sm font-medium"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    to="/login"
                    className="text-gray-500 hover:text-gray-700 text-sm font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Register
                  </Link>
                </div>
              )}

              {/* Mobile menu button */}
              <div className="flex items-center sm:hidden ml-4">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                  title="Toggle mobile menu"
                >
                  <svg
                    className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  <svg
                    className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && isAuthenticated && (
          <div className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`${
                    location.pathname === item.href
                      ? 'bg-blue-50 border-blue-500 text-blue-700'
                      : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
                  } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};

export default Layout;
