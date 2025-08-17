import React from 'react';
import { Search, Filter, AlertTriangle } from 'lucide-react';
import type { MedicineSearchFilters, MedicineType } from '../types';

const MEDICINE_TYPES: MedicineType[] = ['TABLET', 'CAPSULE', 'SYRUP', 'INJECTION', 'OINTMENT', 'DROP'];

interface MedicineSearchProps {
  filters: MedicineSearchFilters;
  onFiltersChange: (filters: MedicineSearchFilters) => void;
  onSearch: () => void;
  onClear: () => void;
  showExpiringOnly: boolean;
  onExpiringToggle: (show: boolean) => void;
  expiringDays: number;
  onExpiringDaysChange: (days: number) => void;
  onExpiringSearch: () => void;
}

export const MedicineSearch: React.FC<MedicineSearchProps> = ({
  filters,
  onFiltersChange,
  onSearch,
  onClear,
  showExpiringOnly,
  onExpiringToggle,
  expiringDays,
  onExpiringDaysChange,
  onExpiringSearch,
}) => {
  const handleFilterChange = (field: keyof MedicineSearchFilters, value: string) => {
    onFiltersChange({
      ...filters,
      [field]: value,
    });
  };

  const handleSearch = () => {
    if (showExpiringOnly) {
      onExpiringSearch();
    } else {
      onSearch();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            value={filters.name}
            onChange={(e) => handleFilterChange('name', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Search by name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
          <select
            value={filters.type}
            onChange={(e) => handleFilterChange('type', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Types</option>
            {MEDICINE_TYPES.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <input
            type="text"
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Search by category"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Batch Number</label>
          <input
            type="text"
            value={filters.batchNumber}
            onChange={(e) => handleFilterChange('batchNumber', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Search by batch"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="expiring"
            checked={showExpiringOnly}
            onChange={(e) => onExpiringToggle(e.target.checked)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="expiring" className="text-sm font-medium text-gray-700 flex items-center gap-1">
            <AlertTriangle size={16} className="text-orange-500" />
            Show expiring medicines only
          </label>
          {showExpiringOnly && (
            <div className="flex items-center gap-2 ml-2">
              <span className="text-sm text-gray-600">Days:</span>
              <input
                type="number"
                min="1"
                max="365"
                value={expiringDays}
                onChange={(e) => onExpiringDaysChange(parseInt(e.target.value))}
                className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
              />
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
          >
            <Search size={16} />
            Search
          </button>
          <button
            onClick={onClear}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors font-medium flex items-center gap-2"
          >
            <Filter size={16} />
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};