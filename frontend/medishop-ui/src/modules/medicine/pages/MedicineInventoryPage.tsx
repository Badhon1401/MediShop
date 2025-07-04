import React, { useState } from 'react';
import { Plus, Package, X } from 'lucide-react';
import { useMedicines, useMedicineActions } from '../hooks/useMedicine';
import { MedicineTable } from '../components/MedicineTable';
import { MedicineSearch } from '../components/MedicineSearch';
import { MedicineForm } from '../components/MedicineForm';
import type { Medicine, MedicineFormData, MedicineSearchFilters } from '../types';

// Shared Modal Component
const Modal: React.FC<{
  show: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}> = ({ show, onClose, title, children }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export const MedicineInventoryPage: React.FC = () => {
  const { medicines, loading, fetchMedicines, searchMedicines, fetchExpiringMedicines } = useMedicines();
  const { createMedicine, updateMedicine, deleteMedicine, loading: actionLoading } = useMedicineActions();

  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingMedicine, setEditingMedicine] = useState<Medicine | null>(null);
  const [searchFilters, setSearchFilters] = useState<MedicineSearchFilters>({
    name: '',
    type: '',
    category: '',
    batchNumber: ''
  });
  const [showExpiringOnly, setShowExpiringOnly] = useState(false);
  const [expiringDays, setExpiringDays] = useState(30);

  const [formData, setFormData] = useState<MedicineFormData>({
    name: '',
    type: 'TABLET',
    category: '',
    batchNumber: '',
    expiryDate: '',
    location: '',
    supplierId: ''
  });

  const resetForm = () => {
    setFormData({
      name: '',
      type: 'TABLET',
      category: '',
      batchNumber: '',
      expiryDate: '',
      location: '',
      supplierId: ''
    });
  };

  const handleAddMedicine = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (!formData.name.trim()) {
      alert("Name is required!");
      return;
    }
    if (!formData.expiryDate) {
      alert("Expiry date is required!");
      return;
    }
    const medicineData = {
      ...formData,
      supplierId: formData.supplierId ? parseInt(formData.supplierId) : undefined
    };

    const result = await createMedicine(medicineData);
    if (result) {
      setShowAddModal(false);
      resetForm();
      fetchMedicines();
    }
  };

  const handleUpdateMedicine = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMedicine) return;

    const medicineData = {
      name: formData.name,
      type: formData.type,
      category: formData.category,
      location: formData.location,
      medicineId: editingMedicine.medicineId,
      supplierId: formData.supplierId ? parseInt(formData.supplierId) : undefined
    };

    const result = await updateMedicine(editingMedicine.medicineId, medicineData);
    if (result) {
      setShowEditModal(false);
      setEditingMedicine(null);
      resetForm();
      fetchMedicines();
    }
  };

  const handleDeleteMedicine = async (id: number) => {
    // const confirmDelete = window.confirm("Are you sure you want to delete this medicine?");
    // if (!confirmDelete) return;

    const success = await deleteMedicine(id);
    if (success) {
      fetchMedicines();
    }
  };


  const handleEditMedicine = (medicine: Medicine) => {
    setEditingMedicine(medicine);
    setFormData({
      name: medicine.name,
      type: medicine.type,
      category: medicine.category,
      batchNumber: '', // Not used in edit, but kept for add form
      expiryDate: '',
      location: medicine.location || '',
      supplierId: medicine.supplierId?.toString() || ''
    });
    setShowEditModal(true);
  };

  const handleSearch = () => {
    searchMedicines(searchFilters);
  };

  const handleExpiringSearch = () => {
    fetchExpiringMedicines(expiringDays);
  };

  const handleClearFilters = () => {
    setSearchFilters({
      name: '',
      type: '',
      category: '',
      batchNumber: ''
    });
    setShowExpiringOnly(false);
    fetchMedicines();
  };

  const closeAddModal = () => {
    setShowAddModal(false);
    resetForm();
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditingMedicine(null);
    resetForm();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                <Package className="text-blue-600" size={32} />
                Medical Inventory System
              </h1>
              <p className="text-gray-600 mt-2">Manage your medical inventory efficiently</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2 shadow-md"
            >
              <Plus size={20} />
              Add Medicine
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <MedicineSearch
          filters={searchFilters}
          onFiltersChange={setSearchFilters}
          onSearch={handleSearch}
          onClear={handleClearFilters}
          showExpiringOnly={showExpiringOnly}
          onExpiringToggle={setShowExpiringOnly}
          expiringDays={expiringDays}
          onExpiringDaysChange={setExpiringDays}
          onExpiringSearch={handleExpiringSearch}
        />

        {/* Medicine List */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <MedicineTable
            medicines={medicines}
            onEdit={handleEditMedicine}
            onDelete={handleDeleteMedicine}
            loading={loading}
          />
        </div>

        {/* Add Medicine Modal */}
        <Modal
          show={showAddModal}
          onClose={closeAddModal}
          title="Add New Medicine"
        >
          <MedicineForm
            formData={formData}
            onFormChange={setFormData}
            onSubmit={handleAddMedicine}
            submitText="Add Medicine"
            isLoading={actionLoading}
            isEditMode={false}
          />
        </Modal>

        {/* Edit Medicine Modal */}
        <Modal
          show={showEditModal}
          onClose={closeEditModal}
          title="Edit Medicine"
        >
          <MedicineForm
            formData={formData}
            onFormChange={setFormData}
            onSubmit={handleUpdateMedicine}
            submitText="Update Medicine"
            isLoading={actionLoading}
            isEditMode={true}
          />
        </Modal>
      </div>
    </div>
  );
};