// src/modules/inventory/components/index.ts

// Types
export * from './types';

// Components
// ✅ Correct default import
import InventoryForm from './components/InventoryForm';
import InventoryTable from './components/InventoryTable';
import InventorySearch from './components/InventorySearch';


// Pages
export { InventoryPage } from './pages/InventoryPage';

// Hooks
export { useInventory, useInventoryStats } from './hooks/useInventory';
// export { useInventory, useInventoryAlerts, useInventoryStats, useMedicines } from './hooks/useInventory';
// Services
export { inventoryService } from './services/inventoryService';




















