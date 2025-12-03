"use client";
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  Plus, 
  Minus, 
  ShoppingCart, 
  Calculator, 
  AlertTriangle, 
  Check, 
  X,
  Package,
  DollarSign,
  Clock,
  User,
  Phone,
  Calendar,
  Pill,
  Activity,
  Heart,
  Shield,
  Sun,
  Moon,
  Trash2,
  Edit3,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';

const OrderDashboard = () => {
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  // Customer information
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    contactNumber: '',
    age: ''
  });
  
  // Order state
  const [orderItems, setOrderItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  
  // Dummy medicine data (replace with API call)
  const [medicines] = useState([
    {
      id: "550e8400-e29b-41d4-a716-446655440001",
      name: "Paracetamol",
      power: 500,
      category: "Pain Relief",
      price: 5.50,
      availableQuantity: 100,
      groupName: "Analgesics",
      givenFor: "Fever, Pain",
      expiryDate: "2026-12-31",
      discountPercentage: 10.0
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440002",
      name: "Amoxicillin",
      power: 250,
      category: "Antibiotic",
      price: 12.75,
      availableQuantity: 50,
      groupName: "Penicillins",
      givenFor: "Bacterial infections",
      expiryDate: "2025-08-15",
      discountPercentage: 5.0
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440003",
      name: "Ibuprofen",
      power: 400,
      category: "Pain Relief",
      price: 8.25,
      availableQuantity: 75,
      groupName: "NSAIDs",
      givenFor: "Inflammation, Pain",
      expiryDate: "2026-03-20",
      discountPercentage: 15.0
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440004",
      name: "Cetirizine",
      power: 10,
      category: "Antihistamine",
      price: 6.00,
      availableQuantity: 80,
      groupName: "Antihistamines",
      givenFor: "Allergies, Hay fever",
      expiryDate: "2025-11-10",
      discountPercentage: 0.0
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440005",
      name: "Omeprazole",
      power: 20,
      category: "Acid Reducer",
      price: 15.30,
      availableQuantity: 30,
      groupName: "Proton Pump Inhibitors",
      givenFor: "Acid reflux, Ulcers",
      expiryDate: "2026-01-05",
      discountPercentage: 8.0
    }
  ]);
  
  const filteredMedicines = useMemo(() => {
    if (!searchTerm) return [];
    return medicines.filter(medicine => 
      medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medicine.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medicine.givenFor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medicine.power.toString().includes(searchTerm)
    );
  }, [searchTerm, medicines]);
  

  const orderSummary = useMemo(() => {
    const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalDiscount = orderItems.reduce((sum, item) => 
      sum + (item.price * item.quantity * (item.discountPercentage / 100)), 0
    );
    const total = subtotal - totalDiscount;
    const itemCount = orderItems.reduce((sum, item) => sum + item.quantity, 0);
    
    return {
      subtotal: subtotal.toFixed(2),
      totalDiscount: totalDiscount.toFixed(2),
      total: total.toFixed(2),
      itemCount
    };
  }, [orderItems]);
  
  // Add medicine to order
  const addToOrder = (medicine) => {
    const existingItem = orderItems.find(item => item.id === medicine.id);
    
    if (existingItem) {
      if (existingItem.quantity + quantity > medicine.availableQuantity) {
        alert(`Cannot add ${quantity} more. Only ${medicine.availableQuantity - existingItem.quantity} available.`);
        return;
      }
      
      setOrderItems(prev => prev.map(item =>
        item.id === medicine.id 
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      if (quantity > medicine.availableQuantity) {
        alert(`Only ${medicine.availableQuantity} available in stock.`);
        return;
      }
      
      setOrderItems(prev => [...prev, {
        id: medicine.id,
        name: medicine.name,
        power: medicine.power,
        category: medicine.category,
        price: medicine.price,
        quantity: quantity,
        availableQuantity: medicine.availableQuantity,
        discountPercentage: medicine.discountPercentage,
        givenFor: medicine.givenFor
      }]);
    }
    
    setSearchTerm('');
    setQuantity(1);
    setShowSuggestions(false);
  };
  
  // Remove item from order
  const removeFromOrder = (id) => {
    setOrderItems(prev => prev.filter(item => item.id !== id));
  };
  
  // Update item quantity
  const updateQuantity = (id, newQuantity) => {
    const item = orderItems.find(item => item.id === id);
    if (newQuantity > item.availableQuantity) {
      alert(`Only ${item.availableQuantity} available in stock.`);
      return;
    }
    
    if (newQuantity <= 0) {
      removeFromOrder(id);
      return;
    }
    
    setOrderItems(prev => prev.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };
  
  // Validate customer info
  const validateCustomerInfo = () => {
    if (!customerInfo.name.trim()) {
      alert('Customer name is required');
      return false;
    }
    if (!customerInfo.contactNumber.trim()) {
      alert('Customer contact number is required');
      return false;
    }
    if (!/^\d{10,15}$/.test(customerInfo.contactNumber.replace(/\D/g, ''))) {
      alert('Please enter a valid contact number');
      return false;
    }
    return true;
  };
  
  // Process order
  const processOrder = async () => {
    if (!validateCustomerInfo()) return;
    if (orderItems.length === 0) {
      alert('Please add at least one medicine to the order');
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate API call
    try {
      const orderRequest = {
        items: orderItems.map(item => ({
          medicineId: item.id,
          quantity: item.quantity
        })),
        customerName: customerInfo.name,
        customerContactNumber: customerInfo.contactNumber,
        customerAge: customerInfo.age
      };
      
      // Here you would call your API
      // await fetch('/api/orders/{shopId}/place', { method: 'POST', body: JSON.stringify(orderRequest) });
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setOrderSuccess(true);
      
      // Reset form after success
      setTimeout(() => {
        setOrderItems([]);
        setCustomerInfo({ name: '', contactNumber: '', age: '' });
        setOrderSuccess(false);
      }, 3000);
      
    } catch (error) {
      alert('Failed to process order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };
  
  // Check for expiring medicines
  const getExpiryWarning = (expiryDate) => {
    const expiry = new Date(expiryDate);
    const today = new Date();
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 30) return 'expires-soon';
    if (diffDays <= 90) return 'expires-moderate';
    return 'expires-safe';
  };
  
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

 return (
  <div className={`relative min-h-screen transition-all duration-200 ${
  isDarkMode 
    ? 'bg-gradient-to-br from-gray-950 via-gray-900 to-purple-950' 
    : 'bg-gradient-to-br from-slate-100 via-slate-200 to-indigo-200'
}`}>

  {/* Optional Background Overlay Glow */}
  <div className="absolute inset-0 pointer-events-none z-0">
    <div className="w-full h-full bg-gradient-to-br from-transparent via-white/10 to-transparent dark:via-white/5 blur-3xl opacity-20" />
  </div>
    {/* Header */}
    <div className={`top-0 z-50 backdrop-blur-xl border-b transition-all duration-300 ${
      isDarkMode 
        ? 'bg-gray-900/90 border-gray-700' 
        : 'bg-white/90 border-gray-200'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              isDarkMode 
                ? 'bg-gradient-to-br from-purple-600 to-pink-600' 
                : 'bg-gradient-to-br from-blue-600 to-purple-600'
            }`}>
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-2xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Order Dashboard
              </h1>
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Process customer orders efficiently
              </p>

              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className={`px-4 py-2 rounded-lg ${
                isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'
              }`}>
                <div className="flex items-center space-x-2">
                  <ShoppingCart className="w-4 h-4" />
                  <span className="font-medium">{orderSummary.itemCount} items</span>
                </div>
              </div>
              
              <button
                onClick={toggleTheme}
                className={`p-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' 
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* Left Section - Medicine Search & Customer Info */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Customer Information */}
            <div className={`rounded-2xl shadow-2xl backdrop-blur-xl border transition-all duration-300 ${
              isDarkMode 
                ? 'bg-gray-900/90 border-gray-700' 
                : 'bg-white/95 border-gray-200'
            }`}>
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <User className={`w-6 h-6 ${
                    isDarkMode ? 'text-purple-400' : 'text-blue-600'
                  }`} />
                  <h2 className={`text-xl font-bold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Customer Information
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className={`text-sm font-medium ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Customer Name *
                    </label>
                    <input
                      type="text"
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter customer name"
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
                        isDarkMode 
                          ? 'bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-purple-500' 
                          : 'bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                      }`}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className={`text-sm font-medium ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Contact Number *
                    </label>
                    <input
                      type="tel"
                      value={customerInfo.contactNumber}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, contactNumber: e.target.value }))}
                      placeholder="Enter contact number"
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
                        isDarkMode 
                          ? 'bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-purple-500' 
                          : 'bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                      }`}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className={`text-sm font-medium ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Age (Optional)
                    </label>
                    <input
                      type="number"
                      value={customerInfo.age}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, age: e.target.value }))}
                      placeholder="Enter age"
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
                        isDarkMode 
                          ? 'bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-purple-500' 
                          : 'bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Medicine Search */}
            <div className={`rounded-2xl shadow-2xl backdrop-blur-xl border transition-all duration-300 ${
              isDarkMode 
                ? 'bg-gray-900/90 border-gray-700' 
                : 'bg-white/95 border-gray-200'
            }`}>
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <Search className={`w-6 h-6 ${
                    isDarkMode ? 'text-purple-400' : 'text-blue-600'
                  }`} />
                  <h2 className={`text-xl font-bold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Add Medicine to Order
                  </h2>
                </div>
                
                <div className="relative">
                  <div className="flex space-x-4">
                    <div className="flex-1 relative">
                      <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`} />
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => {
                          setSearchTerm(e.target.value);
                          setShowSuggestions(true);
                        }}
                        onFocus={() => setShowSuggestions(true)}
                        placeholder="Search medicines by name, category, or indication..."
                        className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 transition-all duration-300 ${
                          isDarkMode 
                            ? 'bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-purple-500' 
                            : 'bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                        }`}
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <label className={`text-sm font-medium ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Qty:
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                        className={`w-20 px-3 py-3 rounded-xl border-2 text-center ${
                          isDarkMode 
                            ? 'bg-gray-800/50 border-gray-700 text-white focus:border-purple-500' 
                            : 'bg-white/50 border-gray-300 text-gray-900 focus:border-blue-500'
                        }`}
                      />
                    </div>
                  </div>
                  
                  {/* Medicine Suggestions */}
                  {showSuggestions && searchTerm && (
                    <div className={`mt-2 w-full max-h-96 overflow-y-auto rounded-xl shadow-2xl border z-50 ${
  isDarkMode 
    ? 'bg-gray-800 border-gray-700' 
    : 'bg-white border-gray-200'
}`}>

                      {filteredMedicines.length > 0 ? (
                        filteredMedicines.map((medicine) => (
                          <div
                            key={medicine.id}
                            onClick={() => addToOrder(medicine)}
                            className={`p-4 cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
                              isDarkMode 
                                ? 'hover:bg-gray-700 border-b border-gray-700' 
                                : 'hover:bg-gray-50 border-b border-gray-100'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2">
                                  <h3 className={`font-semibold ${
                                    isDarkMode ? 'text-white' : 'text-gray-900'
                                  }`}>
                                    {medicine.name} {medicine.power}mg
                                  </h3>
                                  <span className={`px-2 py-1 text-xs rounded-full ${
                                    isDarkMode 
                                      ? 'bg-purple-900 text-purple-200' 
                                      : 'bg-blue-100 text-blue-800'
                                  }`}>
                                    {medicine.category}
                                  </span>
                                </div>
                                <p className={`text-sm mt-1 ${
                                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                }`}>
                                  For: {medicine.givenFor}
                                </p>
                                <div className="flex items-center space-x-4 mt-2">
                                  <span className={`text-sm ${
                                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                                  }`}>
                                    Stock: {medicine.availableQuantity}
                                  </span>
                                  <span className={`text-sm ${
                                    getExpiryWarning(medicine.expiryDate) === 'expires-soon' ? 'text-red-500' :
                                    getExpiryWarning(medicine.expiryDate) === 'expires-moderate' ? 'text-yellow-500' :
                                    isDarkMode ? 'text-green-400' : 'text-green-600'
                                  }`}>
                                    Exp: {new Date(medicine.expiryDate).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className={`text-lg font-bold ${
                                  isDarkMode ? 'text-white' : 'text-gray-900'
                                }`}>
                                  ${medicine.price}
                                </div>
                                {medicine.discountPercentage > 0 && (
                                  <div className="text-sm text-green-500">
                                    {medicine.discountPercentage}% off
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className={`p-4 text-center ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          No medicines found matching your search.
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Section - Order Summary */}
          <div className="space-y-6 lg:col-span-2">
            
            {/* Order Items */}
            <div className={`rounded-2xl shadow-2xl backdrop-blur-xl border transition-all duration-300 ${
              isDarkMode 
                ? 'bg-gray-900/90 border-gray-700' 
                : 'bg-white/95 border-gray-200'
            }`}>
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className={`text-xl font-bold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Order Items
                  </h2>
                  
                </div>
                
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {orderItems.length > 0 ? (
                    orderItems.map((item) => (
                      <div
                        key={item.id}
                        className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                          isDarkMode 
                            ? 'bg-gray-800/50 border-gray-700' 
                            : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h3 className={`font-semibold ${
                              isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}>
                              {item.name} {item.power}mg
                            </h3>
                            <p className={`text-sm ${
                              isDarkMode ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              ${item.price} each
                            </p>
                            {item.discountPercentage > 0 && (
                              <p className="text-sm text-green-500">
                                {item.discountPercentage}% discount applied
                              </p>
                            )}
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className={`p-1 rounded-lg transition-all duration-200 ${
                                isDarkMode 
                                  ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                                  : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                              }`}
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className={`px-3 py-1 rounded-lg font-medium ${
                              isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'
                            }`}>
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className={`p-1 rounded-lg transition-all duration-200 ${
                                isDarkMode 
                                  ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                                  : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                              }`}
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => removeFromOrder(item.id)}
                              className="p-1 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-all duration-200"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        
                        <div className="mt-2 text-right">
                          <span className={`text-lg font-bold ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            ${(item.price * item.quantity * (1 - item.discountPercentage / 100)).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className={`text-center py-8 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      <Package className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>No items in the order yet.</p>
                      <p className="text-sm mt-1">Search and add medicines above.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className={`rounded-2xl shadow-2xl backdrop-blur-xl border transition-all duration-300 ${
              isDarkMode 
                ? 'bg-gray-900/90 border-gray-700' 
                : 'bg-white/95 border-gray-200'
            }`}>
              <div className="p-6">
                <h2 className={`text-xl font-bold mb-6 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Order Summary
                </h2>
                
                <div className="space-y-3">
                  <div className={`flex justify-between ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    <span>Subtotal:</span>
                    <span>${orderSummary.subtotal}</span>
                  </div>
                  
                  <div className={`flex justify-between text-green-500`}>
                    <span>Discount:</span>
                    <span>-${orderSummary.totalDiscount}</span>
                  </div>
                  
                  <div className={`border-t pt-3 mt-3 ${
                    isDarkMode ? 'border-gray-700' : 'border-gray-200'
                  }`}>
                    <div className={`flex justify-between text-xl font-bold ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      <span>Total:</span>
                      <span>${orderSummary.total}</span>
                    </div>
                  </div>
                </div>
                
                {/* Order Actions */}
                <div className="mt-6 space-y-3">
                  <button
                    onClick={processOrder}
                    disabled={isProcessing || orderItems.length === 0}
                    className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                      isDarkMode 
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white' 
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                    } disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
                  >
                    {isProcessing ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Processing Order...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Place Order (${orderSummary.total})
                      </div>
                    )}
                  </button>
                  
                  {orderItems.length > 0 && (
                    <button
                      onClick={() => setOrderItems([])}
                      className={`w-full py-3 rounded-xl font-medium transition-all duration-300 ${
                        isDarkMode 
                          ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' 
                          : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                      }`}
                    >
                      Clear Order
                    </button>
                  )}
                </div>
                
                {/* Order Statistics */}
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className={`p-3 rounded-lg ${
                      isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'
                    }`}>
                      <div className={`text-2xl font-bold ${
                        isDarkMode ? 'text-purple-400' : 'text-blue-600'
                      }`}>
                        {orderSummary.itemCount}
                      </div>
                      <div className={`text-sm ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        Items
                      </div>
                    </div>
                    <div className={`p-3 rounded-lg ${
                      isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'
                    }`}>
                      <div className={`text-2xl font-bold ${
                        isDarkMode ? 'text-green-400' : 'text-green-600'
                      }`}>
                        {orderItems.length}
                      </div>
                      <div className={`text-sm ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        Medicines
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className={`rounded-2xl shadow-2xl backdrop-blur-xl border transition-all duration-300 ${
              isDarkMode 
                ? 'bg-gray-900/90 border-gray-700' 
                : 'bg-white/95 border-gray-200'
            }`}>
              {/* <div className="p-6">
                <h2 className={`text-lg font-bold mb-4 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Quick Actions
                </h2>
                
                <div className="grid grid-cols-2 gap-3">
                  <button className={`p-3 rounded-xl transition-all duration-300 hover:scale-105 ${
                    isDarkMode 
                      ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}>
                    <Calculator className="w-5 h-5 mx-auto mb-1" />
                    <span className="text-sm">Calculator</span>
                  </button>
                  
                  <button className={`p-3 rounded-xl transition-all duration-300 hover:scale-105 ${
                    isDarkMode 
                      ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}>
                    <Clock className="w-5 h-5 mx-auto mb-1" />
                    <span className="text-sm">History</span>
                  </button>
                  
                  <button className={`p-3 rounded-xl transition-all duration-300 hover:scale-105 ${
                    isDarkMode 
                      ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}>
                    <Package className="w-5 h-5 mx-auto mb-1" />
                    <span className="text-sm">Inventory</span>
                  </button>
                  
                  <button className={`p-3 rounded-xl transition-all duration-300 hover:scale-105 ${
                    isDarkMode 
                      ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}>
                    <Activity className="w-5 h-5 mx-auto mb-1" />
                    <span className="text-sm">Reports</span>
                  </button>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      
      {/* Success Modal */}
      {orderSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className={`max-w-md w-full mx-4 p-8 rounded-2xl shadow-2xl ${
            isDarkMode ? 'bg-gray-900' : 'bg-white'
          }`}>
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h2 className={`text-2xl font-bold mb-2 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Order Placed Successfully!
              </h2>
              <p className={`${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Order has been processed and saved. Customer will be notified.
              </p>
              <div className="mt-6 p-4 bg-green-50 rounded-xl">
                <div className="text-sm text-green-800">
                  <p><strong>Customer:</strong> {customerInfo.name}</p>
                  <p><strong>Total Amount:</strong> ${orderSummary.total}</p>
                  <p><strong>Items:</strong> {orderSummary.itemCount}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Floating Background Elements */}
      {/* Floating Background Elements */}
<div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
  {/* Subtle glowing blobs */}
  <div className={`absolute top-20 left-20 w-72 h-72 rounded-full opacity-[0.04] blur-[100px] ${
    isDarkMode 
      ? 'bg-gradient-to-r from-purple-900 to-pink-900' 
      : 'bg-gradient-to-r from-blue-300 to-purple-300'
  } animate-slowPulse`} />

  <div className={`absolute bottom-20 right-20 w-96 h-96 rounded-full opacity-[0.035] blur-[120px] ${
    isDarkMode 
      ? 'bg-gradient-to-r from-blue-900 to-cyan-900' 
      : 'bg-gradient-to-r from-indigo-300 to-blue-300'
  } animate-slowPulse`} style={{ animationDelay: '4s' }} />

  {/* Floating Medical Icons */}
  <div className="absolute top-32 right-32 animate-softFloat" style={{ animationDelay: '2s' }}>
    <Pill className={`w-6 h-6 ${isDarkMode ? 'text-purple-900/20' : 'text-blue-300/20'}`} />
  </div>
  <div className="absolute bottom-32 left-32 animate-softFloat" style={{ animationDelay: '5s' }}>
    <Heart className={`w-6 h-6 ${isDarkMode ? 'text-pink-900/20' : 'text-red-300/20'}`} />
  </div>
  <div className="absolute top-1/2 left-1/4 animate-softFloat" style={{ animationDelay: '3s' }}>
    <Shield className={`w-6 h-6 ${isDarkMode ? 'text-blue-900/20' : 'text-green-300/20'}`} />
  </div>
</div>

    </div>
  );
};

export default OrderDashboard;