import { useState, useEffect, useCallback } from 'react';
import type{ 
  Customer, 
  CreateCustomerRequest, 
  UpdateCustomerRequest, 
  CustomerSearchFilters 
} from '../types';
import { customerService } from '../services/customerService';

export const useCustomer = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  // const [customers, setCustomers] = useState<Customer[]>([]);

  // const fetchCustomers = useCallback(async (
  //   page: number = 0, 
  //   size: number = 10, 
  //   filters?: CustomerSearchFilters
  // ) => {
  //   setLoading(true);
  //   setError(null);
    
  //   try {
  //     const response = await customerService.getAllCustomers(page, size, filters);
  //     setCustomers(response.data);
  //     setTotalPages(Math.ceil(response.total / size));
  //     setCurrentPage(page);
  //     setTotalCustomers(response.total);
  //   } catch (err: any) {
  //     setError(err.response?.data?.message || 'Failed to fetch customers');
  //     console.error('Error fetching customers:', err);
  //   } finally {
  //     setLoading(false);
  //   }
  // }, []);

  const fetchCustomers = useCallback(async (
  page: number = 0,
  size: number = 10,
  filters?: CustomerSearchFilters
) => {
  setLoading(true);
  setError(null);

  try {
    const customers = await customerService.getAllCustomers(page, size, filters);
    setCustomers(customers);

    // Simulate total for now (not real)
    setTotalPages(1); // or customers.length / size if you fetched all
    setCurrentPage(0);
    setTotalCustomers(customers.length);
  } catch (err: any) {
    setError(err.response?.data?.message || 'Failed to fetch customers');
    console.error('Error fetching customers:', err);
  } finally {
    setLoading(false);
  }
}, []);


  const createCustomer = useCallback(async (customerData: CreateCustomerRequest): Promise<Customer | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const newCustomer = await customerService.createCustomer(customerData);
      // setCustomers(prev => [newCustomer, ...prev]);
      // const [customers, setCustomers] = useState<Customer[]>([]);
      setTotalCustomers(prev => prev + 1);
      return newCustomer;
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to create customer');
      console.error('Error creating customer:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateCustomer = useCallback(async (
    id: number, 
    customerData: UpdateCustomerRequest
  ): Promise<Customer | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const updatedCustomer = await customerService.updateCustomer(id, customerData);
      setCustomers(prev => 
        prev.map(customer => 
          customer.customer_id === id ? updatedCustomer : customer
        )
      );
      return updatedCustomer;
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to update customer');
      console.error('Error updating customer:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteCustomer = useCallback(async (id: number): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      await customerService.deleteCustomer(id);
      setCustomers(prev => prev.filter(customer => customer.customer_id !== id));
      setTotalCustomers(prev => prev - 1);
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete customer');
      console.error('Error deleting customer:', err);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const searchCustomers = useCallback(async (filters: CustomerSearchFilters) => {
    setLoading(true);
    setError(null);
    
    try {
      const results = await customerService.searchCustomers(filters);
      setCustomers(results);
      setTotalCustomers(results.length);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to search customers');
      console.error('Error searching customers:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const getCustomerById = useCallback(async (id: number): Promise<Customer | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const customer = await customerService.getCustomerById(id);
      return customer;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch customer');
      console.error('Error fetching customer:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const resetCustomers = useCallback(() => {
    setCustomers([]);
    setCurrentPage(0);
    setTotalPages(0);
    setTotalCustomers(0);
  }, []);

  return {
    customers,
    loading,
    error,
    totalPages,
    currentPage,
    totalCustomers,
    fetchCustomers,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    searchCustomers,
    getCustomerById,
    clearError,
    resetCustomers
  };
};

export default useCustomer;