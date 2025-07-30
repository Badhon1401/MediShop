import React, { useState } from 'react';
import type{ Inventory } from '../types';

interface InventoryTableProps {
  inventories: Inventory[];
  onEdit: (inventory: Inventory) => void;
  onDelete: (id: number) => void;
  onStockUpdate: (inventory: Inventory) => void;
  isLoading?: boolean;
}

const InventoryTable: React.FC<InventoryTableProps> = ({
  inventories,
  onEdit,
  onDelete,
  onStockUpdate,
  isLoading = false,
}) => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Inventory;
    direction: 'asc' | 'desc';
  } | null>(null);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getExpiryStatus = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const today = new Date();
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return { status: 'expired', class: 'bg-red-100 text-red-800', text: 'Expired' };
    } else if (diffDays <= 30) {
      return { status: 'expiring', class: 'bg-yellow-100 text-yellow-800', text: `${diffDays} days` };
    } else {
      return { status: 'valid', class: 'bg-green-100 text-green-800', text: 'Valid' };
    }
  };

  const getStockStatus = (available: number, total: number) => {
    const percentage = (available / total) * 100;
    if (percentage <= 10) {
      return { class: 'bg-red-100 text-red-800', text: 'Critical' };
    } else if (percentage <= 25) {
      return { class: 'bg-yellow-100 text-yellow-800', text: 'Low' };
    } else {
      return { class: 'bg-green-100 text-green-800', text: 'Good' };
    }
  };

  const handleSort = (key: keyof Inventory) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedInventories = React.useMemo(() => {
  if (!sortConfig) return inventories;

  return [...inventories].sort((a, b) => {
    const aValue = a[sortConfig.key as keyof typeof a];
    const bValue = b[sortConfig.key as keyof typeof b];

    // Handle undefined values for supplierId
    if (sortConfig.key === 'supplierId') {
      const aVal = (aValue as number | undefined) ?? Number.MAX_SAFE_INTEGER;
      const bVal = (bValue as number | undefined) ?? Number.MAX_SAFE_INTEGER;
      return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
    }

    // Generic comparison for strings/numbers
    const aVal = aValue ?? '';
    const bVal = bValue ?? '';

    if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });
}, [inventories, sortConfig]);


  const getSortIcon = (columnName: keyof Inventory) => {
    if (!sortConfig || sortConfig.key !== columnName) {
      return '↕️';
    }
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (inventories.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <div className="text-gray-500">
          <svg
            className="mx-auto h-12 w-12 text-gray-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8V4a1 1 0 00-1-1H7a1 1 0 00-1 1v1m8 0V4.5"
            />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No inventory items found</h3>
          <p className="text-gray-500">Add some inventory items to get started.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">
          Inventory Items ({inventories.length})
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('medicineName')}
              >
                Medicine Name {getSortIcon('medicineName')}
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('batchNumber')}
              >
                Batch Number {getSortIcon('batchNumber')}
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('companyName')}
              >
                Company {getSortIcon('companyName')}
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('supplierId')}
              >
                Supplier ID {getSortIcon('supplierId')}
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('type')}
              >
                Type {getSortIcon('type')}
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('availableQuantity')}
              >
                Stock {getSortIcon('availableQuantity')}
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('expiryDate')}
              >
                Expiry {getSortIcon('expiryDate')}
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('unitPrice')}
              >
                Unit Price {getSortIcon('unitPrice')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedInventories.map((inventory) => {
              const expiryStatus = getExpiryStatus(inventory.expiryDate);
              const stockStatus = getStockStatus(inventory.availableQuantity, inventory.totalQuantity);

              return (
                <tr key={inventory.inventoryId} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {inventory.medicineName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{inventory.batchNumber}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{inventory.companyName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {inventory.supplierId ?? 'N/A'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {inventory.type.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm text-gray-900">
                        {inventory.availableQuantity}/{inventory.totalQuantity}
                      </div>
                      <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${stockStatus.class}`}>
                        {stockStatus.text}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm text-gray-900">
                        {formatDate(inventory.expiryDate)}
                      </div>
                      <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${expiryStatus.class}`}>
                        {expiryStatus.text}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      ৳{inventory.unitPrice.toFixed(2)}
                      {inventory.discount > 0 && (
                        <span className="text-xs text-green-600 block">
                          -{inventory.discount}%
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{inventory.location}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => onStockUpdate(inventory)}
                        className="text-blue-600 hover:text-blue-900 font-medium"
                        title="Update Stock"
                      >
                        Stock
                      </button>
                      <button
                        onClick={() => onEdit(inventory)}
                        className="text-indigo-600 hover:text-indigo-900 font-medium"
                        title="Edit"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete(inventory.inventoryId)}
                        className="text-red-600 hover:text-red-900 font-medium"
                        title="Delete"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryTable;