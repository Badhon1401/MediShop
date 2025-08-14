import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../store/AuthContext';

export const NavigationBar: React.FC = () => {
  // @ts-ignore
    const { user, logout, isManager, isSalesperson } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const managerLinks = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Medicines', path: '/medicines' },
    { name: 'Inventory', path: '/inventory' },
    { name: 'Sales', path: '/sales' },
    { name: 'Analytics', path: '/sales/analytics' },
    { name: 'Customers', path: '/customers' },
    { name: 'Suppliers', path: '/suppliers' },
  ];

  const salespersonLinks = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Sales', path: '/sales' },
    { name: 'Medicines', path: '/medicines' },
    { name: 'Inventory', path: '/inventory' },
    { name: 'Customers', path: '/customers' },
  ];

  const navigationLinks = isManager() ? managerLinks : salespersonLinks;

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className="text-xl font-bold text-gray-800">
              MediShop
            </Link>
            <div className="hidden md:flex items-center space-x-4 ml-8">
              {navigationLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  {link.name}
                  {isSalesperson() && (link.name === 'Medicines' || link.name === 'Inventory') && (
                    <span className="ml-1 text-xs text-yellow-600">(View)</span>
                  )}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-sm">
              <span className="text-gray-600">Welcome, </span>
              <span className="font-medium text-gray-900">{user?.name}</span>
              <span className="ml-2 px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                {user?.role}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="text-gray-600 hover:text-gray-900 text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
