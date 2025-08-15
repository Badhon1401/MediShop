import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../store/AuthContext';
import { ROUTES } from '../../shared/constants/app';

export const NavigationBar: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  const isManager = user.role === 'MANAGER';
  const isSalesperson = user.role === 'SALESPERSON';

  const managerLinks = [
    { name: 'Dashboard', path: ROUTES.DASHBOARD },
    { name: 'Medicines', path: ROUTES.MEDICINES },
    { name: 'Inventory', path: ROUTES.INVENTORY },
    { name: 'Sales', path: ROUTES.SALES },
    { name: 'Customers', path: ROUTES.CUSTOMERS },
    { name: 'Suppliers', path: ROUTES.SUPPLIERS },
    { name: 'Users', path: ROUTES.USERS },
    { name: 'Reports', path: ROUTES.REPORTS },
  ];

  const salespersonLinks = [
    { name: 'Dashboard', path: ROUTES.DASHBOARD },
    { name: 'Sales', path: ROUTES.SALES },
    { name: 'Medicines', path: ROUTES.MEDICINES },
    { name: 'Inventory', path: ROUTES.INVENTORY },
    { name: 'Customers', path: ROUTES.CUSTOMERS },
  ];

  const navigationLinks = isManager ? managerLinks : salespersonLinks;

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to={ROUTES.DASHBOARD} className="text-xl font-bold text-gray-800">
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
                  {isSalesperson && (link.name === 'Medicines' || link.name === 'Inventory') && (
                    <span className="ml-1 text-xs text-yellow-600">(View Only)</span>
                  )}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-sm">
              <span className="text-gray-600">Welcome, </span>
              <Link 
                to={ROUTES.PROFILE}
                className="font-medium text-gray-900 hover:text-blue-600"
              >
                {user.name}
              </Link>
              <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                user.role === 'MANAGER' 
                  ? 'bg-purple-100 text-purple-800' 
                  : 'bg-green-100 text-green-800'
              }`}>
                {user.role}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="text-gray-600 hover:text-gray-900 text-sm font-medium px-3 py-2 rounded-md hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu (hidden by default, show with JavaScript toggle) */}
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50">
          {navigationLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
            >
              {link.name}
              {isSalesperson && (link.name === 'Medicines' || link.name === 'Inventory') && (
                <span className="ml-1 text-xs text-yellow-600">(View Only)</span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};
