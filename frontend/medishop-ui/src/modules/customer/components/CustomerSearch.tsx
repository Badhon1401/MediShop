import React, { useState } from 'react';
import type{ CustomerSearchProps, CustomerSearchFilters } from '../types';

const CustomerSearch: React.FC<CustomerSearchProps> = ({ onSearch, loading }) => {
  const [filters, setFilters] = useState<CustomerSearchFilters>({
    name: '',
    contact_number: '',
    registration_date_from: '',
    registration_date_to: ''
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Filter out empty values
    const activeFilters = Object.entries(filters).reduce((acc, [key, value]) => {
      if (value && value.trim() !== '') {
        acc[key as keyof CustomerSearchFilters] = value.trim();
      }
      return acc;
    }, {} as CustomerSearchFilters);

    onSearch(activeFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      name: '',
      contact_number: '',
      registration_date_from: '',
      registration_date_to: ''
    };
    setFilters(resetFilters);
    onSearch({});
  };

  const hasActiveFilters = Object.values(filters).some(value => value && value.trim() !== '');

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Search Customers</h3>
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          {isExpanded ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      <form onSubmit={handleSearch}>
        {/* Basic Search - Always Visible */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="search-name" className="block text-sm font-medium text-gray-700 mb-1">
              Customer Name
            </label>
            <input
              type="text"
              id="search-name"
              name="name"
              value={filters.name}
              onChange={handleInputChange}
              disabled={loading}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                loading ? 'bg-gray-100 cursor-not-allowed' : ''
              }`}
              placeholder="Search by customer name"
            />
          </div>

          <div>
            <label htmlFor="search-phone" className="block text-sm font-medium text-gray-700 mb-1">
              Contact Number
            </label>
            <input
              type="text"
              id="search-phone"
              name="contact_number"
              value={filters.contact_number}
              onChange={handleInputChange}
              disabled={loading}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                loading ? 'bg-gray-100 cursor-not-allowed' : ''
              }`}
              placeholder="Search by phone number"
            />
          </div>
        </div>

        {/* Advanced Filters - Toggle Visibility */}
        {isExpanded && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 bg-gray-50 rounded-md">
            <div>
              <label htmlFor="date-from" className="block text-sm font-medium text-gray-700 mb-1">
                Registration Date From
              </label>
              <input
                type="date"
                id="date-from"
                name="registration_date_from"
                value={filters.registration_date_from}
                onChange={handleInputChange}
                disabled={loading}
                className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  loading ? 'bg-gray-100 cursor-not-allowed' : ''
                }`}
              />
            </div>

            <div>
              <label htmlFor="date-to" className="block text-sm font-medium text-gray-700 mb-1">
                Registration Date To
              </label>
              <input
                type="date"
                id="date-to"
                name="registration_date_to"
                value={filters.registration_date_to}
                onChange={handleInputChange}
                disabled={loading}
                min={filters.registration_date_from || undefined}
                className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  loading ? 'bg-gray-100 cursor-not-allowed' : ''
                }`}
              />
            </div>
          </div>
        )}

        {/* Search Actions */}
        <div className="flex flex-col sm:flex-row gap-3 sm:justify-between">
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                loading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Searching...
                </div>
              ) : (
                'Search'
              )}
            </button>

            <button
              type="button"
              onClick={handleReset}
              disabled={loading}
              className={`px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 ${
                loading 
                  ? 'cursor-not-allowed opacity-50' 
                  : 'hover:bg-gray-50'
              }`}
            >
              Reset
            </button>
          </div>

          {hasActiveFilters && (
            <div className="text-sm text-gray-600 flex items-center">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Filters Active
              </span>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default CustomerSearch;