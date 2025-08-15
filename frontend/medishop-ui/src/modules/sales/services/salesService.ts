// src/modules/sales/services/salesService.ts

import { httpClient } from '../../../shared/utils/httpClient';
import type{ 
  SalesRequest, 
  SalesResponse, 
  UpdateSalesRequest, 
  SearchSalesRequest,
  MedicineWiseSales
} from '../types';

class SalesService {
  
  async addSales(salesData: SalesRequest): Promise<SalesResponse> {
    try {
      return await httpClient.post<SalesResponse>('/api/sales', salesData);
    } catch (error) {
      console.error('Error adding sales:', error);
      throw error;
    }
  }

  async getAllSales(): Promise<SalesResponse[]> {
    try {
      return await httpClient.get<SalesResponse[]>('/api/sales');
    } catch (error) {
      console.error('Error fetching all sales:', error);
      throw error;
    }
  }

  async searchSales(searchCriteria: SearchSalesRequest): Promise<SalesResponse[]> {
    try {
      return await httpClient.post<SalesResponse[]>('/api/sales/search', searchCriteria);
    } catch (error) {
      console.error('Error searching sales:', error);
      throw error;
    }
  }

  async updateSales(salesData: UpdateSalesRequest): Promise<SalesResponse> {
    try {
      return await httpClient.put<SalesResponse>('/api/sales', salesData);
    } catch (error) {
      console.error('Error updating sales:', error);
      throw error;
    }
  }

  async deleteSales(itemsId: number): Promise<void> {
    try {
      await httpClient.delete<void>(`/api/sales/${itemsId}`);
    } catch (error) {
      console.error('Error deleting sales:', error);
      throw error;
    }
  }

  // Additional utility methods based on repository queries
  async getSalesBySalesId(salesId: number): Promise<SalesResponse[]> {
    return this.searchSales({ salesId });
  }

  async getSalesByCustomerPhone(phoneNumber: string): Promise<SalesResponse[]> {
    return this.searchSales({ customerPhoneNumber: phoneNumber });
  }

  async getSalesByMedicineName(medicineName: string): Promise<SalesResponse[]> {
    return this.searchSales({ medicineName });
  }

  async getSalesByDateRange(startDate: string, endDate: string): Promise<SalesResponse[]> {
    return this.searchSales({ startDate, endDate });
  }

  async getSalesByDate(salesDate: string): Promise<SalesResponse[]> {
    return this.searchSales({ salesDate });
  }

  // Analytics methods
  async getTotalSalesAmountByDate(date: string): Promise<number> {
    try {
      return await httpClient.get<number>(`/api/sales/analytics/total-amount?date=${date}`);
    } catch (error) {
      console.error('Error fetching total sales amount by date:', error);
      throw error;
    }
  }

  async getTotalSalesAmountBetweenDates(startDate: string, endDate: string): Promise<number> {
    try {
      return await httpClient.get<number>(
        `/api/sales/analytics/total-amount?startDate=${startDate}&endDate=${endDate}`
      );
    } catch (error) {
      console.error('Error fetching total sales amount between dates:', error);
      throw error;
    }
  }

  async getMedicineWiseSalesQuantity(): Promise<MedicineWiseSales[]> {
    try {
      const data = await httpClient.get<Array<[string, number]>>('/api/sales/analytics/medicine-wise-sales');
      // Transform the Object[] response to MedicineWiseSales[]
      return data.map((item) => ({
        medicineName: item[0],
        totalQuantity: item[1]
      }));
    } catch (error) {
      console.error('Error fetching medicine-wise sales quantity:', error);
      throw error;
    }
  }
}

export const salesService = new SalesService();