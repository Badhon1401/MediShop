import React from 'react';
import { useAuth } from '../../app/store/AuthContext';
import { UserRole } from '../../modules/user/types';
import { Link } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const { user, isManager, isSalesperson } = useAuth();

  const managerCards = [
    { title: 'Medicines', description: 'Manage medicine inventory', link: '/medicines', icon: '💊' },
    { title: 'Inventory', description: 'Full inventory management', link: '/inventory', icon: '📦' },
    { title: 'Sales', description: 'Process sales and transactions', link: '/sales', icon: '💰' },
    { title: 'Analytics', description: 'View sales analytics', link: '/sales/analytics', icon: '📊' },
    { title: 'Customers', description: 'Manage customer data', link: '/customers', icon: '👥' },
    { title: 'Suppliers', description: 'Manage suppliers', link: '/suppliers', icon: '🏢' },
  ];

  const salespersonCards = [
    { title: 'Sales', description: 'Process sales and reduce inventory', link: '/sales', icon: '💰' },
    { title: 'View Medicines', description: 'View available medicines', link: '/medicines', icon: '💊' },
    { title: 'View Inventory', description: 'Check stock levels', link: '/inventory', icon: '📦' },
    { title: 'Customers', description: 'View customer information', link: '/customers', icon: '👥' },
  ];

  const cards = isManager() ? managerCards : salespersonCards;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome, {user?.name}
          </h1>
          <p className="text-gray-600 mt-2">
            Role: {user?.role} | {isManager() ? 'Full Access' : 'Sales Access Only'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <Link
              key={index}
              to={card.link}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-3">{card.icon}</span>
                <h3 className="text-xl font-semibold text-gray-900">{card.title}</h3>
              </div>
              <p className="text-gray-600">{card.description}</p>
              {isSalesperson() && (card.title === 'Inventory' || card.title === 'View Medicines') && (
                <span className="inline-block mt-2 px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded">
                  View Only
                </span>
              )}
            </Link>
          ))}
        </div>

        {isSalesperson() && (
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-medium text-blue-900 mb-2">
              Salesperson Permissions
            </h3>
            <ul className="text-blue-800 text-sm space-y-1">
              <li>• Can process sales and reduce inventory quantities</li>
              <li>• Can view medicines and inventory (read-only)</li>
              <li>• Can view customer information</li>
              <li>• Cannot add/edit medicines or manage suppliers</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
