import React, { useState, useEffect } from 'react';
import type { AddInventoryRequest, UpdateInventoryRequest, MedicineType, Inventory } from '../types';
import { MEDICINE_TYPE } from '../types'; 

interface InventoryFormProps {
  initialData?: Inventory;
  onSubmit: (data: AddInventoryRequest | UpdateInventoryRequest) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

const InventoryForm: React.FC<InventoryFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<AddInventoryRequest>({
    medicineName: '',
    batchNumber: '',
    companyName: '',
    supplierId: undefined,
    expiryDate: '',
    location: '',
    type: MEDICINE_TYPE.TABLET,
    purchaseDate: '',
    totalQuantity: 0,
    availableQuantity: 0,
    unitPrice: 0,
    purchasePrice: 0,
    discount: 0,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        medicineName: initialData.medicineName,
        batchNumber: initialData.batchNumber,
        companyName: initialData.companyName,
        supplierId: initialData.supplierId,
        expiryDate: initialData.expiryDate.split('T')[0],
        location: initialData.location,
        type: initialData.type,
        purchaseDate: initialData.purchaseDate.split('T')[0],
        totalQuantity: initialData.totalQuantity,
        availableQuantity: initialData.availableQuantity,
        unitPrice: initialData.unitPrice,
        purchasePrice: initialData.purchasePrice,
        discount: initialData.discount,
      });
    }
  }, [initialData]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.medicineName.trim()) {
      newErrors.medicineName = 'Medicine name is required';
    }

    if (!formData.batchNumber.trim()) {
      newErrors.batchNumber = 'Batch number is required';
    }

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }

    if (!formData.expiryDate) {
      newErrors.expiryDate = 'Expiry date is required';
    } else {
      const expiryDate = new Date(formData.expiryDate);
      const today = new Date();
      if (expiryDate <= today) {
        newErrors.expiryDate = 'Expiry date must be in the future';
      }
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? (value === '' ? 0 : Number(value)) : value,
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      if (initialData) {
        const updateData: UpdateInventoryRequest = {
          ...formData,
          inventoryId: initialData.inventoryId,
        };
        await onSubmit(updateData);
      } else {
        await onSubmit(formData);
      }
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const medicineTypes = Object.values(MEDICINE_TYPE);

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {initialData ? 'Update Inventory' : 'Add New Inventory'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Medicine Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Medicine Name *
            </label>
            <input
              type="text"
              name="medicineName"
              value={formData.medicineName}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.medicineName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter medicine name"
            />
            {errors.medicineName && (
              <p className="text-red-500 text-sm mt-1">{errors.medicineName}</p>
            )}
          </div>

          {/* Batch Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Batch Number *
            </label>
            <input
              type="text"
              name="batchNumber"
              value={formData.batchNumber}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.batchNumber ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter batch number"
            />
            {errors.batchNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.batchNumber}</p>
            )}
          </div>

          {/* Company Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Name *
            </label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.companyName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter company name"
            />
            {errors.companyName && (
              <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>
            )}
          </div>

          {/* Supplier ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Supplier ID
            </label>
            <input
              type="number"
              name="supplierId"
              value={formData.supplierId || ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter supplier ID"
            />
          </div>

          {/* Medicine Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Medicine Type *
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {medicineTypes.map(type => (
                <option key={type} value={type}>
                  {type.replace('_', ' ')}
                </option>
              ))}
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter storage location"
            />
          </div>

          {/* Purchase Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Purchase Date *
            </label>
            <input
              type="date"
              name="purchaseDate"
              value={formData.purchaseDate}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.purchaseDate ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.purchaseDate && (
              <p className="text-red-500 text-sm mt-1">{errors.purchaseDate}</p>
            )}
          </div>

          {/* Expiry Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expiry Date *
            </label>
            <input
              type="date"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.expiryDate ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.expiryDate && (
              <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>
            )}
          </div>

          {/* Total Quantity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Total Quantity *
            </label>
            <input
              type="number"
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
              <p className="text-red-500 text-sm mt-1">{errors.totalQuantity}</p>
            )}
          </div>

          {/* Available Quantity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Available Quantity *
            </label>
            <input
              type="number"
              name="availableQuantity"
              value={formData.availableQuantity}
              onChange={handleInputChange}
              min="0"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.availableQuantity ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter available quantity"
            />
            {errors.availableQuantity && (
              <p className="text-red-500 text-sm mt-1">{errors.availableQuantity}</p>
            )}
          </div>

          {/* Purchase Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Purchase Price (per unit) *
            </label>
            <input
              type="number"
              name="purchasePrice"
              value={formData.purchasePrice}
              onChange={handleInputChange}
              min="0"
              step="0.01"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.purchasePrice ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter purchase price"
            />
            {errors.purchasePrice && (
              <p className="text-red-500 text-sm mt-1">{errors.purchasePrice}</p>
            )}
          </div>

          {/* Unit Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Unit Price (selling) *
            </label>
            <input
              type="number"
              name="unitPrice"
              value={formData.unitPrice}
              onChange={handleInputChange}
              min="0"
              step="0.01"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.unitPrice ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter unit price"
            />
            {errors.unitPrice && (
              <p className="text-red-500 text-sm mt-1">{errors.unitPrice}</p>
            )}
          </div>

          {/* Discount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Discount (%)
            </label>
            <input
              type="number"
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
              <p className="text-red-500 text-sm mt-1">{errors.discount}</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 pt-6">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Saving...' : (initialData ? 'Update' : 'Add')} Inventory
          </button>
        </div>
      </form>
    </div>
  );
};

export default InventoryForm;