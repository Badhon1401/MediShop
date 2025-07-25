// src/modules/inventory/types/index.ts

export interface Inventory {
  inventoryId: number;
  medicineId: number;
  batchNumber: string;
  companyName: string;
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
  // Related medicine info for display
  medicineName?: string;
  medicineDescription?: string;
}

export interface InventoryCreateRequest {
  medicineId: number;
  batchNumber: string;
  companyName: string;
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

export interface InventoryUpdateRequest {
  inventoryId: number;
  batchNumber: string;
  companyName: string;
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

export interface InventorySearchFilters {
  medicineName?: string;
  batchNumber?: string;
  companyName?: string;
  location?: string;
  type?: MedicineType;
  expiryStatus?: ExpiryStatus;
  stockLevel?: StockLevel;
}

export interface InventoryResponse {
  content: Inventory[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export interface ExpiringInventory {
  inventoryId: number;
  medicineName: string;
  batchNumber: string;
  expiryDate: string;
  availableQuantity: number;
  daysUntilExpiry: number;
}

export interface LowStockInventory {
  inventoryId: number;
  medicineName: string;
  batchNumber: string;
  availableQuantity: number;
  minimumThreshold: number;
  location: string;
}

// export enum MedicineType {
//   TABLET = 'TABLET',
//   SYRUP = 'SYRUP',
//   INJECTION = 'INJECTION',
//   CAPSULE = 'CAPSULE',
//   CREAM = 'CREAM',
//   DROPS = 'DROPS'
// }

// export enum ExpiryStatus {
//   EXPIRED = 'EXPIRED',
//   EXPIRING_SOON = 'EXPIRING_SOON',
//   VALID = 'VALID'
// }

// export enum StockLevel {
//   LOW_STOCK = 'LOW_STOCK',
//   ADEQUATE = 'ADEQUATE',
//   OUT_OF_STOCK = 'OUT_OF_STOCK'
// }

// export type MedicineType {
//   TABLET = 'TABLET',
//   SYRUP = 'SYRUP',
//   INJECTION = 'INJECTION',
//   CAPSULE = 'CAPSULE',
//   CREAM = 'CREAM',
//   DROPS = 'DROPS'
// }

// 1. MedicineType
export const MEDICINE_TYPE = {
  TABLET: 'TABLET',
  SYRUP: 'SYRUP',
  INJECTION: 'INJECTION',
  CAPSULE: 'CAPSULE',
  CREAM: 'CREAM',
  DROPS: 'DROPS'
} as const;

export type MedicineType = (typeof MEDICINE_TYPE)[keyof typeof MEDICINE_TYPE];

// expiry-status.ts
export const EXPIRY_STATUS = {
  EXPIRED: 'EXPIRED',
  EXPIRING_SOON: 'EXPIRING_SOON',
  VALID: 'VALID',
} as const;

export type ExpiryStatus = (typeof EXPIRY_STATUS)[keyof typeof EXPIRY_STATUS];


// 2. StockLevel
export const STOCK_LEVEL = {
  LOW_STOCK: 'LOW_STOCK',
  ADEQUATE: 'ADEQUATE',
  OUT_OF_STOCK: 'OUT_OF_STOCK'
} as const;

export type StockLevel = (typeof STOCK_LEVEL)[keyof typeof STOCK_LEVEL];

export interface InventoryAlert {
  id: number;
  type: 'EXPIRY' | 'LOW_STOCK';
  message: string;
  inventoryId: number;
  medicineName: string;
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  createdAt: string;
}

export interface InventoryStats {
  totalItems: number;
  lowStockItems: number;
  expiringItems: number;
  expiredItems: number;
  totalValue: number;
}

export interface Medicine {
  medicineId: number;
  name: string;
  type: MedicineType;
  description?: string;
  companyName: string;
  unitPrice: number;
}