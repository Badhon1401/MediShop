export interface Medicine {
  medicineId: number;
  name: string;
  type: MedicineType;
  category: string;
  batchNumber: string;
  expiryDate: string;
  location?: string;
  supplierId?: number;
  expired?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export type MedicineType = 'TABLET' | 'CAPSULE' | 'SYRUP' | 'INJECTION' | 'OINTMENT' | 'DROP';

export interface MedicineFormData {
  name: string;
  type: MedicineType;
  category: string;
  batchNumber: string;
  expiryDate: string;
  location: string;
  supplierId: string;
}

export interface MedicineSearchFilters {
  name: string;
  type: string;
  category: string;
  batchNumber: string;
}

export interface MedicineCreateRequest {
  name: string;
  type: MedicineType;
  category: string;
  batchNumber: string;
  expiryDate: string;
  location?: string;
  supplierId?: number;
}

// export interface MedicineUpdateRequest extends MedicineCreateRequest {
//   medicineId: number;
// }

export interface MedicineUpdateRequest  {
  medicineId: number;
  name: string;
  type: MedicineType;
  category: string;
  location?: string;
  supplierId?: number;
}

export interface MedicineListResponse {
  medicines: Medicine[];
  total: number;
  page: number;
  size: number;
}