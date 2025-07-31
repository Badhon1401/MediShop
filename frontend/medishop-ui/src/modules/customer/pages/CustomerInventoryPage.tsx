import React, { useState, useEffect } from 'react';
import type { Customer, CustomerFormData, CustomerSearchFilters, CustomerApiResponse } from '../types';
import { useCustomer } from '../hooks/useCustomer';
import CustomerForm from '../components/CustomerForm';
import CustomerSearch from '../components/CustomerSearch';
import CustomerTable from '../components/CustomerTable';

const CustomerInventoryPage: React.FC = () => {
  const {
    customers,
    loading,
    error,
    totalPages,
    currentPage,
    totalCustomers,
    fetchCustomers,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    searchCustomers,
    clearError
  } = useCustomer();

  const [showForm, setShowForm] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | undefined>();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState<number | null>(null);
  const [currentFilters, setCurrentFilters] = useState<CustomerSearchFilters>({});
  const [showCustomerDetails, setShowCustomerDetails] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const pageSize = 10;

  useEffect(() => {
    fetchCustomers(0, pageSize);
  }, [fetchCustomers]);

  const handleCreateCustomer = async (formData: CustomerFormData) => {
    const success = await createCustomer({
      name: formData.name,
      contact_number: formData.contact_number || undefined
    });

    if (success) {
      setShowForm(false);
      setEditingCustomer(undefined);
    }
  };

  const handleUpdateCustomer = async (formData: CustomerFormData) => {
    if (!editingCustomer) return;

    const success = await updateCustomer(editingCustomer.customer_id, {
      name: formData.name,
      contact_number: formData.contact_number || undefined
    });

    if (success) {
      setShowForm(false);
      setEditingCustomer(undefined);
    }
  };

  const handleEditCustomer = (customer: Customer) => {
    setEditingCustomer(customer);
    setShowForm(true);
  };

  const handleDeleteCustomer = async () => {
    if (customerToDelete) {
      const success = await deleteCustomer(customerToDelete);
      if (success) {
        setShowDeleteModal(false);
        setCustomerToDelete(null);
      }
    }
  };

  const handleDeleteClick = (customerId: number) => {
    setCustomerToDelete(customerId);
    setShowDeleteModal(true);
  };

  const handleViewCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setShowCustomerDetails(true);
  };

  const handleSearch = (filters: CustomerSearchFilters) => {
    setCurrentFilters(filters);
    if (Object.keys(filters).length === 0) {
      fetchCustomers(0, pageSize);
    } else {
      searchCustomers(filters);
    }
  };

  const handlePageChange = (page: number) => {
    if (Object.keys(currentFilters).length === 0) {
      fetchCustomers(page, pageSize);
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingCustomer(undefined);
  };

  const closeError = () => {
    clearError();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Customer Management</h1>
              <p className="mt-2 text-gray-600">
                Manage your customer database and track customer information
              </p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add New Customer
            </button>
          </div>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total Customers</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {totalCustomers || 0}
                  </p>

                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Active Customers</p>
                  <p className="text-2xl font-semibold text-gray-900">{customers?.length ?? 0}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">New This Month</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {(customers?.filter(c => {
                      const regDate = new Date(c.registration_date);
                      const now = new Date();
                      return (
                        regDate.getMonth() === now.getMonth() &&
                        regDate.getFullYear() === now.getFullYear()
                      );
                    })?.length) ?? 0}
                  </p>

                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-800">{error}</p>
              </div>
              <div className="ml-auto pl-3">
                <button
                  type="button"
                  onClick={closeError}
                  className="inline-flex text-red-400 hover:text-red-600"
                >
                  <span className="sr-only">Dismiss</span>
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Customer Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <CustomerForm
                customer={editingCustomer}
                onSubmit={editingCustomer ? handleUpdateCustomer : handleCreateCustomer}
                onCancel={handleCancelForm}
                loading={loading}
              />
            </div>
          </div>
        )}

        {/* Customer Details Modal */}
        {showCustomerDetails && selectedCustomer && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="max-w-md mx-auto">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">Customer Details</h2>
                  <button
                    onClick={() => setShowCustomerDetails(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Customer ID</label>
                    <p className="mt-1 text-sm text-gray-900">#{selectedCustomer.customer_id}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedCustomer.name}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Contact Number</label>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedCustomer.contact_number || 'Not provided'}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Registration Date</label>
                    <p className="mt-1 text-sm text-gray-900">
                      {new Date(selectedCustomer.registration_date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex space-x-3">
                  <button
                    onClick={() => {
                      setShowCustomerDetails(false);
                      handleEditCustomer(selectedCustomer);
                    }}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Edit Customer
                  </button>
                  <button
                    onClick={() => setShowCustomerDetails(false)}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3 text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                  <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h3 className="text-lg leading-6 font-medium text-gray-900 mt-2">Delete Customer</h3>
                <div className="mt-2 px-7 py-3">
                  <p className="text-sm text-gray-500">
                    Are you sure you want to delete this customer? This action cannot be undone.
                  </p>
                </div>
                <div className="flex gap-4 px-4 py-3">
                  <button
                    onClick={handleDeleteCustomer}
                    disabled={loading}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                  >
                    {loading ? 'Deleting...' : 'Delete'}
                  </button>
                  <button
                    onClick={() => {
                      setShowDeleteModal(false);
                      setCustomerToDelete(null);
                    }}
                    disabled={loading}
                    className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search Component */}
        <CustomerSearch onSearch={handleSearch} loading={loading} />

        {/* Customer Table */}
        <CustomerTable
          customers={customers}
          loading={loading}
          onEdit={handleEditCustomer}
          onDelete={handleDeleteClick}
          onView={handleViewCustomer}
        />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-between bg-white px-4 py-3 rounded-lg shadow">
            <div className="flex flex-1 justify-between sm:hidden">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 0 || loading}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages - 1 || loading}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{currentPage * pageSize + 1}</span> to{' '}
                  <span className="font-medium">
                    {Math.min((currentPage + 1) * pageSize, totalCustomers)}
                  </span>{' '}
                  of <span className="font-medium">{totalCustomers}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 0 || loading}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => handlePageChange(i)}
                      disabled={loading}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${i === currentPage
                        ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                        }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages - 1 || loading}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerInventoryPage;