"use client"
import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Search, 
  Filter, 
  SortAsc, 
  SortDesc, 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  Package, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  DollarSign, 
  Calendar, 
  Grid3X3, 
  List, 
  Download, 
  Upload,
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
  MoreHorizontal
} from 'lucide-react';

const MedicineDashboard = () => {
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  // View state
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [selectedMedicines, setSelectedMedicines] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [quantityFilter, setQuantityFilter] = useState('all');
  const [expiryFilter, setExpiryFilter] = useState('all');
  
  // Floating animation state
  const [floatingElements, setFloatingElements] = useState([]);
  
  // Mock medicine data - in real app, this would come from your backend
  const [medicines, setMedicines] = useState([
    {
      id: 'med-001',
      name: 'Paracetamol',
      groupName: 'Analgesics',
      power: 500,
      category: 'Pain Relief',
      price: 15.99,
      givenFor: 'Fever, Pain',
      availableQuantity: 150,
      manufacturedDate: '2024-01-15',
      expiryDate: '2026-01-15',
      position: 1,
      discountPercentage: 10.0,
      shopId: 'shop-001',
      status: 'active'
    },
    {
      id: 'med-002',
      name: 'Amoxicillin',
      groupName: 'Antibiotics',
      power: 250,
      category: 'Antibiotic',
      price: 25.50,
      givenFor: 'Bacterial Infections',
      availableQuantity: 75,
      manufacturedDate: '2024-02-10',
      expiryDate: '2025-08-10',
      position: 2,
      discountPercentage: 5.0,
      shopId: 'shop-001',
      status: 'active'
    },
    {
      id: 'med-003',
      name: 'Ibuprofen',
      groupName: 'NSAIDs',
      power: 400,
      category: 'Anti-inflammatory',
      price: 18.75,
      givenFor: 'Inflammation, Pain',
      availableQuantity: 25,
      manufacturedDate: '2024-03-05',
      expiryDate: '2026-03-05',
      position: 3,
      discountPercentage: 15.0,
      shopId: 'shop-001',
      status: 'low-stock'
    },
    {
      id: 'med-004',
      name: 'Aspirin',
      groupName: 'NSAIDs',
      power: 75,
      category: 'Cardiovascular',
      price: 12.99,
      givenFor: 'Heart Disease Prevention',
      availableQuantity: 200,
      manufacturedDate: '2024-01-20',
      expiryDate: '2025-12-20',
      position: 4,
      discountPercentage: 0.0,
      shopId: 'shop-001',
      status: 'expiring-soon'
    },
    {
      id: 'med-005',
      name: 'Metformin',
      groupName: 'Antidiabetic',
      power: 850,
      category: 'Diabetes',
      price: 22.00,
      givenFor: 'Type 2 Diabetes',
      availableQuantity: 0,
      manufacturedDate: '2024-02-01',
      expiryDate: '2026-02-01',
      position: 5,
      discountPercentage: 8.0,
      shopId: 'shop-001',
      status: 'out-of-stock'
    },
    {
      id: 'med-006',
      name: 'Omeprazole',
      groupName: 'Proton Pump Inhibitors',
      power: 20,
      category: 'Gastric',
      price: 28.99,
      givenFor: 'Acid Reflux, Ulcers',
      availableQuantity: 120,
      manufacturedDate: '2024-03-15',
      expiryDate: '2026-03-15',
      position: 6,
      discountPercentage: 12.0,
      shopId: 'shop-001',
      status: 'active'
    }
  ]);
  
  // Initialize floating elements
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    
    const elements = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      icon: [Pill, Heart, Activity, Shield, Package, DollarSign, Calendar, BarChart3][i % 8],
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 6,
      duration: 10 + Math.random() * 5
    }));
    setFloatingElements(elements);
  }, [isDarkMode]);
  
  // Calculate statistics
  const stats = useMemo(() => {
    const totalMedicines = medicines.length;
    const activeMedicines = medicines.filter(m => m.status === 'active').length;
    const lowStock = medicines.filter(m => m.status === 'low-stock').length;
    const outOfStock = medicines.filter(m => m.status === 'out-of-stock').length;
    const expiringSoon = medicines.filter(m => m.status === 'expiring-soon').length;
    const totalValue = medicines.reduce((sum, m) => sum + (m.price * m.availableQuantity), 0);
    const avgPrice = medicines.reduce((sum, m) => sum + m.price, 0) / totalMedicines;
    
    return {
      totalMedicines,
      activeMedicines,
      lowStock,
      outOfStock,
      expiringSoon,
      totalValue,
      avgPrice
    };
  }, [medicines]);
  
  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(medicines.map(m => m.category))];
    return uniqueCategories.sort();
  }, [medicines]);
  
  // Filter and sort medicines
  const filteredAndSortedMedicines = useMemo(() => {
    let filtered = medicines.filter(medicine => {
      const matchesSearch = medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           medicine.groupName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           medicine.givenFor.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = categoryFilter === 'all' || medicine.category === categoryFilter;
      const matchesStatus = statusFilter === 'all' || medicine.status === statusFilter;
      
      const matchesPrice = (!priceRange.min || medicine.price >= parseFloat(priceRange.min)) &&
                          (!priceRange.max || medicine.price <= parseFloat(priceRange.max));
      
      const matchesQuantity = quantityFilter === 'all' ||
                             (quantityFilter === 'in-stock' && medicine.availableQuantity > 0) ||
                             (quantityFilter === 'out-of-stock' && medicine.availableQuantity === 0) ||
                             (quantityFilter === 'low-stock' && medicine.availableQuantity > 0 && medicine.availableQuantity <= 50);
      
      const matchesExpiry = expiryFilter === 'all' ||
                           (expiryFilter === 'expiring-soon' && medicine.status === 'expiring-soon') ||
                           (expiryFilter === 'expired' && new Date(medicine.expiryDate) < new Date());
      
      return matchesSearch && matchesCategory && matchesStatus && matchesPrice && matchesQuantity && matchesExpiry;
    });
    
    // Sort
    filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (sortBy === 'price' || sortBy === 'power' || sortBy === 'availableQuantity') {
        aValue = parseFloat(aValue) || 0;
        bValue = parseFloat(bValue) || 0;
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
    
    return filtered;
  }, [medicines, searchTerm, sortBy, sortOrder, categoryFilter, statusFilter, priceRange, quantityFilter, expiryFilter]);
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return isDarkMode ? 'text-green-400' : 'text-green-600';
      case 'low-stock': return isDarkMode ? 'text-yellow-400' : 'text-yellow-600';
      case 'out-of-stock': return isDarkMode ? 'text-red-400' : 'text-red-600';
      case 'expiring-soon': return isDarkMode ? 'text-orange-400' : 'text-orange-600';
      default: return isDarkMode ? 'text-gray-400' : 'text-gray-600';
    }
  };
  
  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'low-stock': return <AlertTriangle className="w-4 h-4" />;
      case 'out-of-stock': return <Package className="w-4 h-4" />;
      case 'expiring-soon': return <Clock className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };
  
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};
  
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };
  
  const handleSelectMedicine = (medicineId) => {
    setSelectedMedicines(prev => 
      prev.includes(medicineId) 
        ? prev.filter(id => id !== medicineId)
        : [...prev, medicineId]
    );
  };
  
  const handleSelectAll = () => {
    if (selectedMedicines.length === filteredAndSortedMedicines.length) {
      setSelectedMedicines([]);
    } else {
      setSelectedMedicines(filteredAndSortedMedicines.map(m => m.id));
    }
  };
  
  const StatCard = ({ title, value, icon: Icon, color, trend }) => (
    <Card className={`transition-all duration-300 hover:shadow-lg ${
      isDarkMode 
        ? 'bg-gray-800/50 border-gray-700/50 hover:bg-gray-800/70' 
        : 'bg-white/50 border-gray-200/50 hover:bg-white/70'
    } backdrop-blur-sm`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {title}
            </p>
            <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {value}
            </p>
          </div>
          <div className={`p-3 rounded-full ${color}`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
        {trend && (
          <div className="flex items-center mt-2 text-sm">
            {trend > 0 ? (
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
            )}
            <span className={trend > 0 ? 'text-green-500' : 'text-red-500'}>
              {Math.abs(trend)}%
            </span>
            <span className={`ml-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              from last month
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
  
  const MedicineCard = ({ medicine }) => (
    <Card className={`transition-all duration-300 hover:shadow-lg hover:scale-105 ${
      isDarkMode 
        ? 'bg-gray-800/50 border-gray-700/50 hover:bg-gray-800/70' 
        : 'bg-white/50 border-gray-200/50 hover:bg-white/70'
    } backdrop-blur-sm ${selectedMedicines.includes(medicine.id) ? 'ring-2 ring-purple-500' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <input
                type="checkbox"
                checked={selectedMedicines.includes(medicine.id)}
                onChange={() => handleSelectMedicine(medicine.id)}
                className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <CardTitle className={`text-lg font-semibold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {medicine.name}
              </CardTitle>
            </div>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {medicine.groupName} • {medicine.power}mg
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`flex items-center gap-1 text-sm font-medium ${getStatusColor(medicine.status)}`}>
              {getStatusIcon(medicine.status)}
              {medicine.status.replace('-', ' ')}
            </span>
            <Button
              variant="ghost"
              size="sm"
              className={`${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
            >
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Price
            </p>
            <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {formatCurrency(medicine.price)}
            </p>
            {medicine.discountPercentage > 0 && (
              <p className="text-xs text-green-500 font-medium">
                {medicine.discountPercentage}% off
              </p>
            )}
          </div>
          <div>
            <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Stock
            </p>
            <p className={`text-lg font-bold ${
              medicine.availableQuantity === 0 ? 'text-red-500' :
              medicine.availableQuantity <= 50 ? 'text-yellow-500' :
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {medicine.availableQuantity}
            </p>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Category:</span>
            <span className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
              {medicine.category}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Used for:</span>
            <span className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
              {medicine.givenFor}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Expires:</span>
            <span className={`font-medium ${
              new Date(medicine.expiryDate) < new Date() ? 'text-red-500' :
              medicine.status === 'expiring-soon' ? 'text-orange-500' :
              isDarkMode ? 'text-gray-200' : 'text-gray-800'
            }`}>
              {formatDate(medicine.expiryDate)}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            className={`flex-1 ${
              isDarkMode 
                ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Eye className="w-4 h-4 mr-2" />
            View
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={`flex-1 ${
              isDarkMode 
                ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Edit3 className="w-4 h-4 mr-2" />
            Edit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
  
  const MedicineListItem = ({ medicine }) => (
    <div className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${
      isDarkMode 
        ? 'bg-gray-800/50 border-gray-700/50 hover:bg-gray-800/70' 
        : 'bg-white/50 border-gray-200/50 hover:bg-white/70'
    } backdrop-blur-sm ${selectedMedicines.includes(medicine.id) ? 'ring-2 ring-purple-500' : ''}`}>
      <div className="flex items-center gap-4">
        <input
          type="checkbox"
          checked={selectedMedicines.includes(medicine.id)}
          onChange={() => handleSelectMedicine(medicine.id)}
          className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
        />
        
        <div className="flex-1 grid grid-cols-6 gap-4 items-center">
          <div>
            <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {medicine.name}
            </h3>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {medicine.groupName}
            </p>
          </div>
          
          <div className="text-center">
            <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {medicine.power}mg
            </p>
            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Power
            </p>
          </div>
          
          <div className="text-center">
            <p className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {formatCurrency(medicine.price)}
            </p>
            {medicine.discountPercentage > 0 && (
              <p className="text-xs text-green-500 font-medium">
                {medicine.discountPercentage}% off
              </p>
            )}
          </div>
          
          <div className="text-center">
            <p className={`font-medium ${
              medicine.availableQuantity === 0 ? 'text-red-500' :
              medicine.availableQuantity <= 50 ? 'text-yellow-500' :
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {medicine.availableQuantity}
            </p>
            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              In Stock
            </p>
          </div>
          
          <div className="text-center">
            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(medicine.status)}`}>
              {getStatusIcon(medicine.status)}
              {medicine.status.replace('-', ' ')}
            </span>
          </div>
          
          <div className="flex items-center gap-2 justify-end">
            <Button
              variant="ghost"
              size="sm"
              className={`${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
            >
              <Eye className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
            >
              <Edit3 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`${isDarkMode ? 'hover:bg-gray-700 text-red-400' : 'hover:bg-gray-100 text-red-500'}`}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900' 
        : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
    } relative overflow-hidden`}>
      
      {/* Floating Medical Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingElements.map((element) => {
          const IconComponent = element.icon;
          return (
            <div
              key={element.id}
              className="absolute animate-float opacity-10"
              style={{
                left: `${element.x}%`,
                top: `${element.y}%`,
                animationDelay: `${element.delay}s`,
                animationDuration: `${element.duration}s`
              }}
            >
              <IconComponent className={`w-12 h-12 ${
                isDarkMode ? 'text-purple-400' : 'text-blue-400'
              }`} />
            </div>
          );
        })}
      </div>

      {/* Header */}
      <div className="sticky top-0 z-50 backdrop-blur-md border-b border-gray-200/10 bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <div className={`p-2 rounded-lg ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600' 
                  : 'bg-gradient-to-r from-blue-600 to-purple-600'
              }`}>
                <Package className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Medicine Dashboard
                </h1>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Manage your pharmacy inventory
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              
              <Button
                className={`${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700' 
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                } text-white`}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Medicine
              </Button>
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-gray-800/50 hover:bg-gray-700/50 text-yellow-400' 
                    : 'bg-white/50 hover:bg-white/70 text-gray-700'
                } backdrop-blur-sm`}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Medicines"
            value={stats.totalMedicines}
            icon={Package}
            color="bg-gradient-to-r from-blue-500 to-blue-600"
            trend={5.2}
          />
          <StatCard
            title="Active Stock"
            value={stats.activeMedicines}
            icon={CheckCircle}
            color="bg-gradient-to-r from-green-500 to-green-600"
            trend={2.1}
          />
          <StatCard
            title="Low Stock"
            value={stats.lowStock}
            icon={AlertTriangle}
            color="bg-gradient-to-r from-yellow-500 to-yellow-600"
            trend={-1.5}
          />
          <StatCard
            title="Total Value"
            value={formatCurrency(stats.totalValue)}
            icon={DollarSign}
            color="bg-gradient-to-r from-purple-500 to-purple-600"
            trend={8.7}
          />
        </div>

        {/* Search and Filter Controls */}
        <Card className={`mb-6 ${
          isDarkMode 
            ? 'bg-gray-800/50 border-gray-700/50' 
            : 'bg-white/50 border-gray-200/50'
        } backdrop-blur-sm`}>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className={`absolute left-3 top-1/2 w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} pointer-events-none`} />
                <Input
                  placeholder="Search medicines..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`pl-10 ${
                    isDarkMode 
                      ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
              </div>
              
              {/* View Toggle */}
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className={viewMode === 'grid' ? 
                    'bg-purple-600 hover:bg-purple-700 text-white' : 
                    isDarkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className={viewMode === 'list' ? 
                    'bg-purple-600 hover:bg-purple-700 text-white' : 
                    isDarkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
              
              {/* Filter Toggle */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className={`${
                  isDarkMode 
                    ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                } ${showFilters ? 'bg-purple-600 text-white' : ''}`}
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
              
              {/* Sort */}
              <div className="flex items-center gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className={`px-3 py-2 rounded-md border text-sm ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="name">Name</option>
                  <option value="price">Price</option>
                  <option value="availableQuantity">Stock</option>
                  <option value="expiryDate">Expiry Date</option>
                </select>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className={`${
                    isDarkMode 
                      ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
                </Button>
              </div>
            </div>
            
            {/* Advanced Filters */}
            {showFilters && (
              <div className="mt-4 p-4 border-t border-gray-200/20">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Category
                    </label>
                    <select
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                      className={`w-full px-3 py-2 rounded-md border text-sm ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    >
                      <option value="all">All Categories</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Status
                    </label>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className={`w-full px-3 py-2 rounded-md border text-sm ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    >
                      <option value="all">All Status</option>
                      <option value="active">Active</option>
                      <option value="low-stock">Low Stock</option>
                      <option value="out-of-stock">Out of Stock</option>
                      <option value="expiring-soon">Expiring Soon</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Min Price
                    </label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                      className={`${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    />
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Max Price
                    </label>
                    <Input
                      type="number"
                      placeholder="999"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                      className={`${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    />
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Stock Level
                    </label>
                    <select
                      value={quantityFilter}
                      onChange={(e) => setQuantityFilter(e.target.value)}
                      className={`w-full px-3 py-2 rounded-md border text-sm ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    >
                      <option value="all">All Stock</option>
                      <option value="in-stock">In Stock</option>
                      <option value="low-stock">Low Stock</option>
                      <option value="out-of-stock">Out of Stock</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Selection Controls */}
        {selectedMedicines.length > 0 && (
          <Card className={`mb-6 ${
            isDarkMode 
              ? 'bg-purple-900/30 border-purple-500/30' 
              : 'bg-purple-50/50 border-purple-200/50'
          } backdrop-blur-sm`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className={`text-sm font-medium ${isDarkMode ? 'text-purple-300' : 'text-purple-700'}`}>
                    {selectedMedicines.length} medicine{selectedMedicines.length !== 1 ? 's' : ''} selected
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSelectAll}
                    className={`${
                      isDarkMode 
                        ? 'border-purple-400 text-purple-300 hover:bg-purple-800' 
                        : 'border-purple-300 text-purple-700 hover:bg-purple-100'
                    }`}
                  >
                    {selectedMedicines.length === filteredAndSortedMedicines.length ? 'Deselect All' : 'Select All'}
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className={`${
                      isDarkMode 
                        ? 'border-purple-400 text-purple-300 hover:bg-purple-800' 
                        : 'border-purple-300 text-purple-700 hover:bg-purple-100'
                    }`}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export Selected
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`${
                      isDarkMode 
                        ? 'border-red-400 text-red-300 hover:bg-red-900' 
                        : 'border-red-300 text-red-700 hover:bg-red-100'
                    }`}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Selected
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Showing {filteredAndSortedMedicines.length} of {medicines.length} medicines
            </p>
            {searchTerm && (
              <div className="flex items-center gap-2">
                <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Search results for:
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  isDarkMode 
                    ? 'bg-purple-900/50 text-purple-300 border border-purple-500/30' 
                    : 'bg-purple-100 text-purple-700 border border-purple-200'
                }`}>
                  "{searchTerm}"
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSearchTerm('')}
                  className={`h-6 w-6 p-0 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                >
                  ×
                </Button>
              </div>
            )}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setIsLoading(true);
              setTimeout(() => setIsLoading(false), 1000);
            }}
            disabled={isLoading}
            className={`${
              isDarkMode 
                ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <RefreshCcw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {/* Medicine Grid/List */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Loading medicines...
              </p>
            </div>
          </div>
        ) : filteredAndSortedMedicines.length === 0 ? (
          <Card className={`${
            isDarkMode 
              ? 'bg-gray-800/50 border-gray-700/50' 
              : 'bg-white/50 border-gray-200/50'
          } backdrop-blur-sm`}>
            <CardContent className="p-12 text-center">
              <Package className={`w-16 h-16 mx-auto mb-4 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} />
              <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                No medicines found
              </h3>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                {searchTerm ? 'Try adjusting your search or filters' : 'Get started by adding your first medicine'}
              </p>
              <Button
                className={`${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700' 
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                } text-white`}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Medicine
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className={`${
            viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
              : 'space-y-4'
          }`}>
            {viewMode === 'grid' ? (
              filteredAndSortedMedicines.map((medicine) => (
                <MedicineCard key={medicine.id} medicine={medicine} />
              ))
            ) : (
              <>
                {/* List Header */}
                <div className={`p-4 rounded-lg border ${
                  isDarkMode 
                    ? 'bg-gray-800/30 border-gray-700/30' 
                    : 'bg-gray-50/50 border-gray-200/50'
                } backdrop-blur-sm`}>
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      checked={selectedMedicines.length === filteredAndSortedMedicines.length}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <div className="flex-1 grid grid-cols-6 gap-4 text-sm font-medium">
                      <div className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Medicine</div>
                      <div className={`text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Power</div>
                      <div className={`text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Price</div>
                      <div className={`text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Stock</div>
                      <div className={`text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Status</div>
                      <div className={`text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Actions</div>
                    </div>
                  </div>
                </div>
                
                {/* List Items */}
                {filteredAndSortedMedicines.map((medicine) => (
                  <MedicineListItem key={medicine.id} medicine={medicine} />
                ))}
              </>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              © 2025 Medicine Dashboard. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-sm">
              <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Last updated: {new Date().toLocaleDateString()}
              </span>
             
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-20px) rotate(90deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
          75% { transform: translateY(-15px) rotate(270deg); }
        }
        
        .animate-float {
          animation: float 15s ease-in-out infinite;
        }
        
        .backdrop-blur-sm {
          backdrop-filter: blur(8px);
        }
      `}</style>
    </div>
  );
};

export default MedicineDashboard;