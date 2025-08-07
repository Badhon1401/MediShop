package com.mediShop.medicine.domain.repository;

import com.mediShop.medicine.domain.entity.Medicine;

import java.util.Optional;
import java.util.Set;
import java.util.UUID;

public interface MedicineRepository {
    Medicine save(Medicine medicine);
    Optional<Medicine> findById(UUID id);
    void delete(Medicine medicine);
    Medicine update(UUID id, Medicine updatedMedicine);
    Set<Medicine> findByShopId(UUID shopId);

    void deleteById(UUID medicineId);

}
