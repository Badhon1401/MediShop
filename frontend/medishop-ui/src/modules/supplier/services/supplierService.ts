// frontend/mediShop-ui/src/modules/supplier/services/supplierService.ts

import { httpClient } from '../../../shared/utils/httpClient';
import type{ 
  AddSupplierRequest, 
  UpdateSupplierRequest, 
  SearchSupplierRequest, 
  SupplierResponse 
} from '../types';

class SupplierService {
  
  // Add a new supplier
  async addSupplier(request: AddSupplierRequest): Promise<SupplierResponse> {
    return httpClient.post<SupplierResponse>('/api/suppliers', request);
  }

  // Update an existing supplier
  async updateSupplier(supplierId: number, request: UpdateSupplierRequest): Promise<SupplierResponse> {
    return httpClient.put<SupplierResponse>(`/api/suppliers/${supplierId}`, request);
  }

  // Get supplier by ID
  async getSupplierById(supplierId: number): Promise<SupplierResponse> {
    return httpClient.get<SupplierResponse>(`/api/suppliers/${supplierId}`);
  }

  // Get all suppliers
  async getAllSuppliers(): Promise<SupplierResponse[]> {
    return httpClient.get<SupplierResponse[]>('/api/suppliers');
  }

  // Get all active suppliers
  async getActiveSuppliers(): Promise<SupplierResponse[]> {
    return httpClient.get<SupplierResponse[]>('/api/suppliers/active');
  }

  // Get all inactive suppliers
  async getInactiveSuppliers(): Promise<SupplierResponse[]> {
    return httpClient.get<SupplierResponse[]>('/api/suppliers/inactive');
  }

  // Get supplier by email
  async getSupplierByEmail(email: string): Promise<SupplierResponse> {
    return httpClient.get<SupplierResponse>(`/api/suppliers/email/${encodeURIComponent(email)}`);
  }

  // Get supplier by company name
  async getSupplierByCompanyName(companyName: string): Promise<SupplierResponse> {
    return httpClient.get<SupplierResponse>(`/api/suppliers/company/${encodeURIComponent(companyName)}`);
  }

  // Search suppliers
  async searchSuppliers(searchRequest: SearchSupplierRequest): Promise<SupplierResponse[]> {
    const params = new URLSearchParams();
    
    if (searchRequest.companyName) {
      params.append('companyName', searchRequest.companyName);
    }
    if (searchRequest.email) {
      params.append('email', searchRequest.email);
    }
    if (searchRequest.phone) {
      params.append('phone', searchRequest.phone);
    }
    if (searchRequest.status !== undefined) {
      params.append('status', searchRequest.status.toString());
    }

    return httpClient.get<SupplierResponse[]>(`/api/suppliers/search?${params.toString()}`);
  }

  // Delete a supplier
  async deleteSupplier(supplierId: number): Promise<void> {
    return httpClient.delete<void>(`/api/suppliers/${supplierId}`);
  }

  // Activate a supplier
  async activateSupplier(supplierId: number): Promise<SupplierResponse> {
    return httpClient.put<SupplierResponse>(`/api/suppliers/${supplierId}/activate`);
  }

  // Deactivate a supplier
  async deactivateSupplier(supplierId: number): Promise<SupplierResponse> {
    return httpClient.put<SupplierResponse>(`/api/suppliers/${supplierId}/deactivate`);
  }
}

export const supplierService = new SupplierService();