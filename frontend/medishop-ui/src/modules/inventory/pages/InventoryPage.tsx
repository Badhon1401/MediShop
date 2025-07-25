// src/modules/inventory/pages/InventoryPage.tsx

import React, { useState, useEffect } from 'react';
import type { 
  Inventory, 
  InventoryCreateRequest, 
  InventoryUpdateRequest, 
  InventorySearchFilters 
} from '../types';
import { useInventory, useInventoryStats } from '../hooks/useInventory';
import { InventoryTable } from '../components/InventoryTable';
import { InventorySearch } from '../components/InventorySearch';
import { InventoryForm } from '../components/InventoryForm';

type ModalType = 'create' | 'edit' | 'view' | 'delete' | null;

export const InventoryPage: React.FC = () => {
  const {
    inventoryItems,
    loading,
    error,
    totalPages,
    totalElements,
    fetchInventoryItems,
    createInventoryItem,
    updateInventoryItem,
    deleteInventoryItem,
  } = useInventory();

  const { stats, refreshStats } = useInventoryStats();

  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [searchFilters, setSearchFilters] = useState<InventorySearchFilters>({});
  const [modalType, setModalType] = useState<ModalType>(null);
  const [selectedInventory, setSelectedInventory] = useState<Inventory | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    fetchInventoryItems(currentPage, pageSize, searchFilters);
  }, [currentPage, pageSize, searchFilters, fetchInventoryItems]);

  const handleSearch = (filters: InventorySearchFilters) => {
    setSearchFilters(filters);
    setCurrentPage(0);
  };

  const handleResetSearch = () => {
    setSearchFilters({});
    setCurrentPage(0);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(0);
  };

  const handleCreateNew = () => {
    setSelectedInventory(null);
    setModalType('create');
  };

  const handleEdit = (inventory: Inventory) => {
    setSelectedInventory(inventory);
    setModalType('edit');
  };

  const handleView = (inventory: Inventory) => {
    setSelectedInventory(inventory);
    setModalType('view');
  };

  const handleDelete = (id: number) => {
    const inventory = inventoryItems.find(item => item.inventoryId === id);
    if (inventory) {
      setSelectedInventory(inventory);
      setModalType('delete');
    }
  };

  const handleFormSubmit = async (data: InventoryCreateRequest | InventoryUpdateRequest) => {
    try {
      setFormLoading(true);
      
      if (modalType === 'create') {
        await createInventoryItem(data as InventoryCreateRequest);
      } else if (modalType === 'edit') {
        await updateInventoryItem(data as InventoryUpdateRequest);
      }
      
      setModalType(null);
      setSelectedInventory(null);
      refreshStats();
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (selectedInventory) {
      try {
        setFormLoading(true);
        await deleteInventoryItem(selectedInventory.inventoryId);
        setModalType(null);
        setSelectedInventory(null);
        refreshStats();
      } catch (error) {
        console.error('Delete error:', error);
      } finally {
        setFormLoading(false);
      }
    }
  };

  const handleCloseModal = () => {
    setModalType(null);
    setSelectedInventory(null);
  };

  const formatCurrency = (amount: number) => {
    return `৳${amount.toFixed(2)}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
              <p className="text-gray-600 mt-1">Manage your medical inventory and track stock levels</p>
            </div>
            <button
              onClick={handleCreateNew}
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add New Item
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8l-4-4m0 0L9 5m6-6v4" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Items</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalItems}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Low Stock</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.lowStockItems}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-orange-100 text-orange-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h3a1 1 0 011 1v9a2 2 0 01-2 2H5a2 2 0 01-2-2V8a1 1 0 011-1h3z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Expiring Soon</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.expiringItems}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-red-100 text-red-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Expired</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.expiredItems}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 text-green-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Value</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalValue)}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search Component */}
        <InventorySearch
          onSearch={handleSearch}
          onReset={handleResetSearch}
          isLoading={loading}
        />

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex">
              <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="ml-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Results Summary */}
        <div className="mb-4 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Showing {inventoryItems.length} of {totalElements} results
          </div>
          <div className="flex items-center space-x-2">
            <label htmlFor="pageSize" className="text-sm text-gray-600">Items per page:</label>
            <select
              id="pageSize"
              value={pageSize}
              onChange={(e) => handlePageSizeChange(Number(e.target.value))}
              className="border border-gray-300 rounded px-2 py-1 text-sm"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
        </div>

        {/* Inventory Table */}
        <InventoryTable
          inventoryItems={inventoryItems}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
          isLoading={loading}
        />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Page {currentPage + 1} of {totalPages}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 0}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Previous
              </button>
              
              {/* Page numbers */}
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                const pageNum = Math.max(0, Math.min(totalPages - 5, currentPage - 2)) + i;
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-3 py-2 border rounded-md text-sm ${
                      currentPage === pageNum
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum + 1}
                  </button>
                );
              })}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages - 1}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {(modalType === 'create' || modalType === 'edit') && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
            <InventoryForm
              inventory={selectedInventory || undefined}
              onSubmit={handleFormSubmit}
              onCancel={handleCloseModal}
              isLoading={formLoading}
            />
          </div>
        </div>
      )}

      {modalType === 'view' && selectedInventory && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-2xl shadow-lg rounded-md bg-white">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Inventory Details</h2>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="font-medium text-gray-600">Medicine ID:</span>
                      <span className="ml-2">{selectedInventory.medicineId}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Batch Number:</span>
                      <span className="ml-2">{selectedInventory.batchNumber}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Company:</span>
                      <span className="ml-2">{selectedInventory.companyName}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Type:</span>
                      <span className="ml-2">{selectedInventory.type}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Location:</span>
                      <span className="ml-2">{selectedInventory.location}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">Stock & Pricing</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="font-medium text-gray-600">Total Quantity:</span>
                      <span className="ml-2">{selectedInventory.totalQuantity}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Available:</span>
                      <span className="ml-2">{selectedInventory.availableQuantity}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Purchase Price:</span>
                      <span className="ml-2">{formatCurrency(selectedInventory.purchasePrice)}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Selling Price:</span>
                      <span className="ml-2">{formatCurrency(selectedInventory.unitPrice)}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Discount:</span>
                      <span className="ml-2">{selectedInventory.discount}%</span>
                    </div>
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <h3 className="text-lg font-semibold mb-4">Dates</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <span className="font-medium text-gray-600">Purchase Date:</span>
                      <div className="text-sm">{formatDate(selectedInventory.purchaseDate)}</div>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Expiry Date:</span>
                      <div className="text-sm">{formatDate(selectedInventory.expiryDate)}</div>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Last Updated:</span>
                      <div className="text-sm">{formatDate(selectedInventory.lastUpdated)}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {modalType === 'delete' && selectedInventory && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="p-6">
              <div className="text-center">
                <svg className="mx-auto mb-4 w-14 h-14 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500">
                  Are you sure you want to delete this inventory item?
                </h3>
                <div className="mb-4 p-3 bg-gray-50 rounded-md text-left">
                  <p className="text-sm"><strong>Batch:</strong> {selectedInventory.batchNumber}</p>
                  <p className="text-sm"><strong>Company:</strong> {selectedInventory.companyName}</p>
                  <p className="text-sm"><strong>Available:</strong> {selectedInventory.availableQuantity} units</p>
                </div>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={handleDeleteConfirm}
                    disabled={formLoading}
                    className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center disabled:opacity-50"
                  >
                    {formLoading ? 'Deleting...' : 'Yes, Delete'}
                  </button>
                  <button
                    onClick={handleCloseModal}
                    disabled={formLoading}
                    className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};