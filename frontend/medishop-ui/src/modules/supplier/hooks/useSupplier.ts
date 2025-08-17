// frontend/mediShop-ui/src/modules/supplier/hooks/useSupplier.ts

import { useState, useEffect, useCallback } from 'react';
import { supplierService } from '../services/supplierService';
import type{ 
  SupplierResponse, 
  AddSupplierRequest, 
  UpdateSupplierRequest, 
  SearchSupplierRequest,
  SupplierFormData 
} from '../types';

export const useSuppliers = () => {
  const [suppliers, setSuppliers] = useState<SupplierResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSuppliers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await supplierService.getAllSuppliers();
      setSuppliers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch suppliers');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchActiveSuppliers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await supplierService.getActiveSuppliers();
      setSuppliers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch active suppliers');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchInactiveSuppliers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await supplierService.getInactiveSuppliers();
      setSuppliers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch inactive suppliers');
    } finally {
      setLoading(false);
    }
  }, []);

  const searchSuppliers = useCallback(async (searchCriteria: SearchSupplierRequest) => {
    setLoading(true);
    setError(null);
    try {
      const data = await supplierService.searchSuppliers(searchCriteria);
      setSuppliers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search suppliers');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSuppliers();
  }, [fetchSuppliers]);

  return {
    suppliers,
    loading,
    error,
    fetchSuppliers,
    fetchActiveSuppliers,
    fetchInactiveSuppliers,
    searchSuppliers,
    setSuppliers
  };
};

export const useSupplier = (supplierId?: number) => {
  const [supplier, setSupplier] = useState<SupplierResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSupplier = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await supplierService.getSupplierById(id);
      setSupplier(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch supplier');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (supplierId) {
      fetchSupplier(supplierId);
    }
  }, [supplierId, fetchSupplier]);

  return {
    supplier,
    loading,
    error,
    fetchSupplier,
    setSupplier
  };
};

export const useSupplierActions = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addSupplier = useCallback(async (supplierData: SupplierFormData): Promise<SupplierResponse> => {
    setLoading(true);
    setError(null);
    try {
      const request: AddSupplierRequest = {
        companyName: supplierData.companyName,
        email: supplierData.email,
        phone: supplierData.phone,
        status: supplierData.status
      };
      const result = await supplierService.addSupplier(request);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to add supplier';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateSupplier = useCallback(async (supplierId: number, supplierData: SupplierFormData): Promise<SupplierResponse> => {
    setLoading(true);
    setError(null);
    try {
      const request: UpdateSupplierRequest = {
        supplierId,
        companyName: supplierData.companyName,
        email: supplierData.email,
        phone: supplierData.phone,
        status: supplierData.status
      };
      const result = await supplierService.updateSupplier(supplierId, request);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update supplier';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteSupplier = useCallback(async (supplierId: number): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      await supplierService.deleteSupplier(supplierId);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete supplier';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const activateSupplier = useCallback(async (supplierId: number): Promise<SupplierResponse> => {
    setLoading(true);
    setError(null);
    try {
      const result = await supplierService.activateSupplier(supplierId);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to activate supplier';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const deactivateSupplier = useCallback(async (supplierId: number): Promise<SupplierResponse> => {
    setLoading(true);
    setError(null);
    try {
      const result = await supplierService.deactivateSupplier(supplierId);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to deactivate supplier';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    addSupplier,
    updateSupplier,
    deleteSupplier,
    activateSupplier,
    deactivateSupplier
  };
};