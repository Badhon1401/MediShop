"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Lock, User, Moon, Sun, Activity, Pill, Heart, Shield } from 'lucide-react';

const MediShopLogin = () => {
  const router = useRouter();
  
  // Theme state (dark by default)
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  // Form states
  const [formData, setFormData] = useState({
    userName: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Floating animation state
  const [floatingElements, setFloatingElements] = useState([]);
  
  // Initialize floating elements and theme
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    
    // Create floating medical icons
    const elements = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      icon: [Pill, Heart, Activity, Shield][i % 4],
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
  
  const validateForm = () => {
    if (!formData.userName.trim()) return 'Username is required.';
    if (!formData.password.trim()) return 'Password is required.';
    return '';
  };
  
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError('');
  };
  
  const handleSubmit = async () => {
    const errorMsg = validateForm();
    if (errorMsg) {
      setError(errorMsg);
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/no-auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName: formData.userName, password: formData.password }),
      });

      if (!response.ok) {
        const result = await response.text();
        throw new Error(result || 'Failed to login');
      }

      setSuccess('Welcome back! Redirecting to your dashboard...');
      setTimeout(() => {
        router.push('/home');
      }, 1500);
    } catch (error) {
      setError(error.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const navigateToForgotPassword = () => {
    router.push('/login/forgot');
  };
  const navigateToRegister = () => {
    router.push('/register');
  };

  return (
    <div className={`min-h-screen relative overflow-hidden flex items-center justify-center p-4 transition-all duration-700 ${
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
      
      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className={`fixed top-6 right-6 p-4 rounded-full shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-110 z-10 ${
          isDarkMode 
            ? 'bg-gray-800/80 text-yellow-400 hover:bg-gray-700/80 border border-gray-700' 
            : 'bg-white/80 text-gray-800 hover:bg-gray-50/80 border border-gray-200'
        }`}
      >
        {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
      </button>
      
      {/* Main Card */}
      <div className="w-full max-w-md relative z-10">
        <Card className={`w-full border-0 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:shadow-3xl ${
          isDarkMode 
            ? 'bg-gray-900/90 text-white' 
            : 'bg-white/95 text-gray-900'
        }`}>
          
          {/* Header with Logo */}
          <CardHeader className="space-y-4 pb-6 text-center">
            <div className="mx-auto">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-purple-600 to-pink-600' 
                  : 'bg-gradient-to-br from-blue-600 to-purple-600'
              } shadow-lg`}>
                <Activity className="w-10 h-10 text-white" />
              </div>
            </div>
            
            <CardTitle className="text-3xl font-bold">
              <span className={`bg-clip-text text-transparent ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-purple-400 via-pink-400 to-red-400' 
                  : 'bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600'
              }`}>
                MediShop
              </span>
            </CardTitle>
            
           
            
            <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Welcome back! Please login to continue
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Error Alert */}
            {error && (
              <Alert variant="destructive" className={`border-red-500/50 ${
                isDarkMode ? 'bg-red-900/50 text-red-300' : 'bg-red-50 text-red-800'
              }`}>
                <AlertDescription className="flex items-center">
                  <Shield className="w-4 h-4 mr-2" />
                  {error}
                </AlertDescription>
              </Alert>
            )}
            
            {/* Success Alert */}
            {success && (
              <Alert className={`border-green-500/50 ${
                isDarkMode 
                  ? 'bg-green-900/50 text-green-300' 
                  : 'bg-green-50 text-green-800'
              }`}>
                <AlertDescription className="flex items-center">
                  <Heart className="w-4 h-4 mr-2" />
                  {success}
                </AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-6">
              {/* Username Field */}
              <div className="space-y-2">
                <Label htmlFor="username" className={`text-sm font-medium ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  Username
                </Label>
                <div className="relative group">
                  <User className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${
                    isDarkMode ? 'text-gray-400 group-focus-within:text-purple-400' : 'text-gray-500 group-focus-within:text-blue-500'
                  }`} />
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    value={formData.name}
                    onChange={(e) => handleInputChange('userName', e.target.value)}
                    onKeyPress={handleKeyPress}
                    className={`w-full pl-12 pr-4 py-3 text-lg border-2 rounded-xl transition-all duration-300 ${
                      isDarkMode 
                        ? 'bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-purple-500 focus:bg-gray-800/80' 
                        : 'bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:bg-white/80'
                    } focus:ring-4 focus:ring-opacity-20 ${
                      isDarkMode ? 'focus:ring-purple-500' : 'focus:ring-blue-500'
                    }`}
                  />
                </div>
              </div>
              
              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className={`text-sm font-medium ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  Password
                </Label>
                <div className="relative group">
                  <Lock className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${
                    isDarkMode ? 'text-gray-400 group-focus-within:text-purple-400' : 'text-gray-500 group-focus-within:text-blue-500'
                  }`} />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    onKeyPress={handleKeyPress}
                    className={`w-full pl-12 pr-12 py-3 text-lg border-2 rounded-xl transition-all duration-300 ${
                      isDarkMode 
                        ? 'bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-purple-500 focus:bg-gray-800/80' 
                        : 'bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:bg-white/80'
                    } focus:ring-4 focus:ring-opacity-20 ${
                      isDarkMode ? 'focus:ring-purple-500' : 'focus:ring-blue-500'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute right-4 top-1/2 transform -translate-y-1/2 transition-colors ${
                      isDarkMode ? 'text-gray-400 hover:text-purple-400' : 'text-gray-500 hover:text-blue-500'
                    }`}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              
              {/* Submit Button */}
              <Button 
                onClick={handleSubmit}
                disabled={isLoading}
                className={`w-full py-4 text-lg font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white' 
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                } disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Logging In...
                  </div>
                ) : (
                  'Log In to MediShop'
                )}
              </Button>
              
              {/* Forgot Password Link */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={navigateToForgotPassword}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    isDarkMode 
                      ? 'text-purple-400 hover:text-purple-300' 
                      : 'text-blue-600 hover:text-blue-500'
                  }`}
                >
                  Forgot your password?
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Footer */}
        <div className="mt-6 text-center">
        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Dont have an account?{" "}
            <button
              onClick={navigateToRegister}
              className={`font-medium transition-colors duration-200 ${
                isDarkMode 
                  ? 'text-purple-400 hover:text-purple-300' 
                  : 'text-blue-600 hover:text-blue-500'
              }`}
            >
              Register
            </button>
          </p>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            © 2025 MediShop. Secure healthcare marketplace.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MediShopLogin;