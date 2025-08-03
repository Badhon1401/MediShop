import React, { useState, useEffect } from 'react';
import type{ CustomerFormProps, CustomerFormData } from '../types';

const CustomerForm: React.FC<CustomerFormProps> = ({
  customer,
  onSubmit,
  onCancel,
  loading
}) => {
  const [formData, setFormData] = useState<CustomerFormData>({
    name: '',
    contact_number: ''
  });
  const [errors, setErrors] = useState<Partial<CustomerFormData>>({});

  useEffect(() => {
    if (customer) {
      setFormData({
        name: customer.name,
        contact_number: customer.contact_number || ''
      });
    }
  }, [customer]);

  const validateForm = (): boolean => {
    const newErrors: Partial<CustomerFormData> = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Customer name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Customer name must be at least 2 characters';
    } else if (formData.name.trim().length > 100) {
      newErrors.name = 'Customer name must not exceed 100 characters';
    }

    // Phone validation
    if (formData.contact_number.trim()) {
      const phoneRegex = /^01[3-9]\d{8}$/;
      const cleanPhone = formData.contact_number.replace(/[\s\-\+]/g, '');
      
      if (!phoneRegex.test(cleanPhone)) {
        newErrors.contact_number = 'Please enter a valid Bangladeshi mobile number (e.g., 01712345678)';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof CustomerFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        name: formData.name.trim(),
        contact_number: formData.contact_number.trim()
      });
    }
  };

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    
    // Format as 01XXX-XXXXXX
    if (digits.length >= 5) {
      return `${digits.slice(0, 5)}-${digits.slice(5, 11)}`;
    }
    return digits;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setFormData(prev => ({
      ...prev,
      contact_number: formatted
    }));

    // Clear error when user starts typing
    if (errors.contact_number) {
      setErrors(prev => ({
        ...prev,
        contact_number: undefined
      }));
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {customer ? 'Edit Customer' : 'Add New Customer'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Customer Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Customer Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            disabled={loading}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            } ${loading ? 'bg-gray-100 cursor-not-allowed' : ''}`}
            placeholder="Enter customer name"
            maxLength={100}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        {/* Contact Number */}
        <div>
          <label htmlFor="contact_number" className="block text-sm font-medium text-gray-700 mb-1">
            Contact Number
          </label>
          <input
            type="text"
            id="contact_number"
            name="contact_number"
            value={formData.contact_number}
            onChange={handlePhoneChange}
            disabled={loading}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.contact_number ? 'border-red-500' : 'border-gray-300'
            } ${loading ? 'bg-gray-100 cursor-not-allowed' : ''}`}
            placeholder="e.g., 01712-345678"
            maxLength={15}
          />
          {errors.contact_number && (
            <p className="mt-1 text-sm text-red-600">{errors.contact_number}</p>
          )}
          <p className="mt-1 text-xs text-gray-500">
            Optional. Enter Bangladeshi mobile number (11 digits)
          </p>
        </div>

        {/* Form Actions */}
        <div className="flex space-x-3 pt-4">
          <button
            type="submit"
            disabled={loading}
            className={`flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                {customer ? 'Updating...' : 'Creating...'}
              </div>
            ) : (
              customer ? 'Update Customer' : 'Create Customer'
            )}
          </button>

          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className={`flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 ${
              loading 
                ? 'cursor-not-allowed opacity-50' 
                : 'hover:bg-gray-50'
            }`}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomerForm;