import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MedicineInventoryPage } from '../modules/medicine';
import { InventoryPage } from '../modules/inventory';
import { SalesPage, SalesAnalyticsPage } from '../modules/sales';
import { CustomerInventoryPage } from '../modules/customer';
import { ROUTES } from '../shared/utils/constants';
import {SupplierPage } from '../modules/supplier';






// Layout component (to be implemented)
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-800">MediShop</h1>
            </div>
            <div className="flex items-center space-x-4">
              <a href="/medicines" className="text-gray-600 hover:text-gray-900">
                Medicines
              </a>
              <a href="/inventory" className="text-gray-600 hover:text-gray-900">
                Inventory
              </a>
              <a href="/sales" className="text-gray-600 hover:text-gray-900">
                Sales
              </a>
              <a href="/sales/analytics" className="text-gray-600 hover:text-gray-900">
                Sales Analytics
              </a>
              <a href="/customers" className="text-gray-600 hover:text-gray-900">
                Customers
              </a>
              <a href="/suppliers" className="text-gray-600 hover:text-gray-900">
                Suppliers
              </a>
            </div>
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
};

export const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.MEDICINES} replace />} />
          <Route path={ROUTES.MEDICINES} element={<MedicineInventoryPage />} />
          {/* Add other routes as modules are implemented */}
          <Route path={ROUTES.INVENTORY} element={<InventoryPage />} />
          <Route path={ROUTES.SALES} element={<SalesPage />} />
          <Route path={ROUTES.SALES_ANALYTICS} element={<SalesAnalyticsPage />} />
          <Route path={ROUTES.CUSTOMERS} element={<CustomerInventoryPage />} />
          <Route path={ROUTES.SUPPLIERS} element={<SupplierPage />} />
          <Route path="*" element={<Navigate to={ROUTES.MEDICINES} replace />} />
          
        </Routes>
      </Layout>
    </Router>
  );
};