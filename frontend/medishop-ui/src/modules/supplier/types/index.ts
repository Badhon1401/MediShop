// frontend/mediShop-ui/src/modules/supplier/types/index.ts

export interface Supplier {
  supplierId: number;
  companyName: string;
  email: string;
  phone: string;
  status: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface AddSupplierRequest {
  companyName: string;
  email: string;
  phone: string;
  status?: boolean;
}

export interface UpdateSupplierRequest {
  supplierId?: number;
  companyName: string;
  email: string;
  phone: string;
  status: boolean;
}

export interface SearchSupplierRequest {
  companyName?: string;
  email?: string;
  phone?: string;
  status?: boolean;
}

export interface SupplierResponse {
  supplierId: number;
  companyName: string;
  email: string;
  phone: string;
  status: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface SupplierFormData {
  companyName: string;
  email: string;
  phone: string;
  status: boolean;
}

export interface SupplierTableProps {
  suppliers: SupplierResponse[];
  onEdit: (supplier: SupplierResponse) => void;
  onDelete: (supplierId: number) => void;
  onActivate: (supplierId: number) => void;
  onDeactivate: (supplierId: number) => void;
  loading: boolean;
}

export interface SupplierFormProps {
  supplier?: SupplierResponse;
  onSubmit: (data: SupplierFormData) => void;
  onCancel: () => void;
  loading: boolean;
  isEdit?: boolean;
}

export interface SupplierSearchProps {
  onSearch: (criteria: SearchSupplierRequest) => void;
  loading: boolean;
  onClear: () => void;
}