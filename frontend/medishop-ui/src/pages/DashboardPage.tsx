import React from 'react';
import { useAuthContext } from '../store/AuthContext';

const DashboardPage: React.FC = () => {
  const { user, isManager } = useAuthContext();

  const managerFeatures = [
    { title: 'Medicine Management', description: 'Add, edit, and manage medicines', href: '/medicines' },
    { title: 'Inventory Management', description: 'Manage stock levels and inventory', href: '/inventory' },
    { title: 'Sales Management', description: 'View and manage all sales', href: '/sales' },
    { title: 'User Management', description: 'Manage system users', href: '/users' },
    { title: 'Customer Management', description: 'Manage customer information', href: '/customers' },
    { title: 'Supplier Management', description: 'Manage supplier information', href: '/suppliers' },
  ];

  const salespersonFeatures = [
    { title: 'Process Sales', description: 'Create and process medicine sales', href: '/sales' },
    { title: 'View Inventory', description: 'Check medicine availability and stock', href: '/inventory' },
    { title: 'Customer Information', description: 'View customer details', href: '/customers' },
  ];

  const features = isManager ? managerFeatures : salespersonFeatures;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.name}!
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Role: <span className="font-semibold text-blue-600">{user?.role}</span>
        </p>
      </div>

      {/* Role-based feature cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer"
            onClick={() => window.location.href = feature.href}
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
              <div className="mt-4">
                <span className="inline-flex items-center text-blue-600 font-medium">
                  Access →
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick stats or additional info */}
      <div className="mt-12 bg-gray-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Quick Info
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {isManager ? 'Full Access' : 'Sales Access'}
            </div>
            <div className="text-sm text-gray-600">Permission Level</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">Active</div>
            <div className="text-sm text-gray-600">Account Status</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {user?.isVerified ? 'Verified' : 'Pending'}
            </div>
            <div className="text-sm text-gray-600">Verification Status</div>
          </div>
        </div>
      </div>

      {/* Role-specific instructions */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">
          {isManager ? 'Manager Privileges' : 'Salesperson Guidelines'}
        </h3>
        {isManager ? (
          <ul className="text-blue-800 space-y-1">
            <li>• You have full access to all system features</li>
            <li>• You can manage users, medicines, inventory, and sales</li>
            <li>• You can view comprehensive reports and analytics</li>
          </ul>
        ) : (
          <ul className="text-blue-800 space-y-1">
            <li>• You can process medicine sales and reduce inventory</li>
            <li>• You can view inventory levels but cannot modify stock</li>
            <li>• Contact your manager for access to additional features</li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
