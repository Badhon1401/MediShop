// src/modules/inventory/components/InventoryForm.tsx

import React, { useState, useEffect } from 'react';
import type { 
  Inventory, 
  InventoryCreateRequest, 
  InventoryUpdateRequest, 
  MedicineType 
} from '../types';
import { useMedicines } from '../hooks/useInventory';

import { MEDICINE_TYPE, EXPIRY_STATUS, STOCK_LEVEL } from '../types'; 

interface InventoryFormProps {
  inventory?: Inventory;
  onSubmit: (data: InventoryCreateRequest | InventoryUpdateRequest) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export const InventoryForm: React.FC<InventoryFormProps> = ({
  inventory,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const { medicines, loading: medicinesLoading } = useMedicines();
  const [formData, setFormData] = useState({
    medicineId: inventory?.medicineId || 0,
    batchNumber: inventory?.batchNumber || '',
    companyName: inventory?.companyName || '',
    expiryDate: inventory?.expiryDate || '',
    location: inventory?.location || '',
    type: inventory?.type || MEDICINE_TYPE.TABLET,
    purchaseDate: inventory?.purchaseDate || '',
    totalQuantity: inventory?.totalQuantity || 0,
    availableQuantity: inventory?.availableQuantity || 0,
    unitPrice: inventory?.unitPrice || 0,
    purchasePrice: inventory?.purchasePrice || 0,
    discount: inventory?.discount || 0,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value,
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.medicineId || formData.medicineId === 0) {
      newErrors.medicineId = 'Please select a medicine';
    }
    if (!formData.batchNumber.trim()) {
      newErrors.batchNumber = 'Batch number is required';
    }
    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }
    if (!formData.expiryDate) {
      newErrors.expiryDate = 'Expiry date is required';
    }
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    if (!formData.purchaseDate) {
      newErrors.purchaseDate = 'Purchase date is required';
    }
    if (formData.totalQuantity <= 0) {
      newErrors.totalQuantity = 'Total quantity must be greater than 0';
    }
    if (formData.availableQuantity < 0) {
      newErrors.availableQuantity = 'Available quantity cannot be negative';
    }
    if (formData.availableQuantity > formData.totalQuantity) {
      newErrors.availableQuantity = 'Available quantity cannot exceed total quantity';
    }
    if (formData.unitPrice <= 0) {
      newErrors.unitPrice = 'Unit price must be greater than 0';
    }
    if (formData.purchasePrice <= 0) {
      newErrors.purchasePrice = 'Purchase price must be greater than 0';
    }
    if (formData.discount < 0 || formData.discount > 100) {
      newErrors.discount = 'Discount must be between 0 and 100';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      if (inventory) {
        await onSubmit({
          ...formData,
          inventoryId: inventory.inventoryId,
        } as InventoryUpdateRequest);
      } else {
        await onSubmit(formData as InventoryCreateRequest);
      }
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {inventory ? 'Edit Inventory Item' : 'Add New Inventory Item'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Medicine Selection */}
          <div>
            <label htmlFor="medicineId" className="block text-sm font-medium text-gray-700 mb-2">
              Medicine *
            </label>
            <select
              id="medicineId"
              name="medicineId"
              value={formData.medicineId}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.medicineId ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={medicinesLoading}
            >
              <option value={0}>Select a medicine</option>
              {medicines.map(medicine => (
                <option key={medicine.medicineId} value={medicine.medicineId}>
                  {medicine.name} - {medicine.companyName}
                </option>
              ))}
            </select>
            {errors.medicineId && (
              <p className="mt-1 text-sm text-red-600">{errors.medicineId}</p>
            )}
          </div>

          {/* Batch Number */}
          <div>
            <label htmlFor="batchNumber" className="block text-sm font-medium text-gray-700 mb-2">
              Batch Number *
            </label>
            <input
              type="text"
              id="batchNumber"
              name="batchNumber"
              value={formData.batchNumber}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.batchNumber ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter batch number"
            />
            {errors.batchNumber && (
              <p className="mt-1 text-sm text-red-600">{errors.batchNumber}</p>
            )}
          </div>

          {/* Company Name */}
          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
              Company Name *
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.companyName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter company name"
            />
            {errors.companyName && (
              <p className="mt-1 text-sm text-red-600">{errors.companyName}</p>
            )}
          </div>

          {/* Medicine Type */}
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
              Medicine Type *
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Object.values(MEDICINE_TYPE).map(type => (
                <option key={type} value={type}>
                  {type.toLowerCase().replace('_', ' ')}
                </option>
              ))}
            </select>
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
              Storage Location *
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.location ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="e.g., Shelf A-1, Room 2"
            />
            {errors.location && (
              <p className="mt-1 text-sm text-red-600">{errors.location}</p>
            )}
          </div>

          {/* Purchase Date */}
          <div>
            <label htmlFor="purchaseDate" className="block text-sm font-medium text-gray-700 mb-2">
              Purchase Date *
            </label>
            <input
              type="date"
              id="purchaseDate"
              name="purchaseDate"
              value={formData.purchaseDate}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.purchaseDate ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.purchaseDate && (
              <p className="mt-1 text-sm text-red-600">{errors.purchaseDate}</p>
            )}
          </div>

          {/* Expiry Date */}
          <div>
            <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-2">
              Expiry Date *
            </label>
            <input
              type="date"
              id="expiryDate"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.expiryDate ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.expiryDate && (
              <p className="mt-1 text-sm text-red-600">{errors.expiryDate}</p>
            )}
          </div>

          {/* Total Quantity */}
          <div>
            <label htmlFor="totalQuantity" className="block text-sm font-medium text-gray-700 mb-2">
              Total Quantity *
            </label>
            <input
              type="number"
              id="totalQuantity"
              name="totalQuantity"
              value={formData.totalQuantity}
              onChange={handleInputChange}
              min="1"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.totalQuantity ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter total quantity"
            />
            {errors.totalQuantity && (
              <p className="mt-1 text-sm text-red-600">{errors.totalQuantity}</p>
            )}
          </div>

          {/* Available Quantity */}
          <div>
            <label htmlFor="availableQuantity" className="block text-sm font-medium text-gray-700 mb-2">
              Available Quantity *
            </label>
            <input
              type="number"
              id="availableQuantity"
              name="availableQuantity"
              value={formData.availableQuantity}
              onChange={handleInputChange}
              min="0"
              max={formData.totalQuantity}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.availableQuantity ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter available quantity"
            />
            {errors.availableQuantity && (
              <p className="mt-1 text-sm text-red-600">{errors.availableQuantity}</p>
            )}
          </div>

          {/* Purchase Price */}
          <div>
            <label htmlFor="purchasePrice" className="block text-sm font-medium text-gray-700 mb-2">
              Purchase Price (৳) *
            </label>
            <input
              type="number"
              id="purchasePrice"
              name="purchasePrice"
              value={formData.purchasePrice}
              onChange={handleInputChange}
              min="0"
              step="0.01"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.purchasePrice ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter purchase price per unit"
            />
            {errors.purchasePrice && (
              <p className="mt-1 text-sm text-red-600">{errors.purchasePrice}</p>
            )}
          </div>

          {/* Unit Price */}
          <div>
            <label htmlFor="unitPrice" className="block text-sm font-medium text-gray-700 mb-2">
              Selling Price (৳) *
            </label>
            <input
              type="number"
              id="unitPrice"
              name="unitPrice"
              value={formData.unitPrice}
              onChange={handleInputChange}
              min="0"
              step="0.01"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.unitPrice ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter selling price per unit"
            />
            {errors.unitPrice && (
              <p className="mt-1 text-sm text-red-600">{errors.unitPrice}</p>
            )}
          </div>

          {/* Discount */}
          <div>
            <label htmlFor="discount" className="block text-sm font-medium text-gray-700 mb-2">
              Discount (%) *
            </label>
            <input
              type="number"
              id="discount"
              name="discount"
              value={formData.discount}
              onChange={handleInputChange}
              min="0"
              max="100"
              step="0.01"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.discount ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter discount percentage"
            />
            {errors.discount && (
              <p className="mt-1 text-sm text-red-600">{errors.discount}</p>
            )}
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Saving...' : inventory ? 'Update Inventory' : 'Add Inventory'}
          </button>
        </div>
      </form>
    </div>
  );
};