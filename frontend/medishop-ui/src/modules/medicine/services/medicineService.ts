import type { Medicine, MedicineCreateRequest, MedicineUpdateRequest, MedicineSearchFilters } from '../types';

const API_BASE_URL = 'http://localhost:8080/mediShop/api/medicines';

export class MedicineService {
  static async getAllMedicines(): Promise<Medicine[]> {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch medicines');
    }
    return response.json();
  }

  static async getMedicineById(id: number): Promise<Medicine> {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch medicine');
    }
    return response.json();
  }

  static async createMedicine(medicine: MedicineCreateRequest): Promise<Medicine> {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(medicine),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create medicine');
    }
    return response.json();
  }

  static async updateMedicine(id: number, medicine: MedicineUpdateRequest): Promise<Medicine> {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(medicine),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update medicine');
    }
    return response.json();
  }

  static async deleteMedicine(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete medicine');
    }
  }

  static async searchMedicines(filters: MedicineSearchFilters): Promise<Medicine[]> {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });

    const response = await fetch(`${API_BASE_URL}/search?${params}`);
    if (!response.ok) {
      throw new Error('Failed to search medicines');
    }
    return response.json();
  }

  static async getExpiringMedicines(days: number = 30): Promise<Medicine[]> {
    const response = await fetch(`${API_BASE_URL}/expiring?days=${days}`);
    if (!response.ok) {
      throw new Error('Failed to fetch expiring medicines');
    }
    return response.json();
  }
}