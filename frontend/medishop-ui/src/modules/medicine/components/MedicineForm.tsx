import React from 'react';
import type { MedicineFormData, MedicineType } from '../types';

const MEDICINE_TYPES: MedicineType[] = ['TABLET', 'CAPSULE', 'SYRUP', 'INJECTION', 'OINTMENT', 'DROP'];

interface MedicineFormProps {
  formData: MedicineFormData;
  onFormChange: (formData: MedicineFormData) => void;
  onSubmit: (e: React.FormEvent) => void;
  submitText: string;
  isLoading?: boolean;
  isEditMode: boolean; // To distinguish add vs edit mode
}

export const MedicineForm: React.FC<MedicineFormProps> = ({
  formData,
  onFormChange,
  onSubmit,
  submitText,
  isLoading = false,
  isEditMode,
}) => {
  const handleInputChange = (field: keyof MedicineFormData, value: string) => {
    onFormChange({
      ...formData,
      [field]: value,
    });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Medicine Name *
        </label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter medicine name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Type *
        </label>
        <select
          required
          value={formData.type}
          onChange={(e) => handleInputChange('type', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {MEDICINE_TYPES.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Category *
        </label>
        <input
          type="text"
          required
          value={formData.category}
          onChange={(e) => handleInputChange('category', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter category"
        />
      </div>

      {!isEditMode && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Batch Number *
            </label>
            <input
              type="text"
              required
              value={formData.batchNumber}
              onChange={(e) => handleInputChange('batchNumber', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter batch number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Expiry Date *
            </label>
            <input
              type="date"
              required
              value={formData.expiryDate}
              onChange={(e) => handleInputChange('expiryDate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Location
        </label>
        <input
          type="text"
          value={formData.location}
          onChange={(e) => handleInputChange('location', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter storage location"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Supplier ID
        </label>
        <input
          type="number"
          value={formData.supplierId}
          onChange={(e) => handleInputChange('supplierId', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter supplier ID"
        />
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Processing...' : submitText}
        </button>
      </div>
    </form>
  );
};