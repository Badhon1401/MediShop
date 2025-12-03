"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Moon, Sun, Activity, Pill, Users, BarChart3, Package, 
  ShoppingCart, Database, Globe, Building2, UserCheck, 
  Stethoscope, Shield, CheckCircle, Star, ArrowRight,
  Menu, X, Phone, Mail, MapPin, Clock
} from 'lucide-react';

const MediShopWelcome = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [floatingElements, setFloatingElements] = useState([]);
  const [currentFeature, setCurrentFeature] = useState(0);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    
    // Create floating medical icons
    const elements = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      icon: [Pill, Activity, Package, Database, ShoppingCart, Users, BarChart3, Shield][i],
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 4,
      duration: 8 + Math.random() * 4
    }));
    setFloatingElements(elements);

    // Auto-rotate features
    const interval = setInterval(() => {
      setCurrentFeature(prev => (prev + 1) % features.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const features = [
    {
      title: "Smart Inventory Management",
      description: "AI-powered inventory tracking with expiry alerts, stock forecasting, and automated reorder suggestions.",
      icon: Package,
      color: "from-emerald-400 to-teal-600",
      details: [
        "Real-time inventory tracking with low-stock alerts",
        "Expiry date monitoring and automated notifications",
        "Medicine location mapping for quick retrieval",
        "Automated reorder suggestions based on demand patterns"
      ]
    },
    {
      title: "Advanced Order Processing",
      description: "Streamlined order management with intelligent auto-fill, customer history, and inventory validation.",
      icon: ShoppingCart,
      color: "from-blue-400 to-indigo-600",
      details: [
        "Smart auto-fill for customer and medicine details",
        "Customer order history and preference tracking",
        "Real-time inventory validation during order creation",
        "Alternative medicine suggestions for out-of-stock items"
      ]
    },
    {
      title: "Role-Based Access Control",
      description: "Comprehensive role-based access control for owners, admins, and salespersons with secure permissions.",
      icon: Users,
      color: "from-purple-400 to-pink-600",
      details: [
        "Owner: Full system access and staff management",
        "Admin: Medicine management and inventory control",
        "Salesperson: Order processing and customer service",
        "Multi-shop management for expanding businesses"
      ]
    },
    {
      title: "Revenue Analytics & Insights",
      description: "Powerful analytics dashboard with sales forecasting, revenue tracking, and performance metrics.",
      icon: BarChart3,
      color: "from-orange-400 to-red-600",
      details: [
        "Real-time revenue tracking and profit analysis",
        "Medicine demand forecasting and trend analysis",
        "Sales performance reports with visual charts",
        "Custom reporting periods and data export"
      ]
    }
  ];

  const roles = [
    {
      role: "Shop Owner",
      description: "Complete control over pharmacy operations",
      icon: Building2,
      permissions: ["Full system access", "Staff management", "Revenue monitoring", "Shop configuration"],
      color: "bg-gradient-to-r from-amber-500 to-orange-600"
    },
    {
      role: "Shop Admin",
      description: "Inventory and medicine management specialist",
      icon: UserCheck,
      permissions: ["Inventory management", "Medicine updates", "Stock reports", "Supplier coordination"],
      color: "bg-gradient-to-r from-blue-500 to-indigo-600"
    },
    {
      role: "Salesperson",
      description: "Customer service and order processing",
      icon: Stethoscope,
      permissions: ["Order processing", "Customer service", "Inventory browsing", "Medicine location access"],
      color: "bg-gradient-to-r from-green-500 to-emerald-600"
    }
  ];

  const stats = [
    { label: "Active Pharmacies", value: "2,500+", icon: Building2 },
    { label: "Medicines Tracked", value: "50,000+", icon: Pill },
    { label: "Orders Processed", value: "1M+", icon: ShoppingCart },
    { label: "Staff Members", value: "10,000+", icon: Users }
  ];

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
        
        {/* Gradient Orbs */}
        <div className={`absolute top-20 left-20 w-72 h-72 rounded-full opacity-20 blur-3xl ${
          isDarkMode ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gradient-to-r from-blue-400 to-purple-400'
        } animate-pulse`} />
        <div className={`absolute bottom-20 right-20 w-96 h-96 rounded-full opacity-15 blur-3xl ${
          isDarkMode ? 'bg-gradient-to-r from-blue-500 to-cyan-500' : 'bg-gradient-to-r from-indigo-400 to-blue-400'
        } animate-pulse`} style={{ animationDelay: '2s' }} />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-gray-950/80 border-b border-gray-200/50 dark:border-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3 cursor-pointer hover:scale-105 transition-transform">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl flex items-center justify-center shadow-lg">
                <Pill className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-600">
                  MediShop
                </span>
                <div className="text-xs text-gray-500">Pharmacy Management</div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                Features
              </Button>
              <Button variant="ghost" size="sm">
                Roles
              </Button>
              <Button variant="ghost" size="sm">
                About
              </Button>
              <Button variant="ghost" size="sm">
                Contact
              </Button>
              <Link href="/register">
              <Button size="sm" className={`${
                isDarkMode 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700' 
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
              }`}>
                Login
              </Button>
              </Link>
              <Link href="/register">
              <Button variant="outline" size="sm" className={`border-2 ${
                isDarkMode 
                  ? 'border-purple-500 text-purple-400 hover:bg-purple-500/10' 
                  : 'border-blue-500 text-blue-600 hover:bg-blue-50'
              }`}>
                Register
              </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={toggleTheme} className="p-2">
                {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={toggleTheme} className="p-2">
                {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-16 left-0 right-0 bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 shadow-lg">
              <div className="p-4 space-y-2">
                <Button variant="ghost" className="w-full justify-start">Features</Button>
                <Button variant="ghost" className="w-full justify-start">Roles</Button>
                <Button variant="ghost" className="w-full justify-start">About</Button>
                <Button variant="ghost" className="w-full justify-start">Contact</Button>
                <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                <Button className={`w-full ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600' 
                    : 'bg-gradient-to-r from-blue-600 to-purple-600'
                }`}>
                  Login
                </Button>
                <Button variant="outline" className={`w-full border-2 ${
                  isDarkMode 
                    ? 'border-purple-500 text-purple-400' 
                    : 'border-blue-500 text-blue-600'
                }`}>
                  Register
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-16 pb-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            {/* Logo and Title */}
            <div className="mb-8">
              <div className="mx-auto mb-6">
                <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 mx-auto ${
                  isDarkMode 
                    ? 'bg-gradient-to-br from-purple-600 to-pink-600' 
                    : 'bg-gradient-to-br from-blue-600 to-purple-600'
                } shadow-2xl`}>
                  <Activity className="w-12 h-12 text-white" />
                </div>
              </div>
              
              <h1 className={`text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-purple-400 via-pink-400 to-red-400' 
                  : 'bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600'
              }`}>
                MediShop
              </h1>
              
              <p className={`text-xl md:text-2xl mb-8 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Modern Pharmacy Inventory Management System
              </p>
              
              <p className={`text-lg md:text-xl mb-12 max-w-3xl mx-auto ${
                isDarkMode ? 'text-gray-400' : 'text-gray-700'
              }`}>
                Streamline your pharmacy operations with intelligent inventory management, 
                role-based access control, and comprehensive analytics. Built for modern pharmacies 
                that need efficiency, accuracy, and growth.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button size="lg" className={`transform hover:scale-105 transition-all duration-300 shadow-xl ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700' 
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
              }`}>
                Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className={`border-2 transform hover:scale-105 transition-all duration-300 ${
                isDarkMode 
                  ? 'border-purple-500 text-purple-400 hover:bg-purple-500/10' 
                  : 'border-blue-500 text-blue-600 hover:bg-blue-50'
              }`}>
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              {stats.map((stat, index) => (
                <Card key={index} className={`p-6 text-center border-0 shadow-xl backdrop-blur-xl ${
                  isDarkMode ? 'bg-gray-900/50' : 'bg-white/50'
                }`}>
                  <div className={`w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center ${
                    isDarkMode 
                      ? 'bg-gradient-to-br from-purple-600 to-pink-600' 
                      : 'bg-gradient-to-br from-blue-600 to-purple-600'
                  }`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className={`text-2xl font-bold mb-2 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {stat.value}
                  </div>
                  <div className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {stat.label}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Powerful Features
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Everything you need to manage your pharmacy efficiently and grow your business
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className={`p-8 border-0 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:scale-105 ${
                isDarkMode ? 'bg-gray-900/50' : 'bg-white/50'
              }`}>
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 bg-gradient-to-r ${feature.color}`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className={`text-2xl font-bold mb-4 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {feature.title}
                </h3>
                <p className={`text-lg mb-6 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {feature.description}
                </p>
                <ul className="space-y-2">
                  {feature.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className={`flex items-start space-x-3 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      <CheckCircle className={`w-5 h-5 mt-0.5 ${
                        isDarkMode ? 'text-green-400' : 'text-green-500'
                      }`} />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Roles Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Role-Based Access Control
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Secure and efficient workflow management for different user roles
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {roles.map((role, index) => (
              <Card key={index} className={`p-8 border-0 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:scale-105 ${
                isDarkMode ? 'bg-gray-900/50' : 'bg-white/50'
              }`}>
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 ${role.color}`}>
                  <role.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className={`text-2xl font-bold mb-4 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {role.role}
                </h3>
                <p className={`text-lg mb-6 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {role.description}
                </p>
                <div className="space-y-2">
                  {role.permissions.map((permission, permIndex) => (
                    <div key={permIndex} className={`flex items-center space-x-3 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      <CheckCircle className={`w-4 h-4 ${
                        isDarkMode ? 'text-green-400' : 'text-green-500'
                      }`} />
                      <span className="text-sm">{permission}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="container mx-auto text-center">
          <Card className={`p-12 border-0 shadow-2xl backdrop-blur-xl max-w-4xl mx-auto ${
            isDarkMode ? 'bg-gray-900/50' : 'bg-white/50'
          }`}>
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Ready to Transform Your Pharmacy?
            </h2>
            <p className={`text-xl mb-8 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Join thousands of pharmacies already using MediShop to streamline their operations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className={`transform hover:scale-105 transition-all duration-300 shadow-xl ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700' 
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
              }`}>
                Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className={`border-2 transform hover:scale-105 transition-all duration-300 ${
                isDarkMode 
                  ? 'border-purple-500 text-purple-400 hover:bg-purple-500/10' 
                  : 'border-blue-500 text-blue-600 hover:bg-blue-50'
              }`}>
                Contact Sales
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className={`relative z-10 py-12 px-4 border-t ${
        isDarkMode ? 'border-gray-800 bg-gray-900/50' : 'border-gray-200 bg-white/50'
      } backdrop-blur-xl`}>
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                  <Pill className="h-4 w-4 text-white" />
                </div>
                <span className={`text-xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  MediShop
                </span>
              </div>
              <p className={`${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Modern pharmacy management made simple and efficient.
              </p>
            </div>
            <div>
              <h4 className={`font-semibold mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Product
              </h4>
              <ul className={`space-y-2 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <li>Features</li>
                <li>Pricing</li>
                <li>Security</li>
                <li>Updates</li>
              </ul>
            </div>
            <div>
              <h4 className={`font-semibold mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Support
              </h4>
              <ul className={`space-y-2 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <li>Documentation</li>
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Status</li>
              </ul>
            </div>
            <div>
              <h4 className={`font-semibold mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Contact
              </h4>
              <div className={`space-y-2 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>support@medishop.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
              </div>
            </div>
          </div>
          <div className={`mt-8 pt-8 border-t text-center ${
            isDarkMode ? 'border-gray-800 text-gray-400' : 'border-gray-200 text-gray-600'
          }`}>
            <p>&copy; 2024 MediShop. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MediShopWelcome;