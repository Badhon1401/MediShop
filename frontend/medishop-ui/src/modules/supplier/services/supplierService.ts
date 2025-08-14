// frontend/mediShop-ui/src/modules/supplier/services/supplierService.ts

import type{ 
  AddSupplierRequest, 
  UpdateSupplierRequest, 
  SearchSupplierRequest, 
  SupplierResponse 
} from '../types';


const SUPPLIER_ENDPOINT = 'http://localhost:8080/mediShop/api/suppliers';

class SupplierService {
  
  // Add a new supplier
  async addSupplier(request: AddSupplierRequest): Promise<SupplierResponse> {
    const response = await fetch(SUPPLIER_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to add supplier');
    }

    return response.json();
  }

  // Update an existing supplier
  async updateSupplier(supplierId: number, request: UpdateSupplierRequest): Promise<SupplierResponse> {
    const response = await fetch(`${SUPPLIER_ENDPOINT}/${supplierId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update supplier');
    }

    return response.json();
  }

  // Get supplier by ID
  async getSupplierById(supplierId: number): Promise<SupplierResponse> {
    const response = await fetch(`${SUPPLIER_ENDPOINT}/${supplierId}`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Supplier not found');
    }

    return response.json();
  }

  // Get all suppliers
  async getAllSuppliers(): Promise<SupplierResponse[]> {
    const response = await fetch(SUPPLIER_ENDPOINT);

    if (!response.ok) {
      throw new Error('Failed to fetch suppliers');
    }

    return response.json();
  }

  // Get all active suppliers
  async getActiveSuppliers(): Promise<SupplierResponse[]> {
    const response = await fetch(`${SUPPLIER_ENDPOINT}/active`);

    if (!response.ok) {
      throw new Error('Failed to fetch active suppliers');
    }

    return response.json();
  }

  // Get all inactive suppliers
  async getInactiveSuppliers(): Promise<SupplierResponse[]> {
    const response = await fetch(`${SUPPLIER_ENDPOINT}/inactive`);

    if (!response.ok) {
      throw new Error('Failed to fetch inactive suppliers');
    }

    return response.json();
  }

  // Get supplier by email
  async getSupplierByEmail(email: string): Promise<SupplierResponse> {
    const response = await fetch(`${SUPPLIER_ENDPOINT}/email/${encodeURIComponent(email)}`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Supplier not found');
    }

    return response.json();
  }

  // Get supplier by company name
  async getSupplierByCompanyName(companyName: string): Promise<SupplierResponse> {
    const response = await fetch(`${SUPPLIER_ENDPOINT}/company/${encodeURIComponent(companyName)}`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Supplier not found');
    }

    return response.json();
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

    const response = await fetch(`${SUPPLIER_ENDPOINT}/search?${params.toString()}`);

    if (!response.ok) {
      throw new Error('Failed to search suppliers');
    }

    return response.json();
  }

  // Delete a supplier
  async deleteSupplier(supplierId: number): Promise<void> {
    const response = await fetch(`${SUPPLIER_ENDPOINT}/${supplierId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete supplier');
    }
  }

  // Activate a supplier
  async activateSupplier(supplierId: number): Promise<SupplierResponse> {
    const response = await fetch(`${SUPPLIER_ENDPOINT}/${supplierId}/activate`, {
      method: 'PATCH',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to activate supplier');
    }

    return response.json();
  }

  // Deactivate a supplier
  async deactivateSupplier(supplierId: number): Promise<SupplierResponse> {
    const response = await fetch(`${SUPPLIER_ENDPOINT}/${supplierId}/deactivate`, {
      method: 'PATCH',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to deactivate supplier');
    }

    return response.json();
  }
}

export const supplierService = new SupplierService();