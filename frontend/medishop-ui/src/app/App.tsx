import React from 'react';
import { AppRoutes } from './routes';
import { AuthProvider } from './store/AuthContext';
import { ToastProvider } from './store/ToastContext';
import './index.css';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <ToastProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </ToastProvider>
    </div>
  );
};

export default App;