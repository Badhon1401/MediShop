// src/modules/inventory/services/inventoryService.ts

import type{ 
  Inventory, 
  InventoryResponse, 
  AddInventoryRequest, 
  UpdateInventoryRequest, 
  UpdateStockRequest, 
  InventorySearchRequest,
  MedicineType 
} from '../types';

const API_BASE_URL = 'http://localhost:8080/mediShop/api/inventory';

class InventoryService {
  private async request<T>(
    url: string, 
    options: RequestInit = {}
  ): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorData || response.statusText}`);
    }

    if (response.status === 204) {
      return {} as T;
    }

    return response.json();
  }

  // Basic CRUD Operations
  async addInventory(request: AddInventoryRequest): Promise<InventoryResponse> {
    return this.request<InventoryResponse>('', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async getInventoryById(id: number): Promise<Inventory> {
    return this.request<Inventory>(`/${id}`);
  }

  async getAllInventory(): Promise<Inventory[]> {
    return this.request<Inventory[]>('');
  }

  async updateInventory(id: number, request: UpdateInventoryRequest): Promise<Inventory> {
    return this.request<Inventory>(`/${id}`, {
      method: 'PUT',
      body: JSON.stringify(request),
    });
  }

  async deleteInventory(id: number): Promise<void> {
    return this.request<void>(`/${id}`, {
      method: 'DELETE',
    });
  }

  // Search Operations
  async searchInventory(searchRequest: InventorySearchRequest): Promise<Inventory[]> {
    return this.request<Inventory[]>('/search', {
      method: 'POST',
      body: JSON.stringify(searchRequest),
    });
  }

  async searchByMedicineName(medicineName: string): Promise<Inventory[]> {
    const params = new URLSearchParams({ medicineName });
    return this.request<Inventory[]>(`/search/medicine?${params}`);
  }

  async searchByBatchNumber(batchNumber: string): Promise<Inventory[]> {
    const params = new URLSearchParams({ batchNumber });
    return this.request<Inventory[]>(`/search/batch?${params}`);
  }

  async searchByCompanyName(companyName: string): Promise<Inventory[]> {
    const params = new URLSearchParams({ companyName });
    return this.request<Inventory[]>(`/search/company?${params}`);
  }

  async searchByMedicineType(type: MedicineType): Promise<Inventory[]> {
    const params = new URLSearchParams({ type });
    return this.request<Inventory[]>(`/search/type?${params}`);
  }

  async searchByLocation(location: string): Promise<Inventory[]> {
    const params = new URLSearchParams({ location });
    return this.request<Inventory[]>(`/search/location?${params}`);
  }

  // Stock Management Operations
  async updateStock(updateRequest: UpdateStockRequest): Promise<Inventory> {
    return this.request<Inventory>('/stock', {
      method: 'PUT',
      body: JSON.stringify(updateRequest),
    });
  }

  async reduceStock(inventoryId: number, quantity: number): Promise<Inventory> {
    const params = new URLSearchParams({ quantity: quantity.toString() });
    return this.request<Inventory>(`/stock/${inventoryId}/reduce?${params}`, {
      method: 'PUT',
    });
  }

  async increaseStock(inventoryId: number, quantity: number): Promise<Inventory> {
    const params = new URLSearchParams({ quantity: quantity.toString() });
    return this.request<Inventory>(`/stock/${inventoryId}/increase?${params}`, {
      method: 'PUT',
    });
  }

  async checkStockAvailability(inventoryId: number, requiredQuantity: number): Promise<boolean> {
    const params = new URLSearchParams({ requiredQuantity: requiredQuantity.toString() });
    return this.request<boolean>(`/stock/${inventoryId}/available?${params}`);
  }

  // Low Stock Operations
  async getLowStockItems(threshold: number): Promise<Inventory[]> {
    const params = new URLSearchParams({ threshold: threshold.toString() });
    return this.request<Inventory[]>(`/low-stock?${params}`);
  }

  async getItemsWithStockAbove(quantity: number): Promise<Inventory[]> {
    const params = new URLSearchParams({ quantity: quantity.toString() });
    return this.request<Inventory[]>(`/stock/above?${params}`);
  }

  async getItemsByStockRange(minQuantity: number, maxQuantity: number): Promise<Inventory[]> {
    const params = new URLSearchParams({ 
      minQuantity: minQuantity.toString(),
      maxQuantity: maxQuantity.toString()
    });
    return this.request<Inventory[]>(`/stock/range?${params}`);
  }

  // Expiry Operations
  async getExpiredItems(days?: number): Promise<InventoryResponse[]> {
    const params = days ? new URLSearchParams({ days: days.toString() }) : '';
    return this.request<InventoryResponse[]>(`/expired?${params}`);
  }

  async getExpiringItems(days: number): Promise<InventoryResponse[]> {
    const params = new URLSearchParams({ days: days.toString() });
    return this.request<InventoryResponse[]>(`/expiring?${params}`);
  }

  async getItemsByExpiryRange(startDate: string, endDate: string): Promise<Inventory[]> {
    const params = new URLSearchParams({ startDate, endDate });
    return this.request<Inventory[]>(`/expiry/range?${params}`);
  }

  // Purchase Date and Price Operations
  async getItemsByPurchaseDateRange(startDate: string, endDate: string): Promise<Inventory[]> {
    const params = new URLSearchParams({ startDate, endDate });
    return this.request<Inventory[]>(`/purchase/date-range?${params}`);
  }

  async getItemsByPurchasePriceRange(minPrice: number, maxPrice: number): Promise<Inventory[]> {
    const params = new URLSearchParams({ 
      minPrice: minPrice.toString(),
      maxPrice: maxPrice.toString()
    });
    return this.request<Inventory[]>(`/purchase/price-range?${params}`);
  }

  async getItemsByUnitPriceRange(minPrice: number, maxPrice: number): Promise<Inventory[]> {
    const params = new URLSearchParams({ 
      minPrice: minPrice.toString(),
      maxPrice: maxPrice.toString()
    });
    return this.request<Inventory[]>(`/unit/price-range?${params}`);
  }

  // Health Check
  async healthCheck(): Promise<string> {
    return this.request<string>('/health');
  }
}

export const inventoryService = new InventoryService();