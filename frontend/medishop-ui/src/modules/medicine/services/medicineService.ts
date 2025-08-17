import { httpClient } from '../../../shared/utils/httpClient';
import { API_ENDPOINTS } from '../../../shared/constants/api';
import type { Medicine, MedicineCreateRequest, MedicineUpdateRequest, MedicineSearchFilters } from '../types';

export class MedicineService {
  static async getAllMedicines(): Promise<Medicine[]> {
    return httpClient.get<Medicine[]>(API_ENDPOINTS.MEDICINE.LIST);
  }

  static async getMedicineById(id: number): Promise<Medicine> {
    return httpClient.get<Medicine>(`${API_ENDPOINTS.MEDICINE.LIST}/${id}`);
  }

  static async createMedicine(medicine: MedicineCreateRequest): Promise<Medicine> {
    return httpClient.post<Medicine>(API_ENDPOINTS.MEDICINE.CREATE, medicine);
  }

  static async updateMedicine(id: number, medicine: MedicineUpdateRequest): Promise<Medicine> {
    return httpClient.put<Medicine>(`${API_ENDPOINTS.MEDICINE.UPDATE}/${id}`, medicine);
  }

  static async deleteMedicine(id: number): Promise<void> {
    return httpClient.delete<void>(`${API_ENDPOINTS.MEDICINE.DELETE}/${id}`);
  }

  static async searchMedicines(filters: MedicineSearchFilters): Promise<Medicine[]> {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, String(value));
    });

    const queryString = params.toString();
    const endpoint = queryString ? `${API_ENDPOINTS.MEDICINE.SEARCH}?${queryString}` : API_ENDPOINTS.MEDICINE.LIST;
    return httpClient.get<Medicine[]>(endpoint);
  }

  static async getExpiringMedicines(days: number = 30): Promise<Medicine[]> {
    return httpClient.get<Medicine[]>(`${API_ENDPOINTS.MEDICINE.LIST}/expiring?days=${days}`);
  }
}