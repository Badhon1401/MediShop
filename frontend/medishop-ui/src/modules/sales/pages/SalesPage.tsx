// src/modules/sales/pages/SalesPage.tsx

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import SalesForm from '../components/SalesForm';
import SalesSearch from '../components/SalesSearch';
import SalesTable from '../components/SalesTable';
import { useSales, useSalesSearch } from '../hooks/useSales';
import type{ 
  SalesRequest, 
  UpdateSalesRequest, 
  SearchSalesRequest, 
  SalesResponse,
  SalesFormData 
} from '../types';

type ViewMode = 'list' | 'add' | 'edit';

const SalesPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [editingSale, setEditingSale] = useState<SalesResponse | null>(null);
  const [showSearch, setShowSearch] = useState(false);

  const { 
    sales, 
    loading, 
    error, 
    addSales, 
    updateSales, 
    deleteSales, 
    refetch 
  } = useSales();

  const { 
    searchResults, 
    loading: searchLoading, 
    error: searchError, 
    performSearch, 
    clearSearch 
  } = useSalesSearch();

  const [displayedSales, setDisplayedSales] = useState<SalesResponse[]>([]);
  const [isSearchActive, setIsSearchActive] = useState(false);

  React.useEffect(() => {
    if (isSearchActive) {
      setDisplayedSales(searchResults);
    } else {
      setDisplayedSales(sales);
    }
  }, [sales, searchResults, isSearchActive]);

  const handleAddSales = async (salesData: SalesRequest | UpdateSalesRequest) => {
    try {
      await addSales(salesData as SalesRequest);
      toast.success('Sales record added successfully!');
      setViewMode('list');
    } catch (error) {
      toast.error('Failed to add sales record');
    }
  };

  const handleUpdateSales = async (salesData: SalesRequest | UpdateSalesRequest) => {
    try {
      await updateSales(salesData as UpdateSalesRequest);
      toast.success('Sales record updated successfully!');
      setViewMode('list');
      setEditingSale(null);
    } catch (error) {
      toast.error('Failed to update sales record');
    }
  };

  const handleDeleteSales = async (itemsId: number) => {
    if (window.confirm('Are you sure you want to delete this sales record?')) {
      try {
        await deleteSales(itemsId);
        toast.success('Sales record deleted successfully!');
      } catch (error) {
        toast.error('Failed to delete sales record');
      }
    }
  };

  const handleEditSales = (sale: SalesResponse) => {
    setEditingSale(sale);
    setViewMode('edit');
  };

  const handleSearch = async (criteria: SearchSalesRequest) => {
    await performSearch(criteria);
    setIsSearchActive(true);
  };

  const handleClearSearch = () => {
    clearSearch();
    setIsSearchActive(false);
    setShowSearch(false);
  };

  const handleCancel = () => {
    setViewMode('list');
    setEditingSale(null);
  };

  const convertSalesResponseToFormData = (sale: SalesResponse): SalesFormData => {
    return {
      salesId: sale.salesId,
      customerPhoneNumber: sale.customerPhoneNumber,
      salesDate: sale.salesDate,
      medicineName: sale.medicineName,
      medicineUnitPrice: sale.medicineUnitPrice,
      perMedicineTotalQuantity: sale.perMedicineTotalQuantity,
    };
  };

  const getTotalSalesAmount = () => {
    return displayedSales.reduce((total, sale) => total + sale.totalPricePerCustomerTransaction, 0);
  };

  const getTotalQuantity = () => {
    return displayedSales.reduce((total, sale) => total + sale.perMedicineTotalQuantity, 0);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Error loading sales data
                </h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                </div>
                <div className="mt-3">
                  <button
                    onClick={refetch}
                    className="bg-red-100 px-3 py-2 rounded-md text-sm font-medium text-red-800 hover:bg-red-200"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Sales Management</h1>
              <p className="mt-1 text-sm text-gray-600">
                Manage and track all sales transactions
              </p>
            </div>
            
            {viewMode === 'list' && (
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowSearch(!showSearch)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    showSearch || isSearchActive
                      ? 'bg-blue-100 text-blue-700 border border-blue-300'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {showSearch ? 'Hide Search' : 'Search Sales'}
                </button>
                
                <button
                  onClick={() => setViewMode('add')}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                >
                  Add New Sale
                </button>
              </div>
            )}
          </div>

          {/* Stats Cards */}
          {viewMode === 'list' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                        <span className="text-white text-sm font-bold">📊</span>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Total Sales Records
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">
                          {displayedSales.length}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                        <span className="text-white text-sm font-bold">৳</span>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Total Sales Amount
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">
                          ৳{getTotalSalesAmount().toFixed(2)}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                        <span className="text-white text-sm font-bold">#</span>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Total Items Sold
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">
                          {getTotalQuantity()}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Search Component */}
        {showSearch && viewMode === 'list' && (
          <SalesSearch
            onSearch={handleSearch}
            onClear={handleClearSearch}
            loading={searchLoading}
          />
        )}

        {/* Search Results Info */}
        {isSearchActive && viewMode === 'list' && (
          <div className="mb-4 bg-blue-50 border border-blue-200 rounded-md p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <svg className="h-5 w-5 text-blue-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium text-blue-800">
                  Search Results: {searchResults.length} record(s) found
                </span>
              </div>
              <button
                onClick={handleClearSearch}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Clear Search
              </button>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="space-y-6">
          {viewMode === 'add' && (
            <SalesForm
              onSubmit={handleAddSales}
              onCancel={handleCancel}
              loading={loading}
            />
          )}

          {viewMode === 'edit' && editingSale && (
            <SalesForm
              initialData={convertSalesResponseToFormData(editingSale)}
              onSubmit={handleUpdateSales}
              onCancel={handleCancel}
              isEditing={true}
              loading={loading}
            />
          )}

          {viewMode === 'list' && (
            <SalesTable
              sales={displayedSales}
              onEdit={handleEditSales}
              onDelete={handleDeleteSales}
              loading={loading || searchLoading}
            />
          )}
        </div>

        {/* Search Error */}
        {searchError && (
          <div className="mt-4 bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Search Error
                </h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{searchError}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesPage;