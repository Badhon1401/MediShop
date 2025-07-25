// src/modules/inventory/components/InventorySearch.tsx

import React, { useState } from 'react';
import type { MedicineType, ExpiryStatus, StockLevel, InventorySearchFilters } from '../types';

import { MEDICINE_TYPE, EXPIRY_STATUS, STOCK_LEVEL } from '../types'; 

// const med: MedicineType = MEDICINE_TYPE.TABLET;

// const stock: StockLevel = STOCK_LEVEL.LOW_STOCK;

interface InventorySearchProps {
  onSearch: (filters: InventorySearchFilters) => void;
  onReset: () => void;
  isLoading?: boolean;
}

export const InventorySearch: React.FC<InventorySearchProps> = ({
  onSearch,
  onReset,
  isLoading = false,
}) => {
  const [filters, setFilters] = useState<InventorySearchFilters>({
    medicineName: '',
    batchNumber: '',
    companyName: '',
    location: '',
    type: undefined,
    expiryStatus: undefined,
    stockLevel: undefined,
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value === '' ? undefined : value,
    }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(filters);
  };

  const handleReset = () => {
    const resetFilters: InventorySearchFilters = {
      medicineName: '',
      batchNumber: '',
      companyName: '',
      location: '',
      type: undefined,
      expiryStatus: undefined,
      stockLevel: undefined,
    };
    setFilters(resetFilters);
    onReset();
  };

  const hasActiveFilters = Object.values(filters).some(value => 
    value !== undefined && value !== ''
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Search Inventory</h3>
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-600 hover:text-blue-800 focus:outline-none"
        >
          {isExpanded ? 'Hide Filters' : 'Show All Filters'}
        </button>
      </div>

      <form onSubmit={handleSearch} className="space-y-4">
        {/* Basic Search */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label htmlFor="medicineName" className="block text-sm font-medium text-gray-700 mb-1">
              Medicine Name
            </label>
            <input
              type="text"
              id="medicineName"
              name="medicineName"
              value={filters.medicineName || ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search by medicine name..."
            />
          </div>

          <div>
            <label htmlFor="batchNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Batch Number
            </label>
            <input
              type="text"
              id="batchNumber"
              name="batchNumber"
              value={filters.batchNumber || ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search by batch number..."
            />
          </div>

          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
              Company Name
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={filters.companyName || ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search by company name..."
            />
          </div>
        </div>

        {/* Advanced Filters */}
        {isExpanded && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={filters.location || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search by location..."
              />
            </div>

            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                Medicine Type
              </label>
              <select
                id="type"
                name="type"
                value={filters.type || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Types</option>
                {Object.values(MEDICINE_TYPE).map(type => (
                  <option key={type} value={type}>
                    {type.toLowerCase().replace('_', ' ')}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="expiryStatus" className="block text-sm font-medium text-gray-700 mb-1">
                Expiry Status
              </label>
              <select
                id="expiryStatus"
                name="expiryStatus"
                value={filters.expiryStatus || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Status</option>
                <option value={EXPIRY_STATUS.VALID}>Valid</option>
                <option value={EXPIRY_STATUS.EXPIRING_SOON}>Expiring Soon</option>
                <option value={EXPIRY_STATUS.EXPIRED}>Expired</option>
              </select>
            </div>

            <div>
              <label htmlFor="stockLevel" className="block text-sm font-medium text-gray-700 mb-1">
                Stock Level
              </label>
              <select
                id="stockLevel"
                name="stockLevel"
                value={filters.stockLevel || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Levels</option>
                <option value={STOCK_LEVEL.ADEQUATE}>Adequate</option>
                <option value={STOCK_LEVEL.LOW_STOCK}>Low Stock</option>
                <option value={STOCK_LEVEL.OUT_OF_STOCK}>Out of Stock</option>
              </select>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between items-center pt-4">
          <div className="flex space-x-3">
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Searching...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Search
                </>
              )}
            </button>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleReset}
                disabled={isLoading}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Reset
              </button>
            )}
          </div>

          {hasActiveFilters && (
            <div className="text-sm text-gray-600">
              Active filters applied
            </div>
          )}
        </div>
      </form>
    </div>
  );
};