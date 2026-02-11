"use client"
import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import {
  Search, Download, Eye, Calendar, TrendingUp, Package, Users, DollarSign, 
  ShoppingCart, Pill, Activity, BarChart3, PieChart as PieChartIcon, 
  RefreshCw, ArrowUp, ArrowDown, MapPin, Phone, User, Hash, Sun, Moon
} from 'lucide-react';

const OrderDashboard = () => {
  const params = useParams(); 
  const [shopId, setShopId] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [currentView, setCurrentView] = useState('overview');
  const [isLoading, setIsLoading] = useState(true); // Start with loading true
  const [ordersData, setOrdersData] = useState([]); // Initialize as empty array

  useEffect(() => {
    if (params?.id) {
      setShopId(params.id);
    }
  }, [params]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!shopId) return;
      
      setIsLoading(true);
      try {
        const response = await fetch(`/api/order/get?shopId=${shopId}`);
        const data = await response.json();
        console.log(data);
        if (Array.isArray(data)) {
  setOrdersData(data);
} else {
  console.warn('Unexpected API shape:', data);
  setOrdersData([]);
}

      } catch (error) {
        console.error('Error fetching orders:', error);
        setOrdersData([]); // Set to empty array on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [shopId]);

  // Analytics calculations
  const analytics = useMemo(() => {
    // Safety check: ensure ordersData is an array
    if (!Array.isArray(ordersData) || ordersData.length === 0) {
      return {
        totalRevenue: 0,
        totalOrders: 0,
        totalItems: 0,
        averageOrderValue: 0,
        shopPerformance: [],
        categoryRevenue: [],
        categoryQuantity: [],
        ageDemographics: []
      };
    }

    const totalRevenue = ordersData.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
    const totalOrders = ordersData.length;
    const totalItems = ordersData.reduce((sum, order) => sum + (order.items?.length || 0), 0);
    const averageOrderValue = totalRevenue / totalOrders || 0;
    
    // Shop performance
    const shopPerformance = {};
    ordersData.forEach(order => {
      const shopName = order.shopName || 'Unknown Shop';
      if (!shopPerformance[shopName]) {
        shopPerformance[shopName] = { revenue: 0, orders: 0 };
      }
      shopPerformance[shopName].revenue += order.totalAmount || 0;
      shopPerformance[shopName].orders += 1;
    });
    
    // Medicine category analysis
    const categoryRevenue = {};
    const categoryQuantity = {};
    ordersData.forEach(order => {
      if (order.items && Array.isArray(order.items)) {
        order.items.forEach(item => {
          const category = item.category || 'Other';
          const itemTotal = (order.totalAmount || 0) / order.items.length; // Rough estimation
          
          if (!categoryRevenue[category]) {
            categoryRevenue[category] = 0;
            categoryQuantity[category] = 0;
          }
          categoryRevenue[category] += itemTotal;
          categoryQuantity[category] += item.quantity || 0;
        });
      }
    });

    // Age demographics
    const ageDemographics = {
      '18-30': 0,
      '31-40': 0,
      '41-50': 0,
      '51-60': 0,
      '60+': 0
    };

    ordersData.forEach(order => {
      const age = order.customerAge || 0;
      if (age <= 30) ageDemographics['18-30']++;
      else if (age <= 40) ageDemographics['31-40']++;
      else if (age <= 50) ageDemographics['41-50']++;
      else if (age <= 60) ageDemographics['51-60']++;
      else ageDemographics['60+']++;
    });
    
    return {
      totalRevenue,
      totalOrders,
      totalItems,
      averageOrderValue,
      shopPerformance: Object.entries(shopPerformance).map(([name, data]) => ({ name, ...data })),
      categoryRevenue: Object.entries(categoryRevenue).map(([name, value]) => ({ name, value })),
      categoryQuantity: Object.entries(categoryQuantity).map(([name, value]) => ({ name, value })),
      ageDemographics: Object.entries(ageDemographics).map(([range, count]) => ({ range, count }))
    };
  }, [ordersData]);

  // Chart data for revenue trend (simulate daily data)
  const dailyRevenueData = useMemo(() => {
    const last7Days = [];
    
    // Safety check: ensure ordersData is an array
    if (!Array.isArray(ordersData)) {
      // Return empty data structure if ordersData is not an array
      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' });
        last7Days.push({
          date: dateStr,
          revenue: 0,
          orders: 0
        });
      }
      return last7Days;
    }

    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' });
      
      // Filter orders for this specific date
      const dailyOrders = ordersData.filter(order => {
        if (!order.orderDate) return false;
        const orderDate = new Date(order.orderDate);
        return orderDate.toDateString() === date.toDateString();
      });
      
      const revenue = dailyOrders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
      
      last7Days.push({
        date: dateStr,
        revenue: revenue,
        orders: dailyOrders.length
      });
    }
    return last7Days;
  }, [ordersData]);

  // Filtered orders with safety check
  const filteredOrders = useMemo(() => {
    if (!Array.isArray(ordersData)) return [];
    
    return ordersData.filter(order => {
      const customerName = order.customerName || '';
      const shopName = order.shopName || '';
      const searchLower = searchTerm.toLowerCase();
      
      return customerName.toLowerCase().includes(searchLower) ||
             shopName.toLowerCase().includes(searchLower);
    });
  }, [ordersData, searchTerm]);

  const StatCard = ({ title, value, icon: Icon, trend, trendValue, color = "blue" }) => (
    <Card className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} hover:shadow-lg transition-all duration-300`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {title}
            </p>
            <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {value}
            </p>
            {trend && (
              <div className={`flex items-center mt-2 text-sm ${
                trend === 'up' ? 'text-green-500' : 'text-red-500'
              }`}>
                {trend === 'up' ? <ArrowUp className="w-4 h-4 mr-1" /> : <ArrowDown className="w-4 h-4 mr-1" />}
                {trendValue}
              </div>
            )}
          </div>
          <div className={`p-3 rounded-full bg-${color}-100 ${isDarkMode ? 'bg-opacity-10' : ''}`}>
            <Icon className={`w-6 h-6 text-${color}-600`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const OrderDetailsModal = ({ order, onClose }) => {
    if (!order) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className={`max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl ${
          isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
        }`}>
          <div className={`sticky top-0 p-6 border-b ${
            isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
          }`}>
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Order Details</h2>
              <Button onClick={onClose} variant="ghost" size="sm">
                ✕
              </Button>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            {/* Order Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className={isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Package className="w-5 h-5 mr-2" />
                    Order Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center">
                    <Hash className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="text-sm font-medium">ID: {(order.id || '').toString().slice(-8)}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="text-sm">{new Date(order.orderDate || Date.now()).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="text-lg font-bold">৳{(order.totalAmount || 0).toFixed(2)}</span>
                  </div>
                  <div className="flex items-center">
                    <ShoppingCart className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="text-sm">{(order.items || []).length} items</span>
                  </div>
                </CardContent>
              </Card>

              <Card className={isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <User className="w-5 h-5 mr-2" />
                    Customer Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="font-medium">{order.customerName || 'N/A'}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-2 text-gray-500" />
                    <span>{order.customerContactNumber || 'N/A'}</span>
                  </div>
                  <div className="flex items-center">
                    <Activity className="w-4 h-4 mr-2 text-gray-500" />
                    <span>Age: {order.customerAge || 'N/A'}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Shop Info */}
            <Card className={isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <MapPin className="w-5 h-5 mr-2" />
                  Shop Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Shop Name</p>
                    <p className="font-medium">{order.shopName || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">{order.shopLocation || 'N/A'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Items */}
            <Card className={isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Pill className="w-5 h-5 mr-2" />
                  Order Items
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className={`border-b ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                        <th className="text-left py-2">Medicine</th>
                        <th className="text-left py-2">Category</th>
                        <th className="text-right py-2">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(order.items || []).map((item, index) => (
                        <tr key={index} className={`border-b ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                          <td className="py-3">
                            <p className="font-medium">{item.medicineName || 'N/A'}</p>
                          </td>
                          <td className="py-3">
                            <Badge variant="outline">{item.category || 'Other'}</Badge>
                          </td>
                          <td className="py-3 text-right">{item.quantity || 0}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  };

  // Show loading screen initially and when fetching data
  if (isLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
      }`}>
        <div className="flex flex-col items-center space-y-4">
          <RefreshCw className="w-8 h-8 animate-spin text-blue-500" />
          <span className="text-lg font-medium">Loading orders...</span>
          <p className="text-sm text-gray-500">Please wait while we fetch your data</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      {/* Header */}
      <header className={`sticky top-0 z-40 border-b backdrop-blur-md ${
        isDarkMode ? 'bg-gray-800/95 border-gray-700' : 'bg-white/95 border-gray-200'
      }`}>
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Order Dashboard</h1>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    MediShop Analytics & Management
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                {['overview', 'orders', 'analytics'].map((view) => (
                  <button
                    key={view}
                    onClick={() => setCurrentView(view)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      currentView === view
                        ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                    }`}
                  >
                    {view.charAt(0).toUpperCase() + view.slice(1)}
                  </button>
                ))}
              </div>
              
              <Button
                onClick={() => setIsDarkMode(!isDarkMode)}
                variant="outline"
                size="sm"
                className={`${isDarkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-800' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="px-6 py-6">
        {/* Show message if no data */}
        {!isLoading && ordersData.length === 0 && (
          <Card className={isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}>
            <CardContent className="p-12 text-center">
              <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Orders Found</h3>
              <p className="text-gray-500">
                There are no orders available for this shop yet. Orders will appear here once they are placed.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Overview Section */}
        {currentView === 'overview' && ordersData.length > 0 && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Revenue"
                value={`৳${analytics.totalRevenue.toLocaleString()}`}
                icon={DollarSign}
                trend="up"
                trendValue="12.5%"
                color="green"
              />
              <StatCard
                title="Total Orders"
                value={analytics.totalOrders.toString()}
                icon={Package}
                trend="up"
                trendValue="8.2%"
                color="blue"
              />
              <StatCard
                title="Average Order"
                value={`৳${analytics.averageOrderValue.toFixed(0)}`}
                icon={TrendingUp}
                trend="up"
                trendValue="5.3%"
                color="purple"
              />
              <StatCard
                title="Total Items"
                value={analytics.totalItems.toString()}
                icon={ShoppingCart}
                trend="up"
                trendValue="15.2%"
                color="orange"
              />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue Trend */}
              <Card className={isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Revenue Trend (7 Days)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={dailyRevenueData}>
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#E5E7EB'} />
                      <XAxis dataKey="date" stroke={isDarkMode ? '#9CA3AF' : '#6B7280'} />
                      <YAxis stroke={isDarkMode ? '#9CA3AF' : '#6B7280'} />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
                          border: `1px solid ${isDarkMode ? '#374151' : '#E5E7EB'}`,
                          borderRadius: '8px',
                          color: isDarkMode ? '#FFFFFF' : '#000000'
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="#3B82F6"
                        fillOpacity={1}
                        fill="url(#colorRevenue)"
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Medicine Categories Distribution */}
              <Card className={isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PieChartIcon className="w-5 h-5 mr-2" />
                    Medicine Categories
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={analytics.categoryRevenue}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {analytics.categoryRevenue.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={[
                            '#3B82F6', '#10B981', '#F59E0B', '#EF4444', 
                            '#8B5CF6', '#06B6D4', '#84CC16', '#F97316'
                          ][index % 8]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
                          border: `1px solid ${isDarkMode ? '#374151' : '#E5E7EB'}`,
                          borderRadius: '8px',
                          color: isDarkMode ? '#FFFFFF' : '#000000'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Shop Performance */}
            <Card className={isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Shop Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analytics.shopPerformance}>
                    <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#E5E7EB'} />
                    <XAxis dataKey="name" stroke={isDarkMode ? '#9CA3AF' : '#6B7280'} />
                    <YAxis stroke={isDarkMode ? '#9CA3AF' : '#6B7280'} />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
                        border: `1px solid ${isDarkMode ? '#374151' : '#E5E7EB'}`,
                        borderRadius: '8px',
                        color: isDarkMode ? '#FFFFFF' : '#000000'
                      }}
                    />
                    <Bar dataKey="revenue" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="orders" fill="#06B6D4" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Orders Section */}
        {currentView === 'orders' && ordersData.length > 0 && (
          <div className="space-y-6">
            {/* Filters */}
            <Card className={isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}>
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        placeholder="Search orders, customers, or shops..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Orders List */}
            <Card className={isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Package className="w-5 h-5 mr-2" />
                    Orders ({filteredOrders.length})
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                        <th className="text-left py-3 px-2">Order ID</th>
                        <th className="text-left py-3 px-2">Customer</th>
                        <th className="text-left py-3 px-2">Shop</th>
                        <th className="text-left py-3 px-2">Date</th>
                        <th className="text-right py-3 px-2">Amount</th>
                        <th className="text-center py-3 px-2">Items</th>
                        <th className="text-center py-3 px-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOrders.map((order) => (
                        <tr key={order.id} className={`border-b hover:bg-opacity-50 transition-colors ${
                          isDarkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'
                        }`}>
                          <td className="py-3 px-2">
                            <span className="font-mono text-sm">#{(order.id || '').toString().slice(-8)}</span>
                          </td>
                          <td className="py-3 px-2">
                            <div>
                              <p className="font-medium">{order.customerName || 'N/A'}</p>
                              <p className="text-sm text-gray-500">{order.customerContactNumber || 'N/A'}</p>
                            </div>
                          </td>
                          <td className="py-3 px-2">
                            <div>
                              <p className="font-medium">{order.shopName || 'N/A'}</p>
                              <p className="text-sm text-gray-500">{order.shopLocation || 'N/A'}</p>
                            </div>
                          </td>
                          <td className="py-3 px-2">
                            <span className="text-sm">
                              {new Date(order.orderDate || Date.now()).toLocaleDateString()}
                            </span>
                          </td>
                          <td className="py-3 px-2 text-right">
                            <span className="font-bold">৳{(order.totalAmount || 0).toFixed(2)}</span>
                          </td>
                          <td className="py-3 px-2 text-center">
                            <Badge variant="secondary">{(order.items || []).length}</Badge>
                          </td>
                          <td className="py-3 px-2 text-center">
                            <Button
                              onClick={() => setSelectedOrder(order)}
                              variant="ghost"
                              size="sm"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {filteredOrders.length === 0 && (
                  <div className="text-center py-12">
                    <Package className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-500">No orders found</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Analytics Section */}
        {currentView === 'analytics' && ordersData.length > 0 && (
          <div className="space-y-6">
            {/* Age Demographics */}
            <Card className={isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Customer Age Demographics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analytics.ageDemographics}>
                    <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#E5E7EB'} />
                    <XAxis dataKey="range" stroke={isDarkMode ? '#9CA3AF' : '#6B7280'} />
                    <YAxis stroke={isDarkMode ? '#9CA3AF' : '#6B7280'} />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
                        border: `1px solid ${isDarkMode ? '#374151' : '#E5E7EB'}`,
                        borderRadius: '8px',
                        color: isDarkMode ? '#FFFFFF' : '#000000'
                      }}
                    />
                    <Bar dataKey="count" fill="#10B981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Medicine Category Quantities */}
            <Card className={isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Pill className="w-5 h-5 mr-2" />
                  Medicine Category Distribution by Quantity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analytics.categoryQuantity}>
                    <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#E5E7EB'} />
                    <XAxis dataKey="name" stroke={isDarkMode ? '#9CA3AF' : '#6B7280'} />
                    <YAxis stroke={isDarkMode ? '#9CA3AF' : '#6B7280'} />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
                        border: `1px solid ${isDarkMode ? '#374151' : '#E5E7EB'}`,
                        borderRadius: '8px',
                        color: isDarkMode ? '#FFFFFF' : '#000000'
                      }}
                    />
                    <Bar dataKey="value" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Detailed Analytics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className={isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}>
                <CardHeader>
                  <CardTitle className="text-lg">Top Performing Shop</CardTitle>
                </CardHeader>
                <CardContent>
                  {analytics.shopPerformance.length > 0 && (
                    <div>
                      <p className="text-2xl font-bold text-green-500">
                        {analytics.shopPerformance.reduce((prev, current) => 
                          (prev.revenue > current.revenue) ? prev : current
                        ).name}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        ৳{analytics.shopPerformance.reduce((prev, current) => 
                          (prev.revenue > current.revenue) ? prev : current
                        ).revenue.toFixed(2)} revenue
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className={isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}>
                <CardHeader>
                  <CardTitle className="text-lg">Most Popular Category</CardTitle>
                </CardHeader>
                <CardContent>
                  {analytics.categoryQuantity.length > 0 && (
                    <div>
                      <p className="text-2xl font-bold text-blue-500">
                        {analytics.categoryQuantity.reduce((prev, current) => 
                          (prev.value > current.value) ? prev : current
                        ).name}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {analytics.categoryQuantity.reduce((prev, current) => 
                          (prev.value > current.value) ? prev : current
                        ).value} units sold
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className={isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}>
                <CardHeader>
                  <CardTitle className="text-lg">Primary Age Group</CardTitle>
                </CardHeader>
                <CardContent>
                  {analytics.ageDemographics.length > 0 && (
                    <div>
                      <p className="text-2xl font-bold text-purple-500">
                        {analytics.ageDemographics.reduce((prev, current) => 
                          (prev.count > current.count) ? prev : current
                        ).range}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {analytics.ageDemographics.reduce((prev, current) => 
                          (prev.count > current.count) ? prev : current
                        ).count} customers
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <OrderDetailsModal 
          order={selectedOrder} 
          onClose={() => setSelectedOrder(null)} 
        />
      )}
    </div>
  );
};

export default OrderDashboard;