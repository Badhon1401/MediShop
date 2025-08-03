import { useState, useEffect, useCallback } from 'react';
import { inventoryService } from '../services/inventoryService';
import type{ 
  Inventory, 
  InventoryResponse, 
  AddInventoryRequest, 
  UpdateInventoryRequest, 
  UpdateStockRequest, 
  InventorySearchRequest,
  MedicineType,
  InventoryFilters 
} from '../types';

export const useInventory = () => {
  const [inventories, setInventories] = useState<Inventory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleError = (err: any) => {
    const message = err?.message || 'An unexpected error occurred';
    setError(message);
    console.error('Inventory operation failed:', err);
  };

  const clearError = () => setError(null);

  const fetchAllInventories = useCallback(async () => {
    setLoading(true);
    clearError();
    try {
      const data = await inventoryService.getAllInventory();
      setInventories(data);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const addInventory = async (request: AddInventoryRequest): Promise<InventoryResponse | null> => {
    setLoading(true);
    clearError();
    try {
      const newInventory = await inventoryService.addInventory(request);
      await fetchAllInventories(); // Refresh the list
      return newInventory;
    } catch (err) {
      handleError(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateInventory = async (id: number, request: UpdateInventoryRequest): Promise<Inventory | null> => {
    setLoading(true);
    clearError();
    try {
      const updatedInventory = await inventoryService.updateInventory(id, request);
      await fetchAllInventories(); // Refresh the list
      return updatedInventory;
    } catch (err) {
      handleError(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteInventory = async (id: number): Promise<boolean> => {
    setLoading(true);
    clearError();
    try {
      await inventoryService.deleteInventory(id);
      await fetchAllInventories(); // Refresh the list
      return true;
    } catch (err) {
      handleError(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const searchInventories = async (searchRequest: InventorySearchRequest): Promise<Inventory[]> => {
    setLoading(true);
    clearError();
    try {
      const results = await inventoryService.searchInventory(searchRequest);
      return results;
    } catch (err) {
      handleError(err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllInventories();
  }, [fetchAllInventories]);

  return {
    inventories,
    loading,
    error,
    clearError,
    fetchAllInventories,
    addInventory,
    updateInventory,
    deleteInventory,
    searchInventories,
  };
};

export const useInventoryStock = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleError = (err: any) => {
    const message = err?.message || 'An unexpected error occurred';
    setError(message);
    console.error('Stock operation failed:', err);
  };

  const clearError = () => setError(null);

  const updateStock = async (updateRequest: UpdateStockRequest): Promise<Inventory | null> => {
    setLoading(true);
    clearError();
    try {
      const result = await inventoryService.updateStock(updateRequest);
      return result;
    } catch (err) {
      handleError(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const reduceStock = async (inventoryId: number, quantity: number): Promise<Inventory | null> => {
    setLoading(true);
    clearError();
    try {
      const result = await inventoryService.reduceStock(inventoryId, quantity);
      return result;
    } catch (err) {
      handleError(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const increaseStock = async (inventoryId: number, quantity: number): Promise<Inventory | null> => {
    setLoading(true);
    clearError();
    try {
      const result = await inventoryService.increaseStock(inventoryId, quantity);
      return result;
    } catch (err) {
      handleError(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const checkStockAvailability = async (inventoryId: number, requiredQuantity: number): Promise<boolean | null> => {
    setLoading(true);
    clearError();
    try {
      const result = await inventoryService.checkStockAvailability(inventoryId, requiredQuantity);
      return result;
    } catch (err) {
      handleError(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getLowStockItems = async (threshold: number): Promise<Inventory[]> => {
    setLoading(true);
    clearError();
    try {
      const result = await inventoryService.getLowStockItems(threshold);
      return result;
    } catch (err) {
      handleError(err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    clearError,
    updateStock,
    reduceStock,
    increaseStock,
    checkStockAvailability,
    getLowStockItems,
  };
};

export const useInventoryExpiry = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleError = (err: any) => {
    const message = err?.message || 'An unexpected error occurred';
    setError(message);
    console.error('Expiry operation failed:', err);
  };

  const clearError = () => setError(null);

  const getExpiredItems = async (days?: number): Promise<InventoryResponse[]> => {
    setLoading(true);
    clearError();
    try {
      const result = await inventoryService.getExpiredItems(days);
      return result;
    } catch (err) {
      handleError(err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getExpiringItems = async (days: number): Promise<InventoryResponse[]> => {
    setLoading(true);
    clearError();
    try {
      const result = await inventoryService.getExpiringItems(days);
      return result;
    } catch (err) {
      handleError(err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    clearError,
    getExpiredItems,
    getExpiringItems,
  };
};

export const useInventoryStats = () => {
  const [stats, setStats] = useState<{
    totalItems: number;
    lowStockItems: number;
    expiringItems: number;
    expiredItems: number;
    totalValue: number;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleError = (err: any) => {
    const message = err?.message || 'An unexpected error occurred';
    setError(message);
    console.error('Stats operation failed:', err);
  };

  const clearError = () => setError(null);

  const refreshStats = useCallback(async () => {
    setLoading(true);
    clearError();
    try {
      const inventories = await inventoryService.getAllInventory();
      const lowStockItems = await inventoryService.getLowStockItems(10); // Example threshold
      const expiringItems = await inventoryService.getExpiringItems(30); // Within 30 days
      const expiredItems = await inventoryService.getExpiredItems();

      const totalValue = inventories.reduce((sum, item) => sum + (item.availableQuantity * item.unitPrice), 0);

      setStats({
        totalItems: inventories.length,
        lowStockItems: lowStockItems.length,
        expiringItems: expiringItems.length,
        expiredItems: expiredItems.length,
        totalValue,
      });
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshStats();
  }, [refreshStats]);

  return {
    stats,
    loading,
    error,
    clearError,
    refreshStats,
  };
};