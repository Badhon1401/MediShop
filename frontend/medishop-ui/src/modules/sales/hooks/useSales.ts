// src/modules/sales/hooks/useSales.ts

import { useState, useEffect, useCallback } from 'react';
import type{ 
  SalesResponse, 
  SalesRequest, 
  UpdateSalesRequest, 
  SearchSalesRequest,
  MedicineWiseSales
} from '../types';
import { salesService } from '../services/salesService';

export const useSales = () => {
  const [sales, setSales] = useState<SalesResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAllSales = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const salesData = await salesService.getAllSales();
      setSales(salesData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch sales');
    } finally {
      setLoading(false);
    }
  }, []);

  const addSales = useCallback(async (salesData: SalesRequest) => {
    setLoading(true);
    setError(null);
    try {
      const newSale = await salesService.addSales(salesData);
      setSales(prev => [...prev, newSale]);
      return newSale;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add sales');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateSales = useCallback(async (salesData: UpdateSalesRequest) => {
    setLoading(true);
    setError(null);
    try {
      const updatedSale = await salesService.updateSales(salesData);
      setSales(prev => 
        prev.map(sale => 
          sale.itemsId === updatedSale.itemsId ? updatedSale : sale
        )
      );
      return updatedSale;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update sales');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteSales = useCallback(async (itemsId: number) => {
    setLoading(true);
    setError(null);
    try {
      await salesService.deleteSales(itemsId);
      setSales(prev => prev.filter(sale => sale.itemsId !== itemsId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete sales');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const searchSales = useCallback(async (searchCriteria: SearchSalesRequest) => {
    setLoading(true);
    setError(null);
    try {
      const searchResults = await salesService.searchSales(searchCriteria);
      return searchResults;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search sales');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllSales();
  }, [fetchAllSales]);

  return {
    sales,
    loading,
    error,
    fetchAllSales,
    addSales,
    updateSales,
    deleteSales,
    searchSales,
    refetch: fetchAllSales
  };
};

export const useSalesAnalytics = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getTotalSalesAmountByDate = useCallback(async (date: string) => {
    setLoading(true);
    setError(null);
    try {
      return await salesService.getTotalSalesAmountByDate(date);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch total sales amount');
      return 0;
    } finally {
      setLoading(false);
    }
  }, []);

  const getTotalSalesAmountBetweenDates = useCallback(async (startDate: string, endDate: string) => {
    setLoading(true);
    setError(null);
    try {
      return await salesService.getTotalSalesAmountBetweenDates(startDate, endDate);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch total sales amount');
      return 0;
    } finally {
      setLoading(false);
    }
  }, []);

  const getMedicineWiseSalesQuantity = useCallback(async (): Promise<MedicineWiseSales[]> => {
    setLoading(true);
    setError(null);
    try {
      return await salesService.getMedicineWiseSalesQuantity();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch medicine-wise sales');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    getTotalSalesAmountByDate,
    getTotalSalesAmountBetweenDates,
    getMedicineWiseSalesQuantity
  };
};

export const useSalesSearch = () => {
  const [searchResults, setSearchResults] = useState<SalesResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const performSearch = useCallback(async (searchCriteria: SearchSalesRequest) => {
    setLoading(true);
    setError(null);
    try {
      const results = await salesService.searchSales(searchCriteria);
      setSearchResults(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search sales');
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearSearch = useCallback(() => {
    setSearchResults([]);
    setError(null);
  }, []);

  return {
    searchResults,
    loading,
    error,
    performSearch,
    clearSearch
  };
};