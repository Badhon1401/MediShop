import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

interface DeleteAccountFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

const DeleteAccountForm: React.FC<DeleteAccountFormProps> = ({
  onSuccess,
  onCancel
}) => {
  const { deleteAccount, loading, error, clearError } = useAuth();
  const [password, setPassword] = useState('');
  const [confirmText, setConfirmText] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{
    password?: string;
    confirmText?: string;
  }>({});

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (error) clearError();
  };

  const handleConfirmTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmText(e.target.value);
    if (error) clearError();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous validation errors
    setValidationErrors({});

    // Only check if fields are empty, let backend handle validation
    if (!password.trim()) {
      setValidationErrors({ password: 'Password is required' });
      return;
    }

    if (!confirmText.trim()) {
      setValidationErrors({ confirmText: 'Confirmation text is required' });
      return;
    }

    if (confirmText !== 'DELETE') {
      setValidationErrors({ confirmText: 'Please type "DELETE" exactly to confirm' });
      return;
    }

    try {
      await deleteAccount({ password });
      onSuccess?.();
    } catch (err) {
      // Error handled by hook - will show backend errors including wrong password
    }
  };

  return (
    <div className="bg-white shadow rounded-lg border border-red-200">
      <div className="px-6 py-4 border-b border-red-200 bg-red-50">
        <h2 className="text-lg font-medium text-red-900">Delete Account</h2>
        <p className="mt-1 text-sm text-red-700">
          This action cannot be undone. This will permanently delete your account and remove all your data.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="px-6 py-6">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">
                  Warning: Account Deletion
                </h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <ul className="list-disc list-inside space-y-1">
                    <li>All your personal data will be permanently deleted</li>
                    <li>You will lose access to all features and services</li>
                    <li>This action cannot be reversed</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="confirmText" className="block text-sm font-medium text-gray-700">
              Type "DELETE" to confirm
            </label>
            <input
              id="confirmText"
              type="text"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500"
              placeholder="Type DELETE to confirm"
              value={confirmText}
              onChange={handleConfirmTextChange}
            />
            {validationErrors.confirmText && (
              <p className="mt-2 text-sm text-red-600">
                {validationErrors.confirmText}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Enter your password to confirm
            </label>
            <div className="mt-1 relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500"
                placeholder="Enter your password"
                value={password}
                onChange={handlePasswordChange}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {validationErrors.password && (
              <p className="mt-2 text-sm text-red-600">
                {validationErrors.password}
              </p>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Deleting Account...' : 'Delete Account'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DeleteAccountForm;
