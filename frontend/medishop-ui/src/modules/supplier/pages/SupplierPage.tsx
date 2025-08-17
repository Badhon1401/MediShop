// frontend/mediShop-ui/src/modules/supplier/pages/SupplierManagementPage.tsx

import React, { useState } from 'react';
import { Plus, Filter, Download, Users } from 'lucide-react';
import SupplierTable from '../components/SupplierTable';
import SupplierForm from '../components/SupplierForm';
import SupplierSearch from '../components/SupplierSearch';
import { useSuppliers, useSupplierActions } from '../hooks/useSupplier';
import type{ SupplierResponse, SupplierFormData, SearchSupplierRequest } from '../types';

const SupplierPage: React.FC = () => {
  const {
    suppliers,
    loading: suppliersLoading,
    error: suppliersError,
    fetchSuppliers,
    fetchActiveSuppliers,
    fetchInactiveSuppliers,
    searchSuppliers,
    setSuppliers
  } = useSuppliers();

  const {
    loading: actionLoading,
    error: actionError,
    addSupplier,
    updateSupplier,
    deleteSupplier,
    activateSupplier,
    deactivateSupplier
  } = useSupplierActions();

  const [showForm, setShowForm] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<SupplierResponse | null>(null);
  const [showSearch, setShowSearch] = useState(false);
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Show success message temporarily
  const showSuccessMessage = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const handleAddSupplier = async (supplierData: SupplierFormData) => {
    try {
      const newSupplier = await addSupplier(supplierData);
      setSuppliers(prev => [newSupplier, ...prev]);
      setShowForm(false);
      showSuccessMessage('Supplier added successfully!');
    } catch (error) {
      console.error('Failed to add supplier:', error);
    }
  };

  const handleUpdateSupplier = async (supplierData: SupplierFormData) => {
    if (!editingSupplier) return;
    
    try {
      const updatedSupplier = await updateSupplier(editingSupplier.supplierId, supplierData);
      setSuppliers(prev => 
        prev.map(supplier => 
          supplier.supplierId === updatedSupplier.supplierId ? updatedSupplier : supplier
        )
      );
      setEditingSupplier(null);
      setShowForm(false);
      showSuccessMessage('Supplier updated successfully!');
    } catch (error) {
      console.error('Failed to update supplier:', error);
    }
  };

  const handleDeleteSupplier = async (supplierId: number) => {
    try {
      await deleteSupplier(supplierId);
      setSuppliers(prev => prev.filter(supplier => supplier.supplierId !== supplierId));
      showSuccessMessage('Supplier deleted successfully!');
    } catch (error) {
      console.error('Failed to delete supplier:', error);
    }
  };

  const handleActivateSupplier = async (supplierId: number) => {
    try {
      const updatedSupplier = await activateSupplier(supplierId);
      setSuppliers(prev => 
        prev.map(supplier => 
          supplier.supplierId === updatedSupplier.supplierId ? updatedSupplier : supplier
        )
      );
      showSuccessMessage('Supplier activated successfully!');
    } catch (error) {
      console.error('Failed to activate supplier:', error);
    }
  };

  const handleDeactivateSupplier = async (supplierId: number) => {
    try {
      const updatedSupplier = await deactivateSupplier(supplierId);
      setSuppliers(prev => 
        prev.map(supplier => 
          supplier.supplierId === updatedSupplier.supplierId ? updatedSupplier : supplier
        )
      );
      showSuccessMessage('Supplier deactivated successfully!');
    } catch (error) {
      console.error('Failed to deactivate supplier:', error);
    }
  };

  const handleEditSupplier = (supplier: SupplierResponse) => {
    setEditingSupplier(supplier);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingSupplier(null);
  };

  const handleSearch = (criteria: SearchSupplierRequest) => {
    searchSuppliers(criteria);
  };

  const handleClearSearch = () => {
    fetchSuppliers();
  };

  const handleFilterChange = (status: 'all' | 'active' | 'inactive') => {
    setFilterStatus(status);
    switch (status) {
      case 'active':
        fetchActiveSuppliers();
        break;
      case 'inactive':
        fetchInactiveSuppliers();
        break;
      default:
        fetchSuppliers();
        break;
    }
  };

  const handleExport = () => {
    const csvContent = [
      ['ID', 'Company Name', 'Email', 'Phone', 'Status', 'Created Date'],
      ...suppliers.map(supplier => [
        supplier.supplierId,
        supplier.companyName,
        supplier.email,
        supplier.phone,
        supplier.status ? 'Active' : 'Inactive',
        new Date(supplier.createdAt).toLocaleDateString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `suppliers_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const activeCount = suppliers.filter(s => s.status).length;
  const inactiveCount = suppliers.filter(s => !s.status).length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Supplier Management</h1>
              <p className="text-gray-600 mt-1">Manage your suppliers and their information</p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Supplier
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Suppliers</p>
                  <p className="text-2xl font-bold text-gray-900">{suppliers.length}</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Suppliers</p>
                  <p className="text-2xl font-bold text-green-600">{activeCount}</p>
                </div>
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-green-600 rounded-full"></div>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Inactive Suppliers</p>
                  <p className="text-2xl font-bold text-red-600">{inactiveCount}</p>
                </div>
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-red-600 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            {successMessage}
          </div>
        )}

        {/* Error Messages */}
        {(suppliersError || actionError) && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {suppliersError || actionError}
          </div>
        )}

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
              <SupplierForm
                supplier={editingSupplier || undefined}
                onSubmit={editingSupplier ? handleUpdateSupplier : handleAddSupplier}
                onCancel={handleCancelForm}
                loading={actionLoading}
                isEdit={!!editingSupplier}
              />
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowSearch(!showSearch)}
                className={`flex items-center px-3 py-2 rounded-md ${
                  showSearch ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                } hover:bg-blue-200`}
              >
                <Filter className="w-4 h-4 mr-2" />
                Search
              </button>

              <div className="flex rounded-md shadow-sm">
                <button
                  onClick={() => handleFilterChange('all')}
                  className={`px-3 py-2 text-sm font-medium rounded-l-md border ${
                    filterStatus === 'all'
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => handleFilterChange('active')}
                  className={`px-3 py-2 text-sm font-medium border-t border-b ${
                    filterStatus === 'active'
                      ? 'bg-green-600 text-white border-green-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Active
                </button>
                <button
                  onClick={() => handleFilterChange('inactive')}
                  className={`px-3 py-2 text-sm font-medium rounded-r-md border ${
                    filterStatus === 'inactive'
                      ? 'bg-red-600 text-white border-red-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Inactive
                </button>
              </div>
            </div>

            <button
              onClick={handleExport}
              className="flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
            >
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </button>
          </div>
        </div>

        {/* Search Component */}
        {showSearch && (
          <SupplierSearch
            onSearch={handleSearch}
            loading={suppliersLoading}
            onClear={handleClearSearch}
          />
        )}

        {/* Suppliers Table */}
        <SupplierTable
          suppliers={suppliers}
          onEdit={handleEditSupplier}
          onDelete={handleDeleteSupplier}
          onActivate={handleActivateSupplier}
          onDeactivate={handleDeactivateSupplier}
          loading={suppliersLoading}
        />
      </div>
    </div>
  );
};

export default SupplierPage;