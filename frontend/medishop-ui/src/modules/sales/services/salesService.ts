// src/modules/sales/services/salesService.ts

import type{ 
  Sales, 
  SalesRequest, 
  SalesResponse, 
  UpdateSalesRequest, 
  SearchSalesRequest,
  SalesAnalytics,
  MedicineWiseSales
} from '../types';

const SALES_API_URL = 'http://localhost:8080/mediShop/api/sales';

class SalesService {
  
  async addSales(salesData: SalesRequest): Promise<SalesResponse> {
    try {
      const response = await fetch(SALES_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(salesData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error adding sales:', error);
      throw error;
    }
  }

  async getAllSales(): Promise<SalesResponse[]> {
    try {
      const response = await fetch(SALES_API_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching all sales:', error);
      throw error;
    }
  }

  async searchSales(searchCriteria: SearchSalesRequest): Promise<SalesResponse[]> {
    try {
      const response = await fetch(`${SALES_API_URL}/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchCriteria),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error searching sales:', error);
      throw error;
    }
  }

  async updateSales(salesData: UpdateSalesRequest): Promise<SalesResponse> {
    try {
      const response = await fetch(SALES_API_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(salesData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating sales:', error);
      throw error;
    }
  }

  async deleteSales(itemsId: number): Promise<void> {
    try {
      const response = await fetch(`${SALES_API_URL}/${itemsId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
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

  // Analytics methods (assuming backend provides these endpoints)
  async getTotalSalesAmountByDate(date: string): Promise<number> {
    try {
      const response = await fetch(`${SALES_API_URL}/analytics/total-amount?date=${date}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching total sales amount by date:', error);
      throw error;
    }
  }

  async getTotalSalesAmountBetweenDates(startDate: string, endDate: string): Promise<number> {
    try {
      const response = await fetch(
        `${SALES_API_URL}/analytics/total-amount?startDate=${startDate}&endDate=${endDate}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching total sales amount between dates:', error);
      throw error;
    }
  }

  async getMedicineWiseSalesQuantity(): Promise<MedicineWiseSales[]> {
    try {
      const response = await fetch(`${SALES_API_URL}/analytics/medicine-wise-sales`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // Transform the Object[] response to MedicineWiseSales[]
      return data.map((item: any[]) => ({
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