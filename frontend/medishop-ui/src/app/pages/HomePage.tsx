import React from 'react';
import { useAuth } from '../store/AuthContext';
import { APP_NAME, ROUTES } from '../../shared/constants/app';

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-20 pb-16 text-center lg:pt-32">
          <h1 className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl">
            Welcome to{' '}
            <span className="relative whitespace-nowrap text-blue-600">
              <span className="relative">{APP_NAME}</span>
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
            Streamline your medical inventory management with our comprehensive solution.
            Track medicines, manage stock levels, and optimize your pharmacy operations.
          </p>
          <div className="mt-10 flex justify-center gap-x-6">
            {!isAuthenticated ? (
              <>
                <a
                  href={ROUTES.LOGIN}
                  className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-blue-600 text-white hover:bg-blue-500 active:bg-blue-800 focus-visible:outline-blue-600"
                >
                  Sign in
                </a>
                <a
                  href={ROUTES.REGISTER}
                  className="group inline-flex ring-1 items-center justify-center rounded-full py-2 px-4 text-sm focus:outline-none ring-slate-200 text-slate-700 hover:text-slate-900 hover:ring-slate-300 active:bg-slate-100 active:text-slate-600 focus-visible:outline-blue-600 focus-visible:ring-slate-300"
                >
                  Get started
                </a>
              </>
            ) : (
              <a
                href={ROUTES.DASHBOARD}
                className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-blue-600 text-white hover:bg-blue-500 active:bg-blue-800 focus-visible:outline-blue-600"
              >
                Go to Dashboard
              </a>
            )}
          </div>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-3 lg:gap-x-8">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                Why Choose {APP_NAME}?
              </h2>
              <div className="mt-6 space-y-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-6 w-6 rounded-md bg-blue-500 text-white">
                      💊
                    </div>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-900">Medicine Management</h3>
                    <p className="mt-2 text-base text-gray-500">
                      Comprehensive medicine catalog with detailed information, expiry tracking, and batch management.
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-6 w-6 rounded-md bg-blue-500 text-white">
                      📦
                    </div>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-900">Inventory Control</h3>
                    <p className="mt-2 text-base text-gray-500">
                      Real-time stock monitoring, low stock alerts, and automated reorder suggestions.
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-6 w-6 rounded-md bg-blue-500 text-white">
                      👥
                    </div>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-900">Role-Based Access</h3>
                    <p className="mt-2 text-base text-gray-500">
                      Secure access control with manager and salesperson roles for different permission levels.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Total Medicines</span>
                    <span className="text-sm font-medium text-gray-900">1,247</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">In Stock</span>
                    <span className="text-sm font-medium text-green-600">1,198</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Low Stock</span>
                    <span className="text-sm font-medium text-yellow-600">32</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Out of Stock</span>
                    <span className="text-sm font-medium text-red-600">17</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
