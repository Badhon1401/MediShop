import React from 'react';
import type {User} from '../types';

interface UserCardProps {
  user: User;
  onEditProfile?: () => void;
  onChangePassword?: () => void;
  onDeleteAccount?: () => void;
}

const UserCard: React.FC<UserCardProps> = ({
  user,
  onEditProfile,
  onChangePassword,
  onDeleteAccount
}) => {
  const getRoleColor = (role: string) => {
    switch (role) {
      case 'MANAGER':
        return 'bg-purple-100 text-purple-800';
      case 'SALESPERSON':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-xl font-bold text-white">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">{user.name}</h3>
              <p className="text-sm text-gray-500">{user.email}</p>
              <p className="text-sm text-gray-500">{user.phone}</p>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
              {user.role}
            </span>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              user.verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              {user.verified ? 'Verified' : 'Pending'}
            </span>
          </div>
        </div>
      </div>

      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>Member since {new Date(user.createdAt).toLocaleDateString()}</span>
          <span>Last updated {new Date(user.updatedAt).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="px-6 py-4 border-t border-gray-200">
        <div className="flex space-x-3">
          {onEditProfile && (
            <button
              onClick={onEditProfile}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Edit Profile
            </button>
          )}
          {onChangePassword && (
            <button
              onClick={onChangePassword}
              className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Change Password
            </button>
          )}
          {onDeleteAccount && (
            <button
              onClick={onDeleteAccount}
              className="px-4 py-2 border border-red-300 text-red-700 rounded-md text-sm font-medium hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Delete Account
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
