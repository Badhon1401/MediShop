// frontend/mediShop-ui/src/modules/supplier/components/SupplierTable.tsx

import React, { useState } from 'react';
import { Edit, Trash2, UserCheck, UserX, Mail, Phone, Building } from 'lucide-react';
import type{ SupplierTableProps, SupplierResponse } from '../types';

const SupplierTable: React.FC<SupplierTableProps> = ({
  suppliers,
  onEdit,
  onDelete,
  onActivate,
  onDeactivate,
  loading
}) => {
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const handleDeleteClick = (supplierId: number) => {
    setDeleteConfirm(supplierId);
  };

  const handleDeleteConfirm = (supplierId: number) => {
    onDelete(supplierId);
    setDeleteConfirm(null);
  };

  const handleDeleteCancel = () => {
    setDeleteConfirm(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (suppliers.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <Building className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No suppliers found</h3>
        <p className="text-gray-500">Get started by adding your first supplier.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">
          Suppliers ({suppliers.length})
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Company
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact Info
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {suppliers.map((supplier) => (
              <tr key={supplier.supplierId} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Building className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {supplier.companyName}
                      </div>
                      <div className="text-sm text-gray-500">
                        ID: {supplier.supplierId}
                      </div>
                    </div>
                  </div>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="space-y-1">
                    <div className="flex items-center text-sm text-gray-900">
                      <Mail className="w-4 h-4 text-gray-400 mr-2" />
                      {supplier.email}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Phone className="w-4 h-4 text-gray-400 mr-2" />
                      {supplier.phone}
                    </div>
                  </div>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    supplier.status 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {supplier.status ? 'Active' : 'Inactive'}
                  </span>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(supplier.createdAt)}
                  {supplier.updatedAt && (
                    <div className="text-xs text-gray-400">
                      Updated: {formatDate(supplier.updatedAt)}
                    </div>
                  )}
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEdit(supplier)}
                      className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                      title="Edit supplier"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    
                    {supplier.status ? (
                      <button
                        onClick={() => onDeactivate(supplier.supplierId)}
                        className="text-orange-600 hover:text-orange-900 p-1 rounded hover:bg-orange-50"
                        title="Deactivate supplier"
                      >
                        <UserX className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={() => onActivate(supplier.supplierId)}
                        className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50"
                        title="Activate supplier"
                      >
                        <UserCheck className="w-4 h-4" />
                      </button>
                    )}
                    
                    {deleteConfirm === supplier.supplierId ? (
                      <div className="flex space-x-1">
                        <button
                          onClick={() => handleDeleteConfirm(supplier.supplierId)}
                          className="text-red-600 hover:text-red-900 px-2 py-1 text-xs bg-red-100 rounded"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={handleDeleteCancel}
                          className="text-gray-600 hover:text-gray-900 px-2 py-1 text-xs bg-gray-100 rounded"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleDeleteClick(supplier.supplierId)}
                        className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                        title="Delete supplier"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SupplierTable;