// src/modules/sales/index.ts

// Export types
export * from './types';

// Export services
export { salesService } from './services/salesService';

// Export hooks
export { useSales, useSalesAnalytics, useSalesSearch } from './hooks/useSales';

// Export components
export { default as SalesForm } from './components/SalesForm';
export { default as SalesSearch } from './components/SalesSearch';
export { default as SalesTable } from './components/SalesTable';

// Export pages
export { default as SalesPage } from './pages/SalesPage';
export { default as SalesAnalyticsPage } from './pages/SalesAnalyticsPage';