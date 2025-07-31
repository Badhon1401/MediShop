// src/modules/inventory/types/index.ts


export const MEDICINE_TYPE = {
  TABLET: 'TABLET',
  SYRUP: 'SYRUP',
  INJECTION: 'INJECTION',
  CAPSULE: 'CAPSULE',
  CREAM: 'CREAM',
  DROPS: 'DROPS'
} as const;

export type MedicineType = (typeof MEDICINE_TYPE)[keyof typeof MEDICINE_TYPE];


export interface Inventory {
  inventoryId: number;
  medicineName: string;
  batchNumber: string;
  companyName: string;
  supplierId?: number;
  expiryDate: string; // LocalDate as ISO string
  location: string;
  lastUpdated: string; // LocalDateTime as ISO string
  type: MedicineType;
  purchaseDate: string; // LocalDate as ISO string
  totalQuantity: number;
  availableQuantity: number;
  unitPrice: number;
  purchasePrice: number;
  discount: number;
}

export interface InventoryResponse {
  inventoryId: number;
  medicineName: string;
  batchNumber: string;
  companyName: string;
  supplierId?: number;
  expiryDate: string;
  location: string;
  lastUpdated: string;
  type: MedicineType;
  purchaseDate: string;
  totalQuantity: number;
  availableQuantity: number;
  unitPrice: number;
  purchasePrice: number;
  discount: number;
}

export interface AddInventoryRequest {
  medicineName: string;
  batchNumber: string;
  companyName: string;
  supplierId?: number; 
  expiryDate: string;
  location: string;
  type: MedicineType;
  purchaseDate: string;
  totalQuantity: number;
  availableQuantity: number;
  unitPrice: number;
  purchasePrice: number;
  discount: number;
}

export interface UpdateInventoryRequest {
  inventoryId?: number;
  medicineName: string;
  batchNumber: string;
  companyName: string;
  supplierId?: number; 
  expiryDate: string;
  location: string;
  type: MedicineType;
  purchaseDate: string;
  totalQuantity: number;
  availableQuantity: number;
  unitPrice: number;
  purchasePrice: number;
  discount: number;
}

export interface UpdateStockRequest {
  inventoryId: number;
  availableQuantity: number;
}

export interface InventorySearchRequest {
  medicineName?: string;
  batchNumber?: string;
  companyName?: string;
  type?: MedicineType;
  location?: string;
}

export interface StockAlert {
  inventoryId: number;
  medicineName: string;
  currentStock: number;
  threshold: number;
  alertType: 'LOW_STOCK' | 'EXPIRED' | 'EXPIRING_SOON';
}

export interface InventoryFilters {
  medicineName: string;
  companyName: string;
  type: MedicineType | '';
  location: string;
  minStock: number;
  maxStock: number;
  expiryStatus: 'all' | 'expired' | 'expiring' | 'valid';
  sortBy: 'medicineName' | 'expiryDate' | 'availableQuantity' | 'lastUpdated';
  sortOrder: 'asc' | 'desc';
}

