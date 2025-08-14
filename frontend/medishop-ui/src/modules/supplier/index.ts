// frontend/mediShop-ui/src/modules/supplier/index.ts

// Export all types
export * from './types';

// Export all services
export { supplierService } from './services/supplierService';

// Export all hooks
export { 
  useSuppliers, 
  useSupplier, 
  useSupplierActions 
} from './hooks/useSupplier';

// Export all components
export { default as SupplierForm } from './components/SupplierForm';
export { default as SupplierTable } from './components/SupplierTable';
export { default as SupplierSearch } from './components/SupplierSearch';

// Export all pages
export { default as SupplierPage } from './pages/SupplierPage';