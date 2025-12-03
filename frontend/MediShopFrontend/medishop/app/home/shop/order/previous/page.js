"use client"
import React, { useState, useEffect, useMemo } from 'react';
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
  Search, Filter, Download, Eye, Calendar, TrendingUp, TrendingDown,
  Package, Users, DollarSign, Clock, ShoppingCart, Pill, Activity,
  BarChart3, PieChart as PieChartIcon, FileText, RefreshCw, ArrowUp,
  ArrowDown, MapPin, Phone, User, Hash, CheckCircle, XCircle, AlertCircle
} from 'lucide-react';

const OrderDashboard = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [currentView, setCurrentView] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);

  // Dummy order data
  const ordersData = [
    {
      id: "550e8400-e29b-41d4-a716-446655440001",
      shop: { id: "shop1", name: "City Pharmacy", location: "Downtown", contact: "+880-1234-567890" },
      customerName: "Ahmed Rahman",
      customerContactNumber: "+880-1987-654321",
      customerAge: "35",
      orderDate: "2025-07-19T10:30:00Z",
      totalAmount: 2850.50,
      status: "completed",
      items: [
        { medicineId: "med1", medicineName: "Paracetamol 500mg", quantity: 30, unitPrice: 12.50, category: "Painkiller" },
        { medicineId: "med2", medicineName: "Omeprazole 20mg", quantity: 20, unitPrice: 85.75, category: "Antacid" },
        { medicineId: "med3", medicineName: "Vitamin D3", quantity: 15, unitPrice: 120.00, category: "Vitamin" }
      ]
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440002",
      shop: { id: "shop2", name: "Health Plus Pharmacy", location: "Gulshan", contact: "+880-1234-567891" },
      customerName: "Fatima Begum",
      customerContactNumber: "+880-1876-543210",
      customerAge: "28",
      orderDate: "2025-07-19T14:15:00Z",
      totalAmount: 1650.75,
      status: "pending",
      items: [
        { medicineId: "med4", medicineName: "Insulin Glargine", quantity: 5, unitPrice: 280.00, category: "Diabetes" },
        { medicineId: "med5", medicineName: "Metformin 500mg", quantity: 30, unitPrice: 8.25, category: "Diabetes" }
      ]
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440003",
      shop: { id: "shop3", name: "MediCare Center", location: "Dhanmondi", contact: "+880-1234-567892" },
      customerName: "Mohammad Hasan",
      customerContactNumber: "+880-1765-432109",
      customerAge: "42",
      orderDate: "2025-07-18T16:45:00Z",
      totalAmount: 3250.00,
      status: "processing",
      items: [
        { medicineId: "med6", medicineName: "Atorvastatin 20mg", quantity: 30, unitPrice: 45.50, category: "Cholesterol" },
        { medicineId: "med7", medicineName: "Amlodipine 5mg", quantity: 30, unitPrice: 18.75, category: "Blood Pressure" },
        { medicineId: "med8", medicineName: "Aspirin 75mg", quantity: 60, unitPrice: 15.25, category: "Blood Thinner" }
      ]
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440004",
      shop: { id: "shop1", name: "City Pharmacy", location: "Downtown", contact: "+880-1234-567890" },
      customerName: "Rashida Khatun",
      customerContactNumber: "+880-1654-321098",
      customerAge: "55",
      orderDate: "2025-07-18T09:20:00Z",
      totalAmount: 4200.25,
      status: "completed",
      items: [
        { medicineId: "med9", medicineName: "Levothyroxine 100mcg", quantity: 30, unitPrice: 65.00, category: "Thyroid" },
        { medicineId: "med10", medicineName: "Calcium Carbonate", quantity: 60, unitPrice: 25.50, category: "Supplement" },
        { medicineId: "med11", medicineName: "Iron Tablets", quantity: 30, unitPrice: 35.75, category: "Supplement" }
      ]
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440005",
      shop: { id: "shop4", name: "Green Life Pharmacy", location: "Uttara", contact: "+880-1234-567893" },
      customerName: "Karim Abdullah",
      customerContactNumber: "+880-1543-210987",
      customerAge: "31",
      orderDate: "2025-07-17T11:10:00Z",
      totalAmount: 1890.00,
      status: "cancelled",
      items: [
        { medicineId: "med12", medicineName: "Cetirizine 10mg", quantity: 20, unitPrice: 22.50, category: "Antihistamine" },
        { medicineId: "med13", medicineName: "Pantoprazole 40mg", quantity: 15, unitPrice: 95.00, category: "Antacid" }
      ]
    }
  ];

  // Analytics calculations
  const analytics = useMemo(() => {
    const totalRevenue = ordersData.reduce((sum, order) => sum + order.totalAmount, 0);
    const totalOrders = ordersData.length;
    const completedOrders = ordersData.filter(o => o.status === 'completed').length;
    const pendingOrders = ordersData.filter(o => o.status === 'pending').length;
    const processingOrders = ordersData.filter(o => o.status === 'processing').length;
    const cancelledOrders = ordersData.filter(o => o.status === 'cancelled').length;
    
    const averageOrderValue = totalRevenue / totalOrders;
    const completionRate = (completedOrders / totalOrders) * 100;
    
    // Shop performance
    const shopPerformance = {};
    ordersData.forEach(order => {
      const shopName = order.shop.name;
      if (!shopPerformance[shopName]) {
        shopPerformance[shopName] = { revenue: 0, orders: 0 };
      }
      shopPerformance[shopName].revenue += order.totalAmount;
      shopPerformance[shopName].orders += 1;
    });
    
    // Medicine category analysis
    const categoryRevenue = {};
    ordersData.forEach(order => {
      order.items.forEach(item => {
        const category = item.category;
        if (!categoryRevenue[category]) {
          categoryRevenue[category] = 0;
        }
        categoryRevenue[category] += item.quantity * item.unitPrice;
      });
    });
    
    return {
      totalRevenue,
      totalOrders,
      completedOrders,
      pendingOrders,
      processingOrders,
      cancelledOrders,
      averageOrderValue,
      completionRate,
      shopPerformance: Object.entries(shopPerformance).map(([name, data]) => ({ name, ...data })),
      categoryRevenue: Object.entries(categoryRevenue).map(([name, value]) => ({ name, value }))
    };
  }, [ordersData]);

  // Chart data
  const dailyRevenueData = [
    { date: '07-13', revenue: 12500, orders: 25 },
    { date: '07-14', revenue: 15600, orders: 32 },
    { date: '07-15', revenue: 11800, orders: 28 },
    { date: '07-16', revenue: 18200, orders: 38 },
    { date: '07-17', revenue: 14300, orders: 30 },
    { date: '07-18', revenue: 16900, orders: 35 },
    { date: '07-19', revenue: 19200, orders: 42 }
  ];

  const statusColors = {
    completed: '#10B981',
    pending: '#F59E0B',
    processing: '#3B82F6',
    cancelled: '#EF4444'
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'processing': return <RefreshCw className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const filteredOrders = ordersData.filter(order => {
    const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.shop.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

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
                <XCircle className="w-5 h-5" />
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
                    <span className="text-sm font-medium">ID: {order.id.slice(-8)}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="text-sm">{new Date(order.orderDate).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="text-lg font-bold">৳{order.totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center">
                    {getStatusIcon(order.status)}
                    <Badge 
                      className={`ml-2 text-white`}
                      style={{ backgroundColor: statusColors[order.status] }}
                    >
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
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
                    <span className="font-medium">{order.customerName}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-2 text-gray-500" />
                    <span>{order.customerContactNumber}</span>
                  </div>
                  <div className="flex items-center">
                    <Activity className="w-4 h-4 mr-2 text-gray-500" />
                    <span>Age: {order.customerAge}</span>
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Shop Name</p>
                    <p className="font-medium">{order.shop.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">{order.shop.location}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Contact</p>
                    <p className="font-medium">{order.shop.contact}</p>
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
                        <th className="text-right py-2">Qty</th>
                        <th className="text-right py-2">Unit Price</th>
                        <th className="text-right py-2">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map((item, index) => (
                        <tr key={index} className={`border-b ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                          <td className="py-3">
                            <div>
                              <p className="font-medium">{item.medicineName}</p>
                              <p className="text-sm text-gray-500">ID: {item.medicineId}</p>
                            </div>
                          </td>
                          <td className="py-3">
                            <Badge variant="outline">{item.category}</Badge>
                          </td>
                          <td className="py-3 text-right">{item.quantity}</td>
                          <td className="py-3 text-right">৳{item.unitPrice.toFixed(2)}</td>
                          <td className="py-3 text-right font-medium">
                            ৳{(item.quantity * item.unitPrice).toFixed(2)}
                          </td>
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
                variant="ghost"
                size="sm"
                className="w-10 h-10 rounded-full"
              >
                {isDarkMode ? '🌞' : '🌙'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="px-6 py-6">
        {/* Overview Section */}
        {currentView === 'overview' && (
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
                title="Completion Rate"
                value={`${analytics.completionRate.toFixed(1)}%`}
                icon={CheckCircle}
                trend="up"
                trendValue="2.1%"
                color="green"
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

              {/* Order Status Distribution */}
              <Card className={isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PieChartIcon className="w-5 h-5 mr-2" />
                    Order Status Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Completed', value: analytics.completedOrders, color: statusColors.completed },
                          { name: 'Processing', value: analytics.processingOrders, color: statusColors.processing },
                          { name: 'Pending', value: analytics.pendingOrders, color: statusColors.pending },
                          { name: 'Cancelled', value: analytics.cancelledOrders, color: statusColors.cancelled }
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {[
                          { name: 'Completed', value: analytics.completedOrders, color: statusColors.completed },
                          { name: 'Processing', value: analytics.processingOrders, color: statusColors.processing },
                          { name: 'Pending', value: analytics.pendingOrders, color: statusColors.pending },
                          { name: 'Cancelled', value: analytics.cancelledOrders, color: statusColors.cancelled }
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
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
        {currentView === 'orders' && (
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
                  
                  <div className="flex gap-2">
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className={`px-3 py-2 rounded-md border ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    >
                      <option value="all">All Status</option>
                      <option value="completed">Completed</option>
                      <option value="processing">Processing</option>
                      <option value="pending">Pending</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                    
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
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
                        <th className="text-left py-3 px-2">Status</th>
                        <th className="text-right py-3 px-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOrders.map((order) => (
                        <tr 
                          key={order.id} 
                          className={`border-b hover:bg-opacity-50 cursor-pointer transition-colors ${
                            isDarkMode 
                              ? 'border-gray-700 hover:bg-gray-700' 
                              : 'border-gray-100 hover:bg-gray-50'
                          }`}
                          onClick={() => setSelectedOrder(order)}
                        >
                          <td className="py-4 px-2">
                            <div className="flex items-center">
                              <Hash className="w-4 h-4 mr-1 text-gray-500" />
                              <span className="font-mono text-sm">
                                {order.id.slice(-8)}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-2">
                            <div>
                              <p className="font-medium">{order.customerName}</p>
                              <p className="text-sm text-gray-500">{order.customerContactNumber}</p>
                            </div>
                          </td>
                          <td className="py-4 px-2">
                            <div>
                              <p className="font-medium">{order.shop.name}</p>
                              <p className="text-sm text-gray-500">{order.shop.location}</p>
                            </div>
                          </td>
                          <td className="py-4 px-2">
                            <div>
                              <p className="text-sm">
                                {new Date(order.orderDate).toLocaleDateString()}
                              </p>
                              <p className="text-xs text-gray-500">
                                {new Date(order.orderDate).toLocaleTimeString()}
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-2 text-right">
                            <p className="font-bold text-lg">৳{order.totalAmount.toFixed(2)}</p>
                            <p className="text-xs text-gray-500">{order.items.length} items</p>
                          </td>
                          <td className="py-4 px-2">
                            <div className="flex items-center">
                              {getStatusIcon(order.status)}
                              <Badge 
                                className="ml-2 text-white"
                                style={{ backgroundColor: statusColors[order.status] }}
                              >
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </Badge>
                            </div>
                          </td>
                          <td className="py-4 px-2 text-right">
                            <Button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedOrder(order);
                              }}
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
              </CardContent>
            </Card>
          </div>
        )}

        {/* Analytics Section */}
        {currentView === 'analytics' && (
          <div className="space-y-6">
            {/* Advanced Analytics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className={`${isDarkMode ? 'bg-gradient-to-br from-purple-900 to-purple-800 border-purple-700' : 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200'} hover:shadow-xl transition-all duration-300`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-sm font-medium ${isDarkMode ? 'text-purple-200' : 'text-purple-700'}`}>
                        Peak Hour Revenue
                      </p>
                      <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-purple-900'}`}>
                        ৳4,850
                      </p>
                      <p className={`text-sm ${isDarkMode ? 'text-purple-300' : 'text-purple-600'}`}>
                        2:00 PM - 3:00 PM
                      </p>
                    </div>
                    <div className="p-3 bg-purple-600 rounded-full">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className={`${isDarkMode ? 'bg-gradient-to-br from-green-900 to-green-800 border-green-700' : 'bg-gradient-to-br from-green-50 to-green-100 border-green-200'} hover:shadow-xl transition-all duration-300`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-sm font-medium ${isDarkMode ? 'text-green-200' : 'text-green-700'}`}>
                        Top Medicine Category
                      </p>
                      <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-green-900'}`}>
                        Diabetes
                      </p>
                      <p className={`text-sm ${isDarkMode ? 'text-green-300' : 'text-green-600'}`}>
                        32% of total sales
                      </p>
                    </div>
                    <div className="p-3 bg-green-600 rounded-full">
                      <Pill className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className={`${isDarkMode ? 'bg-gradient-to-br from-blue-900 to-blue-800 border-blue-700' : 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200'} hover:shadow-xl transition-all duration-300`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-sm font-medium ${isDarkMode ? 'text-blue-200' : 'text-blue-700'}`}>
                        Repeat Customers
                      </p>
                      <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-blue-900'}`}>
                        68%
                      </p>
                      <p className={`text-sm ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                        +15% from last month
                      </p>
                    </div>
                    <div className="p-3 bg-blue-600 rounded-full">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className={`${isDarkMode ? 'bg-gradient-to-br from-orange-900 to-orange-800 border-orange-700' : 'bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200'} hover:shadow-xl transition-all duration-300`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-sm font-medium ${isDarkMode ? 'text-orange-200' : 'text-orange-700'}`}>
                        Avg. Processing Time
                      </p>
                      <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-orange-900'}`}>
                        2.4h
                      </p>
                      <p className={`text-sm ${isDarkMode ? 'text-orange-300' : 'text-orange-600'}`}>
                        -20 min improvement
                      </p>
                    </div>
                    <div className="p-3 bg-orange-600 rounded-full">
                      <Activity className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Advanced Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Medicine Category Revenue */}
              <Card className={isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PieChartIcon className="w-5 h-5 mr-2" />
                    Medicine Category Revenue
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <PieChart>
                      <Pie
                        data={analytics.categoryRevenue}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ৳${value.toFixed(0)}`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {analytics.categoryRevenue.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={[
                              '#3B82F6', '#10B981', '#F59E0B', '#EF4444', 
                              '#8B5CF6', '#06B6D4', '#84CC16', '#F97316'
                            ][index % 8]} 
                          />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
                          border: `1px solid ${isDarkMode ? '#374151' : '#E5E7EB'}`,
                          borderRadius: '8px',
                          color: isDarkMode ? '#FFFFFF' : '#000000'
                        }}
                        formatter={(value) => [`৳${value.toFixed(2)}`, 'Revenue']}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Hourly Orders Distribution */}
              <Card className={isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    Hourly Orders Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={[
                      { hour: '9AM', orders: 12 },
                      { hour: '10AM', orders: 18 },
                      { hour: '11AM', orders: 24 },
                      { hour: '12PM', orders: 32 },
                      { hour: '1PM', orders: 28 },
                      { hour: '2PM', orders: 35 },
                      { hour: '3PM', orders: 30 },
                      { hour: '4PM', orders: 22 },
                      { hour: '5PM', orders: 15 },
                      { hour: '6PM', orders: 8 }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#E5E7EB'} />
                      <XAxis dataKey="hour" stroke={isDarkMode ? '#9CA3AF' : '#6B7280'} />
                      <YAxis stroke={isDarkMode ? '#9CA3AF' : '#6B7280'} />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
                          border: `1px solid ${isDarkMode ? '#374151' : '#E5E7EB'}`,
                          borderRadius: '8px',
                          color: isDarkMode ? '#FFFFFF' : '#000000'
                        }}
                      />
                      <Bar dataKey="orders" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Customer Demographics */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className={isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Users className="w-5 h-5 mr-2" />
                    Age Demographics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { range: '18-25', percentage: 15, count: 32 },
                      { range: '26-35', percentage: 35, count: 76 },
                      { range: '36-45', percentage: 28, count: 61 },
                      { range: '46-60', percentage: 18, count: 39 },
                      { range: '60+', percentage: 4, count: 9 }
                    ].map((demo) => (
                      <div key={demo.range} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{demo.range} years</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${demo.percentage}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-500 w-12 text-right">
                            {demo.count}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className={isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <MapPin className="w-5 h-5 mr-2" />
                    Top Locations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { location: 'Downtown', orders: 45, revenue: 12500 },
                      { location: 'Gulshan', orders: 38, revenue: 10200 },
                      { location: 'Dhanmondi', orders: 32, revenue: 8900 },
                      { location: 'Uttara', orders: 28, revenue: 7800 },
                      { location: 'Mirpur', orders: 22, revenue: 6200 }
                    ].map((loc, index) => (
                      <div key={loc.location} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3 ${
                            ['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-red-500', 'bg-purple-500'][index]
                          }`}>
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium">{loc.location}</p>
                            <p className="text-sm text-gray-500">{loc.orders} orders</p>
                          </div>
                        </div>
                        <p className="font-bold">৳{loc.revenue.toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className={isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Key Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { metric: 'Customer Satisfaction', value: '4.8/5', trend: 'up', color: 'green' },
                      { metric: 'Order Fulfillment Rate', value: '96.5%', trend: 'up', color: 'green' },
                      { metric: 'Average Delivery Time', value: '45 min', trend: 'down', color: 'green' },
                      { metric: 'Return Rate', value: '2.1%', trend: 'down', color: 'green' },
                      { metric: 'Revenue Growth', value: '+12.5%', trend: 'up', color: 'blue' }
                    ].map((metric) => (
                      <div key={metric.metric} className="flex items-center justify-between">
                        <p className="text-sm font-medium">{metric.metric}</p>
                        <div className="flex items-center">
                          <span className="font-bold mr-2">{metric.value}</span>
                          {metric.trend === 'up' ? (
                            <ArrowUp className={`w-4 h-4 text-${metric.color}-500`} />
                          ) : (
                            <ArrowDown className={`w-4 h-4 text-${metric.color}-500`} />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Insights */}
            <Card className={isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="w-5 h-5 mr-2" />
                  Performance Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    {
                      title: 'Best Performing Shop',
                      value: 'City Pharmacy',
                      detail: '৳15,250 revenue',
                      icon: '🏆',
                      color: 'yellow'
                    },
                    {
                      title: 'Most Ordered Medicine',
                      value: 'Paracetamol 500mg',
                      detail: '245 units sold',
                      icon: '💊',
                      color: 'blue'
                    },
                    {
                      title: 'Peak Order Day',
                      value: 'Saturday',
                      detail: '68 orders average',
                      icon: '📅',
                      color: 'green'
                    },
                    {
                      title: 'Customer Retention',
                      value: '78%',
                      detail: '+5% this month',
                      icon: '❤️',
                      color: 'red'
                    }
                  ].map((insight) => (
                    <div key={insight.title} className={`p-4 rounded-lg border ${
                      isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">{insight.icon}</span>
                        <div className={`px-2 py-1 rounded text-xs bg-${insight.color}-100 text-${insight.color}-800 dark:bg-${insight.color}-900 dark:text-${insight.color}-200`}>
                          TOP
                        </div>
                      </div>
                      <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {insight.title}
                      </h4>
                      <p className="text-lg font-bold">{insight.value}</p>
                      <p className="text-sm text-gray-500">{insight.detail}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
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