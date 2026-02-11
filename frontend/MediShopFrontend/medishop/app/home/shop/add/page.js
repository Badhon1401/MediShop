"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Store, 
  ArrowLeft,
  MapPin, 
  User,
  Moon,
  Sun,
  Save,
  X,
  Building2,
  Mail,
  Phone
} from 'lucide-react';

const AddShopPage = () => {
  const router = useRouter();
  
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [floatingElements, setFloatingElements] = useState([]);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    location: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  // Initialize floating elements
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    
    const elements = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      icon: [Store, Building2, MapPin, User, Mail, Phone][i % 6],
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 4,
      duration: 8 + Math.random() * 4
    }));
    setFloatingElements(elements);
  }, [isDarkMode]);
  
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Shop name is required';
    }
    
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setLoading(true);
      
      // Real API call - uncomment when ready
      const response = await fetch('/api/shop/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create shop');
      }
      
      const newShop = await response.json();
      
      // Simulate API call for demo
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Redirect to shops list
      router.push('/home');
    } catch (error) {
      console.error('Error creating shop:', error);
      // Handle error (show toast, etc.)
    } finally {
      setLoading(false);
    }
  };
  
  const handleCancel = () => {
    router.push('/shops');
  };

  return (
    <div className={`min-h-screen relative overflow-hidden transition-all duration-700 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
    }`}>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingElements.map((element) => {
          const IconComponent = element.icon;
          return (
            <div
              key={element.id}
              className={`absolute animate-pulse ${
                isDarkMode ? 'text-purple-500/20' : 'text-indigo-300/30'
              }`}
              style={{
                left: `${element.x}%`,
                top: `${element.y}%`,
                animationDelay: `${element.delay}s`,
                animationDuration: `${element.duration}s`
              }}
            >
              <IconComponent className="w-8 h-8" />
            </div>
          );
        })}
      </div>
      
      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className={`fixed top-6 right-6 p-4 rounded-full shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-110 z-50 ${
          isDarkMode 
            ? 'bg-gray-800/80 text-yellow-400 hover:bg-gray-700/80 border border-gray-700' 
            : 'bg-white/80 text-gray-800 hover:bg-gray-50/80 border border-gray-200'
        }`}
      >
        {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
      </button>
      
      {/* Main Content */}
      <div className="relative z-10 p-6">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={handleCancel}
                className={`p-2 rounded-full ${
                  isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                }`}
              >
                <ArrowLeft className="w-6 h-6" />
              </Button>
              <div className={`w-20 h-20 rounded-full flex items-center justify-center ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-purple-600 to-pink-600' 
                  : 'bg-gradient-to-br from-blue-600 to-purple-600'
              } shadow-lg`}>
                <Store className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className={`text-4xl font-bold bg-clip-text text-transparent ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-purple-400 via-pink-400 to-red-400' 
                    : 'bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600'
                }`}>
                  Add New Shop
                </h1>
                <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Create a new pharmacy in your network
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Form */}
        <div className="max-w-4xl mx-auto">
          <Card className={`border-0 shadow-xl backdrop-blur-xl ${
            isDarkMode ? 'bg-gray-900/90 text-white' : 'bg-white/95 text-gray-900'
          }`}>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Shop Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Shop Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Shop Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Store className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`} />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter shop name"
                        className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 ${
                          errors.name 
                            ? 'border-red-500 focus:ring-red-500' 
                            : isDarkMode 
                              ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:ring-purple-500' 
                              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500'
                        }`}
                      />
                    </div>
                    {errors.name && (
                      <p className="text-red-500 text-sm">{errors.name}</p>
                    )}
                  </div>
                  
                  {/* Location */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Location <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <MapPin className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`} />
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="Enter location"
                        className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 ${
                          errors.location 
                            ? 'border-red-500 focus:ring-red-500' 
                            : isDarkMode 
                              ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:ring-purple-500' 
                              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500'
                        }`}
                      />
                    </div>
                    {errors.location && (
                      <p className="text-red-500 text-sm">{errors.location}</p>
                    )}
                  </div>
                  
                  {/* Phone */}
                  {/* <div className="space-y-2">
                    <label className="text-sm font-medium">Phone</label>
                    <div className="relative">
                      <Phone className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`} />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter phone number"
                        className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 ${
                          errors.phone 
                            ? 'border-red-500 focus:ring-red-500' 
                            : isDarkMode 
                              ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:ring-purple-500' 
                              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500'
                        }`}
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-red-500 text-sm">{errors.phone}</p>
                    )}
                  </div>
                  
                  {/* Email */}
                  {/* <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <div className="relative">
                      <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`} />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter email address"
                        className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 ${
                          errors.email 
                            ? 'border-red-500 focus:ring-red-500' 
                            : isDarkMode 
                              ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:ring-purple-500' 
                              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500'
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-sm">{errors.email}</p>
                    )}
                  </div> */}
                </div>
                
                {/* Address */}
                {/* <div className="space-y-2">
                  <label className="text-sm font-medium">Full Address</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter complete address"
                    rows={3}
                    className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 resize-none ${
                      isDarkMode 
                        ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:ring-purple-500' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500'
                    }`}
                  />
                </div> */}
                
                {/* Description */}
                {/* <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Enter shop description (optional)"
                    rows={4}
                    className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 resize-none ${
                      isDarkMode 
                        ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:ring-purple-500' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500'
                    }`}
                  />
                </div> */}
                
                {/* Action Buttons */}
                <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <Button
                    type="button"
                    onClick={handleCancel}
                    variant="outline"
                    className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                      isDarkMode 
                        ? 'border-gray-700 text-gray-300 hover:bg-gray-800' 
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={loading}
                    className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
                      isDarkMode 
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700' 
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                    } text-white shadow-lg`}
                  >
                    {loading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                        Creating Shop...
                      </div>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Create Shop
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AddShopPage;