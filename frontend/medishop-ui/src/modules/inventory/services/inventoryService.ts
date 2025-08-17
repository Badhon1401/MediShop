// src/modules/inventory/services/inventoryService.ts

import { httpClient } from '../../../shared/utils/httpClient';
import type{ 
  Inventory, 
  InventoryResponse, 
  AddInventoryRequest, 
  UpdateInventoryRequest, 
  UpdateStockRequest, 
  InventorySearchRequest,
  MedicineType 
} from '../types';

class InventoryService {
  // Basic CRUD Operations
  async addInventory(request: AddInventoryRequest): Promise<InventoryResponse> {
    return httpClient.post<InventoryResponse>('/api/inventory', request);
  }

  async getInventoryById(id: number): Promise<Inventory> {
    return httpClient.get<Inventory>(`/api/inventory/${id}`);
  }

  async getAllInventory(): Promise<Inventory[]> {
    return httpClient.get<Inventory[]>('/api/inventory');
  }

  async updateInventory(id: number, request: UpdateInventoryRequest): Promise<Inventory> {
    return httpClient.put<Inventory>(`/api/inventory/${id}`, request);
  }

  async deleteInventory(id: number): Promise<void> {
    return httpClient.delete<void>(`/api/inventory/${id}`);
  }

  // Search Operations
  async searchInventory(searchRequest: InventorySearchRequest): Promise<Inventory[]> {
    return httpClient.post<Inventory[]>('/api/inventory/search', searchRequest);
  }

  async searchByMedicineName(medicineName: string): Promise<Inventory[]> {
    return httpClient.get<Inventory[]>(`/api/inventory/search/medicine?medicineName=${encodeURIComponent(medicineName)}`);
  }

  async searchByBatchNumber(batchNumber: string): Promise<Inventory[]> {
    return httpClient.get<Inventory[]>(`/api/inventory/search/batch?batchNumber=${encodeURIComponent(batchNumber)}`);
  }

  async searchByCompanyName(companyName: string): Promise<Inventory[]> {
    return httpClient.get<Inventory[]>(`/api/inventory/search/company?companyName=${encodeURIComponent(companyName)}`);
  }

  async searchByMedicineType(type: MedicineType): Promise<Inventory[]> {
    return httpClient.get<Inventory[]>(`/api/inventory/search/type?type=${encodeURIComponent(type)}`);
  }

  async searchByLocation(location: string): Promise<Inventory[]> {
    return httpClient.get<Inventory[]>(`/api/inventory/search/location?location=${encodeURIComponent(location)}`);
  }

  // Stock Management Operations
  async updateStock(updateRequest: UpdateStockRequest): Promise<Inventory> {
    return httpClient.put<Inventory>('/api/inventory/stock', updateRequest);
  }

  async reduceStock(inventoryId: number, quantity: number): Promise<Inventory> {
    return httpClient.put<Inventory>(`/api/inventory/stock/${inventoryId}/reduce?quantity=${quantity}`);
  }

  async increaseStock(inventoryId: number, quantity: number): Promise<Inventory> {
    return httpClient.put<Inventory>(`/api/inventory/stock/${inventoryId}/increase?quantity=${quantity}`);
  }

  async checkStockAvailability(inventoryId: number, requiredQuantity: number): Promise<boolean> {
    return httpClient.get<boolean>(`/api/inventory/stock/${inventoryId}/available?requiredQuantity=${requiredQuantity}`);
  }

  // Low Stock Operations
  async getLowStockItems(threshold: number): Promise<Inventory[]> {
    return httpClient.get<Inventory[]>(`/api/inventory/low-stock?threshold=${threshold}`);
  }

  async getItemsWithStockAbove(quantity: number): Promise<Inventory[]> {
    return httpClient.get<Inventory[]>(`/api/inventory/stock/above?quantity=${quantity}`);
  }

  async getItemsByStockRange(minQuantity: number, maxQuantity: number): Promise<Inventory[]> {
    return httpClient.get<Inventory[]>(`/api/inventory/stock/range?minQuantity=${minQuantity}&maxQuantity=${maxQuantity}`);
  }

  // Expiry Operations
  async getExpiredItems(days?: number): Promise<InventoryResponse[]> {
    const params = days ? `?days=${days}` : '';
    return httpClient.get<InventoryResponse[]>(`/api/inventory/expired${params}`);
  }

  async getExpiringItems(days: number): Promise<InventoryResponse[]> {
    return httpClient.get<InventoryResponse[]>(`/api/inventory/expiring?days=${days}`);
  }

  async getItemsByExpiryRange(startDate: string, endDate: string): Promise<Inventory[]> {
    return httpClient.get<Inventory[]>(`/api/inventory/expiry/range?startDate=${startDate}&endDate=${endDate}`);
  }

  // Purchase Date and Price Operations
  async getItemsByPurchaseDateRange(startDate: string, endDate: string): Promise<Inventory[]> {
    return httpClient.get<Inventory[]>(`/api/inventory/purchase/date-range?startDate=${startDate}&endDate=${endDate}`);
  }

  async getItemsByPurchasePriceRange(minPrice: number, maxPrice: number): Promise<Inventory[]> {
    return httpClient.get<Inventory[]>(`/api/inventory/purchase/price-range?minPrice=${minPrice}&maxPrice=${maxPrice}`);
  }

  async getItemsByUnitPriceRange(minPrice: number, maxPrice: number): Promise<Inventory[]> {
    return httpClient.get<Inventory[]>(`/api/inventory/unit/price-range?minPrice=${minPrice}&maxPrice=${maxPrice}`);
  }

  // Health Check
  async healthCheck(): Promise<string> {
    return httpClient.get<string>('/api/inventory/health');
  }
}

export const inventoryService = new InventoryService();