// src/modules/sales/types/index.ts

export interface Sales {
  itemsId: number;
  salesId: number;
  customerPhoneNumber: string;
  salesDate: string; // LocalDate from backend comes as string
  medicineName: string;
  medicineUnitPrice: number;
  perMedicineTotalQuantity: number;
  perMedicineTotalAmount: number;
  totalPricePerCustomerTransaction: number;
}

export interface SalesRequest {
  salesId: number;
  customerPhoneNumber: string;
  salesDate: string;
  medicineName: string;
  medicineUnitPrice: number;
  perMedicineTotalQuantity: number;
  perMedicineTotalAmount: number;
  totalPricePerCustomerTransaction: number;
}

export interface SalesResponse {
  itemsId: number;
  salesId: number;
  customerPhoneNumber: string;
  salesDate: string;
  medicineName: string;
  medicineUnitPrice: number;
  perMedicineTotalQuantity: number;
  perMedicineTotalAmount: number;
  totalPricePerCustomerTransaction: number;
}

export interface UpdateSalesRequest {
  itemsId: number;
  salesId: number;
  customerPhoneNumber: string;
  salesDate: string;
  medicineName: string;
  medicineUnitPrice: number;
  perMedicineTotalQuantity: number;
  perMedicineTotalAmount: number;
  totalPricePerCustomerTransaction: number;
}

export interface SearchSalesRequest {
  salesId?: number;
  customerPhoneNumber?: string;
  medicineName?: string;
  startDate?: string;
  endDate?: string;
  salesDate?: string;
}

export interface SalesFormData {
  salesId: number;
  customerPhoneNumber: string;
  salesDate: string;
  medicineName: string;
  medicineUnitPrice: number;
  perMedicineTotalQuantity: number;
}

export interface SalesAnalytics {
  totalSalesAmount: number;
  medicineWiseSales: MedicineWiseSales[];
}

export interface MedicineWiseSales {
  medicineName: string;
  totalQuantity: number;
}

export interface SalesFilters {
  salesId: string;
  customerPhoneNumber: string;
  medicineName: string;
  startDate: string;
  endDate: string;
  salesDate: string;
}