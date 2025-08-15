// src/modules/inventory/components/InventorySearch.tsx

import React, { useState } from 'react';
import type{ MedicineType, InventoryFilters } from '../types';
import { MEDICINE_TYPE } from '../types'; 

interface InventorySearchProps {
  onSearch: (filters: InventoryFilters) => void;
  onClear: () => void;
  // onReset: () => void;
  isLoading?: boolean;
}

const InventorySearch: React.FC<InventorySearchProps> = ({
  onSearch,
  onClear,
  isLoading = false,
}) => {
  const [filters, setFilters] = useState<InventoryFilters>({
    medicineName: '',
    companyName: '',
    type: '',
    location: '',
    minStock: 0,
    maxStock: 0,
    expiryStatus: 'all',
    sortBy: 'medicineName',
    sortOrder: 'asc',
  });

  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: type === 'number' ? (value === '' ? 0 : Number(value)) : value,
    }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(filters);
  };

  const handleClear = () => {
    const clearedFilters: InventoryFilters = {
      medicineName: '',
      companyName: '',
      type: '',
      location: '',
      minStock: 0,
      maxStock: 0,
      expiryStatus: 'all',
      sortBy: 'medicineName',
      sortOrder: 'asc',
    };
    setFilters(clearedFilters);
    onClear();
  };

  const medicineTypes = Object.values(MEDICINE_TYPE);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Search & Filter Inventory</h3>
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          {showAdvanced ? 'Hide' : 'Show'} Advanced Filters
        </button>
      </div>

      <form onSubmit={handleSearch}>
        {/* Basic Search */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Medicine Name
            </label>
            <input
              type="text"
              name="medicineName"
              value={filters.medicineName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search by medicine name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Name
            </label>
            <input
              type="text"
              name="companyName"
              value={filters.companyName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search by company name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Medicine Type
            </label>
            <select
              name="type"
              value={filters.type}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Types</option>
              {medicineTypes.map(type => (
                <option key={type} value={type}>
                  {type.replace('_', ' ')}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Advanced Filters */}
        {showAdvanced && (
          <div className="border-t pt-4 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={filters.location}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Storage location"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Min Stock
                </label>
                <input
                  type="number"
                  name="minStock"
                  value={filters.minStock || ''}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Minimum stock"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Stock
                </label>
                <input
                  type="number"
                  name="maxStock"
                  value={filters.maxStock || ''}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Maximum stock"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expiry Status
                </label>
                <select
                  name="expiryStatus"
                  value={filters.expiryStatus}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Items</option>
                  <option value="expired">Expired</option>
                  <option value="expiring">Expiring Soon</option>
                  <option value="valid">Valid</option>
                </select>
              </div>
            </div>

            {/* Sorting Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort By
                </label>
                <select
                  name="sortBy"
                  value={filters.sortBy}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="medicineName">Medicine Name</option>
                  <option value="expiryDate">Expiry Date</option>
                  <option value="availableQuantity">Available Quantity</option>
                  <option value="lastUpdated">Last Updated</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort Order
                </label>
                <select
                  name="sortOrder"
                  value={filters.sortOrder}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={handleClear}
            disabled={isLoading}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50"
          >
            Clear
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {/* Quick Filter Buttons */}
      <div className="border-t pt-4 mt-4">
        <p className="text-sm font-medium text-gray-700 mb-2">Quick Filters:</p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              const quickFilter = { ...filters, expiryStatus: 'expired' as const };
              setFilters(quickFilter);
              onSearch(quickFilter);
            }}
            className="px-3 py-1 text-sm bg-red-100 text-red-800 rounded-full hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Expired Items
          </button>
          <button
            type="button"
            onClick={() => {
              const quickFilter = { ...filters, expiryStatus: 'expiring' as const };
              setFilters(quickFilter);
              onSearch(quickFilter);
            }}
            className="px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded-full hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            Expiring Soon
          </button>
          <button
            type="button"
            onClick={() => {
              const quickFilter = { ...filters, maxStock: 10 };
              setFilters(quickFilter);
              onSearch(quickFilter);
            }}
            className="px-3 py-1 text-sm bg-orange-100 text-orange-800 rounded-full hover:bg-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            Low Stock (&lt;10)
          </button>
          <button
            type="button"
            onClick={() => {
              const quickFilter = { ...filters, type: MEDICINE_TYPE.TABLET };
              setFilters(quickFilter);
              onSearch(quickFilter);
            }}
            className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Tablets Only
          </button>
        </div>
      </div>
    </div>
  );
};

export default InventorySearch;