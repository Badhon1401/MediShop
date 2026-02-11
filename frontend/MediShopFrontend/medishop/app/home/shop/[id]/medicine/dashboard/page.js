"use client"
import React, { useState, useEffect, useMemo} from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Grid from '@mui/material/Grid';

import {
  Search,
  Filter,
  LayoutGrid,
  List,
  Plus,
  Edit,
  Download,
  Upload,
  Trash2,
  Edit3,
  Eye,
  Package,
  DollarSign,
  Calendar,
  CheckCircle,
  AlertTriangle,
  Clock,
  RefreshCcw,
  Moon,
  Sun,
  Pill,
  Heart,
  Activity,
  Shield,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Settings,
  MoreHorizontal,
  X,
  Save,
  ArrowLeft,
  ImagePlus
} from 'lucide-react';

// Client-side date component to prevent hydration mismatch
const ClientDate = ({ dateString, format = 'date' }) => {
  const [formatted, setFormatted] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && dateString) {
      const date = new Date(dateString);
      
      let formattedDate;
      if (format === 'date') {
        formattedDate = new Intl.DateTimeFormat('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          timeZone: 'UTC',
        }).format(date);
      } else if (format === 'datetime') {
        formattedDate = new Intl.DateTimeFormat('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
          timeZone: 'UTC',
        }).format(date);
      }
      
      setFormatted(formattedDate);
    }
  }, [dateString, format, isClient]);

  if (!isClient) {
    return <span className="inline-block w-16 h-4 bg-gray-200 animate-pulse rounded"></span>;
  }

  return <span>{formatted}</span>;
};

// Modal Component
const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className={`relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full ${sizeClasses[size]} mx-4 max-h-[90vh] overflow-hidden`}>
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
          {children}
        </div>
      </div>
    </div>
  );
};

// Delete Confirmation Modal
const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, medicine, isDarkMode, isLoading }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Medicine" size="sm">
      <div className="p-6">
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-red-100 dark:bg-red-900/30 rounded-full">
          <Trash2 className="w-8 h-8 text-red-600 dark:text-red-400" />
        </div>
        
        <div className="text-center mb-6">
          <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Are you sure?
          </h3>
          <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            You're about to delete <strong>{medicine?.name}</strong>. This action cannot be undone.
          </p>
        </div>

        <div className="flex justify-end gap-3">
          <Button
            onClick={onClose}
            variant="outline"
            disabled={isLoading}
            className={`${isDarkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isLoading}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {isLoading ? (
              <>
                <RefreshCcw className="w-4 h-4 mr-2 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </>
            )}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

// Edit Medicine Modal
const EditMedicineModal = ({ isOpen, onClose, medicine, onSave, isDarkMode }) => {
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (medicine) {
      setFormData({
        name: medicine.name,
        groupName: medicine.groupName,
        power: medicine.power,
        category: medicine.category,
        price: medicine.price,
        givenFor: medicine.givenFor,
        availableQuantity: medicine.availableQuantity,
        manufacturedDate: medicine.manufacturedDate,
        expiryDate: medicine.expiryDate,
        discountPercentage: medicine.discountPercentage,
        position: medicine.position
      });
    }
  }, [medicine]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error('Error updating medicine:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Medicine" size="lg">
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Medicine Name
            </label>
            <input
              type="text"
              value={formData.name || ''}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={`w-full p-3 rounded-lg border ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Group Name
            </label>
            <input
              type="text"
              value={formData.groupName || ''}
              onChange={(e) => handleInputChange('groupName', e.target.value)}
              className={`w-full p-3 rounded-lg border ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Power (mg)
            </label>
            <input
              type="number"
              value={formData.power || ''}
              onChange={(e) => handleInputChange('power', parseInt(e.target.value))}
              className={`w-full p-3 rounded-lg border ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Category
            </label>
            <select
              value={formData.category || ''}
              onChange={(e) => handleInputChange('category', e.target.value)}
              className={`w-full p-3 rounded-lg border ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
            >
              <option value="">Select Category</option>
              <option value="Pain Relief">Pain Relief</option>
              <option value="Antibiotic">Antibiotic</option>
              <option value="Anti-inflammatory">Anti-inflammatory</option>
              <option value="Cardiovascular">Cardiovascular</option>
              <option value="Diabetes">Diabetes</option>
              <option value="Gastric">Gastric</option>
            </select>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Price ($)
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.price || ''}
              onChange={(e) => handleInputChange('price', parseFloat(e.target.value))}
              className={`w-full p-3 rounded-lg border ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Available Quantity
            </label>
            <input
              type="number"
              value={formData.availableQuantity || ''}
              onChange={(e) => handleInputChange('availableQuantity', parseInt(e.target.value))}
              className={`w-full p-3 rounded-lg border ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Position
            </label>
            <input
              type="number"
              value={formData.availableQuantity || ''}
              onChange={(e) => handleInputChange('position', parseInt(e.target.value))}
              className={`w-full p-3 rounded-lg border ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Manufactured Date
            </label>
            <input
              type="date"
              value={formData.manufacturedDate || ''}
              onChange={(e) => handleInputChange('manufacturedDate', e.target.value)}
              className={`w-full p-3 rounded-lg border ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Expiry Date
            </label>
            <input
              type="date"
              value={formData.expiryDate || ''}
              onChange={(e) => handleInputChange('expiryDate', e.target.value)}
              className={`w-full p-3 rounded-lg border ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Discount Percentage (%)
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="100"
              value={formData.discountPercentage || ''}
              onChange={(e) => handleInputChange('discountPercentage', parseFloat(e.target.value))}
              className={`w-full p-3 rounded-lg border ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
            />
          </div>

          

          <div className="md:col-span-2">
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Given For
            </label>
            <textarea
              value={formData.givenFor || ''}
              onChange={(e) => handleInputChange('givenFor', e.target.value)}
              rows={3}
              className={`w-full p-3 rounded-lg border ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              } focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none`}
              placeholder="Describe what this medicine is used for..."
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <Button
            onClick={onClose}
            variant="outline"
            disabled={isLoading}
            className={`${isDarkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={isLoading}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            {isLoading ? (
              <>
                <RefreshCcw className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

// Add Medicine Page Component
const AddMedicinePage = ({ onBack, onSave, isDarkMode }) => {
  const [formData, setFormData] = useState({
    name: '',
    groupName: '',
    power: '',
    category: '',
    price: '',
    givenFor: '',
    availableQuantity: '',
    manufacturedDate: '',
    expiryDate: '',
    discountPercentage: 0,
    position: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Medicine name is required';
    if (!formData.groupName.trim()) newErrors.groupName = 'Group name is required';
    if (!formData.power) newErrors.power = 'Power is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.price) newErrors.price = 'Price is required';
    if (!formData.givenFor.trim()) newErrors.givenFor = 'Usage description is required';
    if (!formData.availableQuantity) newErrors.availableQuantity = 'Quantity is required';
    if (!formData.manufacturedDate) newErrors.manufacturedDate = 'Manufacturing date is required';
    if (!formData.expiryDate) newErrors.expiryDate = 'Expiry date is required';
    if (!formData.position) newErrors.position = 'Position is required';
    
    // Date validation
    if (formData.manufacturedDate && formData.expiryDate) {
      const mfgDate = new Date(formData.manufacturedDate);
      const expDate = new Date(formData.expiryDate);
      if (expDate <= mfgDate) {
        newErrors.expiryDate = 'Expiry date must be after manufacturing date';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      
      onSave(formData);
    } catch (error) {
      console.error('Error adding medicine:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
    }`}>
      <div className="p-6">
        <div className="flex items-center gap-4 mb-8">
          <Button
            onClick={onBack}
            variant="outline"
            className={`${isDarkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-800' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Add New Medicine
            </h1>
            <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Fill in the details to add a new medicine to your inventory
            </p>
          </div>
        </div>

        <Card className={`max-w-4xl mx-auto ${
          isDarkMode 
            ? 'bg-gray-800/50 border-gray-700/50' 
            : 'bg-white/50 border-gray-200/50'
        } backdrop-blur-sm`}>
          <CardHeader>
            <CardTitle className={`text-xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Medicine Information
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Medicine Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`w-full p-3 rounded-lg border ${
                    errors.name 
                      ? 'border-red-500' 
                      : isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  placeholder="Enter medicine name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Group Name *
                </label>
                <input
                  type="text"
                  value={formData.groupName}
                  onChange={(e) => handleInputChange('groupName', e.target.value)}
                  className={`w-full p-3 rounded-lg border ${
                    errors.groupName 
                      ? 'border-red-500' 
                      : isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  placeholder="e.g., Analgesics, Antibiotics"
                />
                {errors.groupName && <p className="text-red-500 text-sm mt-1">{errors.groupName}</p>}
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Power (mg) *
                </label>
                <input
                  type="number"
                  value={formData.power}
                  onChange={(e) => handleInputChange('power', parseInt(e.target.value) || '')}
                  className={`w-full p-3 rounded-lg border ${
                    errors.power 
                      ? 'border-red-500' 
                      : isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  placeholder="500"
                />
                {errors.power && <p className="text-red-500 text-sm mt-1">{errors.power}</p>}
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className={`w-full p-3 rounded-lg border ${
                    errors.category 
                      ? 'border-red-500' 
                      : isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                  } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                >
                  <option value="">Select Category</option>
                  <option value="Pain Relief">Pain Relief</option>
                  <option value="Antibiotic">Antibiotic</option>
                  <option value="Anti-inflammatory">Anti-inflammatory</option>
                  <option value="Cardiovascular">Cardiovascular</option>
                  <option value="Diabetes">Diabetes</option>
                  <option value="Gastric">Gastric</option>
                  <option value="Neurological">Neurological</option>
                  <option value="Respiratory">Respiratory</option>
                  <option value="Other">Other</option>
                </select>
                {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Price ($) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || '')}
                  className={`w-full p-3 rounded-lg border ${
                    errors.price 
                      ? 'border-red-500' 
                      : isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  placeholder="15.99"
                />
                {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Available Quantity *
                </label>
                <input
                  type="number"
                  value={formData.availableQuantity}
                  onChange={(e) => handleInputChange('availableQuantity', parseInt(e.target.value) || '')}
                  className={`w-full p-3 rounded-lg border ${
                    errors.availableQuantity 
                      ?'border-red-500' 
                      : isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  placeholder="100"
                />
                {errors.availableQuantity && <p className="text-red-500 text-sm mt-1">{errors.availableQuantity}</p>}
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Manufactured Date *
                </label>
                <input
                  type="date"
                  value={formData.manufacturedDate}
                  onChange={(e) => handleInputChange('manufacturedDate', e.target.value)}
                  className={`w-full p-3 rounded-lg border ${
                    errors.manufacturedDate 
                      ? 'border-red-500' 
                      : isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                />
                {errors.manufacturedDate && <p className="text-red-500 text-sm mt-1">{errors.manufacturedDate}</p>}
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Expiry Date *
                </label>
                <input
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                  className={`w-full p-3 rounded-lg border ${
                    errors.expiryDate 
                      ? 'border-red-500' 
                      : isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                />
                {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>}
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Discount Percentage (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  value={formData.discountPercentage}
                  onChange={(e) => handleInputChange('discountPercentage', parseFloat(e.target.value) || 0)}
                  className={`w-full p-3 rounded-lg border ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  placeholder="0"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Available Quantity *
                </label>
                <input
                  type="number"
                  value={formData.position}
                  onChange={(e) => handleInputChange('position', parseInt(e.target.value) || '')}
                  className={`w-full p-3 rounded-lg border ${
                    errors.position
                      ?'border-red-500' 
                      : isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  placeholder="100"
                />
                {errors.position && <p className="text-red-500 text-sm mt-1">{errors.position}</p>}
              </div>

              <div className="md:col-span-2">
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Given For *
                </label>
                <textarea
                  value={formData.givenFor}
                  onChange={(e) => handleInputChange('givenFor', e.target.value)}
                  rows={4}
                  className={`w-full p-3 rounded-lg border ${
                    errors.givenFor 
                      ? 'border-red-500' 
                      : isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none`}
                  placeholder="Describe what this medicine is used for, its indications, and usage instructions..."
                />
                {errors.givenFor && <p className="text-red-500 text-sm mt-1">{errors.givenFor}</p>}
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <Button
                onClick={onBack}
                variant="outline"
                disabled={isLoading}
                className={`px-6 ${isDarkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={isLoading}
                className="px-8 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white shadow-lg"
              >
                {isLoading ? (
                  <>
                    <RefreshCcw className="w-4 h-4 mr-2 animate-spin" />
                    Adding Medicine...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Medicine
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Medicine Detail Modal
const MedicineDetailModal = ({ isOpen, onClose, medicine, isDarkMode }) => {
  if (!medicine) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'low-stock': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'out-of-stock': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'expiring-soon': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const calculateDiscountedPrice = (price, discount) => {
    return price - (price * discount / 100);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Medicine Details" size="lg">
      <div className="p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {medicine.name}
            </h2>
            <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {medicine.groupName} • {medicine.power}mg
            </p>
          </div>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(medicine.status)}`}>
            {medicine.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
            <div className="flex items-center gap-3 mb-3">
              <Package className={`w-5 h-5 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
              <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Basic Information
              </h3>
            </div>
            <div className="space-y-3">
              <div>
                <label className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Category</label>
                <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{medicine.category}</p>
              </div>
              <div>
                <label className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Available Quantity</label>
                <p className={`font-medium text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {medicine.availableQuantity} units
                </p>
              </div>
            </div>
          </div>

          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
            <div className="flex items-center gap-3 mb-3">
              <DollarSign className={`w-5 h-5 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
              <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Pricing
              </h3>
            </div>
            <div className="space-y-3">
              <div>
                <label className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Original Price</label>
                <p className={`font-medium ${medicine.discountPercentage > 0 ? 'line-through text-gray-500' : ''} ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  ${medicine.price.toFixed(2)}
                </p>
              </div>
              {medicine.discountPercentage > 0 && (
                <div>
                  <label className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Discounted Price ({medicine.discountPercentage}% off)
                  </label>
                  <p className={`font-bold text-lg text-green-600 dark:text-green-400`}>
                    ${calculateDiscountedPrice(medicine.price, medicine.discountPercentage).toFixed(2)}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
            <div className="flex items-center gap-3 mb-3">
              <Calendar className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Dates
              </h3>
            </div>
            <div className="space-y-3">
              <div>
                <label className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Manufactured</label>
                <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  <ClientDate dateString={medicine.manufacturedDate} />
                </p>
              </div>
              <div>
                <label className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Expires</label>
                <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  <ClientDate dateString={medicine.expiryDate} />
                </p>
              </div>
            </div>
          </div>

          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
            <div className="flex items-center gap-3 mb-3">
              <Heart className={`w-5 h-5 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`} />
              <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Usage Information
              </h3>
            </div>
            <div>
              <label className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Given For</label>
              <p className={`mt-1 text-sm leading-relaxed ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                {medicine.givenFor}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

// Main Medicine Management Component
const MedicineManagement = () => {
  const params = useParams(); // For dynamic route like /shop/[id]/medicine
  const [shopId, setShopId] = useState(null);
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

// Initialize shopId from route
  useEffect(() => {
    if (params?.id) {
      setShopId(params.id);
    }
  }, [params]);

  // Fetch medicines after shopId is initialized
  useEffect(() => {
    const fetchMedicines = async () => {
      if (!shopId) return;

      try {
        const res = await fetch(`/api/medicine/get?shopId=${shopId}`);
        if (!res.ok) throw new Error(`API error: ${res.status}`);

        const data = await res.json();
        setMedicines(data || []); // adjust according to your response shape
      } catch (err) {
        console.error('Error fetching medicines:', err);
        setError('Failed to load medicines');
      } finally {
        setLoading(false);
      }
    };

    fetchMedicines();
  }, [shopId]);

  

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [viewMode, setViewMode] = useState('grid');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentPage, setCurrentPage] = useState('dashboard');

  // Modal states
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

 const LOW_STOCK_THRESHOLD = 10;
const EXPIRY_SOON_DAYS = 30;

const { statistics, enrichedMedicines } = useMemo(() => {
  const today = new Date();

  let total = 0;
  let active = 0;
  let lowStock = 0;
  let outOfStock = 0;
  let expiringSoon = 0;
  let totalValue = 0;

  const enriched = medicines.map(med => {
    const qty = med.availableQuantity ?? 0;
    const expiry = new Date(med.expiryDate);
    const diffDays = (expiry - today) / (1000 * 60 * 60 * 24);

    let status = 'active';

    if (qty === 0) {
      status = 'out-of-stock';
      outOfStock++;
    } else if (qty <= LOW_STOCK_THRESHOLD) {
      status = 'low-stock';
      lowStock++;
    } else {
      active++;
    }

    if (diffDays <= EXPIRY_SOON_DAYS && diffDays > 0) {
      expiringSoon++;
    }

    total++;
    totalValue += (med.price ?? 0) * qty;

    return {
      ...med,
      status
    };
  });

  return {
    statistics: {
      total,
      active,
      lowStock,
      outOfStock,
      expiringSoon,
      totalValue
    },
    enrichedMedicines: enriched
  };
}, [medicines]);


  // Filter and sort medicines
const filteredAndSortedMedicines = useMemo(() => {
  let filtered = enrichedMedicines.filter(med => {
    const matchesSearch = (med.name?.toLowerCase() ?? '').includes(searchTerm.toLowerCase()) ||
                          (med.groupName?.toLowerCase() ?? '').includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === '' || med.category === selectedCategory;

    const matchesStatus = selectedStatus === '' || med.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  filtered.sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];

    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (sortOrder === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  return filtered;
}, [enrichedMedicines, searchTerm, selectedCategory, selectedStatus, sortBy, sortOrder]);




  // Get unique categories
  const categories = useMemo(() => {
    return [...new Set(medicines.map(m => m.category))].sort();
  }, [medicines]);

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'low-stock': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'out-of-stock': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'expiring-soon': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  // Handle actions
  const handleViewDetails = (medicine) => {
    setSelectedMedicine(medicine);
    setShowDetailModal(true);
  };

  const handleEdit = (medicine) => {
    setSelectedMedicine(medicine);
    setShowEditModal(true);
  };

  const handleDelete = (medicine) => {
    setSelectedMedicine(medicine);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    
    try {
      const response = await fetch(
        `/api/medicine/delete?medicineId=${encodeURIComponent(selectedMedicine.id)}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete medicine");
      }
      
      setMedicines(prev => prev.filter(m => m.id !== selectedMedicine.id));
      setShowDeleteModal(false);
      setSelectedMedicine(null);
    } catch (error) {
      console.error('Error deleting medicine:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSaveEdit = async (updatedMedicine) => {
    const response = await fetch(`/api/medicine/update?medicineId=${encodeURIComponent(selectedMedicine.id)}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedMedicine),
      });

      if (!response.ok) {
        throw new Error("Failed to add medicine.");
      }

    const result = await response.json();
    setMedicines(prev => prev.map(m => 
      m.id === result.id ? result : m
    ));
    setShowEditModal(false);
    setSelectedMedicine(null);
  };

  const handleAddMedicine =async (newMedicine) => {
    const response = await fetch(`/api/medicine/add?shopId=${encodeURIComponent(shopId)}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMedicine),
      });

      if (!response.ok) {
        throw new Error("Failed to add medicine.");
      }

   const raw = await response.json();
const result = typeof raw.message === 'string' ? JSON.parse(raw.message) : raw;

setMedicines(prev => [...prev, result]);

    alert("Medicine added successfully!");
    setCurrentPage('dashboard');
    
  };

  if (currentPage === 'add-medicine') {
    return (
      <AddMedicinePage 
        onBack={() => setCurrentPage('dashboard')}
        onSave={handleAddMedicine}
        isDarkMode={isDarkMode}
      />
    );
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;


  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
    }`}>
      <div className="p-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
          <div>
            <h1 className={`text-4xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Medicine Management
            </h1>
            <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Manage your pharmacy inventory with ease
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <Button
              onClick={() => setIsDarkMode(!isDarkMode)}
              variant="outline"
              size="sm"
              className={`${isDarkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-800' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            
            <Button
              onClick={() => setCurrentPage('add-medicine')}
              className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white shadow-lg"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Medicine
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
          <Card className={`${isDarkMode ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white/50 border-gray-200/50'} backdrop-blur-sm hover:shadow-lg transition-all duration-300`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Total Medicines
                  </p>
                  <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {statistics.total}
                  </p>
                </div>
                <Package className={`w-8 h-8 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
              </div>
            </CardContent>
          </Card>

          <Card className={`${isDarkMode ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white/50 border-gray-200/50'} backdrop-blur-sm hover:shadow-lg transition-all duration-300`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Active
                  </p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {statistics.active}
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className={`${isDarkMode ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white/50 border-gray-200/50'} backdrop-blur-sm hover:shadow-lg transition-all duration-300`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Low Stock
                  </p>
                  <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                    {statistics.lowStock}
                  </p>
                </div>
                <AlertTriangle className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card className={`${isDarkMode ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white/50 border-gray-200/50'} backdrop-blur-sm hover:shadow-lg transition-all duration-300`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Out of Stock
                  </p>
                  <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                    {statistics.outOfStock}
                  </p>
                </div>
                <X className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
            </CardContent>
          </Card>

          <Card className={`${isDarkMode ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white/50 border-gray-200/50'} backdrop-blur-sm hover:shadow-lg transition-all duration-300`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Expiring Soon
                  </p>
                  <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                    {statistics.expiringSoon}
                  </p>
                </div>
                <Clock className="w-8 h-8 text-orange-600 dark:text-orange-400" />
              </div>
            </CardContent>
          </Card>

         <Card className={`${isDarkMode ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white/50 border-gray-200/50'} backdrop-blur-sm hover:shadow-lg transition-all duration-300`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Total Value
                  </p>
                  <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    ${statistics.totalValue.toFixed(2)}
                  </p>
                </div>
                <DollarSign className={`w-8 h-8 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className={`mb-8 ${isDarkMode ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white/50 border-gray-200/50'} backdrop-blur-sm`}>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  <input
                    type="text"
                    placeholder="Search medicines by name or group..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className={`px-4 py-3 rounded-lg border ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>

                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className={`px-4 py-3 rounded-lg border ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                >
                  <option value="">All Status</option>
                  <option value="active">Active</option>
                  <option value="low-stock">Low Stock</option>
                  <option value="out-of-stock">Out of Stock</option>
                  <option value="expiring-soon">Expiring Soon</option>
                </select>

                <select
                  value={`${sortBy}-${sortOrder}`}
                  onChange={(e) => {
                    const [field, order] = e.target.value.split('-');
                    setSortBy(field);
                    setSortOrder(order);
                  }}
                  className={`px-4 py-3 rounded-lg border ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                >
                  <option value="name-asc">Name (A-Z)</option>
                  <option value="name-desc">Name (Z-A)</option>
                  <option value="price-asc">Price (Low-High)</option>
                  <option value="price-desc">Price (High-Low)</option>
                  <option value="availableQuantity-asc">Quantity (Low-High)</option>
                  <option value="availableQuantity-desc">Quantity (High-Low)</option>
                </select>

                <div className="flex rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
                  <Button
                    onClick={() => setViewMode('grid')}
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="sm"
                    className={`rounded-none ${viewMode === 'grid' ? 'bg-purple-600 text-white' : isDarkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => setViewMode('list')}
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="sm"
                    className={`rounded-none ${viewMode === 'list' ? 'bg-purple-600 text-white' : isDarkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Medicine List */}
        {filteredAndSortedMedicines.length === 0 ? (
          <Card className={`${isDarkMode ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white/50 border-gray-200/50'} backdrop-blur-sm`}>
            <CardContent className="p-12 text-center">
              <Package className={`w-16 h-16 mx-auto mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                No Medicines Found
              </h3>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Try adjusting your search criteria or add new medicines to your inventory.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className={viewMode === 'grid' ? 
            'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 
            'space-y-4'
          }>
            {filteredAndSortedMedicines.map((medicine) => (
              <Card 
                key={medicine.id} 
                className={`group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                  isDarkMode ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white/50 border-gray-200/50'
                } backdrop-blur-sm`}
              >
                <CardContent className={viewMode === 'grid' ? 'p-6' : 'p-4'}>
                  <div className={viewMode === 'grid' ? 'space-y-4' : 'flex items-center justify-between'}>
                    <div className={viewMode === 'grid' ? '' : 'flex-1'}>
                      <div className="flex items-start justify-between mb-2">
                        <div className={viewMode === 'grid' ? '' : 'flex items-center gap-4'}>
                          <h3 className={`font-bold ${viewMode === 'grid' ? 'text-lg' : 'text-base'} ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {medicine.name}
                          </h3>
                          
                        </div>
                        
                      </div>
                      
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
                        {medicine.groupName} • {medicine.power}mg
                      </p>
                      <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'} mb-2`}>
                        {medicine.category}
                      </p>
                      
                      <div className={`flex ${viewMode === 'grid' ? 'flex-col' : 'items-center'} gap-2`}>
                        <div className="flex items-center gap-4">
                          <span className={`font-bold ${medicine.discountPercentage > 0 ? 'text-green-600 dark:text-green-400' : isDarkMode ? 'text-white' : 'text-gray-900'}`}>
  {
    typeof medicine.price === 'number'
      ? `$${medicine.discountPercentage > 0 
        ? (medicine.price - (medicine.price * medicine.discountPercentage / 100)).toFixed(2)
        : medicine.price.toFixed(2)}`
      : 'N/A'
  }
</span>

                          {medicine.discountPercentage > 0 && (
                            <span className={`text-sm line-through ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                              ${medicine.price.toFixed(2)}
                            </span>
                          )}
                        </div>
                        <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {medicine.availableQuantity} units available
                        </span>
                      </div>
                      
                      {viewMode === 'grid' && (
                        <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} line-clamp-2`}>
                          {medicine.givenFor}
                        </p>
                      )}
                    </div>

                    <div className={`flex ${viewMode === 'grid' ? 'justify-between' : 'gap-2'} ${viewMode === 'grid' ? 'mt-4' : ''}`}>
                      
                      
                      <Button
                        onClick={() => handleEdit(medicine)}
                        variant="outline"
                        size="sm"
                        className={`${isDarkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                      >
                        <Edit className="w-4 h-4" />
                        {viewMode === 'grid' && <span className="ml-1">Edit</span>}
                      </Button>
                      
                      <Button
                        onClick={() => handleDelete(medicine)}
                        variant="outline"
                        size="sm"
                        className="border-red-500 text-red-600 hover:bg-red-50 dark:border-red-400 dark:text-red-400 dark:hover:bg-red-900/20"
                      >
                        <Trash2 className="w-4 h-4" />
                        {viewMode === 'grid' && <span className="ml-1">Delete</span>}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      <MedicineDetailModal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        medicine={selectedMedicine}
        isDarkMode={isDarkMode}
      />

      <EditMedicineModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        medicine={selectedMedicine}
        onSave={handleSaveEdit}
        isDarkMode={isDarkMode}
      />

      <DeleteConfirmationModal
  isOpen={showDeleteModal}
  onClose={() => setShowDeleteModal(false)}
  onConfirm={confirmDelete}
  medicine={selectedMedicine}
  isDarkMode={isDarkMode}
  isLoading={isDeleting}
/>

    </div>
  );
};

export default MedicineManagement;