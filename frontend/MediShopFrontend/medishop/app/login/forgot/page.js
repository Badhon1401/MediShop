"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Eye, EyeOff, Lock, User, Mail, Moon, Sun, Activity, Pill, Heart, Shield, ArrowLeft } from 'lucide-react';

const MediShopForgotPassword = () => {
  const router = useRouter();
  
  // Theme state (dark by default)
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  // Form states
  const [userEmail, setUserEmail] = useState('');
  const [username, setUsername] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // UI states
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  
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
  
  // Password strength validation
  const validatePassword = (password) => {
    let score = 0;
    if (!password) return { score, message: "Password is required" };
    
    // Length check
    if (password.length >= 8) score += 20;
    
    // Character variety checks
    if (/[A-Z]/.test(password)) score += 20; // Has uppercase
    if (/[a-z]/.test(password)) score += 20; // Has lowercase
    if (/[0-9]/.test(password)) score += 20; // Has number
    if (/[^A-Za-z0-9]/.test(password)) score += 20; // Has special char
    
    let message = "";
    if (score < 40) message = "Weak password";
    else if (score < 80) message = "Moderate password";
    else message = "Strong password";
    
    return { score, message };
  };
  
  const getPasswordStrengthColor = (score) => {
    if (score < 40) return "bg-red-500";
    if (score < 80) return "bg-yellow-500";
    return "bg-green-500";
  };
  
  const validateEmailForm = () => {
    if (!userEmail.trim()) return 'Email is required.';
    if (!/\S+@\S+\.\S+/.test(userEmail)) return 'Please enter a valid email address.';
    return '';
  };
  
  const validateVerificationForm = () => {
    if (!userEmail.trim()) return 'Email is required.';
    if (!username.trim()) return 'Username is required.';
    if (!verificationCode.trim()) return 'Verification code is required.';
    if (!newPassword.trim()) return 'New password is required.';
    if (validatePassword(newPassword).score < 40) return 'Please create a stronger password.';
    return '';
  };

  const handleRequestCode = async (e) => {
    e.preventDefault();
    const errorMsg = validateEmailForm();
    if (errorMsg) {
      setError(errorMsg);
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch(`/api/no-auth/login/forgot?userEmail=${encodeURIComponent(userEmail)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const result = await response.text();
        throw new Error(result || 'Failed to request verification code');
      }

      setSuccess('Verification code sent to your email! Please check your inbox and enter the code below.');
      setCodeSent(true);
    } catch (error) {
      setError(error.message || 'An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleResendCode = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch(`/api/no-auth/login/forgot?userEmail=${encodeURIComponent(userEmail)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const result = await response.text();
        throw new Error(result || 'Failed to request verification code');
      }

      setSuccess('Verification code resent! Please check your email.');
    } catch (error) {
      setError(error.message || 'An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyAndReset = async (e) => {
    e.preventDefault();
    const errorMsg = validateVerificationForm();
    if (errorMsg) {
      setError(errorMsg);
      return;
    }
    
    setIsLoading(true);
    setError('');

    try {
      const requestBody = {
        code: verificationCode,
        userEmail: userEmail,
        userName: username,
        updatedPassword: newPassword
      };
      
      const response = await fetch('/api/no-auth/login/forgot/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const result = await response.text();
        throw new Error(result || 'Failed to verify and reset password');
      }

      setSuccess('Password reset successfully! Redirecting to login...');
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (error) {
      setError(error.message || 'An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToLogin = () => {
    router.push('/login');
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
      
      {/* Back to Login Button */}
      <button
        onClick={navigateToLogin}
        className={`fixed top-6 left-6 p-4 rounded-full shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-110 z-10 ${
          isDarkMode 
            ? 'bg-gray-800/80 text-purple-400 hover:bg-gray-700/80 border border-gray-700' 
            : 'bg-white/80 text-blue-600 hover:bg-gray-50/80 border border-gray-200'
        }`}
      >
        <ArrowLeft className="w-6 h-6" />
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
            
            <CardDescription className={`text-lg ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Account Recovery
            </CardDescription>
            
            <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {!codeSent ? 'Enter your email to recover your account' : 'Enter the verification code sent to your email'}
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
            
            {!codeSent ? (
              <form onSubmit={handleRequestCode} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className={`text-sm font-medium ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    Email Address
                  </Label>
                  <div className="relative group">
                    <Mail className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${
                      isDarkMode ? 'text-gray-400 group-focus-within:text-purple-400' : 'text-gray-500 group-focus-within:text-blue-500'
                    }`} />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your MediShop email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
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
                <Button 
                  type="submit" 
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
                      Sending Code...
                    </div>
                  ) : (
                    'Send Verification Code'
                  )}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleVerifyAndReset} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className={`text-sm font-medium ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    Email Address
                  </Label>
                  <div className="relative group">
                    <Mail className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`} />
                    <Input
                      id="email"
                      type="email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      disabled
                      className={`w-full pl-12 pr-4 py-3 text-lg border-2 rounded-xl ${
                        isDarkMode 
                          ? 'bg-gray-800/30 border-gray-700 text-gray-300' 
                          : 'bg-gray-100 border-gray-300 text-gray-600'
                      }`}
                    />
                  </div>
                </div>
                
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
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className={`w-full pl-12 pr-4 py-3 text-lg border-2 rounded-xl transition-all duration-300 ${
                        isDarkMode 
                          ? 'bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-purple-500 focus:bg-gray-800/80' 
                          : 'bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:bg-white/80'
                      } focus:ring-4 focus:ring-opacity-20 ${
                        isDarkMode ? 'focus:ring-purple-500' : 'focus:ring-blue-500'
                      }`}
                    />
                  </div>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Choose from the usernames listed in the email.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="verificationCode" className={`text-sm font-medium ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    Verification Code
                  </Label>
                  <div className="relative group">
                    <Shield className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${
                      isDarkMode ? 'text-gray-400 group-focus-within:text-purple-400' : 'text-gray-500 group-focus-within:text-blue-500'
                    }`} />
                    <Input
                      id="verificationCode"
                      type="text"
                      placeholder="Enter verification code"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
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
                
                <div className="space-y-2">
                  <Label htmlFor="newPassword" className={`text-sm font-medium ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    New Password
                  </Label>
                  <div className="relative group">
                    <Lock className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${
                      isDarkMode ? 'text-gray-400 group-focus-within:text-purple-400' : 'text-gray-500 group-focus-within:text-blue-500'
                    }`} />
                    <Input
                      id="newPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
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
                  <div className="space-y-2">
                    <Progress
                      value={validatePassword(newPassword).score}
                      className={`h-2 ${
                        isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                      }`}
                    />
                    <div className="flex justify-between items-center">
                      <p className={`text-xs ${
                        validatePassword(newPassword).score < 40 
                          ? 'text-red-500' 
                          : validatePassword(newPassword).score < 80 
                          ? 'text-yellow-500' 
                          : 'text-green-500'
                      }`}>
                        {validatePassword(newPassword).message}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={handleResendCode}
                    disabled={isLoading}
                    className={`flex-1 py-3 text-sm font-semibold rounded-xl transition-all duration-300 ${
                      isDarkMode 
                        ? 'border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white' 
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {isLoading ? 'Sending...' : 'Resend Code'}
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className={`flex-1 py-3 text-sm font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                      isDarkMode 
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white' 
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                    } disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Verifying...
                      </div>
                    ) : (
                      'Verify & Reset'
                    )}
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
        
        {/* Footer */}
        <div className="mt-6 text-center">
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Remember your password?{" "}
            <button
              onClick={navigateToLogin}
              className={`font-medium transition-colors duration-200 ${
                isDarkMode 
                  ? 'text-purple-400 hover:text-purple-300' 
                  : 'text-blue-600 hover:text-blue-500'
              }`}
            >
              Log In
            </button>
          </p>
          <p className={`text-xs mt-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
            © 2025 MediShop. Secure healthcare marketplace.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MediShopForgotPassword;