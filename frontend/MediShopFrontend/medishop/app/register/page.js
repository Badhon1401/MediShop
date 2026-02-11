"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Eye, EyeOff, Lock, User, Phone, Mail, CheckCircle, ArrowLeft, ArrowRight, Moon, Sun, Activity, Pill, Heart, Shield, RefreshCcw } from 'lucide-react';

const RegistrationPage = () => {
  const router = useRouter();
  
  // Theme state (dark by default to match login)
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  // Form states
  const [formData, setFormData] = useState({
    userName: '',
    password: '',
    confirmPassword: '',
    contactNumber: '',
    email: '',
    verificationCode: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // UI states
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [isCodeRequested, setIsCodeRequested] = useState(false);
  
  // Floating animation state
  const [floatingElements, setFloatingElements] = useState([]);
  
  const totalSteps = 4; // Updated to 4 steps
  
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
    
    if (password.length >= 8) score += 20;
    if (password.length >= 12) score += 10;
    if (/[A-Z]/.test(password)) score += 20;
    if (/[a-z]/.test(password)) score += 20;
    if (/[0-9]/.test(password)) score += 15;
    if (/[^A-Za-z0-9]/.test(password)) score += 15;
    
    let message = "";
    if (score < 40) message = "Weak - Use more characters and variety";
    else if (score < 70) message = "Fair - Add more complexity";
    else if (score < 90) message = "Good - Almost there!";
    else message = "Excellent - Very secure password";
    
    return { score, message };
  };
  
  const getPasswordStrengthColor = (score) => {
    if (score < 40) return "bg-red-500";
    if (score < 70) return "bg-orange-500";
    if (score < 90) return "bg-yellow-500";
    return "bg-green-500";
  };
  
  // Validation functions
  const validateStep1 = () => {
    if (!formData.userName.trim()) return 'Full name is required.';
    if (formData.userName.trim().length < 2) return 'Name must be at least 2 characters long.';
    if (!/^[a-zA-Z\s]+$/.test(formData.userName.trim())) return 'Name can only contain letters and spaces.';
    return '';
  };
  
  const validateStep2 = () => {
    if (!formData.contactNumber.trim()) return 'Contact number is required.';
    if (!/^\+?[\d\s\-\(\)]{10,15}$/.test(formData.contactNumber.trim())) return 'Please enter a valid contact number.';
    if (!formData.email.trim()) return 'Email address is required.';
    if (!/\S+@\S+\.\S+/.test(formData.email.trim())) return 'Please enter a valid email address.';
    return '';
  };
  
  const validateStep3 = () => {
    if (!formData.password.trim()) return 'Password is required.';
    if (validatePassword(formData.password).score < 70) return 'Please create a stronger password.';
    if (!formData.confirmPassword.trim()) return 'Please confirm your password.';
    if (formData.password !== formData.confirmPassword) return 'Passwords do not match.';
    return '';
  };

  const validateStep4 = () => {
    if (!formData.verificationCode.trim()) return 'Verification code is required.';
    return '';
  };
  
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleVerificationCodeRequest = async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/no-auth/register/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userName: formData.userName.trim(),
          password: formData.password,
          contactNumber: formData.contactNumber.trim(),
          email: formData.email.trim().toLowerCase()
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to request verification code');
      }

      setIsCodeRequested(true);
      setSuccess('Verification code sent to your email!');
    } catch (error) {
      setError('Failed to request verification code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleNextStep = async () => {
    let errorMsg = '';
    
    switch (currentStep) {
      case 1:
        errorMsg = validateStep1();
        break;
      case 2:
        errorMsg = validateStep2();
        break;
      case 3:
        errorMsg = validateStep3();
        break;
      case 4:
        errorMsg = validateStep4();
        break;
    }
    
    if (errorMsg) {
      setError(errorMsg);
      return;
    }
    
    // If we're at step 3, request verification code
    if (currentStep === 3) {
      await handleVerificationCodeRequest();
    }
    
    setCompletedSteps(prev => [...prev, currentStep]);
    setCurrentStep(prev => prev + 1);
    setError('');
    setSuccess('');
  };
  
  const handlePreviousStep = () => {
    setCurrentStep(prev => prev - 1);
    setError('');
    setSuccess('');
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorMsg = validateStep4();
    if (errorMsg) {
      setError(errorMsg);
      return;
    }
    
    setIsProcessing(true);
    setError('');
    
    try {
      const response = await fetch(`/api/no-auth/register/complete?code=${formData.verificationCode}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: formData.userName.trim(),
          password: formData.password,
          contactNumber: formData.contactNumber.trim(),
          email: formData.email.trim().toLowerCase()
        }),
      });

      if (!response.ok) {
        const result = await response.text();
        throw new Error(result || 'Registration failed');
      }

      setSuccess('Account created successfully! Redirecting to login...');
      setTimeout(() => {
        router.push('/home');
      }, 2000);
    } catch (error) {
      setError(error.message || 'Registration failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3, 4].map((step) => (
        <React.Fragment key={step}>
          <div className={`flex items-center justify-center w-12 h-12 rounded-full text-sm font-semibold transition-all duration-300 ${
            completedSteps.includes(step) 
              ? isDarkMode
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25'
                : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25'
              : currentStep === step 
                ? isDarkMode
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25 ring-4 ring-purple-500/20'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25 ring-4 ring-blue-500/20'
                : isDarkMode
                  ? 'bg-gray-800 text-gray-400 border-2 border-gray-700'
                  : 'bg-gray-200 text-gray-600 border-2 border-gray-300'
          }`}>
            {completedSteps.includes(step) ? <CheckCircle className="w-6 h-6" /> : step}
          </div>
          {step < 4 && (
            <div className={`w-16 h-1 mx-3 rounded-full transition-all duration-500 ${
              completedSteps.includes(step) 
                ? isDarkMode
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                  : 'bg-gradient-to-r from-blue-500 to-purple-500'
                : isDarkMode
                  ? 'bg-gray-700'
                  : 'bg-gray-300'
            }`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Personal Information
        </h3>
        <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Let's start with your basic details
        </p>
      </div>
      
      <div className="space-y-3">
        <Label htmlFor="name" className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
          Full Name
        </Label>
        <div className="relative group">
          <User className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${
            isDarkMode ? 'text-gray-400 group-focus-within:text-purple-400' : 'text-gray-500 group-focus-within:text-blue-500'
          }`} />
          <Input
            id="name"
            type="text"
            placeholder="Enter your full name"
            value={formData.userName}
            onChange={(e) => handleInputChange('userName', e.target.value)}
            className={`w-full pl-12 pr-4 py-3 text-lg border-2 rounded-xl transition-all duration-300 ${
              isDarkMode 
                ? 'bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-purple-500 focus:bg-gray-800/80' 
                : 'bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:bg-white/80'
            } focus:ring-4 focus:ring-opacity-20 ${
              isDarkMode ? 'focus:ring-purple-500' : 'focus:ring-blue-500'
            }`}
          />
        </div>
        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          This name will be used throughout MediShop
        </p>
      </div>
      
      <Button 
        type="button" 
        onClick={handleNextStep}
        className={`w-full py-4 text-lg font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
          isDarkMode 
            ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white' 
            : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
        }`}
      >
        Next Step <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Contact Information
        </h3>
        <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          How can we reach you?
        </p>
      </div>
      
      <div className="space-y-3">
        <Label htmlFor="contactNumber" className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
          Contact Number
        </Label>
        <div className="relative group">
          <Phone className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${
            isDarkMode ? 'text-gray-400 group-focus-within:text-purple-400' : 'text-gray-500 group-focus-within:text-blue-500'
          }`} />
          <Input
            id="contactNumber"
            type="tel"
            placeholder="+1 (555) 123-4567"
            value={formData.contactNumber}
            onChange={(e) => handleInputChange('contactNumber', e.target.value)}
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
      
      <div className="space-y-3">
        <Label htmlFor="email" className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
          Email Address
        </Label>
        <div className="relative group">
          <Mail className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${
            isDarkMode ? 'text-gray-400 group-focus-within:text-purple-400' : 'text-gray-500 group-focus-within:text-blue-500'
          }`} />
          <Input
            id="email"
            type="email"
            placeholder="your.email@example.com"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={`w-full pl-12 pr-4 py-3 text-lg border-2 rounded-xl transition-all duration-300 ${
              isDarkMode 
                ? 'bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-purple-500 focus:bg-gray-800/80' 
                : 'bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:bg-white/80'
            } focus:ring-4 focus:ring-opacity-20 ${
              isDarkMode ? 'focus:ring-purple-500' : 'focus:ring-blue-500'
            }`}
          />
        </div>
        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          We'll send important updates to this email
        </p>
      </div>
      
      <div className="flex space-x-4">
        <Button 
          type="button" 
          variant="outline"
          onClick={handlePreviousStep}
          className={`flex-1 py-3 text-lg font-medium rounded-xl border-2 transition-all duration-300 ${
            isDarkMode 
              ? 'border-gray-600 text-gray-300 hover:bg-gray-800/50 hover:border-gray-500' 
              : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
          }`}
        >
          <ArrowLeft className="mr-2 h-5 w-5" /> Previous
        </Button>
        <Button 
          type="button" 
          onClick={handleNextStep}
          className={`flex-1 py-3 text-lg font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
            isDarkMode 
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white' 
              : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
          }`}
        >
          Next Step <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Secure Your Account
        </h3>
        <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Create a strong password
        </p>
      </div>
      
      <div className="space-y-3">
        <Label htmlFor="password" className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
          Password
        </Label>
        <div className="relative group">
          <Lock className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${
            isDarkMode ? 'text-gray-400 group-focus-within:text-purple-400' : 'text-gray-500 group-focus-within:text-blue-500'
          }`} />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Create a strong password"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
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
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
        <div className="space-y-2">
          <Progress
            value={validatePassword(formData.password).score}
            className={`h-2 rounded-full ${getPasswordStrengthColor(validatePassword(formData.password).score)}`}
          />
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {validatePassword(formData.password).message}
          </p>
        </div>
      </div>
      
      <div className="space-y-3">
        <Label htmlFor="confirmPassword" className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
          Confirm Password
        </Label>
        <div className="relative group">
          <Lock className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${
            isDarkMode ? 'text-gray-400 group-focus-within:text-purple-400' : 'text-gray-500 group-focus-within:text-blue-500'
          }`} />
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
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
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className={`absolute right-4 top-1/2 transform -translate-y-1/2 transition-colors ${
              isDarkMode ? 'text-gray-400 hover:text-purple-400' : 'text-gray-500 hover:text-blue-500'
            }`}
          >
            {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
        {formData.confirmPassword && (
          <p className={`text-sm font-medium ${
            formData.password === formData.confirmPassword 
              ? isDarkMode ? 'text-green-400' : 'text-green-600'
              : isDarkMode ? 'text-red-400' : 'text-red-600'
          }`}>
            {formData.password === formData.confirmPassword ? '✓ Passwords match' : '✗ Passwords do not match'}
          </p>
        )}
      </div>
      
      <div className="flex space-x-4">
        <Button 
          type="button" 
          variant="outline"
          onClick={handlePreviousStep}
          className={`flex-1 py-3 text-lg font-medium rounded-xl border-2 transition-all duration-300 ${
            isDarkMode 
              ? 'border-gray-600 text-gray-300 hover:bg-gray-800/50 hover:border-gray-500' 
              : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
          }`}
        >
          <ArrowLeft className="mr-2 h-5 w-5" /> Previous
        </Button>
        <Button 
          type="button" 
          onClick={handleNextStep}
          className={`flex-1 py-3 text-lg font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
            isDarkMode 
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white' 
              : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
          }`}
        >
          Send Verification Code <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Verify Your Email
        </h3>
        <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Enter the verification code sent to your email
        </p>
      </div>
      
      <Alert className={`border-2 ${
        isDarkMode ? 'border-blue-500/50 bg-blue-900/20' : 'border-blue-300 bg-blue-50'
      }`}>
        <Mail className="h-4 w-4" />
        <AlertDescription className={`${
          isDarkMode ? 'text-blue-400' : 'text-blue-600'
        } font-medium`}>
          We've sent a 6-digit verification code to <strong>{formData.email}</strong>
        </AlertDescription>
      </Alert>
      
      <div className="space-y-3">
        <Label htmlFor="verificationCode" className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
          Verification Code
        </Label>
        <Input
          id="verificationCode"
          type="text"
          placeholder="Enter 6-digit code"
          value={formData.verificationCode}
          onChange={(e) => handleInputChange('verificationCode', e.target.value)}
          className={`w-full px-4 py-3 text-lg text-center border-2 rounded-xl transition-all duration-300 ${
            isDarkMode 
              ? 'bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-purple-500 focus:bg-gray-800/80' 
              : 'bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:bg-white/80'
          } focus:ring-4 focus:ring-opacity-20 ${
            isDarkMode ? 'focus:ring-purple-500' : 'focus:ring-blue-500'
          }`}
          maxLength={6}
        />
      </div>
      
      <div className="text-center">
        <Button
          type="button"
          variant="outline"
          onClick={handleVerificationCodeRequest}
          disabled={isLoading}
          className={`text-sm font-medium transition-all duration-300 ${
            isDarkMode 
              ? 'border-gray-600 text-gray-300 hover:bg-gray-800/50 hover:border-gray-500' 
              : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
          }`}
        >
          {isLoading ? (
            <>
              <RefreshCcw className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <RefreshCcw className="mr-2 h-4 w-4" />
              Resend Code
            </>
          )}
        </Button>
      </div>
      
      <div className="flex space-x-4">
        <Button 
          type="button" 
          variant="outline"
          onClick={handlePreviousStep}
          className={`flex-1 py-3 text-lg font-medium rounded-xl border-2 transition-all duration-300 ${
            isDarkMode 
              ? 'border-gray-600 text-gray-300 hover:bg-gray-800/50 hover:border-gray-500': 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
          }`}
        >
          <ArrowLeft className="mr-2 h-5 w-5" /> Previous
        </Button>
        <Button 
          type="submit" 
          disabled={isProcessing}
          className={`flex-1 py-3 text-lg font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
            isDarkMode 
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white' 
              : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
          } disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
        >
          {isProcessing ? (
            <>
              <RefreshCcw className="mr-2 h-5 w-5 animate-spin" />
              Creating Account...
            </>
          ) : (
            <>
              Create Account <CheckCircle className="ml-2 h-5 w-5" />
            </>
          )}
        </Button>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900' 
        : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
    } flex items-center justify-center p-4 relative overflow-hidden`}>
      
      {/* Floating Medical Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingElements.map((element) => {
          const IconComponent = element.icon;
          return (
            <div
              key={element.id}
              className="absolute animate-float opacity-20"
              style={{
                left: `${element.x}%`,
                top: `${element.y}%`,
                animationDelay: `${element.delay}s`,
                animationDuration: `${element.duration}s`
              }}
            >
              <IconComponent className={`w-8 h-8 ${
                isDarkMode ? 'text-purple-400' : 'text-blue-400'
              }`} />
            </div>
          );
        })}
      </div>

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className={`fixed top-6 right-6 z-50 p-3 rounded-full transition-all duration-300 ${
          isDarkMode 
            ? 'bg-gray-800/50 hover:bg-gray-700/50 text-yellow-400 hover:text-yellow-300' 
            : 'bg-white/50 hover:bg-white/70 text-gray-700 hover:text-gray-800'
        } backdrop-blur-sm shadow-lg hover:shadow-xl transform hover:scale-110`}
      >
        {isDarkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
      </button>

      <Card className={`w-full max-w-md transition-all duration-500 ${
        isDarkMode 
          ? 'bg-gray-800/30 border-gray-700/50 shadow-2xl shadow-purple-500/10' 
          : 'bg-white/30 border-white/50 shadow-2xl shadow-blue-500/10'
      } backdrop-blur-md`}>
        <CardHeader className="text-center pb-8">
          <CardTitle className={`text-3xl font-bold mb-2 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Join MediShop
          </CardTitle>
          <CardDescription className={`text-lg ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Your trusted healthcare partner
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {renderStepIndicator()}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}
          </form>
          
          {error && (
            <Alert className={`border-2 ${
              isDarkMode ? 'border-red-500/50 bg-red-900/20' : 'border-red-300 bg-red-50'
            }`}>
              <AlertDescription className={`${
                isDarkMode ? 'text-red-400' : 'text-red-600'
              } font-medium`}>
                {error}
              </AlertDescription>
            </Alert>
          )}
          
          {success && (
            <Alert className={`border-2 ${
              isDarkMode ? 'border-green-500/50 bg-green-900/20' : 'border-green-300 bg-green-50'
            }`}>
              <AlertDescription className={`${
                isDarkMode ? 'text-green-400' : 'text-green-600'
              } font-medium`}>
                {success}
              </AlertDescription>
            </Alert>
          )}
          
          <div className="text-center pt-4">
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => router.push('/login')}
                className={`font-semibold transition-colors ${
                  isDarkMode 
                    ? 'text-purple-400 hover:text-purple-300' 
                    : 'text-blue-600 hover:text-blue-500'
                }`}
              >
                Log in
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
      
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(120deg); }
          66% { transform: translateY(-10px) rotate(240deg); }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default RegistrationPage;