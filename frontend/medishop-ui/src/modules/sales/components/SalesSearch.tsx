// src/modules/sales/components/SalesSearch.tsx

import React, { useState } from 'react';
import type{ SearchSalesRequest, SalesFilters } from '../types';

interface SalesSearchProps {
  onSearch: (criteria: SearchSalesRequest) => void;
  onClear: () => void;
  loading?: boolean;
}

const SalesSearch: React.FC<SalesSearchProps> = ({
  onSearch,
  onClear,
  loading = false
}) => {
  const [filters, setFilters] = useState<SalesFilters>({
    salesId: '',
    customerPhoneNumber: '',
    medicineName: '',
    startDate: '',
    endDate: '',
    salesDate: ''
  });

  const [searchType, setSearchType] = useState<'single' | 'range'>('single');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    const searchCriteria: SearchSalesRequest = {};

    // Add non-empty filters to search criteria
    if (filters.salesId.trim()) {
      searchCriteria.salesId = parseInt(filters.salesId);
    }
    
    if (filters.customerPhoneNumber.trim()) {
      searchCriteria.customerPhoneNumber = filters.customerPhoneNumber.trim();
    }
    
    if (filters.medicineName.trim()) {
      searchCriteria.medicineName = filters.medicineName.trim();
    }

    // Handle date filters based on search type
    if (searchType === 'single' && filters.salesDate) {
      searchCriteria.salesDate = filters.salesDate;
    } else if (searchType === 'range') {
      if (filters.startDate) {
        searchCriteria.startDate = filters.startDate;
      }
      if (filters.endDate) {
        searchCriteria.endDate = filters.endDate;
      }
    }

    onSearch(searchCriteria);
  };

  const handleClear = () => {
    setFilters({
      salesId: '',
      customerPhoneNumber: '',
      medicineName: '',
      startDate: '',
      endDate: '',
      salesDate: ''
    });
    setSearchType('single');
    onClear();
  };

  const hasActiveFilters = Object.values(filters).some(value => value.trim() !== '');

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Search Sales Records</h3>

      <form onSubmit={handleSearch} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Sales ID */}
          <div>
            <label htmlFor="salesId" className="block text-sm font-medium text-gray-700 mb-1">
              Sales ID
            </label>
            <input
              type="number"
              id="salesId"
              name="salesId"
              value={filters.salesId}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter sales ID"
            />
          </div>

          {/* Customer Phone */}
          <div>
            <label htmlFor="customerPhoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Customer Phone
            </label>
            <input
              type="text"
              id="customerPhoneNumber"
              name="customerPhoneNumber"
              value={filters.customerPhoneNumber}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="01XXXXXXXXX"
            />
          </div>

          {/* Medicine Name */}
          <div>
            <label htmlFor="medicineName" className="block text-sm font-medium text-gray-700 mb-1">
              Medicine Name
            </label>
            <input
              type="text"
              id="medicineName"
              name="medicineName"
              value={filters.medicineName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter medicine name"
            />
          </div>
        </div>

        {/* Date Search Type Toggle */}
        <div className="border-t pt-4">
          <div className="flex items-center space-x-4 mb-4">
            <span className="text-sm font-medium text-gray-700">Date Search:</span>
            <label className="flex items-center">
              <input
                type="radio"
                name="searchType"
                value="single"
                checked={searchType === 'single'}
                onChange={(e) => setSearchType(e.target.value as 'single' | 'range')}
                className="mr-2"
              />
              Single Date
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="searchType"
                value="range"
                checked={searchType === 'range'}
                onChange={(e) => setSearchType(e.target.value as 'single' | 'range')}
                className="mr-2"
              />
              Date Range
            </label>
          </div>

          {/* Date Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {searchType === 'single' ? (
              <div>
                <label htmlFor="salesDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Sales Date
                </label>
                <input
                  type="date"
                  id="salesDate"
                  name="salesDate"
                  value={filters.salesDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ) : (
              <>
                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={filters.startDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={filters.endDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>

          <button
            type="button"
            onClick={handleClear}
            disabled={!hasActiveFilters}
            className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Clear Filters
          </button>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="bg-blue-50 p-3 rounded-md">
            <span className="text-sm font-medium text-blue-800">Active Filters: </span>
            <div className="flex flex-wrap gap-2 mt-2">
              {filters.salesId && (
                <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-xs">
                  Sales ID: {filters.salesId}
                </span>
              )}
              {filters.customerPhoneNumber && (
                <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-xs">
                  Phone: {filters.customerPhoneNumber}
                </span>
              )}
              {filters.medicineName && (
                <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-xs">
                  Medicine: {filters.medicineName}
                </span>
              )}
              {filters.salesDate && (
                <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-xs">
                  Date: {filters.salesDate}
                </span>
              )}
              {filters.startDate && (
                <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-xs">
                  From: {filters.startDate}
                </span>
              )}
              {filters.endDate && (
                <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-xs">
                  To: {filters.endDate}
                </span>
              )}
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default SalesSearch;