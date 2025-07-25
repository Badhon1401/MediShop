// src/modules/inventory/components/index.ts

// Types
export * from './types';

// Components
export { InventoryForm } from './components/InventoryForm';
export { InventoryTable } from './components/InventoryTable';
export { InventorySearch } from './components/InventorySearch';

// Pages
export { InventoryPage } from './pages/InventoryPage';

// Hooks
export { useInventory, useInventoryAlerts, useInventoryStats, useMedicines } from './hooks/useInventory';
// Services
export { inventoryService } from './services/inventoryService';




















