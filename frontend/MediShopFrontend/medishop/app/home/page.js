"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Store, 
  Plus, 
  MapPin, 
  User,
  Moon,
  Sun,
  Search,
  Filter,
  ChevronRight,
  Building2
} from 'lucide-react';

const ShopsListDashboard = () => {
  const router = useRouter();
  
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [floatingElements, setFloatingElements] = useState([]);
  
  // Shops data
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredShops, setFilteredShops] = useState([]);
  
  // Dummy data for demo
  const dummyShops = [
    {
      id: '1',
      name: 'MediCare Plus',
      location: 'Chittagong Medical College Area',
      owner: { name: 'Dr. Ahmed Hassan' }
      
    },
    {
      id: '2',
      name: 'Health Point Pharmacy',
      location: 'Agrabad Commercial Area',
      owner: { name: 'Dr. Fatima Rahman' }
      
    },
    {
      id: '3',
      name: 'Green Life Pharmacy',
      location: 'Nasirabad Housing Society',
      owner: { name: 'Dr. Mohammad Ali' }
      
    }
  ];
  
  // Initialize floating elements
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    
    const elements = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      icon: [Store, Building2, Plus, User, MapPin][i % 5],
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 4,
      duration: 8 + Math.random() * 4
    }));
    setFloatingElements(elements);
    
    // Fetch shops from API
    fetchShops();
  }, [isDarkMode]);
  
  // Filter shops based on search term
 useEffect(() => {
  if (Array.isArray(shops)) {
    const filtered = shops.filter(shop =>
      shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shop.location.toLowerCase().includes(searchTerm.toLowerCase()) 
    );
    setFilteredShops(filtered);
  } else {
    console.warn("Shops is not an array:", shops);
    setFilteredShops([]);
  }
}, [shops, searchTerm]);

  
  const fetchShops = async () => {
    try {
      setLoading(true);
      
      const response = await fetch('/api/shop/get');
if (!response.ok) throw new Error(`HTTP ${response.status}`);
const data = await response.json();
setShops(Array.isArray(data) ? data : []);

     
      setLoading(false);
      // Using dummy data for now
      // setTimeout(() => {
      //   setShops(dummyShops);
      //   setLoading(false);
      // }, 1000);
    } catch (error) {
      console.error('Error fetching shops:', error);
      //setShops(dummyShops);
      setLoading(false);
    }
  };
  
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };
  
  const handleShopClick = (shopId) => {
    router.push(`/home/shop/${shopId}`);
  };
  
  const handleAddShop = () => {
    router.push('/home/shop/add');
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
        <div className="max-w-6xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-purple-600 to-pink-600' 
                  : 'bg-gradient-to-br from-blue-600 to-purple-600'
              } shadow-lg`}>
                <Building2 className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className={`text-4xl font-bold bg-clip-text text-transparent ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-purple-400 via-pink-400 to-red-400' 
                    : 'bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600'
                }`}>
                  My Shops
                </h1>
                <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Manage your pharmacy network
                </p>
              </div>
            </div>
            <Button
              onClick={handleAddShop}
              className={`px-6 py-3 text-lg font-semibold rounded-xl shadow-lg transition-all duration-300 hover:scale-105 ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700' 
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
              } text-white`}
            >
              <Plus className="w-5 h-5 mr-2" />
              Add New Shop
            </Button>
          </div>
          
          {/* Search Bar */}
          <div className="relative">
            <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`} />
            <input
              type="text"
              placeholder="Search shops by name or location ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-12 pr-4 py-4 rounded-xl border-0 shadow-lg backdrop-blur-md transition-all duration-300 focus:outline-none focus:ring-2 ${
                isDarkMode 
                  ? 'bg-gray-900/90 text-white placeholder-gray-400 focus:ring-purple-500' 
                  : 'bg-white/95 text-gray-900 placeholder-gray-500 focus:ring-blue-500'
              }`}
            />
          </div>
        </div>
        
        {/* Shops Grid */}
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className={`animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 ${
                isDarkMode ? 'border-purple-500' : 'border-blue-500'
              }`}></div>
            </div>
          ) : filteredShops.length === 0 ? (
            <Card className={`border-0 shadow-xl backdrop-blur-xl text-center py-16 ${
              isDarkMode ? 'bg-gray-900/90 text-white' : 'bg-white/95 text-gray-900'
            }`}>
              <CardContent>
                <Store className={`w-24 h-24 mx-auto mb-6 ${
                  isDarkMode ? 'text-gray-600' : 'text-gray-400'
                }`} />
                <h3 className="text-2xl font-bold mb-4">No Shops Found</h3>
                <p className={`text-lg mb-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {searchTerm ? 'No shops match your search criteria.' : 'You haven\'t created any shops yet.'}
                </p>
                {!searchTerm && (
                  <Button
                    onClick={handleAddShop}
                    className={`px-8 py-3 text-lg font-semibold rounded-xl shadow-lg transition-all duration-300 hover:scale-105 ${
                      isDarkMode 
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700' 
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                    } text-white`}
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Create Your First Shop
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredShops.map((shop) => (
                <Card
                  key={shop.id}
                  className={`cursor-pointer border-0 shadow-xl backdrop-blur-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 ${
                    isDarkMode ? 'bg-gray-900/90 hover:bg-gray-800/90' : 'bg-white/95 hover:bg-gray-50/95'
                  }`}
                  onClick={() => handleShopClick(shop.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-4 rounded-full ${
                        isDarkMode 
                          ? 'bg-gradient-to-br from-purple-600 to-pink-600' 
                          : 'bg-gradient-to-br from-blue-600 to-purple-600'
                      }`}>
                        <Store className="w-8 h-8 text-white" />
                      </div>
                      <ChevronRight className={`w-5 h-5 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`} />
                    </div>
                    
                    <h3 className={`text-xl font-bold mb-2 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {shop.name}
                    </h3>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-blue-500" />
                        <span className={`text-sm ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {shop.location}
                        </span>
                      </div>
                      
                    </div>
                    
                   
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopsListDashboard;