import { useState, useEffect } from 'react';
import type { Medicine, MedicineCreateRequest, MedicineUpdateRequest, MedicineSearchFilters } from '../types/index';
import { MedicineService } from '../services/medicineService';

export const useMedicines = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMedicines = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Fetching medicines...');
      const data = await MedicineService.getAllMedicines();
      console.log('Medicine data received:', data);
      setMedicines(data);
    } catch (err) {
      console.error('Medicine fetch error:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch medicines');
    } finally {
      setLoading(false);
    }
  };

  const searchMedicines = async (filters: MedicineSearchFilters) => {
    setLoading(true);
    setError(null);
    try {
      const data = await MedicineService.searchMedicines(filters);
      setMedicines(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search medicines');
    } finally {
      setLoading(false);
    }
  };

  const fetchExpiringMedicines = async (days: number = 30) => {
    setLoading(true);
    setError(null);
    try {
      const data = await MedicineService.getExpiringMedicines(days);
      setMedicines(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch expiring medicines');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  return {
    medicines,
    loading,
    error,
    fetchMedicines,
    searchMedicines,
    fetchExpiringMedicines,
  };
};

export const useMedicineActions = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createMedicine = async (medicine: MedicineCreateRequest): Promise<Medicine | null> => {
    setLoading(true);
    setError(null);
    try {
      const result = await MedicineService.createMedicine(medicine);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create medicine');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateMedicine = async (id: number, medicine: MedicineUpdateRequest): Promise<Medicine | null> => {
    setLoading(true);
    setError(null);
    try {
      const result = await MedicineService.updateMedicine(id, medicine);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update medicine');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteMedicine = async (id: number): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await MedicineService.deleteMedicine(id);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete medicine');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    createMedicine,
    updateMedicine,
    deleteMedicine,
  };
};