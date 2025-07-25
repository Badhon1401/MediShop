// src/modules/inventory/hooks/useInventory.ts

import { useState, useEffect, useCallback } from 'react';
import type { 
  Inventory, 
  InventoryCreateRequest, 
  InventoryUpdateRequest, 
  InventorySearchFilters,
  InventoryResponse,
  ExpiringInventory,
  LowStockInventory,
  InventoryAlert,
  InventoryStats,
  Medicine
} from '../types';
import { inventoryService } from '../services/inventoryService';

export const useInventory = () => {
  const [inventoryItems, setInventoryItems] = useState<Inventory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const fetchInventoryItems = useCallback(async (
    page: number = 0,
    size: number = 10,
    filters?: InventorySearchFilters
  ) => {
    try {
      setLoading(true);
      setError(null);
      const response = await inventoryService.getInventoryItems(page, size, filters);
      setInventoryItems(response.content);
      setTotalPages(response.totalPages);
      setTotalElements(response.totalElements);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch inventory items');
    } finally {
      setLoading(false);
    }
  }, []);

  const createInventoryItem = useCallback(async (inventory: InventoryCreateRequest) => {
    try {
      setLoading(true);
      setError(null);
      const newItem = await inventoryService.createInventory(inventory);
      setInventoryItems(prev => [...prev, newItem]);
      return newItem;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create inventory item');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateInventoryItem = useCallback(async (inventory: InventoryUpdateRequest) => {
    try {
      setLoading(true);
      setError(null);
      const updatedItem = await inventoryService.updateInventory(inventory);
      setInventoryItems(prev => 
        prev.map(item => 
          item.inventoryId === updatedItem.inventoryId ? updatedItem : item
        )
      );
      return updatedItem;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update inventory item');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteInventoryItem = useCallback(async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      await inventoryService.deleteInventory(id);
      setInventoryItems(prev => prev.filter(item => item.inventoryId !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete inventory item');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    inventoryItems,
    loading,
    error,
    totalPages,
    totalElements,
    fetchInventoryItems,
    createInventoryItem,
    updateInventoryItem,
    deleteInventoryItem,
  };
};

export const useInventoryAlerts = () => {
  const [expiringItems, setExpiringItems] = useState<ExpiringInventory[]>([]);
  const [lowStockItems, setLowStockItems] = useState<LowStockInventory[]>([]);
  const [alerts, setAlerts] = useState<InventoryAlert[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchExpiringItems = useCallback(async (days: number = 30) => {
    try {
      setLoading(true);
      setError(null);
      const items = await inventoryService.getExpiringInventory(days);
      setExpiringItems(items);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch expiring items');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchLowStockItems = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const items = await inventoryService.getLowStockInventory();
      setLowStockItems(items);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch low stock items');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAlerts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const alertsData = await inventoryService.getInventoryAlerts();
      setAlerts(alertsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch alerts');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAllAlerts = useCallback(async () => {
    await Promise.all([
      fetchExpiringItems(),
      fetchLowStockItems(),
      fetchAlerts()
    ]);
  }, [fetchExpiringItems, fetchLowStockItems, fetchAlerts]);

  return {
    expiringItems,
    lowStockItems,
    alerts,
    loading,
    error,
    fetchExpiringItems,
    fetchLowStockItems,
    fetchAlerts,
    fetchAllAlerts,
  };
};

export const useInventoryStats = () => {
  const [stats, setStats] = useState<InventoryStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const statsData = await inventoryService.getInventoryStats();
      setStats(statsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch inventory statistics');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return {
    stats,
    loading,
    error,
    refreshStats: fetchStats,
  };
};

export const useMedicines = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMedicines = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const medicinesData = await inventoryService.getMedicines();
      setMedicines(medicinesData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch medicines');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMedicines();
  }, [fetchMedicines]);

  return {
    medicines,
    loading,
    error,
    refreshMedicines: fetchMedicines,
  };
};