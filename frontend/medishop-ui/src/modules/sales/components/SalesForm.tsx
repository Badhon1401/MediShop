// src/modules/sales/components/SalesForm.tsx

import React, { useState, useEffect } from 'react';
import type{ SalesFormData, SalesRequest, UpdateSalesRequest } from '../types';

interface SalesFormProps {
  initialData?: SalesFormData;
  onSubmit: (data: SalesRequest | UpdateSalesRequest) => Promise<void>;
  onCancel: () => void;
  isEditing?: boolean;
  loading?: boolean;
}

const SalesForm: React.FC<SalesFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isEditing = false,
  loading = false
}) => {
  const [formData, setFormData] = useState<SalesFormData>({
    salesId: 0,
    customerPhoneNumber: '',
    salesDate: new Date().toISOString().split('T')[0],
    medicineName: '',
    medicineUnitPrice: 0,
    perMedicineTotalQuantity: 1,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.salesId || formData.salesId <= 0) {
      newErrors.salesId = 'Sales ID is required and must be positive';
    }

    if (!formData.customerPhoneNumber.trim()) {
      newErrors.customerPhoneNumber = 'Customer phone number is required';
    } else if (!/^(\+880|880|0)?1[3-9]\d{8}$/.test(formData.customerPhoneNumber)) {
      newErrors.customerPhoneNumber = 'Invalid Bangladeshi phone number format';
    }

    if (!formData.salesDate) {
      newErrors.salesDate = 'Sales date is required';
    }

    if (!formData.medicineName.trim()) {
      newErrors.medicineName = 'Medicine name is required';
    }

    if (!formData.medicineUnitPrice || formData.medicineUnitPrice <= 0) {
      newErrors.medicineUnitPrice = 'Unit price must be greater than 0';
    }

    if (!formData.perMedicineTotalQuantity || formData.perMedicineTotalQuantity <= 0) {
      newErrors.perMedicineTotalQuantity = 'Quantity must be greater than 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const calculateTotalAmount = (): number => {
    return formData.medicineUnitPrice * formData.perMedicineTotalQuantity;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const perMedicineTotalAmount = calculateTotalAmount();
    
    const salesData = {
      ...formData,
      perMedicineTotalAmount,
      totalPricePerCustomerTransaction: perMedicineTotalAmount, // For single medicine transaction
    };

    try {
      await onSubmit(salesData);
    } catch (error) {
      console.error('Error submitting sales form:', error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {isEditing ? 'Edit Sales Record' : 'Add New Sale'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Sales ID */}
          <div>
            <label htmlFor="salesId" className="block text-sm font-medium text-gray-700 mb-1">
              Sales ID *
            </label>
            <input
              type="number"
              id="salesId"
              name="salesId"
              value={formData.salesId}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.salesId ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter sales ID"
            />
            {errors.salesId && <p className="text-red-500 text-sm mt-1">{errors.salesId}</p>}
          </div>

          {/* Customer Phone Number */}
          <div>
            <label htmlFor="customerPhoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Customer Phone *
            </label>
            <input
              type="text"
              id="customerPhoneNumber"
              name="customerPhoneNumber"
              value={formData.customerPhoneNumber}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.customerPhoneNumber ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="01XXXXXXXXX"
            />
            {errors.customerPhoneNumber && <p className="text-red-500 text-sm mt-1">{errors.customerPhoneNumber}</p>}
          </div>

          {/* Sales Date */}
          <div>
            <label htmlFor="salesDate" className="block text-sm font-medium text-gray-700 mb-1">
              Sales Date *
            </label>
            <input
              type="date"
              id="salesDate"
              name="salesDate"
              value={formData.salesDate}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.salesDate ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.salesDate && <p className="text-red-500 text-sm mt-1">{errors.salesDate}</p>}
          </div>

          {/* Medicine Name */}
          <div>
            <label htmlFor="medicineName" className="block text-sm font-medium text-gray-700 mb-1">
              Medicine Name *
            </label>
            <input
              type="text"
              id="medicineName"
              name="medicineName"
              value={formData.medicineName}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.medicineName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter medicine name"
            />
            {errors.medicineName && <p className="text-red-500 text-sm mt-1">{errors.medicineName}</p>}
          </div>

          {/* Unit Price */}
          <div>
            <label htmlFor="medicineUnitPrice" className="block text-sm font-medium text-gray-700 mb-1">
              Unit Price (৳) *
            </label>
            <input
              type="number"
              step="0.01"
              id="medicineUnitPrice"
              name="medicineUnitPrice"
              value={formData.medicineUnitPrice}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.medicineUnitPrice ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="0.00"
            />
            {errors.medicineUnitPrice && <p className="text-red-500 text-sm mt-1">{errors.medicineUnitPrice}</p>}
          </div>

          {/* Quantity */}
          <div>
            <label htmlFor="perMedicineTotalQuantity" className="block text-sm font-medium text-gray-700 mb-1">
              Quantity *
            </label>
            <input
              type="number"
              id="perMedicineTotalQuantity"
              name="perMedicineTotalQuantity"
              value={formData.perMedicineTotalQuantity}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.perMedicineTotalQuantity ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="1"
              min="1"
            />
            {errors.perMedicineTotalQuantity && <p className="text-red-500 text-sm mt-1">{errors.perMedicineTotalQuantity}</p>}
          </div>
        </div>

        {/* Total Amount Display */}
        <div className="bg-gray-50 p-4 rounded-md">
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium text-gray-700">Total Amount:</span>
            <span className="text-2xl font-bold text-green-600">
              ৳{calculateTotalAmount().toFixed(2)}
            </span>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex gap-4 pt-6">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Processing...' : (isEditing ? 'Update Sale' : 'Add Sale')}
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default SalesForm;