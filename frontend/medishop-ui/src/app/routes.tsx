import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './store/AuthContext';
import { ProtectedRoute, PublicRoute } from './components/ProtectedRoute';
import { UserRole } from '../modules/user/types';
import { ROUTES } from '../shared/constants/app';

// Layout Components
import { NavigationBar } from './components/NavigationBar';

// Auth Pages
import LoginPage from '../modules/user/pages/LoginPage';
import RegisterPage from '../modules/user/pages/RegisterPage';
import ForgotPasswordPage from '../modules/user/pages/ForgotPasswordPage';
import ResetPasswordPage from '../modules/user/pages/ResetPasswordPage';
import OtpVerificationPage from '../modules/user/pages/OtpVerificationPage';

// Main Pages
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import { UnauthorizedPage } from './pages/UnauthorizedPage';
import ProfilePage from '../modules/user/pages/ProfilePage';

// Module Pages
import { MedicineInventoryPage } from '../modules/medicine';
import { InventoryPage } from '../modules/inventory';
import { SalesPage } from '../modules/sales';
import { CustomerInventoryPage } from '../modules/customer';
import { SupplierPage } from '../modules/supplier';

// Loading Component
const LoadingSpinner: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
  </div>
);

// Auth Wrapper for routes that need navigation
const AuthenticatedLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar />
      <main className="py-6">
        {children}
      </main>
    </div>
  );
};

// Placeholder component for User Management
const UserManagementPage: React.FC = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h1 className="text-3xl font-bold text-gray-900 mb-6">User Management</h1>
    <div className="bg-white shadow rounded-lg p-6">
      <p className="text-gray-600">User management functionality will be implemented here.</p>
      <p className="text-sm text-gray-500 mt-2">
        This page is only accessible by Managers and will allow management of user accounts, roles, and permissions.
      </p>
    </div>
  </div>
);

export const AppRoutes: React.FC = () => {
  const { loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes (redirect to dashboard if authenticated) */}
        <Route 
          path={ROUTES.HOME} 
          element={
            <PublicRoute>
              <HomePage />
            </PublicRoute>
          } 
        />
        
        <Route 
          path={ROUTES.LOGIN} 
          element={
            <PublicRoute>
              <LoginPage 
                onNavigateToRegister={() => window.location.href = ROUTES.REGISTER}
                onNavigateToForgotPassword={() => window.location.href = ROUTES.FORGOT_PASSWORD}
              />
            </PublicRoute>
          } 
        />
        
        <Route 
          path={ROUTES.REGISTER} 
          element={
            <PublicRoute>
              <RegisterPage 
                onNavigateToLogin={() => window.location.href = ROUTES.LOGIN}
              />
            </PublicRoute>
          } 
        />

        <Route 
          path={ROUTES.FORGOT_PASSWORD} 
          element={
            <PublicRoute>
              <ForgotPasswordPage 
                onNavigateToLogin={() => window.location.href = ROUTES.LOGIN}
              />
            </PublicRoute>
          } 
        />

        <Route 
          path={ROUTES.OTP_VERIFICATION} 
          element={
            <PublicRoute>
              <OtpVerificationPage 
                emailOrPhone=""
                onVerificationSuccess={() => window.location.href = ROUTES.LOGIN}
              />
            </PublicRoute>
          } 
        />

        <Route 
          path={ROUTES.RESET_PASSWORD} 
          element={
            <PublicRoute>
              <ResetPasswordPage 
                emailOrPhone=""
                onResetSuccess={() => window.location.href = ROUTES.LOGIN}
              />
            </PublicRoute>
          } 
        />

        {/* Unauthorized Page */}
        <Route path={ROUTES.UNAUTHORIZED} element={<UnauthorizedPage />} />

        {/* Protected Routes */}
        <Route 
          path={ROUTES.DASHBOARD} 
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <DashboardPage />
              </AuthenticatedLayout>
            </ProtectedRoute>
          } 
        />

        <Route 
          path={ROUTES.PROFILE} 
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <ProfilePage />
              </AuthenticatedLayout>
            </ProtectedRoute>
          } 
        />

        {/* Medicine Management - Both Manager and Salesperson can view */}
        <Route 
          path={ROUTES.MEDICINES} 
          element={
            <ProtectedRoute allowedRoles={[UserRole.MANAGER, UserRole.SALESPERSON]}>
              <AuthenticatedLayout>
                <MedicineInventoryPage />
              </AuthenticatedLayout>
            </ProtectedRoute>
          } 
        />

        {/* Inventory Management - Both Manager and Salesperson can view */}
        <Route 
          path={ROUTES.INVENTORY} 
          element={
            <ProtectedRoute allowedRoles={[UserRole.MANAGER, UserRole.SALESPERSON]}>
              <AuthenticatedLayout>
                <InventoryPage />
              </AuthenticatedLayout>
            </ProtectedRoute>
          } 
        />

        {/* Sales - Both Manager and Salesperson can access (Salesperson can only decrease stock) */}
        <Route 
          path={ROUTES.SALES} 
          element={
            <ProtectedRoute allowedRoles={[UserRole.MANAGER, UserRole.SALESPERSON]}>
              <AuthenticatedLayout>
                <SalesPage />
              </AuthenticatedLayout>
            </ProtectedRoute>
          } 
        />

        {/* Customer Management - Both roles can view customers */}
        <Route 
          path={ROUTES.CUSTOMERS} 
          element={
            <ProtectedRoute allowedRoles={[UserRole.MANAGER, UserRole.SALESPERSON]}>
              <AuthenticatedLayout>
                <CustomerInventoryPage />
              </AuthenticatedLayout>
            </ProtectedRoute>
          } 
        />

        {/* Supplier Management - Only Manager can manage suppliers */}
        <Route 
          path={ROUTES.SUPPLIERS} 
          element={
            <ProtectedRoute requiredRole={UserRole.MANAGER}>
              <AuthenticatedLayout>
                <SupplierPage />
              </AuthenticatedLayout>
            </ProtectedRoute>
          } 
        />

        {/* User Management - Only Manager can manage users */}
        <Route 
          path={ROUTES.USERS} 
          element={
            <ProtectedRoute requiredRole={UserRole.MANAGER}>
              <AuthenticatedLayout>
                <UserManagementPage />
              </AuthenticatedLayout>
            </ProtectedRoute>
          } 
        />

        {/* Reports - Only Manager can view reports */}
        <Route 
          path={ROUTES.REPORTS} 
          element={
            <ProtectedRoute requiredRole={UserRole.MANAGER}>
              <AuthenticatedLayout>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-6">Reports</h1>
                  <div className="bg-white shadow rounded-lg p-6">
                    <p className="text-gray-600">Reports functionality will be implemented here.</p>
                  </div>
                </div>
              </AuthenticatedLayout>
            </ProtectedRoute>
          } 
        />

        {/* Catch all route - redirect to home if not authenticated, dashboard if authenticated */}
        <Route 
          path="*" 
          element={
            <Navigate to={ROUTES.HOME} replace />
          } 
        />
      </Routes>
    </Router>
  );
};