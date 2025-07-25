// src/modules/inventory/services/inventoryService.ts

import type{ 
  Inventory, 
  InventoryCreateRequest, 
  InventoryUpdateRequest, 
  InventoryResponse, 
  InventorySearchFilters,
  ExpiringInventory,
  LowStockInventory,
  InventoryAlert,
  InventoryStats,
  Medicine
} from '../types';

// const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';
const API_BASE_URL = 'http://localhost:8080/mediShop/api/inventory';

class InventoryService {
  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Get all inventory items with pagination and filters
  async getInventoryItems(
    page: number = 0,
    size: number = 10,
    filters?: InventorySearchFilters
  ): Promise<InventoryResponse> {
    const params = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
    });

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          params.append(key, value.toString());
        }
      });
    }

    return this.makeRequest<InventoryResponse>(`/inventory?${params}`);
  }

  // Get inventory item by ID
  async getInventoryById(id: number): Promise<Inventory> {
    return this.makeRequest<Inventory>(`/inventory/${id}`);
  }

  // Create new inventory item
  async createInventory(inventory: InventoryCreateRequest): Promise<Inventory> {
    return this.makeRequest<Inventory>('/inventory', {
      method: 'POST',
      body: JSON.stringify(inventory),
    });
  }

  // Update inventory item
  async updateInventory(inventory: InventoryUpdateRequest): Promise<Inventory> {
    return this.makeRequest<Inventory>(`/inventory/${inventory.inventoryId}`, {
      method: 'PUT',
      body: JSON.stringify(inventory),
    });
  }

  // Delete inventory item
  async deleteInventory(id: number): Promise<void> {
    return this.makeRequest<void>(`/inventory/${id}`, {
      method: 'DELETE',
    });
  }

  // Get expiring inventory items
  async getExpiringInventory(days: number = 30): Promise<ExpiringInventory[]> {
    return this.makeRequest<ExpiringInventory[]>(`/inventory/expiring?days=${days}`);
  }

  // Get low stock inventory items
  async getLowStockInventory(): Promise<LowStockInventory[]> {
    return this.makeRequest<LowStockInventory[]>('/inventory/low-stock');
  }

  // Get inventory alerts
  async getInventoryAlerts(): Promise<InventoryAlert[]> {
    return this.makeRequest<InventoryAlert[]>('/inventory/alerts');
  }

  // Get inventory statistics
  async getInventoryStats(): Promise<InventoryStats> {
    return this.makeRequest<InventoryStats>('/inventory/stats');
  }

  // Update stock quantity (for sales)
  async updateStockQuantity(inventoryId: number, quantityChange: number): Promise<Inventory> {
    return this.makeRequest<Inventory>(`/inventory/${inventoryId}/stock`, {
      method: 'PATCH',
      body: JSON.stringify({ quantityChange }),
    });
  }

  // Get medicines for dropdown selection
  async getMedicines(): Promise<Medicine[]> {
    return this.makeRequest<Medicine[]>('/medicines');
  }

  // Search inventory by multiple criteria
  async searchInventory(query: string): Promise<Inventory[]> {
    return this.makeRequest<Inventory[]>(`/inventory/search?q=${encodeURIComponent(query)}`);
  }

  // Bulk update inventory items
  async bulkUpdateInventory(updates: InventoryUpdateRequest[]): Promise<Inventory[]> {
    return this.makeRequest<Inventory[]>('/inventory/bulk-update', {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  // Get inventory by medicine ID
  async getInventoryByMedicine(medicineId: number): Promise<Inventory[]> {
    return this.makeRequest<Inventory[]>(`/inventory/medicine/${medicineId}`);
  }

  // Get inventory by batch number
  async getInventoryByBatch(batchNumber: string): Promise<Inventory[]> {
    return this.makeRequest<Inventory[]>(`/inventory/batch/${encodeURIComponent(batchNumber)}`);
  }
}

export const inventoryService = new InventoryService();