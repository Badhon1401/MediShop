// src/modules/customer/services/customerService.ts

import type {
  Customer,
  CreateCustomerRequest,
  UpdateCustomerRequest,
  CustomerSearchFilters,
  CustomerApiResponse,
} from '../types';

// Fixed: Use the correct endpoint that matches your controller
const API_BASE_URL = 'http://localhost:8080/mediShop/api/customers';

class CustomerService {
  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('authToken') || ''}`,
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem('authToken');
        window.location.href = '/login';
      }
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

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
    return this.makeRequest<Customer[]>(`?${params.toString()}`);
  }

  // Get customer by ID
  async getCustomerById(id: number): Promise<Customer> {
    return this.makeRequest<Customer>(`/${id}`);
  }

  // Create new customer
  async createCustomer(customerData: CreateCustomerRequest): Promise<Customer> {
    if (customerData.contact_number && !this.isValidBangladeshiPhone(customerData.contact_number)) {
      throw new Error('Please enter a valid Bangladeshi phone number');
    }

    return this.makeRequest<Customer>('', {
      method: 'POST',
      body: JSON.stringify(customerData),
    });
  }

  // Update customer
  async updateCustomer(id: number, customerData: UpdateCustomerRequest): Promise<Customer> {
    if (customerData.contact_number && !this.isValidBangladeshiPhone(customerData.contact_number)) {
      throw new Error('Please enter a valid Bangladeshi phone number');
    }

    return this.makeRequest<Customer>(`/${id}`, {
      method: 'PUT',
      body: JSON.stringify(customerData),
    });
  }

  // Delete customer
  async deleteCustomer(id: number): Promise<void> {
    return this.makeRequest<void>(`/${id}`, {
      method: 'DELETE',
    });
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
    const endpoint = queryString ? `/search?${queryString}` : '/search';

    return this.makeRequest<Customer[]>(endpoint);
  }

  // Get customer purchase history
  async getCustomerPurchaseHistory(customerId: number): Promise<any[]> {
    return this.makeRequest<any[]>(`/${customerId}/purchases`);
  }

  // Get customer statistics
  async getCustomerStats(): Promise<any> {
    return this.makeRequest<any>('/stats');
  }

  // Helper function to validate Bangladeshi phone numbers
  private isValidBangladeshiPhone(phone: string): boolean {
    const cleanPhone = phone.replace(/[\s\-\+]/g, '');
    const patterns = [
      /^01[3-9]\d{8}$/,
      /^8801[3-9]\d{8}$/,
      /^0\d{10}$/,
    ];
    return patterns.some(pattern => pattern.test(cleanPhone));
  }

  // Map backend response to frontend Customer format
  private mapCustomerResponse(response: Customer): Customer {
    return {
      customer_id: response.customer_id,
      name: response.name,
      contact_number: response.contact_number,
      registration_date: response.registration_date,
    };
  }
}

export const customerService = new CustomerService();