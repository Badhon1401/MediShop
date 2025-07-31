// Customer types definition
export interface Customer {
  customer_id: number;
  name: string;
  contact_number?: string;
  registration_date: string;
}

export interface CreateCustomerRequest {
  name: string;
  contact_number?: string;
}

export interface UpdateCustomerRequest {
  name?: string;
  contact_number?: string;
}

export interface CustomerSearchFilters {
  name?: string;
  contact_number?: string;
  registration_date_from?: string;
  registration_date_to?: string;
}

export interface CustomerApiResponse {
  data: Customer[];
  total: number;
  page: number;
  size: number;
}

export interface CustomerFormData {
  name: string;
  contact_number: string;
}

export interface CustomerTableProps {
  customers: Customer[];
  loading: boolean;
  onEdit: (customer: Customer) => void;
  onDelete: (customerId: number) => void;
  onView: (customer: Customer) => void;
}

export interface CustomerFormProps {
  customer?: Customer;
  onSubmit: (data: CustomerFormData) => void;
  onCancel: () => void;
  loading: boolean;
}

export interface CustomerSearchProps {
  onSearch: (filters: CustomerSearchFilters) => void;
  loading: boolean;
}

// CustomerStatus - matches backend enum exactly
export const CUSTOMER_STATUS = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE'
} as const;

export type CustomerStatus = (typeof CUSTOMER_STATUS)[keyof typeof CUSTOMER_STATUS];