// frontend/mediShop-ui/src/modules/supplier/components/SupplierSearch.tsx

import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import type{ SupplierSearchProps, SearchSupplierRequest } from '../types';

const SupplierSearch: React.FC<SupplierSearchProps> = ({
  onSearch,
  loading,
  onClear
}) => {
  const [searchCriteria, setSearchCriteria] = useState<SearchSupplierRequest>({
    companyName: '',
    email: '',
    phone: '',
    status: undefined
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let processedValue: string | boolean | undefined = value;

    if (name === 'status') {
      if (value === '') {
        processedValue = undefined;
      } else {
        processedValue = value === 'true';
      }
    }

    setSearchCriteria(prev => ({
      ...prev,
      [name]: processedValue
    }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Filter out empty strings but keep boolean values and undefined
    const filteredCriteria: SearchSupplierRequest = {};
    
    if (searchCriteria.companyName?.trim()) {
      filteredCriteria.companyName = searchCriteria.companyName.trim();
    }
    if (searchCriteria.email?.trim()) {
      filteredCriteria.email = searchCriteria.email.trim();
    }
    if (searchCriteria.phone?.trim()) {
      filteredCriteria.phone = searchCriteria.phone.trim();
    }
    if (searchCriteria.status !== undefined) {
      filteredCriteria.status = searchCriteria.status;
    }

    onSearch(filteredCriteria);
  };

  const handleClear = () => {
    setSearchCriteria({
      companyName: '',
      email: '',
      phone: '',
      status: undefined
    });
    onClear();
  };

  const hasSearchCriteria = 
    searchCriteria.companyName?.trim() || 
    searchCriteria.email?.trim() || 
    searchCriteria.phone?.trim() || 
    searchCriteria.status !== undefined;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <h3 className="text-lg font-medium text-gray-800 mb-4">Search Suppliers</h3>
      
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
              Company Name
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={searchCriteria.companyName || ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search by company name"
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={searchCriteria.email || ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search by email"
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={searchCriteria.phone || ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search by phone"
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={searchCriteria.status === undefined ? '' : searchCriteria.status.toString()}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            >
              <option value="">All</option>
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Search className="w-4 h-4 mr-2" />
            {loading ? 'Searching...' : 'Search'}
          </button>

          {hasSearchCriteria && (
            <button
              type="button"
              onClick={handleClear}
              disabled={loading}
              className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <X className="w-4 h-4 mr-2" />
              Clear
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default SupplierSearch;
