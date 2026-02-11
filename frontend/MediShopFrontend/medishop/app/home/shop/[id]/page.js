"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Store, 
  Package, 
  ShoppingCart, 
  BarChart3,
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Activity,
  ChevronRight,
  Moon,
  Sun,
  User,
  Building2
} from 'lucide-react';

const ShopDashboard = ({ params }) => {
  const router = useRouter();
  const [shopId, setShopId] = useState(null);
  
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [floatingElements, setFloatingElements] = useState([]);
  
  // Shop data
  const [shopData, setShopData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Initialize shop ID and floating elements
  useEffect(() => {
    const initializeShopId = async () => {
      try {
        const resolvedParams = await params;
        setShopId(resolvedParams.id);
      } catch (err) {
        console.error('Error resolving params:', err);
        setError('Invalid shop ID');
        setLoading(false);
      }
    };
    
    initializeShopId();
    
    document.documentElement.classList.toggle('dark', isDarkMode);
    
    const elements = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      icon: [Store, Package, ShoppingCart, BarChart3, Activity, Building2][i % 6],
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 4,
      duration: 8 + Math.random() * 4
    }));
    setFloatingElements(elements);
  }, [params, isDarkMode]);
  
  // Fetch shop data when shopId is available
  useEffect(() => {
    if (shopId) {
      fetchShopData();
    }
  }, [shopId]);
  
  const fetchShopData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/shop/getById?shopId=${encodeURIComponent(shopId)}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch shop data: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      if (!data) {
        throw new Error('Shop not found');
      }
      
      setShopData(data);
    } catch (error) {
      console.error('Error fetching shop data:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };
  
  const handleNavigate = (route) => {
    router.push(route);
  };
  
  const handleBackToShops = () => {
    router.push('/shops');
  };
  
  // Navigation options for the shop - using shopId dynamically
  const getNavigationOptions = () => {
    if (!shopId) return [];
    
    return [
            {
        title: 'Medicine Dashboard',
        description: 'Detailed medicine management and analytics',
        icon: Activity,
        route: `/home/shop/${shopId}/medicine/dashboard`,
        color: 'from-orange-600 to-red-600',
        stats: 'Advanced medicine tools'
      },
      {
        title: 'Order Dashboard',
        description: 'Process new orders, manage customer requests',
        icon: ShoppingCart,
        route: `/home/shop/${shopId}/order/dashboard`,
        color: 'from-green-600 to-teal-600',
        stats: 'Process current orders'
      },
      {
        title: 'Previous Orders',
        description: 'View order history, analytics, and sales reports',
        icon: BarChart3,
        route: `/home/shop/${shopId}/order/previous`,
        color: 'from-purple-600 to-pink-600',
        stats: `${shopData?.totalOrders || 0} total orders`
      }

    ];
  };

  // Loading state
  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDarkMode 
          ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' 
          : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
      }`}>
        <div className="text-center">
          <div className={`animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 mx-auto mb-4 ${
            isDarkMode ? 'border-purple-500' : 'border-blue-500'
          }`}></div>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
            Loading shop data...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDarkMode 
          ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' 
          : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
      }`}>
        <div className="text-center">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
            isDarkMode ? 'bg-red-900/50' : 'bg-red-100'
          }`}>
            <Store className={`w-8 h-8 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`} />
          </div>
          <h2 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
            Error Loading Shop
          </h2>
          <p className={`mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {error}
          </p>
          <div className="space-x-4">
            <Button onClick={fetchShopData} variant="outline">
              Try Again
            </Button>
            <Button onClick={handleBackToShops} variant="ghost">
              Back to Shops
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const navigationOptions = getNavigationOptions();

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
        <div className="max-w-6xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={handleBackToShops}
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
                  {shopData?.name || 'Loading...'}
                </h1>
              
              </div>
            </div>
          </div>
        </div>
        

        
        {/* Navigation Options */}
        <div className="max-w-6xl mx-auto">
          <Card className={`border-0 shadow-xl backdrop-blur-xl ${
            isDarkMode ? 'bg-gray-900/90 text-white' : 'bg-white/95 text-gray-900'
          }`}>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Shop Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {navigationOptions.map((option, index) => (
                  <Card
                    key={index}
                    className={`cursor-pointer border-0 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                      isDarkMode ? 'bg-gray-800/50 hover:bg-gray-700/50' : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                    onClick={() => handleNavigate(option.route)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-3 rounded-full bg-gradient-to-br ${option.color}`}>
                          <option.icon className="w-6 h-6 text-white" />
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{option.title}</h3>
                      <p className={`text-sm mb-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {option.description}
                      </p>
                      <Badge className={`text-xs ${
                        isDarkMode 
                          ? 'bg-gray-700 text-gray-300' 
                          : 'bg-gray-200 text-gray-700'
                      }`}>
                        {option.stats}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ShopDashboard;