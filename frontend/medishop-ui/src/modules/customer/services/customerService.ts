// src/modules/customer/services/customerService.ts

import { httpClient } from '../../../shared/utils/httpClient';
import type {
  Customer,
  CreateCustomerRequest,
  UpdateCustomerRequest,
  CustomerSearchFilters,
} from '../types';

class CustomerService {
  // Get all customers with pagination and filters
  async getAllCustomers(
    page: number = 0,
    size: number = 10,
    filters?: CustomerSearchFilters
  ): Promise<Customer[]> {
    const params = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
    });

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          params.append(key, value);
        }
      });
    }

    // Backend returns Customer[] directly, not wrapped in pagination object
    return httpClient.get<Customer[]>(`/api/customers?${params.toString()}`);
  }

  // Get customer by ID
  async getCustomerById(id: number): Promise<Customer> {
    return httpClient.get<Customer>(`/api/customers/${id}`);
  }

  // Create new customer
  async createCustomer(customerData: CreateCustomerRequest): Promise<Customer> {
    if (customerData.contact_number && !this.isValidBangladeshiPhone(customerData.contact_number)) {
      throw new Error('Please enter a valid Bangladeshi phone number');
    }

    return httpClient.post<Customer>('/api/customers', customerData);
  }

  // Update customer
  async updateCustomer(id: number, customerData: UpdateCustomerRequest): Promise<Customer> {
    if (customerData.contact_number && !this.isValidBangladeshiPhone(customerData.contact_number)) {
      throw new Error('Please enter a valid Bangladeshi phone number');
    }

    return httpClient.put<Customer>(`/api/customers/${id}`, customerData);
  }

  // Delete customer
  async deleteCustomer(id: number): Promise<void> {
    return httpClient.delete<void>(`/api/customers/${id}`);
  }

  // Search customers
  async searchCustomers(filters: CustomerSearchFilters): Promise<Customer[]> {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params.append(key, value);
      }
    });

    const queryString = params.toString();
    const endpoint = queryString ? `/api/customers/search?${queryString}` : '/api/customers/search';

    return httpClient.get<Customer[]>(endpoint);
  }

  // Get customer purchase history
  async getCustomerPurchaseHistory(customerId: number): Promise<unknown[]> {
    return httpClient.get<unknown[]>(`/api/customers/${customerId}/purchases`);
  }

  // Get customer statistics
  async getCustomerStats(): Promise<unknown> {
    return httpClient.get<unknown>('/api/customers/stats');
  }

  // Helper function to validate Bangladeshi phone numbers
  private isValidBangladeshiPhone(phone: string): boolean {
    const cleanPhone = phone.replace(/[\s\-+]/g, '');
    const patterns = [
      /^01[3-9]\d{8}$/,
      /^8801[3-9]\d{8}$/,
      /^0\d{10}$/,
    ];
    return patterns.some(pattern => pattern.test(cleanPhone));
  }
}

export const customerService = new CustomerService();