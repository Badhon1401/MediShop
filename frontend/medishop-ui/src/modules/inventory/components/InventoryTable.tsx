// src/modules/inventory/components/InventoryTable.tsx

import React from 'react';
import type { Inventory } from '../types';

interface InventoryTableProps {
  inventoryItems: Inventory[];
  onEdit: (inventory: Inventory) => void;
  onDelete: (id: number) => void;
  onView: (inventory: Inventory) => void;
  isLoading?: boolean;
}

export const InventoryTable: React.FC<InventoryTableProps> = ({
  inventoryItems,
  onEdit,
  onDelete,
  onView,
  isLoading = false,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB');
  };

  const formatCurrency = (amount: number) => {
    return `৳${amount.toFixed(2)}`;
  };

  const getExpiryStatus = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return { status: 'Expired', className: 'bg-red-100 text-red-800', days: Math.abs(diffDays) };
    } else if (diffDays <= 30) {
      return { status: 'Expiring Soon', className: 'bg-yellow-100 text-yellow-800', days: diffDays };
    } else {
      return { status: 'Valid', className: 'bg-green-100 text-green-800', days: diffDays };
    }
  };

  const getStockStatus = (available: number, total: number) => {
    const percentage = (available / total) * 100;
    
    if (available === 0) {
      return { status: 'Out of Stock', className: 'bg-red-100 text-red-800' };
    } else if (percentage <= 20) {
      return { status: 'Low Stock', className: 'bg-orange-100 text-orange-800' };
    } else if (percentage <= 50) {
      return { status: 'Medium Stock', className: 'bg-yellow-100 text-yellow-800' };
    } else {
      return { status: 'Good Stock', className: 'bg-green-100 text-green-800' };
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-8 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Loading inventory items...</p>
        </div>
      </div>
    );
  }

  if (inventoryItems.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-8 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8l-4-4m0 0L9 5m6-6v4" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No inventory items found</h3>
          <p className="mt-1 text-sm text-gray-500">
            No inventory items match your current search criteria.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Medicine Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Batch & Company
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pricing
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Expiry Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {inventoryItems.map((item) => {
              const expiryStatus = getExpiryStatus(item.expiryDate);
              const stockStatus = getStockStatus(item.availableQuantity, item.totalQuantity);
              
              return (
                <tr key={item.inventoryId} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {item.medicineName || `Medicine ID: ${item.medicineId}`}
                      </div>
                      <div className="text-sm text-gray-500">
                        {item.type.toLowerCase().replace('_', ' ')}
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {item.batchNumber}
                      </div>
                      <div className="text-sm text-gray-500">
                        {item.companyName}
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col space-y-1">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${stockStatus.className}`}>
                        {stockStatus.status}
                      </span>
                      <div className="text-sm text-gray-600">
                        {item.availableQuantity} / {item.totalQuantity}
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div>Sell: {formatCurrency(item.unitPrice)}</div>
                      <div className="text-gray-500">Cost: {formatCurrency(item.purchasePrice)}</div>
                      {item.discount > 0 && (
                        <div className="text-green-600">Disc: {item.discount}%</div>
                      )}
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col space-y-1">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${expiryStatus.className}`}>
                        {expiryStatus.status}
                      </span>
                      <div className="text-xs text-gray-600">
                        {formatDate(item.expiryDate)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {expiryStatus.status === 'Expired' 
                          ? `${expiryStatus.days} days ago`
                          : `${expiryStatus.days} days left`
                        }
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {item.location}
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => onView(item)}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-100"
                        title="View Details"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      
                      <button
                        onClick={() => onEdit(item)}
                        className="text-green-600 hover:text-green-900 p-1 rounded-full hover:bg-green-100"
                        title="Edit"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      
                      <button
                        onClick={() => onDelete(item.inventoryId)}
                        className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-100"
                        title="Delete"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
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