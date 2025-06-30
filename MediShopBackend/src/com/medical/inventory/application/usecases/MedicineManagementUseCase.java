
// Use Cases (Application Layer)
package com.medical.inventory.application.usecases;

import com.medical.inventory.domain.entities.Medicine;
import com.medical.inventory.domain.entities.Inventory;
import com.medical.inventory.infrastructure.repositories.MedicineRepository;
import com.medical.inventory.infrastructure.repositories.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class MedicineManagementUseCase {

    @Autowired
    private MedicineRepository medicineRepository;

    @Autowired
    private InventoryRepository inventoryRepository;

    public Medicine createMedicine(Medicine medicine) {
        return medicineRepository.save(medicine);
    }

    public Optional<Medicine> getMedicineById(Long id) {
        return medicineRepository.findById(id);
    }

    public List<Medicine> getAllMedicines() {
        return medicineRepository.findAll();
    }

    public Medicine updateMedicine(Medicine medicine) {
        return medicineRepository.save(medicine);
    }

    public void deleteMedicine(Long id) {
        medicineRepository.deleteById(id);
    }

    public List<Medicine> searchMedicines(String searchTerm) {
        return medicineRepository.findByNameContainingIgnoreCase(searchTerm);
    }

    public List<Medicine> getMedicinesByCategory(String category) {
        return medicineRepository.findByCategory(category);
    }

    public List<Medicine> getMedicinesByType(String type) {
        return medicineRepository.findByType(type);
    }
}